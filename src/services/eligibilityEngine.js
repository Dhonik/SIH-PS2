// Configurable Eligibility Evaluation Engine
// Evaluates student profile against scholarship criteria without making official govt claims

export function evaluateStudentEligibility(studentProfile, schemesList) {
  if (!studentProfile) return [];

  const results = schemesList.map((scheme) => {
    let score = 0;
    const reasons = [];
    const missingFactors = [];
    let isCategoryMatch = false;
    let isEducationMatch = false;
    let isIncomeMatch = false;

    // 1. Scheduled Tribe Demography Check
    if (studentProfile.category === 'ST' || studentProfile.isST === true) {
      score += 35;
      isCategoryMatch = true;
      reasons.push('ST Category requirement appears relevant');
    } else {
      missingFactors.push('Specifically targeted for Scheduled Tribe (ST) applicants');
    }

    // 2. Education Level Appropriateness
    const edu = (studentProfile.currentEducation || '').toLowerCase();
    const schemeCat = scheme.category.toLowerCase();

    if (schemeCat.includes('post-matric') && (edu.includes('undergraduate') || edu.includes('diploma') || edu.includes('postgraduate') || edu.includes('phd'))) {
      score += 30;
      isEducationMatch = true;
      reasons.push(`Education level (${studentProfile.currentEducation}) appears relevant for Post-Secondary funding`);
    } else if (schemeCat.includes('top class') && (edu.includes('undergraduate') || edu.includes('postgraduate'))) {
      score += 30;
      isEducationMatch = true;
      reasons.push('Admitted in notified higher education institution');
    } else if (schemeCat.includes('pre-matric') && (edu.includes('school') || edu.includes('class 9') || edu.includes('class 10'))) {
      score += 30;
      isEducationMatch = true;
      reasons.push('Secondary school standard requirement met');
    } else if (schemeCat.includes('fellowship') && (edu.includes('postgraduate') || edu.includes('phd') || edu.includes('undergraduate'))) {
      score += 20;
      isEducationMatch = true;
      reasons.push('Research / Postgraduate progression pathway');
    } else if (schemeCat.includes('overseas')) {
      score += 20;
      isEducationMatch = true;
      reasons.push('International higher studies pathway');
    }

    // 3. Family Income Criteria
    const income = Number(studentProfile.familyAnnualIncome || 0);
    if (scheme.incomeCeiling === 0) {
      score += 25;
      isIncomeMatch = true;
      reasons.push('No family income ceiling applies for this scheme');
    } else if (income <= scheme.incomeCeiling) {
      score += 25;
      isIncomeMatch = true;
      reasons.push(`Family income (₹${income.toLocaleString('en-IN')}) is within ₹${scheme.incomeCeiling.toLocaleString('en-IN')} ceiling`);
    } else {
      missingFactors.push(`Income ₹${income.toLocaleString('en-IN')} exceeds stated indicative ceiling of ₹${scheme.incomeCeiling.toLocaleString('en-IN')}`);
    }

    // 4. Institutional Verification Factor
    if (studentProfile.institution) {
      score += 10;
      reasons.push(`Enrolled at recognized institution: ${studentProfile.institution}`);
    }

    // Classify Potential Relevance
    let matchTag = 'Exploratory Match';
    let proximityPercent = 60; // 0 is exact match in radar, 100 is far

    if (score >= 85) {
      matchTag = 'High Potential Match';
      proximityPercent = 20;
    } else if (score >= 60) {
      matchTag = 'Moderate Potential Match';
      proximityPercent = 40;
    } else if (score >= 40) {
      matchTag = 'Future Pathway Match';
      proximityPercent = 65;
    } else {
      matchTag = 'Low Direct Relevance';
      proximityPercent = 85;
    }

    return {
      schemeId: scheme.id,
      schemeTitle: scheme.title,
      category: scheme.category,
      matchScore: score,
      matchLevel: matchTag,
      radarDistance: proximityPercent,
      isCategoryMatch,
      isEducationMatch,
      isIncomeMatch,
      reasons,
      missingFactors,
      disclaimer: 'Preliminary assessment based on the profile data you provided. Final eligibility and sanctions are determined solely by the competent sanctioning authority.'
    };
  });

  // Sort by highest potential score
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

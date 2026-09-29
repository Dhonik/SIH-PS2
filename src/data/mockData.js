// Realistic Demo Dataset for SIH 2026 Prototype
// All mock entities are clearly tagged and structured for Supabase RLS compatibility

export const INITIAL_STUDENT_PROFILE = {
  id: 'usr-st-arun-2026',
  fullName: 'Arun Kumar',
  category: 'ST',
  tribeSubcaste: 'Irular',
  currentEducation: 'Undergraduate',
  course: 'B.Tech Computer Science & Engineering',
  institution: 'College of Engineering, Guindy (Anna University)',
  state: 'Tamil Nadu',
  district: 'Chennai',
  familyAnnualIncome: 250000, // ₹2,50,000
  passportId: 'TS-2026-001245',
  profileCompletion: 80,
  dbtActive: true,
  bankName: 'State Bank of India',
  accountNumberMasked: '••••••••4819',
  aadhaarLinked: true,
  phoneNumber: '+91 98401 •••••'
};

export const SCHOLARSHIPS_DATA = [
  {
    id: 'post-matric-st',
    code: 'PM-ST-2026',
    title: 'Post-Matric Scholarship for ST Students',
    category: 'Post-Matric Scholarship',
    targetGroup: 'For ST students pursuing post-secondary / higher education in recognised universities.',
    maxBenefit: 'Up to ₹40,000 / year (Course fee + maintenance allowance)',
    incomeCeiling: 250000,
    radarDistance: 25, // Proximity for Radar UI (0 = center/exact match)
    matchLevel: 'High Potential Match',
    matchScore: 95,
    status: 'In Progress',
    reasons: [
      'ST category matches requirement',
      'Currently enrolled in eligible Undergraduate programme (B.Tech)',
      'Family income (₹2.50 L) within prescribed ceiling',
      'Institution recognized under UGC/AICTE'
    ],
    rules: [
      'Applicable for post-matriculation courses only.',
      'Income limit must not exceed ₹2.50 lakh per annum.',
      'Maintenance allowance disbursed directly via DBT Aadhaar-seeded accounts.',
      'Mandatory upload of state-issued ST community certificate and valid annual income certificate.'
    ],
    deadline: '15 Nov 2026'
  },
  {
    id: 'top-class-st',
    code: 'TC-ST-2026',
    title: 'Top Class Education Scheme for ST Students',
    category: 'Top Class Scholarship',
    targetGroup: 'Full financial support for meritorious ST students admitted to notified premier institutes (IITs, NITs, AIIMS, premier State Universities).',
    maxBenefit: 'Full Tuition Fee + Living Expenses + Computer Grant (₹50,000+)',
    incomeCeiling: 800000,
    radarDistance: 20,
    matchLevel: 'Approved Potential Match',
    matchScore: 98,
    status: 'Approved',
    reasons: [
      'Enrolled in a premier engineering institution',
      'Family income well within the ₹8.0 Lakh top-class ceiling',
      'Merit admission verified by institute nodal officer'
    ],
    rules: [
      'Restricted to institutes notified by the Ministry of Tribal Affairs.',
      'Covers entire non-refundable tuition fees, living expenses up to ₹3,000/month, and one-time IT equipment grant.',
      'Requires annual academic progress certification.'
    ],
    deadline: '30 Oct 2026'
  },
  {
    id: 'pre-matric-st',
    code: 'PRE-ST-2026',
    title: 'Pre-Matric Scholarship for ST Students',
    category: 'Pre-Matric Scholarship',
    targetGroup: 'Supports ST children studying in Class 9 and 10 to minimise dropout rates.',
    maxBenefit: 'Up to ₹12,000 / year + book grants',
    incomeCeiling: 250000,
    radarDistance: 75,
    matchLevel: 'Passed Stage (Relevant for Siblings)',
    matchScore: 40,
    status: 'Exploratory',
    reasons: [
      'Applicable for family members in grades 9th and 10th (e.g. Sister Priya)',
      'ST category meets mandate'
    ],
    rules: [
      'Student must be studying in standard IX or X in government/recognized schools.',
      'Day scholar and hosteller allowances differ based on state rules.'
    ],
    deadline: 'Closed for FY (Re-opens July 2027)'
  },
  {
    id: 'national-fellowship-st',
    code: 'NF-ST-2026',
    title: 'National Fellowship for ST Students (M.Phil / Ph.D)',
    category: 'National Fellowship for ST Students',
    targetGroup: 'Supports ST candidates pursuing full-time regular higher research degrees (M.Phil/Ph.D).',
    maxBenefit: '₹31,000 - ₹35,000 / month JRF/SRF stipend + annual contingency grant',
    incomeCeiling: 0, // No income bar
    radarDistance: 55,
    matchLevel: 'Future Pathway Opportunity',
    matchScore: 70,
    status: 'Future Opportunity',
    reasons: [
      'Ideal future education pathway after your current B.Tech/Postgraduate studies',
      'No family income ceiling applies for this fellowship',
      'High monthly research fellowship + contingency allowance'
    ],
    rules: [
      'Candidate must have qualified UGC-NET / CSIR-NET or equivalent admission test for Ph.D.',
      '750 fellowships awarded nationwide per academic year.'
    ],
    deadline: 'Opens January 2027'
  },
  {
    id: 'national-overseas-st',
    code: 'NOS-ST-2026',
    title: 'National Overseas Scholarship for ST Students',
    category: 'National Overseas Scholarship',
    targetGroup: 'Financial assistance for ST students to pursue Masters, Ph.D, and Post-Doctoral studies abroad.',
    maxBenefit: 'Complete international tuition + US$15,400 / £9,900 annual living allowance + airfare',
    incomeCeiling: 600000,
    radarDistance: 65,
    matchLevel: 'Future International Pathway',
    matchScore: 65,
    status: 'Future Opportunity',
    reasons: [
      'Potential pathway for higher study in overseas QS Top 500 institutions',
      'ST student profile meets foundational demographic criteria',
      'Family income within ₹6.0 Lakh ceiling'
    ],
    rules: [
      'Candidate must score minimum 60% marks in Bachelor/Master degree.',
      'Only applicable for admission in top 500 ranked universities worldwide.',
      '20 awards annually reserved for ST candidates.'
    ],
    deadline: 'Round 1 Opens March 2027'
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-post-matric-01',
    applicationId: 'PM-2026-001245',
    schemeId: 'post-matric-st',
    schemeTitle: 'Post-Matric Scholarship for ST Students',
    appliedDate: '12 Aug 2026',
    currentStage: 'Government Verification', // Submitted -> College Verification -> Government Verification -> Approval -> Payment
    stageIndex: 2, // 0 to 4
    statusHuman: 'Your application is currently being reviewed by the State Welfare Department.',
    nextExpectedStage: 'District Welfare Officer Approval',
    lastUpdated: 'Yesterday, 4:30 PM',
    academicYear: '2026-27',
    grantAmount: 38000,
    stages: [
      { name: 'Application Submitted', completed: true, date: '12 Aug 2026', remarks: 'Submitted by student via Scholar Orbit' },
      { name: 'College Verification', completed: true, date: '28 Aug 2026', remarks: 'Verified by CEG Guindy Nodal Officer' },
      { name: 'Government Verification', completed: false, current: true, date: 'In progress', remarks: 'Under scrutiny at District Welfare Directorate' },
      { name: 'Approval', completed: false, date: 'Expected 10 Oct 2026', remarks: 'Final sanction order generation' },
      { name: 'Payment', completed: false, date: 'Pending approval', remarks: 'DBT transfer to Aadhaar linked SBI account' }
    ]
  },
  {
    id: 'app-top-class-01',
    applicationId: 'TC-2026-004321',
    schemeId: 'top-class-st',
    schemeTitle: 'Top Class Education Scheme for ST Students',
    appliedDate: '05 Jul 2026',
    currentStage: 'Approved',
    stageIndex: 3,
    statusHuman: 'Application approved! Partial disbursement received, remaining batch underway.',
    nextExpectedStage: 'Second Tranche Disbursement',
    lastUpdated: '18 Sep 2026',
    academicYear: '2026-27',
    grantAmount: 50000,
    stages: [
      { name: 'Application Submitted', completed: true, date: '05 Jul 2026', remarks: 'Application registered' },
      { name: 'College Verification', completed: true, date: '18 Jul 2026', remarks: 'Nodal officer approved admission tier' },
      { name: 'Government Verification', completed: true, date: '14 Aug 2026', remarks: 'Ministry of Tribal Affairs screening completed' },
      { name: 'Approval', completed: true, date: '02 Sep 2026', remarks: 'Sanction Order #MO-TA/2026/894' },
      { name: 'Payment', completed: false, current: true, date: 'Tranche 1 Disbursed (₹32,000)', remarks: 'Tranche 2 (₹18,000) queued for PFMS release' }
    ]
  }
];

export const INITIAL_DOCUMENTS = [
  {
    id: 'doc-st-cert',
    name: 'ST Community Certificate',
    code: 'ST_CERT',
    status: 'Verified',
    type: 'PDF',
    size: '1.4 MB',
    uploadedOn: '10 Aug 2026',
    verifiedBy: 'Revenue Divisional Officer, Tamil Nadu',
    verifiedDate: '11 Aug 2026',
    isActionRequired: false,
    remarks: 'Valid permanent ST certificate on record.',
    fieldsDetected: ['Certificate No: TN-ST-89324', 'Issued: Tiruvannamalai', 'Tribe: Irular']
  },
  {
    id: 'doc-income-cert',
    name: 'Annual Income Certificate',
    code: 'INCOME_CERT',
    status: 'Action Required',
    type: 'PDF',
    size: '850 KB',
    uploadedOn: 'Expires FY 2025-26',
    verifiedBy: 'Pending Renewal',
    isActionRequired: true,
    actionReason: 'Your current certificate expired on 31 March. Please upload the newly issued certificate for FY 2026-27 to continue your application.',
    fieldsDetected: []
  },
  {
    id: 'doc-marksheet',
    name: 'Class 12 / Semester Marksheet',
    code: 'MARKSHEET',
    status: 'Verified',
    type: 'PDF',
    size: '2.1 MB',
    uploadedOn: '12 Aug 2026',
    verifiedBy: 'Anna University Academic Registrar',
    verifiedDate: '15 Aug 2026',
    isActionRequired: false,
    remarks: 'Authenticated with 8.6 CGPA.',
    fieldsDetected: ['Roll No: 2024CEG0421', 'Percentage: 86.4%']
  },
  {
    id: 'doc-domicile',
    name: 'Nativity / Domicile Certificate',
    code: 'DOMICILE',
    status: 'Verified',
    type: 'PDF',
    size: '1.1 MB',
    uploadedOn: '12 Aug 2026',
    verifiedBy: 'Tahsildar Office',
    verifiedDate: '16 Aug 2026',
    isActionRequired: false,
    remarks: 'Domicile of Tamil Nadu confirmed.',
    fieldsDetected: ['State: Tamil Nadu', 'District: Chennai']
  },
  {
    id: 'doc-bank-details',
    name: 'Aadhaar Seeded Bank Passbook',
    code: 'BANK_DBT',
    status: 'Verified',
    type: 'PNG',
    size: '950 KB',
    uploadedOn: '12 Aug 2026',
    verifiedBy: 'NPCI Aadhaar Payment Bridge',
    verifiedDate: '17 Aug 2026',
    isActionRequired: false,
    remarks: 'DBT Aadhaar Mandate Active (SBI A/c ••••4819)',
    fieldsDetected: ['IFSC: SBIN0001842', 'Aadhaar Seeding: ACTIVE']
  },
  {
    id: 'doc-identity',
    name: 'Aadhaar / Student Photo ID',
    code: 'ID_CARD',
    status: 'Under Review',
    type: 'JPG',
    size: '1.2 MB',
    uploadedOn: '20 Sep 2026',
    verifiedBy: 'College Desk',
    isActionRequired: false,
    remarks: 'Facial and demographic cross-match running.',
    fieldsDetected: ['Aadhaar Masked: XXXX-XXXX-4819']
  }
];

export const INITIAL_FAMILY_MEMBERS = [
  {
    id: 'fam-ravi',
    name: 'Ravi Kumar',
    relationship: 'Elder Brother',
    age: 23,
    education: 'Postgraduate (M.Tech Thermal Engg)',
    institution: 'NIT Trichy',
    currentScheme: 'Post-Matric Scholarship',
    status: 'Approved & Disbursed',
    amountReceived: 45000,
    hasActionRequired: false
  },
  {
    id: 'fam-priya',
    name: 'Priya Kumar',
    relationship: 'Younger Sister',
    age: 15,
    education: 'Secondary School (Class 10)',
    institution: 'Govt Higher Secondary School',
    currentScheme: 'Pre-Matric Scholarship for ST',
    status: 'Disbursed',
    amountReceived: 20250,
    hasActionRequired: false
  },
  {
    id: 'fam-arun',
    name: 'Arun Kumar',
    relationship: 'Self',
    age: 20,
    education: 'Undergraduate (B.Tech CSE)',
    institution: 'CEG Anna University',
    currentScheme: 'Top Class & Post-Matric',
    status: 'Active / 1 Pending Action',
    amountReceived: 32000,
    hasActionRequired: true
  }
];

export const INITIAL_GRIEVANCES = [
  {
    id: 'grv-2026-904',
    ticketNumber: 'GRV-TN-2026-00904',
    category: 'Payment',
    subject: 'Query regarding release date of second installment (Tranche 2)',
    applicationId: 'TC-2026-004321',
    filedOn: '22 Sep 2026',
    status: 'In Progress',
    officerRemarks: 'Tranche 2 file has been countersigned by Treasury. DBT batch dispatch expected on 05 Oct 2026.',
    timeline: [
      { date: '22 Sep, 10:15 AM', text: 'Grievance ticket created by student' },
      { date: '23 Sep, 02:40 PM', text: 'Assigned to Public Financial Management Officer' },
      { date: '25 Sep, 11:20 AM', text: 'Officer review in progress' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Income Certificate Needed',
    message: 'Your Income Certificate needs to be uploaded for FY 2026-27 renewal.',
    time: '2 hours ago',
    type: 'action',
    read: false
  },
  {
    id: 'notif-2',
    title: 'College Verification Completed',
    message: 'Your college (CEG Anna University) has successfully verified your academic details.',
    time: 'Yesterday',
    type: 'success',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Scholarship Payment Received',
    message: '₹32,000 has been credited to your Aadhaar-linked SBI bank account.',
    time: '3 days ago',
    type: 'payment',
    read: true
  }
];

// Multilingual translations for accessibility (English, Tamil, Hindi)
export const TRANSLATIONS = {
  en: {
    brandName: 'Scholar Orbit',
    tagline: 'Your Scholarship Journey, Simplified.',
    whereAmI: 'Where am I?',
    whatToDo: 'What do I need to do?',
    whatNext: 'What happens next?',
    nextStepTitle: 'YOUR NEXT STEP',
    uploadIncomeTitle: 'Upload Income Certificate',
    uploadIncomeDesc: 'This document is needed before you can continue your application.',
    continueBtn: 'Continue',
    fixNowBtn: 'Fix Now',
    onTrackTitle: "YOU'RE ON TRACK",
    onTrackDesc: 'There are no actions required from you right now.',
    journeyTitle: 'YOUR SCHOLARSHIP JOURNEY',
    applicationsTitle: 'YOUR APPLICATIONS',
    scholarshipsForYou: 'SCHOLARSHIPS FOR YOU',
    yourMoney: 'YOUR MONEY',
    received: 'Received',
    pending: 'Pending',
    potentialBenefit: 'Potential Benefit',
    askSaathi: 'Ask Saathi',
    navHome: 'Home',
    navOpportunities: 'Explore',
    navApplications: 'Applications',
    navPassport: 'Passport',
    navDocuments: 'Documents',
    navFamily: 'Family',
    navAdmin: 'Officer Portal',
    navHelp: 'Help / Grievance',
    potentialMatchBadge: 'Potential match based on your profile',
    disclaimerGovt: 'Note: Scholar Orbit is an educational civic guidance platform. Final eligibility & sanctions are determined solely by authorized government departments.'
  },
  ta: {
    brandName: 'ஸ்காலர் ஆர்பிட் (Scholar Orbit)',
    tagline: 'உங்கள் கல்வி உதவித்தொகை பயணம், எளிதாக.',
    whereAmI: 'நான் எங்கே இருக்கிறேன்?',
    whatToDo: 'நான் என்ன செய்ய வேண்டும்?',
    whatNext: 'அடுத்து என்ன நடக்கும்?',
    nextStepTitle: 'உங்கள் அடுத்த கட்ட நடவடிக்கை',
    uploadIncomeTitle: 'வருமானச் சான்றிதழை பதிவேற்றவும்',
    uploadIncomeDesc: 'உங்கள் விண்ணப்பத்தை தொடர இந்த ஆவணம் தேவைப்படுகிறது.',
    continueBtn: 'தொடரவும்',
    fixNowBtn: 'இப்போதே சரிசெய்யவும்',
    onTrackTitle: 'எல்லாம் சரியாக உள்ளது',
    onTrackDesc: 'தற்போது உங்களிடமிருந்து எந்த நடவடிக்கையும் தேவையில்லை.',
    journeyTitle: 'உங்கள் கல்வி உதவித்தொகை பயணம்',
    applicationsTitle: 'உங்கள் விண்ணப்பங்கள்',
    scholarshipsForYou: 'உங்களுக்கான உதவித்தொகைகள்',
    yourMoney: 'உங்கள் நிதி உதவி',
    received: 'பெறப்பட்டது',
    pending: 'நிலுவையில் உள்ளது',
    potentialBenefit: 'சாத்தியமான உதவி',
    askSaathi: 'சாதியிடம் கேளுங்கள்',
    navHome: 'முகப்பு',
    navOpportunities: 'வாய்ப்புகள்',
    navApplications: 'விண்ணப்பங்கள்',
    navPassport: 'பாஸ்போர்ட்',
    navDocuments: 'ஆவணங்கள்',
    navFamily: 'குடும்பம்',
    navAdmin: 'அலுவலர் போர்டல்',
    navHelp: 'உதவி / குறைதீர்ப்பு',
    potentialMatchBadge: 'உங்கள் விவரங்களின் அடிப்படையிலான சாத்தியமான பொருத்தம்',
    disclaimerGovt: 'குறிப்பு: இறுதி தகுதி மற்றும் நிதி ஒதுக்கீடுகளை அரசுத் துறைகளே தீர்மானிக்கும்.'
  },
  hi: {
    brandName: 'स्कॉलर ऑर्बिट (Scholar Orbit)',
    tagline: 'आपकी छात्रवृत्ति यात्रा, सरल और सुगम।',
    whereAmI: 'मैं कहाँ हूँ?',
    whatToDo: 'मुझे क्या करना है?',
    whatNext: 'आगे क्या होगा?',
    nextStepTitle: 'आपका अगला कदम',
    uploadIncomeTitle: 'आय प्रमाण पत्र अपलोड करें',
    uploadIncomeDesc: 'आवेदन आगे बढ़ाने के लिए यह दस्तावेज़ आवश्यक है।',
    continueBtn: 'आगे बढ़ें',
    fixNowBtn: 'अभी ठीक करें',
    onTrackTitle: 'सब कुछ सही ट्रैक पर है',
    onTrackDesc: 'इस समय आपसे किसी अतिरिक्त कार्रवाई की आवश्यकता नहीं है।',
    journeyTitle: 'आपकी छात्रवृत्ति यात्रा',
    applicationsTitle: 'आपके आवेदन',
    scholarshipsForYou: 'आपके लिए छात्रवृत्तियां',
    yourMoney: 'आपकी छात्रवृत्ति राशि',
    received: 'प्राप्त हुई',
    pending: 'प्रक्रियाधीन',
    potentialBenefit: 'संभावित लाभ',
    askSaathi: 'साथी से पूछें',
    navHome: 'होम',
    navOpportunities: 'अवसर',
    navApplications: 'आवेदन',
    navPassport: 'पासपोर्ट',
    navDocuments: 'दस्तावेज़',
    navFamily: 'परिवार',
    navAdmin: 'अधिकारी पोर्टल',
    navHelp: 'सहायता / शिकायत',
    potentialMatchBadge: 'आपकी जानकारी के आधार पर संभावित मेल',
    disclaimerGovt: 'नोट: अंतिम पात्रता और स्वीकृति संबंधित सरकारी प्राधिकरण द्वारा ही निर्धारित की जाती है।'
  }
};

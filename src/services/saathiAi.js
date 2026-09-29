// Ask Saathi Knowledge-Powered Guidance Engine
// Grounded strictly in scholarship rules, student context, and official DBT guidelines

export function getSaathiResponse(query, contextData, language = 'en') {
  const q = (query || '').toLowerCase().trim();
  const { student, applications, documents } = contextData || {};

  // 1. Where is my payment / Payment Status
  if (q.includes('payment') || q.includes('money') || q.includes('disburse') || q.includes('dbt') || q.includes('fund') || q.includes('பணம்') || q.includes('पैसा')) {
    return {
      text: `Here is the clear breakdown of your scholarship money:
• Received so far: ₹32,000 (Top Class Scholarship, Tranche 1 via Aadhaar DBT to your SBI Account ••••4819).
• Pending disbursement: ₹18,000 (Tranche 2 is currently approved and queued in the Treasury release batch).
• Post-Matric grant: Currently undergoing Government Directorate Verification. Once sanctioned, approx. ₹38,000 will be credited directly.

Tip: Your bank account already has active Aadhaar NPCI seeding. No bank visits are needed right now!`,
      followUps: ['View Money Journey', 'Track Application', 'Check Bank Seeding']
    };
  }

  // 2. Which documents do I need?
  if (q.includes('document') || q.includes('vault') || q.includes('upload') || q.includes('certificate') || q.includes('ஆவணம்') || q.includes('दस्तावेज')) {
    const actionDocs = (documents || []).filter(d => d.isActionRequired);
    const actionNotice = actionDocs.length > 0 
      ? `⚠️ Action Required: Your "${actionDocs.map(d => d.name).join(', ')}" needs an updated renewal upload for FY 2026-27.`
      : `✓ All your essential documents are currently verified.`;

    return {
      text: `For your Post-Matric & Top Class ST Scholarships, the core required documents are:
1. Valid State-issued ST Community Certificate (Verified ✓)
2. Current Annual Income Certificate (< ₹2.50L / ₹8.00L ceiling)
3. Previous Year Academic Marksheet / Grade Card (Verified ✓)
4. Domicile / Nativity Certificate (Verified ✓)
5. Aadhaar-Seeded Bank Account Passbook (Verified ✓)
6. Bonafide Student ID from your college (Under Review ●)

${actionNotice}`,
      followUps: ['Open Document Vault', 'Upload Income Certificate', 'Check AI Scan']
    };
  }

  // 3. What should I do next? / Next steps
  if (q.includes('next') || q.includes('blocking') || q.includes('step') || q.includes('do now') || q.includes('அடுத்து') || q.includes('अगला')) {
    return {
      text: `Your immediate priority action is:
📄 Upload your renewed Annual Income Certificate (FY 2026-27).

Why? Your Post-Matric application (PM-2026-001245) is currently at the State Government Verification stage. The Welfare Officer requires your fresh income slip before sanctioning the order.

Once you upload it, you're 100% on track!`,
      followUps: ['Upload Income Certificate Now', 'View Application Tracker', 'See Timeline']
    };
  }

  // 4. Explain my application / Application Status
  if (q.includes('explain') || q.includes('application') || q.includes('status') || q.includes('track') || q.includes('நிலை')) {
    return {
      text: `You have 2 active applications in Tribal Saathi:

1. Post-Matric Scholarship (ID: PM-2026-001245)
• Current Stage: Government Directorate Verification (Stage 3 of 5)
• Anna University nodal office has already completed your college-level sign-off.
• Expected next step: Sanction order generation by District Welfare Officer.

2. Top Class Education Scheme (ID: TC-2026-004321)
• Status: Approved ✓
• ₹32,000 received. Balance ₹18,000 queued for release.`,
      followUps: ['Open Application Tracker', 'View Sanction Details', 'What is Blocking Me?']
    };
  }

  // 5. Find scholarships / Opportunities
  if (q.includes('find') || q.includes('scholarship') || q.includes('schemes') || q.includes('radar') || q.includes('வாய்ப்பு')) {
    return {
      text: `Based on your profile (ST, Undergraduate B.Tech CSE at CEG Anna University, Income ₹2.50L):

Top 3 Potential Matches:
1. Post-Matric Scholarship for ST Students (95% Potential Match — Currently In Progress)
2. Top Class Education Scheme (98% Potential Match — Approved)
3. National Fellowship for ST Students (70% Future Pathway for when you pursue Masters/Ph.D)

You can also explore the visual Scholarship Radar to see opportunities grouped by proximity to your degree!`,
      followUps: ['Explore Scholarship Radar', 'View All 5 Schemes', 'Check Eligibility Criteria']
    };
  }

  // 6. Language or accessibility
  if (q.includes('language') || q.includes('tamil') || q.includes('hindi') || q.includes('english') || q.includes('மொழி') || q.includes('भाषा')) {
    return {
      text: `You can switch between English, தமிழ் (Tamil), and हिन्दी (Hindi) anytime using the language selector at the top bar. You can also press the 🔊 Listen button on any screen to hear the guidance read aloud in simple, clear speech!`,
      followUps: ['Switch to English', 'தமிழுக்கு மாறுக', 'हिन्दी में बदलें']
    };
  }

  // Default intelligent civic-tech response
  return {
    text: `Namaste ${student?.fullName || 'Arun'}! I am Tribal Saathi, your dedicated companion for ST scholarships. 

I can help you understand your eligibility, guide you through missing documents like your Income Certificate, track government verification stages, and explain your DBT payment transfers.

What would you like to explore first?`,
    followUps: ['📄 Which documents do I need?', '💰 Where is my payment?', '🧭 What should I do next?', '🎓 Find scholarships']
  };
}

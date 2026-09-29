# TRIBAL SAATHI
### "Your Scholarship Journey, Simplified."
**Smart India Hackathon (SIH 2026) Prototype**

A unified, civic-tech scholarship guidance and management platform designed specifically for **Scheduled Tribe (ST) students and their families**. Built with modern consumer fintech/education aesthetics—simple, calm, trustworthy, accessible, and guided.

---

## 🌟 Core Product Features

### 1. Zero-Confusion Guided Onboarding
- **1-Question-per-screen** progressive questionnaire.
- Tracks ST status, education level, family income, study location, course & institution, and scholarship goals.
- Never loses data on Back button navigation.

### 2. Personal Scholarship Command Center (Home Screen)
- **"What is Blocking Me?" / Next Best Action**: Prominently highlights actions (e.g. *📄 Upload Income Certificate renewal for FY 2026-27*) to eliminate confusion.
- **Visual Connected Journey**: 6-stage timeline (Profile ✓ → Eligibility ✓ → Application ● → Verification ○ → Approval ○ → Disbursement ○).
- **Your Applications**: Immediate status cards for active submissions.
- **Scholarships For You**: Top 3 potential recommendations.
- **Your Money Snapshot**: Clear received (₹32,000) vs. pending (₹18,000) breakdown.

### 3. Scholarship Passport (`TS-2026-001245`)
- Unified digital identity combining verification badges, QR code, progress indicators (80% profile, 5/6 documents), and quick action controls.
- Distinctly labeled as an application guidance credential (not an official government ID).
- **Future Opportunity Pathway**: Visual roadmap mapping current B.Tech studies to National Fellowships and Overseas Study.

### 4. Interactive Scholarship Radar
- Visual opportunity map placing **YOU** at the center with orbital proximity indicating potential relevance:
  - *Post-Matric Scholarship* (95% Match)
  - *Top Class Education Scheme* (98% Match)
  - *National Fellowship for ST Students* (70% Future Pathway)
  - *National Overseas Scholarship* (65% Future Pathway)
  - *Pre-Matric Scholarship* (Sibling relevance)

### 5. Eligibility Explainer ("Why this scholarship appears for you")
- **You Told Us**: Highlights student demographic & income data.
- **Relevant Factors**: Explains which rules match.
- **Statutory Notice**: Clear disclaimer that final grants are sanctioned solely by government welfare authorities.

### 6. 5-Step Guided Application Flow
- Plain-language form ("Where do you live?", "Your family's yearly income").
- "Why do we need this?" helpful tooltips.
- Direct attachment of Vault certificates and celebratory confetti on submit.

### 7. Document Vault & AI Optical Check
- Digital repository for ST Certificate, Income Certificate, Marksheet, Domicile, Bank DBT Passbook, and Photo ID.
- Status badges: `Verified ✓`, `Action Required ⚠`, `Under Review ●`.
- Simulated **AI Document Pre-Check** verifying image clarity, document type, student name, and income validity before submission.

### 8. Application Tracker
- Connected vertical lifecycle tracker:
  `Submitted ✓ → College Verification ✓ → Government Verification ● → Approval ○ → Payment ○`
- Plain-language status explanations and next expected milestones.

### 9. Money Journey (Direct Benefit Transfer - DBT)
- Financial flow: Potential Benefit (₹50,000) → Approved (₹50,000) → Disbursed (₹32,000) → Pending (₹18,000).
- Detailed installment history with UTR references and NPCI Aadhaar bank seeding status.

### 10. Family Scholarship Tree
- Household multi-member dashboard tracking siblings (Ravi, Priya, Arun) across different educational stages.
- Consolidated metrics: 3 Members, 5 Applications, 2 Approved, ₹97,250 Received, 1 Action Required.
- Instant "+ Add Family Member" dialog.

### 11. Ask Saathi AI Assistant
- Knowledge-grounded assistant with 6 quick action prompts:
  - 🎓 *Find scholarships*
  - 📋 *Explain my application*
  - 📄 *Which documents do I need?*
  - 💰 *Where is my payment?*
  - 🧭 *What should I do next?*
  - 🌐 *Change language*
- Audio TTS speech capability to read answers aloud.

### 12. Accessibility & Multilingual Architecture
- **Language Switcher**: English, தமிழ் (Tamil), and हिन्दी (Hindi).
- **Audio Listen (`🔊 Listen`)**: Text-to-Speech narration for screen clarity.
- **Text Size Adjustment**: A− / A / A+ dynamic typography scaler.
- **High Contrast Mode**: Instant WCAG AAA contrast toggle.

### 13. District Welfare Officer Admin Portal
- Complete officer review workbench:
  - High-level KPIs: 12,482 Students, 8,294 Applications, 1,842 Pending Verification, 5,102 Approved, ₹2.84 Cr Disbursed.
  - Scrutiny queue with **Sanction & Approve** or **Request Revision** controls.
  - Document verification workbench.
  - Public grievance resolution desk.
  - Simulated Treasury DBT batch release desk.

### 14. Supabase Architecture
- Ready for Supabase via `src/lib/supabase.js` and `.env.example`.
- Table mapping for `profiles`, `scholarships`, `applications`, `application_status`, `documents`, `disbursements`, `family_members`, `grievances`, `notifications`.
- Seamless local mock fallback ensuring 100% demo reliability without runtime setup errors.

---

## 🎨 Civic-Tech Visual Palette
- **Deep Forest**: `#123B32` (Trust, dignity, nature)
- **Warm Terracotta**: `#C96B4B` (Indigenous craft, warmth, action)
- **Warm Sand**: `#F5EFE6` (Calm, readable background)
- **Soft Cream**: `#FCFAF6` (Surface cards)
- **Charcoal**: `#1E2723` (High legibility text)
- **Muted Green**: `#6E8B7D` (Progress accents)
- **Success**: `#3F8F65` (Verified & Approved states)
- **Warning**: `#D99A3D` (Action required items)

---

## 🚀 Running the Platform Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Open in browser:
   ```
   http://localhost:5173/
   ```

---

## ⏱️ 3-Minute Hackathon Demo Script for Judges

1. **Home Screen Command Center**: Point out the prompt question: *"What do I need to do?"* Highlight the prominent `⚠ ONE ACTION NEEDED` banner requesting the Income Certificate renewal.
2. **1-Click Simulation**: Click **"1-Click Upload Income Cert"** in the top simulation bar. Watch the banner immediately flip to `✓ YOU'RE ON TRACK`.
3. **Scholarship Radar**: Click **Opportunities** and switch to **Scholarship Radar**. Tap the **Post-Matric** bubble to show the **Eligibility Explainer** ("You told us... Relevant factors... Statutory notice").
4. **5-Step Guided Apply**: Click **Apply Now**, step through the plain-language inputs, and submit with celebratory confetti.
5. **Scholarship Passport**: Navigate to **Passport** to showcase the unified digital student card (`TS-2026-001245`), QR code, and **Future Opportunity Pathway**.
6. **Family Scholarship Tree**: Switch to **Family** to show household aggregation (Ravi, Priya, Arun) with ₹97,250 received.
7. **Ask Saathi**: Open **Ask Saathi** and tap *"Where is my payment?"* or *"What should I do next?"* to show grounded, conversational guidance.
8. **Officer Portal**: Toggle the **Officer Mode** button at the top right to demonstrate the government verification workbench, approve an application, and show how the student's status updates.

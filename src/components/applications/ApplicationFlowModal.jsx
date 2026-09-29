import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  UploadCloud, 
  AlertCircle, 
  HelpCircle,
  ShieldCheck,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { TribalDivider } from '../common/TribalPattern';

export function ApplicationFlowModal() {
  const {
    applyModalScheme,
    setApplyModalScheme,
    studentProfile,
    documents,
    submitApplication
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1); // 1 to 5
  const [activeHelpHint, setActiveHelpHint] = useState(null);

  // Form states with friendly defaults
  const [formData, setFormData] = useState({
    fullName: studentProfile.fullName,
    tribeCommunity: studentProfile.tribeSubcaste || 'Irular',
    address: '14, Gandhi Nagar, Tiruvannamalai Road',
    state: studentProfile.state,
    district: studentProfile.district,
    course: studentProfile.course,
    institution: studentProfile.institution,
    admissionRollNumber: '2024CEG0421',
    yearOfStudy: '2nd Year (Semester 3)',
    familyIncome: '250000',
    bankAccountName: 'State Bank of India',
    bankAccountNumber: '38920194819',
    ifscCode: 'SBIN0001842',
    aadhaarSeededConsent: true,
    undertakingAgreed: true
  });

  if (!applyModalScheme) return null;
  const scheme = applyModalScheme;

  const stepsList = [
    'Personal Details',
    'Academic Details',
    'Income & Bank',
    'Documents',
    'Review & Submit'
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      submitApplication(scheme, formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      setApplyModalScheme(null);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(18, 59, 50, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 60,
      padding: '16px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        style={{
          maxWidth: '620px',
          width: '100%',
          maxHeight: '92vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1.5px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          overflowY: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="tribal-accent-border"
      >
        {/* Top Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--color-warm-sand-light)'
        }}>
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-terracotta)', textTransform: 'uppercase' }}>
              Guided Application Flow • Step {currentStep} of 5
            </div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-deep-forest)', margin: '2px 0 0' }}>
              {scheme.title}
            </h3>
          </div>

          <button
            onClick={() => setApplyModalScheme(null)}
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-warm-sand)',
              color: 'var(--color-charcoal)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Visual Connected Progress Bar: ●━━●━━○━━○━━○ */}
        <div style={{ padding: '16px 24px 8px', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            {stepsList.map((stepName, idx) => {
              const stepNum = idx + 1;
              const isPast = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <div key={stepName} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: isPast ? 'var(--color-success)' : isCurrent ? 'var(--color-deep-forest)' : 'var(--color-warm-sand)',
                    color: isPast || isCurrent ? '#FFFFFF' : 'var(--color-subtle-text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    boxShadow: isCurrent ? '0 0 0 3px var(--color-terracotta-soft)' : 'none'
                  }}>
                    {isPast ? '✓' : stepNum}
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? 'var(--color-deep-forest)' : 'var(--color-muted-text)', marginTop: '4px', textAlign: 'center', display: 'none', md: 'block' }}>
                    {stepName.split(' ')[0]}
                  </span>
                </div>
              );
            })}

            {/* Connecting Horizontal Line */}
            <div style={{
              position: 'absolute',
              top: '14px',
              left: '16px',
              right: '16px',
              height: '3px',
              backgroundColor: 'var(--color-warm-sand-dark)',
              zIndex: 1
            }}>
              <div style={{
                height: '100%',
                backgroundColor: 'var(--color-terracotta)',
                width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%`,
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        </div>

        {/* Modal Form Body */}
        <div style={{ padding: '24px', flex: 1 }}>
          <AnimatePresence mode="wait">
            
            {/* STEP 1: PERSONAL DETAILS */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-deep-forest)', marginBottom: '4px' }}>
                  Step 1: Your Personal Details
                </h4>
                <p style={{ fontSize: '0.85rem', marginBottom: '18px' }}>
                  We keep language plain and simple. Tell us who you are.
                </p>

                <div className="form-group">
                  <label className="form-label">
                    <span>What is your full name?</span>
                    <button
                      type="button"
                      onClick={() => setActiveHelpHint(activeHelpHint === 'name' ? null : 'name')}
                      className="help-hint"
                    >
                      Why do we need this?
                    </button>
                  </label>
                  {activeHelpHint === 'name' && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-terracotta-dark)', backgroundColor: 'var(--color-terracotta-soft)', padding: '6px 10px', borderRadius: '4px', marginBottom: '6px' }}>
                      Must match exactly as printed on your Aadhaar card and ST Community Certificate for automatic bank DBT transfer.
                    </div>
                  )}
                  <input
                    type="text"
                    className="form-input"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Scheduled Tribe Sub-community</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.tribeCommunity}
                    onChange={(e) => setFormData({ ...formData, tribeCommunity: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>Where do you live? (Permanent Residence)</span>
                    <span className="help-hint">Plain Address</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.state}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">District</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: ACADEMIC DETAILS */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-deep-forest)', marginBottom: '4px' }}>
                  Step 2: Academic Details
                </h4>
                <p style={{ fontSize: '0.85rem', marginBottom: '18px' }}>
                  Your current university admission and roll details.
                </p>

                <div className="form-group">
                  <label className="form-label">College / Institute Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Course / Degree</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Student Roll / Reg Number</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.admissionRollNumber}
                      onChange={(e) => setFormData({ ...formData, admissionRollNumber: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Current Academic Year</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.yearOfStudy}
                      onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: INCOME & BANK DETAILS */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-deep-forest)', marginBottom: '4px' }}>
                  Step 3: Income & Bank Details
                </h4>
                <p style={{ fontSize: '0.85rem', marginBottom: '18px' }}>
                  Where your scholarship funds should be disbursed via Direct Benefit Transfer (DBT).
                </p>

                <div className="form-group">
                  <label className="form-label">
                    <span>Your family's yearly income (in ₹)</span>
                    <button
                      type="button"
                      onClick={() => setActiveHelpHint(activeHelpHint === 'income' ? null : 'income')}
                      className="help-hint"
                    >
                      Why do we need this?
                    </button>
                  </label>
                  {activeHelpHint === 'income' && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-terracotta-dark)', backgroundColor: 'var(--color-terracotta-soft)', padding: '6px 10px', borderRadius: '4px', marginBottom: '6px' }}>
                      Government criteria caps this scheme at ₹2,50,000 per annum. Needs to match the Revenue Tahsildar income certificate.
                    </div>
                  )}
                  <input
                    type="number"
                    className="form-input"
                    value={formData.familyIncome}
                    onChange={(e) => setFormData({ ...formData, familyIncome: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Bank Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.bankAccountName}
                      onChange={(e) => setFormData({ ...formData, bankAccountName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">IFSC Code</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.ifscCode}
                      onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Aadhaar-Linked Bank Account Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.bankAccountNumber}
                    onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--color-charcoal)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.aadhaarSeededConsent}
                    onChange={(e) => setFormData({ ...formData, aadhaarSeededConsent: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--color-deep-forest)' }}
                  />
                  <span>I authorize DBT mandate linkage via NPCI for direct treasury credit.</span>
                </label>
              </motion.div>
            )}

            {/* STEP 4: DOCUMENTS CHECK */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-deep-forest)', marginBottom: '4px' }}>
                  Step 4: Attached Vault Documents
                </h4>
                <p style={{ fontSize: '0.85rem', marginBottom: '16px' }}>
                  We automatically link verified certificates directly from your Tribal Saathi Vault.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                  {documents.map((doc) => (
                    <div key={doc.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: doc.status === 'Verified' ? 'var(--color-warm-sand-light)' : 'var(--color-warning-bg)',
                      border: '1px solid var(--color-border)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileCheck size={16} color={doc.status === 'Verified' ? 'var(--color-success)' : 'var(--color-warning-dark)'} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{doc.name}</span>
                      </div>
                      <span className={`badge ${doc.status === 'Verified' ? 'badge-success' : 'badge-warning'}`}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-text)', backgroundColor: 'var(--color-warm-sand)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                  ✓ Documents are cryptographically linked to your Scholarship Passport ID: {studentProfile.passportId}
                </div>
              </motion.div>
            )}

            {/* STEP 5: REVIEW & SUBMIT */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-deep-forest)', marginBottom: '4px' }}>
                  Step 5: Review & Submit
                </h4>
                <p style={{ fontSize: '0.85rem', marginBottom: '16px' }}>
                  Everything look good? Submit your application for institutional verification.
                </p>

                <div style={{
                  backgroundColor: 'var(--color-warm-sand-light)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '0.85rem',
                  marginBottom: '16px'
                }}>
                  <div><strong>Applicant:</strong> {formData.fullName} ({formData.tribeCommunity})</div>
                  <div><strong>Course & College:</strong> {formData.course}, {formData.institution}</div>
                  <div><strong>Income Stated:</strong> ₹{Number(formData.familyIncome).toLocaleString('en-IN')} / year</div>
                  <div><strong>DBT Account:</strong> {formData.bankAccountName} (••••{formData.bankAccountNumber.slice(-4)})</div>
                  <div><strong>Attached Documents:</strong> 6 Vault items attached</div>
                </div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.82rem', color: 'var(--color-charcoal)', cursor: 'pointer', marginBottom: '14px' }}>
                  <input
                    type="checkbox"
                    checked={formData.undertakingAgreed}
                    onChange={(e) => setFormData({ ...formData, undertakingAgreed: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--color-deep-forest)', marginTop: '2px' }}
                  />
                  <span>I solemnly declare that the statements made above are true to the best of my knowledge and relevant for government verification.</span>
                </label>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Modal Navigation Buttons */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF'
        }}>
          <button
            onClick={handleBack}
            className="btn-ghost"
            style={{ padding: '8px 14px' }}
          >
            <ArrowLeft size={16} />
            <span>{currentStep === 1 ? 'Cancel' : 'Back'}</span>
          </button>

          <button
            onClick={handleNext}
            className="btn-terracotta"
            style={{ padding: '12px 24px' }}
          >
            <span>{currentStep === 5 ? 'Confirm & Submit Application' : 'Continue'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

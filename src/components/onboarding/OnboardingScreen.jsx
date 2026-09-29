import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { TribalDivider, TribalWatermark } from '../common/TribalPattern';

export function OnboardingScreen() {
  const { setHasCompletedOnboarding, setActiveTab, setStudentProfile, studentProfile } = useApp();

  // Mode: 'welcome' | 'questions' | 'completed'
  const [step, setStep] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(1); // 1 to 6

  // Form answers state (never lost on Back)
  const [formData, setFormData] = useState({
    isST: 'Yes',
    educationLevel: 'Undergraduate',
    income: '250000',
    incomeUnknown: false,
    state: 'Tamil Nadu',
    district: 'Chennai',
    course: 'B.Tech Computer Science & Engineering',
    institution: 'College of Engineering, Guindy (Anna University)',
    lookingFor: 'Scholarship'
  });

  const handleStart = () => {
    setStep('questions');
    setCurrentQuestion(1);
  };

  const handleNext = () => {
    if (currentQuestion < 6) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Save collected data into student profile
      setStudentProfile(prev => ({
        ...prev,
        category: formData.isST === 'Yes' ? 'ST' : 'ST (Verification in progress)',
        currentEducation: formData.educationLevel,
        familyAnnualIncome: formData.incomeUnknown ? 250000 : Number(formData.income) || 250000,
        state: formData.state,
        district: formData.district,
        course: formData.course,
        institution: formData.institution
      }));
      setStep('completed');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      setStep('welcome');
    }
  };

  const handleFinish = () => {
    setHasCompletedOnboarding(true);
    setActiveTab('home');
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      position: 'relative'
    }}>
      <TribalWatermark opacity={0.03} />

      <div style={{
        maxWidth: '540px',
        width: '100%',
        backgroundColor: 'var(--color-pure-white)',
        borderRadius: 'var(--radius-xl)',
        border: '1.5px solid var(--color-border)',
        boxShadow: 'var(--shadow-lg)',
        padding: '36px 28px',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden'
      }} className="tribal-accent-border">

        <AnimatePresence mode="wait">
          {/* SCREEN 1: WELCOME INTRO */}
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                backgroundColor: 'var(--color-warm-sand)',
                color: 'var(--color-terracotta)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 4px 12px rgba(201, 107, 75, 0.15)'
              }}>
                <Sparkles size={32} />
              </div>

              <h1 style={{ fontSize: '1.75rem', marginBottom: '8px', color: 'var(--color-deep-forest)' }}>
                Welcome to Tribal Saathi
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--color-muted-text)', lineHeight: 1.6, marginBottom: '28px' }}>
                Let's find scholarships that may be relevant to you.
                <br />
                <strong style={{ color: 'var(--color-charcoal)' }}>It takes about 2 minutes.</strong>
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={handleStart}
                  className="btn-terracotta"
                  style={{ width: '100%', padding: '16px', fontSize: '1.05rem', borderRadius: 'var(--radius-md)' }}
                >
                  <span>Start Questionnaire</span>
                  <ArrowRight size={18} />
                </button>

                <div style={{ margin: '14px 0 6px', fontSize: '0.85rem', color: 'var(--color-subtle-text)' }}>
                  Already have an active application?
                </div>

                <button
                  onClick={() => {
                    setHasCompletedOnboarding(true);
                    setActiveTab('applications');
                  }}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '13px' }}
                >
                  <Compass size={17} />
                  <span>Track Existing Application</span>
                </button>
              </div>

              <TribalDivider className="my-6" />

              <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <ShieldCheck size={15} />
                <span>Your private data is protected & never shared with third parties</span>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: 1-QUESTION-PER-SCREEN GUIDED ONBOARDING */}
          {step === 'questions' && (
            <motion.div
              key={`q-${currentQuestion}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header with Back & Progress Counter */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <button
                  onClick={handleBack}
                  className="btn-ghost"
                  style={{ padding: '6px 10px', fontSize: '0.88rem' }}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>

                <div style={{
                  backgroundColor: 'var(--color-warm-sand)',
                  color: 'var(--color-deep-forest)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)'
                }}>
                  Question {currentQuestion} of 6
                </div>
              </div>

              {/* Connected Visual Progress Indicator */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '32px' }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: '6px',
                      borderRadius: '3px',
                      backgroundColor: i <= currentQuestion ? 'var(--color-terracotta)' : 'var(--color-warm-sand-dark)',
                      transition: 'background-color 0.25s ease'
                    }}
                  />
                ))}
              </div>

              {/* QUESTION 1 */}
              {currentQuestion === 1 && (
                <div>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Are you an ST student?</h2>
                  <p style={{ marginBottom: '24px' }}>Scheduled Tribe certificate helps us verify matching state and central government scholarship schemes.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {['Yes', "I'm not sure", 'No / Exploring for Family'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setFormData({ ...formData, isST: opt });
                          setTimeout(handleNext, 180);
                        }}
                        style={{
                          padding: '16px 20px',
                          textAlign: 'left',
                          borderRadius: 'var(--radius-md)',
                          border: formData.isST === opt ? '2px solid var(--color-deep-forest)' : '1.5px solid var(--color-border)',
                          backgroundColor: formData.isST === opt ? 'var(--color-warm-sand-light)' : '#FFFFFF',
                          fontWeight: 600,
                          fontSize: '1rem',
                          color: 'var(--color-charcoal)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span>{opt}</span>
                        {formData.isST === opt && <CheckCircle2 size={18} color="var(--color-deep-forest)" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* QUESTION 2 */}
              {currentQuestion === 2 && (
                <div>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>What are you currently studying?</h2>
                  <p style={{ marginBottom: '24px' }}>Schemes differ between school education, professional colleges, and research fellowships.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['School (Class 9 - 12)', 'Diploma / ITI', 'Undergraduate (e.g. B.Tech, B.Sc)', 'Postgraduate (e.g. M.Tech, M.A)', 'PhD / Research Scholar'].map((lvl) => {
                      const cleanLvl = lvl.split(' ')[0];
                      const isSelected = formData.educationLevel.toLowerCase().includes(cleanLvl.toLowerCase());
                      return (
                        <button
                          key={lvl}
                          onClick={() => {
                            setFormData({ ...formData, educationLevel: lvl });
                            setTimeout(handleNext, 180);
                          }}
                          style={{
                            padding: '14px 18px',
                            textAlign: 'left',
                            borderRadius: 'var(--radius-md)',
                            border: isSelected ? '2px solid var(--color-deep-forest)' : '1.5px solid var(--color-border)',
                            backgroundColor: isSelected ? 'var(--color-warm-sand-light)' : '#FFFFFF',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>{lvl}</span>
                          {isSelected && <CheckCircle2 size={18} color="var(--color-deep-forest)" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* QUESTION 3 */}
              {currentQuestion === 3 && (
                <div>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>What is your annual family income?</h2>
                  <p style={{ marginBottom: '20px' }}>Most central schemes have standard income brackets (such as under ₹2.5 Lakh for Post-Matric, ₹8 Lakh for Top Class).</p>
                  
                  <div className="form-group">
                    <label className="form-label">
                      <span>Annual Family Income (in ₹)</span>
                      <span className="help-hint">Why do we need this?</span>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.income}
                      onChange={(e) => setFormData({ ...formData, income: e.target.value, incomeUnknown: false })}
                      placeholder="e.g. 250000"
                      disabled={formData.incomeUnknown}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, incomeUnknown: !formData.incomeUnknown })}
                      style={{
                        padding: '10px 14px',
                        backgroundColor: formData.incomeUnknown ? 'var(--color-warm-sand)' : 'transparent',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.88rem',
                        color: 'var(--color-terracotta)',
                        fontWeight: 600,
                        border: '1px dashed var(--color-border)'
                      }}
                    >
                      {formData.incomeUnknown ? '✓ I will check my certificate later' : "I don't know my exact income right now"}
                    </button>
                  </div>

                  <button
                    onClick={handleNext}
                    className="btn-terracotta"
                    style={{ width: '100%', padding: '14px' }}
                  >
                    <span>Continue</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {/* QUESTION 4 */}
              {currentQuestion === 4 && (
                <div>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Where do you study?</h2>
                  <p style={{ marginBottom: '20px' }}>State welfare directorates disburse state-specific ST quota grants.</p>
                  
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <select
                      className="form-select"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    >
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Assam">Assam</option>
                      <option value="Rajasthan">Rajasthan</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">District</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="e.g. Chennai, Ranchi, Mayurbhanj"
                    />
                  </div>

                  <button
                    onClick={handleNext}
                    className="btn-terracotta"
                    style={{ width: '100%', padding: '14px', marginTop: '12px' }}
                  >
                    <span>Continue</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {/* QUESTION 5 */}
              {currentQuestion === 5 && (
                <div>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>What are you studying?</h2>
                  <p style={{ marginBottom: '20px' }}>Enter your course and college or school name.</p>
                  
                  <div className="form-group">
                    <label className="form-label">Course / Degree</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      placeholder="e.g. B.Tech Computer Science"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Institution / College Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g. CEG Anna University, IIT Madras"
                    />
                  </div>

                  <button
                    onClick={handleNext}
                    className="btn-terracotta"
                    style={{ width: '100%', padding: '14px', marginTop: '12px' }}
                  >
                    <span>Continue</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {/* QUESTION 6 */}
              {currentQuestion === 6 && (
                <div>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>What are you looking for?</h2>
                  <p style={{ marginBottom: '24px' }}>Pick your primary interest so we highlight the highest matching schemes.</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['Scholarship (Tuition fee & maintenance)', 'Fellowship (Postgraduate & Ph.D research)', 'Overseas Study (Top 500 Global Universities)', "I'm not sure (Show all matching opportunities)"].map((goal) => {
                      const clean = goal.split(' ')[0];
                      const isSelected = formData.lookingFor.includes(clean);
                      return (
                        <button
                          key={goal}
                          onClick={() => {
                            setFormData({ ...formData, lookingFor: goal });
                            setTimeout(handleNext, 180);
                          }}
                          style={{
                            padding: '14px 18px',
                            textAlign: 'left',
                            borderRadius: 'var(--radius-md)',
                            border: isSelected ? '2px solid var(--color-deep-forest)' : '1.5px solid var(--color-border)',
                            backgroundColor: isSelected ? 'var(--color-warm-sand-light)' : '#FFFFFF',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>{goal}</span>
                          {isSelected && <CheckCircle2 size={18} color="var(--color-deep-forest)" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* SCREEN 3: ONBOARDING COMPLETION SUCCESS */}
          {step === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                border: '2px solid var(--color-success)'
              }}>
                <CheckCircle2 size={38} />
              </div>

              <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
                Profile Configured!
              </h2>

              <p style={{ fontSize: '1rem', color: 'var(--color-muted-text)', lineHeight: 1.5, marginBottom: '24px' }}>
                Tribal Saathi identified <strong style={{ color: 'var(--color-deep-forest)' }}>3 potential scholarship opportunities</strong> matching your education and demographic background.
              </p>

              <div style={{
                backgroundColor: 'var(--color-warm-sand-light)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                textAlign: 'left',
                marginBottom: '28px'
              }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-green)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                  Your Scholarship Passport ID
                </div>
                <div style={{ fontSize: '1.2rem', fontFamily: 'monospace', fontWeight: 800, color: 'var(--color-deep-forest)' }}>
                  TS-2026-001245
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-muted-text)', marginTop: '4px' }}>
                  {formData.course} • {formData.state}
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '1.05rem', borderRadius: 'var(--radius-md)' }}
              >
                <span>Enter Your Command Center</span>
                <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function StudentLoginScreen({ onNavigate }) {
  const { loginAsStudent } = useAuth();

  // Mode: 'mobile' | 'email'
  const [authMode, setAuthMode] = useState('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMessage('');
    setOtpSent(true);
    setOtpCode('4819'); // Demo OTP pre-filled for convenience
  };

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (otpCode !== '4819' && otpCode.length !== 4) {
      setErrorMessage('Please enter the 4-digit OTP (Demo code: 4819).');
      return;
    }
    loginAsStudent({ identifier: mobileNumber, isDemo: false });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    loginAsStudent({ identifier: email, password, isDemo: false });
  };

  const handleDemoStudentLogin = () => {
    loginAsStudent({ isDemo: true });
  };

  return (
    <div className="student-login-screen" style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-warm-sand-light)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <TribalWatermark opacity={0.03} />

      {/* Top Banner */}
      <div style={{
        backgroundColor: 'var(--color-deep-forest)',
        color: 'var(--color-warm-sand)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.82rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 800, color: 'var(--color-terracotta)' }}>SCHOLAR ORBIT</span>
          <span>• Student Authentication Desk</span>
        </div>

        <button
          onClick={() => onNavigate('landing')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-warm-sand)',
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to Role Selection</span>
        </button>
      </div>

      {/* Main Login Card Container */}
      <div style={{
        flex: 1,
        maxWidth: '480px',
        width: '100%',
        margin: '40px auto',
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="card tribal-accent-border"
          style={{
            padding: '32px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: 'var(--color-warm-sand)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              marginBottom: '12px'
            }}>
              🎓
            </div>
            <h2 style={{ fontSize: '1.45rem', color: 'var(--color-deep-forest)', margin: '0 0 4px', fontWeight: 800 }}>
              STUDENT LOGIN
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-text)', margin: 0 }}>
              Access your scholarship passport, applications, and payments.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div style={{
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              color: '#991B1B',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              marginBottom: '16px'
            }}>
              {errorMessage}
            </div>
          )}

          {/* Auth Mode Tabs: Mobile OTP vs Email */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--color-warm-sand)',
            padding: '3px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px'
          }}>
            <button
              type="button"
              onClick={() => { setAuthMode('mobile'); setErrorMessage(''); }}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: authMode === 'mobile' ? '#FFFFFF' : 'transparent',
                color: authMode === 'mobile' ? 'var(--color-deep-forest)' : 'var(--color-muted-text)',
                fontWeight: authMode === 'mobile' ? 700 : 500,
                fontSize: '0.84rem',
                cursor: 'pointer'
              }}
            >
              Mobile OTP
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('email'); setErrorMessage(''); }}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: authMode === 'email' ? '#FFFFFF' : 'transparent',
                color: authMode === 'email' ? 'var(--color-deep-forest)' : 'var(--color-muted-text)',
                fontWeight: authMode === 'email' ? 700 : 500,
                fontSize: '0.84rem',
                cursor: 'pointer'
              }}
            >
              Email & Password
            </button>
          </div>

          {/* Form 1: Mobile Number + OTP */}
          {authMode === 'mobile' && (
            <form onSubmit={otpSent ? handleMobileSubmit : handleSendOtp}>
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Mobile Number</label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: '12px',
                    top: '11px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: 'var(--color-muted-text)'
                  }}>
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="98401 23456"
                    className="form-input"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    disabled={otpSent}
                    style={{ paddingLeft: '48px', height: '42px', fontSize: '0.92rem' }}
                    required
                  />
                </div>
              </div>

              {otpSent && (
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label" style={{ fontWeight: 600 }}>
                    Enter 4-Digit OTP Code
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="4819"
                    className="form-input"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    style={{ height: '42px', fontSize: '1.1rem', letterSpacing: '0.2em', textAlign: 'center', fontWeight: 700 }}
                    required
                  />
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-green)', marginTop: '4px' }}>
                    Demo OTP generated: <strong>4819</strong>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '11px 18px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>{otpSent ? 'Verify OTP & Enter' : 'Send OTP'}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* Form 2: Email & Password */}
          {authMode === 'email' && (
            <form onSubmit={handleEmailSubmit}>
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="var(--color-muted-text)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                  <input
                    type="email"
                    placeholder="student@example.com"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: '38px', height: '42px', fontSize: '0.9rem' }}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="var(--color-muted-text)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: '38px', height: '42px', fontSize: '0.9rem' }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '11px 18px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>Login</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* Link: Create Student Account */}
          <div style={{ textAlign: 'center', margin: '20px 0 16px' }}>
            <button
              type="button"
              onClick={() => onNavigate('student-register')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-terracotta)',
                fontWeight: 700,
                fontSize: '0.86rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              [ Create Student Account ]
            </button>
          </div>

          {/* CLEARLY LABELLED SIH DEMO LOGIN BOX */}
          <div style={{
            backgroundColor: 'var(--color-warm-sand-light)',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: 'var(--color-deep-forest)',
              backgroundColor: 'var(--color-warm-sand)',
              padding: '2px 8px',
              borderRadius: '4px',
              marginBottom: '6px'
            }}>
              <Sparkles size={12} color="var(--color-terracotta)" />
              <span>SIH DEMO LOGIN</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--color-muted-text)', marginBottom: '10px' }}>
              Instant prototype access as <strong>Arun Kumar (ST Student)</strong>
            </div>

            <button
              type="button"
              onClick={handleDemoStudentLogin}
              className="btn-secondary"
              style={{
                width: '100%',
                padding: '9px 14px',
                fontSize: '0.82rem',
                fontWeight: 600
              }}
            >
              [ 1-Click Student Demo Login ]
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.7rem', color: 'var(--color-subtle-text)' }}>
            Note: Prototype mode. Does not imply real government authentication.
          </div>
        </motion.div>
      </div>
    </div>
  );
}

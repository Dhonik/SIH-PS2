import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Building, 
  KeyRound, 
  BadgeCheck 
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function OfficerLoginScreen({ onNavigate }) {
  const { loginAsOfficer } = useAuth();

  const [officialId, setOfficialId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!officialId) {
      setErrorMessage('Please enter your Government Official ID.');
      return;
    }
    loginAsOfficer({ officialId, password, isDemo: false });
  };

  const handleDemoOfficerLogin = () => {
    loginAsOfficer({ isDemo: true });
  };

  return (
    <div className="officer-login-screen" style={{
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
          <span>• District Welfare Directorate Access</span>
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
          className="card"
          style={{
            padding: '34px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--color-border)'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'var(--color-deep-forest)',
              color: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}>
              <ShieldCheck size={30} />
            </div>
            <h2 style={{ fontSize: '1.45rem', color: 'var(--color-deep-forest)', margin: '0 0 4px', fontWeight: 800 }}>
              OFFICER LOGIN
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-text)', margin: 0 }}>
              Directorate of Tribal Welfare & District Scrutiny Desk
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

          {/* Official Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontWeight: 600 }}>Government Official ID</label>
              <div style={{ position: 'relative' }}>
                <Building size={16} color="var(--color-muted-text)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                <input
                  type="text"
                  placeholder="e.g. TN-DWO-2026-4091"
                  className="form-input"
                  value={officialId}
                  onChange={(e) => setOfficialId(e.target.value)}
                  style={{ paddingLeft: '38px', height: '42px', fontSize: '0.9rem' }}
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{ fontWeight: 600 }}>Password / e-Token Pin</label>
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
              className="btn-terracotta"
              style={{
                width: '100%',
                padding: '12px 18px',
                fontSize: '0.92rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '20px'
              }}
            >
              <span>Secure Login</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* CLEARLY LABELLED SIH DEMO OFFICER ACCESS */}
          <div style={{
            backgroundColor: 'var(--color-warm-sand-light)',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
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
              <span>SIH DEMO OFFICER ACCESS</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-text)', marginBottom: '12px' }}>
              Access as <strong>Dr. K. Senthil Nathan, IAS</strong> (District Welfare Officer, Desk #04)
            </div>

            <button
              type="button"
              onClick={handleDemoOfficerLogin}
              className="btn-secondary"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '0.84rem',
                fontWeight: 700,
                color: 'var(--color-deep-forest)'
              }}
            >
              [ 1-Click Officer Demo Login ]
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.7rem', color: 'var(--color-subtle-text)', lineHeight: 1.4 }}>
            SIH 2026 Evaluation: Simulated administrative authentication. Does not claim to be actual government authentication.
          </div>
        </motion.div>
      </div>
    </div>
  );
}

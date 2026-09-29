import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft, LogOut, CheckCircle2, UserCheck } from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function AccessDeniedScreen({ attemptedRole, currentRole, onReturn }) {
  const { logout, user } = useAuth();

  const isStudentAttemptingOfficer = currentRole === 'student' && attemptedRole === 'officer';

  return (
    <div className="access-denied-screen" style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-warm-sand-light)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative'
    }}>
      <TribalWatermark opacity={0.03} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card"
        style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '36px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border)'
        }}
      >
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <ShieldAlert size={36} />
        </div>

        <span className="badge badge-terracotta" style={{ fontSize: '0.74rem', marginBottom: '8px' }}>
          ACCESS RESTRICTED • ROLE MISMATCH
        </span>

        <h2 style={{ fontSize: '1.45rem', color: 'var(--color-charcoal)', margin: '8px 0 6px', fontWeight: 800 }}>
          {isStudentAttemptingOfficer ? 'Officer Verification Portal Restricted' : 'Student Portal Restricted'}
        </h2>

        <p style={{ fontSize: '0.9rem', color: 'var(--color-muted-text)', lineHeight: 1.5, marginBottom: '20px' }}>
          {isStudentAttemptingOfficer ? (
            <>
              You are currently logged in as <strong>{user?.name || 'Student'} (Student Role)</strong>. Department scrutiny and sanction desks require Government Officer clearance.
            </>
          ) : (
            <>
              You are currently logged in as <strong>{user?.name || 'Officer'} (Officer Role)</strong>. To view the student-facing scholarship experience, use the switch function or log in as a student.
            </>
          )}
        </p>

        <div style={{
          backgroundColor: 'var(--color-warm-sand-light)',
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.8rem',
          color: 'var(--color-deep-forest)',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <div><strong>Active Session:</strong> {user?.name || 'User'}</div>
          <div><strong>Current Role:</strong> {currentRole?.toUpperCase()}</div>
          <div><strong>Attempted Route:</strong> {attemptedRole?.toUpperCase()} Workspace</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={onReturn}
            className="btn-primary"
            style={{
              padding: '12px 18px',
              fontSize: '0.9rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to {currentRole === 'student' ? 'Student Portal' : 'Officer Portal'}</span>
          </button>

          <button
            onClick={logout}
            className="btn-secondary"
            style={{
              padding: '10px 18px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={15} />
            <span>Log Out & Choose Another Role</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

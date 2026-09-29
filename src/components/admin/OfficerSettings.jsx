import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  Eye, 
  Globe, 
  LogOut, 
  CheckCircle2, 
  Save
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function OfficerSettings() {
  const {
    setUserRole,
    setActiveTab,
    language,
    setLanguage,
    fontScale,
    setFontScale,
    isHighContrast,
    setIsHighContrast
  } = useApp();

  const [notificationPrefs, setNotificationPrefs] = useState({
    urgentGrievance: true,
    newBatchDisbursement: true,
    expiredCertificates: true,
    dailySummaryEmail: false
  });

  const [successToast, setSuccessToast] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSuccessToast('Officer preferences and scrutiny settings successfully saved.');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  return (
    <div className="officer-settings-view" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Screen Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-deep-forest)', margin: 0, fontWeight: 800 }}>
              Officer Settings
            </h1>
            <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--color-warm-sand)', color: 'var(--color-terracotta-dark)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
              DESK CONFIGURATION
            </span>
          </div>
          <p style={{ marginTop: '4px', fontSize: '0.88rem', color: 'var(--color-muted-text)' }}>
            Official profile, jurisdictional department allocation, notification alerts, and accessibility controls.
          </p>
        </div>

        <button
          onClick={() => {
            setUserRole('student');
            setActiveTab('home');
          }}
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <LogOut size={15} />
          <span>Exit Officer Mode</span>
        </button>
      </div>

      {/* Success Toast */}
      {successToast && (
        <div style={{
          backgroundColor: 'var(--color-success-bg)',
          color: 'var(--color-success-dark)',
          border: '1px solid var(--color-success)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '20px',
          fontWeight: 600,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={18} />
          <span>{successToast}</span>
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* 1. Official Officer Profile Card */}
        <div className="card tribal-accent-border" style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-deep-forest)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              SN
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-charcoal)', fontWeight: 800 }}>
                  Dr. K. Senthil Nathan, IAS
                </h3>
                <span className="badge badge-forest" style={{ fontSize: '0.7rem' }}>
                  ACTIVE SESSION
                </span>
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--color-muted-text)', marginTop: '2px' }}>
                Official ID: <strong>TN-DWO-2026-4091</strong> • Security Clearance: Level 3 (Sanctioning Authority)
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
            backgroundColor: 'var(--color-warm-sand-light)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            fontSize: '0.84rem'
          }}>
            <div>
              <div style={{ color: 'var(--color-subtle-text)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>
                DESIGNATION & ROLE
              </div>
              <div style={{ fontWeight: 700, color: 'var(--color-charcoal)', marginTop: '2px' }}>
                District Welfare Officer & Scrutiny Lead
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--color-subtle-text)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>
                DEPARTMENT
              </div>
              <div style={{ fontWeight: 700, color: 'var(--color-charcoal)', marginTop: '2px' }}>
                Directorate of Tribal Welfare, Tamil Nadu
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--color-subtle-text)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>
                ASSIGNED JURISDICTION
              </div>
              <div style={{ fontWeight: 700, color: 'var(--color-charcoal)', marginTop: '2px' }}>
                Chennai, Chengalpattu & Tiruvannamalai
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--color-subtle-text)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>
                MINISTRY APPOINTMENT
              </div>
              <div style={{ fontWeight: 700, color: 'var(--color-charcoal)', marginTop: '2px' }}>
                Ministry of Tribal Affairs, Govt of India
              </div>
            </div>
          </div>
        </div>

        {/* 2. Notification Preferences */}
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Bell size={18} color="var(--color-terracotta)" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-deep-forest)', fontWeight: 700 }}>
              Scrutiny Alerts & Notification Preferences
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={notificationPrefs.urgentGrievance}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, urgentGrievance: e.target.checked })}
              />
              <div>
                <strong>High Priority Citizen Grievance Alerts</strong>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-muted-text)' }}>Immediate push alert when payment escalations remain unaddressed for {'>'}48 hours.</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={notificationPrefs.newBatchDisbursement}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, newBatchDisbursement: e.target.checked })}
              />
              <div>
                <strong>PFMS DBT Batch Transfer Ready Notices</strong>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-muted-text)' }}>Notification when Treasury countersigns a release batch for your division.</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={notificationPrefs.expiredCertificates}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, expiredCertificates: e.target.checked })}
              />
              <div>
                <strong>Expired Annual Income Certificate Auto-Flag</strong>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-muted-text)' }}>Automatically highlight applications pending FY 2026-27 renewals.</div>
              </div>
            </label>
          </div>
        </div>

        {/* 3. Accessibility & Language Controls */}
        <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Globe size={18} color="var(--color-deep-forest)" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-deep-forest)', fontWeight: 700 }}>
              Language & Accessibility Controls
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Portal Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="form-input"
                style={{ height: '40px' }}
              >
                <option value="en">English</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Font Scale</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['sm', 'md', 'lg'].map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setFontScale(scale)}
                    className="btn-secondary"
                    style={{
                      flex: 1,
                      padding: '8px',
                      fontWeight: fontScale === scale ? 700 : 500,
                      backgroundColor: fontScale === scale ? 'var(--color-deep-forest)' : 'var(--color-warm-sand)',
                      color: fontScale === scale ? '#FFFFFF' : 'var(--color-charcoal)'
                    }}
                  >
                    {scale.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">High Contrast Mode</label>
              <button
                type="button"
                onClick={() => setIsHighContrast(!isHighContrast)}
                className="btn-secondary"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: isHighContrast ? 'var(--color-charcoal)' : 'var(--color-warm-sand)',
                  color: isHighContrast ? '#FFFFFF' : 'var(--color-charcoal)'
                }}
              >
                <Eye size={16} />
                <span>{isHighContrast ? 'High Contrast Enabled' : 'Standard Contrast'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '11px 22px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Save size={16} />
            <span>Save Preferences</span>
          </button>
        </div>

      </form>
    </div>
  );
}

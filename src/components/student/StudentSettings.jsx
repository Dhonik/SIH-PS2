import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Bell, 
  Globe, 
  Eye, 
  ShieldCheck, 
  CheckCircle2, 
  Save, 
  Award,
  Sparkles,
  LogOut
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function StudentSettings() {
  const {
    studentProfile,
    language,
    setLanguage,
    fontScale,
    setFontScale,
    isHighContrast,
    setIsHighContrast,
    setActiveTab,
    t
  } = useApp();

  const { logout, user } = useAuth();

  const [notificationPrefs, setNotificationPrefs] = useState({
    smsAlerts: true,
    whatsappDbtAlerts: true,
    renewalReminders: true,
    newSchemeAnnouncements: false
  });

  const [contactInfo, setContactInfo] = useState({
    email: user?.email || studentProfile.email || 'arun.kumar@ceg.edu.in',
    phone: studentProfile.phoneNumber || '+91 98401 23456'
  });

  const [successToast, setSuccessToast] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSuccessToast('Your scholarship profile preferences have been successfully updated.');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  return (
    <div className="student-settings-view" style={{ position: 'relative', maxWidth: '980px', margin: '0 auto' }}>
      <TribalWatermark opacity={0.02} />

      {/* Screen Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-deep-forest)', margin: 0, fontWeight: 800 }}>
              Student Settings & Preferences
            </h1>
            <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--color-warm-sand)', color: 'var(--color-deep-forest)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
              STUDENT PROFILE
            </span>
          </div>
          <p style={{ marginTop: '4px', fontSize: '0.9rem', color: 'var(--color-muted-text)' }}>
            Manage your personal contact info, real-time alert notifications, language preferences, and accessibility settings.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('passport')}
          className="btn-secondary"
          style={{ padding: '9px 16px', fontSize: '0.85rem' }}
        >
          <Award size={15} />
          <span>View Scholarship Passport</span>
        </button>
      </div>

      {successToast && (
        <div style={{
          backgroundColor: '#DEF7EC',
          border: '1px solid #31C48D',
          color: '#03543F',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px'
        }}>
          <CheckCircle2 size={18} color="#0E9F6E" />
          <span>{successToast}</span>
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        
        {/* CARD 1: Identity & Educational Record (Read-Only Verified) */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-warm-sand)',
              color: 'var(--color-deep-forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-deep-forest)' }}>
                Verified Tribal Student Identity
              </h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-muted-text)' }}>
                Authenticated against e-Aadhaar and ST Community Registry
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', backgroundColor: 'var(--color-warm-sand-light)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', textTransform: 'uppercase', fontWeight: 700 }}>Full Name</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-charcoal)', marginTop: '2px' }}>{studentProfile.fullName}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', textTransform: 'uppercase', fontWeight: 700 }}>Passport Credential ID</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--color-terracotta-dark)', marginTop: '2px' }}>{studentProfile.passportId}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', textTransform: 'uppercase', fontWeight: 700 }}>Community / Category</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-charcoal)', marginTop: '2px' }}>{studentProfile.tribeSubcaste} (ST)</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', textTransform: 'uppercase', fontWeight: 700 }}>Current Institution</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-charcoal)', marginTop: '2px' }}>{studentProfile.institution}</div>
            </div>
          </div>
        </div>

        {/* CARD 2: Contact Information */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-warm-sand)',
              color: 'var(--color-deep-forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-deep-forest)' }}>
                Contact & Alert Delivery Details
              </h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-muted-text)' }}>
                Government notifications and DBT credit SMS are delivered to these coordinates
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Mobile Number (Aadhaar OTP Linked)</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} color="var(--color-muted-text)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Registered Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--color-muted-text)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Notification Alerts */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-warm-sand)',
              color: 'var(--color-deep-forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bell size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-deep-forest)' }}>
                Application & Payment Alerts
              </h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-muted-text)' }}>
                Choose which milestones trigger instant SMS and WhatsApp notifications
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-warm-sand-light)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>SMS Verification Stage Updates</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-muted-text)' }}>Alert me when college or district welfare officer verifies my form</div>
              </div>
              <input
                type="checkbox"
                checked={notificationPrefs.smsAlerts}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, smsAlerts: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--color-deep-forest)' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-warm-sand-light)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>WhatsApp DBT Disbursement Alert</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-muted-text)' }}>Receive immediate payment confirmation and UTR transfer receipt on WhatsApp</div>
              </div>
              <input
                type="checkbox"
                checked={notificationPrefs.whatsappDbtAlerts}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, whatsappDbtAlerts: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--color-deep-forest)' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-warm-sand-light)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>Income & Document Expiry Reminders</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-muted-text)' }}>Notify 30 days before annual income certificate requires revenue renewal</div>
              </div>
              <input
                type="checkbox"
                checked={notificationPrefs.renewalReminders}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, renewalReminders: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--color-deep-forest)' }}
              />
            </label>
          </div>
        </div>

        {/* CARD 4: Accessibility & Language */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-warm-sand)',
              color: 'var(--color-deep-forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Globe size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-deep-forest)' }}>
                Language & Accessibility Display
              </h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-muted-text)' }}>
                Customize font size, contrast, and your primary scholarship language
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
            <div>
              <label className="form-label" style={{ fontWeight: 600 }}>Platform Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="form-input"
              >
                <option value="en">English (Default)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: 600 }}>Text Size Scaling</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setFontScale('sm')}
                  className={fontScale === 'sm' ? 'btn-primary' : 'btn-secondary'}
                  style={{ flex: 1, padding: '9px 0', fontSize: '0.85rem' }}
                >
                  Standard (A-)
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale('md')}
                  className={fontScale === 'md' ? 'btn-primary' : 'btn-secondary'}
                  style={{ flex: 1, padding: '9px 0', fontSize: '0.9rem' }}
                >
                  Default (A)
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale('lg')}
                  className={fontScale === 'lg' ? 'btn-primary' : 'btn-secondary'}
                  style={{ flex: 1, padding: '9px 0', fontSize: '1.05rem', fontWeight: 700 }}
                >
                  Large (A+)
                </button>
              </div>
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: 600 }}>High Contrast Mode</label>
              <button
                type="button"
                onClick={() => setIsHighContrast(!isHighContrast)}
                style={{
                  width: '100%',
                  padding: '9px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: isHighContrast ? 'var(--color-charcoal)' : 'var(--color-warm-sand)',
                  color: isHighContrast ? '#FFFFFF' : 'var(--color-deep-forest)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Eye size={16} />
                <span>{isHighContrast ? 'Enabled (High Contrast)' : 'Standard Palette'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '12px 28px', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Save size={16} />
            <span>Save Preferences</span>
          </button>
        </div>

      </form>
    </div>
  );
}

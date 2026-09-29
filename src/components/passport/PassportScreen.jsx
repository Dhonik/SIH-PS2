import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  QrCode, 
  ShieldCheck, 
  FileCheck, 
  FileText, 
  Share2, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  School,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { TribalPassportAccent, TribalWatermark } from '../common/TribalPattern';

export function PassportScreen() {
  const {
    studentProfile,
    documents,
    applications,
    scholarships,
    setActiveTab,
    simulateIncomeCertificateUpload,
    t
  } = useApp();

  const verifiedDocsCount = documents.filter(d => d.status === 'Verified').length;
  const totalDocsCount = documents.length;
  const potentialMatchesCount = 3;

  return (
    <div className="passport-screen" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.03} />

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.85rem', color: 'var(--color-deep-forest)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🎓 Scholarship Passport</span>
        </h1>
        <p style={{ marginTop: '4px', fontSize: '0.92rem', color: 'var(--color-muted-text)' }}>
          Your verified unified digital identity & scholarship journey profile.
        </p>
      </div>

      {/* THE PASSPORT DIGITAL CARD */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card tribal-accent-border"
        style={{
          maxWidth: '680px',
          margin: '0 auto 32px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '2px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          padding: 0,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top Header Strip */}
        <div style={{
          backgroundColor: 'var(--color-deep-forest)',
          color: 'var(--color-warm-sand)',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-terracotta)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Award size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                SCHOLAR ORBIT PASSPORT
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(245, 239, 230, 0.75)' }}>
                Unified Student Application Profile • Not an official Govt ID
              </div>
            </div>
          </div>

          <span style={{
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            backgroundColor: 'rgba(255,255,255,0.12)',
            padding: '4px 10px',
            borderRadius: '6px',
            color: 'var(--color-warm-sand)',
            fontWeight: 700
          }}>
            {studentProfile.passportId}
          </span>
        </div>

        {/* Subtle Geometric Passport Accent Stripe */}
        <TribalPassportAccent />

        {/* Passport Body */}
        <div style={{ padding: '28px 24px' }}>
          
          {/* Student Info Hero */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '16px',
                backgroundColor: 'var(--color-warm-sand)',
                border: '2px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--color-deep-forest)'
              }}>
                AK
              </div>

              <div>
                <h2 style={{ fontSize: '1.45rem', color: 'var(--color-charcoal)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  {studentProfile.fullName}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge badge-terracotta">
                    Scheduled Tribe ({studentProfile.tribeSubcaste})
                  </span>
                  <span className="badge badge-forest">
                    {studentProfile.currentEducation}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code Verification Stamp */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'var(--color-warm-sand-light)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)'
            }}>
              <QrCode size={48} color="var(--color-deep-forest)" />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-muted-green)', marginTop: '4px' }}>
                DIGITAL VERIFIED
              </span>
            </div>
          </div>

          {/* Academic & Geographic details */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            backgroundColor: 'var(--color-warm-sand-light)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)',
            marginBottom: '24px'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', textTransform: 'uppercase', fontWeight: 700 }}>
                Course
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                {studentProfile.course}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', textTransform: 'uppercase', fontWeight: 700 }}>
                Institution
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                {studentProfile.institution}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', textTransform: 'uppercase', fontWeight: 700 }}>
                Location
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                {studentProfile.district}, {studentProfile.state}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', textTransform: 'uppercase', fontWeight: 700 }}>
                DBT Aadhaar Seeding
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={14} /> Active ({studentProfile.bankName})
              </div>
            </div>
          </div>

          {/* Metric Badges Grid: Profile Completion, Documents, Matches, Applications */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            
            {/* Profile 80% */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', fontWeight: 600, textTransform: 'uppercase' }}>
                Profile
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-deep-forest)', margin: '4px 0' }}>
                {studentProfile.profileCompletion}%
              </div>
              <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--color-warm-sand)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${studentProfile.profileCompletion}%`, height: '100%', backgroundColor: 'var(--color-success)' }} />
              </div>
            </div>

            {/* Documents 5/6 */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', fontWeight: 600, textTransform: 'uppercase' }}>
                Documents
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-terracotta)', margin: '4px 0' }}>
                {verifiedDocsCount} / {totalDocsCount}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)' }}>
                {verifiedDocsCount === totalDocsCount ? 'All Verified ✓' : '1 Action Needed ⚠'}
              </div>
            </div>

            {/* Potential Matches: 3 */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', fontWeight: 600, textTransform: 'uppercase' }}>
                Potential Matches
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-deep-forest)', margin: '4px 0' }}>
                {potentialMatchesCount}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-green)' }}>
                High Relevance
              </div>
            </div>

            {/* Applications: 2 */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', fontWeight: 600, textTransform: 'uppercase' }}>
                Applications
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-deep-forest)', margin: '4px 0' }}>
                {applications.length}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)' }}>
                1 Appr • 1 Review
              </div>
            </div>

          </div>

          {/* 3 Mandatory Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
            <button
              onClick={() => {
                if (verifiedDocsCount < totalDocsCount) {
                  simulateIncomeCertificateUpload();
                } else {
                  alert('Profile is already 100% complete!');
                }
              }}
              className="btn-terracotta"
              style={{ padding: '12px', fontSize: '0.9rem' }}
            >
              <span>{studentProfile.profileCompletion < 100 ? 'Complete Profile' : 'Profile Complete ✓'}</span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className="btn-secondary"
              style={{ padding: '12px', fontSize: '0.9rem' }}
            >
              <FileCheck size={16} />
              <span>View Documents</span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className="btn-secondary"
              style={{ padding: '12px', fontSize: '0.9rem' }}
            >
              <FileText size={16} />
              <span>View Applications</span>
            </button>
          </div>

        </div>

        {/* Clear Disclaimer Footer */}
        <div style={{
          backgroundColor: 'var(--color-warm-sand)',
          padding: '10px 20px',
          borderTop: '1px solid var(--color-border)',
          fontSize: '0.72rem',
          color: 'var(--color-muted-text)',
          textAlign: 'center'
        }}>
          Notice: This digital passport is an application guidance credential issued for the Scholar Orbit civic-tech platform. Official scholarship grant decisions are exclusively governed by State and Central ministries.
        </div>
      </motion.div>

      {/* FUTURE OPPORTUNITY PATH (SECTION 19) */}
      <section style={{ maxWidth: '680px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={20} color="var(--color-terracotta)" />
          <span>Your Future Opportunity Pathway</span>
        </h2>

        <div className="card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Current Stage */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-deep-forest)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>
                1
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-muted-green)', textTransform: 'uppercase' }}>
                  Current Academic Degree
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-charcoal)' }}>
                  B.Tech Computer Science & Engineering
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)' }}>
                  Active support through Post-Matric & Top Class Education schemes.
                </div>
              </div>
            </div>

            <div style={{ marginLeft: '15px', borderLeft: '2px dashed var(--color-border)', height: '18px' }} />

            {/* Potential Future 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-terracotta)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>
                2
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-terracotta)', textTransform: 'uppercase' }}>
                  Potential Future Pathway • Masters & Research
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-charcoal)' }}>
                  National Fellowship for ST Students (M.Phil / Ph.D)
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)' }}>
                  Up to ₹35,000/month research stipend. No annual family income restriction.
                </div>
              </div>
            </div>

            <div style={{ marginLeft: '15px', borderLeft: '2px dashed var(--color-border)', height: '18px' }} />

            {/* Potential Future 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-warm-sand-dark)',
                color: 'var(--color-charcoal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>
                3
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-muted-text)', textTransform: 'uppercase' }}>
                  Potential Future Pathway • Global Higher Education
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-charcoal)' }}>
                  National Overseas Scholarship for ST Students
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)' }}>
                  Comprehensive financial support for QS World Top 500 Universities.
                </div>
              </div>
            </div>

          </div>

          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--color-border)', fontSize: '0.75rem', color: 'var(--color-subtle-text)' }}>
            * Labeled as potential future pathways. Not an entitlement or guaranteed selection until formal competitive selection is conducted.
          </div>
        </div>
      </section>

    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  FileWarning, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  DollarSign, 
  Sparkles,
  Award,
  HelpCircle,
  FileText,
  UploadCloud
} from 'lucide-react';
import { TribalDivider, TribalWatermark } from '../common/TribalPattern';

export function HomeScreen() {
  const {
    studentProfile,
    applications,
    documents,
    scholarships,
    setActiveTab,
    setApplyModalScheme,
    setExplainerModalScheme,
    simulateIncomeCertificateUpload,
    t
  } = useApp();

  // Check if anything is blocking
  const blockingDoc = documents.find(d => d.isActionRequired);
  const isBlocking = Boolean(blockingDoc);

  // Top 3 potential recommendations
  const recommendedSchemes = scholarships.slice(0, 3);

  // Connected journey stages
  const journeyStages = [
    { id: 1, name: 'Profile', status: 'completed' },
    { id: 2, name: 'Eligibility', status: 'completed' },
    { id: 3, name: 'Application', status: 'current' }, // ●
    { id: 4, name: 'Verification', status: 'upcoming' }, // ○
    { id: 5, name: 'Approval', status: 'upcoming' }, // ○
    { id: 6, name: 'Disbursement', status: 'upcoming' } // ○
  ];

  const homeFileInputRef = React.useRef(null);
  const [homeUploadSuccess, setHomeUploadSuccess] = React.useState(null);

  const handleHomeFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeFormatted = file.size > 1024 * 1024
      ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      : (file.size / 1024).toFixed(1) + ' KB';

    let typeFormatted = 'PDF';
    if (file.type.includes('png')) typeFormatted = 'PNG';
    else if (file.type.includes('jpeg') || file.type.includes('jpg')) typeFormatted = 'JPG';

    uploadDocument('INCOME_CERT', {
      fileName: file.name,
      fileSize: sizeFormatted,
      fileType: typeFormatted
    });

    setHomeUploadSuccess(file.name);
  };

  return (
    <div className="home-screen" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Hidden file input for direct file upload from Home */}
      <input
        type="file"
        ref={homeFileInputRef}
        onChange={handleHomeFileSelect}
        style={{ display: 'none' }}
        accept=".pdf,.jpg,.jpeg,.png,.webp"
      />

      {/* 1. TOP GREETING */}
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ fontSize: '1.85rem', color: 'var(--color-deep-forest)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <span>Good morning, {studentProfile.fullName.split(' ')[0]}</span>
          <span style={{ fontSize: '1.6rem' }}>👋</span>
        </h1>
        <p style={{ marginTop: '4px', fontSize: '0.92rem', color: 'var(--color-muted-text)' }}>
          {studentProfile.course} • {studentProfile.institution}
        </p>
      </div>

      {/* 2. "WHAT IS BLOCKING ME?" / "YOUR NEXT STEP" DEDICATED ACTION BANNER */}
      {isBlocking ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{
            backgroundColor: 'var(--color-pure-white)',
            border: '1px solid var(--color-border)',
            borderTop: '4px solid var(--color-warning)',
            padding: '24px 22px',
            marginBottom: '28px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', maxWidth: '620px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-warning-bg)',
                color: 'var(--color-warning-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <FileWarning size={26} />
              </div>

              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'var(--color-warning-bg)',
                  color: 'var(--color-warning-dark)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '6px'
                }}>
                  <AlertTriangle size={12} />
                  <span>{t.nextStepTitle} • 1 ACTION NEEDED</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-deep-forest)', margin: '2px 0 6px' }}>
                  📄 {t.uploadIncomeTitle}
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-charcoal)', lineHeight: 1.5, margin: 0 }}>
                  {t.uploadIncomeDesc} (Post-Matric Scholarship Directorate requires your fresh FY 2026-27 renewal slip).
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', alignSelf: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  if (homeFileInputRef.current) {
                    homeFileInputRef.current.value = '';
                    homeFileInputRef.current.click();
                  }
                }}
                className="btn-terracotta"
                style={{ padding: '12px 22px', fontWeight: 700 }}
              >
                <UploadCloud size={18} />
                <span>Upload File & Fix</span>
              </button>

              <button
                onClick={() => setActiveTab('documents')}
                className="btn-secondary"
                style={{ padding: '12px 16px' }}
              >
                <span>Open Document Vault</span>
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{
            backgroundColor: 'var(--color-pure-white)',
            border: '2px solid var(--color-success)',
            padding: '20px 22px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-deep-forest)', margin: 0 }}>
                {t.onTrackTitle}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-muted-text)', margin: '2px 0 0' }}>
                {homeUploadSuccess ? `"${homeUploadSuccess}" has been verified. ` : ''}
                {t.onTrackDesc} (Your Income Certificate is verified. Post-Matric application is continuing).
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('applications')}
            className="btn-terracotta"
            style={{ padding: '11px 20px', fontSize: '0.92rem', fontWeight: 700 }}
          >
            <span>Continue Application Process</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      )}

      {/* 3. YOUR SCHOLARSHIP JOURNEY — VISUAL CONNECTED TIMELINE */}
      <section style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', margin: 0 }}>
            {t.journeyTitle}
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-green)', fontWeight: 600 }}>
            Step 3 of 6 Active
          </span>
        </div>

        <div className="card" style={{ padding: '24px 20px', backgroundColor: 'var(--color-pure-white)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            position: 'relative'
          }}>
            {journeyStages.map((stg, idx) => {
              const isDone = stg.status === 'completed';
              const isCurrent = stg.status === 'current';

              return (
                <div key={stg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
                  {/* Circle Marker */}
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: isDone ? 'var(--color-deep-forest)' : isCurrent ? 'var(--color-terracotta)' : 'var(--color-warm-sand)',
                    color: isDone || isCurrent ? '#FFFFFF' : 'var(--color-subtle-text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    boxShadow: isCurrent ? '0 0 0 4px var(--color-terracotta-soft)' : 'none',
                    marginBottom: '8px',
                    transition: 'all 0.2s ease'
                  }}>
                    {isDone ? '✓' : isCurrent ? '●' : '○'}
                  </div>

                  {/* Stage Label */}
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: isCurrent ? 700 : 600,
                    color: isCurrent ? 'var(--color-terracotta-dark)' : isDone ? 'var(--color-deep-forest)' : 'var(--color-muted-text)'
                  }}>
                    {stg.name}
                  </div>

                  <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', marginTop: '2px' }}>
                    {isDone ? 'Done' : isCurrent ? 'In Review' : 'Upcoming'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. YOUR APPLICATIONS SECTION */}
      <section style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', margin: 0 }}>
            {t.applicationsTitle}
          </h2>
          <button
            onClick={() => setActiveTab('applications')}
            className="btn-ghost"
            style={{ fontSize: '0.85rem', padding: '4px 8px' }}
          >
            <span>View All ({applications.length})</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {applications.map((app) => {
            const isApproved = app.currentStage === 'Approved';
            return (
              <div
                key={app.id}
                className="card"
                onClick={() => setActiveTab('applications')}
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  borderTop: isApproved ? '4px solid var(--color-success)' : '4px solid var(--color-terracotta)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: 'var(--color-muted-green)', fontWeight: 700 }}>
                    {app.applicationId}
                  </span>
                  <span className={`badge ${isApproved ? 'badge-success' : 'badge-warning'}`}>
                    {isApproved ? '✓ Approved' : '● Government verification'}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                  {app.schemeTitle}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted-text)', lineHeight: 1.4, marginBottom: '16px' }}>
                  {app.statusHuman}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-subtle-text)' }}>
                    Updated {app.lastUpdated}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-deep-forest)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Track Stage <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SCHOLARSHIPS FOR YOU (Only 2-3 top recommendations) */}
      <section style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', margin: 0 }}>
              {t.scholarshipsForYou}
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-green)', margin: '2px 0 0' }}>
              3 potential matches based on your profile
            </p>
          </div>
          <button
            onClick={() => setActiveTab('opportunities')}
            className="btn-ghost"
            style={{ fontSize: '0.85rem', padding: '4px 8px' }}
          >
            <span>Explore Radar & All</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '16px' }}>
          {recommendedSchemes.map((sch) => (
            <div key={sch.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-forest">{sch.category}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-terracotta)', fontWeight: 700 }}>
                    {sch.matchScore}% Match
                  </span>
                </div>

                <h3 style={{ fontSize: '1.08rem', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                  {sch.title}
                </h3>

                <p style={{ fontSize: '0.84rem', color: 'var(--color-muted-text)', lineHeight: 1.45, marginBottom: '14px' }}>
                  {sch.targetGroup}
                </p>

                <div style={{ backgroundColor: 'var(--color-warm-sand-light)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-green)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Why it appears:
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal)', marginTop: '4px', lineHeight: 1.4 }}>
                    ✓ ST Category • ✓ {studentProfile.currentEducation} • ✓ Income under ceiling
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button
                  onClick={() => setExplainerModalScheme(sch)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                >
                  <span>Why this match?</span>
                </button>
                <button
                  onClick={() => setApplyModalScheme(sch)}
                  className="btn-terracotta"
                  style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                >
                  <span>Apply Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. YOUR MONEY SNAPSHOT */}
      <section style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', margin: 0 }}>
              {t.yourMoney}
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-subtle-text)' }}>
              Direct Benefit Transfer (DBT) Status • Demo Data
            </span>
          </div>
          <button
            onClick={() => setActiveTab('money')}
            className="btn-ghost"
            style={{ fontSize: '0.85rem', padding: '4px 8px' }}
          >
            <span>Full Money Journey</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="card card-forest" style={{ padding: '24px 20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'center' }}>
            
            {/* Received */}
            <div style={{ borderRight: '1px solid rgba(255,255,255,0.15)', paddingRight: '16px' }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-warm-sand)', opacity: 0.85 }}>
                {t.received}
              </div>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#FFFFFF', margin: '4px 0' }}>
                ₹32,000
              </div>
              <div style={{ fontSize: '0.78rem', color: '#9AE6B4', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={14} />
                <span>Credited to SBI ••••4819</span>
              </div>
            </div>

            {/* Pending */}
            <div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-warm-sand)', opacity: 0.85 }}>
                {t.pending}
              </div>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-warning)', margin: '4px 0' }}>
                ₹18,000
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-warm-sand)', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} />
                <span>Tranche 2 in treasury release queue</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. NEED HELP? ASK SAATHI PROMPT */}
      <section className="card card-warm" style={{ padding: '24px 22px', textAlign: 'center' }}>
        <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>💬</div>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', margin: '0 0 6px' }}>
          Need guidance on your scholarship?
        </h3>
        <p style={{ maxWidth: '520px', margin: '0 auto 18px', fontSize: '0.92rem' }}>
          Ask Saathi can explain your verification stage, review required certificates, or show how DBT money is routed to your bank account.
        </p>
        <button
          onClick={() => setActiveTab('saathi')}
          className="btn-primary"
          style={{ padding: '12px 24px' }}
        >
          <span>{t.askSaathi}</span>
          <ArrowRight size={16} />
        </button>
      </section>

    </div>
  );
}

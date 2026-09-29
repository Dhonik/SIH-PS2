import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  CheckCircle2, 
  Printer
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function OfficerPassportSearch() {
  const {
    studentProfile,
    documents,
    applications
  } = useApp();

  const [searchQuery, setSearchQuery] = useState(studentProfile.fullName);
  const [hasSearched, setHasSearched] = useState(true);

  // Verified documents count
  const verifiedDocsCount = documents.filter(d => d.status === 'Verified').length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div className="officer-passport-view" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Screen Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-deep-forest)', margin: 0, fontWeight: 800 }}>
              Student Passport Search
            </h1>
            <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--color-warm-sand)', color: 'var(--color-terracotta-dark)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
              VERIFIED TRIBAL REGISTRY
            </span>
          </div>
          <p style={{ marginTop: '4px', fontSize: '0.88rem', color: 'var(--color-muted-text)' }}>
            Search universal Scheduled Tribe digital passports, inspect lifetime education benefits, and audit document credentials.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => window.print()}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Printer size={15} />
            <span>Print Verification Summary</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="card" style={{ padding: '20px', backgroundColor: '#FFFFFF', marginBottom: '24px' }}>
        <form onSubmit={handleSearchSubmit}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search size={18} color="var(--color-muted-text)" style={{ position: 'absolute', left: '14px', top: '12px' }} />
              <input
                type="text"
                className="form-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name, passport ID (e.g. TS-2026-001245), or Aadhaar reference..."
                style={{ paddingLeft: '40px', height: '44px', fontSize: '0.92rem' }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '11px 22px', fontSize: '0.9rem', fontWeight: 600 }}
            >
              Search Passport
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '10px', fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>
            <span>Quick Lookups:</span>
            <button
              type="button"
              onClick={() => { setSearchQuery('Arun Kumar'); setHasSearched(true); }}
              style={{ textDecoration: 'underline', color: 'var(--color-deep-forest)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Arun Kumar (TS-2026-001245)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => { setSearchQuery('K. Malarmathi'); setHasSearched(true); }}
              style={{ textDecoration: 'underline', color: 'var(--color-deep-forest)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              K. Malarmathi (TS-2026-004812)
            </button>
          </div>
        </form>
      </div>

      {/* THE PASSPORT RECORD VIEW */}
      {hasSearched && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
        >
          {/* Main Passport Card */}
          <div className="card tribal-accent-border" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-deep-forest)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(18, 59, 50, 0.2)'
                }}>
                  AK
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-deep-forest)', margin: 0, fontWeight: 800 }}>
                      {studentProfile.fullName}
                    </h2>
                    <span className="badge badge-forest" style={{ fontSize: '0.72rem' }}>
                      VERIFIED ST PASSPORT
                    </span>
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--color-muted-text)', marginTop: '3px' }}>
                    Universal Passport ID: <strong style={{ fontFamily: 'monospace', color: 'var(--color-charcoal)' }}>{studentProfile.passportId}</strong>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Aadhaar DBT Bridge
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontWeight: 700, fontSize: '0.88rem', marginTop: '2px' }}>
                  <CheckCircle2 size={16} />
                  <span>Aadhaar Seeded Active</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>
                  State Bank of India ••••4819
                </div>
              </div>
            </div>

            {/* Demographics & Education Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '16px',
              backgroundColor: 'var(--color-warm-sand-light)',
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Tribe & Community
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-charcoal)', marginTop: '2px' }}>
                  Scheduled Tribe ({studentProfile.tribeSubcaste})
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-green)' }}>Cert: TN-ST-89324</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Education & Course
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-charcoal)', marginTop: '2px' }}>
                  {studentProfile.course}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle-text)' }}>{studentProfile.institution}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', textTransform: 'uppercase', fontWeight: 700 }}>
                  District & State
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-charcoal)', marginTop: '2px' }}>
                  {studentProfile.district}, {studentProfile.state}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle-text)' }}>Native: Tiruvannamalai</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Annual Family Income
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-charcoal)', marginTop: '2px' }}>
                  ₹{studentProfile.familyAnnualIncome?.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-success)' }}>Tahsildar Verified FY 26-27</div>
              </div>
            </div>

            {/* Applications in Passport */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--color-deep-forest)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
                Scholarship Applications On Record
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {applications.map((app) => (
                  <div
                    key={app.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '10px',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-charcoal)' }}>
                        {app.schemeTitle}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--color-subtle-text)', marginTop: '2px' }}>
                        ID: {app.applicationId} • Applied: {app.appliedDate}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                        Stage: {app.currentStage}
                      </span>
                      <span style={{ fontWeight: 700, color: 'var(--color-deep-forest)', fontSize: '0.88rem' }}>
                        ₹{app.grantAmount?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Vault Credentials */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--color-deep-forest)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Verified Document Vault ({verifiedDocsCount} / {documents.length} Authenticated)
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: doc.status === 'Verified' ? 'var(--color-warm-sand-light)' : '#FFFFFF'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--color-charcoal)' }}>
                        {doc.name}
                      </span>
                      <span className={`badge ${doc.status === 'Verified' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.68rem' }}>
                        {doc.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle-text)' }}>
                      Issuer: {doc.verifiedBy || 'Revenue Dept'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lifetime Disbursement History */}
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--color-deep-forest)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
                Disbursement History (Direct Benefit Transfer)
              </div>
              <div style={{ backgroundColor: 'var(--color-warm-sand-light)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Tranche 1 • Top Class Scheme</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle-text)' }}>PFMS Ref #DBT-2026-48912 • Credited 15 Sep 2026</div>
                  </div>
                  <div style={{ fontWeight: 800, color: 'var(--color-success-dark)', fontSize: '1rem' }}>
                    + ₹32,000
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--color-border)', paddingTop: '10px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-muted-text)' }}>Tranche 2 • Queued for Release</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle-text)' }}>Pending District Welfare Sanction Dispatch</div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--color-warning-dark)', fontSize: '0.92rem' }}>
                    ₹18,000 (Queued)
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </div>
  );
}

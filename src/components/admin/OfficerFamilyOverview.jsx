import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  TrendingUp
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function OfficerFamilyOverview() {
  const { familyMembers } = useApp();
  const [searchQuery, setSearchQuery] = useState('Kumar Family (HH-TN-2026-8812)');

  // Household metrics
  const totalMembers = familyMembers.length;
  const totalReceived = familyMembers.reduce((acc, m) => acc + (m.amountReceived || 0), 0);

  return (
    <div className="officer-family-overview-view" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Screen Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-deep-forest)', margin: 0, fontWeight: 800 }}>
              Family Scholarship Overview
            </h1>
            <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--color-warm-sand)', color: 'var(--color-terracotta-dark)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
              HOUSEHOLD SCRUTINY DESK
            </span>
          </div>
          <p style={{ marginTop: '4px', fontSize: '0.88rem', color: 'var(--color-muted-text)' }}>
            Universal family unit tracking across multiple students, multi-scheme benefit aggregation, and sibling progress audit.
          </p>
        </div>
      </div>

      {/* Search Household */}
      <div className="card" style={{ padding: '18px 20px', backgroundColor: '#FFFFFF', marginBottom: '22px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={18} color="var(--color-muted-text)" style={{ position: 'absolute', left: '14px', top: '12px' }} />
            <input
              type="text"
              className="form-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Family Household ID (e.g. HH-TN-2026-8812) or Student Name..."
              style={{ paddingLeft: '40px', height: '42px', fontSize: '0.9rem' }}
            />
          </div>
          <button
            type="button"
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.88rem' }}
          >
            Search Household
          </button>
        </div>
      </div>

      {/* Aggregated Household Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card tribal-accent-border"
        style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          marginBottom: '26px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <span className="badge badge-forest" style={{ fontSize: '0.72rem' }}>
              HOUSEHOLD UNIT: HH-TN-2026-8812
            </span>
            <h2 style={{ fontSize: '1.45rem', color: 'var(--color-deep-forest)', margin: '6px 0 2px', fontWeight: 800 }}>
              The Kumar Family Household
            </h2>
            <div style={{ fontSize: '0.84rem', color: 'var(--color-muted-text)' }}>
              Head of Household: <strong>K. Murugan (Father)</strong> • ST (Irular) • Tiruvannamalai / Chennai
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle-text)', textTransform: 'uppercase', fontWeight: 700 }}>
              Verified Family Income
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-deep-forest)' }}>
              ₹2,50,000 / year
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--color-success)' }}>Tahsildar Certified FY 26-27</div>
          </div>
        </div>

        {/* 3 Summary Badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
          <div style={{ backgroundColor: 'var(--color-warm-sand-light)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-text)', textTransform: 'uppercase', fontWeight: 700 }}>
              Enrolled Students
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-charcoal)', marginTop: '2px' }}>
              {totalMembers}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-green)' }}>Higher & School Education</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-warm-sand-light)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-text)', textTransform: 'uppercase', fontWeight: 700 }}>
              Cumulative DBT Received
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-deep-forest)', marginTop: '2px' }}>
              ₹{totalReceived.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-green)' }}>Across 3 Beneficiaries</div>
          </div>

          <div style={{ backgroundColor: 'var(--color-warm-sand-light)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-text)', textTransform: 'uppercase', fontWeight: 700 }}>
              Schemes Utilized
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-charcoal)', marginTop: '2px' }}>
              3 Schemes
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)' }}>Pre-Matric, Post-Matric, Top Class</div>
          </div>
        </div>
      </motion.div>

      {/* Visual Family Tree Concept Representation */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-deep-forest)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px' }}>
          Household Beneficiary Hierarchy & Scheme Status
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '18px' }}>
          {familyMembers.map((member, index) => {
            const isSelf = member.relationship === 'Self';

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="card"
                style={{
                  padding: '22px',
                  backgroundColor: '#FFFFFF',
                  border: isSelf ? '2px solid var(--color-deep-forest)' : '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Top Badge: Relationship */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge badge-forest" style={{ fontSize: '0.72rem' }}>
                      {member.relationship}
                    </span>
                    <span className={`badge ${member.hasActionRequired ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: '0.7rem' }}>
                      {member.status}
                    </span>
                  </div>

                  {/* Member Name */}
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-charcoal)', margin: '0 0 4px', fontWeight: 700 }}>
                    {member.name}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', marginBottom: '14px' }}>
                    Age: {member.age} yrs • {member.education}
                  </div>

                  {/* Institution & Scheme */}
                  <div style={{ backgroundColor: 'var(--color-warm-sand-light)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '14px', fontSize: '0.8rem' }}>
                    <div style={{ color: 'var(--color-subtle-text)', fontSize: '0.72rem' }}>INSTITUTION</div>
                    <div style={{ fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '6px' }}>{member.institution}</div>
                    
                    <div style={{ color: 'var(--color-subtle-text)', fontSize: '0.72rem' }}>ACTIVE SCHEME</div>
                    <div style={{ fontWeight: 700, color: 'var(--color-deep-forest)' }}>{member.currentScheme}</div>
                  </div>
                </div>

                {/* Bottom Financial Disbursement */}
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-muted-text)' }}>
                    Total Received:
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-deep-forest)' }}>
                    ₹{member.amountReceived?.toLocaleString('en-IN')}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Welfare Officer Household Insight Note */}
      <div className="card" style={{ padding: '18px 22px', backgroundColor: 'var(--color-warm-sand-light)', border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <TrendingUp size={16} color="var(--color-deep-forest)" />
          <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-deep-forest)' }}>
            Officer Progression Roadmap Note
          </span>
        </div>
        <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-muted-text)', lineHeight: 1.5 }}>
          Younger sibling <strong>Priya Kumar</strong> is currently in Class 10 under the Pre-Matric Scheme. Upon passing secondary board exams, she transitions directly into the Post-Matric pipeline for AY 2027-28 without requiring redundant ST community certificate re-verification.
        </p>
      </div>
    </div>
  );
}

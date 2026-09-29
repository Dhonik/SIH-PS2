import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScholarshipRadar } from './ScholarshipRadar';
import { 
  Compass, 
  LayoutGrid, 
  Info, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  Calendar,
  IndianRupee
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function OpportunitiesScreen() {
  const {
    scholarships,
    studentProfile,
    setApplyModalScheme,
    setExplainerModalScheme,
    t
  } = useApp();

  // Tab: 'cards' | 'radar'
  const [viewMode, setViewMode] = useState('cards');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredSchemes = filterCategory === 'all'
    ? scholarships
    : scholarships.filter(s => s.category.toLowerCase().includes(filterCategory.toLowerCase()));

  return (
    <div className="opportunities-screen" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--color-deep-forest)', margin: 0 }}>
            Scholarship Opportunities
          </h1>
          <p style={{ marginTop: '4px', fontSize: '0.92rem', color: 'var(--color-muted-text)' }}>
            Identified schemes for Scheduled Tribe students. Potential matches calculated from your profile.
          </p>
        </div>

        {/* View Mode Toggle: Cards vs Radar */}
        <div style={{
          display: 'flex',
          backgroundColor: 'var(--color-warm-sand)',
          padding: '3px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)'
        }}>
          <button
            onClick={() => setViewMode('cards')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: viewMode === 'cards' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'cards' ? 'var(--color-deep-forest)' : 'var(--color-muted-text)',
              fontWeight: 600,
              fontSize: '0.85rem',
              boxShadow: viewMode === 'cards' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <LayoutGrid size={16} />
            <span>5 Major Schemes</span>
          </button>

          <button
            onClick={() => setViewMode('radar')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: viewMode === 'radar' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'radar' ? 'var(--color-deep-forest)' : 'var(--color-muted-text)',
              fontWeight: 600,
              fontSize: '0.85rem',
              boxShadow: viewMode === 'radar' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <Compass size={16} />
            <span>Scholarship Radar</span>
          </button>
        </div>
      </div>

      {/* RADAR VIEW */}
      {viewMode === 'radar' ? (
        <ScholarshipRadar />
      ) : (
        /* CARDS VIEW */
        <div>
          {/* Statutory Caution Reminder */}
          <div style={{
            backgroundColor: 'var(--color-warm-sand-light)',
            borderLeft: '4px solid var(--color-terracotta)',
            padding: '12px 16px',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            marginBottom: '24px',
            fontSize: '0.82rem',
            color: 'var(--color-charcoal)'
          }}>
            <strong>Important Guidance:</strong> Tribal Saathi computes preliminary "potential matches" based on the data you provide. Final qualification and disbursement decisions rest solely with authorized government sanctioning officers.
          </div>

          {/* Scheme Cards Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  borderTop: scheme.matchScore >= 90 ? '4px solid var(--color-success)' : '4px solid var(--color-border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ maxWidth: '680px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span className="badge badge-forest">{scheme.category}</span>
                      <span className="badge badge-terracotta">{scheme.matchLevel}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-muted-green)', fontWeight: 600 }}>
                        Code: {scheme.code}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '1.3rem', color: 'var(--color-deep-forest)', margin: '4px 0 6px' }}>
                      {scheme.title}
                    </h2>

                    <p style={{ fontSize: '0.92rem', color: 'var(--color-muted-text)', lineHeight: 1.5, margin: 0 }}>
                      <strong>Who it is generally for:</strong> {scheme.targetGroup}
                    </p>
                  </div>

                  {/* Financial & Match Badge */}
                  <div style={{
                    backgroundColor: 'var(--color-warm-sand-light)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 18px',
                    textAlign: 'right'
                  }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-green)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Match Score
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-deep-forest)' }}>
                      {scheme.matchScore}%
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)' }}>
                      Based on profile
                    </div>
                  </div>
                </div>

                {/* Why it appears section */}
                <div style={{
                  backgroundColor: 'var(--color-soft-cream)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 16px'
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-terracotta-dark)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Why it appears for you:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {scheme.reasons?.map((reason, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--color-charcoal)' }}>
                        <CheckCircle2 size={15} color="var(--color-success)" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer details & primary actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem', color: 'var(--color-muted-text)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <IndianRupee size={15} color="var(--color-terracotta)" />
                      <span>{scheme.maxBenefit}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={15} color="var(--color-muted-green)" />
                      <span>Deadline: {scheme.deadline}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => setExplainerModalScheme(scheme)}
                      className="btn-secondary"
                      style={{ padding: '10px 16px', fontSize: '0.88rem' }}
                    >
                      <Info size={16} />
                      <span>View Details & Explainer</span>
                    </button>

                    <button
                      onClick={() => setApplyModalScheme(scheme)}
                      className="btn-terracotta"
                      style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                    >
                      <span>Apply Now</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

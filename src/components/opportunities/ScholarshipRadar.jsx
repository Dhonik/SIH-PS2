import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Sparkles, Info, Compass, ArrowRight } from 'lucide-react';

export function ScholarshipRadar() {
  const { scholarships, setExplainerModalScheme, studentProfile } = useApp();
  const [hoveredScheme, setHoveredScheme] = useState(null);

  // Position nodes radially around the center (YOU)
  // Distance from center corresponds to visual proximity (closer = higher potential match)
  const radarNodes = [
    { id: 'top-class-st', angle: -30, radius: 105, color: '#3F8F65' },
    { id: 'post-matric-st', angle: 45, radius: 115, color: '#C96B4B' },
    { id: 'national-fellowship-st', angle: 140, radius: 175, color: '#6E8B7D' },
    { id: 'national-overseas-st', angle: 220, radius: 195, color: '#123B32' },
    { id: 'pre-matric-st', angle: 290, radius: 215, color: '#A0AEC0' }
  ];

  return (
    <div className="scholarship-radar-container" style={{
      backgroundColor: 'var(--color-pure-white)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--color-border)',
      padding: '28px 20px',
      boxShadow: 'var(--shadow-md)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header Explainer */}
      <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 24px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'var(--color-terracotta-soft)',
          color: 'var(--color-terracotta-dark)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.78rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          marginBottom: '6px'
        }}>
          <Compass size={14} />
          <span>Interactive Visual Opportunity Map</span>
        </div>

        <h3 style={{ fontSize: '1.45rem', color: 'var(--color-deep-forest)', margin: '0 0 6px' }}>
          Scholarship Radar
        </h3>

        <p style={{ fontSize: '0.88rem', color: 'var(--color-muted-text)', margin: 0 }}>
          Schemes closer to the center indicate higher potential relevance based on your current ST & B.Tech profile. Tap any node to view eligibility reasons.
        </p>

        <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-green)', marginTop: '4px', fontStyle: 'italic' }}>
          * Potential match based on the information you provided. Not an official eligibility score.
        </div>
      </div>

      {/* Visual Radar Arena */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        height: '460px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Radar Rings (Concentric Circles) */}
        <div style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', border: '1px dashed rgba(201, 107, 75, 0.45)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '220px', height: '220px', borderRadius: '50%', border: '1px solid rgba(18, 59, 50, 0.15)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '320px', height: '320px', borderRadius: '50%', border: '1px dashed rgba(18, 59, 50, 0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', border: '1px solid rgba(18, 59, 50, 0.08)', pointerEvents: 'none' }} />

        {/* Ring Labels */}
        <div style={{ position: 'absolute', top: '15px', fontSize: '0.65rem', color: 'var(--color-subtle-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Broader / Future Pathways
        </div>
        <div style={{ position: 'absolute', top: '65px', fontSize: '0.65rem', color: 'var(--color-terracotta)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Immediate High Matches
        </div>

        {/* Center: YOU */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-deep-forest)',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 0 6px var(--color-warm-sand)',
          cursor: 'pointer'
        }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.05em' }}>YOU</span>
          <span style={{ fontSize: '0.65rem', opacity: 0.85 }}>Arun (ST)</span>
        </div>

        {/* Orbiting Scheme Nodes */}
        {radarNodes.map((node) => {
          const scheme = scholarships.find(s => s.id === node.id);
          if (!scheme) return null;

          // Convert polar coordinates (angle, radius) to Cartesian (x, y)
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.cos(rad) * node.radius;
          const y = Math.sin(rad) * node.radius;

          const isHovered = hoveredScheme === scheme.id;

          return (
            <motion.div
              key={scheme.id}
              whileHover={{ scale: 1.08 }}
              onMouseEnter={() => setHoveredScheme(scheme.id)}
              onMouseLeave={() => setHoveredScheme(null)}
              onClick={() => setExplainerModalScheme(scheme)}
              style={{
                position: 'absolute',
                transform: `translate(${x}px, ${y}px)`,
                zIndex: 15,
                cursor: 'pointer'
              }}
            >
              <div style={{
                backgroundColor: isHovered ? 'var(--color-charcoal)' : 'var(--color-pure-white)',
                color: isHovered ? '#FFFFFF' : 'var(--color-charcoal)',
                border: `2px solid ${node.color}`,
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: node.color
                }} />
                <span>{scheme.category.replace('for ST Students', '').replace('Scholarship', '')}</span>
                <span style={{
                  fontSize: '0.68rem',
                  backgroundColor: isHovered ? 'rgba(255,255,255,0.2)' : 'var(--color-warm-sand)',
                  color: isHovered ? '#FFFFFF' : 'var(--color-deep-forest)',
                  padding: '2px 5px',
                  borderRadius: '4px'
                }}>
                  {scheme.matchScore}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Legend & Action */}
      <div style={{
        marginTop: '16px',
        paddingTop: '16px',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.78rem', color: 'var(--color-muted-text)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3F8F65' }} />
            <span>Approved / High Match</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#C96B4B' }} />
            <span>Active In-Progress</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#6E8B7D' }} />
            <span>Future Pathway</span>
          </div>
        </div>

        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-terracotta)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>Tap any bubble for Match Explainer</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
}

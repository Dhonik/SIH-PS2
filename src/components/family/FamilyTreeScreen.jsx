import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  PlusCircle, 
  CheckCircle2, 
  AlertTriangle, 
  GraduationCap, 
  IndianRupee, 
  UserCheck, 
  X,
  ArrowRight
} from 'lucide-react';
import { TribalWatermark, TribalDivider } from '../common/TribalPattern';

export function FamilyTreeScreen() {
  const {
    familyMembers,
    addFamilyMember,
    isAddFamilyModalOpen,
    setIsAddFamilyModalOpen,
    simulateIncomeCertificateUpload
  } = useApp();

  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    relationship: 'Sibling',
    age: '',
    education: 'Secondary School (Class 9)',
    institution: '',
    currentScheme: 'Pre-Matric Scholarship for ST',
    amountReceived: '0'
  });

  const totalMembers = familyMembers.length;
  const totalReceived = familyMembers.reduce((acc, m) => acc + (m.amountReceived || 0), 0);
  const actionRequiredCount = familyMembers.filter(m => m.hasActionRequired).length;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newMemberForm.name) return;
    addFamilyMember(newMemberForm);
    setNewMemberForm({
      name: '',
      relationship: 'Sibling',
      age: '',
      education: 'Secondary School (Class 9)',
      institution: '',
      currentScheme: 'Pre-Matric Scholarship for ST',
      amountReceived: '0'
    });
  };

  return (
    <div className="family-tree-screen" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--color-deep-forest)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>👨‍👩‍👧 Family Scholarship Tree</span>
          </h1>
          <p style={{ marginTop: '4px', fontSize: '0.92rem', color: 'var(--color-muted-text)' }}>
            Manage multiple ST family members from one unified, private interface.
          </p>
        </div>

        <button
          onClick={() => setIsAddFamilyModalOpen(true)}
          className="btn-terracotta"
          style={{ padding: '10px 18px', fontSize: '0.88rem' }}
        >
          <PlusCircle size={16} />
          <span>Add Family Member</span>
        </button>
      </div>

      {/* Aggregated Household Summary Card */}
      <div className="card tribal-accent-border" style={{ backgroundColor: '#FFFFFF', padding: '24px 20px', marginBottom: '32px' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-muted-green)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '14px' }}>
          Household Financial & Scholarship Summary
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
          
          <div style={{ borderRight: '1px solid var(--color-border)', paddingRight: '10px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>Family Members</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-deep-forest)', margin: '2px 0' }}>
              {totalMembers}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)' }}>1 Household</div>
          </div>

          <div style={{ borderRight: '1px solid var(--color-border)', paddingRight: '10px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>Total Applications</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-deep-forest)', margin: '2px 0' }}>
              5
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)' }}>State & Central</div>
          </div>

          <div style={{ borderRight: '1px solid var(--color-border)', paddingRight: '10px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>Approved</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-success)', margin: '2px 0' }}>
              2
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-success)' }}>Active grants</div>
          </div>

          <div style={{ borderRight: '1px solid var(--color-border)', paddingRight: '10px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>Received so far</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-deep-forest)', margin: '2px 0' }}>
              ₹{totalReceived.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-green)' }}>Via DBT</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>Pending Actions</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: actionRequiredCount > 0 ? 'var(--color-warning)' : 'var(--color-success)', margin: '2px 0' }}>
              {actionRequiredCount}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-warning-dark)' }}>
              {actionRequiredCount > 0 ? 'Arun (Income Cert)' : 'All on track'}
            </div>
          </div>

        </div>
      </div>

      {/* Visual Family Tree Hierarchy Diagram */}
      <div className="card" style={{ padding: '28px 20px', marginBottom: '32px', textAlign: 'center', backgroundColor: 'var(--color-soft-cream)' }}>
        
        {/* Top Node: FAMILY */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 24px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-deep-forest)',
          color: '#FFFFFF',
          fontWeight: 800,
          fontSize: '0.95rem',
          letterSpacing: '0.06em',
          boxShadow: 'var(--shadow-md)',
          margin: '0 auto'
        }}>
          <Users size={18} />
          <span>KUMAR FAMILY HOUSEHOLD</span>
        </div>

        {/* Stem Line down */}
        <div style={{ width: '2px', height: '24px', backgroundColor: 'var(--color-border)', margin: '0 auto' }} />

        {/* Horizontal Branch Bar */}
        <div style={{
          width: '75%',
          height: '2px',
          backgroundColor: 'var(--color-border)',
          margin: '0 auto',
          position: 'relative'
        }} />

        {/* Individual Member Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginTop: '24px'
        }}>
          {familyMembers.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -3 }}
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '20px',
                textAlign: 'left',
                borderTop: member.hasActionRequired ? '4px solid var(--color-warning)' : '4px solid var(--color-deep-forest)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-charcoal)', margin: '0 0 2px' }}>
                    {member.name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
                    {member.relationship} • {member.age} yrs
                  </span>
                </div>

                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-warm-sand)',
                  color: 'var(--color-deep-forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.8rem'
                }}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', marginBottom: '12px' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>{member.education}</div>
                <div>{member.institution}</div>
              </div>

              <div style={{
                backgroundColor: 'var(--color-warm-sand-light)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 12px',
                marginBottom: '12px',
                border: '1px solid var(--color-border)'
              }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-green)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Active Scheme
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-charcoal)', marginTop: '2px' }}>
                  {member.currentScheme}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-subtle-text)', marginTop: '2px' }}>
                  Status: {member.status}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--color-subtle-text)' }}>Received</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-deep-forest)' }}>
                    ₹{member.amountReceived?.toLocaleString('en-IN')}
                  </div>
                </div>

                {member.hasActionRequired ? (
                  <button
                    onClick={simulateIncomeCertificateUpload}
                    className="btn-terracotta"
                    style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                  >
                    Resolve ⚠
                  </button>
                ) : (
                  <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                    ✓ On Track
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ADD FAMILY MEMBER MODAL */}
      {isAddFamilyModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(18, 59, 50, 0.45)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 70,
          padding: '16px'
        }}>
          <div className="card tribal-accent-border" style={{ maxWidth: '480px', width: '100%', padding: '24px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', margin: 0 }}>
                Add Family Member
              </h3>
              <button onClick={() => setIsAddFamilyModalOpen(false)} className="btn-ghost" style={{ padding: '6px' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                  placeholder="e.g. Meena Kumar"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label className="form-label">Relationship</label>
                  <select
                    className="form-select"
                    value={newMemberForm.relationship}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, relationship: e.target.value })}
                  >
                    <option value="Sibling">Sibling</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Son">Son</option>
                    <option value="Cousin">Cousin</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newMemberForm.age}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, age: e.target.value })}
                    placeholder="e.g. 16"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Current Education</label>
                <input
                  type="text"
                  className="form-input"
                  value={newMemberForm.education}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, education: e.target.value })}
                  placeholder="e.g. Class 11 (Science)"
                />
              </div>

              <div className="form-group">
                <label className="form-label">School / College</label>
                <input
                  type="text"
                  className="form-input"
                  value={newMemberForm.institution}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, institution: e.target.value })}
                  placeholder="e.g. Government Tribal Residential School"
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddFamilyModalOpen(false)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '12px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-terracotta"
                  style={{ flex: 1.2, padding: '12px' }}
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

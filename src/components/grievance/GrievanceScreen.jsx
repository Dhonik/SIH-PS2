import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  LifeBuoy, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  PlusCircle, 
  Paperclip, 
  ArrowRight, 
  X, 
  MessageSquare
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function GrievanceScreen() {
  const {
    grievances,
    submitGrievance,
    applications,
    isGrievanceModalOpen,
    setIsGrievanceModalOpen
  } = useApp();

  const [form, setForm] = useState({
    category: 'Application',
    subject: '',
    applicationId: applications[0]?.applicationId || 'PM-2026-001245',
    description: '',
    attachmentName: 'Income_Certificate_Slip.pdf'
  });

  const categories = ['Application', 'Documents', 'Verification', 'Payment', 'Technical Problem'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.subject) return;
    submitGrievance(form);
    setForm({
      category: 'Application',
      subject: '',
      applicationId: applications[0]?.applicationId || 'PM-2026-001245',
      description: '',
      attachmentName: ''
    });
  };

  return (
    <div className="grievance-screen" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--color-deep-forest)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⚠️ Need Help? Grievance Redressal</span>
          </h1>
          <p style={{ marginTop: '4px', fontSize: '0.92rem', color: 'var(--color-muted-text)' }}>
            Direct escalation channel to District Tribal Welfare officers and PFMS payment helpdesks.
          </p>
        </div>

        <button
          onClick={() => setIsGrievanceModalOpen(true)}
          className="btn-terracotta"
          style={{ padding: '10px 18px', fontSize: '0.88rem' }}
        >
          <PlusCircle size={16} />
          <span>File New Grievance</span>
        </button>
      </div>

      {/* Active Grievance Tickets List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {grievances.map((item) => (
          <div key={item.id} className="card tribal-accent-border" style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
              <div>
                <span className="badge badge-forest" style={{ marginBottom: '6px' }}>
                  {item.category}
                </span>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-charcoal)', margin: '2px 0 4px' }}>
                  {item.subject}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle-text)' }}>
                  Ticket ID: <strong style={{ color: 'var(--color-deep-forest)' }}>{item.ticketNumber}</strong> • App Ref: {item.applicationId} • Filed: {item.filedOn}
                </div>
              </div>

              <span className={`badge ${item.status === 'Resolved' ? 'badge-success' : 'badge-warning'}`}>
                {item.status === 'Resolved' ? '✓ Resolved' : '● In Progress'}
              </span>
            </div>

            {/* Officer Remarks */}
            <div style={{
              backgroundColor: 'var(--color-warm-sand-light)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-muted-green)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Officer Response / Action
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal)', margin: 0, lineHeight: 1.5 }}>
                {item.officerRemarks}
              </p>
            </div>

            {/* Resolution Timeline */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-subtle-text)', textTransform: 'uppercase', marginBottom: '10px' }}>
                Timeline
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {item.timeline?.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-terracotta)' }} />
                    <span style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>{step.date}:</span>
                    <span style={{ color: 'var(--color-muted-text)' }}>{step.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FILE GRIEVANCE MODAL */}
      {isGrievanceModalOpen && (
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
          <div className="card tribal-accent-border" style={{ maxWidth: '520px', width: '100%', padding: '28px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-deep-forest)', margin: 0 }}>
                File a Grievance Ticket
              </h3>
              <button onClick={() => setIsGrievanceModalOpen(false)} className="btn-ghost" style={{ padding: '6px' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Associated Application ID</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.applicationId}
                  onChange={(e) => setForm({ ...form, applicationId: e.target.value })}
                  placeholder="e.g. PM-2026-001245"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject / Issue Summary</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Delay in second installment DBT disbursement"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Description</label>
                <textarea
                  rows="3"
                  className="form-textarea"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Explain clearly what went wrong so the officer can resolve it faster..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Attachment (Optional)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-warm-sand-light)' }}>
                  <Paperclip size={16} color="var(--color-terracotta)" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-muted-text)' }}>
                    Bank_Passbook_Aadhaar_Seed.pdf (Attached)
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '22px' }}>
                <button
                  type="button"
                  onClick={() => setIsGrievanceModalOpen(false)}
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
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

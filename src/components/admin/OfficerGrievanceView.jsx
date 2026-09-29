import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  X, 
  Check, 
  Paperclip
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function OfficerGrievanceView() {

  const [activeTab, setActiveTab] = useState('New'); // 'New' | 'Under Review' | 'Resolved'
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [remarkInput, setRemarkInput] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Extended grievances queue for officer desk
  const [grievanceList, setGrievanceList] = useState([
    {
      id: 'grv-2026-904',
      ticketNumber: 'GRV-TN-2026-00904',
      studentName: 'Arun Kumar',
      category: 'Payment',
      subject: 'Query regarding release date of second installment (Tranche 2)',
      applicationId: 'TC-2026-004321',
      filedOn: '22 Sep 2026',
      status: 'Under Review',
      standardTab: 'Under Review',
      description: 'Tranche 1 (₹32,000) was credited on 15 September. Need clarification on the second tranche release date for course hostel fees.',
      attachmentName: 'Hostel_Fee_Receipt.pdf',
      timeline: [
        { date: '22 Sep, 10:15 AM', text: 'Grievance ticket created by student' },
        { date: '23 Sep, 02:40 PM', text: 'Assigned to Public Financial Management Officer Desk #04' }
      ],
      officerRemarks: 'Tranche 2 file has been countersigned by Treasury. DBT batch dispatch expected on 05 Oct 2026.'
    },
    {
      id: 'grv-2026-912',
      ticketNumber: 'GRV-TN-2026-00912',
      studentName: 'K. Malarmathi',
      category: 'Document',
      subject: 'Clarification on Tahsildar revenue portal income renewal',
      applicationId: 'PM-2026-406173',
      filedOn: 'Today, 08:30 AM',
      status: 'New',
      standardTab: 'New',
      description: 'Uploaded fresh income certificate digitally downloaded from e-District. Please verify if the Tahsildar QR code is readable.',
      attachmentName: 'Income_Certificate_FY26-27.pdf',
      timeline: [
        { date: 'Today, 08:30 AM', text: 'Ticket submitted by student' }
      ],
      officerRemarks: ''
    },
    {
      id: 'grv-2026-871',
      ticketNumber: 'GRV-TN-2026-00871',
      studentName: 'S. Vignesh',
      category: 'College Verification',
      subject: 'College nodal officer verification delay',
      applicationId: 'PRE-2026-109284',
      filedOn: '18 Sep 2026',
      status: 'Resolved',
      standardTab: 'Resolved',
      description: 'School office took 10 days to verify Class 10 admission roll number.',
      attachmentName: 'Bonafide_School_Letter.pdf',
      timeline: [
        { date: '18 Sep, 11:00 AM', text: 'Ticket opened' },
        { date: '19 Sep, 03:20 PM', text: 'District Inspector contacted school headmaster' },
        { date: '20 Sep, 05:00 PM', text: 'Verification completed and ticket closed' }
      ],
      officerRemarks: 'School nodal officer completed authentication on 20 Sep 2026. Application is now approved.'
    }
  ]);

  const filteredGrievances = grievanceList.filter(g => g.standardTab === activeTab);

  const handleAddRemark = (e) => {
    e.preventDefault();
    if (!remarkInput.trim() || !selectedGrievance) return;

    setGrievanceList(prev => prev.map(g => {
      if (g.id === selectedGrievance.id) {
        return {
          ...g,
          officerRemarks: remarkInput,
          timeline: [
            ...g.timeline,
            { date: 'Just now', text: `Officer Remark: ${remarkInput}` }
          ]
        };
      }
      return g;
    }));

    setSelectedGrievance(prev => ({
      ...prev,
      officerRemarks: remarkInput,
      timeline: [
        ...prev.timeline,
        { date: 'Just now', text: `Officer Remark: ${remarkInput}` }
      ]
    }));

    setSuccessToast(`Remark added to ticket ${selectedGrievance.ticketNumber}.`);
    setRemarkInput('');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleStatusChange = (newStatus, newTab) => {
    if (!selectedGrievance) return;

    setGrievanceList(prev => prev.map(g => {
      if (g.id === selectedGrievance.id) {
        return {
          ...g,
          status: newStatus,
          standardTab: newTab,
          timeline: [
            ...g.timeline,
            { date: 'Just now', text: `Status updated to ${newStatus}` }
          ]
        };
      }
      return g;
    }));

    setSelectedGrievance(prev => ({
      ...prev,
      status: newStatus,
      standardTab: newTab,
      timeline: [
        ...prev.timeline,
        { date: 'Just now', text: `Status updated to ${newStatus}` }
      ]
    }));

    setSuccessToast(`Ticket ${selectedGrievance.ticketNumber} marked as ${newStatus}.`);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const tabs = [
    { id: 'New', label: 'New', count: grievanceList.filter(g => g.standardTab === 'New').length },
    { id: 'Under Review', label: 'Under Review', count: grievanceList.filter(g => g.standardTab === 'Under Review').length },
    { id: 'Resolved', label: 'Resolved', count: grievanceList.filter(g => g.standardTab === 'Resolved').length }
  ];

  return (
    <div className="officer-grievance-view" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Screen Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-deep-forest)', margin: 0, fontWeight: 800 }}>
              Grievance Desk
            </h1>
            <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--color-warm-sand)', color: 'var(--color-terracotta-dark)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
              PUBLIC REDRESSAL DISPATCH
            </span>
          </div>
          <p style={{ marginTop: '4px', fontSize: '0.88rem', color: 'var(--color-muted-text)' }}>
            Investigate citizen escalations, append official inquiry remarks, and resolve student scholarship grievances.
          </p>
        </div>
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

      {/* Tabs: New, Under Review, Resolved */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '22px',
        overflowX: 'auto',
        paddingBottom: '2px'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSelectedGrievance(null); }}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
              fontWeight: 600,
              fontSize: '0.88rem',
              color: activeTab === tab.id ? 'var(--color-deep-forest)' : 'var(--color-muted-text)',
              borderBottom: activeTab === tab.id ? '3px solid var(--color-terracotta)' : '3px solid transparent',
              backgroundColor: activeTab === tab.id ? 'var(--color-warm-sand-light)' : 'transparent',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{tab.label}</span>
            <span style={{
              fontSize: '0.7rem',
              backgroundColor: activeTab === tab.id ? 'var(--color-deep-forest)' : 'var(--color-warm-sand)',
              color: activeTab === tab.id ? '#FFFFFF' : 'var(--color-muted-text)',
              padding: '2px 6px',
              borderRadius: '10px'
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Master-Detail Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedGrievance ? '1.1fr 1fr' : '1fr', gap: '22px' }}>
        
        {/* Left Side: Grievance List Table / Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredGrievances.map((g) => (
            <div
              key={g.id}
              onClick={() => setSelectedGrievance(g)}
              className="card"
              style={{
                padding: '18px',
                backgroundColor: '#FFFFFF',
                border: selectedGrievance?.id === g.id ? '2px solid var(--color-deep-forest)' : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <span className="badge badge-forest" style={{ fontSize: '0.68rem' }}>
                    {g.category}
                  </span>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: 'var(--color-subtle-text)', marginLeft: '8px' }}>
                    {g.ticketNumber}
                  </span>
                </div>
                <span className={`badge ${
                  g.status === 'Resolved' ? 'badge-success' :
                  g.status === 'Under Review' ? 'badge-warning' :
                  'badge-terracotta'
                }`} style={{ fontSize: '0.7rem' }}>
                  {g.status}
                </span>
              </div>

              <h4 style={{ margin: '0 0 6px', fontSize: '1rem', color: 'var(--color-charcoal)', fontWeight: 700 }}>
                {g.subject}
              </h4>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem', color: 'var(--color-muted-text)' }}>
                <span>Student: <strong>{g.studentName}</strong></span>
                <span>Date: {g.filedOn}</span>
              </div>
            </div>
          ))}

          {filteredGrievances.length === 0 && (
            <div className="card" style={{ padding: '36px', textAlign: 'center', color: 'var(--color-muted-text)' }}>
              No tickets currently under <strong>{activeTab}</strong> status.
            </div>
          )}
        </div>

        {/* Right Side: Grievance Detail Drawer Panel */}
        {selectedGrievance && (
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            className="card tribal-accent-border"
            style={{
              padding: '24px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-forest" style={{ fontSize: '0.72rem' }}>
                      {selectedGrievance.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-subtle-text)' }}>
                      {selectedGrievance.ticketNumber}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-deep-forest)', margin: '6px 0 0', fontWeight: 800 }}>
                    {selectedGrievance.subject}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedGrievance(null)}
                  style={{ color: 'var(--color-subtle-text)', padding: '2px' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Student & App Context */}
              <div style={{
                backgroundColor: 'var(--color-warm-sand-light)',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '16px',
                fontSize: '0.8rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px'
              }}>
                <div><strong>Student:</strong> {selectedGrievance.studentName}</div>
                <div><strong>Application:</strong> {selectedGrievance.applicationId}</div>
                <div><strong>Filed On:</strong> {selectedGrievance.filedOn}</div>
                <div><strong>Current Status:</strong> {selectedGrievance.status}</div>
              </div>

              {/* Student's Description */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-muted-text)', marginBottom: '4px' }}>
                  Student Description
                </div>
                <div style={{ fontSize: '0.86rem', color: 'var(--color-charcoal)', lineHeight: 1.5, backgroundColor: '#FFFFFF', padding: '12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                  {selectedGrievance.description}
                </div>
              </div>

              {/* Attachments */}
              {selectedGrievance.attachmentName && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-muted-text)', marginBottom: '4px' }}>
                    Attachments
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: 'var(--color-warm-sand)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem' }}>
                    <Paperclip size={14} color="var(--color-terracotta)" />
                    <span>{selectedGrievance.attachmentName}</span>
                  </div>
                </div>
              )}

              {/* Officer Remark History */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-muted-text)', marginBottom: '4px' }}>
                  Current Officer Remark
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--color-deep-forest)', backgroundColor: 'var(--color-warm-sand-light)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-terracotta)' }}>
                  {selectedGrievance.officerRemarks || 'No officer remarks recorded yet.'}
                </div>
              </div>

              {/* Add Remark Input Form */}
              <form onSubmit={handleAddRemark} style={{ marginBottom: '18px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.78rem' }}>
                    Add Official Scrutiny Remark
                  </label>
                  <textarea
                    rows="2"
                    className="form-textarea"
                    value={remarkInput}
                    onChange={(e) => setRemarkInput(e.target.value)}
                    placeholder="Enter remark to inform student or update internal record..."
                    style={{ fontSize: '0.82rem' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-secondary"
                  style={{ padding: '6px 14px', fontSize: '0.8rem', marginTop: '6px' }}
                >
                  [Add Remark]
                </button>
              </form>
            </div>

            {/* Action Buttons: Mark Under Review, Resolve */}
            <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
              {selectedGrievance.status !== 'Under Review' && (
                <button
                  onClick={() => handleStatusChange('Under Review', 'Under Review')}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '10px', fontSize: '0.82rem' }}
                >
                  [Mark Under Review]
                </button>
              )}

              {selectedGrievance.status !== 'Resolved' && (
                <button
                  onClick={() => handleStatusChange('Resolved', 'Resolved')}
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Check size={16} />
                  <span>[Resolve]</span>
                </button>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

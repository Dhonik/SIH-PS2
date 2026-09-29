import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  FolderOpen, 
  CheckCircle2, 
  Eye, 
  ShieldCheck, 
  FileText, 
  X, 
  Sparkles
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function OfficerDocVerification() {
  const {
    documents,
    studentProfile,
    uploadDocument
  } = useApp();

  const [activeDocTab, setActiveDocTab] = useState('Pending'); // 'Pending' | 'Verified' | 'Rejected' | 'Needs Revision'
  const [viewingDoc, setViewingDoc] = useState(null);
  const [revisionDoc, setRevisionDoc] = useState(null);
  const [revisionReason, setRevisionReason] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Extended documents list for officer desk
  const officerDocuments = documents.map(doc => {
    // Map status into standard officer tabs
    let standardTab = 'Verified';
    if (doc.status === 'Action Required' || doc.status === 'Pending Renewal' || doc.isActionRequired) {
      standardTab = 'Needs Revision';
    } else if (doc.status === 'Under Review' || doc.status === 'Pending') {
      standardTab = 'Pending';
    } else if (doc.status === 'Rejected') {
      standardTab = 'Rejected';
    } else {
      standardTab = 'Verified';
    }

    return {
      ...doc,
      studentName: studentProfile.fullName,
      passportId: studentProfile.passportId,
      district: studentProfile.district,
      standardTab: standardTab
    };
  });

  // Filtered documents by tab
  const filteredDocs = officerDocuments.filter(d => {
    if (activeDocTab === 'Pending') return d.standardTab === 'Pending' || d.standardTab === 'Needs Revision';
    if (activeDocTab === 'Verified') return d.standardTab === 'Verified';
    if (activeDocTab === 'Rejected') return d.standardTab === 'Rejected';
    if (activeDocTab === 'Needs Revision') return d.standardTab === 'Needs Revision';
    return true;
  });

  const handleVerify = (doc) => {
    uploadDocument(doc.code || doc.id, {
      fileName: doc.fileName || `${doc.code || 'DOC'}.pdf`,
      fileSize: doc.size,
      fileType: doc.type
    });
    setSuccessToast(`Document "${doc.name}" has been digitally verified with Officer e-Seal.`);
    setViewingDoc(null);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const handleSendRevision = (e) => {
    e.preventDefault();
    setSuccessToast(`Revision request sent to ${studentProfile.fullName}: "${revisionReason || 'Please upload updated certificate'}"`);
    setRevisionDoc(null);
    setRevisionReason('');
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const docTabs = [
    { id: 'Pending', label: 'Pending', count: officerDocuments.filter(d => d.standardTab === 'Pending' || d.standardTab === 'Needs Revision').length },
    { id: 'Verified', label: 'Verified', count: officerDocuments.filter(d => d.standardTab === 'Verified').length },
    { id: 'Needs Revision', label: 'Needs Revision', count: officerDocuments.filter(d => d.standardTab === 'Needs Revision').length },
    { id: 'Rejected', label: 'Rejected', count: officerDocuments.filter(d => d.standardTab === 'Rejected').length }
  ];

  return (
    <div className="officer-doc-verification-view" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Screen Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-deep-forest)', margin: 0, fontWeight: 800 }}>
              Document Verification Center
            </h1>
            <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--color-warm-sand)', color: 'var(--color-terracotta-dark)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
              AUTHENTICITY & SCRUTINY DESK
            </span>
          </div>
          <p style={{ marginTop: '4px', fontSize: '0.88rem', color: 'var(--color-muted-text)' }}>
            Inspect student uploaded certificates against State Revenue registry, verify e-District seals, and request renewals.
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

      {/* Tabs: Pending, Verified, Rejected, Needs Revision */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '22px',
        overflowX: 'auto',
        paddingBottom: '2px'
      }}>
        {docTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveDocTab(tab.id)}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
              fontWeight: 600,
              fontSize: '0.88rem',
              color: activeDocTab === tab.id ? 'var(--color-deep-forest)' : 'var(--color-muted-text)',
              borderBottom: activeDocTab === tab.id ? '3px solid var(--color-terracotta)' : '3px solid transparent',
              backgroundColor: activeDocTab === tab.id ? 'var(--color-warm-sand-light)' : 'transparent',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{tab.label}</span>
            <span style={{
              fontSize: '0.7rem',
              backgroundColor: activeDocTab === tab.id ? 'var(--color-deep-forest)' : 'var(--color-warm-sand)',
              color: activeDocTab === tab.id ? '#FFFFFF' : 'var(--color-muted-text)',
              padding: '2px 6px',
              borderRadius: '10px'
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Documents List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="card"
            style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-charcoal)' }}>
                  {doc.name}
                </span>
                <span className={`badge ${
                  doc.status === 'Verified' ? 'badge-success' :
                  doc.standardTab === 'Needs Revision' ? 'badge-warning' :
                  'badge-forest'
                }`} style={{ fontSize: '0.72rem' }}>
                  {doc.status}
                </span>
              </div>

              <div style={{ fontSize: '0.84rem', color: 'var(--color-muted-text)', marginBottom: '4px' }}>
                Student: <strong style={{ color: 'var(--color-charcoal)' }}>{doc.studentName}</strong> • {doc.passportId} ({doc.district})
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle-text)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span>Uploaded: <strong>{doc.uploadedOn}</strong></span>
                <span>•</span>
                <span>File: <strong>{doc.fileName || `${doc.code}.pdf`}</strong> ({doc.size})</span>
                {doc.verifiedBy && (
                  <>
                    <span>•</span>
                    <span>Issuer: {doc.verifiedBy}</span>
                  </>
                )}
              </div>
            </div>

            {/* Actions: View, Verify, Request Revision */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setViewingDoc(doc)}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Eye size={15} />
                <span>[View]</span>
              </button>

              <button
                onClick={() => handleVerify(doc)}
                className="btn-primary"
                style={{ padding: '8px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ShieldCheck size={15} />
                <span>[Verify]</span>
              </button>

              <button
                onClick={() => setRevisionDoc(doc)}
                className="btn-ghost"
                style={{ padding: '8px 12px', fontSize: '0.82rem', color: 'var(--color-terracotta)', fontWeight: 600 }}
              >
                [Request Revision]
              </button>
            </div>
          </div>
        ))}

        {filteredDocs.length === 0 && (
          <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-muted-text)' }}>
            No documents in the <strong>{activeDocTab}</strong> queue.
          </div>
        )}
      </div>

      {/* DOCUMENT REVIEW PANEL (MODAL) */}
      {viewingDoc && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(18, 59, 50, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 70,
          padding: '20px'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card tribal-accent-border"
            style={{
              maxWidth: '680px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-forest" style={{ fontSize: '0.72rem' }}>
                  DOCUMENT SCRUTINY PANEL
                </span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-deep-forest)', margin: '4px 0 0', fontWeight: 800 }}>
                  {viewingDoc.name}
                </h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)' }}>
                  Student: {viewingDoc.studentName} ({viewingDoc.passportId})
                </div>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                style={{ color: 'var(--color-subtle-text)', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Document Preview Box */}
            <div style={{
              backgroundColor: 'var(--color-warm-sand-light)',
              border: '2px dashed var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              textAlign: 'center',
              marginBottom: '18px'
            }}>
              <FileText size={48} color="var(--color-terracotta)" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-charcoal)' }}>
                {viewingDoc.fileName || `${viewingDoc.code}.pdf`}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-text)', marginTop: '2px' }}>
                Format: {viewingDoc.type} • File Size: {viewingDoc.size} • Uploaded: {viewingDoc.uploadedOn}
              </div>

              {/* Simulated Optical Character Recognition (OCR) Findings */}
              <div style={{ marginTop: '16px', textAlign: 'left', backgroundColor: '#FFFFFF', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-deep-forest)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  <Sparkles size={14} color="var(--color-terracotta)" />
                  <span>Optical AI Verification Readout (98% Confidence)</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-charcoal)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>• <strong>Certificate Type:</strong> {viewingDoc.name}</div>
                  <div>• <strong>Authority Stamp:</strong> Tahsildar / Revenue Divisional Officer e-Office</div>
                  <div>• <strong>Cross-Match Status:</strong> Matches Aadhaar demographics and student name</div>
                  <div>• <strong>Digital Watermark:</strong> Valid Government of Tamil Nadu e-District hash detected</div>
                </div>
              </div>
            </div>

            {/* Actions in Review Panel */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="btn-secondary"
                style={{ padding: '10px 16px' }}
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => handleVerify(viewingDoc)}
                className="btn-primary"
                style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ShieldCheck size={16} />
                <span>Affix Digital e-Seal & Verify</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* REQUEST REVISION MODAL */}
      {revisionDoc && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(18, 59, 50, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 70,
          padding: '20px'
        }}>
          <div className="card tribal-accent-border" style={{
            maxWidth: '520px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '26px'
          }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', margin: '0 0 6px', fontWeight: 800 }}>
              Request Revision for {revisionDoc.name}
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-muted-text)', margin: '0 0 16px' }}>
              Specify the exact deficiency so the student can upload the corrected document.
            </p>

            <form onSubmit={handleSendRevision}>
              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label className="form-label">Deficiency / Renewal Note</label>
                <textarea
                  rows="3"
                  className="form-textarea"
                  value={revisionReason}
                  onChange={(e) => setRevisionReason(e.target.value)}
                  placeholder="e.g., Certificate expired on 31 March. Please upload the valid annual income certificate for FY 2026-27."
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setRevisionDoc(null)}
                  className="btn-secondary"
                  style={{ padding: '9px 14px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '9px 18px' }}
                >
                  Send Revision Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

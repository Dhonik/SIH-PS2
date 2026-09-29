import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  FolderOpen, 
  UploadCloud, 
  FileCheck2, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Eye, 
  Camera, 
  FileText, 
  X, 
  Sparkles,
  ShieldCheck,
  Check,
  AlertCircle
} from 'lucide-react';
import { TribalWatermark, TribalDivider } from '../common/TribalPattern';

export function DocumentVaultScreen() {
  const {
    documents,
    uploadDocument,
    simulateIncomeCertificateUpload,
    studentProfile
  } = useApp();

  const [inspectDoc, setInspectDoc] = useState(null);
  const [analyzingDoc, setAnalyzingDoc] = useState(null);
  const [scanStep, setScanStep] = useState(0); // 0 to 4 for simulated analysis
  const [dragActive, setDragActive] = useState(false);

  // Trigger simulated Document AI Pre-Check
  const handleSimulateAnalysis = (doc) => {
    setAnalyzingDoc(doc);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 500);
    setTimeout(() => setScanStep(3), 1000);
    setTimeout(() => setScanStep(4), 1600);
    setTimeout(() => {
      uploadDocument(doc.code || doc.id, {});
      setScanStep(5); // Complete
    }, 2200);
  };

  return (
    <div className="document-vault-screen" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--color-deep-forest)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>📂 My Document Vault</span>
          </h1>
          <p style={{ marginTop: '4px', fontSize: '0.92rem', color: 'var(--color-muted-text)' }}>
            Cryptographically sealed and linked to your Scholarship Passport (TS-2026-001245).
          </p>
        </div>

        {/* Quick Upload action */}
        <button
          onClick={simulateIncomeCertificateUpload}
          className="btn-terracotta"
          style={{ padding: '10px 18px', fontSize: '0.88rem' }}
        >
          <UploadCloud size={16} />
          <span>+ Upload / Renew Certificate</span>
        </button>
      </div>

      {/* Drag & Drop Upload Zone (Interactive) */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          const incomeDoc = documents.find(d => d.isActionRequired) || documents[0];
          handleSimulateAnalysis(incomeDoc);
        }}
        style={{
          border: dragActive ? '2px dashed var(--color-deep-forest)' : '2px dashed var(--color-border)',
          backgroundColor: dragActive ? 'var(--color-warm-sand)' : 'var(--color-warm-sand-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px 20px',
          textAlign: 'center',
          marginBottom: '28px',
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }}
        onClick={() => {
          const incomeDoc = documents.find(d => d.isActionRequired) || documents[0];
          handleSimulateAnalysis(incomeDoc);
        }}
      >
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
          color: 'var(--color-terracotta)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <UploadCloud size={26} />
        </div>
        <h4 style={{ fontSize: '1.05rem', color: 'var(--color-charcoal)', margin: '0 0 4px' }}>
          Drag & Drop your certificate here, or tap to browse
        </h4>
        <p style={{ fontSize: '0.84rem', color: 'var(--color-muted-text)', margin: '0 0 14px' }}>
          Supports PDF, JPG, PNG up to 10 MB (Income certificate, Community cert, Marksheet)
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
            <Camera size={14} /> Mobile Camera Scan
          </span>
          <span className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
            Upload File
          </span>
        </div>
      </div>

      {/* Documents Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {documents.map((doc) => {
          const isVerified = doc.status === 'Verified';
          const isAction = doc.status === 'Action Required';
          const isReview = doc.status === 'Under Review';

          return (
            <div
              key={doc.id}
              className="card"
              style={{
                padding: '20px',
                borderLeft: isAction ? '4px solid var(--color-warning)' : isVerified ? '4px solid var(--color-success)' : '4px solid var(--color-muted-green)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      backgroundColor: isAction ? 'var(--color-warning-bg)' : 'var(--color-warm-sand-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isAction ? 'var(--color-warning-dark)' : 'var(--color-deep-forest)'
                    }}>
                      <FileText size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'var(--color-charcoal)', margin: 0 }}>
                        {doc.name}
                      </h4>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)' }}>
                        {doc.type} • {doc.size}
                      </span>
                    </div>
                  </div>

                  <span className={`badge ${isVerified ? 'badge-success' : isAction ? 'badge-warning' : 'badge-neutral'}`}>
                    {isVerified ? '✓ Verified' : isAction ? '⚠ Action Required' : '● Under Review'}
                  </span>
                </div>

                {isAction ? (
                  <div style={{
                    backgroundColor: 'var(--color-warning-bg)',
                    border: '1px solid rgba(217, 154, 61, 0.3)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 12px',
                    fontSize: '0.82rem',
                    color: 'var(--color-charcoal)',
                    lineHeight: 1.45,
                    marginBottom: '10px'
                  }}>
                    {doc.actionReason}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.84rem', color: 'var(--color-muted-text)', margin: '0 0 10px', lineHeight: 1.45 }}>
                    {doc.remarks || 'Document matches demographic and institute registry.'}
                  </p>
                )}

                {doc.fieldsDetected?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                    {doc.fieldsDetected.map((fld, idx) => (
                      <span key={idx} style={{
                        fontSize: '0.7rem',
                        backgroundColor: 'var(--color-warm-sand-light)',
                        color: 'var(--color-muted-green)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        border: '1px solid var(--color-border)'
                      }}>
                        ✓ {fld}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-subtle-text)' }}>
                  {doc.uploadedOn}
                </span>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setInspectDoc(doc)}
                    className="btn-ghost"
                    style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                  >
                    <Eye size={14} />
                    <span>Preview</span>
                  </button>

                  {isAction ? (
                    <button
                      onClick={() => handleSimulateAnalysis(doc)}
                      className="btn-terracotta"
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      <UploadCloud size={14} />
                      <span>Upload Renewal</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSimulateAnalysis(doc)}
                      className="btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                      title="Run Optical Verification Pre-Check"
                    >
                      <Sparkles size={14} color="var(--color-terracotta)" />
                      <span>Scan Check</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* AI DOCUMENT ANALYSIS MODAL (SIMULATED OPTICAL CHECK) */}
      <AnimatePresence>
        {analyzingDoc && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(18, 59, 50, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 70,
            padding: '16px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card tribal-accent-border"
              style={{ maxWidth: '480px', width: '100%', padding: '28px', backgroundColor: '#FFFFFF' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: scanStep === 5 ? 'var(--color-success-bg)' : 'var(--color-warm-sand)',
                  color: scanStep === 5 ? 'var(--color-success)' : 'var(--color-terracotta)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}>
                  {scanStep === 5 ? <CheckCircle2 size={30} /> : <Sparkles size={28} className="animate-pulse-subtle" />}
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', margin: '0 0 4px' }}>
                  DOCUMENT CHECK
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted-text)', margin: 0 }}>
                  Pre-verification analysis for {analyzingDoc.name}
                </p>
              </div>

              {/* Progress checklist steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  {scanStep >= 1 ? <Check size={18} color="var(--color-success)" strokeWidth={3} /> : <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--color-border)' }} />}
                  <span>Document detected & clarity verified</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  {scanStep >= 2 ? <Check size={18} color="var(--color-success)" strokeWidth={3} /> : <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--color-border)' }} />}
                  <span>Document type identified (State Revenue Certificate)</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  {scanStep >= 3 ? <Check size={18} color="var(--color-success)" strokeWidth={3} /> : <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--color-border)' }} />}
                  <span>Name detected: {studentProfile.fullName}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  {scanStep >= 4 ? <Check size={18} color="var(--color-success)" strokeWidth={3} /> : <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--color-border)' }} />}
                  <span>Required fields found (FY 2026-27, Income ≤ ₹2.50L)</span>
                </div>
              </div>

              {scanStep === 5 && (
                <div style={{
                  backgroundColor: 'var(--color-success-bg)',
                  border: '1px solid var(--color-success)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-success-dark)', fontWeight: 800, textTransform: 'uppercase' }}>
                    Status Result
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-success)' }}>
                    READY FOR VERIFICATION
                  </div>
                </div>
              )}

              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', textAlign: 'center', marginBottom: '20px' }}>
                Clearly state that actual official verification happens through authorized government welfare authorities.
              </div>

              {scanStep === 5 && (
                <button
                  onClick={() => setAnalyzingDoc(null)}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px' }}
                >
                  Done & Close
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DOCUMENT PREVIEW MODAL */}
      {inspectDoc && (
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
          <div className="card" style={{ maxWidth: '520px', width: '100%', padding: '24px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-deep-forest)', margin: 0 }}>
                {inspectDoc.name}
              </h3>
              <button onClick={() => setInspectDoc(null)} className="btn-ghost" style={{ padding: '6px' }}>
                <X size={18} />
              </button>
            </div>

            {/* Simulated certificate sheet */}
            <div style={{
              backgroundColor: 'var(--color-warm-sand-light)',
              border: '2px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              fontFamily: 'serif',
              color: 'var(--color-charcoal)',
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <div style={{ textAlign: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                <div style={{ fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-muted-text)' }}>
                  Government of Tamil Nadu • e-District Portal
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--color-deep-forest)', marginTop: '4px' }}>
                  {inspectDoc.name.toUpperCase()}
                </div>
              </div>

              <div style={{ margin: '14px 0', fontSize: '0.88rem', lineHeight: 1.6 }}>
                This is to certify that <strong>{studentProfile.fullName}</strong>, resident of {studentProfile.district}, belongs to the Scheduled Tribe community ({studentProfile.tribeSubcaste}).
                <br />
                Verification Reference: <strong>TN-ST-2026-99214</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--color-border)', paddingTop: '10px', fontSize: '0.75rem', color: 'var(--color-subtle-text)' }}>
                <div>Digitally Signed by Competent Officer</div>
                <div style={{ fontWeight: 'bold', color: 'var(--color-success)' }}>✓ QR Seal Verified</div>
              </div>
            </div>

            <button
              onClick={() => setInspectDoc(null)}
              className="btn-secondary"
              style={{ width: '100%', padding: '10px' }}
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

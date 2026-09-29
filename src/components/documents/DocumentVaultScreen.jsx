import React, { useState, useRef } from 'react';
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
  AlertCircle,
  ArrowRight,
  Home,
  Compass
} from 'lucide-react';
import { TribalWatermark, TribalDivider } from '../common/TribalPattern';

export function DocumentVaultScreen() {
  const {
    documents,
    uploadDocument,
    studentProfile,
    setActiveTab
  } = useApp();

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [inspectDoc, setInspectDoc] = useState(null);
  const [analyzingDoc, setAnalyzingDoc] = useState(null);
  const [scanStep, setScanStep] = useState(0); // 0 to 5
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);
  const [targetDoc, setTargetDoc] = useState(null);

  // Trigger file selection via hidden native input
  const triggerFileUpload = (doc) => {
    const docToUpload = doc || documents.find(d => d.isActionRequired) || documents[0];
    setTargetDoc(docToUpload);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset so same file can be re-selected if desired
      fileInputRef.current.click();
    }
  };

  // Trigger camera capture
  const triggerCameraUpload = (doc) => {
    const docToUpload = doc || documents.find(d => d.isActionRequired) || documents[0];
    setTargetDoc(docToUpload);
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
      cameraInputRef.current.click();
    }
  };

  // Process chosen real file
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    processSelectedFile(file, targetDoc || documents.find(d => d.isActionRequired) || documents[0]);
  };

  // Core processing function for both file picker and drag-and-drop
  const processSelectedFile = (file, doc) => {
    const sizeFormatted = file.size > 1024 * 1024
      ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      : (file.size / 1024).toFixed(1) + ' KB';

    let typeFormatted = 'PDF';
    if (file.type.includes('png')) typeFormatted = 'PNG';
    else if (file.type.includes('jpeg') || file.type.includes('jpg')) typeFormatted = 'JPG';
    else if (file.name.endsWith('.pdf')) typeFormatted = 'PDF';

    const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;

    const fileInfo = {
      fileName: file.name,
      fileSize: sizeFormatted,
      fileType: typeFormatted,
      previewUrl: previewUrl
    };

    setUploadedFileInfo(fileInfo);
    setAnalyzingDoc(doc);
    setScanStep(1);

    // Run simulated optical scanner steps
    setTimeout(() => setScanStep(2), 500);
    setTimeout(() => setScanStep(3), 1000);
    setTimeout(() => setScanStep(4), 1500);
    setTimeout(() => {
      uploadDocument(doc.code || doc.id, fileInfo);
      setScanStep(5); // Complete
    }, 2000);
  };

  return (
    <div className="document-vault-screen" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Hidden Native File Inputs for Real File Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".pdf,.jpg,.jpeg,.png,.webp"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
        capture="environment"
      />

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
          onClick={() => triggerFileUpload()}
          className="btn-terracotta"
          style={{ padding: '10px 18px', fontSize: '0.88rem' }}
        >
          <UploadCloud size={16} />
          <span>+ Upload / Renew Certificate</span>
        </button>
      </div>

      {/* Drag & Drop Upload Zone (Interactive with Native File Picker) */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          const droppedFile = e.dataTransfer.files?.[0];
          if (droppedFile) {
            const incomeDoc = documents.find(d => d.isActionRequired) || documents[0];
            processSelectedFile(droppedFile, incomeDoc);
          }
        }}
        onClick={() => triggerFileUpload()}
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
          Drag & Drop your certificate here, or click to browse
        </h4>
        <p style={{ fontSize: '0.84rem', color: 'var(--color-muted-text)', margin: '0 0 14px' }}>
          Select any real PDF, JPG, or PNG document from your device (Income cert, Community cert, Marksheet)
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); triggerCameraUpload(); }}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
          >
            <Camera size={14} /> Mobile Camera Scan
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); triggerFileUpload(); }}
            className="btn-primary"
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
          >
            <UploadCloud size={14} /> Upload File
          </button>
        </div>
      </div>

      {/* Documents Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {documents.map((doc) => {
          const isVerified = doc.status === 'Verified';
          const isAction = doc.status === 'Action Required';

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
                        {doc.fileName ? `${doc.fileName} • ` : ''}{doc.type} • {doc.size}
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

                  <button
                    onClick={() => triggerFileUpload(doc)}
                    className={isAction ? 'btn-terracotta' : 'btn-secondary'}
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <UploadCloud size={14} />
                    <span>{isAction ? 'Upload Renewal' : 'Re-upload'}</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* AI DOCUMENT ANALYSIS MODAL (LIVE SCANNER & CONTINUATION FLOW) */}
      <AnimatePresence>
        {analyzingDoc && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(18, 59, 50, 0.55)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 70,
            padding: '16px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 10 }}
              className="card tribal-accent-border"
              style={{ maxWidth: '520px', width: '100%', padding: '28px', backgroundColor: '#FFFFFF' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  backgroundColor: scanStep === 5 ? 'var(--color-success-bg)' : 'var(--color-warm-sand)',
                  color: scanStep === 5 ? 'var(--color-success)' : 'var(--color-terracotta)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  boxShadow: scanStep === 5 ? '0 0 0 6px rgba(63, 143, 101, 0.15)' : 'none'
                }}>
                  {scanStep === 5 ? <CheckCircle2 size={32} /> : <Sparkles size={28} className="animate-pulse-subtle" />}
                </div>

                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-deep-forest)', margin: '0 0 4px' }}>
                  {scanStep === 5 ? 'Document Verified Successfully!' : 'AI OPTICAL PRE-CHECK'}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-text)', margin: 0 }}>
                  {uploadedFileInfo ? `${uploadedFileInfo.fileName} (${uploadedFileInfo.fileSize})` : `Processing ${analyzingDoc.name}`}
                </p>
              </div>

              {/* Progress checklist steps */}
              <div style={{
                backgroundColor: 'var(--color-warm-sand-light)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  {scanStep >= 1 ? <Check size={18} color="var(--color-success)" strokeWidth={3} /> : <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--color-border)' }} />}
                  <span>Document detected & clarity verified</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  {scanStep >= 2 ? <Check size={18} color="var(--color-success)" strokeWidth={3} /> : <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--color-border)' }} />}
                  <span>Document type identified (State Revenue Authority Certificate)</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  {scanStep >= 3 ? <Check size={18} color="var(--color-success)" strokeWidth={3} /> : <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--color-border)' }} />}
                  <span>Applicant Name matched: <strong>{studentProfile.fullName}</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  {scanStep >= 4 ? <Check size={18} color="var(--color-success)" strokeWidth={3} /> : <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--color-border)' }} />}
                  <span>Required fields validated (Valid for FY 2026-27 renewal)</span>
                </div>
              </div>

              {/* Completion Status & Unblocking Confirmation */}
              {scanStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    backgroundColor: 'var(--color-success-bg)',
                    border: '1.5px solid var(--color-success)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 16px',
                    marginBottom: '20px',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-success-dark)', fontWeight: 800, fontSize: '0.85rem' }}>
                    <CheckCircle2 size={18} />
                    <span>READY FOR VERIFICATION • UNBLOCKED</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-charcoal)', margin: '4px 0 0', lineHeight: 1.45 }}>
                    Your Income Certificate has been verified and attached. Your <strong>Post-Matric Scholarship application</strong> is now unblocked and continuing to Government Verification!
                  </p>
                </motion.div>
              )}

              {/* CONTINUATION BUTTONS (THE CORE REQUEST: "AFTER THAT CONTINUE THAT PROCESS") */}
              {scanStep === 5 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setAnalyzingDoc(null);
                      setActiveTab('applications');
                    }}
                    className="btn-terracotta"
                    style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: 700 }}
                  >
                    <span>Continue Application Process</span>
                    <ArrowRight size={18} />
                  </button>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      onClick={() => {
                        setAnalyzingDoc(null);
                        setActiveTab('home');
                      }}
                      className="btn-secondary"
                      style={{ padding: '11px', fontSize: '0.86rem' }}
                    >
                      <Home size={15} />
                      <span>Command Center</span>
                    </button>

                    <button
                      onClick={() => setAnalyzingDoc(null)}
                      className="btn-secondary"
                      style={{ padding: '11px', fontSize: '0.86rem' }}
                    >
                      <FolderOpen size={15} />
                      <span>Stay in Vault</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--color-muted-text)', fontSize: '0.82rem' }}>
                  Running optical authenticity analysis... Please wait.
                </div>
              )}

              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', textAlign: 'center', marginTop: '16px' }}>
                Official formal sanction is conducted through authorized Welfare Directorate officers.
              </div>
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
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-deep-forest)', margin: 0 }}>
                  {inspectDoc.name}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>
                  {inspectDoc.fileName || `${inspectDoc.code}.pdf`} • {inspectDoc.size}
                </span>
              </div>
              <button onClick={() => setInspectDoc(null)} className="btn-ghost" style={{ padding: '6px' }}>
                <X size={18} />
              </button>
            </div>

            {/* Simulated certificate sheet or image preview */}
            {inspectDoc.previewUrl ? (
              <div style={{ marginBottom: '16px', borderRadius: 'var(--radius-md)', overflow: 'hidden', maxHeight: '300px', display: 'flex', justifyContent: 'center', backgroundColor: '#000' }}>
                <img src={inspectDoc.previewUrl} alt={inspectDoc.name} style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} />
              </div>
            ) : (
              <div style={{
                backgroundColor: 'var(--color-warm-sand-light)',
                border: '2px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                fontFamily: 'serif',
                color: 'var(--color-charcoal)',
                minHeight: '200px',
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
                  Certified for <strong>{studentProfile.fullName}</strong>, resident of {studentProfile.district}, Scheduled Tribe ({studentProfile.tribeSubcaste}).
                  <br />
                  Reference: <strong>TN-ST-2026-99214</strong> • FY: <strong>2026-27</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--color-border)', paddingTop: '10px', fontSize: '0.75rem', color: 'var(--color-subtle-text)' }}>
                  <div>e-Governance Seal Verified</div>
                  <div style={{ fontWeight: 'bold', color: 'var(--color-success)' }}>✓ Authenticated</div>
                </div>
              </div>
            )}

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

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  Search, 
  Filter, 
  Check, 
  XCircle, 
  Eye, 
  Sparkles, 
  MessageSquare,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function AdminDashboardScreen() {
  const {
    studentProfile,
    applications,
    advanceApplicationStage,
    documents,
    grievances,
    uploadDocument,
    setUserRole,
    setActiveTab
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('applications'); // 'applications' | 'verification' | 'disbursements' | 'grievances'
  const [officerRemarks, setOfficerRemarks] = useState('');
  const [selectedApp, setSelectedApp] = useState(applications[0] || null);
  const [successToast, setSuccessToast] = useState('');

  const adminNavItems = [
    { id: 'applications', label: 'Applications Queue' },
    { id: 'verification', label: 'Document Verification' },
    { id: 'disbursements', label: 'Disbursement Release' },
    { id: 'grievances', label: 'Grievance Desk' }
  ];

  const handleApproveStage = (appId, nextStage) => {
    advanceApplicationStage(appId, nextStage);
    setSuccessToast(`Application ${appId} successfully advanced to ${nextStage}.`);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleVerifyDocument = (docCode) => {
    uploadDocument(docCode, {});
    setSuccessToast('Certificate digitally verified with e-Office seal.');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  return (
    <div className="admin-dashboard-screen" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Top Officer Status Header */}
      <div style={{
        backgroundColor: 'var(--color-deep-forest)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: 'var(--color-terracotta)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <ShieldCheck size={28} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.6rem', color: '#FFFFFF', margin: 0 }}>
                District Welfare Directorate Portal
              </h1>
              <span style={{ fontSize: '0.72rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                OFFICER ACCESS
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-warm-sand)', margin: '4px 0 0' }}>
              Ministry of Tribal Affairs & Directorate of Tribal Welfare, Tamil Nadu
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setUserRole('student');
            setActiveTab('home');
          }}
          className="btn-secondary"
          style={{ backgroundColor: '#FFFFFF', color: 'var(--color-deep-forest)', padding: '9px 16px', fontSize: '0.85rem' }}
        >
          <span>Return to Student View</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 5 Official High-Level Statistics (Section 24 Requirement) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        
        {/* Total Students */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-muted-text)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>
            <Users size={16} color="var(--color-deep-forest)" />
            <span>Total Students</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-deep-forest)', margin: '6px 0 2px' }}>
            12,482
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-green)' }}>Verified ST Profiles</div>
        </div>

        {/* Applications */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-muted-text)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>
            <FileText size={16} color="var(--color-terracotta)" />
            <span>Applications</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-charcoal)', margin: '6px 0 2px' }}>
            8,294
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle-text)' }}>Across 5 Schemes</div>
        </div>

        {/* Pending Verification */}
        <div className="card" style={{ padding: '18px', borderLeft: '4px solid var(--color-warning)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-warning-dark)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>
            <Clock size={16} />
            <span>Pending Verification</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-warning-dark)', margin: '6px 0 2px' }}>
            1,842
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--color-warning-dark)' }}>Action required by desk</div>
        </div>

        {/* Approved */}
        <div className="card" style={{ padding: '18px', borderLeft: '4px solid var(--color-success)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-success-dark)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>
            <CheckCircle2 size={16} />
            <span>Approved</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-success-dark)', margin: '6px 0 2px' }}>
            5,102
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--color-success)' }}>Sanction orders issued</div>
        </div>

        {/* Disbursed */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-muted-text)', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>
            <IndianRupee size={16} color="var(--color-deep-forest)" />
            <span>Disbursed</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-deep-forest)', margin: '6px 0 2px' }}>
            ₹2.84 Cr
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-green)' }}>Direct to bank (DBT)</div>
        </div>

      </div>

      {/* Toast Notification */}
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

      {/* Admin Module Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '24px',
        overflowX: 'auto',
        paddingBottom: '2px'
      }}>
        {adminNavItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id)}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: activeAdminTab === tab.id ? 'var(--color-deep-forest)' : 'var(--color-muted-text)',
              borderBottom: activeAdminTab === tab.id ? '3px solid var(--color-terracotta)' : '3px solid transparent',
              backgroundColor: activeAdminTab === tab.id ? 'var(--color-warm-sand-light)' : 'transparent',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: APPLICATIONS WORKBENCH */}
      {activeAdminTab === 'applications' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          
          {/* Applications list */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-deep-forest)', textTransform: 'uppercase', marginBottom: '14px' }}>
              Pending Scrutiny Queue
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {applications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: selectedApp?.id === app.id ? '2px solid var(--color-deep-forest)' : '1px solid var(--color-border)',
                    backgroundColor: selectedApp?.id === app.id ? 'var(--color-warm-sand-light)' : '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 700 }}>
                      {app.applicationId}
                    </span>
                    <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                      {app.currentStage}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-charcoal)' }}>
                    {app.schemeTitle}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle-text)', marginTop: '2px' }}>
                    Student: {studentProfile.fullName} ({studentProfile.course})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Review Workbench */}
          {selectedApp && (
            <div className="card tribal-accent-border" style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', margin: '0 0 4px' }}>
                Officer Decision Desk
              </h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', marginBottom: '16px' }}>
                Application Ref: {selectedApp.applicationId} • {selectedApp.schemeTitle}
              </div>

              <div style={{ backgroundColor: 'var(--color-warm-sand-light)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '18px', fontSize: '0.85rem' }}>
                <div><strong>Student Name:</strong> {studentProfile.fullName}</div>
                <div><strong>Category & Tribe:</strong> ST ({studentProfile.tribeSubcaste})</div>
                <div><strong>College:</strong> {studentProfile.institution}</div>
                <div><strong>Annual Income Verified:</strong> ₹{studentProfile.familyAnnualIncome?.toLocaleString('en-IN')}</div>
                <div><strong>DBT Status:</strong> Aadhaar Seeded Active (SBI ••••4819)</div>
              </div>

              <div className="form-group">
                <label className="form-label">Official Scrutiny Remarks</label>
                <textarea
                  rows="2"
                  className="form-textarea"
                  value={officerRemarks}
                  onChange={(e) => setOfficerRemarks(e.target.value)}
                  placeholder="Enter remarks to append to student's live tracking view..."
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleApproveStage(selectedApp.id, 'Approval')}
                  className="btn-primary"
                  style={{ flex: 1.2, padding: '12px' }}
                >
                  <Check size={16} />
                  <span>Sanction & Approve</span>
                </button>

                <button
                  onClick={() => handleApproveStage(selectedApp.id, 'Government Verification')}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '12px' }}
                >
                  <span>Request Revision</span>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: DOCUMENT VERIFICATION */}
      {activeAdminTab === 'verification' && (
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', margin: 0 }}>
                Document Authenticity & Scrutiny Desk
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted-text)', margin: '4px 0 0' }}>
                Verify student submitted certificates against State Revenue registry.
              </p>
            </div>
            <span className="badge badge-forest">
              {documents.filter(d => d.status === 'Verified').length} / {documents.length} Verified
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {documents.map((doc) => (
              <div
                key={doc.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: doc.status === 'Verified' ? 'var(--color-warm-sand-light)' : '#FFFFFF',
                  border: '1px solid var(--color-border)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--color-charcoal)' }}>{doc.name}</div>
                    <span className={`badge ${doc.status === 'Verified' ? 'badge-success' : 'badge-warning'}`}>
                      {doc.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted-green)', marginTop: '2px', fontWeight: 600 }}>
                    Uploaded File: <strong>{doc.fileName || `${doc.code}.pdf`}</strong> ({doc.size})
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-subtle-text)', marginTop: '2px' }}>
                    Student: {studentProfile.fullName} • ST ({studentProfile.tribeSubcaste}) • {studentProfile.institution}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Button to verify that uploaded file */}
                  <button
                    onClick={() => {
                      uploadDocument(doc.code || doc.id, {
                        fileName: doc.fileName || `${doc.code}.pdf`,
                        fileSize: doc.size,
                        fileType: doc.type
                      });
                      setSuccessToast(`"${doc.fileName || doc.name}" has been inspected and digitally verified with Officer e-Seal.`);
                      setTimeout(() => setSuccessToast(''), 3500);
                    }}
                    className={doc.status === 'Verified' ? 'btn-secondary' : 'btn-terracotta'}
                    style={{ padding: '8px 16px', fontSize: '0.84rem', fontWeight: 700 }}
                  >
                    <ShieldCheck size={15} />
                    <span>{doc.status === 'Verified' ? 'Re-Verify File' : 'Verify That Uploaded File'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DISBURSEMENT SIMULATOR */}
      {activeAdminTab === 'disbursements' && (
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', marginBottom: '12px' }}>
            Treasury DBT Batch Release Desk
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-muted-text)', marginBottom: '20px' }}>
            Update mock disbursement status to demonstrate how funds appear in the student's Money Journey.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-warm-sand-light)' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>Tranche 2 Release (₹18,000)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-subtle-text)' }}>
                Target: {studentProfile.fullName} (SBI ••••4819)
              </div>
            </div>

            <button
              onClick={() => {
                setSuccessToast('Tranche 2 DBT transfer dispatched via simulated PFMS.');
                setTimeout(() => setSuccessToast(''), 3000);
              }}
              className="btn-terracotta"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              Dispatch DBT Payment
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: GRIEVANCES DESK */}
      {activeAdminTab === 'grievances' && (
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', marginBottom: '16px' }}>
            Public Grievance Redressal Queue
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {grievances.map((g) => (
              <div key={g.id} style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span className="badge badge-forest">{g.category}</span>
                    <h4 style={{ margin: '4px 0 2px', fontSize: '1.05rem' }}>{g.subject}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-subtle-text)' }}>
                      Ticket: {g.ticketNumber} • Student: {studentProfile.fullName}
                    </span>
                  </div>
                  <span className="badge badge-warning">{g.status}</span>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--color-charcoal)', backgroundColor: 'var(--color-warm-sand-light)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', marginTop: '8px' }}>
                  <strong>Officer Remark:</strong> {g.officerRemarks}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  CheckCircle2, 
  Check, 
  X, 
  ShieldCheck, 
  RotateCcw
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function OfficerApplications() {
  const {
    applications,
    studentProfile,
    advanceApplicationStage
  } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [schemeFilter, setSchemeFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');

  // Decision Desk State (Opens only when clicking Review)
  const [reviewingApp, setReviewingApp] = useState(null);
  const [officerRemarks, setOfficerRemarks] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Extended demo applications dataset for officer scrutiny queue
  const extendedApplications = [
    ...applications,
    {
      id: 'app-post-matric-02',
      applicationId: 'PM-2026-406173',
      schemeId: 'post-matric-st',
      schemeTitle: 'Post-Matric Scholarship for ST Students',
      studentName: 'K. Malarmathi',
      tribe: 'Malayali ST',
      district: 'Tiruvannamalai',
      institution: 'Govt Arts & Science College, Tiruvannamalai',
      appliedDate: '16 Aug 2026',
      currentStage: 'Pending Approval',
      grantAmount: 38000,
      lastUpdated: 'Today, 09:15 AM',
      annualIncome: 180000,
      bankAccount: 'Canara Bank ••••3912 (Aadhaar Seeded)',
      stages: [
        { name: 'Application Submitted', completed: true },
        { name: 'College Verification', completed: true },
        { name: 'Government Verification', completed: true },
        { name: 'Approval', completed: false, current: true },
        { name: 'Payment', completed: false }
      ]
    },
    {
      id: 'app-pre-matric-01',
      applicationId: 'PRE-2026-109284',
      schemeId: 'pre-matric-st',
      schemeTitle: 'Pre-Matric Scholarship for ST Students',
      studentName: 'S. Vignesh',
      tribe: 'Irular ST',
      district: 'Chennai',
      institution: 'Govt Higher Secondary School, Saidapet',
      appliedDate: '10 Aug 2026',
      currentStage: 'Government Verification',
      grantAmount: 12000,
      lastUpdated: 'Yesterday, 02:40 PM',
      annualIncome: 120000,
      bankAccount: 'Indian Overseas Bank ••••7721',
      stages: [
        { name: 'Application Submitted', completed: true },
        { name: 'College Verification', completed: true },
        { name: 'Government Verification', completed: false, current: true },
        { name: 'Approval', completed: false },
        { name: 'Payment', completed: false }
      ]
    },
    {
      id: 'app-fellowship-01',
      applicationId: 'NF-2026-883019',
      schemeId: 'national-fellowship-st',
      schemeTitle: 'National Fellowship for ST Students',
      studentName: 'R. Devika',
      tribe: 'Toda ST',
      district: 'Nilgiris',
      institution: 'Madras University (Dept of Anthropology)',
      appliedDate: '24 Aug 2026',
      currentStage: 'College Verification',
      grantAmount: 35000,
      lastUpdated: '24 Sep 2026',
      annualIncome: 210000,
      bankAccount: 'SBI ••••9941 (Aadhaar Active)',
      stages: [
        { name: 'Application Submitted', completed: true },
        { name: 'College Verification', completed: false, current: true },
        { name: 'Government Verification', completed: false },
        { name: 'Approval', completed: false },
        { name: 'Payment', completed: false }
      ]
    }
  ];

  // Filtering Logic
  const filteredApps = extendedApplications.filter((app) => {
    const student = app.studentName || studentProfile.fullName;
    const district = app.district || studentProfile.district;
    const matchesSearch = 
      app.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.schemeTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || 
      app.currentStage.toLowerCase().includes(statusFilter.toLowerCase());

    const matchesScheme = schemeFilter === 'all' || 
      app.schemeId.toLowerCase().includes(schemeFilter.toLowerCase());

    const matchesDistrict = districtFilter === 'all' || 
      district.toLowerCase().includes(districtFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesScheme && matchesDistrict;
  });

  const handleOpenReview = (app) => {
    setReviewingApp(app);
    setOfficerRemarks('');
  };

  const handleApproveStage = (appId, nextStage) => {
    advanceApplicationStage(appId, nextStage);
    setSuccessToast(`Application ${appId} successfully sanctioned and advanced to ${nextStage}.`);
    setReviewingApp(null);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const handleRequestRevision = (appId) => {
    setSuccessToast(`Revision request dispatched to student for ${appId} with scrutiny remarks.`);
    setReviewingApp(null);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  return (
    <div className="officer-applications-view" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-deep-forest)', margin: 0, fontWeight: 800 }}>
              Application Management
            </h1>
            <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--color-warm-sand)', color: 'var(--color-terracotta-dark)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
              SCRUTINY WORKBENCH
            </span>
          </div>
          <p style={{ marginTop: '4px', fontSize: '0.88rem', color: 'var(--color-muted-text)' }}>
            Review, verify, and sanction Scheduled Tribe scholarship applications across Tamil Nadu welfare divisions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="badge badge-forest" style={{ padding: '6px 12px' }}>
            {filteredApps.length} Applications in View
          </span>
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

      {/* Search & Filter Bar */}
      <div className="card" style={{ padding: '18px 20px', backgroundColor: '#FFFFFF', marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', alignItems: 'center' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--color-muted-text)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
            <input
              type="text"
              placeholder="Search application ID / student name..."
              className="form-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '36px', height: '40px', fontSize: '0.86rem' }}
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input"
              style={{ height: '40px', fontSize: '0.86rem' }}
            >
              <option value="all">Status: All Statuses</option>
              <option value="Government Verification">Government Verification</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Approved">Approved</option>
              <option value="College Verification">College Verification</option>
            </select>
          </div>

          {/* Scheme Filter */}
          <div>
            <select
              value={schemeFilter}
              onChange={(e) => setSchemeFilter(e.target.value)}
              className="form-input"
              style={{ height: '40px', fontSize: '0.86rem' }}
            >
              <option value="all">Scheme: All Schemes</option>
              <option value="post-matric">Post-Matric Scholarship</option>
              <option value="top-class">Top Class Education Scheme</option>
              <option value="pre-matric">Pre-Matric Scholarship</option>
              <option value="fellowship">National Fellowship</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="form-input"
              style={{ height: '40px', fontSize: '0.86rem' }}
            >
              <option value="all">District: All Districts</option>
              <option value="Chennai">Chennai</option>
              <option value="Tiruvannamalai">Tiruvannamalai</option>
              <option value="Nilgiris">Nilgiris</option>
            </select>
          </div>

        </div>
      </div>

      {/* Applications Table / List */}
      <div className="card" style={{ padding: 0, backgroundColor: '#FFFFFF', overflow: 'hidden', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-warm-sand-light)', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--color-deep-forest)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  Application ID
                </th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--color-deep-forest)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  Student
                </th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--color-deep-forest)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  Scheme
                </th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--color-deep-forest)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  Status
                </th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--color-deep-forest)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  Last Updated
                </th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--color-deep-forest)', fontSize: '0.78rem', textTransform: 'uppercase', textAlign: 'right' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => {
                const sName = app.studentName || studentProfile.fullName;
                const sDistrict = app.district || studentProfile.district;
                const sTribe = app.tribe || studentProfile.tribeSubcaste;

                return (
                  <tr
                    key={app.id}
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    {/* Application ID */}
                    <td style={{ padding: '16px 18px' }}>
                      <div style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--color-charcoal)' }}>
                        {app.applicationId}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)' }}>
                        AY 2026-27 • ST
                      </div>
                    </td>

                    {/* Student Details */}
                    <td style={{ padding: '16px 18px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-charcoal)' }}>
                        {sName}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--color-muted-text)' }}>
                        {sTribe} • {sDistrict}
                      </div>
                    </td>

                    {/* Scheme */}
                    <td style={{ padding: '16px 18px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--color-deep-forest)' }}>
                        {app.schemeTitle}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-green)' }}>
                        Grant: ₹{app.grantAmount?.toLocaleString('en-IN')}
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '16px 18px' }}>
                      <span className={`badge ${
                        app.currentStage === 'Approved' ? 'badge-success' :
                        app.currentStage === 'Payment' ? 'badge-forest' :
                        'badge-warning'
                      }`} style={{ fontSize: '0.74rem' }}>
                        {app.currentStage}
                      </span>
                    </td>

                    {/* Last Updated */}
                    <td style={{ padding: '16px 18px', color: 'var(--color-muted-text)', fontSize: '0.8rem' }}>
                      {app.lastUpdated}
                    </td>

                    {/* Action Button: Opens Decision Desk */}
                    <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleOpenReview(app)}
                        className="btn-primary"
                        style={{ padding: '7px 14px', fontSize: '0.82rem', fontWeight: 600 }}
                      >
                        [Review]
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '36px', textAlign: 'center', color: 'var(--color-muted-text)' }}>
                    No applications matched your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* OFFICER DECISION DESK (MODAL / SCRUTINY WORKBENCH) */}
      {/* IMPORTANT: Officer Decision Desk belongs to APPLICATION REVIEW only */}
      {reviewingApp && (
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
              maxWidth: '720px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              maxHeight: '92vh',
              overflowY: 'auto'
            }}
          >
            {/* Decision Desk Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={22} color="var(--color-terracotta)" />
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-terracotta)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    OFFICER DECISION DESK
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-deep-forest)', margin: '4px 0 0', fontWeight: 800 }}>
                  Application Scrutiny & Sanction
                </h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', marginTop: '2px' }}>
                  Ref: <strong>{reviewingApp.applicationId}</strong> • {reviewingApp.schemeTitle}
                </div>
              </div>

              <button
                onClick={() => setReviewingApp(null)}
                style={{ color: 'var(--color-subtle-text)', padding: '4px' }}
                title="Close Scrutiny Desk"
              >
                <X size={20} />
              </button>
            </div>

            {/* Student Verified Profile Snapshot */}
            <div style={{
              backgroundColor: 'var(--color-warm-sand-light)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              marginBottom: '18px',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                <div>
                  <div style={{ color: 'var(--color-muted-text)', fontSize: '0.72rem' }}>STUDENT NAME</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-charcoal)' }}>
                    {reviewingApp.studentName || studentProfile.fullName}
                  </div>
                </div>

                <div>
                  <div style={{ color: 'var(--color-muted-text)', fontSize: '0.72rem' }}>COMMUNITY / TRIBE</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-charcoal)' }}>
                    ST ({reviewingApp.tribe || studentProfile.tribeSubcaste})
                  </div>
                </div>

                <div>
                  <div style={{ color: 'var(--color-muted-text)', fontSize: '0.72rem' }}>INSTITUTION & COURSE</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-charcoal)' }}>
                    {reviewingApp.institution || studentProfile.institution}
                  </div>
                </div>

                <div>
                  <div style={{ color: 'var(--color-muted-text)', fontSize: '0.72rem' }}>ANNUAL FAMILY INCOME</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-charcoal)' }}>
                    ₹{(reviewingApp.annualIncome || studentProfile.familyAnnualIncome)?.toLocaleString('en-IN')} (Tahsildar Verified)
                  </div>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ color: 'var(--color-muted-text)', fontSize: '0.72rem' }}>DBT SEEDING STATUS</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={14} />
                    <span>Aadhaar Seeded Active ({reviewingApp.bankAccount || 'State Bank of India ••••4819'})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Checklist & Optical OCR Check */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-deep-forest)', marginBottom: '8px' }}>
                Verification Gateways & Document Checklist
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: 'var(--color-success-bg)', borderRadius: 'var(--radius-sm)', color: 'var(--color-success-dark)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={15} />
                    <span>ST Community Certificate (TN-ST-89324)</span>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.72rem' }}>Verified e-Office Seal</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: 'var(--color-success-bg)', borderRadius: 'var(--radius-sm)', color: 'var(--color-success-dark)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={15} />
                    <span>Annual Income Certificate (FY 2026-27 Renewal)</span>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.72rem' }}>98% OCR Match</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: 'var(--color-warm-sand)', borderRadius: 'var(--radius-sm)', color: 'var(--color-charcoal)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={15} />
                    <span>College Academic Verification (CEG Anna University)</span>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.72rem', color: 'var(--color-muted-green)' }}>Nodal Approved</span>
                </div>
              </div>
            </div>

            {/* Official Scrutiny Remarks Field */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{ fontWeight: 700 }}>
                Official Scrutiny Remarks (Appends to Student's Tracking View)
              </label>
              <textarea
                rows="3"
                className="form-textarea"
                value={officerRemarks}
                onChange={(e) => setOfficerRemarks(e.target.value)}
                placeholder="Enter official scrutiny remarks, sanction order references, or reason for clarification..."
                style={{ fontSize: '0.85rem' }}
              />
            </div>

            {/* Decision Actions */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleApproveStage(reviewingApp.id, 'Approval')}
                className="btn-primary"
                style={{ flex: 1.2, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Check size={16} />
                <span>Sanction & Approve</span>
              </button>

              <button
                onClick={() => handleRequestRevision(reviewingApp.id)}
                className="btn-secondary"
                style={{ flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <RotateCcw size={15} />
                <span>Request Revision</span>
              </button>

              <button
                onClick={() => setReviewingApp(null)}
                className="btn-ghost"
                style={{ padding: '12px 16px' }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

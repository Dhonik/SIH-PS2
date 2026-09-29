import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  X, 
  ShieldAlert
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function OfficerDisbursements() {
  const [successToast, setSuccessToast] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Demo DBT records
  const [disbursementRecords, setDisbursementRecords] = useState([
    {
      id: 'dbt-01',
      applicationId: 'TC-2026-004321',
      studentName: 'Arun Kumar',
      scheme: 'Top Class Education Scheme',
      approvedAmount: 50000,
      tranche: 'Tranche 1 (₹32,000)',
      accountMasked: 'SBI ••••4819 (Aadhaar Seeded)',
      releaseStatus: 'Released',
      pfmsRef: 'PFMS-TN-2026-90821',
      date: '15 Sep 2026'
    },
    {
      id: 'dbt-02',
      applicationId: 'TC-2026-004321',
      studentName: 'Arun Kumar',
      scheme: 'Top Class Education Scheme',
      approvedAmount: 18000,
      tranche: 'Tranche 2 (₹18,000)',
      accountMasked: 'SBI ••••4819 (Aadhaar Seeded)',
      releaseStatus: 'Pending Release',
      pfmsRef: 'PFMS-BATCH-TN-B4',
      date: 'Awaiting Batch Push'
    },
    {
      id: 'dbt-03',
      applicationId: 'PM-2026-406173',
      studentName: 'K. Malarmathi',
      scheme: 'Post-Matric Scholarship',
      approvedAmount: 38000,
      tranche: 'Full Grant (₹38,000)',
      accountMasked: 'Canara Bank ••••3912',
      releaseStatus: 'Pending Release',
      pfmsRef: 'PFMS-BATCH-TN-B4',
      date: 'Queued'
    },
    {
      id: 'dbt-04',
      applicationId: 'PRE-2026-109284',
      studentName: 'S. Vignesh',
      scheme: 'Pre-Matric Scholarship',
      approvedAmount: 12000,
      tranche: 'Annual Maintenance (₹12,000)',
      accountMasked: 'IOB ••••7721',
      releaseStatus: 'Released',
      pfmsRef: 'PFMS-TN-2026-88124',
      date: '02 Sep 2026'
    },
    {
      id: 'dbt-05',
      applicationId: 'PM-2026-092144',
      studentName: 'M. Selvam',
      scheme: 'Post-Matric Scholarship',
      approvedAmount: 40000,
      tranche: 'Course Fee + Living (₹40,000)',
      accountMasked: 'Indian Bank ••••1109',
      releaseStatus: 'Failed / Exception',
      pfmsRef: 'ERR-NPCI-MANDATE-INACTIVE',
      date: '20 Sep 2026'
    }
  ]);

  const handleMarkAsReleased = (recordId) => {
    setDisbursementRecords(prev => prev.map(rec => {
      if (rec.id === recordId) {
        return {
          ...rec,
          releaseStatus: 'Released',
          date: 'Just now (Simulated DBT)',
          pfmsRef: `PFMS-RELEASED-${Math.floor(10000 + Math.random() * 90000)}`
        };
      }
      return rec;
    }));
    setSuccessToast(`Disbursement successfully marked as released via simulated DBT transfer.`);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const handleReleaseAllPending = () => {
    setDisbursementRecords(prev => prev.map(rec => {
      if (rec.releaseStatus === 'Pending Release') {
        return {
          ...rec,
          releaseStatus: 'Released',
          date: 'Just now (Batch Release)',
          pfmsRef: `PFMS-BATCH-${Math.floor(10000 + Math.random() * 90000)}`
        };
      }
      return rec;
    }));
    setSuccessToast(`All pending disbursements in Batch #TN-2026-B4 marked as released.`);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  return (
    <div className="officer-disbursements-view" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Screen Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-deep-forest)', margin: 0, fontWeight: 800 }}>
              Disbursement Management
            </h1>
            <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--color-warm-sand)', color: 'var(--color-terracotta-dark)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
              DBT TREASURY DESK
            </span>
          </div>
          <p style={{ marginTop: '4px', fontSize: '0.88rem', color: 'var(--color-muted-text)' }}>
            Monitor Direct Benefit Transfer (DBT) batches, verify bank seeding pipelines, and dispatch scheduled tranches.
          </p>
        </div>

        <button
          onClick={handleReleaseAllPending}
          className="btn-primary"
          style={{ padding: '9px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Send size={15} />
          <span>Release Pending Batch (DBT)</span>
        </button>
      </div>

      {/* MANDATORY PROMINENT DEMO DATA WARNING BANNER */}
      <div style={{
        backgroundColor: '#FFFBEB',
        border: '1px solid #FCD34D',
        borderRadius: 'var(--radius-md)',
        padding: '12px 18px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.82rem',
        color: '#92400E'
      }}>
        <ShieldAlert size={20} color="#D97706" style={{ flexShrink: 0 }} />
        <div>
          <strong>SIH 2026 DEMO ENVIRONMENT — DEMO DATA:</strong> All financial amounts, PFMS reference numbers, and DBT transaction batches shown here are simulated prototype records for demonstration purposes. This interface does not connect to real bank accounts or execute live monetary transfers.
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

      {/* 4 Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '26px' }}>
        
        {/* Total Approved */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-muted-text)', marginBottom: '4px' }}>
            Total Approved
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-deep-forest)' }}>
            ₹4.12 Cr
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-green)', marginTop: '2px' }}>Sanction orders sealed</div>
        </div>

        {/* Pending Release */}
        <div className="card" style={{ padding: '18px', borderLeft: '4px solid var(--color-warning)' }}>
          <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-warning-dark)', marginBottom: '4px' }}>
            Pending Release
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-warning-dark)' }}>
            ₹64.20 L
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-warning-dark)', marginTop: '2px' }}>Batch #TN-2026-B4 queued</div>
        </div>

        {/* Released */}
        <div className="card" style={{ padding: '18px', borderLeft: '4px solid var(--color-success)' }}>
          <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-success-dark)', marginBottom: '4px' }}>
            Released
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-success-dark)' }}>
            ₹3.48 Cr
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-success)', marginTop: '2px' }}>Credited via Aadhaar DBT</div>
        </div>

        {/* Failed / Exception */}
        <div className="card" style={{ padding: '18px', borderLeft: '4px solid var(--color-danger)' }}>
          <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-danger)', marginBottom: '4px' }}>
            Failed / Exception
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-danger)' }}>
            ₹3.10 L
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-danger)', marginTop: '2px' }}>Bank mandate / KYC issues</div>
        </div>

      </div>

      {/* Disbursements Table */}
      <div className="card" style={{ padding: 0, backgroundColor: '#FFFFFF', overflow: 'hidden', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-deep-forest)', fontWeight: 700 }}>
              Live DBT Transfer Register (DEMO DATA)
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-subtle-text)' }}>
              Individual student beneficiary records and batch dispatch status
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-warm-sand-light)', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--color-deep-forest)', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                  Application & Student
                </th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--color-deep-forest)', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                  Scheme
                </th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--color-deep-forest)', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                  Approved Amount
                </th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--color-deep-forest)', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                  Release Status
                </th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--color-deep-forest)', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                  PFMS Reference
                </th>
                <th style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--color-deep-forest)', fontSize: '0.76rem', textTransform: 'uppercase', textAlign: 'right' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {disbursementRecords.map((record) => (
                <tr
                  key={record.id}
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                    backgroundColor: record.releaseStatus === 'Pending Release' ? 'var(--color-warm-sand-light)' : '#FFFFFF'
                  }}
                >
                  <td style={{ padding: '16px 18px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--color-charcoal)' }}>
                      {record.studentName}
                    </div>
                    <div style={{ fontSize: '0.76rem', fontFamily: 'monospace', color: 'var(--color-subtle-text)' }}>
                      {record.applicationId}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)' }}>
                      {record.accountMasked}
                    </div>
                  </td>

                  <td style={{ padding: '16px 18px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-deep-forest)', fontSize: '0.86rem' }}>
                      {record.scheme}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-green)' }}>
                      {record.tranche}
                    </div>
                  </td>

                  <td style={{ padding: '16px 18px' }}>
                    <div style={{ fontWeight: 800, color: 'var(--color-charcoal)', fontSize: '0.98rem' }}>
                      ₹{record.approvedAmount?.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)' }}>
                      DEMO DISBURSEMENT
                    </div>
                  </td>

                  <td style={{ padding: '16px 18px' }}>
                    <span className={`badge ${
                      record.releaseStatus === 'Released' ? 'badge-success' :
                      record.releaseStatus === 'Pending Release' ? 'badge-warning' :
                      'badge-danger'
                    }`} style={{ fontSize: '0.74rem' }}>
                      {record.releaseStatus}
                    </span>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', marginTop: '2px' }}>
                      {record.date}
                    </div>
                  </td>

                  <td style={{ padding: '16px 18px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--color-muted-text)' }}>
                    {record.pfmsRef}
                  </td>

                  <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setSelectedBatch(record)}
                        className="btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        [View]
                      </button>

                      {record.releaseStatus === 'Pending Release' && (
                        <button
                          onClick={() => handleMarkAsReleased(record.id)}
                          className="btn-primary"
                          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                        >
                          [Mark as Released]
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Batch Details Modal */}
      {selectedBatch && (
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
            maxWidth: '560px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '26px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span className="badge badge-forest" style={{ fontSize: '0.72rem' }}>
                  DEMO DBT TRANSACTION AUDIT
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-deep-forest)', margin: '4px 0 0', fontWeight: 800 }}>
                  Disbursement Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedBatch(null)}
                style={{ color: 'var(--color-subtle-text)', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ backgroundColor: 'var(--color-warm-sand-light)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '18px', fontSize: '0.84rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <div style={{ color: 'var(--color-muted-text)', fontSize: '0.72rem' }}>BENEFICIARY</div>
                  <div style={{ fontWeight: 700 }}>{selectedBatch.studentName}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--color-muted-text)', fontSize: '0.72rem' }}>APPLICATION</div>
                  <div style={{ fontWeight: 700, fontFamily: 'monospace' }}>{selectedBatch.applicationId}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--color-muted-text)', fontSize: '0.72rem' }}>APPROVED AMOUNT</div>
                  <div style={{ fontWeight: 800, color: 'var(--color-deep-forest)' }}>₹{selectedBatch.approvedAmount?.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--color-muted-text)', fontSize: '0.72rem' }}>STATUS</div>
                  <div style={{ fontWeight: 700 }}>{selectedBatch.releaseStatus}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ color: 'var(--color-muted-text)', fontSize: '0.72rem' }}>BANK ACCOUNT</div>
                  <div style={{ fontWeight: 600 }}>{selectedBatch.accountMasked}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ color: 'var(--color-muted-text)', fontSize: '0.72rem' }}>PFMS REFERENCE</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{selectedBatch.pfmsRef}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedBatch(null)}
                className="btn-secondary"
                style={{ padding: '9px 16px' }}
              >
                Close
              </button>
              {selectedBatch.releaseStatus === 'Pending Release' && (
                <button
                  onClick={() => {
                    handleMarkAsReleased(selectedBatch.id);
                    setSelectedBatch(null);
                  }}
                  className="btn-primary"
                  style={{ padding: '9px 16px' }}
                >
                  Mark as Released
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Landmark, 
  ShieldCheck, 
  Info, 
  Building,
  CreditCard,
  History
} from 'lucide-react';
import { TribalWatermark, TribalDivider } from '../common/TribalPattern';

export function MoneyJourneyScreen() {
  const { studentProfile } = useApp();

  const transactions = [
    {
      id: 'tx-1',
      title: 'Top Class Education — Tranche 1 (Tuition & Living)',
      amount: 32000,
      date: '18 Sep 2026',
      status: 'Disbursed',
      utr: 'PFMS-DBT-2026-9812401',
      bank: 'State Bank of India (A/c ••••4819)',
      mode: 'Aadhaar Payment Bridge System (APBS)'
    },
    {
      id: 'tx-2',
      title: 'Top Class Education — Tranche 2 (IT Grant & Books)',
      amount: 18000,
      date: 'Expected Oct 2026',
      status: 'Pending Release',
      utr: 'Queued in Treasury File #884/26',
      bank: 'State Bank of India (A/c ••••4819)',
      mode: 'DBT Direct Credit'
    }
  ];

  return (
    <div className="money-journey-screen" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--color-deep-forest)', margin: 0 }}>
            💰 My Scholarship Money
          </h1>
          <p style={{ marginTop: '4px', fontSize: '0.92rem', color: 'var(--color-muted-text)' }}>
            Transparent financial tracking for approved ST scholarship disbursements.
          </p>
        </div>

        {/* Demo Data Tag */}
        <span style={{
          backgroundColor: 'var(--color-warm-sand)',
          color: 'var(--color-terracotta-dark)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-full)',
          padding: '4px 12px',
          fontSize: '0.78rem',
          fontWeight: 700
        }}>
          Simulated DBT Demo Data
        </span>
      </div>

      {/* 4 Financial Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        
        {/* Potential Benefit */}
        <div className="card" style={{ padding: '20px', borderLeft: '4px solid var(--color-muted-green)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-muted-green)', textTransform: 'uppercase' }}>
            Potential Benefit
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-charcoal)', margin: '4px 0' }}>
            ₹50,000
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle-text)' }}>
            Total sanctioned ceiling
          </div>
        </div>

        {/* Approved */}
        <div className="card" style={{ padding: '20px', borderLeft: '4px solid var(--color-deep-forest)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-deep-forest)', textTransform: 'uppercase' }}>
            Approved
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-deep-forest)', margin: '4px 0' }}>
            ₹50,000
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-success)' }}>
            Sanction Order Issued
          </div>
        </div>

        {/* Disbursed */}
        <div className="card" style={{ padding: '20px', borderLeft: '4px solid var(--color-success)', backgroundColor: 'var(--color-warm-sand-light)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-success-dark)', textTransform: 'uppercase' }}>
            Disbursed
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-success-dark)', margin: '4px 0' }}>
            ₹32,000
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-success-dark)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={13} /> Credited to bank
          </div>
        </div>

        {/* Pending */}
        <div className="card" style={{ padding: '20px', borderLeft: '4px solid var(--color-warning)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-warning-dark)', textTransform: 'uppercase' }}>
            Pending
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-warning-dark)', margin: '4px 0' }}>
            ₹18,000
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-warning-dark)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} /> Tranche 2 in queue
          </div>
        </div>

      </div>

      {/* Visual Flow Pipeline */}
      <div className="card" style={{ padding: '24px 20px', marginBottom: '28px' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-deep-forest)', textTransform: 'uppercase', marginBottom: '16px' }}>
          Direct Benefit Transfer (DBT) Flow
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', textAlign: 'center' }}>
          <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-warm-sand-light)', border: '1px solid var(--color-border)' }}>
            <Building size={24} color="var(--color-deep-forest)" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Ministry Sanction</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>Order Generated ✓</div>
          </div>

          <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-warm-sand-light)', border: '1px solid var(--color-border)' }}>
            <Landmark size={24} color="var(--color-deep-forest)" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>State Treasury / PFMS</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>Audit Cleared ✓</div>
          </div>

          <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-warm-sand-light)', border: '1px solid var(--color-border)' }}>
            <CreditCard size={24} color="var(--color-terracotta)" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>NPCI Aadhaar Bridge</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>Active Seeding ✓</div>
          </div>

          <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-success-bg)', border: '1px solid var(--color-success)' }}>
            <CheckCircle2 size={24} color="var(--color-success)" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-success-dark)' }}>Student Bank A/c</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-success-dark)' }}>₹32,000 Received ✓</div>
          </div>
        </div>
      </div>

      {/* Disbursement Transaction History */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-deep-forest)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={18} />
            <span>Installment History</span>
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-muted-green)' }}>
            Bank: {studentProfile.bankName}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: tx.status === 'Disbursed' ? 'var(--color-warm-sand-light)' : '#FFFFFF',
                border: '1px solid var(--color-border)'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>
                  {tx.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle-text)', marginTop: '2px' }}>
                  Reference / UTR: {tx.utr} • {tx.mode}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)', marginTop: '2px' }}>
                  Target: {tx.bank}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: tx.status === 'Disbursed' ? 'var(--color-success-dark)' : 'var(--color-warning-dark)' }}>
                  ₹{tx.amount.toLocaleString('en-IN')}
                </div>
                <span className={`badge ${tx.status === 'Disbursed' ? 'badge-success' : 'badge-warning'}`}>
                  {tx.status}
                </span>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle-text)', marginTop: '4px' }}>
                  {tx.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: 'var(--color-warm-sand)', borderRadius: 'var(--radius-sm)', fontSize: '0.76rem', color: 'var(--color-muted-text)' }}>
          Disclaimer: Data displayed above represents prototype DBT payment simulator values. Real financial transactions are executed exclusively through the Public Financial Management System (PFMS) and National Payments Corporation of India (NPCI).
        </div>
      </div>
    </div>
  );
}

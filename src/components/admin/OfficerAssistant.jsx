import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Sparkles
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function OfficerAssistant() {

  const [messages, setMessages] = useState([
    {
      id: 'm-officer-init',
      sender: 'assistant',
      text: 'Good day, Officer. I am your Directorate Scrutiny Assistant. I can summarize candidate applications, clarify Ministry of Tribal Affairs guidelines, check verification thresholds, or draft official remarks.',
      time: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  const quickActionPrompts = [
    { label: '📋 Summarize application', query: 'Summarize application APP-2026-001245 for Arun Kumar' },
    { label: '⚖️ Explain eligibility criteria', query: 'Explain eligibility criteria for Post-Matric and Top Class schemes' },
    { label: '🔍 Find pending applications', query: 'Find pending applications requiring action today' },
    { label: '📄 Explain document requirement', query: 'Explain document requirement for income certificate renewal' },
    { label: '⚠️ Summarize grievance', query: 'Summarize open grievance tickets for District Desk #04' }
  ];

  const getOfficerResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('summarize application') || q.includes('arun kumar') || q.includes('001245')) {
      return `**Candidate Application Summary: Arun Kumar (PM-2026-001245)**
• **Scheme:** Post-Matric Scholarship for ST Students (AY 2026-27).
• **Eligibility Check:** Enrolled in B.Tech CSE at CEG Anna University. ST (Irular community) verified via TN-ST-89324.
• **Financials:** Family income ₹2,50,000 / year (within ₹2.50 L ceiling). Aadhaar-seeded active account with State Bank of India (••••4819).
• **Current Status:** College nodal officer has approved. Fresh valid income certificate verified. Sanction order pending district welfare officer approval.
• **Recommended Action:** Application is 100% compliant. Safe to **Sanction & Approve**.`;
    }

    if (q.includes('eligibility criteria') || q.includes('explain eligibility')) {
      return `**Ministry of Tribal Affairs — Core Eligibility Guidelines:**
1. **Post-Matric ST Scheme:**
   • Student must belong to Scheduled Tribe.
   • Annual family income from all sources must not exceed ₹2,50,000.
   • Covers post-secondary degree, diploma, or professional courses.
2. **Top Class Education Scheme:**
   • Applicable exclusively for notified premier institutes (IITs, NITs, AIIMS, premier State Universities).
   • Family income ceiling is ₹8,00,000 per annum.
   • Covers full tuition + ₹3,000/mo living expenses + ₹50,000 IT hardware grant.`;
    }

    if (q.includes('find pending') || q.includes('pending application')) {
      return `**Active Pending Queue on Desk #04:**
• **14 Applications** currently in Government Scrutiny stage.
• **Priority Case:** Arun Kumar (PM-2026-001245) — Document verification complete.
• **Priority Case 2:** K. Malarmathi (PM-2026-406173) — Pending final sanction order.
• **Priority Case 3:** S. Vignesh (PRE-2026-109284) — School nodal confirmation logged.
• Navigate to the [Applications] tab to execute bulk or single approvals.`;
    }

    if (q.includes('document requirement') || q.includes('income certificate')) {
      return `**Statutory Document Requirements for ST Scholarships:**
1. **Permanent ST Community Certificate:** Issued by competent Revenue Divisional Officer (RDO) or Sub-Collector. Does NOT expire.
2. **Annual Income Certificate:** Mandatory annual renewal for FY 2026-27. Must bear digitally signed e-District QR code and seal of Tahsildar.
3. **Aadhaar DBT Seeding:** Bank passbook must confirm NPCI Aadhaar Payment Bridge mapping.
4. **Academic Marksheet:** Authenticated by Controller of Examinations / Principal.`;
    }

    if (q.includes('summarize grievance') || q.includes('grievance')) {
      return `**District Grievance Redressal Status:**
• **Ticket GRV-TN-2026-00904 (Arun Kumar):** Query regarding Tranche 2 release date (₹18,000). Treasury countersigned; release expected in upcoming batch transfer.
• **Ticket GRV-TN-2026-00912 (K. Malarmathi):** Income certificate QR code validation inquiry.
• **Resolution Rate:** 85% of complaints resolved within standard 7-day citizen service charter.`;
    }

    return `Officer inquiry received regarding "${query}". Under Directorate guidelines, all verification records are cross-checked against the State e-District portal and NPCI DBT bridge. Would you like me to inspect specific candidate files or review scheme quotas?`;
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg = {
      id: `m-officer-${Date.now()}`,
      sender: 'officer',
      text: text,
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getOfficerResponse(text);
      const assistantMsg = {
        id: `m-officer-reply-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        time: 'Just now'
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="officer-assistant-view" style={{ position: 'relative' }}>
      <TribalWatermark opacity={0.02} />

      {/* Screen Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--color-deep-forest)', margin: 0, fontWeight: 800 }}>
              Officer Assistant
            </h1>
            <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--color-deep-forest)', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
              AI SCRUTINY COPILOT
            </span>
          </div>
          <p style={{ marginTop: '4px', fontSize: '0.88rem', color: 'var(--color-muted-text)' }}>
            Instant policy citations, candidate dossier summarization, and verification decision support for welfare officers.
          </p>
        </div>
      </div>

      {/* Quick Action Prompt Pills */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-muted-text)', marginBottom: '8px' }}>
          Officer Quick Prompts
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {quickActionPrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(item.query)}
              className="btn-secondary"
              style={{
                padding: '7px 13px',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-warm-sand-light)',
                border: '1px solid var(--color-border)',
                fontWeight: 600,
                color: 'var(--color-deep-forest)'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Conversation Container */}
      <div className="card tribal-accent-border" style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        height: '520px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        padding: 0
      }}>
        {/* Messages Stream */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {messages.map((msg) => {
            const isOfficer = msg.sender === 'officer';

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  alignSelf: isOfficer ? 'flex-end' : 'flex-start',
                  maxWidth: '82%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isOfficer ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  padding: '12px 18px',
                  borderRadius: isOfficer ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  backgroundColor: isOfficer ? 'var(--color-deep-forest)' : 'var(--color-warm-sand-light)',
                  color: isOfficer ? '#FFFFFF' : 'var(--color-charcoal)',
                  border: isOfficer ? 'none' : '1px solid var(--color-border)',
                  fontSize: '0.88rem',
                  lineHeight: 1.55,
                  boxShadow: 'var(--shadow-sm)',
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.text}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-subtle-text)', marginTop: '4px', padding: '0 4px' }}>
                  {isOfficer ? 'Desk #04' : 'Directorate Copilot'} • {msg.time}
                </div>
              </motion.div>
            );
          })}

          {isTyping && (
            <div style={{ alignSelf: 'flex-start', padding: '10px 16px', backgroundColor: 'var(--color-warm-sand-light)', borderRadius: '14px', fontSize: '0.8rem', color: 'var(--color-muted-text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} color="var(--color-terracotta)" />
              <span>Analyzing regulations and student records...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div style={{
          padding: '14px 18px',
          borderTop: '1px solid var(--color-border)',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            className="form-input"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            placeholder="Ask anything (e.g., summarize application, explain eligibility, find pending)..."
            style={{ flex: 1, height: '42px', fontSize: '0.88rem' }}
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim()}
            className="btn-primary"
            style={{
              padding: '10px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.86rem'
            }}
          >
            <span>Send</span>
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

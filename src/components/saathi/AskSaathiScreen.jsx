import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { getSaathiResponse } from '../../services/saathiAi';
import { 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  Compass, 
  FileText, 
  FolderOpen, 
  DollarSign, 
  Globe 
} from 'lucide-react';
import { TribalWatermark, TribalDivider } from '../common/TribalPattern';

export function AskSaathiScreen() {
  const {
    studentProfile,
    applications,
    documents,
    setActiveTab,
    setLanguage,
    speakText,
    isSpeaking,
    language
  } = useApp();

  const [messages, setMessages] = useState([
    {
      id: 'm-init',
      sender: 'saathi',
      text: `Namaste ${studentProfile.fullName.split(' ')[0]}! 👋 I am your Scholar Orbit assistant. How can I guide your scholarship journey today?`,
      time: 'Just now',
      followUps: ['🧭 What should I do next?', '📄 Which documents do I need?', '💰 Where is my payment?', '📋 Explain my application']
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  const quickActionPills = [
    { label: '🎓 Find scholarships', query: 'Find scholarships for me' },
    { label: '📋 Explain my application', query: 'Explain my application status' },
    { label: '📄 Which documents do I need?', query: 'Which documents do I need for ST scholarships?' },
    { label: '💰 Where is my payment?', query: 'Where is my payment and DBT status?' },
    { label: '🧭 What should I do next?', query: 'What should I do next?' },
    { label: '🌐 Change language', query: 'How do I change language to Tamil or Hindi?' }
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Just now'
    };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Context data for the AI engine
    const contextData = {
      student: studentProfile,
      applications: applications,
      documents: documents
    };

    setTimeout(() => {
      const response = getSaathiResponse(query, contextData, language);
      const saathiMsg = {
        id: `saathi-${Date.now()}`,
        sender: 'saathi',
        text: response.text,
        followUps: response.followUps,
        time: 'Just now'
      };
      setMessages(prev => [...prev, saathiMsg]);
      setIsTyping(false);
    }, 450);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="ask-saathi-screen" style={{ position: 'relative', maxWidth: '780px', margin: '0 auto' }}>
      <TribalWatermark opacity={0.02} />

      {/* Header Banner */}
      <div className="card tribal-accent-border" style={{
        backgroundColor: '#FFFFFF',
        padding: '20px 24px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            backgroundColor: 'var(--color-deep-forest)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem'
          }}>
            🧭
          </div>
          <div>
            <h1 style={{ fontSize: '1.45rem', color: 'var(--color-deep-forest)', margin: 0 }}>
              ASK SAATHI 👋
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', margin: '2px 0 0' }}>
              "What would you like help with?" • Grounded in official scholarship facts
            </p>
          </div>
        </div>

        <button
          onClick={() => speakText(messages[messages.length - 1]?.text || 'Welcome to Scholar Orbit')}
          className="btn-ghost"
          style={{ fontSize: '0.82rem', border: '1px solid var(--color-border)' }}
        >
          <Volume2 size={16} />
          <span>Read Aloud</span>
        </button>
      </div>

      {/* 6 Quick Action Prompts (Prompt Section 20 Requirement) */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-muted-green)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
          Quick Guidance Actions:
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {quickActionPills.map((action) => (
            <button
              key={action.label}
              onClick={() => handleSendMessage(action.query)}
              style={{
                backgroundColor: 'var(--color-pure-white)',
                border: '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '8px 14px',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--color-charcoal)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-terracotta)';
                e.currentTarget.style.backgroundColor = 'var(--color-warm-sand-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.backgroundColor = 'var(--color-pure-white)';
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="card" style={{
        backgroundColor: 'var(--color-soft-cream)',
        padding: '20px',
        minHeight: '360px',
        maxHeight: '520px',
        overflowY: 'auto',
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '85%',
                backgroundColor: isUser ? 'var(--color-deep-forest)' : '#FFFFFF',
                color: isUser ? '#FFFFFF' : 'var(--color-charcoal)',
                padding: '14px 18px',
                borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                border: isUser ? 'none' : '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.55,
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.text}
                </div>

                {/* Followup interactive buttons */}
                {msg.followUps && msg.followUps.length > 0 && (
                  <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {msg.followUps.map((f, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (f.includes('Document Vault') || f.includes('Income')) {
                            setActiveTab('documents');
                          } else if (f.includes('Tracker') || f.includes('Application')) {
                            setActiveTab('applications');
                          } else if (f.includes('Money')) {
                            setActiveTab('money');
                          } else if (f.includes('Radar') || f.includes('Schemes')) {
                            setActiveTab('opportunities');
                          } else {
                            handleSendMessage(f);
                          }
                        }}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: 'var(--color-warm-sand)',
                          color: 'var(--color-terracotta-dark)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid var(--color-border)'
                        }}
                      >
                        {f} →
                      </button>
                    ))}
                  </div>
                )}

                <div style={{ fontSize: '0.68rem', color: isUser ? 'rgba(255,255,255,0.7)' : 'var(--color-subtle-text)', marginTop: '6px', textAlign: 'right' }}>
                  {msg.time}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-muted-text)', fontSize: '0.85rem' }}>
            <Sparkles size={16} color="var(--color-terracotta)" className="animate-pulse-subtle" />
            <span>Saathi is checking scholarship knowledge...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        style={{
          display: 'flex',
          gap: '10px',
          backgroundColor: '#FFFFFF',
          padding: '8px',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask anything about your scholarship, documents, or status..."
          style={{
            flex: 1,
            padding: '10px 14px',
            border: 'none',
            fontSize: '0.95rem',
            outline: 'none',
            backgroundColor: 'transparent'
          }}
        />

        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className="btn-terracotta"
          style={{
            padding: '10px 18px',
            opacity: inputQuery.trim() ? 1 : 0.6,
            borderRadius: 'var(--radius-md)'
          }}
        >
          <Send size={16} />
          <span className="hidden sm:inline">Ask</span>
        </button>
      </form>
    </div>
  );
}

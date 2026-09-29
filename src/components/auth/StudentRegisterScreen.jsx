import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Building, 
  IndianRupee 
} from 'lucide-react';
import { TribalWatermark } from '../common/TribalPattern';

export function StudentRegisterScreen({ onNavigate }) {
  const { registerStudent } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    isST: 'yes',
    tribe: 'Irular',
    educationLevel: 'Undergraduate',
    course: 'B.Tech Computer Science & Engineering',
    institution: 'College of Engineering, Guindy (Anna University)',
    state: 'Tamil Nadu',
    district: 'Chennai',
    income: '250000'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerStudent(formData);
  };

  return (
    <div className="student-register-screen" style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-warm-sand-light)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <TribalWatermark opacity={0.03} />

      {/* Top Banner */}
      <div style={{
        backgroundColor: 'var(--color-deep-forest)',
        color: 'var(--color-warm-sand)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.82rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 800, color: 'var(--color-terracotta)' }}>SCHOLAR ORBIT</span>
          <span>• Student Profile Registration</span>
        </div>

        <button
          onClick={() => onNavigate('student-login')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-warm-sand)',
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to Login</span>
        </button>
      </div>

      {/* Main Registration Form Container */}
      <div style={{
        maxWidth: '680px',
        width: '100%',
        margin: '36px auto',
        padding: '0 20px',
        flex: 1
      }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="card tribal-accent-border"
          style={{
            padding: '32px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="badge badge-forest" style={{ fontSize: '0.74rem', marginBottom: '8px' }}>
              NEW STUDENT ONBOARDING
            </span>
            <h1 style={{ fontSize: '1.65rem', color: 'var(--color-deep-forest)', margin: '4px 0 6px', fontWeight: 800 }}>
              CREATE YOUR SCHOLARSHIP PROFILE
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-muted-text)', margin: 0 }}>
              Build your verified tribal digital passport to unlock matched opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Step A: Account Credentials */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-deep-forest)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
                1. Basic Student Credentials
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name (as in Aadhaar)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Arun Kumar"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number (Aadhaar Linked)</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+91 98401 •••••"
                    value={formData.mobile}
                    onChange={(e) => handleChange('mobile', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Create Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step B: Demographic & ST Onboarding */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-deep-forest)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
                2. Community & Education Details
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                
                {/* Are you an ST student? */}
                <div className="form-group">
                  <label className="form-label">Are you an ST student?</label>
                  <select
                    className="form-input"
                    value={formData.isST}
                    onChange={(e) => handleChange('isST', e.target.value)}
                  >
                    <option value="yes">Yes, Scheduled Tribe (ST)</option>
                    <option value="no">No, Other Category</option>
                  </select>
                </div>

                {/* Tribe / Subcaste */}
                <div className="form-group">
                  <label className="form-label">Tribe / Subcaste</label>
                  <select
                    className="form-input"
                    value={formData.tribe}
                    onChange={(e) => handleChange('tribe', e.target.value)}
                  >
                    <option value="Irular">Irular</option>
                    <option value="Malayali">Malayali</option>
                    <option value="Toda">Toda</option>
                    <option value="Kurumbar">Kurumbar</option>
                    <option value="Kota">Kota</option>
                    <option value="Kadar">Kadar</option>
                  </select>
                </div>

                {/* Education Level */}
                <div className="form-group">
                  <label className="form-label">Current Education Level</label>
                  <select
                    className="form-input"
                    value={formData.educationLevel}
                    onChange={(e) => handleChange('educationLevel', e.target.value)}
                  >
                    <option value="Undergraduate">Undergraduate (B.Tech, B.Sc, B.A, MBBS)</option>
                    <option value="Postgraduate">Postgraduate (M.Tech, M.Sc, M.A, MBA)</option>
                    <option value="Secondary">Class 9 - 10 (Pre-Matric)</option>
                    <option value="Higher Secondary">Class 11 - 12</option>
                    <option value="Research">Ph.D / M.Phil (Fellowship)</option>
                  </select>
                </div>

                {/* Course Name */}
                <div className="form-group">
                  <label className="form-label">Course / Degree</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. B.Tech Computer Science"
                    value={formData.course}
                    onChange={(e) => handleChange('course', e.target.value)}
                  />
                </div>

                {/* Institution */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">College / School Institution Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. College of Engineering Guindy (Anna University)"
                    value={formData.institution}
                    onChange={(e) => handleChange('institution', e.target.value)}
                  />
                </div>

                {/* State & District */}
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">District</label>
                  <select
                    className="form-input"
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Tiruvannamalai">Tiruvannamalai</option>
                    <option value="Nilgiris">Nilgiris</option>
                    <option value="Salem">Salem</option>
                    <option value="Coimbatore">Coimbatore</option>
                  </select>
                </div>

                {/* Family Income */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Annual Family Income (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="250000"
                    value={formData.income}
                    onChange={(e) => handleChange('income', e.target.value)}
                  />
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-muted-text)', marginTop: '4px' }}>
                    Used solely to check income thresholds (e.g. ₹2.5 Lakh for Post-Matric, ₹8.0 Lakh for Top Class).
                  </div>
                </div>

              </div>
            </div>

            {/* Actions */}
            <div style={{ marginTop: '12px' }}>
              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>Create Profile & Enter Dashboard</span>
                <ArrowRight size={17} />
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '6px' }}>
              <span style={{ fontSize: '0.84rem', color: 'var(--color-muted-text)' }}>Already registered? </span>
              <button
                type="button"
                onClick={() => onNavigate('student-login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-terracotta)',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Log in here
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}

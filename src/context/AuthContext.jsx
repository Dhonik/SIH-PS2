import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STUDENT_PROFILE } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

const AuthContext = createContext();

const DEMO_OFFICER_USER = {
  id: 'usr-officer-senthil-2026',
  name: 'Dr. K. Senthil Nathan, IAS',
  designation: 'District Welfare Officer & Scrutiny Lead',
  officialId: 'TN-DWO-2026-4091',
  role: 'officer',
  department: 'Directorate of Tribal Welfare, Tamil Nadu',
  district: 'Chennai & Tiruvannamalai',
  email: 'dwo.chennai@tribal.gov.in'
};

const DEMO_STUDENT_USER = {
  ...INITIAL_STUDENT_PROFILE,
  name: INITIAL_STUDENT_PROFILE.fullName,
  role: 'student',
  email: 'arun.kumar@ceg.edu.in'
};

export function AuthProvider({ children }) {
  // Read initial auth state from localStorage (defaults to logged-out on fresh visit)
  const [authState, setAuthState] = useState(() => {
    if (typeof window === 'undefined') {
      return { isAuthenticated: false, user: null, role: null };
    }
    try {
      const stored = localStorage.getItem('ts_auth_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.role) {
          return {
            isAuthenticated: true,
            user: parsed.user,
            role: parsed.role
          };
        }
      }
    } catch {
      // ignore parsing error
    }
    return { isAuthenticated: false, user: null, role: null };
  });

  const { isAuthenticated, user, role } = authState;

  // Persist session to localStorage
  useEffect(() => {
    try {
      if (isAuthenticated && role && user) {
        localStorage.setItem('ts_auth_session', JSON.stringify({ role, user }));
      } else {
        localStorage.removeItem('ts_auth_session');
      }
    } catch {
      // ignore
    }
  }, [isAuthenticated, role, user]);

  // Login as Student (Demo or Credentials)
  const loginAsStudent = async ({ identifier = '', password = '', isDemo = false } = {}) => {
    // If Supabase is fully configured with live project, authenticate via Supabase Auth
    if (isSupabaseConfigured && !isDemo && identifier.includes('@')) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: identifier,
          password: password
        });
        if (error) throw error;
        const studentUser = {
          ...DEMO_STUDENT_USER,
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || DEMO_STUDENT_USER.name
        };
        setAuthState({
          isAuthenticated: true,
          role: 'student',
          user: studentUser
        });
        window.location.hash = '#/student/dashboard';
        return { success: true };
      } catch (err) {
        console.warn('Supabase Auth error, using local fallback:', err.message);
      }
    }

    // Local / Prototype Demo Authentication
    const studentUser = {
      ...DEMO_STUDENT_USER,
      email: identifier.includes('@') ? identifier : DEMO_STUDENT_USER.email,
      phoneNumber: identifier.match(/^\d+$/) ? `+91 ${identifier}` : DEMO_STUDENT_USER.phoneNumber
    };

    setAuthState({
      isAuthenticated: true,
      role: 'student',
      user: studentUser
    });

    window.location.hash = '#/student/dashboard';
    return { success: true };
  };

  // Register New Student Account
  const registerStudent = async (registrationData) => {
    const newStudent = {
      ...DEMO_STUDENT_USER,
      id: `usr-st-${Date.now()}`,
      fullName: registrationData.name || registrationData.fullName || 'Registered ST Student',
      name: registrationData.name || registrationData.fullName || 'Registered ST Student',
      phoneNumber: registrationData.mobile || registrationData.phoneNumber || '+91 98401 •••••',
      email: registrationData.email || 'student@tribal.edu.in',
      course: registrationData.course || DEMO_STUDENT_USER.course,
      institution: registrationData.institution || DEMO_STUDENT_USER.institution,
      tribeSubcaste: registrationData.tribe || DEMO_STUDENT_USER.tribeSubcaste,
      familyAnnualIncome: registrationData.income ? Number(registrationData.income) : DEMO_STUDENT_USER.familyAnnualIncome,
      passportId: `TS-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      role: 'student'
    };

    setAuthState({
      isAuthenticated: true,
      role: 'student',
      user: newStudent
    });

    window.location.hash = '#/student/dashboard';
    return { success: true, user: newStudent };
  };

  // Login as Officer (Demo or Credentials)
  const loginAsOfficer = async ({ officialId = '', password = '', isDemo = false } = {}) => {
    // If live Supabase is configured
    if (isSupabaseConfigured && !isDemo && officialId.includes('@')) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: officialId,
          password: password
        });
        if (error) throw error;
        const officerUser = {
          ...DEMO_OFFICER_USER,
          id: data.user.id,
          email: data.user.email
        };
        setAuthState({
          isAuthenticated: true,
          role: 'officer',
          user: officerUser
        });
        window.location.hash = '#/officer/dashboard';
        return { success: true };
      } catch (err) {
        console.warn('Supabase Auth error, using local fallback:', err.message);
      }
    }

    // Local / Prototype Demo Officer Access
    const officerUser = {
      ...DEMO_OFFICER_USER,
      officialId: officialId || DEMO_OFFICER_USER.officialId
    };

    setAuthState({
      isAuthenticated: true,
      role: 'officer',
      user: officerUser
    });

    window.location.hash = '#/officer/dashboard';
    return { success: true };
  };

  // Logout from either portal -> redirects immediately to landing root
  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      role: null
    });
    localStorage.removeItem('ts_auth_session');
    window.location.hash = '#/';
  };

  // Demo Switch functions (specifically permitted for Section 6 Officer "Return to Student View" demo)
  const switchToStudentDemo = () => {
    setAuthState({
      isAuthenticated: true,
      role: 'student',
      user: DEMO_STUDENT_USER
    });
    window.location.hash = '#/student/dashboard';
  };

  const switchToOfficerDemo = () => {
    setAuthState({
      isAuthenticated: true,
      role: 'officer',
      user: DEMO_OFFICER_USER
    });
    window.location.hash = '#/officer/dashboard';
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        role,
        loginAsStudent,
        registerStudent,
        loginAsOfficer,
        logout,
        switchToStudentDemo,
        switchToOfficerDemo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

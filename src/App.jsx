import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import Dashboard from '@/pages/Dashboard';
import ResumeBuilder from '@/pages/ResumeBuilder';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/auth" />;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <>
      <Helmet>
        <title>AI Resume Builder - Create Professional Resumes Instantly</title>
        <meta name="description" content="Build ATS-friendly resumes with AI assistance. Choose from professional templates and download in PDF format." />
      </Helmet>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/builder/:id?" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
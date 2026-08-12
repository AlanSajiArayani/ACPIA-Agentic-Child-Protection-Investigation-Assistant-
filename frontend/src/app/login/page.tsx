'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, User, Eye, EyeOff, AlertCircle, Loader2, KeyRound } from 'lucide-react';
import { DEMO_USERNAME, DEMO_PASSWORD, setAuthenticatedUser, isAuthenticated } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();

  // Form State
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation & Submission State
  const [errors, setErrors] = useState<{ usernameOrEmail?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to /cases
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/cases');
    }
  }, [router]);

  // Client-side Validation Handler
  const validateForm = (): boolean => {
    const newErrors: { usernameOrEmail?: string; password?: string } = {};

    if (!usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = 'Username or email is required.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate authenticating against local system credentials
      await new Promise((resolve) => setTimeout(resolve, 600));

      const inputUsername = usernameOrEmail.trim();

      // Demo Authentication Check: Only "investigator" / "hackup2026" allowed
      if (inputUsername === DEMO_USERNAME && password === DEMO_PASSWORD) {
        setAuthenticatedUser(inputUsername);
        router.push('/cases');
      } else {
        setErrors({ general: 'Invalid username or password' });
        setIsSubmitting(false);
      }
    } catch {
      setErrors({ general: 'An unexpected authentication error occurred. Please try again.' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 px-4 py-12 text-slate-100 overflow-hidden select-none">
      {/* Background Decorative Cyber-Grid & Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Top Badge */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-400 backdrop-blur-md shadow-sm">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            SECURE TERMINAL • AUTHORIZED PERSONNEL ONLY
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl shadow-2xl shadow-cyan-950/20">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-500/30 text-cyan-400 mb-3 shadow-inner">
              <Shield className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Hack&apos;up
            </h1>
            <p className="mt-1 text-sm font-medium text-cyan-400/90 tracking-wide uppercase font-mono">
              Investigation Platform
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Enter your investigator credentials to access the workspace
            </p>
          </div>

          {/* General Error Alert */}
          {errors.general && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            
            {/* Username / Email Field */}
            <div>
              <label 
                htmlFor="usernameOrEmail" 
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  autoComplete="username"
                  disabled={isSubmitting}
                  value={usernameOrEmail}
                  onChange={(e) => {
                    setUsernameOrEmail(e.target.value);
                    if (errors.usernameOrEmail || errors.general) {
                      setErrors((prev) => ({ ...prev, usernameOrEmail: undefined, general: undefined }));
                    }
                  }}
                  placeholder="investigator"
                  className={`w-full rounded-xl border bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 transition-all focus:outline-none ${
                    errors.usernameOrEmail
                      ? 'border-red-500/70 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-slate-800 focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/70'
                  }`}
                />
              </div>
              {errors.usernameOrEmail && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.usernameOrEmail}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password || errors.general) {
                      setErrors((prev) => ({ ...prev, password: undefined, general: undefined }));
                    }
                  }}
                  placeholder="••••••••••••"
                  className={`w-full rounded-xl border bg-slate-950/80 py-2.5 pl-10 pr-11 text-sm text-slate-100 placeholder-slate-500 transition-all focus:outline-none ${
                    errors.password
                      ? 'border-red-500/70 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-slate-800 focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/70'
                  }`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  disabled={isSubmitting}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-950/50 transition-all hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <KeyRound className="h-4 w-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Hint */}
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
            <p className="text-[11px] font-mono text-slate-400">
              Demo Credentials: <span className="text-cyan-400 font-semibold">investigator</span> / <span className="text-cyan-400 font-semibold">hackup2026</span>
            </p>
          </div>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Hack&apos;up Investigation Platform &copy; 2026. All rights reserved.
        </p>

      </div>
    </div>
  );
}

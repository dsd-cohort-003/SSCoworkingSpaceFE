import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LABELS } from '../../labels';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'signup' | 'reset';

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, signup, resetPassword, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'login') {
      const result = await login(email, password);
      if (result.success) {
        onClose();
        resetForm();
      } else {
        setError(result.error || LABELS.AUTH.LOGIN_MODAL.ERROR_MESSAGE);
      }
    } else if (mode === 'signup') {
      const result = await signup(email, password, name);
      if (result.success) {
        setSuccess(
          'Account created successfully! Please check your email to verify your account.',
        );
        setMode('login');
        resetForm();
      } else {
        setError(result.error || 'Failed to create account');
      }
    } else if (mode === 'reset') {
      const result = await resetPassword(email);
      if (result.success) {
        setSuccess(LABELS.AUTH.LOGIN_MODAL.RESET_SUCCESS_MESSAGE);
      } else {
        setError(result.error || 'Failed to send reset email');
      }
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
    setSuccess('');
  };

  const handleClose = () => {
    onClose();
    setMode('login');
    resetForm();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'signup':
        return LABELS.AUTH.LOGIN_MODAL.SIGNUP_TITLE;
      case 'reset':
        return LABELS.AUTH.LOGIN_MODAL.RESET_PASSWORD_TITLE;
      default:
        return LABELS.AUTH.LOGIN_MODAL.TITLE;
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'signup':
        return LABELS.AUTH.LOGIN_MODAL.SIGNUP_SUBTITLE;
      case 'reset':
        return LABELS.AUTH.LOGIN_MODAL.RESET_PASSWORD_SUBTITLE;
      default:
        return LABELS.AUTH.LOGIN_MODAL.SUBTITLE;
    }
  };

  const getButtonText = () => {
    if (isLoading) {
      switch (mode) {
        case 'signup':
          return LABELS.AUTH.LOGIN_MODAL.SIGNUP_LOADING_TEXT;
        case 'reset':
          return LABELS.AUTH.LOGIN_MODAL.RESET_LOADING_TEXT;
        default:
          return LABELS.AUTH.LOGIN_MODAL.LOADING_TEXT;
      }
    }

    switch (mode) {
      case 'signup':
        return LABELS.AUTH.LOGIN_MODAL.SIGNUP_BUTTON;
      case 'reset':
        return LABELS.AUTH.LOGIN_MODAL.RESET_PASSWORD_BUTTON;
      default:
        return LABELS.AUTH.LOGIN_MODAL.LOGIN_BUTTON;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          {LABELS.AUTH.LOGIN_MODAL.CLOSE_BUTTON}
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#2F4858] mb-2">
            {getTitle()}
          </h2>
          <p className="text-gray-600">{getSubtitle()}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {LABELS.AUTH.LOGIN_MODAL.NAME_LABEL}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent outline-none transition-all"
                placeholder={LABELS.AUTH.LOGIN_MODAL.NAME_PLACEHOLDER}
                required
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {LABELS.AUTH.LOGIN_MODAL.EMAIL_LABEL}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent outline-none transition-all"
              placeholder={LABELS.AUTH.LOGIN_MODAL.EMAIL_PLACEHOLDER}
              required
            />
          </div>

          {mode !== 'reset' && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {LABELS.AUTH.LOGIN_MODAL.PASSWORD_LABEL}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent outline-none transition-all"
                placeholder={LABELS.AUTH.LOGIN_MODAL.PASSWORD_PLACEHOLDER}
                required
              />
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1A535C] text-white py-3 rounded-lg hover:bg-[#1A535C]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {getButtonText()}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center space-y-2">
          {mode === 'login' && (
            <>
              <button
                type="button"
                onClick={() => setMode('reset')}
                className="text-sm text-[#1A535C] hover:underline"
              >
                {LABELS.AUTH.LOGIN_MODAL.FORGOT_PASSWORD}
              </button>
              <p className="text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-[#1A535C] hover:underline"
                >
                  {LABELS.AUTH.LOGIN_MODAL.SWITCH_TO_SIGNUP}
                </button>
              </p>
            </>
          )}

          {mode === 'signup' && (
            <p className="text-sm text-gray-600">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#1A535C] hover:underline"
              >
                {LABELS.AUTH.LOGIN_MODAL.SWITCH_TO_LOGIN}
              </button>
            </p>
          )}

          {mode === 'reset' && (
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-sm text-[#1A535C] hover:underline"
            >
              {LABELS.AUTH.LOGIN_MODAL.BACK_TO_LOGIN}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

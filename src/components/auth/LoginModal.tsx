import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LABELS } from '../../labels';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      onClose();
      setEmail('');
      setPassword('');
    } else {
      setError(LABELS.AUTH.LOGIN_MODAL.ERROR_MESSAGE);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          {LABELS.AUTH.LOGIN_MODAL.CLOSE_BUTTON}
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#2F4858] mb-2">
            {LABELS.AUTH.LOGIN_MODAL.TITLE}
          </h2>
          <p className="text-gray-600">{LABELS.AUTH.LOGIN_MODAL.SUBTITLE}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1A535C] text-white py-3 rounded-lg hover:bg-[#1A535C]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading
              ? LABELS.AUTH.LOGIN_MODAL.LOADING_TEXT
              : LABELS.NAVIGATION.LOGIN}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            {LABELS.AUTH.LOGIN_MODAL.DEMO_CREDENTIALS_TEXT}{' '}
            <span className="font-mono text-[#1A535C]">
              {LABELS.AUTH.LOGIN_MODAL.DEMO_CREDENTIALS_VALUE}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

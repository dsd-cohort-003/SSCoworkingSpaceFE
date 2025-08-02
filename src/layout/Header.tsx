import { NavLink, useNavigate } from 'react-router';
import { useState } from 'react';
import { LABELS } from '../labels';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from '../components/auth/LoginModal';
import UserMenu from '../components/auth/UserMenu';
import Hamburger from '../components/global/Hamburger';
export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  {
    const NavLinks = () => (
      <>
        <a
          href="#contact"
          onClick={() => {
            handleNavigate('#contact');
          }}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          {LABELS.NAVIGATION.CONTACT}
        </a>

        <button
          onClick={() => handleNavigate('/booking/rooms')}
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-left"
        >
          {LABELS.NAVIGATION.RESERVE_DESK}
        </button>

        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-[#E4EDEC80] text-gray-900 border border-gray-400 px-6 py-2 rounded-full hover:bg-[#E4EDEC] hover:scale-105 transition-all"
          >
            {LABELS.NAVIGATION.LOGIN}
          </button>
        )}
      </>
    );

    return (
      <header>
        <nav
          className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50"
          data-state={isOpen ? 'open' : 'closed'}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <NavLink
                to="/"
                className="text-2xl font-bold text-gray-900 brand-logo"
                onClick={() => setIsOpen(false)}
              >
                {LABELS.BRAND.NAME}
              </NavLink>
              {/* Desktop Navigation not AI ps*/}
              <div className="hidden sm:flex items-center space-x-6">
                <NavLinks />
              </div>
              <Hamburger isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
            </div>
            {/* Mobile Navigation not AI ps*/}
            {isOpen && (
              <div className={'sm:hidden flex flex-col mt-12 gap-2 h-screen'}>
                <NavLinks />
              </div>
            )}
          </div>
        </nav>

        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </header>
    );
  }
}

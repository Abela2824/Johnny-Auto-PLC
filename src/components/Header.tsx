import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Logo } from './Logo';
import { Menu, X, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenQuote,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'why-us', label: 'Why Johnny Auto' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'future-project', label: 'Future Project' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if header is resting over dark hero video
  const isOverHero = currentPage === 'home' && !isScrolled;

  return (
    <header
      className={`${
        currentPage === 'home' ? 'fixed' : 'sticky'
      } top-0 left-0 right-0 z-40 w-full transition-colors duration-300 ${
        isOverHero
          ? mobileMenuOpen
            ? 'bg-slate-950 border-b border-slate-800 text-white'
            : 'bg-transparent border-b border-white/10 text-white'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs text-slate-900'
      }`}
    >
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo - Fixed consistent size at all scroll positions */}
          <Logo
            variant={isOverHero ? 'light' : 'dark'}
            size="md"
            onClick={() => handleNavClick('home')}
          />

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-semibold transition-colors relative py-1 ${
                    isActive
                      ? isOverHero
                        ? 'text-white font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
                        : 'text-[#0F2C59] font-bold'
                      : isOverHero
                      ? 'text-white/90 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                      : 'text-slate-600 hover:text-[#0F2C59]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9232D]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action */}
          <div className="hidden sm:flex items-center">
            <button
              id="header-quote-btn"
              onClick={onOpenQuote}
              className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 transition-all duration-200 ${
                isOverHero
                  ? 'bg-[#D9232D] hover:bg-[#b51c24] text-white shadow-lg'
                  : 'bg-[#0F2C59] hover:bg-[#0A1E3D] text-white'
              }`}
            >
              <span>Get a Quote</span>
              <ArrowRight className={`w-4 h-4 ${isOverHero ? 'text-white' : 'text-[#D9232D]'}`} />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors ${
                isOverHero ? 'text-white hover:text-slate-200' : 'text-slate-800 hover:text-[#0F2C59]'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white text-slate-900 border-t border-slate-200 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-base py-2 font-medium border-b border-slate-100 ${
                    isActive ? 'text-[#0F2C59] font-bold' : 'text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="pt-2 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full text-center bg-[#0F2C59] text-white py-3 text-sm font-semibold transition-colors"
            >
              Get a Quote
            </button>
            <div className="text-xs text-slate-500 pt-2 space-y-1">
              <p>Megenagna, Addis Ababa</p>
              <a href={`tel:${COMPANY_INFO.phones[0].raw}`} className="block font-semibold text-slate-900">
                {COMPANY_INFO.phones[0].number}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

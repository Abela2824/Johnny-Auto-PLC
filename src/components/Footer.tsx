import React from 'react';
import { PageId } from '../types';
import { Logo } from './Logo';
import { COMPANY_INFO, CORE_SERVICES } from '../data/companyData';
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { LegalDocType } from './LegalModal';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: () => void;
  onOpenLegal?: (type: LegalDocType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote, onOpenLegal }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Pre-Footer Banner */}
      <div className="border-b border-slate-800 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-white text-xl sm:text-2xl font-display font-bold">
              Automotive Maintenance & Repair
            </h4>
            <p className="text-slate-400 text-sm mt-0.5">
              Megenagna facility, Addis Ababa.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phones[0].raw}`}
              className="text-white bg-slate-800 hover:bg-slate-700 px-5 py-3 text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D9232D]" />
              <span>{COMPANY_INFO.phones[0].number}</span>
            </a>
            <button
              onClick={onOpenQuote}
              className="bg-[#D9232D] hover:bg-[#B51B24] text-white px-6 py-3 text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <Logo variant="light" size="md" onClick={() => handleNav('home')} />
            <p className="text-slate-400 text-sm leading-relaxed max-w-md pt-1">
              Automotive maintenance, collision repair, and vehicle assembly in Addis Ababa, Ethiopia.
            </p>
            <p className="text-xs text-slate-500">
              Registered P.L.C. • Megenagna, Addis Ababa
            </p>
          </div>

          {/* Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider">Company</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors">Services</button>
              </li>
              <li>
                <button onClick={() => handleNav('why-us')} className="hover:text-white transition-colors">Why Johnny Auto</button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-white transition-colors">Workshop Gallery</button>
              </li>
              <li>
                <button onClick={() => handleNav('future-project')} className="hover:text-white transition-colors">Future Project</button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">Contact</button>
              </li>
            </ul>
          </div>

          {/* Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider">Services</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              {CORE_SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleNav('services')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {s.title.split('/')[0].trim()}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider">Legal</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onOpenLegal && onOpenLegal('privacy')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal && onOpenLegal('terms')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider">Facility & Contact</h5>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9232D] shrink-0 mt-1" />
                <span>{COMPANY_INFO.address.full}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D9232D] shrink-0 mt-1" />
                <div className="space-y-0.5">
                  <a href={`tel:${COMPANY_INFO.phones[0].raw}`} className="block text-white hover:underline">
                    {COMPANY_INFO.phones[0].number}
                  </a>
                  <a href={`tel:${COMPANY_INFO.phones[1].raw}`} className="block hover:underline">
                    {COMPANY_INFO.phones[1].number}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                <a href={`mailto:${COMPANY_INFO.emails[0].address}`} className="hover:underline">
                  {COMPANY_INFO.emails[0].address}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800 py-6 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-center sm:text-left">
            <span>© {currentYear} Johnny General Auto Car Maintenance & Assembly P.L.C. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <button
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="hover:text-slate-300 transition-colors underline underline-offset-2"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="hover:text-slate-300 transition-colors underline underline-offset-2"
            >
              Terms & Conditions
            </button>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="text-slate-400">
              Developed by <strong className="font-medium text-slate-300">Abel Berhanu</strong>: <span className="text-slate-300">+251 911 768 044</span>
            </span>
          </div>
          <p className="text-slate-500">Megenagna, Addis Ababa, Ethiopia</p>
        </div>
      </div>
    </footer>
  );
};

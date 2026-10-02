import React, { useState } from 'react';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { LocationMap } from './LocationMap';

interface ContactCTAProps {
  onOpenQuoteModal?: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Body Repair',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent(`Quote Request: ${formData.service} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${COMPANY_INFO.emails[0].address}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-20 sm:py-28 bg-white" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact (No Cards) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
                GET IN TOUCH.
              </h2>
              <p className="text-base sm:text-lg text-slate-500 font-normal">
                Reach our workshop directly or request a service estimate.
              </p>
            </div>

            {/* Typography-led Contact Info: No Cards, No Excessive Borders */}
            <div className="space-y-6 pt-2 border-t border-slate-200">
              {/* Phone */}
              <div className="flex items-start gap-4 pt-4">
                <Phone className="w-5 h-5 text-[#D9232D] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Phone
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-base font-semibold text-slate-900">
                    <a href="tel:+251116463573" className="hover:text-[#D9232D] transition-colors">
                      +251 116 463573
                    </a>
                    <a href="tel:+251930969696" className="hover:text-[#D9232D] transition-colors">
                      +251 930 969696
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <Mail className="w-5 h-5 text-[#D9232D] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email
                  </div>
                  <div className="text-base font-semibold text-slate-900">
                    <a href="mailto:info@johnnyautoplc.com" className="hover:text-[#D9232D] transition-colors">
                      info@johnnyautoplc.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <MapPin className="w-5 h-5 text-[#D9232D] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Location
                  </div>
                  <p className="text-base font-semibold text-slate-900">
                    Near Ethiopian Standards Authority, Megenagna, Addis Ababa
                  </p>
                  <a
                    href="https://maps.app.goo.gl/juHyzrm8Nv7XKWzdA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D9232D] hover:underline pt-0.5"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simple Form (No Floating Card Boxes) */}
          <div className="lg:col-span-6 lg:pl-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="cta-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Name
                </label>
                <input
                  id="cta-name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="cta-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone
                </label>
                <input
                  id="cta-phone"
                  type="tel"
                  required
                  placeholder="e.g. +251 9..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="cta-service" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Service
                </label>
                <select
                  id="cta-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-colors"
                >
                  <option value="Body Repair">Body Repair</option>
                  <option value="Mechanical Service">Mechanical Service</option>
                  <option value="Vehicle Diagnostics">Vehicle Diagnostics</option>
                  <option value="Automotive Painting">Automotive Painting</option>
                  <option value="Fiberglass">Fiberglass</option>
                  <option value="Complete Vehicle Care">Complete Vehicle Care</option>
                </select>
              </div>

              <div>
                <label htmlFor="cta-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Message
                </label>
                <textarea
                  id="cta-message"
                  rows={4}
                  placeholder="Describe your vehicle model, year, and service required..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0F2C59] transition-colors resize-none"
                />
              </div>

              {submitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-semibold">
                  Thank you. Opening your email client with your quote details...
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#D9232D] hover:bg-[#b81b24] text-white font-bold py-4 px-8 text-sm uppercase tracking-wider transition-colors shadow-sm"
                >
                  REQUEST A QUOTE
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Integrated Location Map */}
        <div className="mt-16 sm:mt-20">
          <LocationMap />
        </div>
      </div>
    </section>
  );
};

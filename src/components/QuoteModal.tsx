import React, { useState } from 'react';
import { X, Phone, Check, Copy } from 'lucide-react';
import { COMPANY_INFO, CORE_SERVICES } from '../data/companyData';
import { QuoteFormData } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    serviceCategory: preselectedService || 'Car Body Repair',
    preferredDate: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formattedSummary = `JOHNNY AUTO - SERVICE QUOTE REQUEST
Customer: ${formData.fullName || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Vehicle: ${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel}
Requested Service: ${formData.serviceCategory}
Preferred Date: ${formData.preferredDate || 'Earliest available'}
Details: ${formData.notes || 'No additional notes'}`;

  const handleMailto = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent(
      `Service Quote Request: ${formData.vehicleMake} ${formData.vehicleModel} (${formData.serviceCategory})`
    );
    const body = encodeURIComponent(formattedSummary);

    window.location.href = `mailto:${COMPANY_INFO.emails[0].address}?subject=${subject}&body=${body}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Request a Service Quote
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              Johnny General Auto Car Maintenance & Assembly P.L.C. • Megenagna
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Info Banner */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 text-xs text-slate-600 flex items-center justify-between">
          <span>Direct telephone dispatch:</span>
          <a
            href={`tel:${COMPANY_INFO.phones[0].raw}`}
            className="text-[#0F2C59] font-bold hover:underline flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#D9232D]" />
            <span>{COMPANY_INFO.phones[0].number}</span>
          </a>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold font-display text-slate-900">
              Inquiry Draft Prepared
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your default email client has been prompted to send this request to{' '}
              <span className="font-semibold text-slate-800">{COMPANY_INFO.emails[0].address}</span>.
            </p>

            <div className="bg-slate-50 border border-slate-200 p-4 text-left text-xs font-mono text-slate-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
              {formattedSummary}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy Details'}</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#0F2C59] hover:bg-[#0A1E3D] text-white text-xs font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleMailto} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Almaz Bekele"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+251 9..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Service Category
                </label>
                <select
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                >
                  {CORE_SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Vehicle Make
                </label>
                <input
                  type="text"
                  name="vehicleMake"
                  value={formData.vehicleMake}
                  onChange={handleChange}
                  placeholder="Toyota, Ford, etc."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  placeholder="Hilux, Corolla, etc."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  name="vehicleYear"
                  value={formData.vehicleYear}
                  onChange={handleChange}
                  placeholder="2020"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Description of Work or Damage
              </label>
              <textarea
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Details of required collision repair, mechanical problem, or regular servicing..."
                className="w-full bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0F2C59] hover:bg-[#0A1E3D] text-white text-xs font-semibold px-6 py-2.5 transition-colors"
              >
                Submit Quote Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

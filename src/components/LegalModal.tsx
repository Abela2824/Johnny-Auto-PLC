import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export type LegalDocType = 'privacy' | 'terms';

interface LegalModalProps {
  isOpen: boolean;
  type: LegalDocType | null;
  onClose: () => void;
  onSwitchType?: (type: LegalDocType) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  type,
  onClose,
  onSwitchType,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[85vh] bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0A192F] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 flex items-center justify-center text-[#D9232D]">
              {isPrivacy ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {COMPANY_INFO.legalName}
              </div>
              <h2 id="legal-modal-title" className="text-lg sm:text-xl font-display font-bold text-white">
                {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions of Service'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 transition-colors"
            aria-label="Close legal notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider shrink-0">
          <button
            onClick={() => onSwitchType && onSwitchType('privacy')}
            className={`flex-1 py-3 px-4 text-center transition-colors border-b-2 ${
              isPrivacy
                ? 'border-[#D9232D] text-[#0F2C59] bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onSwitchType && onSwitchType('terms')}
            className={`flex-1 py-3 px-4 text-center transition-colors border-b-2 ${
              !isPrivacy
                ? 'border-[#D9232D] text-[#0F2C59] bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Terms & Conditions
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="text-xs text-slate-500 font-medium">
            Effective Date: September 2026 • Governing Law: Federal Democratic Republic of Ethiopia
          </div>

          {isPrivacy ? (
            /* PRIVACY POLICY CONTENT */
            <>
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#0F2C59]">1. Commitment to Customer Privacy</h3>
                <p>
                  Johnny General Auto Car Maintenance & Assembly P.L.C. (“Johnny Auto”, “we”, “our”, or “us”)
                  is committed to safeguarding the privacy and personal information of our clients, fleet managers,
                  and website visitors. This policy outlines how information gathered through our website, quote forms,
                  and workshop intake systems is collected, handled, and protected.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#0F2C59]">2. Information We Collect</h3>
                <p>We only collect information directly relevant to providing automotive services, including:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Contact Details:</strong> Full name, telephone number, and email address.</li>
                  <li><strong>Vehicle Identification:</strong> Vehicle make, model, year, license plate, VIN, and reported mechanical or body symptoms.</li>
                  <li><strong>Service History:</strong> Diagnostic scan records, parts replacement logs, and maintenance invoices.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#0F2C59]">3. Purpose of Data Use</h3>
                <p>Your details are used strictly for legitimate automotive business operations:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Generating accurate cost estimates and formal quotation proposals.</li>
                  <li>Scheduling intake bay availability and technician assignments in Megenagna.</li>
                  <li>Providing real-time maintenance updates and job completion alerts.</li>
                  <li>Maintaining warranty records for past repairs, paint booth finishes, and installed components.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#0F2C59]">4. Non-Disclosure & Data Security</h3>
                <p>
                  Johnny Auto does not sell, rent, trade, or disclose your personal contact or vehicle information to
                  external marketing brokers or third parties. Information is accessible only by authorized service
                  advisors, procurement staff, and technical supervisors. We maintain technical and administrative
                  safeguards to prevent unauthorized access or data disclosure.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#0F2C59]">5. Contact Regarding Your Data</h3>
                <p>
                  If you wish to review, update, or remove your vehicle records or contact details from our workshop
                  customer registry, you may reach our management desk at{' '}
                  <span className="font-semibold text-slate-900">{COMPANY_INFO.emails[0].address}</span> or call{' '}
                  <span className="font-semibold text-slate-900">{COMPANY_INFO.phones[0].number}</span>.
                </p>
              </section>
            </>
          ) : (
            /* TERMS & CONDITIONS CONTENT */
            <>
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#0F2C59]">1. Scope of Workshop Services</h3>
                <p>
                  These Terms and Conditions govern all vehicle repairs, body shop overhauls, computerized diagnostics,
                  and preventative maintenance performed by Johnny General Auto Car Maintenance & Assembly P.L.C.
                  at our Megenagna facility or authorized off-site recovery points.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#0F2C59]">2. Preliminary Quotes & In-Bay Diagnosis</h3>
                <p>
                  Estimates submitted via our online quote request forms or by phone are provisional based on owner-reported
                  symptoms. Final service pricing requires physical inspection on our workshop diagnostic bays. If hidden
                  internal mechanical wear or structural collision damage is discovered upon disassembly, our service advisors
                  will provide an updated supplementary estimate for customer authorization prior to proceeding.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#0F2C59]">3. Parts Sourcing & Workmanship Warranty</h3>
                <div className="space-y-2 text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0F2C59] shrink-0 mt-0.5" />
                    <span><strong>Genuine & Certified Components:</strong> All replacement components procured through Johnny Auto adhere to international automotive tolerances and manufacturer standards.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0F2C59] shrink-0 mt-0.5" />
                    <span><strong>Paint Booth Workmanship:</strong> Finishes executed in our Italian Nova Verta down-draft spray booth are backed by our shop warranty against peeling, cracking, or clear-coat fading under normal operation.</span>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#0F2C59]">4. Vehicle Intake, Test Drives & Storage</h3>
                <p>
                  By delivering a vehicle to Johnny Auto, the owner authorizes our licensed technicians to operate the
                  vehicle on public roads for diagnostic validation, engine tuning verification, and post-repair quality assurance.
                  Owners are advised to remove personal valuables from the passenger cabin prior to intake. Completed vehicles
                  must be collected within five (5) business days of official completion notice unless prior written storage
                  agreements have been made.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#0F2C59]">5. Payment Terms & Release of Vehicles</h3>
                <p>
                  Payment for completed repairs and replacement components must be fulfilled upon vehicle handover unless
                  covered by a formal corporate fleet contract or approved insurance voucher. Vehicle release is conditioned
                  on payment settlement.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#0F2C59]">6. Governing Law & Jurisdiction</h3>
                <p>
                  Any disputes arising from repair contracts or services rendered shall be governed in accordance with the
                  commercial and civil laws of the Federal Democratic Republic of Ethiopia.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Johnny General Auto Car Maintenance & Assembly P.L.C.
          </span>
          <button
            onClick={onClose}
            className="bg-[#0F2C59] hover:bg-[#0A1E3D] text-white px-5 py-2 text-xs font-semibold tracking-wide uppercase transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

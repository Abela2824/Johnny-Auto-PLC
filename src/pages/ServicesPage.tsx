import React from 'react';
import { PageId } from '../types';
import { CORE_SERVICES, COMPANY_INFO } from '../data/companyData';
import { ArrowRight, Check } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: (serviceTitle?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenQuote,
}) => {
  const workflowSteps = [
    {
      num: '01',
      title: 'Intake & Condition Assessment',
      desc: 'Detailed vehicle examination, customer discussion of symptoms, and photographic documentation of incoming condition.',
    },
    {
      num: '02',
      title: 'Computer Diagnostics & Measurement',
      desc: 'ECU scanner interrogation, physical component testing, and structural geometry verification using precision tooling.',
    },
    {
      num: '03',
      title: 'Transparent Scope & Work Order',
      desc: 'Clear itemized breakdown of recommended repairs, genuine replacement parts, and estimated completion timeline.',
    },
    {
      num: '04',
      title: 'Precision Execution & Quality Handover',
      desc: 'Repairs performed by specialized technicians, followed by road-testing, safety verification, and detailed customer handover.',
    },
  ];

  return (
    <div className="bg-white text-slate-900">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#D9232D] font-bold">
              Engineering Capabilities
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight">
              Automotive Services
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed pt-1">
              Comprehensive mechanical servicing, collision body repair, Italian Nova Verta painting, and computerized diagnostics in Megenagna, Addis Ababa.
            </p>
          </div>
        </div>
      </section>

      {/* Services List - Editorial Alternating Blocks */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-24">
          {CORE_SERVICES.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={service.id}
                id={service.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-12 first:pt-0 border-t border-slate-200 first:border-t-0"
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="border border-slate-200 bg-slate-100 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[380px] sm:h-[440px] object-cover"
                    />
                    <div className="p-3.5 bg-slate-900 text-white text-xs flex items-center justify-between">
                      <span className="font-semibold">{service.title}</span>
                      <span className="text-slate-400">Johnny Auto Workshop</span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
                      0{index + 1} • Technical Discipline
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mt-1">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-base text-slate-600 leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* Capabilities List */}
                  <div className="space-y-2.5 pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Service Scope & Capabilities:
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {service.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#D9232D] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Equipment Note */}
                  {service.equipmentOrMethod && (
                    <div className="p-4 bg-slate-50 border-l-2 border-[#0F2C59] text-xs text-slate-700">
                      <span className="font-bold text-slate-900">Equipment / Methodology: </span>
                      <span>{service.equipmentOrMethod}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => onOpenQuote(service.title)}
                      className="inline-flex items-center gap-2 bg-[#0F2C59] hover:bg-[#0A1E3D] text-white text-sm font-semibold px-6 py-3 transition-colors"
                    >
                      <span>Request Quote for this Service</span>
                      <ArrowRight className="w-4 h-4 text-[#D9232D]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Service Workflow Section */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
              Quality Assurance
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-1">
              Service Intake & Quality Workflow
            </h2>
            <p className="text-base text-slate-600 mt-3">
              Every vehicle serviced at Johnny Auto follows our structured four-stage quality assurance protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step) => (
              <div key={step.num} className="space-y-3">
                <div className="text-3xl font-display font-extrabold text-[#D9232D]">
                  {step.num}
                </div>
                <h3 className="text-lg font-display font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Contact Prompt */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-200 p-8 sm:p-12">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-slate-900">
              Need a Custom Assessment or Fleet Consultation?
            </h3>
            <p className="text-slate-600 text-sm max-w-xl">
              Bring your vehicle to our Megenagna facility or contact our workshop advisors directly for commercial fleet rates and prioritized scheduling.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="border border-slate-300 hover:border-slate-400 text-slate-800 px-6 py-3 text-sm font-semibold transition-colors"
            >
              Contact Advisors
            </button>
            <button
              onClick={() => onOpenQuote()}
              className="bg-[#0F2C59] hover:bg-[#0A1E3D] text-white px-6 py-3 text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 text-[#D9232D]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

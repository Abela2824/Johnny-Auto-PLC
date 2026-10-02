import React, { useState } from 'react';
import { COMPANY_INFO, CORE_SERVICES } from '../data/companyData';
import { Phone, Mail, MapPin, Clock, ArrowRight, Check, ExternalLink } from 'lucide-react';
import { LocationMap } from '../components/LocationMap';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Car Body Repair',
    vehicle: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent(`Inquiry from ${formData.name}: ${formData.service}`);
    const body = encodeURIComponent(
      `JOHNNY AUTO WORKSHOP INQUIRY\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email || 'Not provided'}\n` +
      `Vehicle: ${formData.vehicle || 'Not provided'}\n` +
      `Service: ${formData.service}\n\n` +
      `Details:\n${formData.message}`
    );

    window.location.href = `mailto:${COMPANY_INFO.emails[0].address}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white text-slate-900">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#D9232D] font-bold">
              Communication & Intake
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight">
              Contact Johnny Auto
            </h1>
            <p className="text-lg text-slate-300 font-normal">
              Reach our workshop directly or visit our facility in Megenagna, Addis Ababa.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
                  Workshop Intake
                </p>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mt-1">
                  Megenagna Facility
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
                  Located near the Ethiopian Standards Authority with service intake bays for private and commercial vehicles.
                </p>
              </div>

              <div className="space-y-5 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#D9232D] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Physical Address</div>
                    <div className="text-slate-600">{COMPANY_INFO.address.full}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Near the Ethiopian Standards Authority</div>
                    <a
                      href="https://maps.app.goo.gl/juHyzrm8Nv7XKWzdA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D9232D] hover:underline pt-1.5"
                    >
                      <span>Open in Google Maps (9.0107° N, 38.8080° E)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#D9232D] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Telephone Lines</div>
                    <div className="space-y-0.5 text-slate-600">
                      <div>Main Office: <a href={`tel:${COMPANY_INFO.phones[0].raw}`} className="font-semibold text-slate-900 hover:underline">{COMPANY_INFO.phones[0].number}</a></div>
                      <div>Direct Line: <a href={`tel:${COMPANY_INFO.phones[1].raw}`} className="font-semibold text-slate-900 hover:underline">{COMPANY_INFO.phones[1].number}</a></div>
                      <div>Emergency / Towing: <a href={`tel:${COMPANY_INFO.phones[2].raw}`} className="font-semibold text-slate-900 hover:underline">{COMPANY_INFO.phones[2].number}</a></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Email Addresses</div>
                    <div className="space-y-0.5 text-slate-600">
                      <div><a href={`mailto:${COMPANY_INFO.emails[0].address}`} className="hover:underline">{COMPANY_INFO.emails[0].address}</a></div>
                      <div><a href={`mailto:${COMPANY_INFO.emails[1].address}`} className="hover:underline">{COMPANY_INFO.emails[1].address}</a></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Working Hours</div>
                    <div className="space-y-0.5 text-slate-600">
                      <div>Monday – Friday: 8:00 AM – 6:00 PM</div>
                      <div>Saturday: 8:00 AM – 4:30 PM</div>
                      <div className="text-xs text-slate-500">Sunday: Emergency towing and urgent intake by appointment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Clean Practical Form */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-8 sm:p-10">
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-6">
                Send a Workshop Inquiry
              </h3>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 text-emerald-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-base">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>Inquiry Ready to Dispatch</span>
                  </div>
                  <p className="text-sm text-emerald-800">
                    Your email client has been prepared with your vehicle inquiry. Our workshop team in Megenagna will review your specifications and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dawit Haile"
                        className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+251 9..."
                        className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Service Category
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                      >
                        {CORE_SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Vehicle Details (Make, Model, Year)
                    </label>
                    <input
                      type="text"
                      value={formData.vehicle}
                      onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                      placeholder="e.g. Toyota Land Cruiser 2019 or Hyundai Elantra"
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Message & Description of Problem
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe symptoms, collision damage, or required maintenance..."
                      className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0F2C59] hover:bg-[#0A1E3D] text-white text-sm font-semibold px-7 py-3 transition-colors flex items-center gap-2"
                  >
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-4 h-4 text-[#D9232D]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Location Map */}
      <section className="border-t border-slate-200">
        <LocationMap />
      </section>
    </div>
  );
};

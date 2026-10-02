import React from 'react';
import { MapPin, ExternalLink, Navigation, Phone, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface LocationMapProps {
  className?: string;
  showDetails?: boolean;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  className = '',
  showDetails = true,
}) => {
  const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/juHyzrm8Nv7XKWzdA';
  const LAT = 9.0106797;
  const LNG = 38.8079834;
  const BBOX = `${LNG - 0.007},${LAT - 0.0045},${LNG + 0.007},${LAT + 0.0045}`;
  const EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${LAT}%2C${LNG}`;

  return (
    <div className={`w-full overflow-hidden bg-slate-900 ${className}`}>
      {showDetails && (
        <div className="bg-[#0A192F] text-white py-4 px-4 sm:px-6 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-[#D9232D] shrink-0" />
              <span className="font-semibold text-white">Megenagna Workshop</span>
              <span className="text-slate-500">•</span>
              <span>Addis Ababa (9.0107° N, 38.8080° E)</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#D9232D] hover:bg-[#b81b24] text-white font-bold text-xs uppercase tracking-wider px-4 py-2 transition-colors"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 transition-colors border border-slate-700"
              >
                <span>DIRECTIONS</span>
                <Navigation className="w-3.5 h-3.5 text-slate-300" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Map Display Frame */}
      <div className="relative w-full h-[400px] sm:h-[480px] bg-slate-100">
        <iframe
          title="Johnny General Auto Car Maintenance & Assembly Location"
          src={EMBED_URL}
          className="w-full h-full border-0"
          loading="lazy"
        />

        {/* Floating Quick Navigation Anchor on Map */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-slate-300 p-3 shadow-md flex items-center gap-3 text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D9232D] animate-pulse" />
          <span className="font-semibold text-slate-900">
            Johnny Auto Facility (9.0107° N, 38.8080° E)
          </span>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#0F2C59] hover:text-[#D9232D] flex items-center gap-1 pl-2 border-l border-slate-200"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

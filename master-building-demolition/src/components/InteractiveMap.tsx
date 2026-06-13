import React, { useState } from 'react';
import { MapPin, ShieldCheck, HeartCrack, ClipboardCheck, ArrowUpRight, Check, Hammer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectLocation {
  id: string;
  name: string;
  neighborhood: string;
  coordinates: string;
  type: string;
  area: string;
  duration: string;
  scrapOffset: string;
  status: 'Completed Safely' | 'Active Dismantling' | 'Site Handed Over';
  embedUrl: string;
}

const PROJECT_LOCATIONS: ProjectLocation[] = [
  {
    id: 'loc-jayanagar',
    name: 'Ancestral Duplex Villa Demolition',
    neighborhood: 'Jayanagar 4th Block, Bangalore',
    coordinates: '12.9304° N, 77.5815° E',
    type: 'Old Residential Building Demolition',
    area: '4,800 Sq.Ft',
    duration: '6 Days',
    scrapOffset: '₹2.8 Lakh Discounted',
    status: 'Site Handed Over',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.43799650207!2d77.58156172551465!3d12.930491030739922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae159045dbdd6d%3A0xc6cb51b22e1189c4!2sJayanagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714000000000'
  },
  {
    id: 'loc-whitefield',
    name: 'Commercial G+4 Retail Block',
    neighborhood: 'Whitefield Corridor, Bangalore East',
    coordinates: '12.9698° N, 77.7499° E',
    type: 'Reinforced Concrete (RCC) Demolition',
    area: '32,500 Sq.Ft',
    duration: '14 Days',
    scrapOffset: '₹14.5 Lakh Discounted',
    status: 'Completed Safely',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15552.2612345!2d77.72898!3d12.9698196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11a681878bA%3A0x6bba3bcff4eae3ec!2sWhitefield%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714000000000'
  },
  {
    id: 'loc-ecity',
    name: 'Industrial Manufacturing Shed',
    neighborhood: 'Electronic City Phase 1, Bangalore',
    coordinates: '12.8465° N, 77.6593° E',
    type: 'Heavy Steel-Truss & Base Clearance',
    area: '24,000 Sq.Ft',
    duration: '9 Days',
    scrapOffset: '₹9.2 Lakh Discounted',
    status: 'Completed Safely',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15558.111929944634!2d77.659346!3d12.846548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6c88f9a1f2!2sElectronic%20City%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714000000000'
  },
  {
    id: 'loc-indiranagar',
    name: 'Premium Boutique Office Strip-out',
    neighborhood: '100ft Road, Indiranagar, Bangalore East',
    coordinates: '12.9784° N, 77.6408° E',
    type: 'Interior Controlled Demolition',
    area: '11,200 Sq.Ft',
    duration: '5 Days',
    scrapOffset: '₹1.5 Lakh Discounted',
    status: 'Completed Safely',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.493922880053!2d77.6322!3d12.9784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a6da!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714000000000'
  },
  {
    id: 'loc-hebbal',
    name: 'G+3 Residential Apartment Unit',
    neighborhood: 'Hebbal Near Flyover, Bangalore North',
    coordinates: '13.0354° N, 77.5981° E',
    type: 'High-Reach Hydraulic Breaker Works',
    area: '18,500 Sq.Ft',
    duration: '8 Days',
    scrapOffset: '₹6.4 Lakh Discounted',
    status: 'Active Dismantling',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.4386915151523!2d77.5896!3d13.0354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17bea284e377%3A0x7d013f9c65ebf68e!2sHebbal%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714000000000'
  },
  {
    id: 'loc-koramangala',
    name: 'Old Weathered Penthouse Duplex',
    neighborhood: 'Koramangala 3rd Block, Bangalore South',
    coordinates: '12.9352° N, 77.6241° E',
    type: 'Manual Roof Dismantling & Shared Wall Safety',
    area: '3,200 Sq.Ft',
    duration: '4 Days',
    scrapOffset: '₹2.1 Lakh Discounted',
    status: 'Site Handed Over',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15553.86475306354!2d77.6241!3d12.9352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144e3e3e3e3b%3A0x27f2df4754f24efd!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714000000000'
  }
];

export default function InteractiveMap() {
  const [activeLocId, setActiveLocId] = useState<string>(PROJECT_LOCATIONS[0].id);

  const selectedLoc = PROJECT_LOCATIONS.find(l => l.id === activeLocId) || PROJECT_LOCATIONS[0];

  return (
    <div className="bg-zinc-900/90 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden text-left" id="interactive-map-dashboard">
      <div className="p-5 md:p-6 bg-black border-b border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold bg-brand-red text-black py-0.5 px-2 rounded uppercase tracking-wider inline-block mb-1.5">
            100% Live Site Tracking
          </span>
          <h4 className="text-lg md:text-xl font-display font-black text-white uppercase tracking-tight">
            Interactive Project Registry & Map
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            Click on any project below to view live municipal coordinates, safety status, scrap rebates, and dynamic Google Map locations.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs self-stretch md:self-auto justify-center">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
          <span className="font-mono text-zinc-300 font-bold uppercase tracking-wider text-[10px]">6 Tracks Live in BBMP</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Hand: Selector List (6 Locations) */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-zinc-800 p-4 max-h-[360px] overflow-y-auto space-y-2 ::-webkit-scrollbar">
          {PROJECT_LOCATIONS.map((loc) => {
            const isActive = loc.id === activeLocId;
            return (
              <button
                key={loc.id}
                onClick={() => setActiveLocId(loc.id)}
                className={`w-full p-3 rounded-xl transition duration-150 text-left border flex flex-col gap-1.5 cursor-pointer outline-none focus:ring-1 focus:ring-brand-red ${
                  isActive
                    ? 'bg-brand-red/10 border-brand-red text-white shadow-lg'
                    : 'bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:bg-zinc-955 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <div className="flex justify-between items-start gap-1 w-full">
                  <span className="font-display font-bold text-xs uppercase tracking-tight text-white leading-tight">
                    {loc.name}
                  </span>
                  <span className={`text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded shrink-0 ${
                    loc.status === 'Completed Safely' ? 'bg-emerald-500/10 text-emerald-400' :
                    loc.status === 'Active Dismantling' ? 'bg-[#E5A913]/10 text-[#E5A913]' :
                    'bg-sky-500/10 text-sky-400'
                  }`}>
                    {loc.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-zinc-500 leading-none">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-brand-red shrink-0" />
                    <span>{loc.neighborhood}</span>
                  </span>
                  <span className="font-mono">{loc.area}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Hand / Map Detail Screen */}
        <div className="lg:col-span-7 bg-zinc-950 p-4 flex flex-col justify-between gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-[10px] font-mono">
            <div className="bg-zinc-900 border border-zinc-850 p-2 rounded-lg text-center">
              <span className="block text-zinc-500 uppercase tracking-widest font-bold text-[8px] mb-0.5">EST. TIMELINE</span>
              <span className="font-extrabold text-white text-xs">{selectedLoc.duration}</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-850 p-2 rounded-lg text-center">
              <span className="block text-zinc-500 uppercase tracking-widest font-bold text-[8px] mb-0.5">REBAR VALUE REBATE</span>
              <span className="font-extrabold text-emerald-400 text-xs">{selectedLoc.scrapOffset}</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-850 p-2 rounded-lg text-center">
              <span className="block text-zinc-500 uppercase tracking-widest font-bold text-[8px] mb-0.5">MUNICIPAL GPS CODE</span>
              <span className="font-extrabold text-amber-500 text-[10.5px] tracking-tighter leading-none">{selectedLoc.coordinates}</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-850 p-2 rounded-lg text-center flex flex-col justify-center">
              <span className="block text-zinc-500 uppercase tracking-widest font-bold text-[8px] mb-0.5">BBMP PERMIT</span>
              <span className="font-sans font-extrabold text-[#E5A913] text-[9px] uppercase tracking-wide">✓ APPROVED & SEALED</span>
            </div>
          </div>

          {/* Interactive Responsive Iframe container with smooth update animation */}
          <div className="rounded-xl overflow-hidden border border-zinc-800/80 h-44 sm:h-52 bg-zinc-900 relative shadow-inner">
            <AnimatePresence mode="wait">
              <motion.iframe
                key={selectedLoc.id}
                src={selectedLoc.embedUrl}
                className="w-full h-full border-0 grayscale opacity-80"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>
            <div className="absolute top-2 right-2 bg-black/85 px-2.5 py-1 rounded border border-zinc-850 text-[10px] text-zinc-300 pointer-events-none flex items-center gap-1.5 font-mono">
              <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
              <span>{selectedLoc.neighborhood}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-905 bg-zinc-900/40 p-3 rounded-xl border border-zinc-850 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-zinc-300 font-sans text-[11px] leading-tight">
                This BBMP case study file includes neighbor damage insurance and vibration safety certificate parameters.
              </p>
            </div>
            <button 
              onClick={() => {
                const element = document.getElementById('lead-form-anchor');
                if (element) {
                  const locationField = document.querySelector('input[placeholder="Locality e.g. Banashankari"]') as HTMLInputElement;
                  if (locationField) locationField.value = selectedLoc.neighborhood;
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-4 py-2 bg-brand-red text-black font-extrabold font-sans rounded text-[11px] uppercase tracking-wider shrink-0 transition shadow-md hover:bg-brand-red-dark active:scale-95"
            >
              Book Near This Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InteractiveFooterMap() {
  const [region, setRegion] = useState<'South' | 'East' | 'North'>('South');
  
  const regionConfig = {
    South: {
      embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.43799650207!2d77.58156172551465!3d12.930491030739922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae159045dbdd6d%3A0xc6cb51b22e1189c4!2sJayanagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714000000000',
      label: 'South Region Hub (Jayanagar)'
    },
    East: {
      embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31105.789115715965!2d77.72898!3d12.9698196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11a8b3f49ca5%3A0x1efd8481eb0bbb8c!2sWhitefield%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714000000000',
      label: 'East Region Hub (Whitefield)'
    },
    North: {
      embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.4386915151523!2d77.5896!3d13.0354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17bea284e377%3A0x7d013f9c65ebf68e!2sHebbal%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714000000000',
      label: 'North Region Hub (Hebbal)'
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-1 bg-zinc-950 font-sans">
      <div className="flex gap-1 mb-1 shrink-0 p-1">
        {(['South', 'East', 'North'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setRegion(tab)}
            className={`flex-1 py-1 text-[9px] font-mono font-bold uppercase rounded transition cursor-pointer ${
              region === tab 
                ? 'bg-[#E5A913] text-black font-extrabold' 
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-1 relative rounded overflow-hidden">
        <iframe
          src={regionConfig[region].embed}
          className="w-full h-full border-0 grayscale opacity-60 hover:opacity-100 transition-opacity duration-200"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-1 left-1.5 bg-black/85 px-1.5 py-0.5 rounded text-[8px] font-semibold text-zinc-300 font-mono pointer-events-none">
          {regionConfig[region].label}
        </div>
        <a 
          href="https://share.google/Hj0twKqUfYul6Hyzz" 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute top-1 right-1 px-2 py-1 bg-[#E5A913] hover:bg-white text-black text-[8px] font-mono font-black uppercase tracking-wider rounded transition-all duration-200 shadow-lg flex items-center gap-1 cursor-pointer"
        >
          <span>HQ MAP ↗</span>
        </a>
      </div>
    </div>
  );
}

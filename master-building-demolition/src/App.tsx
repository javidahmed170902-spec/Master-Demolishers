import React, { useState, useEffect } from 'react';
import { 
  Phone, Calendar, ShieldCheck, Zap, MessageSquare, MapPin, 
  Clock, Award, ThumbsUp, HardHat, FileCheck, Hammer, 
  HelpCircle, ChevronRight, CheckCircle2, User, Mail, 
  MessageSquareText, Search, ClipboardList, RefreshCw, BarChart2, Star, ChevronDown, ChevronUp, Check, Play, PlayIcon, Info, ChevronLeft,
  Menu, X,
  Home, Building2, Wrench, Factory, Maximize2, Scissors, Trees, Truck, Shovel
} from 'lucide-react';
import { SERVICES, PROCESS_STEPS, BY_CHOOSE_ITEMS, TESTIMONIALS, SERVICE_LOCATIONS } from './data';
import { IMAGES } from './assets';
import { Lead } from './types';
import ProjectGallery from './components/ProjectGallery';
import InteractiveMap, { InteractiveFooterMap } from './components/InteractiveMap';
import LeadBoard from './components/LeadBoard';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './components/Logo';
import CountUp from './components/CountUp';

// Live toast notification list to simulate social proof
const SOCIAL_PROOF_TOASTS = [
  { name: "Vinay Gowda", location: "Banashankari", action: "requested Free Site Inspection for old house", time: "just now" },
  { name: "Aditya Builders", location: "Whitefield", action: "submitted quote request for commercial demolition", time: "4 mins ago" },
  { name: "Muralidharan", location: "Jayanagar", action: "called to evaluate structural wood buyback credit", time: "12 mins ago" },
  { name: "D’Souza", location: "HSR Layout", action: "booked foundation debris carting load", time: "25 mins ago" },
  { name: "Pranesh K.", location: "Hebbal", action: "arranged G+2 concrete footprint breaker assessment", time: "45 mins ago" }
];

function getServiceIcon(iconName: string) {
  switch (iconName) {
    case 'Home': return <Home className="w-5 h-5 text-brand-red" />;
    case 'Building2': return <Building2 className="w-5 h-5 text-brand-red" />;
    case 'Wrench': return <Wrench className="w-5 h-5 text-brand-red" />;
    case 'Factory': return <Factory className="w-5 h-5 text-brand-red" />;
    case 'Maximize2': return <Maximize2 className="w-5 h-5 text-brand-red" />;
    case 'Scissors': return <Scissors className="w-5 h-5 text-brand-red" />;
    case 'Hammer': return <Hammer className="w-5 h-5 text-brand-red" />;
    case 'Trees': return <Trees className="w-5 h-5 text-brand-red" />;
    case 'Truck': return <Truck className="w-5 h-5 text-brand-red" />;
    case 'Shovel': return <Shovel className="w-5 h-5 text-brand-red" />;
    default: return <Hammer className="w-5 h-5 text-brand-red" />;
  }
}

function getSEOData(section: 'hero' | 'services' | 'why-choose' | 'locations' | 'lead-form') {
  switch (section) {
    case 'services':
      return {
        title: "Certified Demolition & Excavation Services Bengaluru | Best Rates",
        description: "Specialized building demolition services for residential houses, old buildings, apartments, commercial hubs, concrete breaking, and site clearing across Bangalore. Licensed BBMP compliance.",
        keywords: "residential house demolition bangalore, concrete breaking bangalore, industrial dismantling, old house dismantling"
      };
    case 'why-choose':
      return {
        title: "Redesigning Bangalore's Land Canvas with Safety | Since 2011",
        description: "Why choose Master Demolition? Over 500+ successful projects, ₹2 Crore General Liability shield, modern machinery, and 100% flawless safety controls. Get free site estimation.",
        keywords: "best demolition contractors bangalore, demolition safety, scrap price rebate bangalore"
      };
    case 'locations':
      return {
        title: "Demolition Contractors near BTM Layout, Jayanagar & Bengaluru Areas",
        description: "Active structural clearance and demolition teams operating in BTM Layout, Jayanagar, Indiranagar, Electronic City, Hebbal, Whitefield and all major Bangalore neighborhoods.",
        keywords: "demolition contractor btm layout, demolition contractor jayanagar, bangalore demolition contractors"
      };
    case 'lead-form':
      return {
        title: "Get a Demolition Quote Instantly | Master Demolition Bangalore",
        description: "Request a free site inspection & structural dismantling estimate. Submit our quick form or message on WhatsApp 90193 24061 for the best scrap value projection.",
        keywords: "demolition cost calculator bangalore, structural dismantling quotation"
      };
    case 'hero':
    default:
      return {
        title: "Bangalore's Trusted & Best Building Demolition Contractors",
        description: "As Bangalore's Trusted and Best Building Demolition Contractors, we specialize in safe residential, commercial and industrial structural dismantling with maximum scrap credit returns. Approved BBMP guidelines.",
        keywords: "building demolition contractors bangalore, best building demolition bangalore, house demolition bangalore, building demolition jayanagar"
      };
  }
}

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<'home' | 'leads'>('home');
  const [activeMetaSection, setActiveMetaSection] = useState<'hero' | 'services' | 'why-choose' | 'locations' | 'lead-form'>('hero');
  const [totalLeads, setTotalLeads] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Lead Submission Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Residential Building Demolition');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [whatsappTemplateUrl, setWhatsappTemplateUrl] = useState('');

  // Search filter for service selector
  const [locationHighlightMsg, setLocationHighlightMsg] = useState('');

  // Active service capability showcase state
  const [activeServiceId, setActiveServiceId] = useState<string | null>('res-demo');

  // Testimonial Carousel State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Back to Top button visibility state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Desktop conversion modal triggers
  const [showDesktopCallModal, setShowDesktopCallModal] = useState(false);
  const [showDesktopWhatsappModal, setShowDesktopWhatsappModal] = useState(false);
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false);

  // Intercept handlers for desktop users to show custom interactive modal
  const handlePhoneClick = (e: React.MouseEvent) => {
    if (window.innerWidth >= 1024) {
      e.preventDefault();
      setShowDesktopCallModal(true);
    }
  };

  const handleWhatsappClick = (e: React.MouseEvent) => {
    if (window.innerWidth >= 1024) {
      e.preventDefault();
      setShowDesktopWhatsappModal(true);
    }
  };

  // Monitor scroll height to show/hide Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto scroll testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // IntersectionObserver to dynamically adjust the document's SEO head properties based on current viewing section
  useEffect(() => {
    const sectionIds = ['top-hero', 'services-anchor', 'why-choose-anchor', 'locations-anchor', 'lead-form-anchor'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -45% 0px', // focused center viewport trigger
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'top-hero') setActiveMetaSection('hero');
          else if (id === 'services-anchor') setActiveMetaSection('services');
          else if (id === 'why-choose-anchor') setActiveMetaSection('why-choose');
          else if (id === 'locations-anchor') setActiveMetaSection('locations');
          else if (id === 'lead-form-anchor') setActiveMetaSection('lead-form');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Add brief timeout to allow initial rendering of all DOM sections
    const timer = setTimeout(() => {
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // SEO Schema Injection
  useEffect(() => {
    // 1. Inject JSON-LD Schema on mount
    const schemaMarkup = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Master Building Demolition Contractors Bangalore",
      "image": location.origin + IMAGES.hero,
      "telephone": "+919019324061",
      "url": "https://masterbuildingdemolitioncontractorsbangalore.com",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "520, BTM 2nd Stage, Kuvempu Nagar, jayanagar, BTM Layout",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560076",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "12.9152",
        "longitude": "77.6041"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "07:00",
        "closes": "21:00"
      },
      "areaServed": [
        "Indiranagar", "Whitefield", "Jayanagar", "Electronic City", "Hebbal", 
        "Yelahanka", "KR Puram", "Marathahalli", "HSR Layout", "Koramangala"
      ]
    };

    const scriptId = "master-demo-seo-schema";
    let existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.innerText = JSON.stringify(schemaMarkup);
      document.body.appendChild(script);
    }
  }, []);

  // Synchronous document head updates for bulletproof SEO
  useEffect(() => {
    const data = getSEOData(activeMetaSection);
    document.title = data.title;
    
    // Find or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', data.description);

    // Find or create meta keywords
    let metaKey = document.querySelector('meta[name="keywords"]');
    if (!metaKey) {
      metaKey = document.createElement('meta');
      metaKey.setAttribute('name', 'keywords');
      document.head.appendChild(metaKey);
    }
    metaKey.setAttribute('content', data.keywords);
  }, [activeMetaSection]);

  const handleServiceInquirySelect = (serviceTitle: string) => {
    setType(serviceTitle);
    const formSection = document.getElementById('lead-form-anchor');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLocationClick = (locName: string, locDesc: string) => {
    setLocation(locName);
    setLocationHighlightMsg(`⚡ Near ${locName}! Our regional supervisor can schedule your structural inspection within 2 hours today.`);
    const formSection = document.getElementById('lead-form-anchor');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !location) {
      alert("Please provide at least Name, Phone Number, and Site Location.");
      return;
    }

    setIsSubmitting(true);

    const message = `Hello Master Building Demolition Contractors,\n\nI would like to request a demolition quote:\n\n• *Name*: ${name}\n• *Mobile*: ${phone}\n• *Email*: ${email || 'Not provided'}\n• *Location*: ${location}\n• *Category*: ${type}\n• *Details*: ${details || 'None'}`;
    const whatsappUrl = `https://wa.me/919019324061?text=${encodeURIComponent(message)}`;
    setWhatsappTemplateUrl(whatsappUrl);

    setTimeout(() => {
      const newLead: Lead = {
        id: 'user-' + Date.now(),
        name,
        phone,
        email: email || 'not-supplied@gmail.com',
        location,
        demolitionType: type,
        details: details || `Requested quote for ${type} in ${location}, Bangalore. No additional details supplied.`,
        timestamp: new Date().toISOString(),
        status: 'pending',
        source: 'Website Submission'
      };

      // Retrieve existing
      const existing = localStorage.getItem('demolition_leads');
      let parsed: Lead[] = [];
      if (existing) {
        try {
          parsed = JSON.parse(existing);
        } catch (e) {
          parsed = [];
        }
      }
      const updated = [newLead, ...parsed];
      localStorage.setItem('demolition_leads', JSON.stringify(updated));
      setTotalLeads(updated.length);

      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Auto open dynamic WhatsApp redirection on submit
      window.open(whatsappUrl, '_blank');
      
      // Clear inputs
      setName('');
      setPhone('');
      setEmail('');
      setDetails('');
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-zinc-50 tracking-normal antialiased overflow-x-hidden">
      {/* URGENT SERVICE MARQUEE TICKER BAR */}
      <div className="w-full bg-[#111111] text-white py-2 text-[10px] md:text-xs font-semibold uppercase tracking-wider border-b border-zinc-800 relative z-50 select-none overflow-hidden h-9 flex items-center">
        <div className="animate-marquee flex items-center shrink-0">
          <span className="flex items-center gap-2 text-brand-red">⚡ Site Visit in Bangalore within 29 Minutes | 100% Safety & Compliance Focused ⚡</span>
          <span className="flex items-center gap-2 text-white">⚠️ Site Visit in Bangalore within 29 Minutes | 100% Safety & Compliance Focused ⚠️</span>
          <span className="flex items-center gap-2 text-brand-red">⚡ Site Visit in Bangalore within 29 Minutes | 100% Safety & Compliance Focused ⚡</span>
          <span className="flex items-center gap-2 text-white">⚠️ Site Visit in Bangalore within 29 Minutes | 100% Safety & Compliance Focused ⚠️</span>
        </div>
      </div>

      {/* HEADER SECTION */}
      <header className="sticky top-0 w-full bg-white border-b-4 border-brand-red z-40 shadow-md transition-all text-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3.5 md:py-4 flex items-center justify-between w-full">
          <a href="#" className="flex items-center gap-2.5 group">
            <Logo className="h-20 sm:h-22 lg:h-20 py-1 transition-transform duration-300 group-hover:scale-[1.02]" />
          </a>

          {/* Navigation Links matching Design HTML */}
          <nav className="hidden lg:flex items-center gap-6 font-display font-bold text-[12px] uppercase tracking-wider text-zinc-800">
            <button 
              onClick={() => {
                setActiveTab('home');
                const servs = document.getElementById('services-anchor');
                if (servs) servs.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-brand-red cursor-pointer transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => {
                setActiveTab('home');
                const element = document.getElementById('why-choose-anchor');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-brand-red cursor-pointer transition-colors"
            >
              Why Us
            </button>
            <button 
              onClick={() => {
                setActiveTab('home');
                const element = document.getElementById('why-choose-anchor');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-brand-red cursor-pointer transition-colors"
            >
              Safety
            </button>
            <span onClick={handlePhoneClick} className="text-brand-red font-extrabold text-[13px] hover:underline cursor-pointer">Call: +91 90193 24061</span>
          </nav>

          {/* Contact and tab Navigation */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:block">
              <button
                onClick={() => {
                  setActiveTab('home');
                  const banner = document.getElementById('top-hero');
                  if (banner) banner.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 text-xs font-black transition rounded uppercase tracking-wider ${
                  activeTab === 'home'
                    ? 'bg-brand-red text-black font-black shadow-md'
                    : 'text-zinc-700 hover:text-black hover:bg-zinc-100'
                }`}
              >
                Home
              </button>
            </div>

            {/* Desktop Conversion Buttons (Phone and WhatsApp with status-badging to attract clients) */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Call Representative Button */}
              <a 
                href="tel:+919019324061"
                onClick={handlePhoneClick}
                className="group/call px-4 py-2 bg-[#E5A913]/10 hover:bg-[#E5A913] text-[#C69210] hover:text-black border border-[#E5A913]/40 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </div>
                <Phone className="w-3.5 h-3.5 fill-current" />
                <div className="text-left leading-none">
                  <span className="block text-[8px] font-mono tracking-wide text-zinc-500 font-extrabold uppercase group-hover/call:text-black/75 transition-colors">Direct Support</span>
                  <span className="block font-black text-[10px] mt-0.5 tracking-tight font-sans">Call Hotline</span>
                </div>
              </a>

              {/* WhatsApp Chat Button */}
              <a 
                href="https://wa.me/919019324061?text=Hello%20Master%2520Building%2520Demolition%2520Group%252C%2520I%2520would%2520like%2520to%2520request%2520a%2520site%2520inspection%2520and%2520demolition%2520quote."
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsappClick}
                className="group/wa px-4 py-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-400/40 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer ml-1"
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <div className="text-left leading-none">
                  <span className="block text-[8px] font-mono tracking-wide text-zinc-500 font-extrabold uppercase group-hover/wa:text-white/75 transition-colors">Response in 2 Mins</span>
                  <span className="block font-black text-[10px] mt-0.5 tracking-tight font-sans">Inquire WhatsApp</span>
                </div>
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded transition cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-brand-red" /> : <Menu className="w-6 h-6 text-zinc-800" />}
            </button>
          </div>
        </div>

        {/* Expandable Mobile Navigation Drawer with smooth slide animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t border-zinc-200 overflow-hidden"
            >
              <div className="px-5 py-5 space-y-3.5 flex flex-col font-display font-bold text-xs uppercase tracking-wider text-zinc-800">
                <button 
                  onClick={() => {
                    setActiveTab('home');
                    setMobileMenuOpen(false);
                    const servs = document.getElementById('top-hero');
                    if (servs) servs.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left py-2 hover:text-brand-red transition-colors border-b border-zinc-100"
                >
                  Services
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('home');
                    setMobileMenuOpen(false);
                    const element = document.getElementById('why-choose-anchor');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left py-2 hover:text-brand-red transition-colors border-b border-zinc-100"
                >
                  Why Us
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('home');
                    setMobileMenuOpen(false);
                    const element = document.getElementById('top-hero');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left py-2 hover:text-brand-red transition-colors border-b border-zinc-100"
                >
                  Safety
                </button>
                <div className="pt-3 flex flex-col gap-2.5">
                  <span className="text-brand-red font-black text-xs tracking-widest">Call Desk: +91 90193 24061</span>
                  <a 
                    href="tel:+919019324061"
                    className="w-full text-center py-3 bg-brand-red text-black rounded font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
                  >
                    <Phone className="w-3.5 h-3.5 fill-black" />
                    Call representative now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN VIEWPORT BODY */}
      <main className="flex-1">
        {/* HOMEPAGE WRAPPER */}
        {activeTab === 'home' ? (
          <>
            {/* HERO SECTION */}
            <section id="top-hero" className="relative bg-zinc-950 text-white overflow-hidden py-16 md:py-24">
              {/* Background ambient shade */}
              <div className="absolute inset-0 z-0 bg-radial-gradient from-zinc-900 to-black opacity-95" />
              
              {/* Grid overlay */}
              <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

              <div className="w-full px-4 md:px-12 lg:px-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="lg:col-span-7 space-y-7"
                >
                  {/* Local Badge */}
                  <div className="inline-flex items-center gap-2 bg-brand-red text-white py-1.5 px-3.5 rounded text-xs font-mono font-bold tracking-widest uppercase border border-brand-red-dark/40 shadow-md">
                    <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
                    <span>Trusted & Best Demolition in Bangalore</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white leading-[1.1] tracking-tighter uppercase">
                    Bangalore's Trusted & <br className="hidden md:inline" />
                    <span className="text-brand-red bg-zinc-900/90 border-l-4 border-brand-red px-3 py-1 inline-block my-2">
                      Best Demolition
                    </span> <br />
                    Contractors
                  </h2>

                  <p className="text-gray-300 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
                    As Bangalore's Trusted and Best Building Demolition Contractors, we specialize in high-precision structural dismantling of residential houses, commercial complexes, and industrial sites across Karnataka. Approved by BBMP safety protocols, we guarantee higher scrap value credit returns on every site.
                  </p>

                  {/* Trust Elements Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-2">
                    <div className="bg-zinc-900/80 p-3 rounded border border-zinc-800 flex items-center gap-2">
                      <span className="text-brand-red font-black font-mono text-lg shrink-0">
                        <CountUp end={15} suffix="+" />
                      </span>
                      <span className="text-[10px] text-gray-300 font-sans tracking-wider font-extrabold uppercase leading-snug">Years of <br />Experience</span>
                    </div>
                    <div className="bg-zinc-900/80 p-3 rounded border border-zinc-800 flex items-center gap-2">
                      <span className="text-brand-red font-black font-mono text-lg shrink-0">
                        <CountUp end={500} suffix="+" />
                      </span>
                      <span className="text-[10px] text-gray-300 font-sans tracking-wider font-extrabold uppercase leading-snug">Projects <br />Completed</span>
                    </div>
                    <div className="bg-zinc-900/80 p-3 rounded border border-zinc-800 flex items-center gap-2">
                      <span className="text-emerald-400 font-extrabold font-sans text-lg shrink-0">
                        <CountUp end={100} suffix="%" />
                      </span>
                      <span className="text-[10px] text-gray-300 font-sans tracking-wider font-extrabold uppercase leading-snug">Safety <br />Assured</span>
                    </div>
                    <div className="bg-zinc-900/80 p-3 rounded border border-zinc-800 flex items-center gap-2">
                      <span className="text-brand-red font-extrabold font-sans text-sm shrink-0">BBMP</span>
                      <span className="text-[10px] text-gray-300 font-sans tracking-wider font-extrabold uppercase leading-snug">Approved <br />Compliance</span>
                    </div>
                  </div>

                  {/* CTA Buttons row updated to blocky / flat styles */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <a 
                      href="tel:+919019324061"
                      onClick={handlePhoneClick}
                      className="flex-1 sm:flex-initial bg-brand-red hover:bg-brand-red-dark text-black font-extrabold uppercase font-sans py-4 px-6 rounded text-xs tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all duration-200"
                    >
                      <Phone className="w-4 h-4 fill-black animate-pulse" />
                      <div className="text-left">
                        <span className="block text-[8px] text-zinc-900 font-bold leading-none uppercase">CALL DIRECT</span>
                        <span className="block leading-tight font-black text-black">+91 90193 24061</span>
                      </div>
                    </a>

                    <a 
                      href="https://wa.me/919019324061?text=Hello%20Master%20Building%20Demolition%20Group%2C%20I%20would%20like%20to%20request%20a%20site%20inspection%20and%20demolition%20quote."
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleWhatsappClick}
                      className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase font-sans py-4 px-6 rounded text-xs tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all duration-200"
                    >
                      <MessageSquare className="w-4 h-4 fill-white animate-pulse" />
                      <div className="text-left">
                        <span className="block text-[8px] text-emerald-100 font-bold leading-none uppercase">WHATSAPP CHAT</span>
                        <span className="block leading-tight font-black">Inquire Instantly</span>
                      </div>
                    </a>

                    <button 
                      onClick={() => {
                        const formSection = document.getElementById('lead-form-anchor');
                        if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-1 sm:flex-initial bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 font-extrabold font-sans py-4 px-6 rounded text-xs uppercase tracking-widest shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-brand-red inline mr-1.5" />
                      <span>Free Site Inspection</span>
                    </button>
                  </div>
                </motion.div>

                {/* Hero Image Box with Professional Polish framing (Animated entry) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="lg:col-span-5 relative mt-4 lg:mt-0"
                >
                  <div className="relative rounded overflow-hidden border-4 border-zinc-800 shadow-2xl bg-zinc-900 group">
                    <img 
                      src={IMAGES.hero} 
                      alt="A1 Excavator demolition process Bangalore" 
                      referrerPolicy="no-referrer"
                      className="w-full object-cover aspect-[4/3] select-none transition duration-700 group-hover:scale-103"
                    />
                    
                    {/* Dark gradient mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                    {/* Operational Overlay stats */}
                    <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/95 backdrop-blur-md p-3 rounded border border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <div>
                          <span className="block text-[8.5px] text-gray-400 font-mono uppercase font-bold tracking-wider">Crew Status</span>
                          <span className="block text-xs font-bold text-white"><CountUp end={4} /> Active Sites in Bangalore</span>
                        </div>
                      </div>
                      <div className="text-right border-l border-zinc-800 pl-3">
                        <span className="block text-[8.5px] text-brand-red font-mono uppercase font-bold tracking-wider">Scrap Offset</span>
                        <span className="block text-xs font-bold text-emerald-400">Up to <CountUp end={100} suffix="%" /> Value Rebate</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust stamp - Blocky Red Seal */}
                  <div className="absolute -top-3 -right-3 bg-brand-red text-white p-3 rounded font-display font-bold text-center leading-none shadow-2xl border-2 border-zinc-950 hidden sm:block rotate-6 select-none">
                    <span className="block text-[8px] font-mono tracking-widest font-black uppercase text-red-200">BBMP LICENSE</span>
                    <span className="block text-xs font-black tracking-wider uppercase font-mono">APPROVED</span>
                  </div>
                </motion.div>

              </div>
            </section>

            {/* TRUST BAR */}
            <div className="bg-zinc-900 border-y border-zinc-800 text-white/90 py-3.5 select-none">
              <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-xs md:text-sm font-sans font-medium text-center">
                <span className="flex items-center gap-1.5 text-amber-500">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-red shrink-0" />
                  <span className="text-white font-semibold"><CountUp end={15} suffix="+" /> Years Experience</span>
                </span>
                <span className="text-zinc-700 hidden md:inline">|</span>
                <span className="flex items-center gap-1.5 text-amber-500">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-red shrink-0" />
                  <span className="text-white font-semibold"><CountUp end={500} suffix="+" /> Building Projects Completed</span>
                </span>
                <span className="text-zinc-700 hidden md:inline">|</span>
                <span className="flex items-center gap-1.5 text-amber-500">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-red shrink-0" />
                  <span className="text-white font-semibold">Self-Owned Heavy Machinery Asset</span>
                </span>
                <span className="text-zinc-700 hidden md:inline">|</span>
                <span className="flex items-center gap-1.5 text-amber-500">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-red shrink-0" />
                  <span className="text-white font-semibold">Safe Controlled Demolition Standard</span>
                </span>
                <span className="text-zinc-700 hidden md:inline">|</span>
                <span className="flex items-center gap-1.5 text-amber-500">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-red shrink-0" />
                  <span className="text-white font-semibold">All Bangalore Wide Site Mobilization</span>
                </span>
              </div>
            </div>

            {/* ABOUT US SECTION */}
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
                
                {/* Left: About texts */}
                <div className="lg:col-span-7 space-y-5">
                  <span className="text-xs font-mono font-bold bg-zinc-100 text-brand-red border border-gray-200 py-1 px-2.5 rounded-md uppercase tracking-wider inline-block">
                    Who We Are
                  </span>
                  
                  <h3 className="text-2xl md:text-4xl font-display font-black text-brand-dark tracking-tight leading-tight">
                    Since 2011, Redesigning Bangalore's Land Canvas with Absolute Tech and Care
                  </h3>

                  <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed">
                    <strong>Master Building Demolition Contractors Bangalore</strong> is one of Bangalore's premier structural clearance groups specializing in safe, efficient, and cost-effective building demolition, dismantling, site preparation, and debris removal campaigns. 
                  </p>
                  
                  <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed">
                    Our team executes projects of all sizes — from high-density residential independent houses in narrow lanes of Malleshwaram and Jayanagar to wide manufacturing warehouse clearance projects in Peenya and electronic corridors. We handle site grading, foundation excavation, steel salvage buyback, and coordinate licenses seamlessly.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                    <div className="flex gap-3">
                      <div className="bg-red-50 text-brand-red p-2.5 rounded-lg shrink-0 h-11 w-11 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-gray-900 font-sans">Full Licensed Compliance</span>
                        <span className="block text-xs text-gray-500">Approved demolition certification with complete third-party public accident cover.</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="bg-red-50 text-brand-red p-2.5 rounded-lg shrink-0 h-11 w-11 flex items-center justify-center">
                        <HardHat className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-gray-900 font-sans">Controlled Safety Planning</span>
                        <span className="block text-xs text-gray-500">Extensively insulated barriers, fine-mist water cannons for dust, and soundproofing nets.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Technical stat panel */}
                <div className="lg:col-span-5 bg-zinc-900 text-white rounded-2xl p-6 md:p-8 space-y-6 border border-zinc-800 shadow-xl relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 text-zinc-800/10 pointer-events-none">
                    <Hammer className="w-48 h-48" />
                  </div>

                  <h4 className="text-lg font-display font-bold text-amber-500 border-b border-zinc-800 pb-3 flex items-center justify-between">
                    <span>Engineering Certifications</span>
                    <Award className="w-5 h-5 text-brand-red animate-pulse" />
                  </h4>

                  <ul className="space-y-4 text-xs font-sans text-gray-300">
                    <li className="flex items-start gap-2.5">
                      <span className="bg-brand-red text-white py-0.5 px-2 rounded font-mono font-semibold uppercase text-[9px] mt-0.5">BBMP</span>
                      <div>
                        <span className="block font-bold text-white">Local Ward Permissions Facilitator</span>
                        <p className="text-gray-400 mt-0.5">We guide and organize structural stability reporting required by Ward Inspectors.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="bg-emerald-600 text-white py-0.5 px-2 rounded font-mono font-semibold uppercase text-[9px] mt-0.5">INSURED</span>
                      <div>
                        <span className="block font-bold text-white">₹2 Crore General Liability Shield</span>
                        <p className="text-gray-400 mt-0.5">Covering structural defense, neighboring compound safety, and crew insurance.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="bg-zinc-800 text-amber-500 py-0.5 px-2 rounded font-mono font-semibold uppercase text-[9px] mt-0.5">RECYCLE</span>
                      <div>
                        <span className="block font-bold text-white">90% Concrete Reclamation</span>
                        <p className="text-gray-400 mt-0.5">Rubble goes into recycling crashers, dramatically lowering the carbon footprint.</p>
                      </div>
                    </li>
                  </ul>

                  <button
                    onClick={() => {
                      const formSection = document.getElementById('lead-form-anchor');
                      if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 bg-brand-red hover:bg-brand-red-dark text-white text-center font-bold font-sans text-xs uppercase tracking-wider rounded-lg transition-colors border border-brand-red shadow-lg focus:outline-none"
                  >
                    Assess My Site Instantly
                  </button>
                </div>

              </div>
            </section>

            {/* SERVICES SECTION */}
            <section id="services-anchor" className="py-16 md:py-24 bg-zinc-100 border-y border-gray-150 scroll-mt-20">
              <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-xs font-mono font-bold bg-brand-red/10 text-brand-red py-1 px-3 rounded-full uppercase tracking-wider inline-block">
                    Our Operational Capabilities
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-black text-brand-dark tracking-tight">
                    Professional Demolition & Site Prep Services
                  </h3>
                  <p className="text-sm text-gray-500 font-sans">
                    We bring military precision and top-tier heavy hydraulic power to demolish residential, commercial, and industrial properties in Bangalore.
                  </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICES.map((serv, idx) => {
                    return (
                      <motion.div 
                        key={serv.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                        transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                        className="bg-white rounded-xl border border-zinc-200/80 hover:border-brand-red/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between select-none shadow-sm"
                      >
                        <div className="p-6 space-y-5 flex flex-col justify-between h-full w-full">
                          <div className="space-y-4">
                            {/* Card Header row with Icon and Capability Tag */}
                            <div className="flex items-center justify-between">
                              <div className="w-10 h-10 rounded-lg bg-brand-red/10 border border-brand-red/20 flex items-center justify-center shrink-0">
                                {getServiceIcon(serv.iconName)}
                              </div>
                              <span className="text-[9px] bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded font-mono font-bold uppercase tracking-wider">
                                0{idx + 1} / CAPABILITY
                              </span>
                            </div>

                            {/* Service title */}
                            <h4 className="text-base font-display font-black text-brand-dark tracking-tight uppercase leading-snug">
                              {serv.title}
                            </h4>

                            {/* Description */}
                            <p className="text-xs text-zinc-650 font-sans leading-relaxed min-h-[48px]">
                              {serv.description}
                            </p>

                            {/* Custom Features Bullet List */}
                            <ul className="space-y-2 pt-4 border-t border-zinc-100">
                              {serv.features.map((feat, fidx) => (
                                <li key={fidx} className="flex items-start gap-2 text-[11px] text-zinc-700 font-medium font-sans">
                                  <Check className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Estimated cost range & Select service trigger */}
                          <div className="pt-4 border-t border-zinc-150 flex items-center justify-between">
                            <div>
                              <span className="block text-[8px] text-zinc-500 font-mono uppercase font-bold tracking-wider leading-none">EST. RATE RANGE</span>
                              <span className="block text-sm font-black font-mono text-brand-red mt-1">{serv.minCostEstimate}</span>
                            </div>
                            <button
                              onClick={() => handleServiceInquirySelect(serv.title)}
                              className="px-4 py-2 bg-brand-dark hover:bg-brand-red active:scale-95 text-white text-[10px] uppercase font-mono font-bold tracking-widest rounded transition-all duration-150 flex items-center gap-1 focus:outline-none cursor-pointer"
                            >
                              <span>SELECT</span>
                              <ChevronRight className="w-3.5 h-3.5 text-[#E5A913]" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Conversion Call Block after services */}
                <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 mt-8 shadow-lg">
                  <div className="space-y-2">
                    <span className="text-xs text-amber-500 font-mono font-bold uppercase">NEED AN EMERGENCY ASSESSMENT TODAY?</span>
                    <h4 className="text-xl md:text-2xl font-display font-bold tracking-tight">
                      Narrow roads, shared compound walls? We are Malleshwaram & Jayanagar specialists!
                    </h4>
                    <p className="text-xs text-gray-400 font-sans max-w-2xl">
                      Do not risk structural cracks in adjacent buildings. Our specialized hand-tools demolition crew specializes in congested neighborhoods with zero damage to surrounding structures.
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <a 
                      href="tel:+919019324061" 
                      className="px-5 py-3 bg-brand-red hover:bg-brand-red-dark text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 active:scale-95 transition"
                    >
                      <Phone className="w-4 h-4 fill-white" />
                      <span>Call Now</span>
                    </a>
                    <a 
                      href="https://wa.me/919019324061?text=Hello%20Master%20Building%20Demolition%20Team%2C%20I%20want%20to%20discuss%20narrow%20compound%20wall%20safety%20demolition."
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 active:scale-95 transition"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            </section>

            {/* PROJECT CASE STUDY SECTION */}
            <section className="py-16 md:py-24 bg-zinc-950">
              <div className="max-w-7xl mx-auto px-4 md:px-6">
                <ProjectGallery />
              </div>
            </section>

            {/* NEW MASTER BUILDING DEMOLITION OFFERS SECTION */}
            <section id="why-choose-anchor" className="py-16 md:py-24 bg-white scroll-mt-20">
              <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-xs font-mono font-bold bg-[#E5A913]/15 text-[#C69210] py-1 px-3 border border-[#E5A913]/35 rounded uppercase tracking-wider inline-block">
                    Exclusive Bangalore Packages
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-black text-brand-dark tracking-tight uppercase">
                    Master Building Demolition Special Offers
                  </h3>
                  <p className="text-sm text-gray-500 font-sans font-medium">
                    Maximize site value and completely eliminate excess expenditures with our exclusive client-focused pricing structures and zero-cost options.
                  </p>
                </div>

                {/* Offer layout grid: Image on Left, Details/Deals list on Right (Scroll Triggered Entry Animation) */}
                <motion.div 
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-850 shadow-2xl"
                >
                  {/* Left Column: Premium Generated Banner Image */}
                  <div className="lg:col-span-6 relative h-[280px] sm:h-[350px] lg:h-full min-h-[350px] w-full group overflow-hidden bg-zinc-900">
                    <img 
                      src={IMAGES.offers} 
                      alt="Master Building Premium Demolition Offers and Scrap Buyback" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8 space-y-2">
                      <div className="inline-block self-start text-[10px] font-mono bg-[#E5A913] text-black font-extrabold uppercase py-1 px-3 rounded tracking-widest shadow">
                        ★ BEST VALUATION GUARANTEE
                      </div>
                      <h4 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight leading-none">
                        GET 100% FREE <span className="text-[#E5A913]">DEMOLITION</span>*
                      </h4>
                      <p className="text-xs text-zinc-300 max-w-md font-sans leading-relaxed">
                        If the salvage valuation of your old iron, copper, and teak wood exceeds our technical execution costs, your entire project is executed completely free of charge.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Key Core Deals & Offers with interactive cues */}
                  <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 space-y-6 text-left text-white">
                    <div className="space-y-4">
                      {/* Deal 1 */}
                      <div className="flex items-start gap-3.5 border-b border-zinc-900 pb-4">
                        <div className="w-9 h-9 shrink-0 rounded-lg bg-[#E5A913]/10 border border-[#E5A913]/30 flex items-center justify-center font-mono font-bold text-[#E5A913] text-sm">
                          01
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-display font-black text-sm uppercase text-white tracking-wider flex items-center gap-1.5">
                            <span>100% Free Site Visits & Inspection</span>
                            <span className="text-[8px] bg-red-600 text-white font-semibold py-0.5 px-1.5 rounded uppercase font-mono tracking-normal animate-pulse">NO FEE</span>
                          </h5>
                          <p className="text-xs text-zinc-400 font-sans leading-normal">
                            We dispatch a senior structural safety engineer to any location in Bangalore within 2 hours. Fully free assessment, documentation, and structural reports.
                          </p>
                        </div>
                      </div>

                      {/* Deal 2 */}
                      <div className="flex items-start gap-3.5 border-b border-zinc-900 pb-4">
                        <div className="w-9 h-9 shrink-0 rounded-lg bg-[#E5A913]/10 border border-[#E5A913]/30 flex items-center justify-center font-mono font-bold text-[#E5A913] text-sm">
                          02
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-display font-black text-sm uppercase text-white tracking-wider">
                            Premium Salvage & Scrap Offset
                          </h5>
                          <p className="text-xs text-zinc-400 font-sans leading-normal">
                            We offer the highest buyback rates in Karnataka for recovered steel rebar, structural metal plates, old teak wood doors, window frames, and electric wiring.
                          </p>
                        </div>
                      </div>

                      {/* Deal 3 */}
                      <div className="flex items-start gap-3.5 border-b border-zinc-900 pb-4">
                        <div className="w-9 h-9 shrink-0 rounded-lg bg-[#E5A913]/10 border border-[#E5A913]/30 flex items-center justify-center font-mono font-bold text-[#E5A913] text-sm">
                          03
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-display font-black text-sm uppercase text-white tracking-wider">
                            BBMP Paperwork Coordination Assistance
                          </h5>
                          <p className="text-xs text-zinc-400 font-sans leading-normal">
                            Take absolute peace of mind. Our administrative desk completely guides and assists you with municipal demolition compliance, permits, and neighbor safety documentation.
                          </p>
                        </div>
                      </div>

                      {/* Deal 4 */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 shrink-0 rounded-lg bg-[#E5A913]/10 border border-[#E5A913]/30 flex items-center justify-center font-mono font-bold text-[#E5A913] text-sm">
                          04
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-display font-black text-sm uppercase text-white tracking-wider">
                            Free High-Density Safety Shields
                          </h5>
                          <p className="text-xs text-zinc-400 font-sans leading-normal">
                            Unlike basic contractors who leave homes exposed, we erect heavy 20ft+ protective nets, metal shielding, and neighbor wall cushions absolutely free on every job.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-center gap-4 justify-between">
                      <span className="text-[10px] uppercase font-mono text-zinc-500 leading-snug">
                        * Scrap adjustment depends on actual structural survey.
                      </span>
                      <button 
                        onClick={() => {
                          const formSection = document.getElementById('lead-form-anchor');
                          if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full sm:w-auto px-5 py-3 bg-[#E5A913] hover:bg-[#C69210] text-black font-extrabold font-sans rounded text-xs uppercase tracking-widest transition-all shadow-lg text-center cursor-pointer"
                      >
                        Claim Free Valuation
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* PROCESS TIMELINE SECTION REMOVED */}

            {/* SECTIONS: BANGALORE REGIONS */}
            <section id="locations-anchor" className="py-16 md:py-24 bg-white scroll-mt-20">
              <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-mono font-bold bg-zinc-100 text-gray-900 border border-gray-200 py-1 px-3 rounded uppercase tracking-wider inline-block">
                    Operational Grid
                  </span>
                  <h3 className="text-3xl font-display font-black text-brand-dark tracking-tight uppercase">
                    Service Areas Across Bangalore
                  </h3>
                  <p className="text-xs text-gray-500 font-sans">
                    Click your locality below to pre-fill the location. Our nearby inspector can coordinate a site visit today.
                  </p>
                </div>

                {/* Location Grid Box */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  {SERVICE_LOCATIONS.map((loc, idx) => {
                    const isAll = loc.name === 'All Bangalore Locations';
                    return (
                      <motion.div
                        key={idx}
                        className={isAll ? 'col-span-2 sm:col-span-1 h-24' : 'h-24'}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover="hover"
                        viewport={{ once: true, margin: "-10px" }}
                        transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.45), ease: "easeOut" }}
                      >
                        <button 
                          onClick={() => handleLocationClick(loc.name, loc.description)}
                          className={`text-left p-3.5 rounded border text-xs transition duration-150 font-sans focus:outline-none flex flex-col justify-between w-full h-full relative overflow-hidden group/loccard ${
                            isAll 
                              ? 'bg-brand-red border-brand-red text-white hover:bg-brand-red-dark font-semibold' 
                              : 'bg-[#F5F5F5] border-zinc-200 text-gray-800 hover:bg-white hover:border-brand-red hover:shadow-md'
                          }`}
                        >
                          <div className="font-semibold text-sm leading-tight flex items-center justify-between w-full relative z-10">
                            <span className="uppercase tracking-tight font-display font-bold text-[11px] sm:text-xs">{loc.name}</span>
                            <div className="relative flex items-center justify-center w-5 h-5">
                              {/* Pulse ring indicating active neighborhood site connection */}
                              <motion.span 
                                variants={{
                                  hover: {
                                    scale: [1, 2.2, 1],
                                    opacity: [0, 0.8, 0],
                                    transition: {
                                      repeat: Infinity,
                                      duration: 1.0,
                                      ease: "easeOut"
                                    }
                                  }
                                }}
                                className={`absolute inset-0 rounded-full ${isAll ? 'bg-red-200' : 'bg-brand-red/45'} opacity-0 pointer-events-none`}
                              />
                              <MapPin className={`w-3.5 h-3.5 shrink-0 relative z-10 transition-transform group-hover/loccard:scale-110 ${isAll ? 'text-white' : 'text-brand-red'}`} />
                            </div>
                          </div>
                          <span className={`text-[10px] mt-2 block leading-snug relative z-10 ${isAll ? 'text-red-100' : 'text-gray-500 font-semibold'}`}>
                            {loc.description}
                          </span>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* LEAD GENERATION FORM */}
            <section id="lead-form-anchor" className="py-16 md:py-24 bg-zinc-900 text-white scroll-mt-10">
              <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left column: Persuasive texts */}
                <div className="lg:col-span-5 space-y-6 text-left">
                  <span className="text-xs font-mono font-bold bg-brand-red text-white py-1 px-2 rounded.sm uppercase tracking-wider">
                    Instant Valuation
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-black text-white leading-tight tracking-tight uppercase">
                    Schedule Your Free <span className="text-brand-red">Site Inspection</span> & Estimate
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans font-medium">
                    Submit the form on the right. Our regional technical supervisor will call you within 15 minutes to coordinate a structural stability analysis of your house, commercial block, or factory depot.
                  </p>

                  <div className="space-y-4 border-t border-zinc-800 pt-6 font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded.sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
                      <span className="text-xs text-gray-200">Free salvage evaluation (Iron, Teak wood structures)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded.sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
                      <span className="text-xs text-gray-200">Legal BBMP building permit counseling</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded.sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
                      <span className="text-xs text-gray-200">₹2 Cr third-party insurance certificate provided</span>
                    </div>
                  </div>

                  {/* Trust review overlay */}
                  <div className="p-4 bg-zinc-950 rounded border border-zinc-800 space-y-2 mt-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((_, star) => (
                        <Star key={star} className="w-3.5 h-3.5 fill-brand-red text-brand-red" />
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-400 italic">
                      "I submitted the form on Wednesday evening. The inspector came to my Banashankari site by Thursday noon and shared a competitive quote adjusting the scrap iron buyback rate. Best experience!"
                    </p>
                    <span className="block text-[10px] text-gray-500 font-bold">- Ramesh J, Homeowner</span>
                  </div>
                </div>

                {/* Right column: Form */}
                <div className="lg:col-span-7">
                  <div className="polished-quote-form text-zinc-900 text-left">
                    <h4 className="text-xl font-display font-bold text-gray-950 tracking-tight flex items-center gap-2 uppercase">
                      <ClipboardList className="text-brand-red w-5 h-5 animate-pulse" />
                      <span>Custom Demolition Request</span>
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Providing detailed specifications helps our engineers fetch realistic metal salvaging quotes.
                    </p>

                    {locationHighlightMsg && (
                      <div className="mt-3 p-2.5 bg-brand-red/5 border border-brand-red/10 text-brand-red rounded-lg text-xs font-sans font-medium flex items-center gap-2">
                        <Info className="w-4 h-4 shrink-0" />
                        <span>{locationHighlightMsg}</span>
                      </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="mt-5 space-y-4 font-sans text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 block uppercase font-mono">YOUR NAME *</label>
                          <div className="relative">
                            <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                              type="text" 
                              required
                              placeholder="Name/Builder title"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-red focus:bg-white"
                            />
                          </div>
                        </div>

                        {/* Phone input */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 block uppercase font-mono">Mobile Number *</label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                              type="tel" 
                              required
                              placeholder="Whatsapp/Call mobile"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-red focus:bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email Input */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 block uppercase font-mono">Email Address (Optional)</label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                              type="email" 
                              placeholder="Email for document sharing"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-red focus:bg-white"
                            />
                          </div>
                        </div>

                        {/* Location Select */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 block uppercase font-mono">Property Location *</label>
                          <div className="relative">
                            <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="Locality e.g. Banashankari"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-red focus:bg-white shadow-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Service Category Select */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block uppercase font-mono">Type of Demolition Required</label>
                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-red focus:bg-white cursor-pointer"
                        >
                          {SERVICES.map((s, sidx) => (
                            <option key={sidx} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                      </div>

                      {/* Details Box */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block uppercase font-mono">Project Details (Slab Area, Close Neighbors, etc.)</label>
                        <div className="relative">
                          <MessageSquareText className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                          <textarea 
                            rows={3}
                            placeholder="Please mention adjacent neighborhood walls, approximate plot dimension, or salvage items you want to keep..."
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-red focus:bg-white"
                          />
                        </div>
                      </div>

                      {/* Submit Trigger */}
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 bg-brand-red hover:bg-brand-red-dark text-white font-bold rounded-xl md:text-base transition shadow-xl focus:outline-none ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'active:scale-98'}`}
                      >
                        {isSubmitting ? 'Registering Demolition Case...' : '🔒 Request Free 100% Free Site Inspection'}
                      </button>

                      <p className="text-[10px] text-gray-400 text-center uppercase tracking-wider mt-2 font-semibold">
                        🔒 Safe & Secure. Your contact data is protected and never shared.
                      </p>
                    </form>
                  </div>
                </div>

              </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-xs font-mono font-bold bg-zinc-100 text-gray-800 py-1 px-3 border border-gray-200 rounded-full uppercase tracking-wider inline-block">
                    Verified Customer Feedback
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-black text-brand-dark tracking-tight">
                    What Builders & Homeowners Say
                  </h3>
                  <p className="text-sm text-gray-400 font-sans">
                    With concrete rubble recycling and transparent billing, we turn complex clearing tasks into pleasant safety exercises.
                  </p>
                </div>

                {/* Review Carousel (Scroll one-by-one with automatic transitions) */}
                <div className="relative max-w-2xl mx-auto">
                  <div className="overflow-hidden min-h-[220px] sm:min-h-[165px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -25 }}
                        transition={{ duration: 0.25 }}
                        className="w-full bg-zinc-50 rounded-2xl p-6 md:p-8 border border-gray-150 flex flex-col justify-between hover:shadow-md transition space-y-4 md:space-y-6"
                      >
                        <div className="space-y-3 md:space-y-4 text-center sm:text-left">
                          {/* Rating Stars */}
                          <div className="flex justify-center sm:justify-start gap-1 text-amber-500">
                            {Array.from({ length: TESTIMONIALS[currentTestimonial].rating }).map((_, st) => (
                              <Star key={st} className="w-5 h-5 fill-amber-500 text-amber-400" />
                            ))}
                          </div>

                          {/* Quote Text */}
                          <blockquote className="text-xs sm:text-sm md:text-base text-gray-700 font-sans italic leading-relaxed">
                            "{TESTIMONIALS[currentTestimonial].quote}"
                          </blockquote>
                        </div>

                        {/* Author Card Info */}
                        <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                          <div>
                            <span className="block font-bold text-gray-900 font-display text-sm sm:text-base leading-tight">
                              {TESTIMONIALS[currentTestimonial].name}
                            </span>
                            <span className="block text-xs text-gray-500 font-sans mt-0.5">
                              {TESTIMONIALS[currentTestimonial].role}
                            </span>
                          </div>
                          <span className="font-mono text-xs bg-red-50 text-brand-red font-bold py-1 px-3 rounded-md">
                            {TESTIMONIALS[currentTestimonial].location}
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Left and Right Chevron Controls */}
                  <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                      onClick={() => {
                        setCurrentTestimonial((prev) => 
                          prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
                        );
                      }}
                      className="p-2 rounded-full border border-gray-200 bg-white hover:bg-zinc-50 text-gray-600 hover:text-black hover:border-brand-red transition active:scale-95 shadow-sm cursor-pointer"
                      aria-label="Previous Testimonial"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    {/* Navigation Dots */}
                    <div className="flex gap-1.5">
                      {TESTIMONIALS.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentTestimonial(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            currentTestimonial === idx 
                              ? 'bg-brand-red w-5' 
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to testimonial ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setCurrentTestimonial((prev) => 
                          (prev + 1) % TESTIMONIALS.length
                        );
                      }}
                      className="p-2 rounded-full border border-gray-200 bg-white hover:bg-zinc-50 text-gray-600 hover:text-black hover:border-brand-red transition active:scale-95 shadow-sm cursor-pointer"
                      aria-label="Next Testimonial"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>


          </>
        ) : (
          /* LEADS CONSOLE TAB SCREEN VIEW */
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-6">
            <div className="bg-amber-500/10 border border-amber-300/40 p-4 rounded-xl text-amber-900 text-xs md:text-sm font-sans flex items-start gap-2.5 shadow-sm">
              <Info className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold">Landing Page Admin Concept Board:</span> This is a real-time developer workspace containing actual inquiries submitted via the public quote requests layout. You can coordinate reviews of safety bookings directly. Use the mock button inside the console to simulate a live customer from different Bangalore regions instantly.
              </div>
            </div>

            <LeadBoard onTotalUpdated={(count) => setTotalLeads(count)} />
          </div>
        )}
      </main>

      {/* FOOTER AREA */}
      <footer className="bg-zinc-950 text-white border-t border-zinc-900 pt-16 pb-24 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-zinc-900 pb-12">
          
          {/* Logo & Slogan Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <Logo className="h-16 py-1" darkBg={true} />
            </div>
            
            <p className="text-gray-400 font-sans leading-relaxed tracking-normal max-w-sm">
              Safe. Fast. Professional Demolition Services Across Bangalore. Specializing in old house dismantling, high-reach commercial building breaker works, and complete hazardous material clearance under BBMP rules.
            </p>

            <div className="flex gap-2">
              <span className="px-2 py-1 bg-zinc-900 rounded font-mono font-bold text-gray-400 border border-zinc-800">
                15+ Yrs Field Strength
              </span>
              <span className="px-2 py-1 bg-zinc-900 rounded font-mono font-bold text-emerald-400 border border-zinc-800">
                ✓ Insured
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3 font-sans">
            <h4 className="text-sm font-display font-semibold text-white tracking-wide uppercase border-l-2 border-brand-red pl-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li>
                <button 
                  onClick={() => {
                    setActiveTab('home');
                    setTimeout(() => {
                      const top = document.getElementById('top-hero');
                      if (top) top.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-brand-red transition focus:outline-none cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setActiveTab('home');
                    setTimeout(() => {
                      const element = document.getElementById('project-gallery-section');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-brand-red transition focus:outline-none cursor-pointer"
                >
                  Project Proofs
                </button>
              </li>

              <li>
                <button 
                  onClick={() => {
                    setActiveTab('home');
                    setTimeout(() => {
                      const element = document.getElementById('lead-form-anchor');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-brand-red transition focus:outline-none cursor-pointer"
                >
                  Book Site Visit
                </button>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3 font-sans">
            <h4 className="text-sm font-display font-semibold text-white tracking-wide uppercase border-l-2 border-brand-red pl-2">
              Our Core Services
            </h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li><button onClick={() => handleServiceInquirySelect('Residential Building Demolition')} className="hover:text-white transition">Residential Building Demolition</button></li>
              <li><button onClick={() => handleServiceInquirySelect('Commercial Building Demolition')} className="hover:text-white transition">Commercial Building Demolition</button></li>
              <li><button onClick={() => handleServiceInquirySelect('Old House Demolition')} className="hover:text-white transition">Old House Demolition</button></li>
              <li><button onClick={() => handleServiceInquirySelect('Factory Demolition')} className="hover:text-white transition">Factory & Warehouse Demolition</button></li>
              <li><button onClick={() => handleServiceInquirySelect('Concrete Breaking')} className="hover:text-white transition">Concrete Breaking & Slab Core-cutting</button></li>
              <li><button onClick={() => handleServiceInquirySelect('Excavation Services')} className="hover:text-white transition">Site Grading & Columns Excavation</button></li>
            </ul>
          </div>

          {/* Contact & Map Column */}
          <div className="lg:col-span-3 space-y-4 font-sans">
            <h4 className="text-sm font-display font-semibold text-white tracking-wide uppercase border-l-2 border-brand-red pl-2">
              Contact HQ
            </h4>
            <ul className="space-y-2.5 text-gray-400">
              <li className="flex items-start gap-1.5 group">
                <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                <div>
                  <a 
                    href="https://share.google/Hj0twKqUfYul6Hyzz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#E5A913] hover:underline transition font-medium text-xs leading-relaxed block"
                  >
                    520, BTM 2nd Stage, Kuvempu Nagar, jayanagar, BTM Layout, Bengaluru, Karnataka 560076
                    <span className="inline-flex items-center gap-0.5 ml-1 text-[9px] text-[#E5A913] uppercase font-mono font-black tracking-wider bg-[#E5A913]/10 px-1 py-0.5 rounded">
                      Open Map ↗
                    </span>
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-red shrink-0 fill-gray-400" />
                <a href="tel:+919019324061" onClick={handlePhoneClick} className="hover:text-white transition font-mono font-bold">+91 90193 24061</a>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-red shrink-0" />
                <a href="mailto:info@masterbuildingdemolitions.com" className="hover:text-white transition">info@masterbuildingdemolitions.com</a>
              </li>
            </ul>

            {/* Google maps standard compliant interactive selector iframe */}
            <div className="rounded-lg overflow-hidden border border-zinc-800 h-32 bg-zinc-900 relative shadow-inner">
              <InteractiveFooterMap />
            </div>
          </div>

        </div>

        {/* Footer legal notes */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-zinc-500 uppercase tracking-widest font-semibold font-mono">
          <span>&copy; {new Date().getFullYear()} Master Building Demolition Contractors Bangalore. All Rights Reserved.</span>
          <div className="flex gap-4">
            <span className="text-zinc-500">BBMP License: #BBMP/DEMO-2019/3389</span>
            <span className="text-gray-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Bangalore ISO 9001:2015 Approved</span>
            </span>
          </div>
        </div>
      </footer>

      {/* STICKY BOTTOM EMERGENCY MOB MOBILE CONTROLS FOR CONVERSION */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-black/95 backdrop-blur-md border-t-2 border-[#E5A913] p-2.5 flex gap-2.5 md:hidden shadow-[0_-12px_24px_rgba(0,0,0,0.5)] font-display">
        <a 
          href="tel:+919019324061"
          onClick={handlePhoneClick}
          className="flex-1 py-3 bg-[#E5A913] active:scale-95 text-zinc-950 font-black uppercase rounded-xl flex flex-col items-center justify-center gap-0.5 focus:outline-none shadow-lg shadow-[#E5A913]/25 border border-[#E5A913]/30 transition-all duration-150"
        >
          <div className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 fill-current animate-pulse text-zinc-950" />
            <span className="text-[12px] tracking-tight font-extrabold">CALL HOTLINE</span>
          </div>
          <span className="text-[8.5px] font-mono tracking-widest opacity-80 leading-none">Instant Response</span>
        </a>

        <a 
          href="https://wa.me/919019324061?text=Hello%20Master%20Building%20Demolition%20Group%2C%20I%20would%2520like%2520to%2520request%2520a%2520site%2520inspection."
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsappClick}
          className="flex-1 py-3 bg-emerald-600 active:scale-95 text-white font-black uppercase rounded-xl flex flex-col items-center justify-center gap-0.5 focus:outline-none shadow-lg shadow-emerald-600/25 border border-emerald-500/30 transition-all duration-150"
        >
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 fill-white text-white animate-bounce" />
            <span className="text-[12px] tracking-tight font-extrabold">WHATSAPP CHAT</span>
          </div>
          <span className="text-[8.5px] font-mono tracking-widest text-emerald-100/90 leading-none">2 Min Response</span>
        </a>
      </div>

      {/* FORM SUBMISSION SUCCESS DIALOG / MODAL */}
      <AnimatePresence>
        {submitSuccess && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full text-center border border-zinc-100 shadow-2xl relative"
            >
              <div className="w-14 h-14 bg-emerald-50 text-emerald-500 border-2 border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 font-sans shadow-lg shadow-emerald-500/10">
                <Check className="w-8 h-8 font-bold" />
              </div>

              <h4 className="text-xl md:text-2xl font-display font-bold text-gray-950 tracking-tight leading-snug">
                Case Successfully Scheduled!
              </h4>
              
              <p className="text-xs text-gray-500 mt-2 font-sans leading-relaxed">
                Thank you for choosing Master Building Demolition Contractors! Your inquiry has been logged securely in our regional queue. Our Bangalore supervisor has received the safety dossier and will call you in 15 minutes.
              </p>

              <div className="my-5 p-4 bg-zinc-50 border border-gray-150 rounded-xl text-left text-xs font-sans space-y-1.5">
                <div className="text-zinc-500 font-mono font-bold uppercase text-[9px]">YOUR ACTION HAS TRIGGERED:</div>
                <div className="font-semibold text-zinc-900">• Live sync database registration (Leads Tab)</div>
                <div className="font-semibold text-zinc-900">• Instant WhatsApp push to regional engineer</div>
                <div className="font-semibold text-zinc-900">• High scrap credit rate lock security</div>
              </div>

              {/* Instant WhatsApp & Call connection */}
              <div className="space-y-2.5">
                {whatsappTemplateUrl && (
                  <a 
                    href={whatsappTemplateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg text-xs uppercase tracking-wider shadow-md focus:outline-none transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-white animate-bounce" />
                    <span>Send details to WhatsApp</span>
                  </a>
                )}
                <div className="flex gap-2.5">
                  <a 
                    href="tel:+919019324061"
                    className="flex-1 py-3 bg-brand-red hover:bg-brand-red-dark text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow-md focus:outline-none transition active:scale-95"
                  >
                    Call Inspector Now
                  </a>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="flex-1 py-3 bg-zinc-900 hover:bg-black text-white font-bold rounded-lg text-xs uppercase tracking-wider focus:outline-none transition hover:bg-zinc-800"
                  >
                    Close Message
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BACK TO TOP STICKY BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            aria-label="Back to Top"
            id="back-to-top-btn"
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            onClick={() => {
              const top = document.getElementById('top-hero');
              if (top) {
                top.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="fixed bottom-20 md:bottom-6 right-4 md:right-6 lg:right-8 z-40 bg-zinc-900 border border-zinc-800 hover:bg-brand-red hover:border-brand-red text-white hover:text-black p-3.5 rounded-full shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200 outline-none flex items-center justify-center group"
          >
            <ChevronUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* UNIQUE ACTION: DESKTOP CALL MODAL */}
      <AnimatePresence>
        {showDesktopCallModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full text-zinc-900 border border-zinc-150 shadow-2xl relative"
            >
              <button 
                onClick={() => {
                  setShowDesktopCallModal(false);
                  setCopyCodeSuccess(false);
                }}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-black transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#E5A913]/10 text-[#C69210]/95 rounded-xl flex items-center justify-center font-bold">
                  <Phone className="w-6 h-6 fill-transparent text-brand-red" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-black uppercase tracking-tight text-zinc-900">
                    Connect with Senior Inspector
                  </h4>
                  <p className="text-xs text-zinc-500 font-bold font-sans">
                    Master Building Demolition Hub Bangalore
                  </p>
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed font-sans mb-5 font-medium">
                You are visiting us via a desktop browser. Select your preferred high-speed connection mechanism to speak with our structural stability coordinators immediately:
              </p>

              <div className="space-y-3 pb-2 text-left">
                {/* Dial Callback Card */}
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-left flex items-center justify-between gap-4 font-sans">
                  <div className="space-y-0.5">
                    <span className="block text-[8px] uppercase font-mono tracking-wider font-bold text-zinc-400">INSTANT ANSWER CELL</span>
                    <span className="block font-display font-black text-lg text-zinc-900 tracking-tight">+91 90193 24061</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('+919019324061');
                      setCopyCodeSuccess(true);
                      setTimeout(() => setCopyCodeSuccess(false), 2000);
                    }}
                    className={`px-4 py-2.5 text-xs font-mono font-black uppercase rounded transition-all duration-150 ${
                      copyCodeSuccess 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-zinc-900 text-white hover:bg-black'
                    }`}
                  >
                    {copyCodeSuccess ? '✓ Copied' : 'Copy Number'}
                  </button>
                </div>

                {/* Submit query block */}
                <div className="p-4 bg-[#E5A913]/5 rounded-xl border border-[#E5A913]/20 text-left space-y-2 text-xs font-sans">
                  <span className="font-extrabold text-amber-700 flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
                    <Clock className="w-4 h-4 shrink-0 text-brand-red" />
                    <span>Want an immediate callback?</span>
                  </span>
                  <p className="text-zinc-600 text-[11px] leading-normal font-medium">
                    Submit the free site assessment form right below! Our regional supervisors monitor submissions in real-time and will phone you back in less than 15 minutes.
                  </p>
                  <button
                    onClick={() => {
                      setShowDesktopCallModal(false);
                      const element = document.getElementById('lead-form-anchor');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center gap-1 text-[#C69210] font-black underline hover:text-[#9e740b] transition text-[11px] uppercase cursor-pointer"
                  >
                    Go to estimation form <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-150 flex items-center justify-between text-[9px] text-zinc-400 font-mono uppercase tracking-wider font-bold">
                <span>⚡ Available 7:00 AM - 9:00 PM</span>
                <span>✓ Verified BBMP License</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UNIQUE ACTION: DESKTOP WHATSAPP MODAL */}
      <AnimatePresence>
        {showDesktopWhatsappModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full text-zinc-900 border border-zinc-150 shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setShowDesktopWhatsappModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-black transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 fill-white text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-black uppercase tracking-tight text-zinc-950">
                    Surgical WhatsApp Routing
                  </h4>
                  <p className="text-xs text-zinc-500 font-bold">
                    Interactive Regional Support Grid
                  </p>
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed mb-5 font-semibold">
                To connect you with the specific regional demolition engineer in your zone, please pick your nearest sector below to open a pre-filled chat with local scrap-credit calculations:
              </p>

              {/* Selector Matrix */}
              <div className="grid grid-cols-2 gap-2.5 mb-5 select-none text-left">
                {[
                  { r: 'South Bangalore', desc: 'Jayanagar / HSR / JP Layout', text: 'Hello, I want a quote for dismantling a residential property in South Bangalore.' },
                  { r: 'East Bangalore', desc: 'Whitefield / Indiranagar / KR Puram', text: 'Hello, I want an inspection for Commercial/Residential dismantling in East Bangalore.' },
                  { r: 'North Bangalore', desc: 'Hebbal / Yelahanka / Sahakara', text: 'Hello, please schedule a high-reach loader assessment for North Bangalore.' },
                  { r: 'Industrial Zones', desc: 'Electronic City / Peenya / Bommasandra', text: 'Hello, we require industrial warehouse / factory shredding quotes.' }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={`https://wa.me/919019324061?text=${encodeURIComponent(item.text)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowDesktopWhatsappModal(false)}
                    className="p-3 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-emerald-500 rounded-xl transition text-left space-y-1 block cursor-pointer group"
                  >
                    <span className="font-extrabold text-zinc-900 text-xs group-hover:text-emerald-600 transition flex items-center justify-between">
                      <span>{item.r}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold block leading-tight">{item.desc}</span>
                  </a>
                ))}
              </div>

              {/* Directly load general */}
              <a
                href="https://wa.me/919019324061?text=Hello%20Master%20Building%20Demolition%252C%20I%20would%2520like%2520to%2520request%2520a%2520site%252520inspection."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowDesktopWhatsappModal(false)}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md focus:outline-none transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white animate-bounce" />
                <span>Open General WhatsApp Workspace</span>
              </a>

              <div className="mt-5 pt-4 border-t border-zinc-150 flex justify-between items-center text-[10px] text-zinc-400 font-mono font-bold uppercase">
                <span>✓ INSTANT WHATSAPP WEB INTEGRATION</span>
                <span>⚡ TYPICAL REPLY: 2 MINS</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UNIQUE FLOATING DUAL CONVERSION PANEL DOCKED ON RIGHT FOR DESKTOP */}
      <div className="hidden lg:flex fixed right-4 top-[32%] z-50 flex-col gap-3 font-display select-none">
        <motion.div 
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          className="bg-black/95 backdrop-blur-md border border-[#E5A913]/30 p-3.5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col gap-3.5 w-[160px] relative overflow-hidden"
        >
          {/* Subtle glowing background accent light */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-[#E5A913]/20 blur-xl rounded-full pointer-events-none"></div>

          <div className="border-b border-zinc-800 pb-2 text-center relative z-10">
            <span className="inline-flex items-center gap-1 text-[8px] font-mono font-bold tracking-widest bg-zinc-900 text-[#E5A913] px-2 py-0.5 rounded-full uppercase border border-[#E5A913]/20 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              Live Online
            </span>
            <span className="block mt-1.5 text-[9.5px] font-black tracking-wider uppercase text-[#E5A913]">
              Direct Contact
            </span>
          </div>

          {/* Call Representative */}
          <a
            href="tel:+919019324061"
            onClick={handlePhoneClick}
            className="group/float flex items-center gap-2.5 p-2 bg-gradient-to-r from-zinc-900 to-zinc-950 hover:from-[#E5A913] hover:to-[#C69210] border border-zinc-850 hover:border-[#E5A913] rounded-xl transition-all duration-300 cursor-pointer text-left shadow-md hover:shadow-[#E5A913]/20 hover:scale-[1.05]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E5A913]/10 group-hover/float:bg-black/20 flex items-center justify-center shrink-0 transition-all duration-300">
              <Phone className="w-4 h-4 text-[#E5A913] group-hover/float:text-zinc-950 fill-transparent group-hover/float:fill-current" />
            </div>
            <div className="leading-tight">
              <span className="block text-[7.5px] font-mono font-bold text-zinc-400 group-hover/float:text-zinc-950/80 transition-colors uppercase leading-none">24/7 Hotline</span>
              <span className="block text-[10px] font-black text-white group-hover/float:text-zinc-950 transition-colors mt-0.5 uppercase tracking-tight">Call Now</span>
            </div>
          </a>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/919019324061?text=Hello%20Master%20Building%20Demolition%20Group%2C%20I%20would%20like%20to%20request%20a%20site%2520inspection."
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsappClick}
            className="group/float flex items-center gap-2.5 p-2 bg-gradient-to-r from-zinc-900 to-zinc-950 hover:from-emerald-600 hover:to-emerald-700 border border-zinc-850 hover:border-emerald-500 rounded-xl transition-all duration-300 cursor-pointer text-left shadow-md hover:shadow-emerald-500/20 hover:scale-[1.05]"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 group-hover/float:bg-black/20 flex items-center justify-center shrink-0 transition-all duration-300">
              <MessageSquare className="w-4 h-4 text-emerald-400 group-hover/float:text-white fill-transparent group-hover/float:fill-current" />
            </div>
            <div className="leading-tight">
              <span className="block text-[7.5px] font-mono font-bold text-emerald-500 group-hover/float:text-emerald-100/80 transition-colors uppercase leading-none">Response 2M</span>
              <span className="block text-[10px] font-black text-white group-hover/float:text-white transition-colors mt-0.5 uppercase tracking-tight">WhatsApp</span>
            </div>
          </a>

          {/* Professional safety compliance message */}
          <div className="text-[7.5px] text-zinc-500 text-center uppercase tracking-normal leading-tight border-t border-zinc-850/80 pt-2 font-mono">
            <span>Licensed BBMP Contractors</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

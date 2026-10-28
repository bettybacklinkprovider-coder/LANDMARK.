import React, { useState } from 'react';
import {
  Phone,
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
  Compass,
  Layers,
  Calendar,
  Sliders,
  Star,
  MapPin,
  ThumbsUp,
  MessageSquarePlus,
  Copy,
  Camera,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  LANDMARK_PROPERTIES,
  UPLOADED_LANDMARK_PHOTOS,
  FAISALABAD_ENCLAVES,
  VERIFIED_REVIEWS,
  REVIEW_TOPICS,
  LandmarkProperty,
  LandmarkReview,
  LandmarkPhoto,
  getDreemHeroVillaSvg
} from './data/dreemStudioData';

type CategoryFilter =
  | 'All'
  | 'Model City 1'
  | 'Orchard Homes'
  | 'Commercial Plots'
  | 'Turnkey Houses';

type PhotoTab = 'All' | 'Inside' | 'By owner';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeEnclaveId, setActiveEnclaveId] = useState<string | null>(null);
  const [activePropertyModal, setActivePropertyModal] =
    useState<LandmarkProperty | null>(null);
  const [activePropertyPhotoIdx, setActivePropertyPhotoIdx] = useState<number>(0);
  const [consultationModalOpen, setConsultationModalOpen] = useState<boolean>(false);
  const [aboutExpanded, setAboutExpanded] = useState<boolean>(false);
  const [addressCopied, setAddressCopied] = useState<boolean>(false);

  // Photos & Videos Section State (All | Inside | By owner)
  const [selectedPhotoTab, setSelectedPhotoTab] = useState<PhotoTab>('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<LandmarkPhoto | null>(null);

  // Reviews State
  const [reviewsList, setReviewsList] = useState<LandmarkReview[]>(VERIFIED_REVIEWS);
  const [selectedReviewTopic, setSelectedReviewTopic] = useState<string>('All');
  const [likedReviewIds, setLikedReviewIds] = useState<string[]>([]);
  const [writeReviewOpen, setWriteReviewOpen] = useState<boolean>(false);
  const [newReviewerName, setNewReviewerName] = useState<string>('');
  const [newReviewerRole, setNewReviewerRole] = useState<string>(
    'Home Buyer · Model City 1'
  );
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewText, setNewReviewText] = useState<string>('');
  const [reviewFormError, setReviewFormError] = useState<string>('');

  // Interactive Faisalabad Plot & Construction Cost Estimator State
  const [plotMarla, setPlotMarla] = useState<number>(10);
  const [constructionGrade, setConstructionGrade] = useState<
    'grey' | 'turnkey-a' | 'designer'
  >('turnkey-a');

  // Consultation / Site Visit Form State
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [inquiryType, setInquiryType] = useState<string>(
    'Buy House / Plot in Model City 1'
  );
  const [preferredTime, setPreferredTime] = useState<string>(
    'Today Evening (On-Ground Visit at 154C Chak 208 Rd)'
  );
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  const heroVillaUri = getDreemHeroVillaSvg();

  const filteredProperties =
    selectedCategory === 'All'
      ? LANDMARK_PROPERTIES
      : LANDMARK_PROPERTIES.filter((p) => p.category === selectedCategory);

  const filteredPhotos =
    selectedPhotoTab === 'All'
      ? UPLOADED_LANDMARK_PHOTOS
      : UPLOADED_LANDMARK_PHOTOS.filter((p) => p.category === selectedPhotoTab);

  const filteredReviews =
    selectedReviewTopic === 'All'
      ? reviewsList
      : reviewsList.filter((r) => r.tags.includes(selectedReviewTopic));

  // Faisalabad Construction Estimator Math (in PKR)
  const coveredSqFt = plotMarla * 340;
  const ratePerSqFtPkr =
    constructionGrade === 'designer'
      ? 6800
      : constructionGrade === 'turnkey-a'
      ? 5400
      : 3200;
  const estConstructionCostPkr = coveredSqFt * ratePerSqFtPkr;
  const estPlotCostPkr = plotMarla * 1450000;
  const totalProjectCrore = (
    (estConstructionCostPkr + estPlotCostPkr) /
    10000000
  ).toFixed(2);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(
      '154C, Chak 208 Rd, Model City 1 Nasar Ullah Khan Town, Faisalabad, 38000, Pakistan (C4MV+G6)'
    );
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2500);
  };

  const handleOpenPropertyModal = (property: LandmarkProperty) => {
    setActivePropertyPhotoIdx(0);
    setActivePropertyModal(property);
  };

  const handleToggleLikeReview = (id: string) => {
    if (likedReviewIds.includes(id)) {
      setLikedReviewIds((prev) => prev.filter((item) => item !== id));
      setReviewsList((prev) =>
        prev.map((r) => (r.id === id ? { ...r, likes: r.likes - 1 } : r))
      );
    } else {
      setLikedReviewIds((prev) => [...prev, id]);
      setReviewsList((prev) =>
        prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
      );
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim()) {
      setReviewFormError('Please enter your name.');
      return;
    }
    if (!newReviewText.trim()) {
      setReviewFormError('Please share your experience with LandMark Real Estate.');
      return;
    }
    const created: LandmarkReview = {
      id: `rev-${Date.now()}`,
      author: newReviewerName.trim(),
      badge: `1 review · ${newReviewerRole}`,
      timeAgo: 'Just now',
      rating: newReviewRating,
      text: newReviewText.trim(),
      likes: 1,
      ownerResponse: {
        timeAgo: 'Just now',
        text: 'Thanks for your Feedback...'
      },
      tags: ['professional team', 'real estate industry', 'work', 'behaviour']
    };
    setReviewsList((prev) => [created, ...prev]);
    setNewReviewerName('');
    setNewReviewText('');
    setReviewFormError('');
    setWriteReviewOpen(false);
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!clientPhone.trim()) {
      setFormError('Please enter your mobile / WhatsApp number.');
      return;
    }
    setFormError('');
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F2] text-[#141414] flex flex-col selection:bg-[#141414] selection:text-white">
      {/* ================= STRICT 3-ZONE TOP BAR CONTRACT ================= */}
      <header className="sticky top-0 z-40 bg-[#F4F4F2]/90 backdrop-blur-md border-b border-black/[0.06]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-14 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single Line) */}
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 text-[#141414] whitespace-nowrap shrink-0"
          >
            <span className="w-7 h-7 rounded-full border-[3.5px] border-[#141414] border-r-transparent flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#141414]" />
            </span>
            <span className="font-condensed text-xl font-bold tracking-tight uppercase">
              LANDMARK.
            </span>
          </a>

          {/* Zone 2: 5 Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A4A46]"
          >
            <a
              href="#top"
              className="text-[#141414] font-semibold hover:text-black transition-colors whitespace-nowrap shrink-0"
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-[#141414] transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#properties"
              className="hover:text-[#141414] transition-colors whitespace-nowrap shrink-0"
            >
              Properties
            </a>
            <a
              href="#photos"
              className="hover:text-[#141414] transition-colors whitespace-nowrap shrink-0"
            >
              Photos (10)
            </a>
            <a
              href="#reviews"
              className="hover:text-[#141414] transition-colors whitespace-nowrap shrink-0"
            >
              Reviews (4.9★)
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action (24/7 Phone & Site Visit Button) */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                setBookingSuccess(false);
                setConsultationModalOpen(true);
              }}
              className="group inline-flex items-center gap-3 px-3.5 py-2 rounded-full bg-white border border-black/10 hover:border-black/30 shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full bg-[#E8E8E3] group-hover:bg-[#141414] group-hover:text-white transition-colors flex items-center justify-center text-[#141414]">
                <Phone className="w-3.5 h-3.5" />
              </span>
              <span className="text-left pr-1">
                <span className="block text-[10px] font-medium text-[#6B6B66] leading-none">
                  Open 24 Hours · Faisalabad
                </span>
                <span className="block text-xs font-bold text-[#141414] tabular-nums mt-0.5">
                  +92 301 7078008
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* ================= SECTION 1: HERO & OVERLAPPING 'LANDMARK ESTATES' DISPLAY ================= */}
        <section className="relative overflow-hidden pt-4 sm:pt-8 pb-6">
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-14">
            <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center min-h-[480px] sm:min-h-[600px]">
              {/* Left Column: Faisalabad Mission Copy & Black CTA */}
              <div className="lg:col-span-4 z-20 space-y-5 pt-4 lg:pt-0 lg:pb-24">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#141414]">
                  <span>4.9 ★ (50 Reviews)</span>
                  <span aria-hidden="true">·</span>
                  <span>Model City 1, Faisalabad</span>
                </div>

                <p className="text-base sm:text-[17px] text-[#333330] leading-[1.6] max-w-[300px] font-medium">
                  From Orchard Homes & Model City 1 plots to ready family houses on Chak 208 Rd, our educated team guides you on actual grounds.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#properties"
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-[#141414] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2B2B2B] transition-colors whitespace-nowrap shrink-0 shadow-sm"
                  >
                    <span>EXPLORE OUR WORK</span>
                    <span className="w-5 h-5 rounded-full bg-white text-[#141414] flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                    </span>
                  </a>
                </div>
              </div>

              {/* Right Column: Cantilevered Wood & Glass Villa Illustration */}
              <div className="lg:col-span-8 relative -mt-6 sm:-mt-10 lg:mt-0 lg:-mr-10">
                <div className="relative w-full aspect-[1100/760]">
                  <img
                    src={heroVillaUri}
                    alt="Modern double-story cantilevered residence developed by LandMark Real Estate Faisalabad"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain select-none"
                  />
                </div>
              </div>

              {/* Monumental Overlapping 'LANDMARK ESTATES' Display Headline Across Bottom of Hero */}
              <div className="lg:col-span-12 z-30 -mt-14 sm:-mt-28 lg:-mt-36 pointer-events-none select-none">
                <h1 className="font-condensed font-bold uppercase tracking-[-0.02em] leading-[0.88] text-[13vw] sm:text-[12vw] lg:text-[138px] xl:text-[156px] flex flex-wrap items-baseline justify-between">
                  <span className="text-[#141414]">LANDMARK</span>
                  <span className="text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
                    ESTATES
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: SLANTED DARK CHARCOAL FAISALABAD ENCLAVES BAND ================= */}
        <section className="relative z-20 my-2 sm:my-4">
          <div className="bg-[#2C2C2C] text-white -rotate-[1.35deg] scale-[1.02] shadow-lg border-y border-white/10">
            <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 py-7 sm:py-9">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.08em] text-white/85 max-w-xs leading-relaxed">
                  WHERE ARCHITECTURE MEETS ON-GROUND PROPERTY DEALING IN FAISALABAD
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 items-center">
                  {FAISALABAD_ENCLAVES.map((enclave, idx) => {
                    const isSelected = activeEnclaveId === enclave.id;
                    return (
                      <button
                        key={enclave.id}
                        type="button"
                        onClick={() =>
                          setActiveEnclaveId(isSelected ? null : enclave.id)
                        }
                        className={`group flex items-center gap-2.5 text-left transition-opacity cursor-pointer ${
                          isSelected ? 'opacity-100' : 'opacity-75 hover:opacity-100'
                        }`}
                      >
                        <span className="w-8 h-8 rounded-md bg-white/10 border border-white/15 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#141414] transition-colors">
                          {idx === 0 && <Compass className="w-4 h-4" />}
                          {idx === 1 && (
                            <span className="font-condensed font-bold text-sm">A</span>
                          )}
                          {idx === 2 && <Layers className="w-4 h-4" />}
                          {idx === 3 && (
                            <span className="font-condensed font-bold text-sm">▲</span>
                          )}
                          {idx === 4 && (
                            <span className="font-condensed font-bold text-sm">T</span>
                          )}
                        </span>
                        <div className="min-w-0">
                          <span className="block font-condensed text-sm font-bold tracking-wider uppercase text-white truncate">
                            {enclave.name}
                          </span>
                          <span className="block text-[10px] text-white/60 truncate">
                            {enclave.sub}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {activeEnclaveId && (
                <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/90">
                  <span>
                    <strong>
                      {
                        FAISALABAD_ENCLAVES.find((e) => e.id === activeEnclaveId)
                          ?.name
                      }
                      :
                    </strong>{' '}
                    {
                      FAISALABAD_ENCLAVES.find((e) => e.id === activeEnclaveId)
                        ?.specialty
                    }
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveEnclaveId(null)}
                    className="text-white/60 hover:text-white underline ml-4"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: ABOUT US (STAGGERED REAL PHOTOS & METRICS) ================= */}
        <section id="about" className="py-16 sm:py-24">
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Left Column (4 cols) */}
              <div className="lg:col-span-4 space-y-5">
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#141414]">
                  • ABOUT US
                </div>

                <h2 className="font-condensed text-3xl sm:text-4xl lg:text-[40px] font-bold uppercase leading-[1.08] tracking-tight text-[#141414]">
                  WE ARE EXPERT IN PROPERTY DEALING & DEVELOPMENT!
                </h2>

                <p className="text-sm sm:text-[15px] text-[#555550] leading-relaxed">
                  Located at 154C, Chak 208 Rd, Model City 1, Nasar Ullah Khan Town, Faisalabad, we specialize in Orchard Homes & Model City 1 plots, ready family houses, and B2B dealer network partnerships — guiding clients on actual grounds 24 hours a day.
                </p>

                {aboutExpanded && (
                  <div className="p-4 rounded-xl bg-white border border-black/[0.08] text-xs text-[#444440] space-y-2.5 leading-relaxed">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#141414] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#141414]">
                          154C, Chak 208 Rd, Model City 1, Nasar Ullah Khan Town, Faisalabad, 38000, Pakistan
                        </p>
                        <p className="text-[#5C5C58] font-mono mt-0.5">
                          Plus Code: C4MV+G6 Faisalabad, Pakistan · Open 24 Hours
                        </p>
                      </div>
                    </div>
                    <div className="pt-1 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#F4F4F2] hover:bg-[#E5E4DF] text-[#141414] font-semibold transition-colors cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>
                          {addressCopied ? 'Address Copied!' : 'Copy Office Address'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setAboutExpanded(!aboutExpanded)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#141414] border-b-2 border-[#141414] pb-1 hover:opacity-75 transition-opacity cursor-pointer"
                  >
                    <span>
                      {aboutExpanded ? 'HIDE OFFICE DETAILS' : 'MORE ABOUT US'}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Center Column (6 cols): Staggered Dual Real Uploaded Photos */}
              <div className="lg:col-span-6 relative flex items-end justify-center gap-4 sm:gap-6 py-4">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 sm:left-10 top-6 w-56 h-56 sm:w-72 sm:h-72 rounded-full border-[36px] border-[#E5E4DF] border-r-transparent -rotate-12"
                />

                {/* Left Smaller Card: Uploaded Double-Story House Night Elevation */}
                <div
                  onClick={() => setLightboxPhoto(UPLOADED_LANDMARK_PHOTOS[3])}
                  className="group relative z-10 w-[42%] max-w-[215px] aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-black/[0.08] bg-[#181818] cursor-pointer"
                >
                  <img
                    src="/assets/aistudio/unnamed__3__49183241.jpg"
                    alt="Double-Story Residence Nocturnal Front Elevation in Model City 1"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent text-white text-[10px] font-medium">
                    Model City 1 House Elevation
                  </div>
                </div>

                {/* Right Taller Vertical Card: Uploaded Main Boulevard & Mosque Aerial */}
                <div
                  onClick={() => setLightboxPhoto(UPLOADED_LANDMARK_PHOTOS[1])}
                  className="group relative z-10 w-[56%] max-w-[310px] aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-black/[0.08] bg-[#181818] cursor-pointer"
                >
                  <img
                    src="/assets/aistudio/unnamed_66aee140.jpg"
                    alt="Main Boulevard, Grand Mosque & Developed Villas on Chak 208 Rd"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-xs font-medium">
                    Main Boulevard & Mosque Aerial
                  </div>
                </div>
              </div>

              {/* Right Column (2 cols): Vertical Stacked Quantitative Proof */}
              <div className="lg:col-span-2 flex flex-row lg:flex-col justify-between lg:justify-center gap-6 lg:gap-8 lg:pl-4 border-t lg:border-t-0 lg:border-l border-black/10 pt-6 lg:pt-0">
                <div>
                  <span className="block font-condensed text-3xl sm:text-4xl font-bold text-[#141414] tabular-nums">
                    4.9★
                  </span>
                  <span className="mt-1 block text-xs text-[#5C5C58] leading-snug">
                    50 verified
                    <br />
                    Google reviews
                  </span>
                </div>

                <div>
                  <span className="block font-condensed text-3xl sm:text-4xl font-bold text-[#141414] tabular-nums">
                    24/7
                  </span>
                  <span className="mt-1 block text-xs text-[#5C5C58] leading-snug">
                    Open 24 hours
                    <br />
                    Chak 208 Rd
                  </span>
                </div>

                <div>
                  <span className="block font-condensed text-3xl sm:text-4xl font-bold text-[#141414] tabular-nums">
                    100%
                  </span>
                  <span className="mt-1 block text-xs text-[#5C5C58] leading-snug">
                    Actual-ground
                    <br />
                    verified deals
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: EXPLORE OUR NEWEST PROJECTS (WITH REAL PHOTOS) ================= */}
        <section
          id="properties"
          className="py-16 sm:py-24 bg-white border-t border-black/[0.06]"
        >
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-14 space-y-12">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#5C5C58]">
                <span>• ON-GROUND PORTFOLIO</span>
              </div>
              <h2 className="font-condensed text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#141414] max-w-md leading-[1.05]">
                EXPLORE OUR NEWEST PROJECTS
              </h2>
            </div>

            {/* Interactive Category Filter Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {(
                [
                  'All',
                  'Orchard Homes',
                  'Turnkey Houses',
                  'Commercial Plots',
                  'Model City 1'
                ] as CategoryFilter[]
              ).map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#141414] text-white shadow-xs'
                        : 'bg-[#F4F4F2] text-[#5C5C58] hover:text-[#141414]'
                    }`}
                  >
                    {cat === 'All' ? 'All Properties (04)' : cat}
                  </button>
                );
              })}
            </div>

            {/* 2-Column Property Cards Using Real Uploaded Photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProperties.map((property) => (
                <article
                  key={property.id}
                  onClick={() => handleOpenPropertyModal(property)}
                  className="group rounded-2xl bg-[#F4F4F2] border border-black/[0.08] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-[#181818] overflow-hidden">
                      <img
                        src={property.imageUri}
                        alt={property.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#141414]/85 text-white text-[11px] font-mono font-medium">
                        {property.index} · {property.plotSize}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/75 text-white text-[11px] font-medium flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5" />
                        <span>{property.galleryPhotos.length} Photos</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#5C5C58]">
                        <span>{property.location}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {property.areaSqFt.toLocaleString()} sq.ft.
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-condensed text-2xl sm:text-3xl font-bold uppercase text-[#141414]">
                          {property.title}
                        </h3>
                        <span className="font-mono text-base font-bold text-[#141414] tabular-nums shrink-0">
                          {property.pricePkr}
                        </span>
                      </div>

                      <p className="text-sm text-[#555550] leading-relaxed">
                        {property.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 py-4 border-t border-black/[0.08] bg-white/60 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#141414]">
                    <span>Inspect All {property.galleryPhotos.length} Photos & Specs</span>
                    <span className="w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 5: PHOTOS & VIDEOS GALLERY (ALL · INSIDE · BY OWNER) ================= */}
        <section
          id="photos"
          className="py-16 sm:py-24 bg-[#F4F4F2] border-t border-black/[0.08]"
        >
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-14 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#5C5C58]">
                  • ACTUAL ON-GROUND GALLERY
                </span>
                <h2 className="mt-1 font-condensed text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#141414]">
                  PHOTOS & VIDEOS
                </h2>
                <p className="mt-1 text-sm text-[#555550]">
                  Verified photographs of Orchard Homes entrance gate, main boulevard, water reservoir, and Model City 1 house interiors.
                </p>
              </div>

              {/* Filter Tabs Matching Google Maps: All | Inside | By owner */}
              <div className="inline-flex items-center p-1 rounded-xl bg-white border border-black/10 self-start sm:self-auto">
                {(
                  [
                    { id: 'All', label: `All (${UPLOADED_LANDMARK_PHOTOS.length})` },
                    {
                      id: 'Inside',
                      label: `Inside (${
                        UPLOADED_LANDMARK_PHOTOS.filter((p) => p.category === 'Inside')
                          .length
                      })`
                    },
                    {
                      id: 'By owner',
                      label: `By owner (${
                        UPLOADED_LANDMARK_PHOTOS.filter(
                          (p) => p.category === 'By owner'
                        ).length
                      })`
                    }
                  ] as { id: PhotoTab; label: string }[]
                ).map((tab) => {
                  const active = selectedPhotoTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedPhotoTab(tab.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#141414] text-white shadow-xs'
                          : 'text-[#5C5C58] hover:text-[#141414]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 10-Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setLightboxPhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden bg-[#181818] border border-black/10 aspect-[4/3] cursor-pointer shadow-xs hover:shadow-lg transition-all"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-semibold uppercase tracking-wider">
                      {photo.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[10px] text-white/75 font-mono">
                      {photo.locationTag}
                    </p>
                    <h3 className="text-xs font-bold leading-snug line-clamp-2 mt-0.5">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 6: VERIFIED REVIEWS & DEALER NETWORK FEEDBACK (4.9★ · 50 REVIEWS) ================= */}
        <section
          id="reviews"
          className="py-16 sm:py-24 bg-white border-t border-black/[0.08]"
        >
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-14 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F4F4F2] rounded-2xl p-6 sm:p-10 border border-black/[0.08]">
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#5C5C58]">
                  • REVIEW SUMMARY
                </span>
                <h2 className="font-condensed text-3xl sm:text-4xl font-bold uppercase text-[#141414]">
                  LANDMARK REAL ESTATE & DEVELOPERS FAISALABAD
                </h2>
                <p className="text-xs sm:text-sm text-[#555550]">
                  154C, Chak 208 Rd, Model City 1, Nasar Ullah Khan Town, Faisalabad, 38000 · Plus Code: C4MV+G6
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setWriteReviewOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#141414] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2C2C2C] transition-colors cursor-pointer"
                  >
                    <MessageSquarePlus className="w-4 h-4" />
                    <span>Write a Review</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-2 border-y lg:border-y-0 lg:border-x border-black/10 py-6 lg:py-0 lg:px-8">
                {[
                  { stars: 5, pct: '94%' },
                  { stars: 4, pct: '6%' },
                  { stars: 3, pct: '0%' },
                  { stars: 2, pct: '0%' },
                  { stars: 1, pct: '0%' }
                ].map((row) => (
                  <div key={row.stars} className="flex items-center gap-3 text-xs">
                    <span className="font-mono font-semibold w-3 tabular-nums">
                      {row.stars}
                    </span>
                    <div className="flex-1 h-2.5 rounded-full bg-black/10 overflow-hidden">
                      <div
                        className="h-full bg-[#141414] rounded-full"
                        style={{ width: row.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-3 flex flex-col items-start lg:items-center justify-center text-left lg:text-center">
                <span className="font-condensed text-6xl font-bold text-[#141414] tabular-nums">
                  4.9
                </span>
                <div className="flex items-center gap-1 text-amber-500 my-1.5">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-semibold text-[#5C5C58] tabular-nums">
                  50 reviews
                </span>
              </div>
            </div>

            {/* Interactive Topic Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C5C58] mr-2">
                Sort / Filter Reviews:
              </span>
              {REVIEW_TOPICS.map((topic) => {
                const active = selectedReviewTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedReviewTopic(topic.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#141414] text-white'
                        : 'bg-[#F4F4F2] border border-black/10 text-[#4A4A46] hover:border-black/30'
                    }`}
                  >
                    {topic.label} ({topic.count})
                  </button>
                );
              })}
            </div>

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredReviews.map((rev) => {
                const isLiked = likedReviewIds.includes(rev.id);
                return (
                  <div
                    key={rev.id}
                    className="bg-[#F4F4F2] rounded-2xl p-6 border border-black/[0.08] flex flex-col justify-between space-y-5 shadow-xs"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#141414] text-white font-condensed font-bold text-base flex items-center justify-center shrink-0">
                            {rev.author.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-[#141414]">
                              {rev.author}
                            </h3>
                            <p className="text-xs text-[#6B6B66]">{rev.badge}</p>
                          </div>
                        </div>
                        <span className="text-[11px] text-[#6B6B66] whitespace-nowrap">
                          {rev.timeAgo}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      <p className="text-sm text-[#333330] leading-relaxed">
                        “{rev.text}”
                      </p>

                      {rev.photoUrl && (
                        <div className="pt-1">
                          <img
                            src={rev.photoUrl}
                            alt={`Attached by ${rev.author}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-32 object-cover rounded-xl border border-black/10"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 pt-3 border-t border-black/[0.08]">
                      {rev.ownerResponse && (
                        <div className="p-3 rounded-xl bg-white text-xs space-y-1">
                          <div className="flex items-center justify-between font-semibold text-[#141414]">
                            <span>Response from the owner</span>
                            <span className="text-[10px] font-normal text-[#6B6B66]">
                              {rev.ownerResponse.timeAgo}
                            </span>
                          </div>
                          <p className="text-[#4A4A46]">{rev.ownerResponse.text}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-[#5C5C58]">
                        <button
                          type="button"
                          onClick={() => handleToggleLikeReview(rev.id)}
                          className={`inline-flex items-center gap-1.5 font-semibold transition-colors cursor-pointer ${
                            isLiked
                              ? 'text-[#141414]'
                              : 'text-[#6B6B66] hover:text-[#141414]'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Like ({rev.likes})</span>
                        </button>
                        <span>Verified Google Review</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= SECTION 7: ON-GROUND SERVICES & FAISALABAD COST CALCULATOR ================= */}
        <section
          id="services"
          className="py-16 sm:py-24 bg-[#F4F4F2] border-t border-black/[0.08]"
        >
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#5C5C58]">
                    • WHY CHOOSE LANDMARK FAISALABAD
                  </span>
                  <h2 className="mt-2 font-condensed text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#141414]">
                    DIFFERENT WORKING STYLE & EDUCATED TEAM
                  </h2>
                </div>

                <div className="divide-y divide-black/10 border-y border-black/10">
                  {[
                    {
                      num: '01.',
                      title: 'Actual-Ground Property Guidance & Verification',
                      desc: 'Unlike speculative file trading, our educated advisors verify physical plot boundaries, street width, utilities, and FDA/Registry clearance on actual grounds.',
                      deliverable: 'Model City 1 & Orchard Homes'
                    },
                    {
                      num: '02.',
                      title: 'Turnkey Architectural Construction & Development',
                      desc: 'From 5 Marla family homes to 1 Kanal designer villas, we build with A+ grade brick, full wooden wardrobes, fitted kitchens, and transparent billing.',
                      deliverable: 'Grey + Turnkey A+ Packages'
                    },
                    {
                      num: '03.',
                      title: 'Trusted B2B Dealer Network & Property Management',
                      desc: 'Long-term B2B dealer partnerships across Faisalabad plus 24-hour property management for local and overseas Pakistani investors.',
                      deliverable: 'Open 24 Hours · +92 301 7078008'
                    }
                  ].map((srv) => (
                    <div
                      key={srv.num}
                      className="py-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <h3 className="font-condensed text-xl sm:text-2xl font-bold uppercase text-[#141414]">
                          {srv.num} {srv.title}
                        </h3>
                        <p className="text-sm text-[#555550] leading-relaxed">
                          {srv.desc}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-medium text-[#5C5C58] whitespace-nowrap shrink-0">
                        {srv.deliverable}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 Cols: Interactive Faisalabad Plot + House Cost Calculator */}
              <div className="lg:col-span-5 bg-[#181818] text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/60">
                      Model City 1 · Chak 208 Rd Estimator
                    </span>
                    <h3 className="mt-1 font-condensed text-2xl font-bold uppercase">
                      PLOT & HOUSE COST CALCULATOR
                    </h3>
                  </div>
                  <Sliders className="w-5 h-5 text-white/70" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70">Select Plot Size (Marla)</span>
                    <span className="font-mono font-semibold text-white tabular-nums">
                      {plotMarla} Marla ({coveredSqFt.toLocaleString()} Sq. Ft. Covered)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={20}
                    step={1}
                    value={plotMarla}
                    onChange={(e) => setPlotMarla(Number(e.target.value))}
                    className="w-full accent-white cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/40 font-mono">
                    <span>3 Marla</span>
                    <span>10 Marla</span>
                    <span>20 Marla (1 Kanal)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-xs text-white/70">
                    Construction & Finishing Package
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'grey', label: 'Grey Structure', rate: 'PKR 3,200/sf' },
                      { id: 'turnkey-a', label: 'Turnkey A+', rate: 'PKR 5,400/sf' },
                      { id: 'designer', label: 'Spanish Villa', rate: 'PKR 6,800/sf' }
                    ].map((tier) => {
                      const active = constructionGrade === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() =>
                            setConstructionGrade(
                              tier.id as 'grey' | 'turnkey-a' | 'designer'
                            )
                          }
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'bg-white text-[#141414] border-white font-semibold'
                              : 'bg-white/5 border-white/15 text-white/80 hover:border-white/40'
                          }`}
                        >
                          <span className="block text-xs">{tier.label}</span>
                          <span className="block font-mono text-[10px] opacity-75 tabular-nums mt-0.5">
                            {tier.rate}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.06] border border-white/10 space-y-3 text-sm">
                  <div className="flex justify-between text-white/75">
                    <span>Est. Plot Cost (Chak 208 Rd Avg)</span>
                    <span className="font-mono text-white tabular-nums">
                      PKR {(estPlotCostPkr / 100000).toFixed(1)} Lakhs
                    </span>
                  </div>
                  <div className="flex justify-between text-white/75">
                    <span>Est. House Construction Cost</span>
                    <span className="font-mono text-white tabular-nums">
                      PKR {(estConstructionCostPkr / 100000).toFixed(1)} Lakhs
                    </span>
                  </div>
                  <div className="pt-3 border-t border-white/15 flex justify-between items-baseline">
                    <span className="font-bold uppercase tracking-wider text-xs">
                      Estimated Complete Budget
                    </span>
                    <span className="font-condensed text-2xl font-bold text-white tabular-nums">
                      PKR {totalProjectCrore} Crore
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setBookingSuccess(false);
                    setConsultationModalOpen(true);
                  }}
                  className="w-full py-3.5 px-5 rounded-xl bg-white text-[#141414] font-bold text-xs uppercase tracking-wider hover:bg-[#E5E5E0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule On-Ground Site Visit</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= QUIET ARCHITECTURAL FOOTER ================= */}
      <footer id="contact" className="bg-[#181818] text-white border-t border-white/10">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-14 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 text-xs text-white/70">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-white">
              <span className="w-5 h-5 rounded-full border-2 border-white border-r-transparent" />
              <span className="font-condensed text-lg font-bold tracking-tight uppercase">
                LANDMARK REAL ESTATE & DEVELOPERS FAISALABAD
              </span>
            </div>
            <p>
              154C, Chak 208 Rd, Model City 1, Nasar Ullah Khan Town, Faisalabad, 38000, Pakistan
            </p>
            <p className="font-mono text-white/90">
              Phone: +92 301 7078008 · Plus Code: C4MV+G6 Faisalabad · Open 24 Hours
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#top" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#properties" className="hover:text-white transition-colors">
              Properties
            </a>
            <a href="#photos" className="hover:text-white transition-colors">
              Photos (10)
            </a>
            <a href="#reviews" className="hover:text-white transition-colors">
              Reviews (4.9★)
            </a>
            <span>© 2026 LandMark Real Estate & Developers</span>
          </div>
        </div>
      </footer>

      {/* ================= MODAL 1: PROPERTY DOSSIER WITH MULTI-PHOTO GALLERY ================= */}
      {activePropertyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#F4F4F2] text-[#141414] w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="relative aspect-[16/9] bg-[#181818]">
              <img
                src={
                  activePropertyModal.galleryPhotos[activePropertyPhotoIdx] ||
                  activePropertyModal.imageUri
                }
                alt={activePropertyModal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActivePropertyModal(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-[#141414] text-white hover:bg-black/80 transition-colors cursor-pointer"
                aria-label="Close property dossier"
              >
                <X className="w-4 h-4" />
              </button>

              {activePropertyModal.galleryPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActivePropertyPhotoIdx((prev) =>
                        prev === 0
                          ? activePropertyModal.galleryPhotos.length - 1
                          : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 text-white hover:bg-black cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActivePropertyPhotoIdx((prev) =>
                        prev === activePropertyModal.galleryPhotos.length - 1
                          ? 0
                          : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 text-white hover:bg-black cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {activePropertyModal.galleryPhotos.length > 1 && (
              <div className="px-6 pt-4 flex items-center gap-2 overflow-x-auto">
                {activePropertyModal.galleryPhotos.map((imgUrl, idx) => (
                  <button
                    key={imgUrl}
                    type="button"
                    onClick={() => setActivePropertyPhotoIdx(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer ${
                      activePropertyPhotoIdx === idx
                        ? 'border-[#141414]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`View ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-black/10 pb-4">
                <div>
                  <span className="text-xs font-mono text-[#5C5C58]">
                    {activePropertyModal.plotSize} · {activePropertyModal.location}
                  </span>
                  <h3 className="mt-1 font-condensed text-3xl font-bold uppercase text-[#141414]">
                    {activePropertyModal.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-[#5C5C58]">Asking Demand</span>
                  <span className="font-mono text-xl font-bold text-[#141414] tabular-nums">
                    {activePropertyModal.pricePkr}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#333330] leading-relaxed">
                {activePropertyModal.architecturalBrief}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activePropertyModal.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 text-xs font-medium text-[#141414]"
                  >
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C5C58]">
                  On-Ground Specifications & Dimensions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activePropertyModal.rooms.map((rm) => (
                    <div
                      key={rm.name}
                      className="p-4 rounded-xl bg-white border border-black/[0.08] space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs text-[#5C5C58]">
                        <span>{rm.level}</span>
                        <span className="font-mono font-semibold text-[#141414] tabular-nums">
                          {rm.dimensions} ({rm.sqft} sq.ft)
                        </span>
                      </div>
                      <p className="font-semibold text-sm text-[#141414]">{rm.name}</p>
                      <p className="text-xs text-[#5C5C58]">{rm.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/10">
                <div className="text-xs text-[#5C5C58]">
                  <strong className="text-[#141414]">
                    {activePropertyModal.verificationNote}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActivePropertyModal(null);
                    setBookingSuccess(false);
                    setConsultationModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#141414] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2C2C2C] transition-colors cursor-pointer"
                >
                  Book On-Ground Visit (+92 301 7078008)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: LIGHTBOX PHOTO VIEWER ================= */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="bg-[#181818] text-white w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                aria-label="Close photo viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span className="uppercase font-bold text-white">
                    {lightboxPhoto.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{lightboxPhoto.locationTag}</span>
                </div>
                <h3 className="mt-1 font-condensed text-2xl font-bold uppercase">
                  {lightboxPhoto.title}
                </h3>
                <p className="mt-1 text-xs text-white/75">
                  {lightboxPhoto.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLightboxPhoto(null);
                  setBookingSuccess(false);
                  setConsultationModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-lg bg-white text-[#141414] text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer"
              >
                Inquire About Property
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: WRITE A REVIEW ================= */}
      {writeReviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#F4F4F2] text-[#141414] w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#5C5C58]">
                  LandMark Real Estate & Developers
                </span>
                <h3 className="mt-1 font-condensed text-2xl font-bold uppercase">
                  SHARE YOUR EXPERIENCE
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setWriteReviewOpen(false)}
                className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C5C58] mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newReviewerName}
                  onChange={(e) => setNewReviewerName(e.target.value)}
                  placeholder="e.g., Tariq Mehmood"
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C5C58] mb-1.5">
                    Client / Dealer Role
                  </label>
                  <select
                    value={newReviewerRole}
                    onChange={(e) => setNewReviewerRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-black/15 text-sm"
                  >
                    <option value="Home Buyer · Model City 1">
                      Home Buyer · Model City 1
                    </option>
                    <option value="Dealer Network Partner">
                      Dealer Network Partner
                    </option>
                    <option value="Plot Investor · Orchard Homes">
                      Plot Investor · Orchard Homes
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C5C58] mb-1.5">
                    Star Rating
                  </label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-black/15 text-sm"
                  >
                    <option value={5}>★★★★★ (5/5 Excellent)</option>
                    <option value={4}>★★★★☆ (4/5 Very Good)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C5C58] mb-1.5">
                  Your Review
                </label>
                <textarea
                  rows={3}
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Share how our team guided you on actual grounds..."
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-[#141414]"
                />
              </div>

              {reviewFormError && (
                <p className="text-xs font-semibold text-red-600">
                  {reviewFormError}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setWriteReviewOpen(false)}
                  className="px-4 py-2 rounded-lg border border-black/15 text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#141414] text-white text-xs font-bold uppercase cursor-pointer"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 4: 24/7 OFFICE VISIT & DEALER INQUIRY ================= */}
      {consultationModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#F4F4F2] text-[#141414] w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#5C5C58]">
                  154C, Chak 208 Rd, Model City 1, Faisalabad
                </span>
                <h3 className="mt-1 font-condensed text-2xl sm:text-3xl font-bold uppercase">
                  {bookingSuccess
                    ? 'SITE VISIT CONFIRMED'
                    : 'BOOK ON-GROUND VISIT OR DEALER CALL'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setConsultationModalOpen(false)}
                className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-white border border-black/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-700">
                    <Check className="w-4 h-4" />
                    <span>LandMark Desk Reference #LMK-208</span>
                  </div>
                  <p className="text-sm text-[#141414] leading-relaxed">
                    Alhamdulillah! Thank you, <strong>{clientName}</strong>. Our senior advisor at{' '}
                    <strong>154C, Chak 208 Rd, Model City 1, Faisalabad</strong> will contact you on{' '}
                    <strong>{clientPhone}</strong> regarding{' '}
                    <strong>{inquiryType}</strong> ({preferredTime}).
                  </p>
                  <p className="text-xs text-[#5C5C58] font-mono pt-1">
                    Direct Line (Open 24 Hours): +92 301 7078008
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setConsultationModalOpen(false)}
                  className="w-full py-3 rounded-lg bg-[#141414] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Return to Portfolio
                </button>
              </div>
            ) : (
              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C5C58] mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g., Aitsam Ahmad / Ali Sharafat"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-[#141414]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C5C58] mb-1.5">
                    Mobile / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g., 0301 7078008"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-[#141414]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C5C58] mb-1.5">
                    Requirement Type
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-[#141414]"
                  >
                    <option value="Buy House / Plot in Model City 1">
                      Buy House or Plot in Model City 1 (Chak 208 Rd)
                    </option>
                    <option value="Orchard Homes 5 / 10 Marla Plot">
                      Orchard Homes 5 / 10 Marla On-Ground Plot
                    </option>
                    <option value="Dealer Network B2B Partnership">
                      Dealer Network B2B Partnership
                    </option>
                    <option value="Property Management / Turnkey Construction">
                      Property Management or Turnkey Construction
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C5C58] mb-1.5">
                    Preferred Visit Window (Open 24 Hours)
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-[#141414]"
                  >
                    <option value="Today Evening (On-Ground Visit at 154C Chak 208 Rd)">
                      Today Evening (On-Ground Visit at 154C Chak 208 Rd)
                    </option>
                    <option value="Tomorrow Morning (10:00 AM – 1:00 PM)">
                      Tomorrow Morning (10:00 AM – 1:00 PM)
                    </option>
                    <option value="Immediate Phone / WhatsApp Briefing">
                      Immediate Phone / WhatsApp Briefing (+92 301 7078008)
                    </option>
                  </select>
                </div>

                {formError && (
                  <p className="text-xs font-semibold text-red-600">{formError}</p>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setConsultationModalOpen(false)}
                    className="px-4 py-2.5 rounded-lg border border-black/15 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#141414] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2B2B2B] transition-colors cursor-pointer"
                  >
                    Confirm Visit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

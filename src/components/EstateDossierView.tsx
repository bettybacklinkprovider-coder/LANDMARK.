import React, { useState } from 'react';
import {
  ArrowLeft,
  Compass,
  Shield,
  Bookmark,
  Calendar,
  Layers,
  Maximize2,
  Check,
  Sliders,
  ArrowUpRight
} from 'lucide-react';
import { EstateProperty, RoomDimension } from '../data/estates';

interface EstateDossierViewProps {
  estate: EstateProperty;
  onBack: () => void;
  onScheduleViewing: (estate: EstateProperty) => void;
  isShortlisted: boolean;
  onToggleShortlist: (estateId: string) => void;
  onSelectEstate: (estate: EstateProperty) => void;
  relatedEstates: EstateProperty[];
}

export const EstateDossierView: React.FC<EstateDossierViewProps> = ({
  estate,
  onBack,
  onScheduleViewing,
  isShortlisted,
  onToggleShortlist,
  onSelectEstate,
  relatedEstates
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'gallery' | 'blueprint'>('gallery');
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomDimension>(estate.rooms[0]);

  // Acquisition Structuring Calculator State
  const [downPaymentPct, setDownPaymentPct] = useState<number>(40);
  const [interestRate, setInterestRate] = useState<number>(5.25);
  const [cashAcquisition, setCashAcquisition] = useState<boolean>(false);

  React.useEffect(() => {
    setSelectedGalleryIndex(0);
    setSelectedRoom(estate.rooms[0]);
  }, [estate]);

  const currentPerspective =
    estate.gallery[selectedGalleryIndex] || estate.gallery[0];

  // Financial Math
  const downPaymentAmount = cashAcquisition
    ? estate.price
    : Math.round((estate.price * downPaymentPct) / 100);
  const loanPrincipal = cashAcquisition ? 0 : estate.price - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = 360; // 30-yr jumbo private bank facility
  const monthlyDebtService =
    loanPrincipal > 0
      ? Math.round(
          (loanPrincipal *
            (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
            (Math.pow(1 + monthlyRate, numPayments) - 1)
        )
      : 0;
  const monthlyTaxReserve = Math.round((estate.price * 0.0115) / 12);
  const monthlyEstateCuratorship = Math.round(estate.sqft * 1.45);
  const totalMonthlyCarrying =
    monthlyDebtService + monthlyTaxReserve + monthlyEstateCuratorship;

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-8 sm:py-12 space-y-12">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2.5 text-sm font-medium text-[#A9B2C9] hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-[#C8102E]" />
          <span>Back to Architectural Portfolio</span>
        </button>

        <div className="flex items-center gap-3 text-xs text-[#A9B2C9]">
          <span>{estate.location}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{estate.coordinates}</span>
          <span aria-hidden="true">·</span>
          <span className="text-white font-semibold uppercase tracking-wider">
            {estate.status}
          </span>
        </div>
      </div>

      {/* Main Split: Left Gallery & Blueprints (7 cols) / Right Contiguous Acquisition Module (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Monograph & Interactive Floorplan */}
        <div className="lg:col-span-7 space-y-6">
          {/* Media Mode Segmented Control */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center p-1 rounded-xl bg-[#111A3A] border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setActiveMediaTab('gallery')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                  activeMediaTab === 'gallery'
                    ? 'bg-[#C8102E] text-white shadow-[0_2px_12px_rgba(200,16,46,0.4)]'
                    : 'text-[#A9B2C9] hover:text-white'
                }`}
              >
                Nocturnal Photography ({estate.gallery.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaTab('blueprint')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeMediaTab === 'blueprint'
                    ? 'bg-[#C8102E] text-white shadow-[0_2px_12px_rgba(200,16,46,0.4)]'
                    : 'text-[#A9B2C9] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Interactive Spatial Blueprint</span>
              </button>
            </div>

            <span className="text-xs text-[#A9B2C9] tabular-nums">
              {activeMediaTab === 'gallery'
                ? currentPerspective.exposureMeta
                : 'CAD Structural Scale 1:100 · Click Volume to Inspect'}
            </span>
          </div>

          {activeMediaTab === 'gallery' ? (
            <div className="space-y-4">
              {/* Primary Image Frame */}
              <div className="relative rounded-[24px] overflow-hidden border border-white/[0.1] bg-[#111A3A] aspect-[16/10]">
                <img
                  src={currentPerspective.imageUri}
                  alt={`${estate.title} — ${currentPerspective.label}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
                      {currentPerspective.label}
                    </p>
                    <p className="mt-1 text-sm text-white max-w-xl">
                      {currentPerspective.caption}
                    </p>
                  </div>
                </div>
              </div>

              {/* Perspective Selector Strip */}
              {estate.gallery.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {estate.gallery.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedGalleryIndex(idx)}
                      className={`group relative rounded-[16px] overflow-hidden border text-left transition-all p-2.5 flex items-center gap-3 ${
                        selectedGalleryIndex === idx
                          ? 'bg-[#111A3A] border-[#C8102E] shadow-[0_0_20px_rgba(200,16,46,0.2)]'
                          : 'bg-[#111A3A]/60 border-white/[0.08] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.imageUri}
                        alt={item.label}
                        referrerPolicy="no-referrer"
                        className="w-16 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white truncate">
                          {item.label}
                        </p>
                        <p className="text-[11px] text-[#A9B2C9] truncate">
                          Plate 0{idx + 1}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Interactive Architectural Blueprint Canvas */
            <div className="glass-tier-2 rounded-[24px] p-6 space-y-5">
              <div className="relative w-full aspect-[16/10] rounded-[16px] bg-[#070D21] border border-white/[0.08] overflow-hidden p-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 640 380"
                  className="w-full h-full"
                  aria-label="Interactive Architectural Blueprint"
                >
                  <defs>
                    <pattern
                      id="blueprintGrid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="rgba(130, 209, 237, 0.07)"
                        strokeWidth="0.75"
                      />
                    </pattern>
                  </defs>
                  <rect width="640" height="380" fill="url(#blueprintGrid)" />

                  {/* Compass & Scale Marker */}
                  <g transform="translate(585, 35)" stroke="#82D1ED" strokeWidth="1" fill="none">
                    <circle cx="0" cy="0" r="16" strokeOpacity="0.35" />
                    <path d="M 0 -12 L 4 4 L 0 1 L -4 4 Z" fill="#C8102E" stroke="none" />
                    <text
                      x="-3"
                      y="-20"
                      fill="#A9B2C9"
                      fontSize="8"
                      fontFamily="JetBrains Mono"
                      stroke="none"
                    >
                      N
                    </text>
                  </g>

                  {/* Outer Datum Perimeter */}
                  <rect
                    x="42"
                    y="32"
                    width="556"
                    height="324"
                    fill="none"
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                  />

                  {/* Interactive Room Volumes */}
                  {estate.rooms.map((room) => {
                    const isSelected = selectedRoom?.id === room.id;
                    return (
                      <g
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className="cursor-pointer"
                      >
                        <rect
                          x={room.x}
                          y={room.y}
                          width={room.w}
                          height={room.h}
                          rx="6"
                          fill={
                            isSelected
                              ? 'rgba(200, 16, 46, 0.24)'
                              : 'rgba(17, 26, 58, 0.78)'
                          }
                          stroke={
                            isSelected ? '#C8102E' : 'rgba(130, 209, 237, 0.4)'
                          }
                          strokeWidth={isSelected ? '2' : '1'}
                        />
                        <text
                          x={room.x + 14}
                          y={room.y + 26}
                          fill="#FFFFFF"
                          fontSize="11"
                          fontWeight="600"
                          fontFamily="Manrope"
                        >
                          {room.name}
                        </text>
                        <text
                          x={room.x + 14}
                          y={room.y + 44}
                          fill="#A9B2C9"
                          fontSize="10"
                          fontFamily="JetBrains Mono"
                        >
                          {room.dimensions} · {room.sqft.toLocaleString()} sq ft
                        </text>
                        <text
                          x={room.x + 14}
                          y={room.y + 62}
                          fill="#82D1ED"
                          fontSize="9.5"
                          fontFamily="JetBrains Mono"
                        >
                          Ceiling: {room.ceilingHeight}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Selected Room Telemetry Readout */}
              {selectedRoom && (
                <div className="p-4 rounded-2xl bg-[#0A1128]/80 border border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#A9B2C9]">
                      <span>{selectedRoom.level}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-white tabular-nums">
                        {selectedRoom.dimensions} ({selectedRoom.sqft.toLocaleString()} Sq Ft)
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Ceiling {selectedRoom.ceilingHeight}</span>
                    </div>
                    <h4 className="mt-1 font-serif text-lg text-white">
                      {selectedRoom.name}
                    </h4>
                    <p className="mt-0.5 text-xs text-[#A9B2C9]">
                      Specification: {selectedRoom.materialNote}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {estate.rooms.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedRoom(r)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          selectedRoom.id === r.id
                            ? 'bg-[#C8102E] text-white'
                            : 'bg-white/[0.05] text-[#A9B2C9] hover:text-white'
                        }`}
                      >
                        {r.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Architectural Thesis & Materiality */}
          <div className="glass-tier-2 rounded-[24px] p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
                Architectural Monograph
              </p>
              <h3 className="mt-1 font-serif text-2xl text-white">
                Spatial Thesis & Structural Provenance
              </h3>
            </div>
            <p className="text-[15px] leading-relaxed text-[#A9B2C9]">
              {estate.editorialSummary}
            </p>
            <p className="text-[15px] leading-relaxed text-[#A9B2C9]">
              {estate.architecturalThesis}
            </p>

            {/* Key Highlights List */}
            <div className="pt-4 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
              {estate.featuredHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 rounded-full bg-[#C8102E]/20 border border-[#C8102E] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                  <span className="text-sm text-white/90 leading-snug">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* Technical Engineering Grid */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div>
                <span className="text-xs text-[#A9B2C9]">Lead Architect</span>
                <p className="mt-0.5 font-medium text-white">{estate.architect}</p>
              </div>
              <div>
                <span className="text-xs text-[#A9B2C9]">Fenestration & Glazing</span>
                <p className="mt-0.5 font-medium text-white">{estate.glazingSystem}</p>
              </div>
              <div>
                <span className="text-xs text-[#A9B2C9]">Primary Envelope</span>
                <p className="mt-0.5 font-medium text-white">{estate.structuralMaterial}</p>
              </div>
              <div>
                <span className="text-xs text-[#A9B2C9]">Acoustic & Security Rating</span>
                <p className="mt-0.5 font-medium text-white">{estate.acousticRating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Acquisition Module & Financial Calculator */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          {/* Primary Acquisition Card */}
          <div className="glass-tier-2 rounded-[24px] p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs text-[#A9B2C9]">
                <span>{estate.typology}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">Completed {estate.completionYear}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-white leading-tight">
                {estate.title}
              </h1>
              <p className="text-sm text-[#A9B2C9]">{estate.subtitle}</p>
            </div>

            {/* Valuation & Per SqFt */}
            <div className="p-5 rounded-2xl bg-[#0A1128]/80 border border-white/[0.08] flex items-baseline justify-between gap-4">
              <div>
                <span className="text-xs text-[#A9B2C9] block">Offering Valuation</span>
                <span className="font-serif text-3xl font-semibold text-white tabular-nums">
                  {estate.priceFormatted}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#A9B2C9] block">Unit Basis</span>
                <span className="font-mono text-sm text-white tabular-nums">
                  ${estate.pricePerSqFt.toLocaleString()} / Sq Ft
                </span>
              </div>
            </div>

            {/* Spec Badges Strip */}
            <div className="grid grid-cols-4 rounded-2xl bg-[#0A1128]/50 border border-white/[0.08] divide-x divide-white/[0.08] text-center py-3.5">
              <div className="px-2">
                <span className="block font-mono text-base font-semibold text-white tabular-nums">
                  {estate.beds}
                </span>
                <span className="text-[11px] text-[#A9B2C9]">Suites</span>
              </div>
              <div className="px-2">
                <span className="block font-mono text-base font-semibold text-white tabular-nums">
                  {estate.baths}
                </span>
                <span className="text-[11px] text-[#A9B2C9]">Baths</span>
              </div>
              <div className="px-2">
                <span className="block font-mono text-base font-semibold text-white tabular-nums">
                  {estate.sqft.toLocaleString()}
                </span>
                <span className="text-[11px] text-[#A9B2C9]">Int. Sq Ft</span>
              </div>
              <div className="px-2">
                <span className="block font-mono text-base font-semibold text-white tabular-nums">
                  {estate.exteriorSqft.toLocaleString()}
                </span>
                <span className="text-[11px] text-[#A9B2C9]">Ext. Sq Ft</span>
              </div>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => onScheduleViewing(estate)}
                className="btn-crimson w-full py-3.5 px-6 text-sm font-semibold flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Private Viewing</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleShortlist(estate.id)}
                className="btn-glass w-full py-3 px-5 text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    isShortlisted ? 'fill-[#C8102E] text-[#C8102E]' : 'text-[#A9B2C9]'
                  }`}
                />
                <span>
                  {isShortlisted
                    ? 'Saved in Acquisition Ledger'
                    : 'Add to Acquisition Ledger'}
                </span>
              </button>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#A9B2C9]">
              <span>Historical Trophy Index</span>
              <span className="text-white font-medium tabular-nums">
                {estate.annualAppreciationProj}
              </span>
            </div>
          </div>

          {/* Interactive Acquisition & Carrying Cost Calculator */}
          <div className="glass-tier-2 rounded-[24px] p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#C8102E]" />
                <h3 className="font-serif text-lg font-medium text-white">
                  Capital & Carrying Structure
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCashAcquisition(!cashAcquisition)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                  cashAcquisition
                    ? 'bg-[#C8102E]/20 border-[#C8102E] text-white'
                    : 'bg-white/[0.04] border-white/[0.1] text-[#A9B2C9]'
                }`}
              >
                {cashAcquisition ? '100% Cash Settlement' : 'Lombard / Jumbo Facility'}
              </button>
            </div>

            {!cashAcquisition && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#A9B2C9]">Equity Down Payment ({downPaymentPct}%)</span>
                    <span className="font-mono text-white tabular-nums">
                      ${downPaymentAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={80}
                    step={5}
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                    className="w-full accent-[#C8102E] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#A9B2C9]">Private Bank Facility Rate</span>
                    <span className="font-mono text-white tabular-nums">
                      {interestRate.toFixed(2)}% APR
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3.5}
                    max={7.5}
                    step={0.25}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-[#C8102E] cursor-pointer"
                  />
                </div>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-[#0A1128]/70 border border-white/[0.08] space-y-2.5 text-xs">
              <div className="flex justify-between text-[#A9B2C9]">
                <span>Monthly Debt Service (30-Yr)</span>
                <span className="font-mono text-white tabular-nums">
                  ${monthlyDebtService.toLocaleString()} / mo
                </span>
              </div>
              <div className="flex justify-between text-[#A9B2C9]">
                <span>Estimated Municipal Tax Reserve</span>
                <span className="font-mono text-white tabular-nums">
                  ${monthlyTaxReserve.toLocaleString()} / mo
                </span>
              </div>
              <div className="flex justify-between text-[#A9B2C9]">
                <span>Security & Architectural Curatorship</span>
                <span className="font-mono text-white tabular-nums">
                  ${monthlyEstateCuratorship.toLocaleString()} / mo
                </span>
              </div>
              <div className="pt-2.5 border-t border-white/[0.08] flex justify-between items-baseline">
                <span className="font-semibold text-white">Estimated Total Carrying Cost</span>
                <span className="font-mono text-base font-semibold text-white tabular-nums">
                  ${totalMonthlyCarrying.toLocaleString()} / mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparable Portfolio Residences */}
      <div className="pt-8 border-t border-white/[0.08] space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
              Related Mandates
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-white">
              Comparable Architectural Acquisitions
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedEstates.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectEstate(item)}
              className="glass-tier-2 listing-card-hover rounded-[24px] overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-[#0A1128]">
                  <img
                    src={item.heroImage}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#A9B2C9]">
                    <span>{item.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.status}</span>
                  </div>
                  <h3 className="font-serif text-xl text-white">{item.title}</h3>
                  <p className="font-mono text-base font-semibold text-white tabular-nums">
                    {item.priceFormatted}
                  </p>
                </div>
              </div>
              <div className="px-5 py-3.5 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#A9B2C9]">
                <span className="tabular-nums">
                  {item.beds} Beds · {item.baths} Baths · {item.sqft.toLocaleString()} Sq Ft
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#C8102E]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

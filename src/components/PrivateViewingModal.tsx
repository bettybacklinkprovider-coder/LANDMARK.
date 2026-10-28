import React, { useState } from 'react';
import { X, Calendar, Clock, Shield, Check, ArrowRight, Compass } from 'lucide-react';
import { EstateProperty } from '../data/estates';

interface PrivateViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEstate: EstateProperty | null;
  allEstates: EstateProperty[];
  onBookingConfirmed: (booking: {
    estateTitle: string;
    date: string;
    timeSlot: string;
    arrivalMethod: string;
    principalName: string;
    referenceCode: string;
  }) => void;
}

const NOVEMBER_DATES = [
  { day: 'Thu', date: '05', full: 'Nov 05, 2026', available: true },
  { day: 'Fri', date: '06', full: 'Nov 06, 2026', available: true },
  { day: 'Sat', date: '07', full: 'Nov 07, 2026', available: true },
  { day: 'Sun', date: '08', full: 'Nov 08, 2026', available: false },
  { day: 'Mon', date: '09', full: 'Nov 09, 2026', available: true },
  { day: 'Tue', date: '10', full: 'Nov 10, 2026', available: true },
  { day: 'Wed', date: '11', full: 'Nov 11, 2026', available: true },
  { day: 'Thu', date: '12', full: 'Nov 12, 2026', available: true },
  { day: 'Fri', date: '13', full: 'Nov 13, 2026', available: true },
  { day: 'Sat', date: '14', full: 'Nov 14, 2026', available: true }
];

const NOCTURNE_SLOTS = [
  { id: 'sunset-twilight', time: '17:15 — 18:30', label: 'Blue Hour Architectural Illumination' },
  { id: 'nocturnal-gallery', time: '19:00 — 20:30', label: 'Nocturnal Lighting & Acoustic Audition' },
  { id: 'late-private', time: '21:00 — 22:15', label: 'Late Principal Private Inspection' }
];

const ARRIVAL_METHODS = [
  'Direct Principal Arrival (License Plate Pre-Clearance)',
  'Chauffeured Armored Maybach Transfer',
  'Private Helicopter / Helipad Coordinate Clearance'
];

export const PrivateViewingModal: React.FC<PrivateViewingModalProps> = ({
  isOpen,
  onClose,
  selectedEstate,
  allEstates,
  onBookingConfirmed
}) => {
  const [estateId, setEstateId] = useState<string>(
    selectedEstate?.id || allEstates[0]?.id || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>(NOVEMBER_DATES[1].full);
  const [selectedSlot, setSelectedSlot] = useState<string>(NOCTURNE_SLOTS[0].time);
  const [arrivalMethod, setArrivalMethod] = useState<string>(ARRIVAL_METHODS[0]);
  const [principalName, setPrincipalName] = useState<string>('');
  const [familyOfficeOrEmail, setFamilyOfficeOrEmail] = useState<string>('');
  const [ndaAccepted, setNdaAccepted] = useState<boolean>(true);
  const [proofOfLiquidity, setProofOfLiquidity] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmedPass, setConfirmedPass] = useState<{
    estateTitle: string;
    date: string;
    timeSlot: string;
    arrivalMethod: string;
    principalName: string;
    referenceCode: string;
  } | null>(null);

  React.useEffect(() => {
    if (selectedEstate) {
      setEstateId(selectedEstate.id);
    }
    setConfirmedPass(null);
    setErrorMsg('');
  }, [selectedEstate, isOpen]);

  if (!isOpen) return null;

  const activeEstate =
    allEstates.find((e) => e.id === estateId) || selectedEstate || allEstates[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!principalName.trim()) {
      setErrorMsg('Please enter the Principal or Representing Advisor name.');
      return;
    }
    if (!familyOfficeOrEmail.trim() || !familyOfficeOrEmail.includes('@')) {
      setErrorMsg('Please provide a valid institutional or private email for dossier dispatch.');
      return;
    }
    if (!ndaAccepted) {
      setErrorMsg('Mutual Non-Disclosure covenant acknowledgment is required for off-market access.');
      return;
    }

    setErrorMsg('');
    const refCode = `NCT-${Math.floor(100000 + Math.random() * 900000)}`;
    const pass = {
      estateTitle: activeEstate.title,
      date: selectedDate,
      timeSlot: selectedSlot,
      arrivalMethod,
      principalName: principalName.trim(),
      referenceCode: refCode
    };
    setConfirmedPass(pass);
    onBookingConfirmed(pass);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#060d24]/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewing-modal-title"
    >
      <div className="glass-tier-3 relative w-full max-w-2xl rounded-[24px] p-6 sm:p-8 text-white overflow-y-auto max-h-[92vh]">
        {/* Subtle Radial Crimson Top Glow */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(200,16,46,0.5) 0%, transparent 70%)'
          }}
        />

        <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#A9B2C9]">
              Private Architectural Mandate
            </p>
            <h2
              id="viewing-modal-title"
              className="mt-1 font-serif text-2xl sm:text-[32px] font-medium leading-tight text-white"
            >
              {confirmedPass ? 'Private Viewing Protocol Confirmed' : 'Schedule Nocturnal Inspection'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#A9B2C9] hover:text-white hover:bg-white/[0.1] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedPass ? (
          <div className="py-6 space-y-6">
            <div className="p-6 rounded-[20px] bg-[#0A1128]/90 border border-white/[0.1] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
                <div>
                  <span className="text-xs text-[#A9B2C9]">Security Clearance Reference</span>
                  <p className="font-mono text-lg font-medium text-white tabular-nums">
                    {confirmedPass.referenceCode}
                  </p>
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#C8102E]">
                  Confirmed · Senior Partner Assigned
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-[#A9B2C9]">Residence</p>
                  <p className="mt-0.5 font-serif text-lg text-white">{confirmedPass.estateTitle}</p>
                </div>
                <div>
                  <p className="text-xs text-[#A9B2C9]">Principal / Family Office</p>
                  <p className="mt-0.5 font-medium text-white">{confirmedPass.principalName}</p>
                </div>
                <div>
                  <p className="text-xs text-[#A9B2C9]">Date & Illumination Window</p>
                  <p className="mt-0.5 font-medium text-white tabular-nums">
                    {confirmedPass.date} · {confirmedPass.timeSlot}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#A9B2C9]">Arrival Protocol</p>
                  <p className="mt-0.5 font-medium text-white">{confirmedPass.arrivalMethod}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#A9B2C9] leading-relaxed">
              An encrypted architectural monograph, structural disclosure packet, and gate transponder code have been dispatched to{' '}
              <span className="text-white font-medium">{familyOfficeOrEmail}</span>. The residence lighting system will be pre-staged 45 minutes prior to your arrival.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn-crimson px-6 py-3 text-sm font-semibold whitespace-nowrap shrink-0"
              >
                Return to Portfolio
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-6 space-y-6">
            {/* Residence Selector */}
            <div>
              <label
                htmlFor="estate-select"
                className="block text-xs font-semibold tracking-[0.06em] uppercase text-[#A9B2C9] mb-2"
              >
                Selected Portfolio Residence
              </label>
              <select
                id="estate-select"
                value={estateId}
                onChange={(e) => setEstateId(e.target.value)}
                className="input-nocturne w-full px-4 py-3 text-sm font-medium"
              >
                {allEstates.map((estate) => (
                  <option key={estate.id} value={estate.id} className="bg-[#0A1128] text-white">
                    {estate.title} — {estate.location} ({estate.priceFormatted})
                  </option>
                ))}
              </select>
              <div className="mt-2 flex items-center gap-2 text-xs text-[#A9B2C9]">
                <Compass className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>{activeEstate.coordinates}</span>
                <span aria-hidden="true">·</span>
                <span>{activeEstate.aviationAccess}</span>
              </div>
            </div>

            {/* Interactive Crimson Calendar Date Selector */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold tracking-[0.06em] uppercase text-[#A9B2C9] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C8102E]" />
                  Select Viewing Date (November 2026)
                </span>
                <span className="text-xs text-[#A9B2C9] tabular-nums">{selectedDate}</span>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {NOVEMBER_DATES.map((item) => {
                  const isSelected = selectedDate === item.full;
                  return (
                    <button
                      key={item.date}
                      type="button"
                      disabled={!item.available}
                      onClick={() => setSelectedDate(item.full)}
                      className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border text-center transition-all ${
                        !item.available
                          ? 'opacity-30 cursor-not-allowed border-white/[0.05] bg-[#0A1128]/40'
                          : isSelected
                          ? 'bg-[#C8102E] border-[#C8102E] text-white shadow-[0_4px_16px_rgba(200,16,46,0.45)]'
                          : 'bg-[#0A1128]/60 border-white/[0.08] text-[#A9B2C9] hover:text-white hover:border-white/[0.2]'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-wider opacity-80">{item.day}</span>
                      <span className="mt-0.5 text-sm font-semibold tabular-nums">{item.date}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nocturnal Illumination Time Slot */}
            <div>
              <span className="block text-xs font-semibold tracking-[0.06em] uppercase text-[#A9B2C9] mb-2.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C8102E]" />
                Nocturnal Illumination Window
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {NOCTURNE_SLOTS.map((slot) => {
                  const active = selectedSlot === slot.time;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        active
                          ? 'bg-[#C8102E]/15 border-[#C8102E] text-white shadow-[0_0_20px_rgba(200,16,46,0.2)]'
                          : 'bg-[#0A1128]/60 border-white/[0.08] text-[#A9B2C9] hover:text-white hover:border-white/[0.18]'
                      }`}
                    >
                      <div className="text-xs font-semibold text-white tabular-nums">{slot.time}</div>
                      <div className="mt-1 text-[11px] text-[#A9B2C9] leading-snug">{slot.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Principal Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="principal-name"
                  className="block text-xs font-semibold tracking-[0.06em] uppercase text-[#A9B2C9] mb-2"
                >
                  Principal or Advisor Name
                </label>
                <input
                  id="principal-name"
                  type="text"
                  value={principalName}
                  onChange={(e) => setPrincipalName(e.target.value)}
                  placeholder="e.g., Julian Vance / Vance Family Office"
                  className="input-nocturne w-full px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="principal-email"
                  className="block text-xs font-semibold tracking-[0.06em] uppercase text-[#A9B2C9] mb-2"
                >
                  Encrypted Dossier Dispatch Email
                </label>
                <input
                  id="principal-email"
                  type="email"
                  value={familyOfficeOrEmail}
                  onChange={(e) => setFamilyOfficeOrEmail(e.target.value)}
                  placeholder="acquisitions@vancecapital.ch"
                  className="input-nocturne w-full px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            {/* Arrival Protocol */}
            <div>
              <label
                htmlFor="arrival-method"
                className="block text-xs font-semibold tracking-[0.06em] uppercase text-[#A9B2C9] mb-2"
              >
                Security & Arrival Protocol
              </label>
              <select
                id="arrival-method"
                value={arrivalMethod}
                onChange={(e) => setArrivalMethod(e.target.value)}
                className="input-nocturne w-full px-4 py-2.5 text-sm"
              >
                {ARRIVAL_METHODS.map((method) => (
                  <option key={method} value={method} className="bg-[#0A1128] text-white">
                    {method}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom 20px Glass/Crimson Checkboxes */}
            <div className="space-y-3 pt-1">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={ndaAccepted}
                  onClick={() => setNdaAccepted(!ndaAccepted)}
                  className={`mt-0.5 w-5 h-5 rounded-[6px] flex items-center justify-center shrink-0 transition-colors ${
                    ndaAccepted
                      ? 'bg-[#C8102E] border border-[#C8102E] text-white'
                      : 'bg-white/[0.04] border border-white/20 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <span className="text-xs text-[#A9B2C9] leading-relaxed">
                  Execute Mutual Non-Disclosure Covenant (NDA) governing architectural floor plans, seller identity, and security telemetry.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={proofOfLiquidity}
                  onClick={() => setProofOfLiquidity(!proofOfLiquidity)}
                  className={`mt-0.5 w-5 h-5 rounded-[6px] flex items-center justify-center shrink-0 transition-colors ${
                    proofOfLiquidity
                      ? 'bg-[#C8102E] border border-[#C8102E] text-white'
                      : 'bg-white/[0.04] border border-white/20 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <span className="text-xs text-[#A9B2C9] leading-relaxed">
                  Private banker letter of standing is already on file with Nocturne Estate Private Client Desk.
                </span>
              </label>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-[#93000a]/40 border border-[#ffb4ab]/30 text-xs text-[#ffdad6]">
                {errorMsg}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs text-[#A9B2C9]">
                <Shield className="w-4 h-4 text-[#C8102E]" />
                <span>Direct Principal-to-Partner Protocol</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-glass px-5 py-2.5 text-sm font-medium whitespace-nowrap shrink-0"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-crimson px-6 py-2.5 text-sm font-semibold flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>Confirm Private Viewing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

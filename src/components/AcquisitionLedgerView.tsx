import React from 'react';
import {
  Bookmark,
  Calendar,
  ArrowUpRight,
  Trash2,
  Shield,
  Plus,
  Compass
} from 'lucide-react';
import { EstateProperty } from '../data/estates';

interface ConfirmedBooking {
  estateTitle: string;
  date: string;
  timeSlot: string;
  arrivalMethod: string;
  principalName: string;
  referenceCode: string;
}

interface AcquisitionLedgerViewProps {
  shortlistedEstates: EstateProperty[];
  allEstates: EstateProperty[];
  onSelectEstate: (estate: EstateProperty) => void;
  onToggleShortlist: (estateId: string) => void;
  onScheduleViewing: (estate: EstateProperty) => void;
  confirmedBookings: ConfirmedBooking[];
}

export const AcquisitionLedgerView: React.FC<AcquisitionLedgerViewProps> = ({
  shortlistedEstates,
  allEstates,
  onSelectEstate,
  onToggleShortlist,
  onScheduleViewing,
  confirmedBookings
}) => {
  const comparisonList =
    shortlistedEstates.length > 0 ? shortlistedEstates : allEstates.slice(0, 3);

  const totalPortfolioValue = comparisonList.reduce((acc, e) => acc + e.price, 0);
  const avgPricePerSqFt = Math.round(
    comparisonList.reduce((acc, e) => acc + e.pricePerSqFt, 0) /
      (comparisonList.length || 1)
  );

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-10 sm:py-14 space-y-12">
      {/* Header & Aggregate Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
            Principal Portfolio Comparison
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-[44px] font-medium leading-tight text-white">
            Acquisition Ledger & Technical Matrix
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#A9B2C9] max-w-2xl">
            Side-by-side structural, acoustic, and financial comparison of shortlisted architectural mandates.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-5 rounded-[20px] glass-tier-1 shrink-0">
          <div>
            <span className="text-xs text-[#A9B2C9] block">Mandates Compared</span>
            <span className="font-mono text-xl font-semibold text-white tabular-nums">
              0{comparisonList.length}
            </span>
          </div>
          <div className="border-l border-white/[0.08] pl-4 sm:pl-6">
            <span className="text-xs text-[#A9B2C9] block">Aggregate Valuation</span>
            <span className="font-mono text-xl font-semibold text-white tabular-nums">
              ${(totalPortfolioValue / 1000000).toFixed(1)}M
            </span>
          </div>
          <div className="border-l border-white/[0.08] pl-4 sm:pl-6">
            <span className="text-xs text-[#A9B2C9] block">Mean Unit Basis</span>
            <span className="font-mono text-xl font-semibold text-white tabular-nums">
              ${avgPricePerSqFt.toLocaleString()}/sf
            </span>
          </div>
        </div>
      </div>

      {/* Quick Add/Remove Shortlist Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A9B2C9] mr-2">
            Toggle Mandates in Matrix:
          </span>
          {allEstates.map((estate) => {
            const active = shortlistedEstates.some((s) => s.id === estate.id);
            return (
              <button
                key={estate.id}
                type="button"
                onClick={() => onToggleShortlist(estate.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#C8102E]/20 border-[#C8102E] text-white'
                    : 'bg-[#111A3A]/70 border-white/[0.08] text-[#A9B2C9] hover:text-white'
                }`}
              >
                {active ? (
                  <Bookmark className="w-3.5 h-3.5 fill-[#C8102E] text-[#C8102E]" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
                <span>{estate.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparative Technical Table */}
      <div className="glass-tier-2 rounded-[24px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="p-6 w-56 align-bottom text-xs font-semibold uppercase tracking-[0.08em] text-[#A9B2C9]">
                  Specification Metric
                </th>
                {comparisonList.map((estate) => (
                  <th key={estate.id} className="p-6 align-top border-l border-white/[0.08]">
                    <div className="space-y-3">
                      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-[#0A1128]">
                        <img
                          src={estate.heroImage}
                          alt={estate.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 text-xs text-[#A9B2C9]">
                        <span>{estate.location}</span>
                        <button
                          type="button"
                          onClick={() => onToggleShortlist(estate.id)}
                          className="text-[#A9B2C9] hover:text-white transition-colors"
                          title="Toggle Shortlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h3 className="font-serif text-xl font-medium text-white">
                        {estate.title}
                      </h3>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => onSelectEstate(estate)}
                          className="btn-glass px-3 py-1.5 text-xs font-medium flex items-center gap-1 whitespace-nowrap shrink-0"
                        >
                          <span>Open Dossier</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onScheduleViewing(estate)}
                          className="btn-crimson px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0"
                        >
                          Reserve Viewing
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08] text-sm">
              <tr>
                <td className="p-5 text-xs font-semibold uppercase tracking-wider text-[#A9B2C9]">
                  Offering Valuation
                </td>
                {comparisonList.map((estate) => (
                  <td
                    key={estate.id}
                    className="p-5 border-l border-white/[0.08] font-serif text-xl font-semibold text-white tabular-nums"
                  >
                    {estate.priceFormatted}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 text-xs font-semibold uppercase tracking-wider text-[#A9B2C9]">
                  Price Per Interior Sq Ft
                </td>
                {comparisonList.map((estate) => (
                  <td
                    key={estate.id}
                    className="p-5 border-l border-white/[0.08] font-mono text-white tabular-nums"
                  >
                    ${estate.pricePerSqFt.toLocaleString()} / sq ft
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 text-xs font-semibold uppercase tracking-wider text-[#A9B2C9]">
                  Interior / Exterior Volume
                </td>
                {comparisonList.map((estate) => (
                  <td
                    key={estate.id}
                    className="p-5 border-l border-white/[0.08] font-mono text-white tabular-nums"
                  >
                    {estate.sqft.toLocaleString()} sq ft int ·{' '}
                    {estate.exteriorSqft.toLocaleString()} sq ft ext
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 text-xs font-semibold uppercase tracking-wider text-[#A9B2C9]">
                  Suites & Baths
                </td>
                {comparisonList.map((estate) => (
                  <td
                    key={estate.id}
                    className="p-5 border-l border-white/[0.08] text-white tabular-nums"
                  >
                    {estate.beds} Bedroom Suites · {estate.baths} Baths
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 text-xs font-semibold uppercase tracking-wider text-[#A9B2C9]">
                  Architect & Completion
                </td>
                {comparisonList.map((estate) => (
                  <td
                    key={estate.id}
                    className="p-5 border-l border-white/[0.08] text-white"
                  >
                    {estate.architect} ({estate.completionYear})
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 text-xs font-semibold uppercase tracking-wider text-[#A9B2C9]">
                  Structural Envelope
                </td>
                {comparisonList.map((estate) => (
                  <td
                    key={estate.id}
                    className="p-5 border-l border-white/[0.08] text-[#A9B2C9]"
                  >
                    {estate.structuralMaterial}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 text-xs font-semibold uppercase tracking-wider text-[#A9B2C9]">
                  Glazing & Acoustic Spec
                </td>
                {comparisonList.map((estate) => (
                  <td
                    key={estate.id}
                    className="p-5 border-l border-white/[0.08] text-[#A9B2C9]"
                  >
                    <span className="text-white block">{estate.glazingSystem}</span>
                    <span className="text-xs">{estate.acousticRating}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 text-xs font-semibold uppercase tracking-wider text-[#A9B2C9]">
                  Private Aviation Logistics
                </td>
                {comparisonList.map((estate) => (
                  <td
                    key={estate.id}
                    className="p-5 border-l border-white/[0.08] text-white"
                  >
                    {estate.aviationAccess}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 text-xs font-semibold uppercase tracking-wider text-[#A9B2C9]">
                  Trophy Appreciation Index
                </td>
                {comparisonList.map((estate) => (
                  <td
                    key={estate.id}
                    className="p-5 border-l border-white/[0.08] font-mono text-xs text-white tabular-nums"
                  >
                    {estate.annualAppreciationProj}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmed Viewing Itineraries Section */}
      <div className="glass-tier-2 rounded-[24px] p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
              Active Clearances
            </p>
            <h2 className="mt-1 font-serif text-2xl text-white">
              Scheduled Nocturnal Inspections ({confirmedBookings.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onScheduleViewing(comparisonList[0])}
            className="btn-crimson px-5 py-2.5 text-xs font-semibold flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Request Additional Viewing</span>
          </button>
        </div>

        {confirmedBookings.length === 0 ? (
          <div className="p-6 rounded-2xl bg-[#0A1128]/60 border border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-[#A9B2C9]">
              <Shield className="w-5 h-5 text-[#C8102E] shrink-0" />
              <span>
                No private inspection passes have been issued in this session. Select any residence to schedule a blue-hour or nocturnal architectural viewing.
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {confirmedBookings.map((booking) => (
              <div
                key={booking.referenceCode}
                className="p-5 rounded-2xl bg-[#0A1128]/80 border border-white/[0.1] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#C8102E] tabular-nums">
                    CLEARANCE {booking.referenceCode}
                  </span>
                  <span className="text-xs text-[#A9B2C9] tabular-nums">
                    {booking.date} · {booking.timeSlot}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-white">{booking.estateTitle}</h3>
                <div className="text-xs text-[#A9B2C9] flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>{booking.principalName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{booking.arrivalMethod}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

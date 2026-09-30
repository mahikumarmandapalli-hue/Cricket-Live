import React, { useState } from "react";

export interface CricApiScore {
  r: number;
  w: number;
  o: number;
  inning: string;
}

export interface CricApiMatch {
  id: string;
  name: string;
  matchType?: string;
  status: string;
  venue?: string;
  teams?: string[];
  teamInfo?: Array<{
    name: string;
    shortname: string;
    img?: string;
  }>;
  score?: CricApiScore[];
}

export interface SessionRow {
  overMark: number;
  label: string;
  openMin: number;
  openMax: number;
  min: number;
  max: number;
  passScore: number;
  status: "PASSED" | "ACTIVE" | "UPCOMING";
}

interface SessionTableCardProps {
  runs: number;
  overs: number;
  balls: number;
  wickets: number;
  crrNumber: number;
  apiMatches: CricApiMatch[];
  selectedMatchId: string;
  onSelectMatch: (match: CricApiMatch | null) => void;
  isFallbackMode: boolean;
  apiReason: string;
  onRefreshApi: () => void;
  isLoadingApi: boolean;
}

const SESSION_OVERS_10_TO_50 = [10, 15, 20, 25, 30, 35, 40, 45, 50];

export const SessionTableCard: React.FC<SessionTableCardProps> = ({
  runs,
  overs,
  balls,
  wickets,
  crrNumber,
  apiMatches,
  selectedMatchId,
  onSelectMatch,
  isFallbackMode,
  onRefreshApi,
  isLoadingApi,
}) => {
  const [stepFilter, setStepFilter] = useState<"all" | "10s">("all");

  const currentOverDecimal = overs + balls / 6;
  // Effective run rate for projection (guard against 0 overs at start)
  const effectiveCrr = crrNumber > 0 ? crrNumber : 8.5;
  // Wicket pressure factor slightly adjusts future session expectations
  const wicketFactor = Math.max(0.78, 1 - wickets * 0.025);

  const visibleMarks =
    stepFilter === "10s"
      ? [10, 20, 30, 40, 50]
      : SESSION_OVERS_10_TO_50;

  // Dynamic session calculation for 10 to 50 Overs
  const sessionRows: SessionRow[] = visibleMarks.map((overMark) => {
    // Opening pre-match baseline (standard 8.2 RPO baseline scaled by over phase)
    const phaseAcceleration = 1 + (overMark - 10) * 0.0045;
    const openBase = Math.round(overMark * 8.2 * phaseAcceleration);
    const openMin = openBase - 1;
    const openMax = openBase + 1;

    if (currentOverDecimal >= overMark) {
      // Session already completed / passed
      // Estimate score at that over mark proportionally from current trajectory
      const ratio = overMark / Math.max(1, currentOverDecimal);
      const historicalScore = Math.max(
        openMin - 8,
        Math.round(runs * ratio)
      );
      return {
        overMark,
        label: `${overMark} OVER`,
        openMin,
        openMax,
        min: historicalScore - 1,
        max: historicalScore + 1,
        passScore: historicalScore,
        status: "PASSED",
      };
    }

    // Remaining overs until this session milestone
    const remainingOversToSession = Math.max(0, overMark - currentOverDecimal);
    // Late-innings acceleration factor for 10 to 50 overs
    const deathBoost = overMark >= 40 ? 1.08 : overMark >= 30 ? 1.04 : 1.0;

    const projectedAtSession = Math.round(
      runs +
        remainingOversToSession * effectiveCrr * wicketFactor * deathBoost
    );

    const min = Math.max(runs + 1, projectedAtSession - 1);
    const max = min + 2;
    const passScore = Math.round((min + max) / 2);

    // First session mark greater than currentOverDecimal is ACTIVE
    const isNextActive =
      overMark ===
      visibleMarks.find((mark) => mark > currentOverDecimal);

    return {
      overMark,
      label: `${overMark} OVER`,
      openMin,
      openMax,
      min,
      max,
      passScore,
      status: isNextActive ? "ACTIVE" : "UPCOMING",
    };
  });

  return (
    <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant md:col-span-2">
      {/* Header Row with Live Data Source / Match Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-outline-variant/60">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-secondary-fixed">
            analytics
          </span>
          <h3 className="font-label-caps text-label-caps text-on-surface-variant">
            LIVE SESSION TABLE (10 TO 50 OVERS)
          </h3>
          <span
            className={`font-stats-mono text-[10px] px-2 py-0.5 rounded border ${
              isFallbackMode
                ? "bg-tertiary-container/80 text-tertiary border-tertiary/30"
                : "bg-secondary-container/40 text-secondary-fixed border-secondary-fixed/30"
            }`}
          >
            {isFallbackMode ? "SIMULATION FORMULA" : "CRICKETDATA LIVE"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() =>
              setStepFilter((prev) => (prev === "all" ? "10s" : "all"))
            }
            className="font-label-caps text-[10px] px-2 py-1 rounded bg-surface-container-high border border-outline-variant text-on-surface-variant hover:text-primary cursor-pointer"
          >
            {stepFilter === "all" ? "10-50 (5 OV)" : "10-50 (10 OV)"}
          </button>
          <button
            onClick={onRefreshApi}
            disabled={isLoadingApi}
            className="font-label-caps text-[10px] px-2 py-1 rounded bg-surface-container-high border border-outline-variant text-tertiary hover:text-primary flex items-center gap-1 cursor-pointer disabled:opacity-50"
            title="Sync with cricketdata.org currentMatches"
          >
            <span className="material-symbols-outlined text-xs">
              {isLoadingApi ? "hourglass_top" : "sync"}
            </span>
            SYNC
          </button>
        </div>
      </div>

      {/* Live Match Selector if cricketdata.org returned matches */}
      {apiMatches.length > 0 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-3 border-b border-outline-variant/40">
          <button
            onClick={() => onSelectMatch(null)}
            className={`px-2.5 py-1 rounded text-xs font-stats-mono shrink-0 border cursor-pointer ${
              selectedMatchId === "sim"
                ? "bg-secondary-container text-on-secondary-container border-secondary-fixed/40 font-bold"
                : "bg-surface-container-high text-on-surface-variant border-outline-variant"
            }`}
          >
            IND vs AUS (Sim)
          </button>
          {apiMatches.map((m) => {
            const shortLabel =
              m.teamInfo && m.teamInfo.length >= 2
                ? `${m.teamInfo[0].shortname} vs ${m.teamInfo[1].shortname}`
                : m.name.slice(0, 22);
            return (
              <button
                key={m.id}
                onClick={() => onSelectMatch(m)}
                className={`px-2.5 py-1 rounded text-xs font-stats-mono shrink-0 border cursor-pointer ${
                  selectedMatchId === m.id
                    ? "bg-secondary-container text-on-secondary-container border-secondary-fixed/40 font-bold"
                    : "bg-surface-container-high text-on-surface-variant border-outline-variant"
                }`}
              >
                {shortLabel}
              </button>
            );
          })}
        </div>
      )}

      {/* Dark Theme Session Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="border-b border-outline-variant bg-surface-container-lowest/60">
            <tr className="font-label-caps text-label-caps text-outline text-[11px]">
              <th className="py-2.5 px-2.5">SESSION</th>
              <th className="py-2.5 px-2 text-center">MIN (NO)</th>
              <th className="py-2.5 px-2 text-center">MAX (YES)</th>
              <th className="py-2.5 px-2 text-center">OPEN</th>
              <th className="py-2.5 px-2.5 text-right">PASS</th>
            </tr>
          </thead>
          <tbody className="font-stats-mono text-stats-mono">
            {sessionRows.map((row, idx) => {
              const isLast = idx === sessionRows.length - 1;
              const isActive = row.status === "ACTIVE";
              const isPassed = row.status === "PASSED";

              return (
                <tr
                  key={row.overMark}
                  className={`${
                    !isLast ? "border-b border-outline-variant/30" : ""
                  } ${
                    isActive
                      ? "bg-surface-container-highest/45"
                      : "hover:bg-surface-container-high/30"
                  } transition-colors`}
                >
                  {/* SESSION */}
                  <td className="py-2.5 px-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${
                          isActive
                            ? "text-primary"
                            : isPassed
                            ? "text-outline"
                            : "text-on-surface"
                        }`}
                      >
                        {row.label}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed live-pulse" />
                      )}
                    </div>
                  </td>

                  {/* MIN */}
                  <td className="py-2.5 px-2 text-center">
                    <span
                      className={`inline-block min-w-[3rem] px-2 py-0.5 rounded border ${
                        isPassed
                          ? "bg-surface-container-lowest text-outline border-outline-variant/40"
                          : "bg-error-container/30 text-error border-error/30 font-bold"
                      }`}
                    >
                      {row.min}
                    </span>
                  </td>

                  {/* MAX */}
                  <td className="py-2.5 px-2 text-center">
                    <span
                      className={`inline-block min-w-[3rem] px-2 py-0.5 rounded border ${
                        isPassed
                          ? "bg-surface-container-lowest text-outline border-outline-variant/40"
                          : "bg-secondary-container/35 text-secondary-fixed border-secondary-fixed/30 font-bold"
                      }`}
                    >
                      {row.max}
                    </span>
                  </td>

                  {/* OPEN */}
                  <td className="py-2.5 px-2 text-center text-tertiary">
                    {row.openMin}/{row.openMax}
                  </td>

                  {/* PASS */}
                  <td className="py-2.5 px-2.5 text-right">
                    {isPassed ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary-container/30 text-secondary-fixed border border-secondary-fixed/30 text-xs font-bold">
                        PASS ({row.passScore})
                      </span>
                    ) : isActive ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-tertiary-container text-tertiary border border-tertiary/30 text-xs font-bold">
                        TARGET {row.passScore}
                      </span>
                    ) : (
                      <span className="text-on-surface-variant text-xs">
                        {row.passScore} RUNS
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer summary bar */}
      <div className="mt-3 pt-2.5 border-t border-outline-variant/40 flex flex-wrap justify-between items-center gap-2 text-[11px] font-stats-mono text-outline">
        <span>
          CRR FORMULA: ({runs} / {overs * 6 + balls} BALLS) × 6 ={" "}
          <strong className="text-primary">{effectiveCrr.toFixed(2)}</strong>
        </span>
        <span>
          50 OV PROJ:{" "}
          <strong className="text-secondary-fixed">
            {sessionRows[sessionRows.length - 1]?.passScore ?? 0}
          </strong>
        </span>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import {
  BatterStat,
  BowlerStat,
  IMAGES,
  NEWS_ITEMS,
  OTHER_MATCHES,
  SERIES_STANDINGS,
} from "../data/matchData";

interface HomeScreenProps {
  onOpenMatch: () => void;
  onOpenNews: () => void;
  onOpenSeries: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenMatch,
  onOpenNews,
  onOpenSeries,
}) => {
  return (
    <div className="p-container-margin flex flex-col gap-stack-md">
      {/* Featured Live Match Banner */}
      <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at top right, #00fe66 0%, transparent 45%)",
          }}
        />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-3">
            <span className="font-label-caps text-label-caps text-secondary-fixed bg-secondary-fixed/20 px-2 py-1 rounded flex items-center gap-1 border border-secondary-fixed/30">
              <span className="w-1.5 h-1.5 bg-secondary-fixed rounded-full live-pulse" />
              FEATURED LIVE
            </span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              T20 WORLD CUP · SUPER 8
            </span>
          </div>
          <div className="flex justify-between items-center my-4">
            <div className="flex items-center gap-3">
              <img
                src={IMAGES.indLogo}
                alt="IND"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded border border-outline-variant object-cover"
              />
              <div>
                <span className="font-headline-md text-headline-md text-primary block">
                  INDIA
                </span>
                <span className="font-stats-mono text-xs text-outline">
                  CRR: 10.09 · PROJ: 215
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-display-score text-display-score text-secondary-fixed">
                184/4
              </span>
              <span className="font-stats-mono text-xs text-outline block">
                18.2 OVERS vs AUS
              </span>
            </div>
          </div>
          <button
            onClick={onOpenMatch}
            className="w-full py-2.5 px-4 bg-secondary-container text-on-secondary-fixed font-label-caps text-label-caps rounded-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
          >
            <span>OPEN LIVE MATCH CENTER</span>
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Other Fixtures */}
      <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant">
            MATCH SCHEDULE &amp; RESULTS
          </h3>
          <button
            onClick={onOpenSeries}
            className="font-label-caps text-label-caps text-tertiary hover:underline"
          >
            VIEW SERIES
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {OTHER_MATCHES.map((m) => (
            <div
              key={m.id}
              onClick={onOpenMatch}
              className="p-3 rounded-lg bg-surface-container-high/60 border border-outline-variant/60 hover:border-tertiary transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-caps text-label-caps text-outline">
                  {m.title}
                </span>
                <span
                  className={`font-stats-mono text-xs ${
                    m.status === "LIVE"
                      ? "text-secondary-fixed"
                      : m.status === "RESULT"
                      ? "text-tertiary"
                      : "text-outline"
                  }`}
                >
                  {m.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-headline-md text-headline-md text-primary">
                  {m.team1} <span className="text-secondary-fixed">{m.team1Score}</span>{" "}
                  <span className="font-stats-mono text-xs text-outline">
                    ({m.team1Overs})
                  </span>
                </span>
                <span className="font-headline-md text-headline-md text-on-surface-variant">
                  vs {m.team2} ({m.team2Score})
                </span>
              </div>
              <p className="text-xs text-outline mt-1.5">{m.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Headlines Preview */}
      <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant">
            TOP CRICKET STORIES
          </h3>
          <button
            onClick={onOpenNews}
            className="font-label-caps text-label-caps text-tertiary hover:underline"
          >
            ALL NEWS
          </button>
        </div>
        <div className="divide-y divide-outline-variant/30">
          {NEWS_ITEMS.slice(0, 2).map((item) => (
            <div
              key={item.id}
              onClick={onOpenNews}
              className="py-3 first:pt-0 last:pb-0 cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-xs font-stats-mono text-outline mb-1">
                <span className="text-secondary-fixed">{item.category}</span>
                <span>·</span>
                <span>{item.time}</span>
              </div>
              <h4 className="font-headline-md text-headline-md text-primary group-hover:text-tertiary transition-colors">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const NewsScreen: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  return (
    <div className="p-container-margin flex flex-col gap-stack-md">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
          T20 WORLD CUP NEWSROOM
        </h2>
        <span className="font-stats-mono text-xs text-secondary-fixed">
          LIVE DESK · BRIDGETOWN
        </span>
      </div>
      {NEWS_ITEMS.map((item) => {
        const isExpanded = selectedArticleId === item.id;
        return (
          <article
            key={item.id}
            onClick={() =>
              setSelectedArticleId(isExpanded ? null : item.id)
            }
            className="bg-surface-container rounded-xl p-card-padding border border-outline-variant cursor-pointer hover:border-tertiary/60 transition-colors"
          >
            <div className="flex items-center gap-2 text-xs font-stats-mono text-outline mb-2">
              <span className="text-secondary-fixed">{item.category}</span>
              <span>·</span>
              <span>{item.time}</span>
              <span>·</span>
              <span>{item.readTime}</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              {item.title}
            </h3>
            <p className="text-body-sm text-on-surface-variant">
              {item.excerpt}
            </p>
            {isExpanded && (
              <div className="mt-3 pt-3 border-t border-outline-variant/40 text-body-sm text-primary space-y-2">
                <p>
                  Speaking from the boundary rope, analysts highlighted how
                  Kohli&apos;s footwork against left-arm angle neutralized
                  Australia&apos;s death-overs yorker plan. With 10 balls
                  remaining in the innings, India&apos;s projected score has
                  surged to 215.
                </p>
                <p className="font-stats-mono text-xs text-tertiary">
                  Key Metric: 176.19 Strike Rate across 42 deliveries (6x4, 4x6).
                </p>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};

export const SeriesScreen: React.FC = () => {
  return (
    <div className="p-container-margin flex flex-col gap-stack-md">
      <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">
              ICC MEN&apos;S T20 WORLD CUP · SUPER 8 GROUP 1
            </h2>
            <p className="text-xs text-outline mt-0.5">
              Top 2 teams qualify for the Semi-Finals
            </p>
          </div>
          <span className="material-symbols-outlined text-secondary-fixed">
            trophy
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-outline-variant text-outline font-label-caps text-label-caps">
              <tr>
                <th className="py-2">#</th>
                <th className="py-2">TEAM</th>
                <th className="py-2 text-center">P</th>
                <th className="py-2 text-center">W</th>
                <th className="py-2 text-center">L</th>
                <th className="py-2 text-right">NRR</th>
                <th className="py-2 text-right">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 font-stats-mono text-stats-mono">
              {SERIES_STANDINGS.map((row) => (
                <tr key={row.team}>
                  <td className="py-3 text-outline">{row.pos}</td>
                  <td className="py-3 font-headline-md text-headline-md text-primary">
                    {row.team}
                  </td>
                  <td className="py-3 text-center text-on-surface-variant">
                    {row.played}
                  </td>
                  <td className="py-3 text-center text-secondary-fixed">
                    {row.won}
                  </td>
                  <td className="py-3 text-center text-outline">{row.lost}</td>
                  <td className="py-3 text-right text-tertiary">{row.nrr}</td>
                  <td className="py-3 text-right font-bold text-primary">
                    {row.pts}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tournament Leaders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-3">
            TOP RUN SCORERS
          </h3>
          <div className="divide-y divide-outline-variant/30 font-stats-mono text-stats-mono">
            <div className="py-2.5 flex justify-between">
              <span className="text-primary">1. V Kohli (IND)</span>
              <span className="text-secondary-fixed">248 runs · SR 158.9</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-primary">2. T Head (AUS)</span>
              <span className="text-tertiary">219 runs · SR 164.6</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-primary">3. R Sharma (IND)</span>
              <span className="text-on-surface-variant">198 runs · SR 161.0</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-3">
            TOP WICKET TAKERS
          </h3>
          <div className="divide-y divide-outline-variant/30 font-stats-mono text-stats-mono">
            <div className="py-2.5 flex justify-between">
              <span className="text-primary">1. J Bumrah (IND)</span>
              <span className="text-secondary-fixed">13 wkts · ECON 4.18</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-primary">2. A Zampa (AUS)</span>
              <span className="text-tertiary">12 wkts · ECON 6.45</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-primary">3. A Singh (IND)</span>
              <span className="text-on-surface-variant">11 wkts · ECON 7.10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MoreScreenProps {
  oddsFormat: "decimal" | "fractional";
  setOddsFormat: (fmt: "decimal" | "fractional") => void;
  onSimulateNextBall: () => void;
  onResetMatch: () => void;
  simStep: number;
}

export const MoreScreen: React.FC<MoreScreenProps> = ({
  oddsFormat,
  setOddsFormat,
  onSimulateNextBall,
  onResetMatch,
  simStep,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="p-container-margin flex flex-col gap-stack-md">
      {/* Live Simulation Control Panel */}
      <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
        <h3 className="font-label-caps text-label-caps text-secondary-fixed mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">bolt</span>
          LIVE TELEMETRY &amp; BALL SIMULATOR
        </h3>
        <p className="text-body-sm text-on-surface-variant mb-4">
          Simulate upcoming deliveries in the 19th over (Starc to Kohli &amp;
          Yadav) or reset to the 18.2 over snapshot.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onSimulateNextBall}
            className="px-4 py-2.5 rounded-lg bg-secondary-container text-on-secondary-fixed font-label-caps text-label-caps hover:opacity-90 transition-opacity"
          >
            SIMULATE NEXT BALL ({simStep}/4)
          </button>
          <button
            onClick={onResetMatch}
            className="px-4 py-2.5 rounded-lg bg-surface-container-high border border-outline-variant text-primary font-label-caps text-label-caps hover:border-tertiary transition-colors"
          >
            RESET TO 18.2 OV (184/4)
          </button>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant divide-y divide-outline-variant/30">
        <div className="py-3 flex justify-between items-center">
          <div>
            <span className="font-headline-md text-headline-md text-primary block">
              Odds Display Format
            </span>
            <span className="text-xs text-outline">
              Switch between Decimal (1.55) and Fractional (11/20)
            </span>
          </div>
          <div className="flex bg-surface-container-high rounded-lg p-1 border border-outline-variant">
            <button
              onClick={() => setOddsFormat("decimal")}
              className={`px-3 py-1 rounded text-xs font-stats-mono ${
                oddsFormat === "decimal"
                  ? "bg-secondary-container text-on-secondary-fixed font-bold"
                  : "text-outline"
              }`}
            >
              DEC
            </button>
            <button
              onClick={() => setOddsFormat("fractional")}
              className={`px-3 py-1 rounded text-xs font-stats-mono ${
                oddsFormat === "fractional"
                  ? "bg-secondary-container text-on-secondary-fixed font-bold"
                  : "text-outline"
              }`}
            >
              FRAC
            </button>
          </div>
        </div>

        <div className="py-3 flex justify-between items-center">
          <div>
            <span className="font-headline-md text-headline-md text-primary block">
              Wicket &amp; Boundary Alerts
            </span>
            <span className="text-xs text-outline">
              Instant push telemetry for every 4, 6, and Wicket
            </span>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`px-3 py-1.5 rounded-lg font-stats-mono text-xs border transition-colors ${
              notificationsEnabled
                ? "bg-secondary-fixed/20 border-secondary-fixed text-secondary-fixed"
                : "bg-surface-container-high border-outline-variant text-outline"
            }`}
          >
            {notificationsEnabled ? "ACTIVE" : "MUTED"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const PlayerDetailModal: React.FC<{
  player: BatterStat | BowlerStat | null;
  onClose: () => void;
}> = ({ player, onClose }) => {
  if (!player) return null;
  const isBatter = "runs" in player && "sr" in player;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface-container border border-outline-variant w-full max-w-md rounded-t-2xl sm:rounded-xl p-card-padding"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            {player.avatar && (
              <img
                src={player.avatar}
                alt={player.fullName}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border border-outline-variant"
              />
            )}
            <div>
              <h3 className="font-headline-md text-headline-md text-primary">
                {player.fullName}
              </h3>
              <span className="font-stats-mono text-xs text-secondary-fixed">
                {isBatter ? (player as BatterStat).role : (player as BowlerStat).spell}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-highest text-outline hover:text-primary"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {isBatter ? (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2 bg-surface-container-high p-3 rounded-lg border border-outline-variant/50 text-center">
              <div>
                <span className="text-label-caps text-outline block">RUNS</span>
                <span className="font-headline-md text-headline-md text-primary">
                  {(player as BatterStat).runs}
                </span>
              </div>
              <div>
                <span className="text-label-caps text-outline block">BALLS</span>
                <span className="font-headline-md text-headline-md text-primary">
                  {(player as BatterStat).balls}
                </span>
              </div>
              <div>
                <span className="text-label-caps text-outline block">4s / 6s</span>
                <span className="font-headline-md text-headline-md text-tertiary">
                  {(player as BatterStat).fours} / {(player as BatterStat).sixes}
                </span>
              </div>
              <div>
                <span className="text-label-caps text-outline block">SR</span>
                <span className="font-headline-md text-headline-md text-secondary-fixed">
                  {(player as BatterStat).sr}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                SCORING ZONES (WAGON BREAKDOWN)
              </h4>
              <div className="space-y-2">
                {(player as BatterStat).recentZones.map((z) => (
                  <div key={z.zone}>
                    <div className="flex justify-between text-xs font-stats-mono mb-1">
                      <span className="text-primary">{z.zone}</span>
                      <span className="text-secondary-fixed">
                        {z.runs} runs ({z.pct}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary-fixed"
                        style={{ width: `${z.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2 bg-surface-container-high p-3 rounded-lg border border-outline-variant/50 text-center">
              <div>
                <span className="text-label-caps text-outline block">OVERS</span>
                <span className="font-headline-md text-headline-md text-primary">
                  {(player as BowlerStat).overs}
                </span>
              </div>
              <div>
                <span className="text-label-caps text-outline block">RUNS</span>
                <span className="font-headline-md text-headline-md text-primary">
                  {(player as BowlerStat).runs}
                </span>
              </div>
              <div>
                <span className="text-label-caps text-outline block">WKTS</span>
                <span className="font-headline-md text-headline-md text-secondary-fixed">
                  {(player as BowlerStat).wickets}
                </span>
              </div>
              <div>
                <span className="text-label-caps text-outline block">ECON</span>
                <span className="font-headline-md text-headline-md text-tertiary">
                  {(player as BowlerStat).econ}
                </span>
              </div>
            </div>
            <div className="flex justify-between text-xs font-stats-mono text-outline pt-2">
              <span>Release Speed: {(player as BowlerStat).pace}</span>
              <span>Dot Balls: {(player as BowlerStat).dots}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

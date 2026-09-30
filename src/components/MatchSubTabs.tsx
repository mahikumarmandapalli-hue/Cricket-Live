import React, { useState } from "react";
import {
  BatterStat,
  BowlerStat,
  IMAGES,
  OVER_BY_OVER_RUNS,
  SCORECARD_BATTING,
  SCORECARD_BOWLING,
} from "../data/matchData";

interface MatchSubTabsProps {
  currentScore: number;
  currentWickets: number;
  currentOvers: string;
  kohliRuns: number;
  kohliBalls: number;
  yadavRuns: number;
  yadavBalls: number;
  starcOvers: string;
  starcRuns: number;
  onSelectPlayer: (player: BatterStat | BowlerStat) => void;
}

export const MatchInfoTab: React.FC = () => {
  return (
    <div className="p-container-margin flex flex-col gap-stack-md">
      {/* Match Summary Info */}
      <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
        <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">stadium</span>
          MATCH INFORMATION
        </h3>
        <div className="divide-y divide-outline-variant/30 text-body-sm">
          <div className="py-3 flex justify-between items-center gap-4">
            <span className="text-outline">Match</span>
            <span className="font-stats-mono text-primary text-right">
              IND vs AUS · Super 8, Match 42
            </span>
          </div>
          <div className="py-3 flex justify-between items-center gap-4">
            <span className="text-outline">Toss</span>
            <span className="text-secondary-fixed font-medium text-right">
              Australia won the toss &amp; elected to bowl
            </span>
          </div>
          <div className="py-3 flex justify-between items-center gap-4">
            <span className="text-outline">Venue</span>
            <span className="text-primary text-right">
              Kensington Oval, Bridgetown, Barbados
            </span>
          </div>
          <div className="py-3 flex justify-between items-center gap-4">
            <span className="text-outline">On-Field Umpires</span>
            <span className="text-primary text-right">
              R Kettleborough &amp; R Illingworth
            </span>
          </div>
          <div className="py-3 flex justify-between items-center gap-4">
            <span className="text-outline">Third Umpire</span>
            <span className="text-primary text-right">M Erasmus</span>
          </div>
          <div className="py-3 flex justify-between items-center gap-4">
            <span className="text-outline">Match Referee</span>
            <span className="text-primary text-right">J Srinath</span>
          </div>
        </div>
      </div>

      {/* Pitch & Weather Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">grass</span>
            PITCH TELEMETRY
          </h3>
          <p className="text-body-sm text-on-surface-variant mb-4">
            Hard, rolled Barbados surface with even bounce. Cross-wind of 24kph blowing from north-east assists hitting toward the 62m square leg boundary.
          </p>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-outline-variant/40 text-center">
            <div>
              <span className="block text-label-caps text-outline">AVG 1ST INN</span>
              <span className="font-headline-md text-headline-md text-primary">178</span>
            </div>
            <div>
              <span className="block text-label-caps text-outline">PACE BOWL</span>
              <span className="font-headline-md text-headline-md text-tertiary">62%</span>
            </div>
            <div>
              <span className="block text-label-caps text-outline">SPIN BOWL</span>
              <span className="font-headline-md text-headline-md text-secondary-fixed">38%</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">air</span>
            HEAD TO HEAD (LAST 10 T20Is)
          </h3>
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-label-caps text-tertiary block">INDIA</span>
              <span className="font-headline-lg text-headline-lg text-primary">7</span>
            </div>
            <div className="text-center pb-1">
              <span className="font-stats-mono text-xs text-outline">NO RESULT: 0</span>
            </div>
            <div className="text-right">
              <span className="text-label-caps text-secondary-fixed block">AUSTRALIA</span>
              <span className="font-headline-lg text-headline-lg text-primary">3</span>
            </div>
          </div>
          <div className="h-2 w-full bg-surface-container-highest flex rounded-full overflow-hidden">
            <div className="bg-tertiary h-full" style={{ width: "70%" }} />
            <div className="bg-secondary-fixed h-full" style={{ width: "30%" }} />
          </div>
          <p className="text-body-sm text-outline mt-3">
            Highest Total: IND 235/4 (2023) · AUS 225/5 (2023)
          </p>
        </div>
      </div>

      {/* Playing XIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
          <div className="flex items-center gap-2 mb-3">
            <img
              src={IMAGES.indLogo}
              alt="IND"
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded object-cover border border-outline-variant"
            />
            <h3 className="font-label-caps text-label-caps text-primary">
              INDIA PLAYING XI
            </h3>
          </div>
          <div className="divide-y divide-outline-variant/25 text-body-sm">
            {[
              "Rohit Sharma (c) · RHB",
              "Yashasvi Jaiswal · LHB",
              "Virat Kohli · RHB",
              "Rishabh Pant (wk) · LHB",
              "Suryakumar Yadav · RHB",
              "Hardik Pandya · All-Rounder",
              "Ravindra Jadeja · SLA All-Rounder",
              "Axar Patel · SLA All-Rounder",
              "Kuldeep Yadav · Left-Arm Wrist Spin",
              "Jasprit Bumrah · Right-Arm Fast",
              "Arshdeep Singh · Left-Arm Fast-Medium",
            ].map((p, idx) => (
              <div key={p} className="py-2 flex justify-between items-center">
                <span className="text-primary">{p.split(" · ")[0]}</span>
                <span className="font-stats-mono text-xs text-outline">
                  {idx + 1 <= 6 ? p.split(" · ")[1] : p.split(" · ")[1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
          <div className="flex items-center gap-2 mb-3">
            <img
              src={IMAGES.ausLogo}
              alt="AUS"
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded object-cover border border-outline-variant"
            />
            <h3 className="font-label-caps text-label-caps text-primary">
              AUSTRALIA PLAYING XI
            </h3>
          </div>
          <div className="divide-y divide-outline-variant/25 text-body-sm">
            {[
              "David Warner · LHB",
              "Travis Head · LHB",
              "Mitchell Marsh · RHB / Medium",
              "Glenn Maxwell · All-Rounder",
              "Marcus Stoinis · All-Rounder",
              "Tim David · Middle-Order RHB",
              "Matthew Wade (wk) · LHB",
              "Pat Cummins (c) · Right-Arm Fast",
              "Mitchell Starc · Left-Arm Fast",
              "Adam Zampa · Leg-Break Googly",
              "Josh Hazlewood · Right-Arm Fast-Medium",
            ].map((p) => (
              <div key={p} className="py-2 flex justify-between items-center">
                <span className="text-primary">{p.split(" · ")[0]}</span>
                <span className="font-stats-mono text-xs text-outline">
                  {p.split(" · ")[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MatchScorecardTab: React.FC<MatchSubTabsProps> = ({
  currentScore,
  currentWickets,
  currentOvers,
  kohliRuns,
  kohliBalls,
  yadavRuns,
  yadavBalls,
  starcOvers,
  starcRuns,
  onSelectPlayer,
}) => {
  const [selectedInnings, setSelectedInnings] = useState<"IND" | "AUS">("IND");

  const updatedBatting = SCORECARD_BATTING.map((b) => {
    if (b.id === "kohli") {
      const sr = ((kohliRuns / kohliBalls) * 100).toFixed(2);
      return { ...b, runs: kohliRuns, balls: kohliBalls, sr };
    }
    if (b.id === "yadav") {
      const sr = ((yadavRuns / yadavBalls) * 100).toFixed(2);
      return { ...b, runs: yadavRuns, balls: yadavBalls, sr };
    }
    return b;
  });

  const updatedBowling = SCORECARD_BOWLING.map((bw) => {
    if (bw.id === "starc") {
      return { ...bw, overs: starcOvers, runs: starcRuns };
    }
    return bw;
  });

  return (
    <div className="p-container-margin flex flex-col gap-stack-md">
      {/* Innings Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedInnings("IND")}
          className={`flex-1 py-2.5 px-4 rounded-lg border font-label-caps text-label-caps flex justify-between items-center transition-colors ${
            selectedInnings === "IND"
              ? "bg-surface-container-high border-secondary-fixed text-primary"
              : "bg-surface-container border-outline-variant text-outline hover:text-primary"
          }`}
        >
          <span>IND INNINGS</span>
          <span className="font-stats-mono text-secondary-fixed">
            {currentScore}/{currentWickets} ({currentOvers})
          </span>
        </button>
        <button
          onClick={() => setSelectedInnings("AUS")}
          className={`flex-1 py-2.5 px-4 rounded-lg border font-label-caps text-label-caps flex justify-between items-center transition-colors ${
            selectedInnings === "AUS"
              ? "bg-surface-container-high border-secondary-fixed text-primary"
              : "bg-surface-container border-outline-variant text-outline hover:text-primary"
          }`}
        >
          <span>AUS INNINGS</span>
          <span className="font-stats-mono text-outline">YET TO BAT</span>
        </button>
      </div>

      {selectedInnings === "IND" ? (
        <>
          {/* Batting Card */}
          <div className="bg-surface-container rounded-xl border border-outline-variant overflow-hidden">
            <div className="p-card-padding border-b border-outline-variant flex justify-between items-center">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                INDIA BATTING
              </span>
              <span className="font-stats-mono text-xs text-outline">
                Click row for Wagon Wheel
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="border-b border-outline-variant bg-surface-container-low">
                  <tr className="font-label-caps text-label-caps text-outline">
                    <th className="py-2.5 px-4">BATTER</th>
                    <th className="py-2.5 px-2 text-right">R</th>
                    <th className="py-2.5 px-2 text-right">B</th>
                    <th className="py-2.5 px-2 text-right">4s</th>
                    <th className="py-2.5 px-2 text-right">6s</th>
                    <th className="py-2.5 px-4 text-right">SR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 font-stats-mono text-stats-mono">
                  {updatedBatting.map((batter) => (
                    <tr
                      key={batter.id}
                      onClick={() => onSelectPlayer(batter)}
                      className={`cursor-pointer transition-colors hover:bg-surface-container-highest/60 ${
                        batter.status === "not out"
                          ? "bg-surface-container-highest/30"
                          : ""
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-headline-md text-headline-md text-primary">
                          {batter.name}
                        </div>
                        <div
                          className={`text-xs font-body-sm ${
                            batter.status === "not out"
                              ? "text-secondary-fixed"
                              : "text-outline"
                          }`}
                        >
                          {batter.dismissal}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right font-bold text-primary">
                        {batter.runs}
                      </td>
                      <td className="py-3 px-2 text-right text-outline">
                        {batter.balls}
                      </td>
                      <td className="py-3 px-2 text-right text-outline">
                        {batter.fours}
                      </td>
                      <td className="py-3 px-2 text-right text-outline">
                        {batter.sixes}
                      </td>
                      <td
                        className={`py-3 px-4 text-right ${
                          parseFloat(batter.sr) >= 160
                            ? "text-secondary-fixed"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {batter.sr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-card-padding border-t border-outline-variant bg-surface-container-low flex flex-col gap-2 text-body-sm">
              <div className="flex justify-between">
                <span className="text-outline">Extras</span>
                <span className="font-stats-mono text-primary">
                  7 (b 0, lb 2, w 4, nb 1, p 0)
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-primary">Total</span>
                <span className="font-stats-mono text-secondary-fixed">
                  {currentScore}/{currentWickets} ({currentOvers} Overs, RR: 10.09)
                </span>
              </div>
              <div className="pt-2 border-t border-outline-variant/30 text-xs text-outline">
                <span className="font-semibold text-on-surface-variant">
                  Yet to bat:{" "}
                </span>
                R Jadeja, A Patel, K Yadav, J Bumrah, A Singh
              </div>
            </div>
          </div>

          {/* Fall of Wickets */}
          <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2">
              FALL OF WICKETS
            </h3>
            <p className="font-stats-mono text-xs text-outline leading-relaxed">
              1-26 (Y Jaiswal, 2.4 ov) · 2-62 (R Sharma, 5.6 ov) · 3-89 (R Pant,
              8.5 ov) · 4-176 (H Pandya, 17.5 ov)
            </p>
          </div>

          {/* Bowling Card */}
          <div className="bg-surface-container rounded-xl border border-outline-variant overflow-hidden">
            <div className="p-card-padding border-b border-outline-variant">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                AUSTRALIA BOWLING
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="border-b border-outline-variant bg-surface-container-low">
                  <tr className="font-label-caps text-label-caps text-outline">
                    <th className="py-2.5 px-4">BOWLER</th>
                    <th className="py-2.5 px-2 text-right">O</th>
                    <th className="py-2.5 px-2 text-right">M</th>
                    <th className="py-2.5 px-2 text-right">R</th>
                    <th className="py-2.5 px-2 text-right">W</th>
                    <th className="py-2.5 px-4 text-right">ECON</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 font-stats-mono text-stats-mono">
                  {updatedBowling.map((bowler) => (
                    <tr
                      key={bowler.id}
                      onClick={() => onSelectPlayer(bowler)}
                      className="cursor-pointer hover:bg-surface-container-highest/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="font-headline-md text-headline-md text-primary">
                          {bowler.name}
                        </span>
                        <span className="block text-xs text-outline">
                          Avg Speed: {bowler.pace}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right text-primary">
                        {bowler.overs}
                      </td>
                      <td className="py-3 px-2 text-right text-outline">
                        {bowler.maidens}
                      </td>
                      <td className="py-3 px-2 text-right text-primary">
                        {bowler.runs}
                      </td>
                      <td className="py-3 px-2 text-right font-bold text-secondary-fixed">
                        {bowler.wickets}
                      </td>
                      <td className="py-3 px-4 text-right text-on-surface-variant">
                        {bowler.econ}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant text-center py-10">
          <span className="material-symbols-outlined text-4xl text-outline mb-2">
            sports_cricket
          </span>
          <h4 className="font-headline-md text-headline-md text-primary">
            Australia Innings Yet To Begin
          </h4>
          <p className="text-body-sm text-outline mt-1 max-w-md mx-auto">
            Australia will chase India&apos;s target after the completion of 20.0
            overs. Projected target currently stands at 215 runs.
          </p>
        </div>
      )}
    </div>
  );
};

export const MatchStatsTab: React.FC = () => {
  return (
    <div className="p-container-margin flex flex-col gap-stack-md">
      {/* Phase Breakdown */}
      <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
        <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">equalizer</span>
          INNINGS PHASE BREAKDOWN (INDIA)
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-surface-container-high p-3 rounded-lg border border-outline-variant/60">
            <span className="font-label-caps text-label-caps text-outline block">
              POWERPLAY (1-6)
            </span>
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary mt-1 block">
              62/2
            </span>
            <span className="font-stats-mono text-xs text-secondary-fixed">
              RR: 10.33
            </span>
          </div>
          <div className="bg-surface-container-high p-3 rounded-lg border border-outline-variant/60">
            <span className="font-label-caps text-label-caps text-outline block">
              MIDDLE (7-15)
            </span>
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary mt-1 block">
              90/1
            </span>
            <span className="font-stats-mono text-xs text-tertiary">
              RR: 10.00
            </span>
          </div>
          <div className="bg-surface-container-high p-3 rounded-lg border border-secondary-fixed/50">
            <span className="font-label-caps text-label-caps text-secondary-fixed block">
              DEATH (16-18.2)
            </span>
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary mt-1 block">
              32/1
            </span>
            <span className="font-stats-mono text-xs text-secondary-fixed">
              RR: 9.60
            </span>
          </div>
        </div>
      </div>

      {/* Manhattan Chart (Over-by-Over Runs) */}
      <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">bar_chart</span>
            MANHATTAN (RUNS PER OVER)
          </h3>
          <div className="flex items-center gap-3 text-xs font-stats-mono">
            <span className="flex items-center gap-1 text-tertiary">
              <span className="w-2 h-2 rounded-full bg-tertiary" /> Runs
            </span>
            <span className="flex items-center gap-1 text-error">
              <span className="w-2 h-2 rounded-full bg-error" /> Wicket
            </span>
          </div>
        </div>
        <div className="flex items-end gap-1.5 h-44 pt-6 pb-2 overflow-x-auto no-scrollbar border-b border-outline-variant">
          {OVER_BY_OVER_RUNS.map((item) => {
            const heightPct = Math.max(12, Math.round((item.runs / 16) * 100));
            return (
              <div
                key={item.over}
                className="flex-1 min-w-[20px] flex flex-col items-center justify-end h-full group"
              >
                {item.wickets > 0 && (
                  <span className="w-4 h-4 rounded-full bg-error-container text-error text-[10px] font-stats-mono flex items-center justify-center mb-1 border border-error/40">
                    W
                  </span>
                )}
                <span className="font-stats-mono text-[10px] text-outline mb-1">
                  {item.runs}
                </span>
                <div
                  className={`w-full rounded-t transition-opacity ${
                    item.over === 19
                      ? "bg-secondary-fixed"
                      : item.runs >= 12
                      ? "bg-tertiary"
                      : "bg-surface-container-highest"
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
                <span className="font-stats-mono text-[10px] text-outline mt-1.5">
                  {item.over}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Partnership Breakdown */}
      <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
        <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-3">
          CURRENT PARTNERSHIP · 5TH WICKET
        </h3>
        <div className="flex justify-between items-center mb-2 font-stats-mono">
          <span className="text-tertiary">V Kohli: 6 (1b)</span>
          <span className="text-primary font-bold">8 runs (3 balls)</span>
          <span className="text-secondary-fixed">S Yadav: 2 (2b)</span>
        </div>
        <div className="h-2 w-full bg-surface-container-highest flex rounded-full overflow-hidden">
          <div className="bg-tertiary h-full" style={{ width: "75%" }} />
          <div className="bg-secondary-fixed h-full" style={{ width: "25%" }} />
        </div>
        <div className="mt-4 pt-3 border-t border-outline-variant/40 flex justify-between text-xs font-stats-mono text-outline">
          <span>4th Wicket Partnership (Kohli &amp; Yadav/Pandya): 87 (54b)</span>
          <span className="text-secondary-fixed">Boundary %: 64.1%</span>
        </div>
      </div>
    </div>
  );
};

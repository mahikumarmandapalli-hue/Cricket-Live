/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import {
  BallEvent,
  BatterStat,
  BowlerStat,
  IMAGES,
  INITIAL_BETTING_ODDS,
  INITIAL_COMMENTARY,
  INITIAL_LAST_BALLS,
  SCORECARD_BATTING,
  SCORECARD_BOWLING,
} from "./data/matchData";
import {
  MatchInfoTab,
  MatchScorecardTab,
  MatchStatsTab,
} from "./components/MatchSubTabs";
import {
  HomeScreen,
  MoreScreen,
  NewsScreen,
  PlayerDetailModal,
  SeriesScreen,
} from "./components/BottomNavScreens";
import {
  CricApiMatch,
  SessionTableCard,
} from "./components/SessionTableCard";

type MainNavTab = "home" | "matches" | "news" | "series" | "more";
type MatchTab = "INFO" | "LIVE" | "SCORECARD" | "STATS";

const DYNAMIC_BALL_TEMPLATES: Array<{
  runs: number;
  type: "normal" | "four" | "six";
  speed: string;
  length: string;
  shotDesc: string;
}> = [
  {
    runs: 4,
    type: "four",
    speed: "145 KPH",
    length: "YORKER",
    shotDesc:
      "Pinpoint yorker attempt squeezed out! Sliced past backward point for a blazing boundary.",
  },
  {
    runs: 1,
    type: "normal",
    speed: "141 KPH",
    length: "BACK OF LENGTH",
    shotDesc:
      "Punched off the back foot to deep cover for a brisk single to rotate the strike.",
  },
  {
    runs: 6,
    type: "six",
    speed: "143 KPH",
    length: "FULL",
    shotDesc:
      "Launched into the night sky! Steps into the line and sends a 143kph thunderbolt deep into the stands.",
  },
  {
    runs: 2,
    type: "normal",
    speed: "144 KPH",
    length: "FULL TOSS",
    shotDesc:
      "Driven hard into the wide long-on pocket, electric running between the wickets nets two runs.",
  },
  {
    runs: 4,
    type: "four",
    speed: "139 KPH",
    length: "SHORT",
    shotDesc:
      "Pulled with authority! Swivels on the back foot andsplits deep mid-wicket and deep square leg.",
  },
  {
    runs: 1,
    type: "normal",
    speed: "142 KPH",
    length: "GOOD LENGTH",
    shotDesc:
      "Angled into the pads, clipped neatly toward deep square leg for a comfortable single.",
  },
  {
    runs: 6,
    type: "six",
    speed: "140 KPH",
    length: "SLOT",
    shotDesc:
      "In the slot and dispatched! Pure bat speed carries it 92 meters over extra cover.",
  },
  {
    runs: 3,
    type: "normal",
    speed: "143 KPH",
    length: "FULL",
    shotDesc:
      "Timed sweetly through extra cover, the boundary rider hauls it in just inside the rope as they run three.",
  },
];

export default function App() {
  const [activeNav, setActiveNav] = useState<MainNavTab>("matches");
  const [activeMatchTab, setActiveMatchTab] = useState<MatchTab>("LIVE");

  // Core dynamic match states using useState for runs, overs, balls
  const [runs, setRuns] = useState<number>(184);
  const [overs, setOvers] = useState<number>(18);
  const [balls, setBalls] = useState<number>(2);
  const [wickets, setWickets] = useState<number>(4);
  const [isAutoLive, setIsAutoLive] = useState<boolean>(true);
  const [simStep, setSimStep] = useState<number>(0);

  // Active batters & bowler dynamic counters
  const [striker, setStriker] = useState<"kohli" | "yadav">("kohli");
  const [kohliRuns, setKohliRuns] = useState<number>(74);
  const [kohliBalls, setKohliBalls] = useState<number>(42);
  const [yadavRuns, setYadavRuns] = useState<number>(28);
  const [yadavBalls, setYadavBalls] = useState<number>(18);

  const [starcOvers, setStarcOvers] = useState<number>(3);
  const [starcBalls, setStarcBalls] = useState<number>(2);
  const [starcRuns, setStarcRuns] = useState<number>(32);

  // Balls & commentary feed
  const [lastBalls, setLastBalls] = useState<BallEvent[]>(INITIAL_LAST_BALLS);
  const [commentaryList, setCommentaryList] =
    useState<BallEvent[]>(INITIAL_COMMENTARY);
  const [selectedBall, setSelectedBall] = useState<BallEvent | null>(null);

  // Interactive modals & drawers
  const [selectedPlayer, setSelectedPlayer] = useState<
    BatterStat | BowlerStat | null
  >(null);
  const [selectedOdd, setSelectedOdd] = useState<{
    provider: string;
    team: "IND" | "AUS";
    odd: string;
  } | null>(null);
  const [stakeAmount, setStakeAmount] = useState<number>(50);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [oddsFormat, setOddsFormat] = useState<"decimal" | "fractional">(
    "decimal"
  );

  // cricketdata.org API state & fallback mode
  const [apiMatches, setApiMatches] = useState<CricApiMatch[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState<string>("sim");
  const [isFallbackMode, setIsFallbackMode] = useState<boolean>(true);
  const [apiReason, setApiReason] = useState<string>("");
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false);
  const [matchTitle, setMatchTitle] = useState<string>(
    "T20 WORLD CUP - MATCH 42"
  );
  const [team1Short, setTeam1Short] = useState<string>("IND");
  const [team2Short, setTeam2Short] = useState<string>("AUS");
  const [team2ScoreText, setTeam2ScoreText] = useState<string>("Yet to bat");
  const [totalMatchOvers, setTotalMatchOvers] = useState<number>(20);

  const applyApiMatchToState = (match: CricApiMatch) => {
    setSelectedMatchId(match.id);
    setMatchTitle((match.name || "LIVE MATCH").toUpperCase().slice(0, 36));

    const t1 =
      match.teamInfo?.[0]?.shortname ||
      match.teams?.[0]?.slice(0, 3).toUpperCase() ||
      "IND";
    const t2 =
      match.teamInfo?.[1]?.shortname ||
      match.teams?.[1]?.slice(0, 3).toUpperCase() ||
      "AUS";
    setTeam1Short(t1);
    setTeam2Short(t2);

    const isOdi =
      match.matchType?.toLowerCase() === "odi" ||
      (match.score && match.score.some((s) => s.o > 20));
    setTotalMatchOvers(isOdi ? 50 : 20);

    if (match.score && match.score.length > 0) {
      const latestInning = match.score[match.score.length - 1];
      const r = typeof latestInning.r === "number" ? latestInning.r : 184;
      const w = typeof latestInning.w === "number" ? latestInning.w : 4;
      const rawOvers = typeof latestInning.o === "number" ? latestInning.o : 18.2;
      const parsedOvers = Math.floor(rawOvers);
      const parsedBalls = Math.min(
        5,
        Math.round((rawOvers - parsedOvers) * 10)
      );

      setRuns(r);
      setWickets(w);
      setOvers(parsedOvers);
      setBalls(parsedBalls);

      if (match.score.length > 1) {
        const firstInning = match.score[0];
        setTeam2ScoreText(
          `${firstInning.r}/${firstInning.w} (${firstInning.o} OV)`
        );
      } else {
        setTeam2ScoreText("Yet to bat");
      }
    }
  };

  const fetchCurrentMatches = async () => {
    setIsLoadingApi(true);
    try {
      const res = await fetch("/api/current-matches");
      const json = await res.json();

      if (
        json &&
        json.status === "success" &&
        Array.isArray(json.data) &&
        json.data.length > 0
      ) {
        setApiMatches(json.data);
        setIsFallbackMode(false);
        setApiReason("Live from cricketdata.org");
        // Find first match with score data
        const matchWithScore =
          json.data.find(
            (m: CricApiMatch) => Array.isArray(m.score) && m.score.length > 0
          ) || json.data[0];
        if (matchWithScore) {
          applyApiMatchToState(matchWithScore);
        }
      } else {
        // Fallback to simulation formula when API hits finished or key exhausted
        setIsFallbackMode(true);
        setApiReason(
          json?.reason || "API hits finished — using live simulation formula"
        );
      }
    } catch {
      setIsFallbackMode(true);
      setApiReason("API unreachable — using live simulation formula");
    } finally {
      setIsLoadingApi(false);
    }
  };

  useEffect(() => {
    fetchCurrentMatches();
  }, []);

  const handleSelectMatch = (match: CricApiMatch | null) => {
    if (!match) {
      setSelectedMatchId("sim");
      setIsFallbackMode(true);
      setMatchTitle("T20 WORLD CUP - MATCH 42");
      setTeam1Short("IND");
      setTeam2Short("AUS");
      setTeam2ScoreText("Yet to bat");
      setTotalMatchOvers(20);
      handleResetMatch();
      return;
    }
    setIsFallbackMode(false);
    applyApiMatchToState(match);
  };

  // Derived match telemetry: CRR, ballsLeft, and Projected Score
  const totalBallsBowled = overs * 6 + balls;
  const maxMatchBalls = totalMatchOvers * 6;
  const ballsLeft = Math.max(0, maxMatchBalls - totalBallsBowled);
  const crrNumber = totalBallsBowled > 0 ? (runs / totalBallsBowled) * 6 : 0;
  const crr = crrNumber.toFixed(2);
  const projectedScore = Math.round(runs + (crrNumber * ballsLeft) / 6);

  const formattedOvers = `${overs}.${balls}`;
  const formattedStarcOvers = `${starcOvers}.${starcBalls}`;
  const starcTotalBalls = starcOvers * 6 + starcBalls;
  const starcEcon =
    starcTotalBalls > 0 ? ((starcRuns / starcTotalBalls) * 6).toFixed(2) : "0.00";

  const kohliSr =
    kohliBalls > 0 ? ((kohliRuns / kohliBalls) * 100).toFixed(2) : "0.00";
  const yadavSr =
    yadavBalls > 0 ? ((yadavRuns / yadavBalls) * 100).toFixed(2) : "0.00";

  const indWinProb = Math.min(
    95,
    Math.max(35, Math.round(65 + (projectedScore - 202) * 0.6))
  );

  const handleResetMatch = () => {
    setSimStep(0);
    setRuns(184);
    setOvers(18);
    setBalls(2);
    setWickets(4);
    setStriker("kohli");
    setKohliRuns(74);
    setKohliBalls(42);
    setYadavRuns(28);
    setYadavBalls(18);
    setStarcOvers(3);
    setStarcBalls(2);
    setStarcRuns(32);
    setLastBalls(INITIAL_LAST_BALLS);
    setCommentaryList(INITIAL_COMMENTARY);
    setSelectedBall(null);
  };

  // Advance match by 1 ball
  const advanceOneBall = () => {
    // If 50 overs are completed, reset back to 18.2 to keep the live demo looping smoothly
    if (overs >= 50) {
      handleResetMatch();
      return;
    }

    const template =
      DYNAMIC_BALL_TEMPLATES[simStep % DYNAMIC_BALL_TEMPLATES.length];
    const runScored = template.runs;

    const nextBallNum = balls + 1;
    const isOverComplete = nextBallNum === 6;
    const nextOvers = isOverComplete ? overs + 1 : overs;
    const nextBalls = isOverComplete ? 0 : nextBallNum;
    const ballOverLabel = `${overs}.${nextBallNum}`;

    const batterName = striker === "kohli" ? "Kohli" : "Yadav";
    const outcomeLabel =
      template.type === "six"
        ? "SIX!"
        : template.type === "four"
        ? "FOUR!"
        : `${runScored} run${runScored > 1 ? "s" : ""}.`;

    const newBallEvent: BallEvent = {
      id: `live-${Date.now()}-${simStep}`,
      over: ballOverLabel,
      value: String(runScored),
      type: template.type,
      bowler: "Starc",
      batter: batterName,
      speed: template.speed,
      length: template.length,
      title: `Starc to ${batterName}, ${outcomeLabel}`,
      commentary: template.shotDesc,
    };

    // Update runs, overs, balls
    setRuns((prev) => prev + runScored);
    setOvers(nextOvers);
    setBalls(nextBalls);
    setSimStep((prev) => prev + 1);

    // Update active batter stats
    if (striker === "kohli") {
      setKohliRuns((prev) => prev + runScored);
      setKohliBalls((prev) => prev + 1);
    } else {
      setYadavRuns((prev) => prev + runScored);
      setYadavBalls((prev) => prev + 1);
    }

    // Rotate strike on odd runs or end of over
    const oddRun = runScored % 2 === 1;
    if ((oddRun && !isOverComplete) || (!oddRun && isOverComplete)) {
      setStriker((prev) => (prev === "kohli" ? "yadav" : "kohli"));
    }

    // Update bowler stats
    const nextStarcBall = starcBalls + 1;
    if (nextStarcBall === 6) {
      setStarcOvers((prev) => prev + 1);
      setStarcBalls(0);
    } else {
      setStarcBalls(nextStarcBall);
    }
    setStarcRuns((prev) => prev + runScored);

    // Update last balls & commentary
    setLastBalls((prev) => {
      const updated = [...prev, newBallEvent];
      if (isOverComplete && nextOvers < 20) {
        updated.push({
          id: `div-${nextOvers}-${Date.now()}`,
          over: `${nextOvers}.0`,
          value: "|",
          type: "divider",
        });
      }
      return updated.slice(-13);
    });

    setCommentaryList((prev) => [newBallEvent, ...prev]);
  };

  // Keep a ref to the latest advanceOneBall function so our 5-second interval always has fresh state
  const advanceRef = useRef(advanceOneBall);
  advanceRef.current = advanceOneBall;

  // Auto-increase runs every 5 seconds to simulate live match
  useEffect(() => {
    if (!isAutoLive) return;
    const intervalId = setInterval(() => {
      advanceRef.current();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [isAutoLive]);

  const formatOddValue = (decStr: string) => {
    if (oddsFormat === "decimal") return decStr;
    const val = parseFloat(decStr);
    if (val === 1.55) return "11/20";
    if (val === 2.45) return "29/20";
    if (val === 1.58) return "29/50";
    if (val === 2.4) return "7/5";
    if (val === 1.54) return "27/50";
    if (val === 2.5) return "6/4";
    return decStr;
  };

  const filteredCommentary = searchQuery.trim()
    ? commentaryList.filter(
        (c) =>
          c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.commentary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.over.includes(searchQuery)
      )
    : commentaryList;

  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen flex flex-col pb-safe">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant transition-colors duration-200">
        <div className="flex justify-between items-center px-container-margin py-stack-gap-sm w-full max-w-3xl mx-auto">
          <div
            onClick={() => {
              setActiveNav("matches");
              setActiveMatchTab("LIVE");
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                alt="User profile avatar"
                referrerPolicy="no-referrer"
                src={IMAGES.userAvatar}
              />
            </div>
            <span className="font-headline-md text-headline-md font-bold text-primary">
              CRICKET LIVE
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsAutoLive((prev) => !prev)}
              className={`font-label-caps text-label-caps text-[11px] px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                isAutoLive
                  ? "border-secondary-fixed/40 text-secondary-fixed bg-secondary-fixed/10"
                  : "border-outline-variant text-outline bg-surface-container-high"
              }`}
              title="Toggle 5-second auto live simulation"
            >
              {isAutoLive ? "AUTO 5S: ON" : "AUTO 5S: PAUSED"}
            </button>
            {simStep > 0 && (
              <button
                onClick={handleResetMatch}
                className="font-label-caps text-label-caps text-[11px] text-outline hover:text-primary px-2 py-1 rounded border border-outline-variant/60 cursor-pointer"
                title="Reset to 18.2 OV"
              >
                RESET
              </button>
            )}
            <button
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label="Search"
              className="text-primary hover:bg-surface-container-highest p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined">
                {searchOpen ? "close" : "search"}
              </span>
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="px-container-margin pb-3 max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-outline absolute left-3 text-lg">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter commentary by player (Kohli, Starc), shot, or over..."
                className="w-full bg-surface-container-lowest border border-outline-variant focus:border-tertiary rounded-lg pl-10 pr-9 py-2 text-body-sm text-primary placeholder:text-outline focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 text-outline hover:text-primary"
                >
                  <span className="material-symbols-outlined text-base">
                    cancel
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto pb-24 w-full max-w-3xl mx-auto">
        {activeNav === "matches" && (
          <>
            {/* Match Header / Summary */}
            <section className="bg-surface-container border-b border-outline-variant relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at top right, #00fe66 0%, transparent 40%)",
                }}
              />
              <div className="px-container-margin py-stack-gap-md relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={advanceOneBall}
                      title="Click to trigger next ball immediately"
                      className="font-label-caps text-label-caps text-secondary-fixed bg-secondary-fixed/20 px-2 py-1 rounded flex items-center gap-1 border border-secondary-fixed/30 hover:bg-secondary-fixed/30 transition-colors cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 bg-secondary-fixed rounded-full live-pulse" />{" "}
                      LIVE
                    </button>
                    <span className="font-label-caps text-label-caps text-on-surface-variant">
                      {matchTitle}
                    </span>
                  </div>
                  <span className="font-stats-mono text-xs text-outline">
                    {ballsLeft} BALLS LEFT
                  </span>
                </div>

                <div className="grid grid-cols-3 items-center mb-6">
                  {/* Team 1 */}
                  <div className="flex flex-col items-start gap-1">
                    <div className="w-12 h-12 rounded bg-surface-container-high flex items-center justify-center border border-outline-variant overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        alt="India team logo"
                        referrerPolicy="no-referrer"
                        src={IMAGES.indLogo}
                      />
                    </div>
                    <span className="font-headline-md text-headline-md mt-2">
                      {team1Short}
                    </span>
                    <div className="flex items-end gap-1">
                      <span className="font-display-score text-display-score text-primary transition-all duration-200">
                        {runs}
                      </span>
                      <span className="font-headline-md text-headline-md text-on-surface-variant pb-2">
                        /{wickets}
                      </span>
                    </div>
                    <span className="font-stats-mono text-stats-mono text-outline">
                      {formattedOvers} OV
                    </span>
                  </div>

                  {/* VS / Info */}
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <span className="font-headline-md text-headline-md text-outline">
                      VS
                    </span>
                    <div className="flex flex-col items-center">
                      <span className="font-label-caps text-label-caps text-on-surface-variant">
                        CRR
                      </span>
                      <span className="font-stats-mono text-stats-mono text-primary">
                        {crr}
                      </span>
                      <div className="flex flex-col items-center mt-2">
                        <span className="font-label-caps text-label-caps text-on-surface-variant">
                          PROJ
                        </span>
                        <span className="font-stats-mono text-stats-mono text-secondary-fixed">
                          {projectedScore}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Team 2 */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="w-12 h-12 rounded bg-surface-container-high flex items-center justify-center border border-outline-variant overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        alt="Australia team logo"
                        referrerPolicy="no-referrer"
                        src={IMAGES.ausLogo}
                      />
                    </div>
                    <span className="font-headline-md text-headline-md mt-2">
                      {team2Short}
                    </span>
                    <span className="font-stats-mono text-stats-mono text-outline mt-1 text-right">
                      {team2ScoreText}
                    </span>
                  </div>
                </div>

                {/* Win Probability Bar */}
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex justify-between font-label-caps text-label-caps">
                    <span className="text-tertiary">IND {indWinProb}%</span>
                    <span className="text-on-surface-variant">
                      WIN PROBABILITY
                    </span>
                    <span className="text-secondary-fixed">
                      AUS {100 - indWinProb}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-highest flex rounded-full overflow-hidden relative">
                    <div
                      className="bg-tertiary h-full transition-all duration-300"
                      style={{ width: `${indWinProb}%` }}
                    />
                    <div
                      className="w-0.5 h-full bg-on-surface absolute z-10 transition-all duration-300"
                      style={{ left: `${indWinProb}%` }}
                    />
                    <div
                      className="bg-secondary-fixed h-full transition-all duration-300"
                      style={{ width: `${100 - indWinProb}%` }}
                    />
                  </div>
                  <div className="flex justify-between font-stats-mono text-stats-mono mt-1">
                    <span className="text-tertiary">
                      IND: {formatOddValue("1.55")}
                    </span>
                    <span className="text-secondary-fixed">
                      AUS: {formatOddValue("2.45")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-t border-outline-variant px-container-margin overflow-x-auto no-scrollbar">
                {(["INFO", "LIVE", "SCORECARD", "STATS"] as MatchTab[]).map(
                  (tab) => {
                    const isActive = activeMatchTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveMatchTab(tab)}
                        className={`py-3 px-4 font-label-caps text-label-caps transition-colors whitespace-nowrap relative cursor-pointer ${
                          isActive
                            ? "text-primary border-b-2 border-primary"
                            : "text-on-surface-variant hover:text-primary"
                        }`}
                      >
                        {tab}
                        {tab === "LIVE" && (
                          <span className="absolute top-1 right-2 w-1.5 h-1.5 bg-secondary-fixed rounded-full" />
                        )}
                      </button>
                    );
                  }
                )}
              </div>
            </section>

            {/* Inner Tab Content */}
            {activeMatchTab === "LIVE" && (
              <div className="p-container-margin flex flex-col gap-stack-md">
                {/* Current Players Mini-Stats, Session Table & Betting Odds */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  {/* Dark Theme Dynamic Session Table (10 to 50 Overs) */}
                  <SessionTableCard
                    runs={runs}
                    overs={overs}
                    balls={balls}
                    wickets={wickets}
                    crrNumber={crrNumber}
                    apiMatches={apiMatches}
                    selectedMatchId={selectedMatchId}
                    onSelectMatch={handleSelectMatch}
                    isFallbackMode={isFallbackMode}
                    apiReason={apiReason}
                    onRefreshApi={fetchCurrentMatches}
                    isLoadingApi={isLoadingApi}
                  />

                  {/* Betting Odds */}
                  <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant md:col-span-2">
                    <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">
                        payments
                      </span>
                      BETTING ODDS
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead className="border-b border-outline-variant">
                          <tr className="font-label-caps text-label-caps text-outline">
                            <th className="py-2">PROVIDER</th>
                            <th className="py-2 text-center">IND (BACK)</th>
                            <th className="py-2 text-center">AUS (BACK)</th>
                          </tr>
                        </thead>
                        <tbody className="font-stats-mono text-stats-mono">
                          {INITIAL_BETTING_ODDS.map((item, idx) => {
                            const isLast =
                              idx === INITIAL_BETTING_ODDS.length - 1;
                            return (
                              <tr
                                key={item.provider}
                                className={
                                  !isLast
                                    ? "border-b border-outline-variant/30"
                                    : ""
                                }
                              >
                                <td className="py-3 text-primary">
                                  {item.provider}
                                </td>
                                <td className="py-3 text-center">
                                  <button
                                    onClick={() =>
                                      setSelectedOdd({
                                        provider: item.provider,
                                        team: "IND",
                                        odd: item.indBack,
                                      })
                                    }
                                    className="text-secondary-fixed hover:bg-secondary-fixed/15 px-2.5 py-1 rounded transition-colors cursor-pointer"
                                  >
                                    {formatOddValue(item.indBack)}
                                  </button>
                                </td>
                                <td className="py-3 text-center">
                                  <button
                                    onClick={() =>
                                      setSelectedOdd({
                                        provider: item.provider,
                                        team: "AUS",
                                        odd: item.ausBack,
                                      })
                                    }
                                    className="text-secondary-fixed hover:bg-secondary-fixed/15 px-2.5 py-1 rounded transition-colors cursor-pointer"
                                  >
                                    {formatOddValue(item.ausBack)}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Interactive Odds Return Calculator Drawer */}
                    {selectedOdd && (
                      <div className="mt-3 pt-3 border-t border-outline-variant flex flex-wrap items-center justify-between gap-3 bg-surface-container-high/60 p-3 rounded-lg">
                        <div className="text-xs font-stats-mono">
                          <span className="text-primary font-bold">
                            {selectedOdd.provider} · {selectedOdd.team} @{" "}
                            {selectedOdd.odd}
                          </span>
                          <span className="block text-outline mt-0.5">
                            Est. Return: $
                            {(
                              stakeAmount * parseFloat(selectedOdd.odd)
                            ).toFixed(2)}{" "}
                            (Profit: +$
                            {(
                              stakeAmount *
                              (parseFloat(selectedOdd.odd) - 1)
                            ).toFixed(2)}
                            )
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {[25, 50, 100].map((amt) => (
                            <button
                              key={amt}
                              onClick={() => setStakeAmount(amt)}
                              className={`px-2 py-1 rounded text-xs font-stats-mono border cursor-pointer ${
                                stakeAmount === amt
                                  ? "bg-secondary-container text-on-secondary-fixed border-secondary-fixed font-bold"
                                  : "bg-surface-container border-outline-variant text-outline"
                              }`}
                            >
                              ${amt}
                            </button>
                          ))}
                          <button
                            onClick={() => setSelectedOdd(null)}
                            className="text-outline hover:text-primary p-1 cursor-pointer"
                            aria-label="Close calculator"
                          >
                            <span className="material-symbols-outlined text-base">
                              close
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Batsmen */}
                  <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
                    <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 flex items-center gap-2">
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">
                            sports_cricket
                          </span>
                          BATTERS
                        </div>
                        <div className="flex gap-6 mr-2">
                          <span>R</span>
                          <span>B</span>
                          <span>SR</span>
                        </div>
                      </div>
                    </h3>
                    <div className="flex flex-col gap-4">
                      {/* Virat Kohli */}
                      <div
                        onClick={() =>
                          setSelectedPlayer({
                            ...SCORECARD_BATTING[2],
                            runs: kohliRuns,
                            balls: kohliBalls,
                            sr: kohliSr,
                          })
                        }
                        className={`flex justify-between items-center p-2 rounded cursor-pointer transition-colors ${
                          striker === "kohli"
                            ? "bg-surface-container-highest/50"
                            : "hover:bg-surface-container-highest/40"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant shrink-0">
                            <img
                              alt="V Kohli"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                              src={IMAGES.kohliAvatar}
                            />
                          </div>
                          <span
                            className={`font-headline-md text-headline-md ${
                              striker === "kohli"
                                ? "text-primary"
                                : "text-on-surface-variant"
                            }`}
                          >
                            {striker === "kohli" ? "*V Kohli" : "V Kohli"}
                          </span>
                        </div>
                        <div className="flex items-center gap-6">
                          <span
                            className={`font-headline-md text-headline-md w-8 text-right ${
                              striker === "kohli"
                                ? "text-primary"
                                : "text-on-surface-variant"
                            }`}
                          >
                            {kohliRuns}
                          </span>
                          <span className="font-stats-mono text-stats-mono text-outline w-6 text-right">
                            {kohliBalls}
                          </span>
                          <span
                            className={`font-stats-mono text-stats-mono w-12 text-right ${
                              striker === "kohli"
                                ? "text-secondary-fixed"
                                : "text-outline"
                            }`}
                          >
                            {kohliSr}
                          </span>
                        </div>
                      </div>

                      {/* S Yadav */}
                      <div
                        onClick={() =>
                          setSelectedPlayer({
                            ...SCORECARD_BATTING[4],
                            runs: yadavRuns,
                            balls: yadavBalls,
                            sr: yadavSr,
                          })
                        }
                        className={`flex justify-between items-center p-2 rounded cursor-pointer transition-colors ${
                          striker === "yadav"
                            ? "bg-surface-container-highest/50"
                            : "hover:bg-surface-container-highest/40"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant shrink-0">
                            <img
                              alt="S Yadav"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                              src={IMAGES.yadavAvatar}
                            />
                          </div>
                          <span
                            className={`font-headline-md text-headline-md ${
                              striker === "yadav"
                                ? "text-primary"
                                : "text-on-surface-variant"
                            }`}
                          >
                            {striker === "yadav" ? "*S Yadav" : "S Yadav"}
                          </span>
                        </div>
                        <div className="flex items-center gap-6">
                          <span
                            className={`font-headline-md text-headline-md w-8 text-right ${
                              striker === "yadav"
                                ? "text-primary"
                                : "text-on-surface-variant"
                            }`}
                          >
                            {yadavRuns}
                          </span>
                          <span className="font-stats-mono text-stats-mono text-outline w-6 text-right">
                            {yadavBalls}
                          </span>
                          <span
                            className={`font-stats-mono text-stats-mono w-12 text-right ${
                              striker === "yadav"
                                ? "text-secondary-fixed"
                                : "text-outline"
                            }`}
                          >
                            {yadavSr}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bowler */}
                  <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant">
                    <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 flex items-center gap-2">
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">
                            sports_baseball
                          </span>
                          BOWLER
                        </div>
                        <div className="flex gap-4 mr-2">
                          <span>O-M-R-W</span>
                          <span>ECON</span>
                        </div>
                      </div>
                    </h3>
                    <div
                      onClick={() =>
                        setSelectedPlayer({
                          ...SCORECARD_BOWLING[0],
                          overs: formattedStarcOvers,
                          runs: starcRuns,
                          econ: starcEcon,
                        })
                      }
                      className="flex justify-between items-center bg-surface-container-highest/50 p-3 rounded cursor-pointer hover:bg-surface-container-highest transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant shrink-0">
                            <img
                              alt="M Starc"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                              src={IMAGES.starcAvatar}
                            />
                          </div>
                          <span className="font-headline-md text-headline-md text-primary">
                            M Starc
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="bg-surface-container-high px-2 py-0.5 rounded border border-outline-variant">
                            <span className="font-stats-mono text-stats-mono text-outline">
                              PACE:{" "}
                            </span>
                            <span className="font-stats-mono text-stats-mono text-secondary-fixed">
                              142kph
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-stats-mono text-stats-mono text-primary">
                          {formattedStarcOvers}-0-{starcRuns}-1
                        </span>
                        <span className="font-stats-mono text-stats-mono text-secondary-fixed">
                          {starcEcon}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Last 12 Balls */}
                <div className="bg-surface-container rounded-xl p-card-padding border border-outline-variant overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-label-caps text-label-caps text-on-surface-variant">
                      LAST 12 BALLS
                    </h3>
                    {selectedBall && (
                      <button
                        onClick={() => setSelectedBall(null)}
                        className="font-stats-mono text-xs text-tertiary hover:underline cursor-pointer"
                      >
                        Over {selectedBall.over}: {selectedBall.title} ✕
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar items-center">
                    {lastBalls.map((ball) => {
                      if (ball.type === "divider") {
                        return (
                          <div
                            key={ball.id}
                            className="w-px h-8 bg-outline-variant mx-1 shrink-0"
                          />
                        );
                      }

                      let badgeClasses =
                        "w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-stats-mono text-stats-mono text-primary shrink-0 cursor-pointer transition-transform hover:scale-105";
                      if (ball.type === "four") {
                        badgeClasses =
                          "w-8 h-8 rounded-full bg-tertiary-container text-tertiary border border-tertiary/30 flex items-center justify-center font-stats-mono text-stats-mono shrink-0 cursor-pointer transition-transform hover:scale-105";
                      } else if (ball.type === "wicket") {
                        badgeClasses =
                          "w-8 h-8 rounded-full bg-error-container text-error border border-error/30 flex items-center justify-center font-stats-mono text-stats-mono shrink-0 cursor-pointer transition-transform hover:scale-105";
                      } else if (ball.type === "six") {
                        badgeClasses =
                          "w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container border border-secondary-fixed/30 flex items-center justify-center font-stats-mono text-stats-mono shrink-0 cursor-pointer transition-transform hover:scale-105";
                      }

                      return (
                        <button
                          key={ball.id}
                          onClick={() =>
                            setSelectedBall(
                              selectedBall?.id === ball.id ? null : ball
                            )
                          }
                          className={`${badgeClasses} ${
                            selectedBall?.id === ball.id
                              ? "ring-2 ring-primary"
                              : ""
                          }`}
                        >
                          {ball.value}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Ball by Ball Commentary */}
                <div className="flex flex-col gap-stack-sm mt-4">
                  <div className="flex justify-between items-center px-2">
                    <h3 className="font-label-caps text-label-caps text-on-surface-variant">
                      COMMENTARY
                    </h3>
                    <button
                      onClick={advanceOneBall}
                      className="font-stats-mono text-xs text-secondary-fixed hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>+ NEXT BALL</span>
                    </button>
                  </div>

                  {filteredCommentary.map((item, index) => {
                    const isBoundaryHighlight =
                      index === 0 ||
                      item.type === "six" ||
                      item.type === "four" ||
                      item.type === "wicket";

                    if (index === 0 || item.type === "six") {
                      return (
                        <div
                          key={item.id}
                          className="flex gap-4 p-card-padding bg-surface-container rounded-xl border-l-2 border-secondary-fixed relative overflow-hidden"
                        >
                          <div className="absolute inset-y-0 left-0 w-8 bg-secondary-fixed/5" />
                          <div className="flex flex-col items-center min-w-[3rem] z-10">
                            <span className="font-stats-mono text-stats-mono text-outline">
                              {item.over}
                            </span>
                            <span className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-stats-mono text-stats-mono mt-1 font-bold">
                              {item.value}
                            </span>
                          </div>
                          <div className="flex-1 z-10">
                            <p className="font-body-lg text-body-lg text-primary">
                              <span className="font-bold">{item.title}</span>{" "}
                              {item.commentary}
                            </p>
                            {item.speed && item.length && (
                              <div className="flex gap-2 mt-2">
                                <span className="font-label-caps text-label-caps bg-surface-container-highest px-2 py-1 rounded text-outline">
                                  {item.speed}
                                </span>
                                <span className="font-label-caps text-label-caps bg-surface-container-highest px-2 py-1 rounded text-outline">
                                  {item.length}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={item.id}
                        className="flex gap-4 p-card-padding bg-surface-container rounded-xl border border-outline-variant"
                      >
                        <div className="flex flex-col items-center min-w-[3rem]">
                          <span className="font-stats-mono text-stats-mono text-outline">
                            {item.over}
                          </span>
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-stats-mono text-stats-mono mt-1 ${
                              item.type === "wicket"
                                ? "bg-error-container text-error border border-error/30 font-bold"
                                : item.type === "four"
                                ? "bg-tertiary-container text-tertiary border border-tertiary/30 font-bold"
                                : "bg-surface-container-high text-primary"
                            }`}
                          >
                            {item.value}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            <span className="font-bold text-primary">
                              {item.title}
                            </span>{" "}
                            {item.commentary}
                          </p>
                          {isBoundaryHighlight && item.speed && item.length && (
                            <div className="flex gap-2 mt-2">
                              <span className="font-label-caps text-label-caps bg-surface-container-highest px-2 py-1 rounded text-outline">
                                {item.speed}
                              </span>
                              <span className="font-label-caps text-label-caps bg-surface-container-highest px-2 py-1 rounded text-outline">
                                {item.length}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeMatchTab === "INFO" && <MatchInfoTab />}

            {activeMatchTab === "SCORECARD" && (
              <MatchScorecardTab
                currentScore={runs}
                currentWickets={wickets}
                currentOvers={formattedOvers}
                kohliRuns={kohliRuns}
                kohliBalls={kohliBalls}
                yadavRuns={yadavRuns}
                yadavBalls={yadavBalls}
                starcOvers={formattedStarcOvers}
                starcRuns={starcRuns}
                onSelectPlayer={(player) => setSelectedPlayer(player)}
              />
            )}

            {activeMatchTab === "STATS" && <MatchStatsTab />}
          </>
        )}

        {activeNav === "home" && (
          <HomeScreen
            onOpenMatch={() => {
              setActiveNav("matches");
              setActiveMatchTab("LIVE");
            }}
            onOpenNews={() => setActiveNav("news")}
            onOpenSeries={() => setActiveNav("series")}
          />
        )}

        {activeNav === "news" && <NewsScreen />}

        {activeNav === "series" && <SeriesScreen />}

        {activeNav === "more" && (
          <MoreScreen
            oddsFormat={oddsFormat}
            setOddsFormat={setOddsFormat}
            onSimulateNextBall={advanceOneBall}
            onResetMatch={handleResetMatch}
            simStep={simStep}
          />
        )}
      </main>

      {/* Player Telemetry Modal */}
      <PlayerDetailModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 border-t border-outline-variant shadow-lg bg-surface-container">
        <div className="w-full max-w-3xl mx-auto flex justify-around items-center pt-2 pb-2">
          <button
            onClick={() => setActiveNav("home")}
            className={`flex flex-col items-center justify-center px-4 py-1 scale-95 active:scale-90 transition-transform cursor-pointer ${
              activeNav === "home"
                ? "bg-secondary-container text-on-secondary-container rounded-full"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined mb-1">home</span>
            <span className="font-label-caps text-label-caps">Home</span>
          </button>

          <button
            onClick={() => setActiveNav("matches")}
            className={`flex flex-col items-center justify-center px-4 py-1 scale-95 active:scale-90 transition-transform cursor-pointer ${
              activeNav === "matches"
                ? "bg-secondary-container text-on-secondary-container rounded-full"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span
              className="material-symbols-outlined mb-1"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sports_cricket
            </span>
            <span className="font-label-caps text-label-caps">Matches</span>
          </button>

          <button
            onClick={() => setActiveNav("news")}
            className={`flex flex-col items-center justify-center px-4 py-1 scale-95 active:scale-90 transition-transform cursor-pointer ${
              activeNav === "news"
                ? "bg-secondary-container text-on-secondary-container rounded-full"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined mb-1">article</span>
            <span className="font-label-caps text-label-caps">News</span>
          </button>

          <button
            onClick={() => setActiveNav("series")}
            className={`flex flex-col items-center justify-center px-4 py-1 scale-95 active:scale-90 transition-transform cursor-pointer ${
              activeNav === "series"
                ? "bg-secondary-container text-on-secondary-container rounded-full"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined mb-1">trophy</span>
            <span className="font-label-caps text-label-caps">Series</span>
          </button>

          <button
            onClick={() => setActiveNav("more")}
            className={`flex flex-col items-center justify-center px-4 py-1 scale-95 active:scale-90 transition-transform cursor-pointer ${
              activeNav === "more"
                ? "bg-secondary-container text-on-secondary-container rounded-full"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined mb-1">menu</span>
            <span className="font-label-caps text-label-caps">More</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

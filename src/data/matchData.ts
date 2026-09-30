export const IMAGES = {
  userAvatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC5enElwTvt_wXNpMLyq-oGNeZCg9RaBZ6qh6rGPT5_gT4YF8VvrExQO6N9QQJlXA5ST1D0m0JzbW2lXGpQdXfCpqUeXXBe5eE-lRglqt5LSo4BesAby29iZxQ7w9YmMtSp0MEXYDBN8qkXOtdjitz4jxSESjs3yJoroiEagJ4P6fheChrbXHXOkMB9jN686YHNv5TzCtHsFXewdDx2Vc-gMYjZKanpPX_u73U5_H3y9mLCLcJ12APO7g",
  indLogo:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCjL-O3parNB-Ygbiz7P4slwWJsNL3LT5ifgOzyYDj-xWle1SCEziZr7xs0R5sxcbO5fcuyWdua1ZTpPWuSTMrTNjQN3HtoP3Nw8t4QpFf5mi17HFJm4J-Ty3I7qes4nyUtD9bnlEg7XdtXJI38PNwVXNEK0IVxXAkUMqao5sAShZlgfgiRxD5Lgj8yz5I-M25-dgjv1DAk7FBbgcDgHaW1ouNbO7cNNl1l6KE7hfxt_Nkn89nfaYtiDQ",
  ausLogo:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDtFgw3PyXsUl0hpacD93RInUU7R9DDXRza6VgJoqLtecRwaFUQWeJgnWH1rvSikYboGdbp3JYYHQopUFZs2Jlqe6GwvbbMbj1GxplGU9-RcZC47eHUm6w8GbV8KJdEF97HREifs5BGP4i-myz7IGauM8KpG0u8VWogYrdxLHmQbS0RY3gjq6QJZ_lfjPt0XipMySpTIzuN5psTlPQDim_sEIOFo5TZIrdWpytMfF8yO80ldlNhvKpcAQ",
  kohliAvatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCKMQDdnhQ1XI7Bjr8jNjX39HsjUkbWydGwwKQoNQRY3sEp7BniZoF-WDy5bBQJxPcVt3JaaEjjj789U0fo5uP5WiPdyWqPSac6P0DwFtjSNj1FS2DO1D9ZDXkDoiUSu90DuHfcO255PTVV9yI4mjxXjvt7m5-OZGxTlLiq8hkKPPDbgMFgNp1iRLvBW86lyDX7tkFBT5OjkWqe3GLkA_9ybuXywNOLURjYhM0OB1BDNheHmjfRt0mBxQ",
  yadavAvatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD3HY8bRwjCvB8SVluUr7YnxyGHxSiTv603p61RRewh34MMNZGswmE9WLf_QcL8wC9UqNYECbFDMG-WAoStoe6ppqmPn3Hmju6knLchC-gjqj0vH-h4Cut33VEryU-2ntM0QRiTLZC6UXGO4jONOwUT3TadSW4jpFOVphfYqjEXRe4On5TNdf3_WNtR1eXDGmyvA47BZyYuCpZ4XrQVvaGN8mJnZFr_ZOuefbD5dcXLlZb_wcoT9F_CEw",
  starcAvatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCLIbCDuULj4qQlguFAs4SZ_NUP-ZsmWapfI2PiVe5j8X85DBEN8eKe8-YdotlTjgMaZIZx4I5nEOOBWtCrt_jG6TCZlQpGUMkmnx72G2I9F4Q04ay_FtWG5L0qMq1ZTgr3Z8WqFoioDmGBk4nb_6A46tKiVXcvaYRKcBPncMxBEDH-UuXaLV9aI0RZVeDujkYanndSqMjLt4Ioj-FY0jTIVWrC7M8RFs6a6nzsvyMrZGyAeps4kwjXlg",
};

export interface BallEvent {
  id: string;
  over: string;
  value: string;
  type: "normal" | "four" | "six" | "wicket" | "divider";
  bowler?: string;
  batter?: string;
  speed?: string;
  length?: string;
  title?: string;
  commentary?: string;
}

export interface BatterStat {
  id: string;
  name: string;
  fullName: string;
  avatar: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  sr: string;
  onStrike: boolean;
  status: string;
  dismissal?: string;
  role: string;
  recentZones: { zone: string; runs: number; pct: number }[];
}

export interface BowlerStat {
  id: string;
  name: string;
  fullName: string;
  avatar?: string;
  overs: string;
  maidens: number;
  runs: number;
  wickets: number;
  econ: string;
  pace: string;
  dots: number;
  spell: string;
}

export interface BettingOdd {
  provider: string;
  indBack: string;
  ausBack: string;
  drawBack?: string;
}

export const INITIAL_BETTING_ODDS: BettingOdd[] = [
  { provider: "Bet365", indBack: "1.55", ausBack: "2.45" },
  { provider: "1xBet", indBack: "1.58", ausBack: "2.40" },
  { provider: "Parimatch", indBack: "1.54", ausBack: "2.50" },
];

export const INITIAL_LAST_BALLS: BallEvent[] = [
  {
    id: "b-17-1",
    over: "17.1",
    value: "1",
    type: "normal",
    bowler: "Cummins",
    batter: "Kohli",
    speed: "138 KPH",
    length: "GOOD LENGTH",
    title: "Cummins to Kohli, 1 run.",
    commentary: "Tucked off the hip toward deep square leg for a brisk single.",
  },
  {
    id: "b-17-2",
    over: "17.2",
    value: "4",
    type: "four",
    bowler: "Cummins",
    batter: "Pandya",
    speed: "136 KPH",
    length: "SHORT",
    title: "Cummins to Pandya, FOUR!",
    commentary: "Banged in short, Hardik swivels and pulls fiercely through mid-wicket for four!",
  },
  {
    id: "b-17-3",
    over: "17.3",
    value: "2",
    type: "normal",
    bowler: "Cummins",
    batter: "Pandya",
    speed: "139 KPH",
    length: "FULL",
    title: "Cummins to Pandya, 2 runs.",
    commentary: "Driven firmly into the wide long-off pocket, they sprint back for the second.",
  },
  {
    id: "b-17-4",
    over: "17.4",
    value: "0",
    type: "normal",
    bowler: "Cummins",
    batter: "Pandya",
    speed: "124 KPH",
    length: "SLOWER BALL",
    title: "Cummins to Pandya, no run.",
    commentary: "Clever off-cutter into the pitch, deceives the batter completely.",
  },
  {
    id: "b-17-5",
    over: "17.5",
    value: "W",
    type: "wicket",
    bowler: "Cummins",
    batter: "Pandya",
    speed: "140 KPH",
    length: "BUMPER",
    title: "Cummins to Pandya, OUT! Caught at deep mid-wicket!",
    commentary: "Hardik skies the pull off a sharp rising delivery! Marsh settles underneath it near the ropes.",
  },
  {
    id: "b-17-6",
    over: "17.6",
    value: "1",
    type: "normal",
    bowler: "Cummins",
    batter: "Yadav",
    speed: "139 KPH",
    length: "BACK OF LENGTH",
    title: "Cummins to Yadav, 1 run.",
    commentary: "Guided down to third man to get off the mark and keep the strike rotating.",
  },
  {
    id: "div-18",
    over: "18.0",
    value: "|",
    type: "divider",
  },
  {
    id: "b-18-1",
    over: "18.2", // Note: in the visual sequence 6 and 1 are shown after the divider
    value: "6",
    type: "six",
    bowler: "Starc",
    batter: "Kohli",
    speed: "142 KPH",
    length: "LENGTH",
    title: "Starc to Kohli, SIX!",
    commentary:
      "What a shot! Length ball outside off, Kohli steps out and launches it over long-off. The crowd goes wild. Pure timing and power from the master.",
  },
  {
    id: "b-18-2",
    over: "18.1",
    value: "1",
    type: "normal",
    bowler: "Starc",
    batter: "Yadav",
    speed: "144 KPH",
    length: "FULL TOSS",
    title: "Starc to Yadav, 1 run.",
    commentary:
      "Full toss dipping in, pushed down to long-on for a single to rotate the strike.",
  },
];

export const INITIAL_COMMENTARY: BallEvent[] = [
  {
    id: "c-18-2",
    over: "18.2",
    value: "6",
    type: "six",
    bowler: "Starc",
    batter: "Kohli",
    speed: "142 KPH",
    length: "LENGTH",
    title: "Starc to Kohli, SIX!",
    commentary:
      "What a shot! Length ball outside off, Kohli steps out and launches it over long-off. The crowd goes wild. Pure timing and power from the master.",
  },
  {
    id: "c-18-1",
    over: "18.1",
    value: "1",
    type: "normal",
    bowler: "Starc",
    batter: "Yadav",
    speed: "144 KPH",
    length: "FULL TOSS",
    title: "Starc to Yadav, 1 run.",
    commentary:
      "Full toss dipping in, pushed down to long-on for a single to rotate the strike.",
  },
  {
    id: "c-17-6",
    over: "17.6",
    value: "1",
    type: "normal",
    bowler: "Cummins",
    batter: "Yadav",
    speed: "139 KPH",
    length: "GOOD LENGTH",
    title: "Cummins to Yadav, 1 run.",
    commentary:
      "Angled in toward off stump, Suryakumar opens the face late and glides it safely to deep third man.",
  },
  {
    id: "c-17-5",
    over: "17.5",
    value: "W",
    type: "wicket",
    bowler: "Cummins",
    batter: "Pandya",
    speed: "140 KPH",
    length: "SHORT",
    title: "Cummins to Pandya, OUT! Caught by Mitchell Marsh!",
    commentary:
      "Breakthrough for Australia! Heavy short ball climbs onto Hardik Pandya as he looks to clear deep square leg. Top edge hangs high and Marsh takes a composed catch.",
  },
  {
    id: "c-17-4",
    over: "17.4",
    value: "0",
    type: "normal",
    bowler: "Cummins",
    batter: "Pandya",
    speed: "124 KPH",
    length: "SLOWER",
    title: "Cummins to Pandya, no run.",
    commentary:
      "Deceptive off-pace delivery gripping the surface outside off, Hardik swings early and misses.",
  },
  {
    id: "c-17-3",
    over: "17.3",
    value: "2",
    type: "normal",
    bowler: "Cummins",
    batter: "Pandya",
    speed: "138 KPH",
    length: "FULL",
    title: "Cummins to Pandya, 2 runs.",
    commentary:
      "Pitched up outside off, drilled firmly wide of long-off. Kohli calls two immediately and makes his ground.",
  },
  {
    id: "c-17-2",
    over: "17.2",
    value: "4",
    type: "four",
    bowler: "Cummins",
    batter: "Pandya",
    speed: "136 KPH",
    length: "SHORT",
    title: "Cummins to Pandya, FOUR!",
    commentary:
      "Cracked away! Sits up at waist height and Hardik hammers the pull shot flat in front of square.",
  },
];

export const SIMULATED_NEXT_DELIVERIES: BallEvent[] = [
  {
    id: "sim-18-3",
    over: "18.3",
    value: "4",
    type: "four",
    bowler: "Starc",
    batter: "Kohli",
    speed: "145 KPH",
    length: "YORKER",
    title: "Starc to Kohli, FOUR!",
    commentary:
      "Pinpoint yorker attempt squeezed out! Kohli jams his bat down in time and threads it past backward point for four!",
  },
  {
    id: "sim-18-4",
    over: "18.4",
    value: "1",
    type: "normal",
    bowler: "Starc",
    batter: "Kohli",
    speed: "141 KPH",
    length: "BACK OF LENGTH",
    title: "Starc to Kohli, 1 run.",
    commentary:
      "Punched off the back foot to deep cover for a quick single to bring SKY on strike.",
  },
  {
    id: "sim-18-5",
    over: "18.5",
    value: "6",
    type: "six",
    bowler: "Starc",
    batter: "Yadav",
    speed: "143 KPH",
    length: "FULL",
    title: "Starc to Yadav, SIX!",
    commentary:
      "Classic 360° strokeplay! Suryakumar shuffles across off stump and flicks a 143kph thunderbolt over fine leg into the second tier!",
  },
  {
    id: "sim-18-6",
    over: "18.6",
    value: "2",
    type: "normal",
    bowler: "Starc",
    batter: "Yadav",
    speed: "144 KPH",
    length: "YORKER",
    title: "Starc to Yadav, 2 runs.",
    commentary:
      "Dug out into the deep mid-wicket gap, electric running between the wickets nets two more to finish a massive 19th over!",
  },
];

export const SCORECARD_BATTING: BatterStat[] = [
  {
    id: "rohit",
    name: "R Sharma (c)",
    fullName: "Rohit Sharma",
    avatar: IMAGES.indLogo,
    runs: 41,
    balls: 24,
    fours: 4,
    sixes: 3,
    sr: "170.83",
    onStrike: false,
    status: "out",
    dismissal: "b Starc",
    role: "Opening Batter",
    recentZones: [
      { zone: "Deep Mid-Wicket", runs: 18, pct: 44 },
      { zone: "Long-Off", runs: 12, pct: 29 },
      { zone: "Third Man", runs: 11, pct: 27 },
    ],
  },
  {
    id: "jaiswal",
    name: "Y Jaiswal",
    fullName: "Yashasvi Jaiswal",
    avatar: IMAGES.indLogo,
    runs: 14,
    balls: 11,
    fours: 2,
    sixes: 1,
    sr: "127.27",
    onStrike: false,
    status: "out",
    dismissal: "c Warner b Hazlewood",
    role: "Opening Batter",
    recentZones: [
      { zone: "Cover Point", runs: 8, pct: 57 },
      { zone: "Square Leg", runs: 6, pct: 43 },
    ],
  },
  {
    id: "kohli",
    name: "*V Kohli",
    fullName: "Virat Kohli",
    avatar: IMAGES.kohliAvatar,
    runs: 74,
    balls: 42,
    fours: 6,
    sixes: 4,
    sr: "176.19",
    onStrike: true,
    status: "not out",
    dismissal: "Batting",
    role: "Top-Order Batter",
    recentZones: [
      { zone: "Long-Off / Straight", runs: 28, pct: 38 },
      { zone: "Extra Cover", runs: 22, pct: 30 },
      { zone: "Deep Mid-Wicket", runs: 16, pct: 22 },
      { zone: "Fine Leg", runs: 8, pct: 10 },
    ],
  },
  {
    id: "pant",
    name: "R Pant (wk)",
    fullName: "Rishabh Pant",
    avatar: IMAGES.indLogo,
    runs: 11,
    balls: 9,
    fours: 1,
    sixes: 1,
    sr: "122.22",
    onStrike: false,
    status: "out",
    dismissal: "c Inglis b Zampa",
    role: "Wicketkeeper Batter",
    recentZones: [
      { zone: "One-Handed Six Fine Leg", runs: 6, pct: 55 },
      { zone: "Mid-On", runs: 5, pct: 45 },
    ],
  },
  {
    id: "yadav",
    name: "S Yadav",
    fullName: "Suryakumar Yadav",
    avatar: IMAGES.yadavAvatar,
    runs: 28,
    balls: 18,
    fours: 3,
    sixes: 2,
    sr: "155.56",
    onStrike: false,
    status: "not out",
    dismissal: "Batting",
    role: "Middle-Order Batter",
    recentZones: [
      { zone: "Deep Backward Square", runs: 14, pct: 50 },
      { zone: "Third Man Ramp", runs: 8, pct: 29 },
      { zone: "Extra Cover", runs: 6, pct: 21 },
    ],
  },
  {
    id: "pandya",
    name: "H Pandya",
    fullName: "Hardik Pandya",
    avatar: IMAGES.indLogo,
    runs: 9,
    balls: 6,
    fours: 1,
    sixes: 0,
    sr: "150.00",
    onStrike: false,
    status: "out",
    dismissal: "c Marsh b Cummins",
    role: "All-Rounder",
    recentZones: [
      { zone: "Deep Mid-Wicket", runs: 6, pct: 67 },
      { zone: "Long-Off", runs: 3, pct: 33 },
    ],
  },
];

export const SCORECARD_BOWLING: BowlerStat[] = [
  {
    id: "starc",
    name: "M Starc",
    fullName: "Mitchell Starc",
    avatar: IMAGES.starcAvatar,
    overs: "3.2",
    maidens: 0,
    runs: 32,
    wickets: 1,
    econ: "9.60",
    pace: "142kph",
    dots: 8,
    spell: "2nd Spell (Death Overs)",
  },
  {
    id: "hazlewood",
    name: "J Hazlewood",
    fullName: "Josh Hazlewood",
    overs: "4.0",
    maidens: 0,
    runs: 29,
    wickets: 1,
    econ: "7.25",
    pace: "137kph",
    dots: 12,
    spell: "Completed Quota",
  },
  {
    id: "cummins",
    name: "P Cummins (c)",
    fullName: "Pat Cummins",
    overs: "4.0",
    maidens: 0,
    runs: 38,
    wickets: 1,
    econ: "9.50",
    pace: "139kph",
    dots: 9,
    spell: "Completed Quota",
  },
  {
    id: "zampa",
    name: "A Zampa",
    fullName: "Adam Zampa",
    overs: "4.0",
    maidens: 0,
    runs: 41,
    wickets: 1,
    econ: "10.25",
    pace: "88kph",
    dots: 6,
    spell: "Completed Quota",
  },
  {
    id: "stoinis",
    name: "M Stoinis",
    fullName: "Marcus Stoinis",
    overs: "3.0",
    maidens: 0,
    runs: 40,
    wickets: 0,
    econ: "13.33",
    pace: "129kph",
    dots: 4,
    spell: "Middle Overs",
  },
];

export const OVER_BY_OVER_RUNS = [
  { over: 1, runs: 8, wickets: 0, total: 8 },
  { over: 2, runs: 13, wickets: 0, total: 21 },
  { over: 3, runs: 6, wickets: 1, total: 27 },
  { over: 4, runs: 15, wickets: 0, total: 42 },
  { over: 5, runs: 11, wickets: 0, total: 53 },
  { over: 6, runs: 9, wickets: 1, total: 62 },
  { over: 7, runs: 7, wickets: 0, total: 69 },
  { over: 8, runs: 12, wickets: 0, total: 81 },
  { over: 9, runs: 8, wickets: 1, total: 89 },
  { over: 10, runs: 10, wickets: 0, total: 99 },
  { over: 11, runs: 14, wickets: 0, total: 113 },
  { over: 12, runs: 6, wickets: 0, total: 119 },
  { over: 13, runs: 11, wickets: 0, total: 130 },
  { over: 14, runs: 13, wickets: 0, total: 143 },
  { over: 15, runs: 9, wickets: 0, total: 152 },
  { over: 16, runs: 10, wickets: 0, total: 162 },
  { over: 17, runs: 7, wickets: 0, total: 169 },
  { over: 18, runs: 8, wickets: 1, total: 177 },
  { over: 19, runs: 7, wickets: 0, total: 184 },
];

export const OTHER_MATCHES = [
  {
    id: "m-42",
    title: "T20 WORLD CUP - MATCH 42",
    status: "LIVE",
    venue: "Kensington Oval, Bridgetown",
    team1: "IND",
    team1Score: "184/4",
    team1Overs: "18.2 OV",
    team2: "AUS",
    team2Score: "Yet to bat",
    team2Overs: "Target TBD",
    summary: "IND chose to bat · CRR 10.09 · PROJ 215",
  },
  {
    id: "m-41",
    title: "T20 WORLD CUP - MATCH 41",
    status: "RESULT",
    venue: "Darren Sammy National Cricket Stadium",
    team1: "ENG",
    team1Score: "180/8",
    team1Overs: "20.0 OV",
    team2: "RSA",
    team2Score: "183/3",
    team2Overs: "17.4 OV",
    summary: "South Africa won by 7 wickets (14 balls remaining)",
  },
  {
    id: "m-43",
    title: "T20 WORLD CUP - MATCH 43",
    status: "UPCOMING",
    venue: "Sir Vivian Richards Stadium, North Sound",
    team1: "WI",
    team1Score: "19:30 GMT",
    team1Overs: "Today",
    team2: "AFG",
    team2Score: "Super 8",
    team2Overs: "Group 1",
    summary: "Toss in 2 hours · Pitch favours seamers early",
  },
];

export const NEWS_ITEMS = [
  {
    id: "n-1",
    category: "MATCH REPORT",
    time: "4m ago",
    title: "Kohli shifts into fifth gear against Starc as India eye 215+ in Bridgetown",
    excerpt:
      "After anchoring the middle overs alongside Suryakumar Yadav, Virat Kohli launched Mitchell Starc over long-off for a towering 94-meter six.",
    readTime: "3 min read",
  },
  {
    id: "n-2",
    category: "TACTICAL LAB",
    time: "28m ago",
    title: "How Rohit Sharma dismantled Australia's new-ball swing in the Powerplay",
    excerpt:
      "India's skipper stepped outside the leg-stump line three times in the second over to disrupt Starc's release point.",
    readTime: "5 min read",
  },
  {
    id: "n-3",
    category: "TOURNAMENT ANALYSIS",
    time: "1h ago",
    title: "Super 8 Net Run Rate Scenarios: What Australia need in the second innings",
    excerpt:
      "With Semi-Final spots hanging in the balance, we break down the exact chase cutoffs for Group 1 qualification.",
    readTime: "4 min read",
  },
  {
    id: "n-4",
    category: "PITCH REPORT",
    time: "2h ago",
    title: "Cross-breeze at Kensington Oval making hitting into the wind a high-risk gamble",
    excerpt:
      "Data shows 78% of sixes tonight have been struck toward the shorter 62m western boundary.",
    readTime: "3 min read",
  },
];

export const SERIES_STANDINGS = [
  { pos: 1, team: "IND", played: 2, won: 2, lost: 0, nrr: "+2.425", pts: 4, form: ["W", "W"] },
  { pos: 2, team: "AUS", played: 2, won: 1, lost: 1, nrr: "+0.223", pts: 2, form: ["W", "L"] },
  { pos: 3, team: "AFG", played: 2, won: 1, lost: 1, nrr: "-0.650", pts: 2, form: ["L", "W"] },
  { pos: 4, team: "BAN", played: 2, won: 0, lost: 2, nrr: "-2.140", pts: 0, form: ["L", "L"] },
];

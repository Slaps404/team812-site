export interface RobotSeason {
  year: number;
  repoUrl: string;
  game: string;
  description: string;
  events: string[];
  awards?: string[];
  detailsPending?: boolean;
}

export function getAwardDescription(award: string): string {
  const l = award.toLowerCase();
  if (l.includes('chairman')) {
    return "FIRST's most prestigious award, honoring the team that best embodies the mission and values of FIRST.";
  }
  if (l.includes('winner')) {
    return 'Celebrates the 1st place tournament champion alliance, qualifying for the FIRST World Championship.';
  }
  if (l.includes('inspiration')) {
    return 'Celebrates outstanding success in advancing respect and appreciation for engineering within the school and community.';
  }
  if (l.includes('flowers')) {
    return 'Honors an outstanding engineering mentor who leads, inspires, and empowers students.';
  }
  if (l.includes('dean')) {
    return 'Recognizes exceptional student leaders whose technical passion and leadership exemplify FIRST ideals.';
  }
  if (l.includes('spirit')) {
    return 'Celebrates extraordinary enthusiasm, spirit, and teamwork throughout the competition.';
  }
  if (l.includes('judge')) {
    return 'Special recognition by the judging panel for unique team efforts and excellence.';
  }
  return 'Official FIRST Robotics Competition award.';
}

export const robotSeasons: RobotSeason[] = [
  {
    year: 2026,
    game: 'REBUILT',
    repoUrl: 'https://github.com/preuss812/FRC_2026',
    description: 'Competed at the CA District San Diego Event and San Gabriel Valley Event, advancing to the FIRST California Southern State Championship.',
    events: [
      'FIRST California Southern State Championship',
      'CA District San Gabriel Valley Event',
      'CA District San Diego Event presented by Qualcomm',
    ],
  },
  {
    year: 2025,
    game: 'REEFSCAPE',
    repoUrl: 'https://github.com/preuss812/FRC_2025',
    description: 'Competed in REEFSCAPE during the FIRST DIVE season at the San Diego Regional.',
    events: ['San Diego Regional presented by Qualcomm'],
  },
  {
    year: 2024,
    game: 'CRESCENDO',
    repoUrl: 'https://github.com/preuss812/FRC_2024',
    description: 'Competed in CRESCENDO at the San Diego Regional and Orange County Regional.',
    events: ['Orange County Regional', 'San Diego Regional presented by Qualcomm'],
  },
  {
    year: 2023,
    game: 'CHARGED UP',
    repoUrl: 'https://github.com/preuss812/FRC_2023',
    description: 'Competed in CHARGED UP at the San Diego Regional and Orange County Regional.',
    events: ['San Diego Regional presented by Qualcomm', 'Orange County Regional'],
  },
  {
    year: 2022,
    game: 'RAPID REACT',
    repoUrl: 'https://github.com/preuss812/FRC_2022',
    description: 'Competed in RAPID REACT at the San Diego Regional.',
    events: ['San Diego Regional presented by Qualcomm'],
  },
  {
    year: 2020,
    game: 'INFINITE RECHARGE',
    repoUrl: 'https://github.com/preuss812/FRC_2020',
    description: 'Competed in INFINITE RECHARGE at the Del Mar Regional.',
    events: ['Del Mar Regional'],
  },
  {
    year: 2019,
    game: 'DESTINATION: DEEP SPACE',
    repoUrl: 'https://github.com/preuss812/FRC_2019',
    description: 'Competed at the San Diego and Orange County Regionals, earning the Judges’ Award and Woodie Flowers Finalist Award.',
    events: ['San Diego Regional presented by Qualcomm', 'Orange County Regional'],
    awards: ['Woodie Flowers Finalist Award', 'Judges’ Award'],
  },
  {
    year: 2018,
    game: 'FIRST POWER UP',
    repoUrl: 'https://github.com/preuss812/FRC_2018',
    description: 'Won 1st place as Orange County Regional Winners, advanced to the World Championship Newton Division, and earned the Team Spirit Award.',
    events: ['Newton Division (World Championship)', 'Orange County Regional (Winner)', 'San Diego Regional presented by Qualcomm'],
    awards: ['Regional Winner (Orange County)', 'Team Spirit Award'],
  },
  {
    year: 2017,
    game: 'FIRST STEAMWORKS',
    repoUrl: 'https://github.com/preuss812/FRC_2017',
    description: 'Competed at the San Francisco and San Diego Regionals, earning the Regional Engineering Inspiration Award and Team Spirit Award.',
    events: ['San Francisco Regional', 'San Diego Regional presented by Qualcomm'],
    awards: ['Regional Engineering Inspiration Award', 'Team Spirit Award'],
  },
  {
    year: 2016,
    game: 'FIRST STRONGHOLD',
    repoUrl: 'https://github.com/preuss812/FRC_2016',
    description: 'Won the Regional Chairman’s Award at Central Valley, earned the Dean’s List Finalist Award, and advanced to the World Championship Hopper Division.',
    events: ['Hopper Division (World Championship)', 'Central Valley Regional', 'San Diego Regional', 'Battle at the Border'],
    awards: ['Regional Chairman’s Award (Central Valley)', 'Dean’s List Finalist Award'],
  },
  {
    year: 2015,
    game: 'RECYCLE RUSH',
    repoUrl: 'https://github.com/preuss812/FRC_2015',
    description: 'Competed in RECYCLE RUSH at the San Diego Regional and Las Vegas Regional.',
    events: ['San Diego Regional', 'Las Vegas Regional'],
  },
  {
    year: 2014,
    game: 'AERIAL ASSIST',
    repoUrl: 'https://github.com/preuss812/FRC_2014',
    description: 'Competed in AERIAL ASSIST at the San Diego Regional and Arizona Regional.',
    events: ['San Diego Regional', 'Arizona Regional'],
  },
  {
    year: 2013,
    game: 'ULTIMATE ASCENT',
    repoUrl: 'https://github.com/preuss812/FRC_2013',
    description: 'Won the Regional Engineering Inspiration Award at the Utah Regional and advanced to the World Championship Archimedes Division.',
    events: ['Archimedes Division (World Championship)', 'Utah Regional', 'San Diego Regional'],
    awards: ['Regional Engineering Inspiration Award (Utah)'],
  },
  {
    year: 2012,
    game: 'REBOUND RUMBLE',
    repoUrl: 'https://github.com/preuss812/FRC_2012',
    description: 'Competed in REBOUND RUMBLE at the San Diego Regional, earning the Dean’s List Finalist Award.',
    events: ['San Diego Regional'],
    awards: ['Dean’s List Finalist Award'],
  },
  {
    year: 2011,
    game: 'LOGO MOTION',
    repoUrl: 'https://github.com/preuss812/FRC_2011',
    description: 'Competed in LOGO MOTION at the Silicon Valley and San Diego Regionals, earning the Chrysler Team Spirit Award.',
    events: ['Silicon Valley Regional', 'San Diego Regional'],
    awards: ['Team Spirit Award (Silicon Valley)'],
  },
];

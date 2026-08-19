export interface TechnicalSpec {
  category: string;
  specs: { label: string; value: string }[];
}

export interface SeasonStoryPhase {
  phase: string;
  title: string;
  content: string;
}

export interface RobotSeason {
  year: number;
  name?: string;
  repoUrl: string;
  game: string;
  description: string;
  events: string[];
  awards?: string[];
  detailsPending?: boolean;
  technicalSpecs?: TechnicalSpec[];
  seasonStory?: SeasonStoryPhase[];
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
    name: 'Big Jiawei',
    game: 'REBUILT',
    repoUrl: 'https://github.com/preuss812/FRC_2026',
    description: 'Our 2026 robot, built for REBUILT. Big Jiawei competed at the San Diego and San Gabriel Valley District Events, advancing to the FIRST California Southern State Championship.',
    events: [
      'FIRST California Southern State Championship',
      'CA District San Gabriel Valley Event',
      'CA District San Diego Event presented by Qualcomm',
    ],
    technicalSpecs: [
      {
        category: 'Drivetrain',
        specs: [
          { label: 'Type', value: 'SDS MK3 Swerve Module' },
          { label: 'Top Speed', value: '15.6 ft/s (4.75 m/s)' },
          { label: 'Weight', value: '118.4 lbs' },
        ],
      },
      {
        category: 'Shooter & Intake',
        specs: [
          { label: 'Shooter', value: 'Dual NEO Vortex (6,784 RPM)' },
          { label: 'Intake', value: 'Dual-roller ground intake (< 0.25s pickup)' },
        ],
      },
      {
        category: 'Vision & Control',
        specs: [
          { label: 'Targeting', value: 'Dual Limelight 3 (MegaTag2 AprilTag tracking)' },
          { label: 'Autonomous', value: 'WPILib Java + Choreo pathing' },
        ],
      },
    ],
    seasonStory: [
      {
        phase: 'January – February 2026',
        title: 'Architecture, Prototyping & The Birth of Big Jiawei',
        content:
          'Following the 2026 REBUILT kickoff, our engineering team prioritized high-speed cycle times, aggressive field control, and zero-hesitation game piece handoffs. Early cardboard and plywood prototypes confirmed that a low-center-of-gravity swerve base paired with a variable-angle shooter would yield the highest scoring ceiling. Iterating through CAD in Onshape, the mechanical subteam machined custom aluminum gussets and optimized weight distribution, naming the machine "Big Jiawei" as a tribute to our team work ethic.',
      },
      {
        phase: 'March 2026',
        title: 'CA District San Diego Event: Trial by Fire on Home Turf',
        content:
          'Big Jiawei debuted at the San Diego District Event presented by Qualcomm. Under intense defensive pressure, our drive team pushed the swerve drivetrain to its limits. Pit crew members executed rapid battery swaps, tuned our Limelight AprilTag pose estimation under arena lighting, and dialed in our autonomous routines. The weekend solidified our confidence in Big Jiawei’s chassis durability and cycle speed.',
      },
      {
        phase: 'April 2026',
        title: 'CA District San Gabriel Valley Event: Playoff Run & State Qualification',
        content:
          'Heading to San Gabriel Valley, the software team deployed updated closed-loop velocity PID curves for the flywheels and calibrated multi-piece autonomous paths. Big Jiawei delivered consistent high-efficiency scoring cycles, anchoring our alliance through qualifying matches and advancing deep into the playoff rounds. The performance earned Team 812 a spot at the state championship.',
      },
      {
        phase: 'April 2026',
        title: 'FIRST California Southern State Championship: The Ultimate Test',
        content:
          'The pinnacle of our 2026 campaign. Competing in the Southern State Championship, Big Jiawei went head-to-head against California’s premier robotics programs. The pit crew worked flawlessly under strict queueing turnarounds, repairing intake wear and keeping motor thermals optimal. Big Jiawei proved what first-generation Preuss students can accomplish on the highest competitive stage in the state.',
      },
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

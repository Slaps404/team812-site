export interface RobotSeason {
  year: number;
  repoUrl: string;
  game?: string;
  description: string;
  detailsPending?: boolean;
}

const archiveYears = [2026, 2025, 2024, 2023, 2022, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011];

export const robotSeasons: RobotSeason[] = archiveYears.map((year) => ({
  year,
  repoUrl: `https://github.com/preuss812/FRC_${year}`,
  ...(year === 2026
    ? {
        game: 'REBUILT',
        description: 'The latest robot in the archive, documented through pit work, shooter tuning, and drivetrain repair at the 2026 state championship.',
      }
    : {
        description: 'Robot name, game, and build notes are ready to be added from the team archive.',
        detailsPending: true,
      }),
}));

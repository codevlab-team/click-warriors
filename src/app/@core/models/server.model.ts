export interface Server {
  name: string;
  countdown: number;
  status: ServerStatus;
  settings: ServerSettings;
  teamYellow: ServerTeam[];
  teamPurple: ServerTeam[];
}

export interface ServerSettings {
  rounds: Rounds;
  pointsPerRound: PointsPerRound;
  playersLimit: PlayersLimit;
  timer: TimerMinutes;
}

export enum Rounds {
  VeryShort = 1,
  Short = 3,
  Medium = 5,
  Extense = 10,
  VeryExtense = 15,
}

export enum PointsPerRound {
  Level1 = 50,
  Level2 = 100,
  Level3 = 300,
  Level4 = 600,
  Level5 = 1000,
}

export enum PlayersLimit {
  Low = 10,
  Medium = 50,
  High = 100,
  Huge = 200,
  Massive = 300,
}

export enum TimerMinutes {
  One = 1,
  Three = 3,
  Five = 5,
}

export interface ServerTeam {
  playerNickname: string;
  clicksCount: number;
  ready: boolean;
  order: 0;
}

export type ServerStatus = 'IDLE' | 'STARTED' | 'ENDED';

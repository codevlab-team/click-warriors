import { Team } from './server.model';

export interface User {
  nickname: string;
  team: Team | null;
  order: number | null;
}

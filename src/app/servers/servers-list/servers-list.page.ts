import { Component, OnInit } from '@angular/core';
import {
  PlayersLimit,
  PointsPerRound,
  Rounds,
  Server,
  TimerMinutes,
} from 'src/app/@core/models/server.model';

@Component({
  templateUrl: './servers-list.page.html',
  styleUrls: ['./servers-list.page.scss'],
})
export class ServersListPage implements OnInit {
  servers!: Server[];

  constructor() {}

  ngOnInit(): void {
    this.servers = [
      {
        name: 'Servidor de prueba',
        countdown: 1613855461367,
        status: 'IDLE',
        settings: {
          rounds: Rounds.Short,
          pointsPerRound: PointsPerRound.Level3,
          playersLimit: PlayersLimit.Medium,
          timer: TimerMinutes.Three,
        },
        teamYellow: [],
        teamPurple: [],
      },
      {
        name: 'Servidor de prueba',
        countdown: 1613855461367,
        status: 'STARTED',
        settings: {
          rounds: Rounds.Short,
          pointsPerRound: PointsPerRound.Level3,
          playersLimit: PlayersLimit.Medium,
          timer: TimerMinutes.Three,
        },
        teamYellow: [],
        teamPurple: [],
      },
      {
        name: 'Servidor de prueba',
        countdown: 1613855461367,
        status: 'ENDED',
        settings: {
          rounds: Rounds.Short,
          pointsPerRound: PointsPerRound.Level3,
          playersLimit: PlayersLimit.Medium,
          timer: TimerMinutes.Three,
        },
        teamYellow: [],
        teamPurple: [],
      },
    ];
  }

  canJoin(server: Server): boolean {
    const joinedPlayers = server.teamYellow.length + server.teamPurple.length;
    return (
      server.status === 'IDLE' && joinedPlayers < server.settings.playersLimit
    );
  }
}

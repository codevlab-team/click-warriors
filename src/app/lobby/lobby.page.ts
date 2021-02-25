import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Server, ServerTeam, Team } from '../@core/models/server.model';
import { HttpMethod } from '../@core/services/http-generic';
import { ServersService } from '../@core/services/servers/servers.service';
import { UsersService } from '../@core/services/users/users.service';

@Component({
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {
  teamYellow: ServerTeam[] = [];
  teamPurple: ServerTeam[] = [];

  displayTime!: string;
  timerInited = false;

  userInTeamYellow = false;
  userInTeamPurple = false;
  loaderVisible = false;

  serverId!: string | null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private serversService: ServersService,
    private db: AngularFirestore
  ) {
    this.activatedRoute.paramMap.subscribe(
      (paramMap) => (this.serverId = paramMap.get('serverId'))
    );
  }

  ngOnInit(): void {
    if (this.serverId) {
      this.db
        .collection<Server>('Servers')
        .doc(this.serverId)
        .valueChanges()
        .subscribe((server) => {
          if (server) {
            const { countdown, teamYellow, teamPurple } = server;

            // set up teams
            this.teamYellow = teamYellow;
            this.teamPurple = teamPurple;

            // run timer
            if (this.timerInited === false) {
              const remaining = Math.max(0, countdown - new Date().getTime());
              const countdownSeconds = Math.round(remaining / 1000);
              this.runCountdown(countdownSeconds);
            }
          }
        });
    } else {
      this.router.navigate(['/servers']);
    }
  }

  onClickJoin(team: Team): void {
    const user = this.usersService.user;

    if (user) {
      if (team === 'yellow') {
        this.addPlayerToTeamYellow(user.nickname);
      } else {
        this.addPlayerToTeamPurple(user.nickname);
      }
    }
  }

  trackByPlayer(index: number, serverTeam: ServerTeam): string {
    return serverTeam.playerNickname;
  }

  private runCountdown(countdownSeconds: number): void {
    this.timerInited = true;

    interval(1000)
      .pipe(
        map((value) => countdownSeconds - value),
        takeWhile((value) => value >= 0)
      )
      .subscribe((value) => {
        const minutes = Math.floor(value / 60);
        const seconds = value - minutes * 60;
        this.displayTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (value === 0) {
          if (
            this.userInTeamYellow === false &&
            this.userInTeamPurple === false
          ) {
            this.joinAutomatically();
          }
          this.router.navigate(['/game/battle', this.serverId]);
        }
      });
  }

  private joinAutomatically(): void {
    const user = this.usersService.user;
    if (user) {
      const playersInYellow = this.teamYellow.length;
      const playersInPurple = this.teamPurple.length;

      if (playersInYellow < playersInPurple) {
        this.addPlayerToTeamYellow(user.nickname);
      } else {
        this.addPlayerToTeamPurple(user.nickname);
      }
    }
  }

  private addPlayerToTeamYellow(nickname: string): void {
    if (
      this.serverId &&
      this.teamYellow.some((p) => p.playerNickname === nickname) === false
    ) {
      this.loaderVisible = true;

      const player: ServerTeam = {
        playerNickname: nickname,
        clicksCount: 0,
        totalClicks: 0,
        ready: false,
      };

      this.serversService
        .update(this.serverId, player, {
          urlPostfix: 'player/yellow',
          method: HttpMethod.PATCH,
          errorMsg:
            'Ocurrió un problema al intentar unir el jugador al equipo amarillo.',
        })
        .subscribe((res) => {
          this.userInTeamYellow = true;
          this.userInTeamPurple = false;
          this.usersService.patchUser({ team: 'yellow' });
          this.loaderVisible = false;
        });
    }
  }

  private addPlayerToTeamPurple(nickname: string): void {
    if (
      this.serverId &&
      this.teamPurple.some((p) => p.playerNickname === nickname) === false
    ) {
      this.loaderVisible = true;

      const player: ServerTeam = {
        playerNickname: nickname,
        clicksCount: 0,
        totalClicks: 0,
        ready: false,
      };

      this.serversService
        .update(this.serverId, player, {
          urlPostfix: 'player/purple',
          method: HttpMethod.PATCH,
          errorMsg:
            'Ocurrió un problema al intentar unir el jugador al equipo morado.',
        })
        .subscribe((res) => {
          this.userInTeamPurple = true;
          this.userInTeamYellow = false;
          this.usersService.patchUser({ team: 'purple' });
          this.loaderVisible = false;
        });
    }
  }
}

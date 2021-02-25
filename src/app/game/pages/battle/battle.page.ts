import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Server, Team } from 'src/app/@core/models/server.model';
import { HttpMethod } from 'src/app/@core/services/http-generic';
import { ServersService } from 'src/app/@core/services/servers/servers.service';
import { UsersService } from 'src/app/@core/services/users/users.service';

@Component({
  templateUrl: './battle.page.html',
  styleUrls: ['./battle.page.scss'],
})
export class BattlePage implements OnInit, OnDestroy {
  readonly numberOfClicks = 100;
  readonly goalsToWin = 3;
  readonly stageEager = 4000;

  serverId!: string | null;

  yellowLife = 100;
  purpleLife = 100;

  countdown!: number;

  userTeam!: Team;
  everybodyJoined!: boolean;

  goal = false;
  winner!: Team;

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
    const userTeam = this.usersService.user?.team;

    if (this.serverId && userTeam) {
      this.userTeam = userTeam;

      this.db
        .collection<Server>('Servers')
        .doc(this.serverId)
        .valueChanges()
        .subscribe((server) => {
          if (server) {
            console.log(server.status);
            switch (server.status) {
              case 'IDLE':
                this.everybodyJoined = false;
                this.markAsReady();
                break;
              case 'STARTED':
                console.log(this.everybodyJoined);
                if (this.everybodyJoined === false) {
                  this.countdown = 5;
                  this.runCountdown();
                }

                this.everybodyJoined = true;

                if (server.goal) {
                  this.goal = true;
                  this.reset();
                } else {
                  this.updateYellowLife(server);
                  this.updatePurpleLife(server);
                }
                break;
              case 'ENDED':
                this.endMatch(server.winner);
                break;
            }
          }
        });
    } else {
      this.router.navigate(['/servers']);
    }
  }

  ngOnDestroy(): void {
    this.countdown = 0;
  }

  onClickYellow() {
    const user = this.usersService?.user;

    if (this.serverId && user) {
      this.serversService
        .update(
          this.serverId,
          { playerNickname: user.nickname },
          {
            urlPostfix: 'player/yellow/click',
            method: HttpMethod.PATCH,
          }
        )
        .subscribe(console.log);
    }
  }

  onClickPurple() {
    const user = this.usersService?.user;

    if (this.serverId && user) {
      this.serversService
        .update(
          this.serverId,
          { playerNickname: user.nickname },
          {
            urlPostfix: 'player/purple/click',
            method: HttpMethod.PATCH,
          }
        )
        .subscribe(console.log);
    }
  }

  private runCountdown(): void {
    interval(1000)
      .pipe(takeWhile(() => this.countdown > 0))
      .subscribe(() => this.countdown--);
  }

  private updateYellowLife(server: Server): void {
    const {
      teamPurple,
      settings: { pointsPerRound },
    } = server;
    const purpleClicks = teamPurple.reduce(
      (clicks, player) => (clicks += player.clicksCount),
      0
    );

    this.yellowLife = this.getLife(pointsPerRound, purpleClicks);
  }

  private updatePurpleLife(server: Server): void {
    const {
      teamYellow,
      settings: { pointsPerRound },
    } = server;
    const yellowClicks = teamYellow.reduce(
      (clicks, player) => (clicks += player.clicksCount),
      0
    );

    this.purpleLife = this.getLife(pointsPerRound, yellowClicks);
  }

  private getLife(pointsPerRound: number, clicks: number): number {
    return ((pointsPerRound - clicks) * 100) / pointsPerRound;
  }

  // private arePlayersReady(server: Server): boolean {
  //   const { teamYellow, teamPurple } = server;
  //   const teamYellowReady = teamYellow.every((player) => player.ready);
  //   const teamPurpleReady = teamPurple.every((player) => player.ready);
  //   return teamYellowReady && teamPurpleReady;
  // }

  private markAsReady(): void {
    const user = this.usersService?.user;
    if (this.serverId && user) {
      const { nickname, team } = user;
      this.serversService
        .update(
          this.serverId,
          { playerNickname: nickname },
          {
            urlPostfix: `player/${team}/ready`,
            method: HttpMethod.PATCH,
          }
        )
        .subscribe(console.log);
    }
  }

  private reset(): void {
    setTimeout(() => {
      this.yellowLife = 100;
      this.purpleLife = 100;
      this.countdown = 5;
      this.goal = false;
      this.runCountdown();
    }, this.stageEager);
  }

  private endMatch(winner: Team): void {
    setTimeout(() => {
      this.goal = false;
      this.winner = winner;
      this.usersService.patchUser({
        team: null,
      });

      setTimeout(() => {
        this.router.navigate(['/']);
      }, this.stageEager);
    }, this.stageEager);
  }
}

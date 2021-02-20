import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Team } from '../@core/models/server.model';
import { UsersService } from '../@core/services/users/users.service';

@Component({
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {
  teamYellow: string[] = [];
  teamPurple: string[] = [];

  readonly countdown: number = 1613850523024;

  displayTime!: string;

  userInTeamYellow = false;
  userInTeamPurple = false;
  loaderVisible = false;

  constructor(private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    this.teamYellow = ['carlitos_2332', 'Lucia_3232', 'Pedrito_3333'];
    this.teamPurple = ['María_2333'];

    const remaining = Math.max(0, this.countdown - new Date().getTime());
    const countdownSeconds = Math.round(remaining / 1000);

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
          // this.router.navigate(['/game/battle']);
        }
      });
  }

  onClickJoin(team: Team): void {
    const user = this.usersService.user;

    if (user) {
      if (team === 'yellow') {
        this.addToTeamYellow(user.nickname);
      } else {
        this.addToTeamPurple(user.nickname);
      }
    }
  }

  joinAutomatically(): void {
    const user = this.usersService.user;
    if (user) {
      const playersInYellow = this.teamYellow.length;
      const playersInPurple = this.teamPurple.length;

      if (playersInYellow < playersInPurple) {
        this.addToTeamYellow(user.nickname);
      } else {
        this.addToTeamPurple(user.nickname);
      }
    }
  }

  trackByPlayer(index: number, nickname: string): string {
    return nickname;
  }

  private addToTeamYellow(nickname: string): void {
    this.teamYellow.push(nickname);
    this.userInTeamYellow = true;
    this.userInTeamPurple = false;
    this.teamPurple = this.teamPurple.filter((n) => n !== nickname);
    this.usersService.patchUser({
      team: 'yellow',
      order: this.teamYellow.length - 1,
    });
  }

  private addToTeamPurple(nickname: string): void {
    this.teamPurple.push(nickname);
    this.userInTeamPurple = true;
    this.userInTeamYellow = false;
    this.teamYellow = this.teamYellow.filter((n) => n !== nickname);
    this.usersService.patchUser({
      team: 'purple',
      order: this.teamPurple.length - 1,
    });
  }
}

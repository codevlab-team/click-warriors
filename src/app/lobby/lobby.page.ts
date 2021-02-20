import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
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
    this.teamYellow = [];
    this.teamPurple = [];

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

  onClickJoin(team: 'yellow' | 'purple'): void {
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

      if (playersInYellow > playersInPurple) {
        this.teamPurple.push(user.nickname);
        this.userInTeamPurple = true;
      } else {
        this.teamYellow.push(user.nickname);
        this.userInTeamYellow = true;
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
  }

  private addToTeamPurple(nickname: string): void {
    this.teamPurple.push(nickname);
    this.userInTeamPurple = true;
    this.userInTeamYellow = false;
    this.teamYellow = this.teamYellow.filter((n) => n !== nickname);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { UsersService } from '../@core/services/users/users.service';

@Component({
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {
  teamYellow: string[] = [];
  teamPurple: string[] = [];

  countDown = 30;

  userInTeamYellow = false;
  userInTeamPurple = false;
  loaderVisible = false;

  constructor(private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    this.teamYellow = [
      'Carlitos Perez',
      'Mariana Gomez',
      'Lucía Gonzalez',
      'Mario Velez',
    ];
    this.teamPurple = ['José Velez', 'Pedro García', 'Sara Beltrán'];

    interval(1000)
      .pipe(takeWhile(() => this.countDown > 0))
      .subscribe(() => {
        this.countDown--;

        if (this.countDown === 0) {
          // Si el usuario no eligió equipo, el sistema lo une automáticamente
          if (
            this.userInTeamYellow === false &&
            this.userInTeamPurple === false
          ) {
            this.joinAutomatically();
          }

          console.log(this.teamYellow, this.teamPurple);
          this.router.navigate(['/game/battle']);
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
      } else {
        this.teamYellow.push(user.nickname);
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {
  teamYellow: string[] = [];
  teamPurple: string[] = [];

  loaderVisible = false;

  countDown = 60;

  constructor(private router: Router) {}

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
          this.router.navigate(['/game/battle']);
        }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  templateUrl: './battle.page.html',
  styleUrls: ['./battle.page.scss'],
})
export class BattlePage implements OnInit {
  yellowScore = 0;
  purpleScore = 0;

  countDown = 10;
  everybodyJoined = false;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.everybodyJoined = true;

      interval(1000)
        .pipe(takeWhile(() => this.countDown > 0))
        .subscribe(() => this.countDown--);
    }, 7000);
  }
}

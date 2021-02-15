import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  templateUrl: './battle.page.html',
  styleUrls: ['./battle.page.scss'],
})
export class BattlePage implements OnInit, OnDestroy {
  readonly numberOfClicks = 100;
  readonly goalsToWin = 3;
  readonly stageEager = 4000;

  yellowClicks = 0;
  purpleClicks = 0;

  yellowLife = 100;
  purpleLife = 100;

  yellowScore = 0;
  purpleScore = 0;

  countdown = 10;

  everybodyJoined = false;

  goal = false;
  winner!: 'yellow' | 'purple';

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.everybodyJoined = true;
      this.runCountdown();
    }, 4000);
  }

  ngOnDestroy(): void {
    this.countdown = 0;
  }

  onClickYellow() {
    this.purpleLife = this.updateTeamLife(this.yellowClicks++);

    if (this.purpleLife === 0) {
      this.goal = true;
      this.yellowScore++;

      if (this.yellowScore === this.goalsToWin) {
        this.endMatch('yellow');
      } else {
        this.reset();
      }
    }
  }

  onClickPurple() {
    this.yellowLife = this.updateTeamLife(this.purpleClicks++);

    if (this.yellowLife === 0) {
      this.goal = true;
      this.purpleScore++;

      if (this.purpleScore === this.goalsToWin) {
        this.endMatch('purple');
      } else {
        this.reset();
      }
    }
  }

  private runCountdown(): void {
    interval(1000)
      .pipe(takeWhile(() => this.countdown > 0))
      .subscribe(() => this.countdown--);
  }

  private updateTeamLife(clicks: number): number {
    const life = ((this.numberOfClicks - clicks) * 100) / this.numberOfClicks;
    return life;
  }

  private reset(): void {
    this.yellowLife = 100;
    this.purpleLife = 100;
    this.yellowClicks = 0;
    this.purpleClicks = 0;

    setTimeout(() => {
      this.countdown = 5;
      this.goal = false;
      this.runCountdown();
    }, this.stageEager);
  }

  private endMatch(winner: 'yellow' | 'purple'): void {
    setTimeout(() => {
      this.goal = false;
      this.winner = winner;

      setTimeout(() => {
        this.router.navigate(['/']);
      }, this.stageEager);
    }, this.stageEager);
  }
}

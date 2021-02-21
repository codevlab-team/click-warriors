import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  PlayersLimit,
  PointsPerRound,
  Rounds,
  TimerMinutes,
} from 'src/app/@core/models/server.model';
import { UsersService } from 'src/app/@core/services/users/users.service';

interface SelectionItem {
  name: string;
  description?: string;
  value: TimerMinutes | Rounds | PointsPerRound | PlayersLimit;
}

@Component({
  templateUrl: './add-server.page.html',
  styleUrls: ['./add-server.page.scss'],
})
export class AddServerPage implements OnInit {
  serverForm: FormGroup;

  countdown: SelectionItem[];
  rounds!: SelectionItem[];
  pointsPerRound!: SelectionItem[];
  playersLimit!: SelectionItem[];

  submitted = false;
  loaderVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {
    this.countdown = [
      {
        name: `${TimerMinutes.One} minuto`,
        value: TimerMinutes.One,
      },
      {
        name: `${TimerMinutes.Three} minutos`,
        value: TimerMinutes.Three,
      },
      {
        name: `${TimerMinutes.Five} minutos`,
        value: TimerMinutes.Five,
      },
    ];

    this.rounds = [
      {
        name: 'Muy corta',
        description: `${Rounds.VeryShort} ronda`,

        value: Rounds.VeryShort,
      },
      {
        name: 'Corta',
        description: `${Rounds.Short} rondas`,

        value: Rounds.Short,
      },
      {
        name: 'Mediana',
        description: `${Rounds.Medium} rondas`,

        value: Rounds.Medium,
      },
      {
        name: 'Extensa',
        description: `${Rounds.Extense} rondas`,

        value: Rounds.Extense,
      },
      {
        name: 'Muy larga',
        description: `${Rounds.VeryExtense} rondas`,

        value: Rounds.VeryExtense,
      },
    ];

    this.pointsPerRound = [
      {
        name: 'Nivel 1',
        description: `${PointsPerRound.Level1} puntos`,
        value: PointsPerRound.Level1,
      },
      {
        name: 'Nivel 2',
        description: `${PointsPerRound.Level2} puntos`,
        value: PointsPerRound.Level2,
      },
      {
        name: 'Nivel 3',
        description: `${PointsPerRound.Level3} puntos`,
        value: PointsPerRound.Level3,
      },
      {
        name: 'Nivel 4',
        description: `${PointsPerRound.Level4} puntos`,
        value: PointsPerRound.Level4,
      },
      {
        name: 'Nivel 5',
        description: `${PointsPerRound.Level5} puntos`,
        value: PointsPerRound.Level5,
      },
    ];

    this.playersLimit = [
      {
        name: 'Bajo',
        description: `${PlayersLimit.Low} jugadores`,
        value: PlayersLimit.Low,
      },
      {
        name: 'Mediano',
        description: `${PlayersLimit.Medium} jugadores`,
        value: PlayersLimit.Medium,
      },
      {
        name: 'Alto',
        description: `${PlayersLimit.High} jugadores`,
        value: PlayersLimit.High,
      },
      {
        name: 'Enorme',
        description: `${PlayersLimit.Huge} jugadores`,
        value: PlayersLimit.Huge,
      },
      {
        name: 'Masivo',
        description: `${PlayersLimit.Massive} jugadores`,
        value: PlayersLimit.Massive,
      },
    ];

    this.serverForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      countdown: [
        null,
        [
          Validators.required,
          Validators.min(TimerMinutes.One),
          Validators.max(TimerMinutes.Five),
        ],
      ],
      settings: this.fb.group({
        rounds: [
          null,
          [
            Validators.required,
            Validators.min(Rounds.VeryShort),
            Validators.max(Rounds.VeryExtense),
          ],
        ],
        pointsPerRound: [
          null,
          [
            Validators.required,
            Validators.min(PointsPerRound.Level1),
            Validators.max(PointsPerRound.Level5),
          ],
        ],
        playersLimit: [
          null,
          [
            Validators.required,
            Validators.min(PlayersLimit.Low),
            Validators.max(PlayersLimit.Massive),
          ],
        ],
      }),
    });
  }

  get controls() {
    return this.serverForm.controls;
  }

  get settingsControls() {
    return (this.serverForm.get('settings') as FormGroup).controls;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;

    if (this.serverForm.valid) {
      this.loaderVisible = true;

      // Genera el timestamp del countdown.
      const now = new Date();
      const minutes = this.controls.countdown.value;
      const countdown = now.setMinutes(now.getMinutes() + minutes);

      console.log({
        ...this.serverForm.value,
        countdown,
        host: this.usersService.user?.nickname,
      });

      setTimeout(() => {
        this.loaderVisible = false;
        this.router.navigate(['/servers']);
      }, 3000);
    }
  }
}

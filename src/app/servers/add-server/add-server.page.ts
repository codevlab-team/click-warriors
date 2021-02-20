import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PlayersLimit,
  PointsPerRound,
  Rounds,
} from 'src/app/@core/models/server.model';

interface SelectionItem {
  name: string;
  description: string;
  value: Rounds | PointsPerRound | PlayersLimit;
}

@Component({
  templateUrl: './add-server.page.html',
  styleUrls: ['./add-server.page.scss'],
})
export class AddServerPage implements OnInit {
  serverForm: FormGroup;

  rounds!: SelectionItem[];
  pointsPerRound!: SelectionItem[];
  playersLimit!: SelectionItem[];

  submitted = false;

  constructor(private fb: FormBuilder) {
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
    });
  }

  get controls() {
    return this.serverForm.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
  }
}

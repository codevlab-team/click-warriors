import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {
  teamYellow: string[] = [];
  teamPurple: string[] = [];

  loaderVisible = false;

  constructor() {}

  ngOnInit(): void {
    this.teamYellow = [
      'Carlitos Perez',
      'Mariana Gomez',
      'Lucía Gonzalez',
      'Mario Velez',
    ];
    this.teamPurple = ['José Velez', 'Pedro García', 'Sara Beltrán'];
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './servers-list.page.html',
  styleUrls: ['./servers-list.page.scss'],
})
export class ServersListPage implements OnInit {
  servers: any = [];

  constructor() {}

  ngOnInit(): void {
    this.servers = [
      {
        name: 'Servidor de prueba',
        location: 'Medellín, Colombia',
        status: true,
        players: 12,
        playersLimit: 40,
      },
    ];
  }
}

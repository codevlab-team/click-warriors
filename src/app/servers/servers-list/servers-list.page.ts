import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Server } from 'src/app/@core/models/server.model';
import { ServersService } from 'src/app/@core/services/servers/servers.service';

@Component({
  templateUrl: './servers-list.page.html',
  styleUrls: ['./servers-list.page.scss'],
})
export class ServersListPage implements OnInit {
  servers: Server[] = [];

  loading = true;

  constructor(
    private serversService: ServersService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.db
      .collection<Server>('Servers')
      .valueChanges()
      .subscribe((servers) => {
        console.log(servers);
        this.servers = servers;
        this.loading = false;
      });
  }

  canJoin(server: Server): boolean {
    const joinedPlayers = server.teamYellow.length + server.teamPurple.length;
    return (
      server.status === 'IDLE' && joinedPlayers < server.settings.playersLimit
    );
  }
}

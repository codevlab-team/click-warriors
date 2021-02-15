import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/@core/services/users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  nickname = '';

  constructor(private router: Router, private usersService: UsersService) {
    const user = this.usersService.user;

    if (user) {
      this.nickname = user.nickname;
    }
  }

  ngOnInit(): void {}

  onClickLogout() {
    this.usersService.removeUser();
    this.router.navigate(['/']);
  }
}

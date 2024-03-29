import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../@core/services/users/users.service';
import { distinctName } from '../@core/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userForm: FormGroup;
  submittedOrPatched = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.userForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  get user() {
    return this.userForm.value;
  }

  get nickname(): string {
    return this.userForm.get('nickname')?.value;
  }

  ngOnInit(): void {
    const user = this.usersService.user;

    if (user) {
      this.userForm.patchValue(user);
      this.submittedOrPatched = true;
    }
  }

  onClickPlay(): void {
    this.router.navigate(['/servers']);
  }

  onClickAddServer(): void {
    this.router.navigate(['/servers/add']);
  }

  onSubmit() {
    this.submittedOrPatched = true;
    const nickname = distinctName(this.nickname);
    this.userForm.controls['nickname'].setValue(nickname);
    this.usersService.saveUser(this.userForm.value);
  }
}

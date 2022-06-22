import { Injectable } from '@angular/core';
import { User } from './interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _fixedEmail = 'jhondoe@email.com';
  private _fixedPassword = '123456';

  public isLoggedIn: boolean = false;
  public mockUser: User = {
    name: 'John Doe',
    email: this._fixedEmail,
    role: 'admin',
  };

  constructor() {}

  public loginMock(email: string, password: string): boolean {
    const matchEmailAndPassword =
      email === this._fixedEmail && password === this._fixedPassword;

    this.isLoggedIn = matchEmailAndPassword;

    return matchEmailAndPassword;
  }

  public logoutMock() {
    this.isLoggedIn = false;
  }
}

import { Injectable } from '@angular/core';

export interface UserInfo {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfo?: UserInfo;

  constructor() {
  }

  authorize(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }

  isAuthorized(): boolean {
    return !!this.userInfo;
  }

  getBaseAuthToken(): string {
    return btoa(`${this.userInfo.username}:${this.userInfo.password}`)
  }
}

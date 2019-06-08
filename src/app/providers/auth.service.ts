import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface UserInfo {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfo?: UserInfo;

  constructor(private storage: Storage) {
    this.storage.get('userInfo').then(storageInfo => {
      if (storageInfo) {
        this.authorize(JSON.parse(storageInfo))
      }
    })
  }

  authorize(userInfo: UserInfo) {
    this.userInfo = userInfo;
    this.storage.set('userInfo', JSON.stringify(userInfo))
  }

  isAuthorized(): boolean {
    return !!this.userInfo;
  }

  getBaseAuthToken(): string {
    return btoa(`${this.userInfo.username}:${this.userInfo.password}`);
  }

  logout(): void {
    this.userInfo = undefined;
    this.storage.remove('userInfo')
  }

  getUserInfo(): UserInfo {
    return this.userInfo;
  }
}

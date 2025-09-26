import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageKeyEnum } from '../enums/StorageKeyEnum';
import { IUserInfo } from '../interfaces/IUserInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfoSource = new BehaviorSubject<IUserInfo | null>(this.getUserInfo());
  private tokenExpirationSource = new BehaviorSubject<Date>(new Date(this.getUserInfo()?.tokenExpirationDate));
  private isTokenExpirationSource = new BehaviorSubject<boolean>(new Date() < new Date(this.getUserInfo()?.tokenExpirationDate) ? false : true);

  constructor() { }

  get userInfo() {
    return this.userInfoSource.value;
  }

  set userInfo(user: IUserInfo | null) {
    if (user) {
      localStorage.setItem(StorageKeyEnum.UserInfo, JSON.stringify(user));
      this.isTokenRefresh = new Date(user?.tokenExpirationDate);
      this.isTokenExpired = new Date() < new Date(user?.tokenExpirationDate) ? false : true;
    } else {
      localStorage.removeItem(StorageKeyEnum.UserInfo);
      this.isTokenExpired = true;
    }
    this.userInfoSource.next(user);

  }
  get isTokenRefresh(): boolean {
    const now = new Date().getTime(); // current time in ms
    const expiration = this.tokenExpirationSource.value.getTime(); // expiry in ms
    const diffMinutes = (expiration - now) / (1000 * 60);
    return diffMinutes <= 30;
  }
  set isTokenRefresh(date: Date) {
    this.tokenExpirationSource.next(date);
  }
  get isTokenExpired() {
    return this.isTokenExpirationSource.value;
  }
  set isTokenExpired(value: boolean) {
    this.isTokenExpirationSource.next(value);
  }
  private getUserInfo(): IUserInfo {
    const user = JSON.parse(localStorage.getItem(StorageKeyEnum.UserInfo) || null as any) as IUserInfo;
    if (user) {
      return user;
    } else {
      return null as any;
    }
  }
}

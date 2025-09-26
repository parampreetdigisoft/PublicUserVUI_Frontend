import { HttpInterceptorFn } from '@angular/common/http';
import { IUserInfo } from '../interfaces/IUserInfo';
import { StorageKeyEnum } from '../enums/StorageKeyEnum';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const httpInterceptorInterceptor: HttpInterceptorFn = (request, next) => {
  let router = inject(Router);
  const user = JSON.parse(localStorage.getItem(StorageKeyEnum.UserInfo) || '{}') as IUserInfo;
  if (!(request.url.endsWith('CityUserSignUp') || request.url.endsWith('login') || request.url.endsWith('forgotPassword') || request.url.endsWith('changePassword'))) {
    if (user?.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    } else {
      router.navigate(['/auth/login']);
    }
  }
  return next(request);
};

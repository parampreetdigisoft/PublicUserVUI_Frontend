import {  inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';


export const authGuard: CanActivateFn = (route, state) => {
  debugger;
  const userService = inject(UserService);
  const router = inject(Router);

  if (!userService.isTokenExpired) {
    return true; // allow access
  } else {
    router.navigate(['/auth/login']); // redirect to login
    return false;
  }
};

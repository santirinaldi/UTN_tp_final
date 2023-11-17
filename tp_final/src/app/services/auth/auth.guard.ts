import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  let loggedInStatus!: Number;
  const router = inject(Router);

  loginService.getisLoggedIn().subscribe((value: Number) => {
    loggedInStatus = value;
  });
  if (loggedInStatus != -1) {
    return true;
  } else {
    router.navigateByUrl('/inicio-sesion');
    return false;
  }
};

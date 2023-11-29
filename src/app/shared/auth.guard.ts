import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SpecialistService } from './specialist.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardHelper {
  constructor(
    private specialistService: SpecialistService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const email = localStorage.getItem('email');

    const currentUser = this.specialistService.currentUserSig();
    console.log(email);

    if (email) {
      return true;
    }
    if (currentUser) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const guardHelper = inject(AuthGuardHelper);
  return guardHelper.canActivate();
};

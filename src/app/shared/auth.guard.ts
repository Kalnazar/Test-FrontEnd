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
    const currentUser = this.specialistService.currentUserSig();
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

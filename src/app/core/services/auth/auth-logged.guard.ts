import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
} from '@angular/router';
import { AuthStateService } from '../../store/auth/auth.state';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _authStateService: AuthStateService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url;
    // const idAdwords = route.queryParams[CONSTANTS.QUERY_PARAM_AD_WORDS];
    const isLogged = this._authService.isLoggedIn();
    if (isLogged) {
      const token = this._authService.getToken();
      this._authStateService.loginComplete();
      return true;
    }

    this._router.navigate(['/auth/login']);
    return false;
  }
}

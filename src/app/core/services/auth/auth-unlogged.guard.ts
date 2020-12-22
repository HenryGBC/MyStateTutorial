import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
} from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class UnloggedGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url;
    // const idAdwords = route.queryParams[CONSTANTS.QUERY_PARAM_AD_WORDS];
    const isLogged = this._authService.isLoggedIn();
    if (!isLogged) {
      return true;
    }

    this._router.navigate(['/']);
    return false;
  }
}

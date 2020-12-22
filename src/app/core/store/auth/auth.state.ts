import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { StateService } from '../../state/state.service';
import { AuthState } from './auth.model';

const stateInitial = {
  isLogged: false,
  token: '',
} as AuthState;

@Injectable({
  providedIn: 'root',
})
export class AuthStateService extends StateService<AuthState> {
  public isLogged$: Observable<boolean> = this.getState(
    (state) => state.isLogged
  );
  constructor(private _authService: AuthService, private _router: Router) {
    super(stateInitial);
  }

  login(data) {
    console.log(data);
    this._authService
      .login(data)
      .pipe(
        tap((data) => {
          console.log(data);
          const state = { isLogged: true, token: data.token };
          localStorage.setItem('token', data.token);
          this.setState(state);
          this._router.navigateByUrl('/');
        })
      )
      .subscribe();
  }

  loginComplete() {
    const token = this._authService.getToken();
    const state = { isLogged: true, token: token };
    this.setState(state);
  }
}

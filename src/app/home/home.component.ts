import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStateService } from '../core/store/auth/auth.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogged$: Observable<boolean> = this._authState.isLogged$;
  constructor(private _authState: AuthStateService) {}

  ngOnInit(): void {}
}

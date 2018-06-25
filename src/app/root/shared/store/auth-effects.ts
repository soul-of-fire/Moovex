import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { Logged, LOG_IN } from './auth-store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { UserInfo } from '../models/user-info';
import { CommonAction } from './common-action';

@Injectable()
export class AuthEffects {

  @Effect() logIn$: Observable<Action> = this.actions$.pipe(
    ofType(LOG_IN),
    switchMap((userAction: CommonAction<User>) => this.authService.logIn(userAction).pipe(
        map((userInfo: UserInfo) => {
          this.authService.setAuth(userInfo);
          return new Logged(userInfo);
        })
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
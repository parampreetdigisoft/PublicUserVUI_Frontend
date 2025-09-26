import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http-service';
import { IUserInfo } from '../../core/interfaces/IUserInfo';
import { IResultResponseDto } from '../../core/interfaces/IResultResponseDto';
import { map, tap } from 'rxjs';
import { UserService } from '../../core/services/user-service';
import { CityUserSignUpDto } from '../../core/models/SignUpDto';
import { environment } from '../../../environments/environment';
declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpService);
  private userService = inject(UserService);

  public login(email: string, password: string, rememberMe: boolean) {
    const data = JSON.stringify({ email, password });
    return this.http.post(`Auth/login`, data).pipe(
      map((x) => x as IResultResponseDto<IUserInfo | any>),
      tap((user) => {
        if (user) user.result.rememberMe = rememberMe;
        this.userService.userInfo = user.result;
      })
    );
  }

  public forgotPassword(email: string) {
    const data = JSON.stringify({ email });
    return this.http.post(`Auth/forgotPassword`, data)
    .pipe(map((x) => x as IResultResponseDto<object>));;
  }

  public resetPassword(data: any) {
    return this.http
      .post(`Auth/changePassword`, data)
      .pipe(map((x) => x as IResultResponseDto<any>));
  }
  
  public cityUserSignUp(data: CityUserSignUpDto) {
    return this.http
      .post(`Auth/CityUserSignUp`, data)
      .pipe(map((x) => x as IResultResponseDto<string>));
  }

  public initGoogleButton(elementId: string, callback: (response: any) => void) {
    if (typeof google !== 'undefined'){
          google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback
      });

      google.accounts.id.renderButton(
        document.getElementById(elementId),
        { theme: 'outline', size: 'large' }
      );
    }
  }
}

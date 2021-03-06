import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Avoid name not found warnings
declare let Auth0Lock: any;

@Injectable()
export class AuthService {
  // Configure Auth0
  clientId = 'c5rLW8M9xTXGefagOw2p5QM4htc26u2S';
  domain = 'onlinejudgeauth.auth0.com';
  lock = new Auth0Lock(this.clientId, this.domain, {});

  constructor(private http: Http) {

  }

  public login() {
    return new Promise((resolve, reject) => {
      this.lock.show((error: string, profile: Object, id_token: string) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('id_token', id_token);
          //location.reload(); // reload to refresh ace editor to get buffered data
          resolve(profile);
        }
      });
    })
    // Call the show method to display the widget.

  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }

  public getProfile(): any {
    return JSON.parse(localStorage.getItem('profile'))
  }

  public resetPassword(): void {
    let profile = this.getProfile();
    let url: string = `https://${this.domain}/dbconnections/change_password`;
    let headers = new Headers({ 'content-type': 'application/json' });
    let body = {
      client_id: this.clientId,
      email: profile.email,
      connection: 'Username-Password-Authentication'
    }

    this.http.post(url, body, headers)
      .toPromise()
      .then((res: Response) => {
        console.log(res.json());
        alert("We've just sent you an email to reset your password.:)");
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error occurred ', error);
    return Promise.reject(error.message || error);
  }

}

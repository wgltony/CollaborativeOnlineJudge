var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.clientId = 'c5rLW8M9xTXGefagOw2p5QM4htc26u2S';
        this.domain = 'onlinejudgeauth.auth0.com';
        this.lock = new Auth0Lock(this.clientId, this.domain, {});
    }
    AuthService.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.lock.show(function (error, profile, id_token) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    localStorage.setItem('profile', JSON.stringify(profile));
                    localStorage.setItem('id_token', id_token);
                    resolve(profile);
                }
            });
        });
    };
    AuthService.prototype.authenticated = function () {
        return tokenNotExpired();
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    };
    AuthService.prototype.getProfile = function () {
        return JSON.parse(localStorage.getItem('profile'));
    };
    AuthService.prototype.resetPassword = function () {
        var profile = this.getProfile();
        var url = "https://" + this.domain + "/dbconnections/change_password";
        var headers = new Headers({ 'content-type': 'application/json' });
        var body = {
            client_id: this.clientId,
            email: profile.email,
            connection: 'Username-Password-Authentication'
        };
        this.http.post(url, body, headers)
            .toPromise()
            .then(function (res) {
            console.log(res.json());
            alert("We've just sent you an email to reset your password.:)");
        })
            .catch(this.handleError);
    };
    AuthService.prototype.handleError = function (error) {
        console.error('Error occurred ', error);
        return Promise.reject(error.message || error);
    };
    return AuthService;
}());
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AuthService);
export { AuthService };
//# sourceMappingURL=../../../../src/app/services/auth.service.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
var NavbarComponent = (function () {
    function NavbarComponent(auth, authGuard, input, router) {
        this.auth = auth;
        this.authGuard = authGuard;
        this.input = input;
        this.router = router;
        this.title = "TONY";
        this.username = "";
        this.searchBox = new FormControl();
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.auth.authenticated()) {
            this.username = this.auth.getProfile().nickname;
        }
        this.subscription = this.searchBox
            .valueChanges
            .debounceTime(300)
            .subscribe(function (term) { return _this.input.changeInput(term); });
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    NavbarComponent.prototype.searchProblem = function () {
        this.router.navigate(['/problems']);
    };
    NavbarComponent.prototype.login = function () {
        var _this = this;
        this.auth.login()
            .then(function (profile) { return _this.username = profile.nickname; })
            .catch();
    };
    NavbarComponent.prototype.logout = function () {
        this.auth.logout();
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    Component({
        selector: 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.css']
    }),
    __param(0, Inject('auth')),
    __param(1, Inject('authGuard')),
    __param(2, Inject('input')),
    __metadata("design:paramtypes", [Object, Object, Object, Router])
], NavbarComponent);
export { NavbarComponent };
//# sourceMappingURL=../../../../../src/app/components/navbar/navbar.component.js.map
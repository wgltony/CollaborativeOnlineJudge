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
var DEFAULT_PROBLEM = Object.freeze({
    id: 0,
    name: "",
    desc: "",
    difficulty: ""
});
var NewProblemComponent = (function () {
    function NewProblemComponent(data, authGuard) {
        this.data = data;
        this.authGuard = authGuard;
        this.difficulties = ["Easy", "Medium", "Hard", "Super"];
        this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
    }
    NewProblemComponent.prototype.ngOnInit = function () {
    };
    NewProblemComponent.prototype.addProblem = function () {
        if (this.newProblem.name.trim().length != 0 && this.newProblem.desc.trim().length != 0) {
            this.data.addProblem(this.newProblem)
                .catch(function (error) { return alert(error._body); });
            this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
        }
    };
    return NewProblemComponent;
}());
NewProblemComponent = __decorate([
    Component({
        selector: 'app-new-problem',
        templateUrl: './new-problem.component.html',
        styleUrls: ['./new-problem.component.css']
    }),
    __param(0, Inject("data")), __param(1, Inject("authGuard")),
    __metadata("design:paramtypes", [Object, Object])
], NewProblemComponent);
export { NewProblemComponent };
//# sourceMappingURL=../../../../../src/app/components/new-problem/new-problem.component.js.map
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
import { ActivatedRoute } from '@angular/router';
var EditorComponent = (function () {
    function EditorComponent(collaboration, route, auth, data) {
        this.collaboration = collaboration;
        this.route = route;
        this.auth = auth;
        this.data = data;
        this.languages = ['Java', 'C++', 'Python'];
        this.language = 'Java';
        this.output = '';
        this.defaultContent = {
            'Java': "public class Example{\n      public static void main(String[] args){\n        //Type your code here.\n\n      }\n    }",
            'C++': "#include<iostream>\n    using namespace std;\n\n    int main(){\n      //Type your C++ code here\n\n      return 0;\n    }",
            'Python': "class Solution:\n    def example():\n        #Write your Python code here"
        };
        this.languageMap = new Map();
    }
    EditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.sessionId = params['id'];
            _this.initEditor();
        });
    };
    EditorComponent.prototype.initEditor = function () {
        var _this = this;
        this.editor = ace.edit('editor');
        this.editor.setTheme('ace/theme/twilight');
        this.resetEditor();
        this.editor.$blockScrolling = Infinity;
        document.getElementsByTagName('textarea')[0].focus();
        this.collaboration.init(this.editor, this.sessionId);
        this.editor.lastAppliedChanged = null;
        this.editor.on('change', function (e) {
            e['userLogin'] = _this.auth.authenticated();
            if (_this.editor.lastAppliedChanged != e) {
                _this.collaboration.change(JSON.stringify(e));
            }
        });
        this.editor.getSession().getSelection().on("changeCursor", function () {
            var cursor = _this.editor.getSession().getSelection().getCursor();
            cursor['userLogin'] = _this.auth.authenticated();
            _this.collaboration.cursorMove(JSON.stringify(cursor));
        });
        this.collaboration.restoreBuffer();
    };
    EditorComponent.prototype.setLanguage = function (language) {
        this.language = language;
        this.resetEditor();
    };
    EditorComponent.prototype.resetEditor = function () {
        this.languageMap.set("java", "java");
        this.languageMap.set("c++", "c_cpp");
        this.languageMap.set("python", "python");
        this.editor.getSession().setMode("ace/mode/" + this.languageMap.get(this.language.toLowerCase()));
        this.editor.setValue(this.defaultContent[this.language]);
        this.output = '';
    };
    EditorComponent.prototype.submit = function () {
        var _this = this;
        var userCode = this.editor.getValue();
        var data = {
            user_code: userCode,
            lang: this.language.toLowerCase()
        };
        this.data.buildAndRun(data)
            .then(function (res) { return _this.output = res.text; });
    };
    return EditorComponent;
}());
EditorComponent = __decorate([
    Component({
        selector: 'app-editor',
        templateUrl: './editor.component.html',
        styleUrls: ['./editor.component.css']
    }),
    __param(0, Inject('collaboration')),
    __param(2, Inject('auth')),
    __param(3, Inject('data')),
    __metadata("design:paramtypes", [Object, ActivatedRoute, Object, Object])
], EditorComponent);
export { EditorComponent };
//# sourceMappingURL=../../../../../src/app/components/editor/editor.component.js.map
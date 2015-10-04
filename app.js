var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="typings/angular2/angular2.d.ts" />
var angular2_1 = require('angular2/angular2');
// Annotation section
var MyAppComponent = (function () {
    function MyAppComponent() {
        var _this = this;
        this.questions = {};
        this.data = new Firebase('https://f6046te5hln.firebaseio-demo.com/');
        this.error = '';
        this.data.on('value', function (snapshot) {
            var newQuestions = snapshot.val();
            _this.questions = newQuestions ? newQuestions : {};
            _this.questionKeys = Object.keys(_this.questions);
        });
    }
    MyAppComponent.prototype.submitQuestion = function (name, question) {
        // Simple validate
        if (!name.value || !question.value) {
            this.error = 'Please submit both a name and question.';
        }
        else {
            this.error = '';
            this.data.push({
                name: name.value,
                question: question.value
            });
            name.value = '';
            question.value = '';
        }
    };
    MyAppComponent.prototype.respondToQuestion = function (key) {
        delete this.questions[key];
        this.data.set(this.questions);
    };
    MyAppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            directives: [angular2_1.NgFor, angular2_1.NgIf],
            templateUrl: 'templates/component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], MyAppComponent);
    return MyAppComponent;
})();
angular2_1.bootstrap(MyAppComponent);

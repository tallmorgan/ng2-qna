/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap, NgFor, NgIf} from 'angular2/angular2';

// Annotation section
@Component({
  selector: 'my-app'
})

@View({
  directives: [NgFor],
  templateUrl: 'templates/component.html'
  //template: '<h2 (click)="onClick()">Hello {{ name }}</h2><ul><li *for="#item of items">{{item.name}}</li></ul>'
})

// Component controller
class MyAppComponent {
  questions: Object = {};
  questionKeys: Array<string>; // What's the best way to use NgFor with objects?
  data = new Firebase('https://f6046te5hln.firebaseio-demo.com/');
  error: string = '';

  constructor() {
    this.data.on('value', (snapshot) => {
      this.questions = snapshot.val();
      this.questionKeys = Object.keys(this.questions);
    });
  }

  submitQuestion(name: HTMLInputElement, question: HTMLInputElement) {
    // Simple validate
    if (!name.value || !question.value) {
      this.error = 'Please submit both a name and question.';
    }

    else {
      this.data.push({
        name: name.value,
        question: question.value
      });

      name.value = '';
      question.value = '';
    }
  }

  respondToQuestion(key) {
    delete this.questions[key];
    this.data.set(this.questions);
  }
}

bootstrap(MyAppComponent);
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  ngOnInit(): void {

    let promise = new Promise(resolve => {
      console.log('Promise excuted');
      setTimeout(() => {
        resolve('promise resolved');
      }, 1000);

    });

    promise.then(value => console.log(value));

    let stream$ = new Observable(observer =>{
      console.log('observable execute');
      observer.next(1);
      observer.next(2);
      setTimeout(()=> {
        observer.next('oberver next value');
      },1000);

      observer.next(3);

      })
    stream$.subscribe(value=> console.log(value));

  }
}




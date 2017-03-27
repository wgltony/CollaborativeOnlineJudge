import { Injectable } from '@angular/core';
import {PROBLEMS} from "../mock-problems";
import {Problem} from "../models/problem.model";
import { Http, Response, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DataService {

  //problems: Problem[] = PROBLEMS;

  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: Http) { }

  getProblems(): Observable<Problem[]> {
    this.http.get("api/v1/problems")
      .toPromise()
      .then((res: Response) => {
        this.problemsSource.next(res.json());
      })
      .catch(this.handleError);

    return this.problemsSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    return this.http.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  addProblem(problem: Problem): Promise<Problem> {
    let headers = new Headers({ 'content-type': 'application/json' });
    return this.http.post('/api/v1/problems', problem, headers)
      .toPromise()
      .then((res: Response) => {
        this.getProblems();  //call getProblems function to reload problem list
        return res.json();
      })
      .catch(this.handleError);
  }

  buildAndRun(data): Promise<Object>{
    let headers = new Headers({ 'content-type': 'application/json' });
    return this.http.post('/api/v1/build_and_run', data, headers)
      .toPromise()
      .then((res: Response) => {
        this.getProblems();  //call getProblems function to reload problem list
        return res.json();
      })
      .catch(this.handleError);
  }


  //Error handle
  private handleError(error: any): Promise<any> {
    console.error('An error occurred! ', error);
    return Promise.reject(error.body || error);
  }
}

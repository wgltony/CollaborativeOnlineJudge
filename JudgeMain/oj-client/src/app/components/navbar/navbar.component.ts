import {Component, OnInit, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "TONY";
  username = "";

  searchBox: FormControl = new FormControl();

  subscription: Subscription;

  constructor(@Inject('auth') private auth,
              @Inject('authGuard') private authGuard,
              @Inject('input') private input,
              private router: Router) {
  }

  ngOnInit() {
    if (this.auth.authenticated()) {
      this.username = this.auth.getProfile().nickname;
    }

    this.subscription = this.searchBox
      .valueChanges
      .debounceTime(300)
      .subscribe(
        term => this.input.changeInput(term)
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchProblem(): void {
    this.router.navigate(['/problems']);

  }

  login(): void {
    this.auth.login()
      .then(profile => this.username = profile.nickname)
      .catch();
    //this.username = this.auth.getProfile().nikename;
  }

  logout(): void {
    this.auth.logout();
  }

}

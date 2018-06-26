import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { LoggedInPage } from '../logged-in/logged-in';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('username') uname;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController) {

  }
  
  signIn () {
    this.navCtrl.push(LoginPage);
  }
  
  register () {
    this.navCtrl.push(RegisterPage);
    // this.navCtrl.push(LoggedInPage);
  }
}

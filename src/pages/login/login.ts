import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoggedInPage } from '../logged-in/logged-in';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') user;
  @ViewChild('password') password;

  constructor(private alertCtrl: AlertController, private afAuth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  alert (message: string) {
    this.alertCtrl.create({
      title: message,
      buttons: ["OK"]
    }).present();
  }

  signInUser () {
    console.log("senha", this.password.value)
    this.afAuth.auth.signInWithEmailAndPassword(this.user.value, this.password.value)
      .then(data => {
        console.log("got some data", data);
        this.navCtrl.setRoot(LoggedInPage);
      })
      .catch(e => {
        console.log("got an error", e);
        switch (e.code) {
          case 'auth/invalid-email' :
            this.alert("Email inválido");
            break;

          case 'auth/wrong-password' :
            this.alert("Senha incorreta");
            break;

          default :
            this.alert("Email ou senha incorretos");
            break;
        }
      })
  }

}

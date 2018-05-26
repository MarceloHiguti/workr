import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('username') user;
  @ViewChild('password') password;
  username: string;

  constructor(private alertCtrl: AlertController, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  alert (message: string) {
    this.alertCtrl.create({
      title: message,
      buttons: ["OK"]
    }).present();
  }

  registerUser () {
    // console.log("senha register:", this.password.value);
    this.username = this.user.value + "@teste.com";
    this.afAuth.auth.createUserWithEmailAndPassword(this.username, this.password.value)
      .then(data => {
        console.log("got data", data);
        this.alert("Cadastro realizado com sucesso");
        this.navCtrl.pop();
      })
      .catch(e => {
        switch(e.code) {
          case "auth/invalid-email" :
            this.alert("Email inválido");
            break;
          case "auth/weak-password" :
            this.alert("A senha deve conter no mínimo 6 characters");
            break;

          case "auth/email-already-in-use" :
            this.alert("Este email já está cadastrado");
            break;
          
          default :
            this.alert("Email ou senha inválidos");
            break;
        }
        console.log("got an error", e);
      })
  }
}

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterEmpresaPage } from '../register-empresa/register-empresa';
import { RegisterFuncionarioPage } from '../register-funcionario/register-funcionario';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('username') user;
  @ViewChild('password') password;
  username: string;
  tipo: string;
  tipoSelected: string;

  constructor(private alertCtrl: AlertController, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  alert (message: string) {
    this.alertCtrl.create({
      title: message,
      buttons: ["OK"]
    }).present();
  }

  pickerChange () {
    console.log(this.tipo);
    this.tipoSelected = this.tipo;
  }

  registerUser () {

    //Descomentar para testar
    // if (this.tipoSelected == 'empresa') {
    //   this.navCtrl.push(RegisterEmpresaPage);
    // } else {
    //   this.navCtrl.push(RegisterFuncionarioPage);
    // }


    // console.log("senha register:", this.password.value);
    // this.username = this.user.value + "@teste.com";

    //Ainda precisa testar
    this.username = this.user.value;
    this.afAuth.auth.createUserWithEmailAndPassword(this.username, this.password.value)
      .then(data => {
        console.log("got data", data);
        this.alert("Cadastro realizado com sucesso");
        if (this.tipoSelected == 'empresa') {
          this.navCtrl.push(RegisterEmpresaPage);
        } else {
          this.navCtrl.push(RegisterFuncionarioPage);
        }
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

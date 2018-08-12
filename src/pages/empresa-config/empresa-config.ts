import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterFuncionarioPage } from '../register-funcionario/register-funcionario';

@IonicPage()
@Component({
  selector: 'page-empresa-config',
  templateUrl: 'empresa-config.html',
})
export class EmpresaConfigPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpresaConfigPage');
  }

  logout() {
    this.app.getRootNav().setRoot(LoginPage);
  }
}
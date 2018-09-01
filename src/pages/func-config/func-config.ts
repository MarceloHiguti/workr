import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { RegisterFuncionarioPage } from '../register-funcionario/register-funcionario';
import { HomePage } from '../home/home';
import { FuncVagasFiltrosPage } from '../func-vagas-filtros/func-vagas-filtros';

@IonicPage()
@Component({
  selector: 'page-func-config',
  templateUrl: 'func-config.html',
})
export class FuncConfigPage {

  filtroPicker: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App) {
  }

  editInfo() {
    this.navCtrl.push(RegisterFuncionarioPage);
  }

  filtros() {
    this.navCtrl.push(FuncVagasFiltrosPage);
  }

  logout() {
    this.app.getRootNav().setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncConfigPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FuncConfigPage');
    console.log(this.navCtrl);
  }

}

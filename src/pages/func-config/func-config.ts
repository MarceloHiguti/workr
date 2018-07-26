import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-func-config',
  templateUrl: 'func-config.html',
})
export class FuncConfigPage {

  filtroPicker: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider, private app: App) {
  }

  logout() {
    this.global._vagaFiltro = 'Todos';
    this.app.getRootNav().setRoot(LoginPage);
  }

  pickerChange () {
    console.log(this.filtroPicker);
    this.global._vagaFiltro = this.filtroPicker;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncConfigPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FuncConfigPage');
    console.log(this.navCtrl);
  }

}

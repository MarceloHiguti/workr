import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { EmpresaTabVagasPage } from '../empresa-tab-vagas/empresa-tab-vagas';

@IonicPage()
@Component({
  selector: 'page-empresa-tab',
  templateUrl: 'empresa-tab.html',
})
export class EmpresaTabPage {

  tab1 = HomePage;
  tab2 = EmpresaTabVagasPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpresaTabPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { EmpresaTabVagasPage } from '../empresa-tab-vagas/empresa-tab-vagas';
import { FuncVagasPage } from '../func-vagas/func-vagas';
import { EmpresaCandidatoPage } from '../empresa-candidato/empresa-candidato';

@IonicPage()
@Component({
  selector: 'page-empresa-tab',
  templateUrl: 'empresa-tab.html',
})
export class EmpresaTabPage {

  tab1 = EmpresaCandidatoPage;
  tab2 = EmpresaTabVagasPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpresaTabPage');
  }

}

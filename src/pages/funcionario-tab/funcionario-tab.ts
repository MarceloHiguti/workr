import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FuncVagasPage } from '../func-vagas/func-vagas';
import { EmpresaTabVagasPage } from '../empresa-tab-vagas/empresa-tab-vagas';
import { FuncLikesPage } from '../func-likes/func-likes';

@IonicPage()
@Component({
  selector: 'page-funcionario-tab',
  templateUrl: 'funcionario-tab.html',
})
export class FuncionarioTabPage {

  tab1 = FuncVagasPage;
  tab2 = FuncLikesPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncionarioTabPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastrarVagaPage } from '../cadastrar-vaga/cadastrar-vaga';
import { Observable } from '@firebase/util';
import { UsersProvider } from '../../providers/users/users';

/**
 * Generated class for the EmpresaTabVagasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-empresa-tab-vagas',
  templateUrl: 'empresa-tab-vagas.html',
})
export class EmpresaTabVagasPage {
  vagas: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public user: UsersProvider) {
    this.vagas = this.user.getAll("vagas/");
  }

  cadastrarVaga() {
    this.navCtrl.push(CadastrarVagaPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpresaTabVagasPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastrarVagaPage } from '../cadastrar-vaga/cadastrar-vaga';
import { UsersProvider } from '../../providers/users/users';
import { Observable } from 'rxjs/Observable';

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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-func-vagas-filtros',
  templateUrl: 'func-vagas-filtros.html',
})
export class FuncVagasFiltrosPage {

  filtroPicker: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncVagasFiltrosPage');
    this.global._vagaFiltro = 'Todos';
  }

  pickerChange () {
    console.log(this.filtroPicker);
    this.global._vagaFiltro = this.filtroPicker;
  }
}

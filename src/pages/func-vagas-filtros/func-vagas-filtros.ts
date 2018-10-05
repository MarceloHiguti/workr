import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-func-vagas-filtros',
  templateUrl: 'func-vagas-filtros.html',
})
export class FuncVagasFiltrosPage {

  filtrosArray: string[];
  filtroSelected;
  filtroPicker: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider) {
    this.filtrosArray = this.global._filtrosArray;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncVagasFiltrosPage');
    this.global._vagaFiltro = '';
  }

  pickerChange () {
    console.log(this.filtroPicker);
    this.global._vagaFiltro = this.filtroPicker;
  }
  
  onBack() {
    this.navCtrl.pop();
  }
}

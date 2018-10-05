import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-empresa-filtros',
  templateUrl: 'empresa-filtros.html',
})
export class EmpresaFiltrosPage {

  nivelAcademicoArray: Array<Object> = [
    {
      value: "0",
      name: "Ensino médio incompleto"
    },{
      value: "1",
      name: "Ensino médio completo"
    },{
      value: "2",
      name: "Técnico"
    },{
      value: "3",
      name: "Ensino superior incompleto"
    },{
      value: "4",
      name: "Ensino superior completo"
    },{
      value: "5",
      name: "Mestrado"
    },{
      value: "6",
      name: "Doutorado"
    }
  ];
  nivelInglesArray: Array<Object> = [
    {
      value: "0",
      name: "nenhum"
    },{
      value: "1",
      name: "Básico"
    },{
      value: "2",
      name: "Intermediário"
    },{
      value: "3",
      name: "Avançado"
    },{
      value: "4",
      name: "Fluente"
    }
  ];
  nivelAcademicoSelected;
  nivelInglesSelected;
  nivelPicker: string;
  inglesPicker: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpresaFiltrosPage');
    this.global._candidatoNivel = '0';
    this.global._candidatoIngles = '0';
  }

  nivelPickerChange() {
    console.log(this.nivelPicker);
    this.global._candidatoNivel = this.nivelPicker;
  }

  inglesPickerChange() {
    console.log(this.inglesPicker);
    this.global._candidatoIngles = this.inglesPicker;
  }

  onBack() {
    this.navCtrl.pop();
  }

}

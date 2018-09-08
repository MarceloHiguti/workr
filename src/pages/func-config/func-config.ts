import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { RegisterFuncionarioPage } from '../register-funcionario/register-funcionario';
import { HomePage } from '../home/home';
import { FuncVagasFiltrosPage } from '../func-vagas-filtros/func-vagas-filtros';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-func-config',
  templateUrl: 'func-config.html',
})
export class FuncConfigPage {

  candidatoId: string;
  users: any;
  candidato = {
    nome: '',
    idade: '',
    formacao: ''
  }


  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private app: App) {
    this.candidatoId = this.afAuth.auth.currentUser.uid;
    var parent = this;
    var usersRef = this.db.database.ref("users/" + this.candidatoId).once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        console.log(obj);
        if (obj[0] != null) {
          obj.forEach(element => {
            parent.candidato.nome = element.name;
            parent.candidato.idade = element.idade;
            parent.candidato.formacao = element.formacao;
          });
        }
    });
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EmpresaFiltrosPage } from '../empresa-filtros/empresa-filtros';
import { RegisterEmpresaPage } from '../register-empresa/register-empresa';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-empresa-config',
  templateUrl: 'empresa-config.html',
})
export class EmpresaConfigPage {

  empresaId: string;
  nomeImagem: string;
  users: any;
  empresa = {
    nome: '',
    endereco: '',
    imagem: "assets/imgs/vaga_default.png"
  }
  referencia;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private app: App) {
    this.referencia = firebase.storage().ref();
    this.empresaId = this.afAuth.auth.currentUser.uid;
    var parent = this;
    var usersRef = this.db.database.ref("users/" + this.empresaId).once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        console.log(obj);
        if (obj[0] != null) {
          obj.forEach(element => {
            parent.empresa.nome = element.name;
            parent.empresa.endereco = element.endereco;
            parent.nomeImagem = element.imagem;
          });
        }

        if (parent.nomeImagem != undefined && parent.nomeImagem != '') {
          let caminho = parent.referencia.child('imagens/' + parent.empresaId + '/' + parent.nomeImagem);
          caminho.getDownloadURL().then(url => {
            // this.imagemPath = url;
            // console.log("url");
            // console.log(url); // AQUI VOCÊ JÁ TEM O ARQUIVO
            parent.empresa.imagem = url;
          });
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpresaConfigPage');
  }

  logout() {
    this.app.getRootNav().setRoot(HomePage);
  }

  filtro() {
    this.navCtrl.push(EmpresaFiltrosPage);
  }

  editInfo() {
    this.navCtrl.push(RegisterEmpresaPage);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CadastrarVagaPage } from '../cadastrar-vaga/cadastrar-vaga';
import { UsersProvider } from '../../providers/users/users';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-empresa-tab-vagas',
  templateUrl: 'empresa-tab-vagas.html',
})
export class EmpresaTabVagasPage {
  title: string;
  cargo: string;
  description: string;
  empresa: string;
  vagas: Array<Object> = [];
  arquivo;
  referencia;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private provider: UsersProvider, private toast: ToastController) {
    this.referencia = firebase.storage().ref();
  }

  cadastrarVaga() {
    this.navCtrl.push(CadastrarVagaPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpresaTabVagasPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter EmpresaTabVagasPage');
    this.vagas = [];
    var user = this.afAuth.auth.currentUser;
    this.empresa = user.displayName;
    var parent = this;
    var matchesRef = this.db.database.ref("vagas/").orderByChild('empresa').equalTo(this.empresa).once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        console.log(obj);
        if (obj[0] != null) {
          obj.forEach(element => {
            keys = Object.keys(element);
            keys.forEach((value, index) => {
              parent.title = element[value].title;
              parent.cargo = element[value].cargo;
              parent.description = element[value].description;
              parent.vagas.push({title: parent.title, cargo: parent.cargo, description: parent.description});
            })
          });
        }
        // console.log("parent.vagas");
        // console.log(parent.vagas);
    });
  }

  atualizaArquivo(event){
    this.arquivo = event.srcElement.files[0];
  }

  enviarArquivo(dir, arquivo){
    let caminho = this.referencia.child('curriculum/'+this.arquivo.name);
    let tarefa = caminho.put(this.arquivo);
    tarefa.on('state_changed', (snapshot)=>{
      // Acompanha os estados do upload (progresso, pausado,...)
      }, error => {
        // Tratar possíveis erros
      }, () => {
        // Função de retorno quando o upload estiver completo  
      console.log(tarefa.snapshot.downloadURL);
    });
  }

  baixarArquivo(nome: string){
    let caminho = this.referencia.child('curriculum/'+nome);
    caminho.getDownloadURL().then(url => {
        console.log(url); // AQUI VOCÊ JÁ TEM O ARQUIVO
    });
  }

}

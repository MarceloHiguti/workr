import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from '../../providers/users/users';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-candidato-aceito-detail',
  templateUrl: 'candidato-aceito-detail.html',
})
export class CandidatoAceitoDetailPage {

  candidatoId: string;
  users: any;
  candidato = {
    nome: '',
    idade: '',
    celular: '',
    email: '',
    formacao: '',
    idioma: ''
  }
  arquivo;
  referencia;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, private app: App, public navParams: NavParams, public db: AngularFireDatabase, private provider: UsersProvider, private toast: ToastController) {
    this.candidatoId = navParams.get('candidatoId');
    console.log("candidatoId: ", this.candidatoId);
    this.referencia = firebase.storage().ref();
    var parent = this;
    var usersRef = this.db.database.ref("users/" + this.candidatoId).once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        console.log("obj");
        console.log(obj);
        if (obj[0] != null) {
          obj.forEach(element => {
            parent.candidato.nome = element.name;
            parent.candidato.idade = element.idade;
            parent.candidato.celular = element.celular;
            parent.candidato.email = element.email;
            parent.candidato.formacao = element.formacao;
            parent.candidato.idioma = element.idioma;
          });
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidatoAceitoDetailPage');
  }

  atualizaArquivo(event){
    this.arquivo = event.srcElement.files[0];
    var fileName = document.getElementById('file-name');
    fileName.textContent = event.srcElement.files[0].name;
    console.log("event.srcElement.files[0]");
    console.log(event.srcElement.files[0]);
  }

  enviarArquivo(dir, arquivo){
    let caminho = this.referencia.child('curriculos/' + dir + '/' + this.arquivo.name);
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
    let caminho = this.referencia.child('curriculos/'+nome);
    caminho.getDownloadURL().then(url => {
        console.log(url); // AQUI VOCÊ JÁ TEM O ARQUIVO
    });
  }
}

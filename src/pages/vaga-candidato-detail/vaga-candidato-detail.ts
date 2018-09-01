import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from '../../providers/users/users';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { GlobalProvider } from "../../providers/global/global";
import { FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-vaga-candidato-detail',
  templateUrl: 'vaga-candidato-detail.html',
})
export class VagaCandidatoDetailPage {

  candidatoId: string;
  users: any;
  candidato = {
    nome: '',
    idade: '',
    formacao: '',
    idioma: ''
  }
  arquivo;
  referencia;

  form: FormGroup;
  feedbackPicker: string;
  feedbackPickerSelected: string;
  feedback: any;

  constructor(private afAuth: AngularFireAuth, private formBuilder: FormBuilder, public navCtrl: NavController, public global: GlobalProvider, private app: App, public navParams: NavParams, public db: AngularFireDatabase, private provider: UsersProvider, private toast: ToastController) {
    this.candidatoId = navParams.get('candidatoId');
    this.feedback = this.navParams.data.feedback || {};
    console.log("candidatoId: ", this.candidatoId);
    this.createForm();
    this.referencia = firebase.storage().ref();
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
            parent.candidato.idioma = element.idioma;
          });
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VagaCandidatoDetailPage');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave VagaCandidatoDetailPage');
    this.global._feedbackMotivo = this.feedbackPickerSelected;
    this.global._feedbackObservacao = this.form.value.feedbackText;
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

  pickerChange () {
    console.log(this.feedbackPicker);
    this.feedbackPickerSelected = this.feedbackPicker;
  }

  createForm () {
    this.form = this.formBuilder.group({
      feedbackPicker: this.feedbackPickerSelected,
      feedbackText: this.feedback.feedbackText
    })
  }
}

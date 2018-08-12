import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersProvider } from '../../providers/users/users';
import { FuncionarioTabPage } from '../funcionario-tab/funcionario-tab';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-register-funcionario',
  templateUrl: 'register-funcionario.html',
})
export class RegisterFuncionarioPage {
  email: string;
  userId: string;
  form: FormGroup;
  users: any;
  funcionario = {
    nome: '',
    idade: '',
    celular: '',
    email: '',
    formacao: '',
    idioma: ''
  }
  arquivo;
  referencia;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, private app: App, public navParams: NavParams, public db: AngularFireDatabase, private formBuilder: FormBuilder, private provider: UsersProvider, private toast: ToastController) {
    this.referencia = firebase.storage().ref();
    this.funcionario.email = afAuth.auth.currentUser.email;
    this.userId = afAuth.auth.currentUser.uid;
    console.log("userId: ", afAuth.auth.currentUser.uid);
    this.users = this.navParams.data.users || {};
    console.log("user: ", this.users);
    this.createForm();
    var parent = this;
    var usersRef = this.db.database.ref("users/" + this.userId).once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        console.log(obj);
        if (obj[0] != null) {
          obj.forEach(element => {
            parent.funcionario.nome = element.name;
            parent.funcionario.idade = element.idade;
            parent.funcionario.celular = element.celular;
            parent.funcionario.email = element.email;
            parent.funcionario.formacao = element.formacao;
            parent.funcionario.idioma = element.idioma;
          });
        }
    });
  }

  createForm () {
    this.form = this.formBuilder.group({
      key: [this.userId],
      nome: [this.users.nome, Validators.required],
      idade: [this.users.idade, Validators.required],
      celular: [this.users.celular, Validators.required],
      email: [this.users.email, Validators.required],
      formacao: [this.users.formacao, Validators.required],
      idioma: [this.users.idioma, Validators.required],
    })
  }
  onSubmit () {
    // console.log(this.form.value);
    var parent = this;
    if (this.form.valid) {
      this.provider.saveFuncionario(this.form.value)
        .then(() => {
          parent.enviarArquivo(parent.funcionario.email, parent.arquivo);
          this.toast.create({ message: 'Usuário salvo com sucesso.', duration: 3000}).present();
          this.app.getRootNav().setRoot(FuncionarioTabPage);
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar usuário.', duration: 3000}).present();
          console.error(e);
        })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterFuncionarioPage');
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

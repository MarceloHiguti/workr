import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from '../../providers/users/users';
import { CardPage } from '../card/card';
import { EmpresaTabPage } from '../empresa-tab/empresa-tab';
import { FuncionarioTabPage } from '../funcionario-tab/funcionario-tab';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-register-empresa',
  templateUrl: 'register-empresa.html',
})
export class RegisterEmpresaPage {

  empresaId: string;
  form: FormGroup;
  users: any;
  empresa = {
    tipo: 'empresa',
    nome: '',
    email: '',
    endereco: '',
    desc: '',
    imagem: ''
  }
  arquivo = {
    name: ''
  };
  referencia;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, private app: App, public navParams: NavParams, public db: AngularFireDatabase, private formBuilder: FormBuilder, private provider: UsersProvider, private toast: ToastController) {
    this.referencia = firebase.storage().ref();
    this.empresaId = afAuth.auth.currentUser.uid;
    console.log("empresaId: ", afAuth.auth.currentUser.uid);
    this.users = this.navParams.data.users || {};
    console.log("user: ", this.users);
    this.createForm();
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
            parent.empresa.email = element.email;
            parent.empresa.endereco = element.endereco;
            parent.empresa.desc = element.desc;

            parent.createForm();
            console.log("parent.form");
            console.log(parent.form);
          });
        }
    });
  }

  createForm () {
    this.form = this.formBuilder.group({
      key: [this.empresaId],
      nome: [this.empresa.nome, Validators.required],
      email: [this.empresa.email, Validators.required],
      endereco: [this.empresa.endereco, Validators.required],
      desc: [this.empresa.desc],
      tipo: [this.empresa.tipo],
      imagem: this.arquivo.name
    })
  }
  
  atualizaArquivo(event){
    this.arquivo = event.srcElement.files[0];
    var fileName = document.getElementById('file-name');
    fileName.textContent = event.srcElement.files[0].name;
    console.log("event.srcElement.files[0]");
    console.log(event.srcElement.files[0]);
    this.createForm();
  }

  enviarArquivo(){
    let caminho = this.referencia.child('imagens/' + this.empresaId + '/' + this.arquivo.name);
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

  onSubmit () {
    console.log(this.form.value);
    if (this.form.valid) {
      this.provider.saveEmpresa(this.form.value)
        .then(() => {
          this.enviarArquivo();
          this.toast.create({ message: 'Usuário salvo com sucesso.', duration: 3000}).present();
          this.app.getRootNav().setRoot(EmpresaTabPage);
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar usuário.', duration: 3000}).present();
          console.error(e);
        })
    }
  }
}

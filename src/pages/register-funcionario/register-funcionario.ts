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
    tipo: 'funcionario',
    nome: '',
    idade: '',
    celular: '',
    email: '',
    formacao: '',
    idioma: '',
    nivelAcademico: '',
    nivelIngles: ''
  }
  arquivo;
  referencia;
  curriculoName = '';

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

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, private app: App, public navParams: NavParams, public db: AngularFireDatabase, private formBuilder: FormBuilder, private provider: UsersProvider, private toast: ToastController) {
    this.referencia = firebase.storage().ref();
    // this.funcionario.email = afAuth.auth.currentUser.email;
    this.userId = afAuth.auth.currentUser.uid;
    console.log("userId: ", afAuth.auth.currentUser.uid);

    // this.funcionario.email = 'testeEmail';
    // this.userId = "1111";

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
            parent.funcionario.nivelAcademico = element.nivelAcademico;
            parent.nivelAcademicoSelected = element.nivelAcademico;
            parent.funcionario.nivelIngles = element.nivelIngles;

            parent.createForm();
            console.log("parent.form");
            console.log(parent.form);
          });
        }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.userId],
      nome: [this.funcionario.nome, Validators.required],
      idade: [this.funcionario.idade, Validators.required],
      celular: [this.funcionario.celular, Validators.required],
      email: [this.funcionario.email, Validators.required],
      formacao: [this.funcionario.formacao, Validators.required],
      idioma: [this.funcionario.idioma],
      nivelAcademico: [this.funcionario.nivelAcademico, Validators.required],
      nivelIngles: [this.funcionario.nivelIngles, Validators.required],
      curriculo: [this.curriculoName],
      tipo: [this.funcionario.tipo]
    })
  }

  changePicker() {
    this.funcionario.nivelAcademico = '5';
  }

  onSubmit () {
    // console.log(this.form.value);
    var parent = this;
    if (this.form.valid) {
      this.provider.saveFuncionario(this.form.value)
        .then(() => {
          if (parent.arquivo != undefined) {
            parent.enviarArquivo(parent.funcionario.email, parent.arquivo);
          }
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
    this.curriculoName = this.arquivo.name;
    console.log("this.curriculoName");
    console.log(this.curriculoName);
    this.createForm();
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

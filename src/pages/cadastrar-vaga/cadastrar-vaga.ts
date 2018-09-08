import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from '../../providers/users/users';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorageModule } from 'angularfire2/storage';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-cadastrar-vaga',
  templateUrl: 'cadastrar-vaga.html',
})
export class CadastrarVagaPage {

  empresaName: string;
  form: FormGroup;
  users: any;
  id: string;
  arquivo = {
    name: ''
  };
  referencia;

  constructor(private afStorage: AngularFireStorageModule, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private provider: UsersProvider, private alertCtrl: AlertController, private toast: ToastController) {
    this.referencia = firebase.storage().ref();
    var user = this.afAuth.auth.currentUser;
    this.empresaName = user.displayName;
    this.users = this.navParams.data.users || {};
    this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 16);
    console.log("users: ", this.users);
    this.createForm();
  }

  createForm () {
    this.form = this.formBuilder.group({
      key: this.id,
      title: [this.users.title, Validators.required],
      empresa: this.empresaName,
      cargo: [this.users.cargo, Validators.required],
      area: [this.users.area, Validators.required],
      salario: [this.users.salario, Validators.required],
      description: [this.users.description, Validators.required],
      imagem: this.arquivo.name
    })
  }

  onSubmit () {
    if (this.form.valid) {
      this.provider.saveVaga(this.form.value)
        .then(() => {
          this.enviarArquivo();
          this.toast.create({ message: 'Vaga adicionada com sucesso.', duration: 3000}).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar vaga.', duration: 3000}).present();
          console.error(e);
        })
    }
  }

  atualizaArquivo(event){
    this.arquivo = event.srcElement.files[0];
    var fileName = document.getElementById('file-name');
    fileName.textContent = event.srcElement.files[0].name;
    console.log("event.srcElement.files[0]");
    console.log(event.srcElement.files[0]);
  }

  enviarArquivo(){
    let caminho = this.referencia.child('imagens/' + this.id + '/' + this.arquivo.name);
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
    let caminho = this.referencia.child('imagens/' + this.id + '/' + nome);
    caminho.getDownloadURL().then(url => {
        console.log(url); // AQUI VOCÊ JÁ TEM O ARQUIVO
    });
  }
  
  alert (message: string) {
    this.alertCtrl.create({
      title: message,
      buttons: ["OK"]
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarVagaPage');
  }



}

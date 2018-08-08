import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersProvider } from '../../providers/users/users';
import { FuncionarioTabPage } from '../funcionario-tab/funcionario-tab';
import { AngularFireDatabase } from 'angularfire2/database';


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

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, private app: App, public navParams: NavParams, public db: AngularFireDatabase, private formBuilder: FormBuilder, private provider: UsersProvider, private toast: ToastController) {
    this.email = afAuth.auth.currentUser.email;
    this.userId = afAuth.auth.currentUser.uid;
    console.log("userId: ", afAuth.auth.currentUser.uid);
    this.users = this.navParams.data.users || {};
    console.log("user: ", this.users);
    this.createForm();
    var parent = this;
    var matchesRef = this.db.database.ref("matches/" + this.userId).once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        // console.log(obj);
        if (obj[0] != null) {
          obj.forEach(element => {
            keys = Object.keys(element);
            keys.forEach((value, index) => {
              parent.funcionario.nome = element[value].name;
              parent.funcionario.idade = element[value].idade;
              parent.funcionario.celular = element[value].celular;
              parent.funcionario.email = element[value].email;
              parent.funcionario.formacao = element[value].formacao;
              parent.funcionario.idioma = element[value].idioma;
            })
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
    if (this.form.valid) {
      this.provider.saveFuncionario(this.form.value)
        .then(() => {
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

}

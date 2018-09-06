import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from '../../providers/users/users';
import { CardPage } from '../card/card';
import { EmpresaTabPage } from '../empresa-tab/empresa-tab';
import { FuncionarioTabPage } from '../funcionario-tab/funcionario-tab';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-register-empresa',
  templateUrl: 'register-empresa.html',
})
export class RegisterEmpresaPage {

  email: string;
  userId: string;
  form: FormGroup;
  users: any;
  tipo: string;
  tipoSelected: string;
  empresa = {
    tipo: 'empresa',
    nome: '',
    email: ''
  }
  arquivo;
  referencia;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, private app: App, public navParams: NavParams, public db: AngularFireDatabase, private formBuilder: FormBuilder, private provider: UsersProvider, private toast: ToastController) {
    this.referencia = firebase.storage().ref();
    this.empresa.email = afAuth.auth.currentUser.email;
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
            parent.empresa.nome = element.name;
            parent.empresa.email = element.email;

            parent.createForm();
            console.log("parent.form");
            console.log(parent.form);
          });
        }
    });
  }

  createForm () {
    this.form = this.formBuilder.group({
      key: [this.userId],
      nome: [this.users.nome, Validators.required],
      email: [this.users.email, Validators.required]
    })
  }

  onSubmit () {
    console.log(this.form.value);
    if (this.form.valid) {
      this.provider.saveEmpresa(this.form.value)
        .then(() => {
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersProvider } from '../../providers/users/users';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-register-eureka',
  templateUrl: 'register-eureka.html',
})
export class RegisterEurekaPage {
  form: FormGroup;
  usuario = {
    nome: '',
    idade: '',
    celular: '',
    email: '',
    nota: ''
  }

  notaArray: Array<Object> = [
    {
      value: "1",
      name: "1"
    },{
      value: "2",
      name: "2"
    },{
      value: "3",
      name: "3"
    },{
      value: "4",
      name: "4"
    },{
      value: "5",
      name: "5"
    },{
      value: "6",
      name: "6"
    },{
      value: "7",
      name: "7"
    },{
      value: "8",
      name: "8"
    },{
      value: "9",
      name: "9"
    },{
      value: "10",
      name: "10"
    }
  ];
  nivelAcademicoSelected;

  constructor(public navCtrl: NavController, private app: App, public navParams: NavParams, public db: AngularFireDatabase, private formBuilder: FormBuilder, private provider: UsersProvider, private toast: ToastController) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      nome: [this.usuario.nome, Validators.required],
      idade: [this.usuario.idade, Validators.required],
      celular: [this.usuario.celular, Validators.required],
      // email: [this.usuario.email, Validators.required],
      nota: [this.usuario.nota, Validators.required]
    })
  }

  onSubmit () {
    // console.log(this.form.value);
    var parent = this;
    if (this.form.valid) {
      this.provider.saveEurekaUser(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Cadastro realizado com sucesso.', duration: 3000}).present();
          this.createForm();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar usuário.', duration: 3000}).present();
          console.error(e);
        })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterEurekaPage');
  }
}

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from '../../providers/users/users';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-cadastrar-vaga',
  templateUrl: 'cadastrar-vaga.html',
})
export class CadastrarVagaPage {

  empresaName: string;
  form: FormGroup;
  users: any;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private provider: UsersProvider, private alertCtrl: AlertController, private toast: ToastController) {
    var user = this.afAuth.auth.currentUser;
    this.empresaName = user.displayName;
    this.users = this.navParams.data.users || {};
    console.log("users: ", this.users);
    this.createForm();
  }

  createForm () {
    this.form = this.formBuilder.group({
      // key: [this.userId],
      title: [this.users.title, Validators.required],
      empresa: this.empresaName,
      cargo: [this.users.cargo, Validators.required],
      salario: [this.users.salario, Validators.required],
      description: [this.users.description, Validators.required]
    })
  }

  onSubmit () {
    if (this.form.valid) {
      this.provider.saveVaga(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Vaga adicionada com sucesso.', duration: 3000}).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar vaga.', duration: 3000}).present();
          console.error(e);
        })
    }
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

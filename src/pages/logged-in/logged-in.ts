import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from '../../providers/users/users';
import { CardPage } from '../card/card';

@IonicPage()
@Component({
  selector: 'page-logged-in',
  templateUrl: 'logged-in.html',
})
export class LoggedInPage {

  email: string;
  userId: string;
  form: FormGroup;
  users: any;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private provider: UsersProvider, private toast: ToastController) {
    this.email = afAuth.auth.currentUser.email;
    this.userId = afAuth.auth.currentUser.uid;
    console.log("userId: ", afAuth.auth.currentUser.uid);
    this.users = this.navParams.data.users || {};
    console.log("user: ", this.users);
    this.createForm();
  }

  createForm () {
    this.form = this.formBuilder.group({
      key: [this.userId],
      name: [this.users.name, Validators.required],
      type: [this.users.type, Validators.required]
    })
  }

  onSubmit () {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Usuário salvo com sucesso.', duration: 3000}).present();
          this.navCtrl.push(CardPage);
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar usuário.', duration: 3000}).present();
          console.error(e);
        })
    }
  }
}

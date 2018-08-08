import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from '../../providers/users/users';
import { CardPage } from '../card/card';
import { EmpresaTabPage } from '../empresa-tab/empresa-tab';
import { FuncionarioTabPage } from '../funcionario-tab/funcionario-tab';

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

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private provider: UsersProvider, private toast: ToastController) {
    this.email = afAuth.auth.currentUser.email;
    this.userId = afAuth.auth.currentUser.uid;
    console.log("userId: ", afAuth.auth.currentUser.uid);
    this.users = this.navParams.data.users || {};
    console.log("user: ", this.users);
    this.tipoSelected = 'funcionario';
    this.createForm();
  }

  createForm () {
    this.form = this.formBuilder.group({
      key: [this.userId],
      nome: [this.users.nome, Validators.required],
      tipo: this.tipoSelected
    })
  }

  pickerChange () {
    console.log(this.tipo);
    this.tipoSelected = this.tipo;
  }

  onSubmit () {
    // console.log(this.form.value);
    // if (this.form.valid) {
    //   this.provider.saveEmpresa(this.form.value)
    //     .then(() => {
    //       this.toast.create({ message: 'Usuário salvo com sucesso.', duration: 3000}).present();
    //       if (this.tipoSelected == 'empresa') {
    //         this.navCtrl.push(EmpresaTabPage);
    //       } else {
    //         this.navCtrl.push(FuncionarioTabPage);
    //       }
    //     })
    //     .catch((e) => {
    //       this.toast.create({ message: 'Erro ao salvar usuário.', duration: 3000}).present();
    //       console.error(e);
    //     })
    }
  }
}

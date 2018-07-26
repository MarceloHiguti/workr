import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from '../../providers/users/users';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
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

  constructor(private afStorage: AngularFireStorageModule, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private provider: UsersProvider, private alertCtrl: AlertController, private toast: ToastController, private fileChooser: FileChooser, private file: File) {
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

  choose () {
    this.fileChooser.open()
      .then((uri) => {
        alert(uri);

        this.file.resolveLocalFilesystemUrl(uri).then((newUrl) => {
          alert(JSON.stringify(newUrl));
          let dirPath = newUrl.nativeURL;
          let dirPathSegments = dirPath.split('/');
          dirPathSegments.pop();
          dirPath = dirPathSegments.join('/');

          this.file.readAsArrayBuffer(dirPath, newUrl.name).then(async (buffer) => {
            this.upload(buffer, newUrl.name);
          });

        });
      });
  }

  async upload(buffer, name) {
    let blob = new Blob(buffer, { type: "image/jpeg"});
    let storage = firebase.storage();
    
    storage.ref('images/' + name).put(blob)
      .then((d) => {
        alert("Done");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      })
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

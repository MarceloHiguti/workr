import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoggedInPage } from '../logged-in/logged-in';
import { UsersProvider } from '../../providers/users/users';
import { Observable } from 'rxjs/Observable';
import { CardPage } from '../card/card';
import { CardDetailPage } from '../card-detail/card-detail';
import { AngularFireDatabase } from 'angularfire2/database';
import { EmpresaTabPage } from '../empresa-tab/empresa-tab';
import { FuncionarioTabPage } from '../funcionario-tab/funcionario-tab';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') username;
  @ViewChild('password') password;
  userEmail: string;

  constructor(private alertCtrl: AlertController, private db: AngularFireDatabase, private afAuth:AngularFireAuth, public navCtrl: NavController, private provider: UsersProvider, public navParams: NavParams) {
    
  }

  alert (message: string) {
    this.alertCtrl.create({
      title: message,
      buttons: ["OK"]
    }).present();
  }

  empresaTabs() {
    console.log("tem cadastro");
    this.navCtrl.setRoot(EmpresaTabPage);
  }

  funcionarioTabs() {
    console.log("tem cadastro");
    this.navCtrl.setRoot(FuncionarioTabPage);
  }

  cadastro() {
    console.log("não tem cadastro");
    this.navCtrl.setRoot(LoggedInPage);
  }

  signInUser () {
    // console.log("senha", this.password.value)
    this.userEmail = this.username.value + "@teste.com";
    var name = this.userEmail;
    var dName = name.split("@");
    this.afAuth.auth.signInWithEmailAndPassword(this.userEmail, this.password.value)
      .then(data => {
        console.log("got some data", data);
        var parent = this; // variavel criada para poder acessar o navCtrl na próxima função
        var user = this.afAuth.auth.currentUser;
        var ref = this.db.database.ref("users/" + user.uid).once("value")
          .then(function(snapshot) {
            var obj = [];
            obj.push(snapshot.val());
            if (snapshot.exists()) {//verificar se possui a key do auth no banco de dados
              if (obj[0]["type"] == 'empresa') {
                parent.empresaTabs();
              } else {
                parent.funcionarioTabs();
              }
            } else {
              parent.cadastro();
            }
          });

        user.updateProfile({
          displayName: dName[0],
          photoURL: ""
        }).then(function() {
          console.log("uid:", user.uid);
          console.log("uid typeof:", typeof user.uid);
          console.log("displayName:", user.displayName);
        }).catch(function(error) {
          // An error happened.
        });
      })
      .catch(e => {
        console.log("got an error", e);
        switch (e.code) {
          case 'auth/invalid-email' :
            this.alert("Email inválido");
            break;

          case 'auth/wrong-password' :
            this.alert("Senha incorreta");
            break;

          default :
            this.alert("Email ou senha incorretos");
            break;
        }
      })
  }

  signInCandidatoMarcelo() {
    this.afAuth.auth.signInWithEmailAndPassword("marcelohiguti96@gmail.com", "123@mudar")
      .then(data => {
        // console.log("got some data", data);
        // console.log("user.uid", user.uid);
        var parent = this; // variavel criada para poder acessar o navCtrl na próxima função
        var user = this.afAuth.auth.currentUser;
        var ref = this.db.database.ref("users/" + user.uid).once("value")
          .then(function(snapshot) {
            if (snapshot.exists()) {//verificar se possui a key do auth no banco de dados
              parent.funcionarioTabs();
            } else {
              parent.cadastro();
            }
          });

        user.updateProfile({
          displayName: "Marcelo",
          photoURL: ""
        }).then(function() {
          // console.log("uid:", user.uid);
          // console.log("uid typeof:", typeof user.uid);
          // console.log("displayName:", user.displayName);
        }).catch(function(error) {
          // An error happened.
        });
      })
      .catch(e => {
      })
  }

  signInCandidatoPedro() {
    this.afAuth.auth.signInWithEmailAndPassword("pedro@teste.com", "123@mudar")
      .then(data => {
        // console.log("got some data", data);
        var parent = this; // variavel criada para poder acessar o navCtrl na próxima função
        var user = this.afAuth.auth.currentUser;
        var ref = this.db.database.ref("users/" + user.uid).once("value")
          .then(function(snapshot) {
            if (snapshot.exists()) {//verificar se possui a key do auth no banco de dados
              parent.funcionarioTabs();
            } else {
              parent.cadastro();
            }
          });

        user.updateProfile({
          displayName: "Pedro",
          photoURL: ""
        }).then(function() {
          // console.log("uid:", user.uid);
          // console.log("uid typeof:", typeof user.uid);
          // console.log("displayName:", user.displayName);
        }).catch(function(error) {
          // An error happened.
        });
      })
      .catch(e => {
      })
  }

  signInEmpresa () {
    this.afAuth.auth.signInWithEmailAndPassword("higuti@teste.com", "123@mudar")
      .then(data => {
        console.log("got some data", data);
        var parent = this; // variavel criada para poder acessar o navCtrl na próxima função
        var user = this.afAuth.auth.currentUser;
        var ref = this.db.database.ref("users/" + user.uid).once("value")
          .then(function(snapshot) {
            if (snapshot.exists()) {//verificar se possui a key do auth no banco de dados
              parent.empresaTabs();
            } else {
              parent.cadastro();
            }
          });

        user.updateProfile({
          displayName: "Higuti",
          photoURL: ""
        }).then(function() {
          console.log("uid:", user.uid);
          console.log("uid typeof:", typeof user.uid);
          console.log("displayName:", user.displayName);
        }).catch(function(error) {
          // An error happened.
        });
      })
  }

  signInEmpresaGoogle () {
    this.afAuth.auth.signInWithEmailAndPassword("google@teste.com", "123@mudar")
      .then(data => {
        console.log("got some data", data);
        var parent = this; // variavel criada para poder acessar o navCtrl na próxima função
        var user = this.afAuth.auth.currentUser;
        var ref = this.db.database.ref("users/" + user.uid).once("value")
          .then(function(snapshot) {
            if (snapshot.exists()) {//verificar se possui a key do auth no banco de dados
              parent.empresaTabs();
            } else {
              parent.cadastro();
            }
          });

        user.updateProfile({
          displayName: "Google",
          photoURL: ""
        }).then(function() {
          console.log("uid:", user.uid);
          console.log("uid typeof:", typeof user.uid);
          console.log("displayName:", user.displayName);
        }).catch(function(error) {
          // An error happened.
        });
      })
  }

  signInEmpresaMaua () {
    this.afAuth.auth.signInWithEmailAndPassword("maua@teste.com", "123@mudar")
      .then(data => {
        console.log("got some data", data);
        var parent = this; // variavel criada para poder acessar o navCtrl na próxima função
        var user = this.afAuth.auth.currentUser;
        var ref = this.db.database.ref("users/" + user.uid).once("value")
          .then(function(snapshot) {
            if (snapshot.exists()) {//verificar se possui a key do auth no banco de dados
              parent.empresaTabs();
            } else {
              parent.cadastro();
            }
          });

        user.updateProfile({
          displayName: "Maua",
          photoURL: ""
        }).then(function() {
          console.log("uid:", user.uid);
          console.log("uid typeof:", typeof user.uid);
          console.log("displayName:", user.displayName);
        }).catch(function(error) {
          // An error happened.
        });
      })
  }

}

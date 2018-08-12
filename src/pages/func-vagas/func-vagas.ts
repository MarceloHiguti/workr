import { Component, trigger, state, animate, transition, style, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup } from '@angular/forms';
import { GlobalProvider } from "../../providers/global/global";
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-func-vagas',
  templateUrl: 'func-vagas.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ]),

    trigger('myAwesomeAnimation', [
        state('small', style({
            transform: 'scale(1)',
        })),
        state('large', style({
            transform: 'scale(1.2)',
        })),
        transition('small => large', animate('100ms ease-in')),
    ])
  ]
})
export class FuncVagasPage {

  userId: string;
  userNome: string;
  title: String;
  empresa: String;
  cargo: String;
  salario: String;
  desc: String;
  imagem =  "assets/imgs/logo_workr.png";
  jobs: Array<Object> = [];
  showCard: Boolean = true;
  arquivo;
  referencia;
  imagemPath;

  match = {
    vagaId: '',
    vagaTitle: '',
    vagaCargo: '',
    candidatoId: '',
    candidatoNome: '',
    empresa: '',
    status: '',
  }

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private provider: UsersProvider, private toast: ToastController, public global: GlobalProvider) {
    this.referencia = firebase.storage().ref();
  }

  no_click () {
    console.log("no_click fired");
    // var target = event.target || event.srcElement || event.currentTarget;
    // var idAttr = target.attributes.id;
    // var value = idAttr.nodeValue;
    // console.log(value);
    this.jobs.pop();
    console.log("jobs",this.jobs[this.jobs.length-1]);
    console.log("jobs",this.jobs);
  }

  yes_click () {
    console.log("yes_click fired");
    if (this.jobs.length > 0) {
      this.userId = this.afAuth.auth.currentUser.uid;
      this.userNome = this.afAuth.auth.currentUser.displayName;
      this.match.vagaId = this.jobs[this.jobs.length-1]["vagaId"];
      this.match.vagaTitle = this.jobs[this.jobs.length-1]["title"];
      this.match.vagaCargo = this.jobs[this.jobs.length-1]["cargo"];
      this.match.candidatoId = this.userId;
      this.match.candidatoNome = this.userNome;
      this.match.empresa = this.jobs[this.jobs.length-1]["empresa"];
      this.match.status = "H";
      // console.log(this.match);

      this.provider.saveMatch(this.match)
      .then(() => {
      })
      .catch((e) => {
        this.toast.create({ message: 'Ocorreu um erro.', duration: 3000}).present();
        console.error(e);
      })

      this.jobs.pop();
    }
  }
  
  animateMe(i) {
    // this.state = (this.state === 'small' ? 'large' : 'small');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncVagasPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FuncVagasPage');
    console.log(this.global._vagaFiltro);

    var parent = this;
    parent.jobs = [];
    if (this.global._vagaFiltro == 'Todos') {
      var ref = this.db.database.ref("vagas/").once("value")
        .then(function(snapshot) {
          var obj = [];
          var keys = [];
          obj.push(snapshot.val()); 
          // console.log(obj);
          obj.forEach(element => {
            // console.log(element);
            keys = Object.keys(element);
            keys.forEach((value, index) => {
              parent.title = element[value].title;
              parent.empresa = element[value].empresa;
              parent.cargo = element[value].cargo;
              parent.salario = element[value].salario;
              parent.desc = element[value].description;

              if (element[value].imagem != '') {
                let caminho = parent.referencia.child('imagens/' + value + '/' + element[value].imagem);
                caminho.getDownloadURL().then(url => {
                  // this.imagemPath = url;
                  // console.log("url");
                  console.log(url); // AQUI VOCÊ JÁ TEM O ARQUIVO
                  parent.jobs.forEach(function (vaga) {
                    console.log(vaga["vagaId"]);
                    if (vaga["vagaId"] == value) {
                      vaga["image"] = url;
                    }
                  });
                });
              }

              parent.jobs.push({vagaId: value, title: parent.title, empresa: parent.empresa, 
                cargo: parent.cargo, salario: parent.salario, desc: parent.desc, image: parent.imagem});
            })
            // console.log(element["-LBEHim-1JcaPfrpU0F4"].title);
          });
          // console.log(parent.title);
          // console.log(parent.desc);
          console.log(parent.jobs);
      });
    } else {
      var ref2 = this.db.database.ref("vagas/").orderByChild('area').equalTo(this.global._vagaFiltro).once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        // console.log(obj);
        obj.forEach(element => {
          // console.log(element);
          keys = Object.keys(element);
          keys.forEach((value, index) => {
            parent.title = element[value].title;
            parent.empresa = element[value].empresa;
            parent.cargo = element[value].cargo;
            parent.salario = element[value].salario;
            parent.desc = element[value].description;

            if (element[value].imagem != '') {
              let caminho = parent.referencia.child('imagens/' + value + '/' + element[value].imagem );
                caminho.getDownloadURL().then(url => {
                    // this.imagemPath = url;
                    // console.log("url");
                    // console.log(url); // AQUI VOCÊ JÁ TEM O ARQUIVO
                    parent.jobs.forEach(function(vaga){
                      console.log(vaga["vagaId"]);
                      if (vaga["vagaId"] == value) {
                        vaga["image"] = url;
                      }
                    });
                });
            }

            parent.jobs.push({vagaId: value, title: parent.title, empresa: parent.empresa, 
              cargo: parent.cargo, salario: parent.salario, desc: parent.desc, image: parent.imagem});
          })
          // console.log(element["-LBEHim-1JcaPfrpU0F4"].title);
        });
        // console.log(parent.title);
        // console.log(parent.desc);
        console.log(parent.jobs);
      });
    }
  }

}

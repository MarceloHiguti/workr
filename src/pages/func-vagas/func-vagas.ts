import { Component, trigger, state, animate, transition, style, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup } from '@angular/forms';
import { GlobalProvider } from "../../providers/global/global";
import firebase from 'firebase';
import { VagaDetailPage } from '../vaga-detail/vaga-detail';
import anime from 'animejs';
import 'hammerjs';
import 'hammer-timejs';

@IonicPage()
@Component({
  selector: 'page-func-vagas',
  templateUrl: 'func-vagas.html'
})
export class FuncVagasPage {

  disabled: boolean = false;
  userId: string;
  userNome: string;
  title: String;
  empresa: String;
  empresaName: String;
  cargo: String;
  salario: String;
  desc: String;
  bairro: String;
  area: String;
  imagem =  "assets/imgs/vaga_default.png";
  allJobs: Array<Object> = [];
  jobs: Array<Object> = [];
  arquivo;
  referencia;
  imagemPath;

  match = {
    vaga: {
      vagaId: '',
      vagaTitle: '',
      vagaCargo: ''
    },
    candidato: {
      candidatoId: '',
      nome: '',
      idade: '',
      formacao: '',
      nivelAcademico: '',
      nivelIngles: '',
    },
    empresa: '',
    empresaName: '',
    status: ''
  }

  funcionario = {
    nome: '',
    idade: '',
    formacao: '',
    nivelAcademico: '',
    nivelIngles: ''
  }

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private provider: UsersProvider, private toast: ToastController, public global: GlobalProvider) {
    this.referencia = firebase.storage().ref();
    console.log("funcVagasPage constructor fired");
    this.userId = afAuth.auth.currentUser.uid;
    var parent = this;
    parent.allJobs = [];
    var usersRef = this.db.database.ref("users/" + this.userId).once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        console.log(obj);
        if (obj[0] != null) {
          obj.forEach(element => {
            parent.funcionario.nome = element.name;
            parent.funcionario.idade = element.idade;
            parent.funcionario.formacao = element.formacao;
            parent.funcionario.nivelAcademico = element.nivelAcademico;
            parent.funcionario.nivelIngles = element.nivelIngles;
          });
        }
        var ref = parent.db.database.ref("vagas/").once("value")
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
              parent.empresaName = element[value].empresaName;
              parent.cargo = element[value].cargo;
              parent.salario = element[value].salario;
              parent.desc = element[value].description;
              parent.bairro = element[value].bairro;
              parent.area = element[value].area;

              if (element[value].imagem != '') {
                let caminho = parent.referencia.child('imagens/' + value + '/' + element[value].imagem);
                caminho.getDownloadURL().then(url => {
                  // this.imagemPath = url;
                  // console.log("url");
                  console.log(url); // AQUI VOCÊ JÁ TEM O ARQUIVO
                  parent.allJobs.forEach(function (vaga) {
                    console.log(vaga["vagaId"]);
                    if (vaga["vagaId"] == value) {
                      vaga["image"] = url;
                    }
                  });
                });
              }

              parent.allJobs.push({
                vagaId: value, title: parent.title, empresa: parent.empresa, empresaName: parent.empresaName, bairro: parent.bairro, 
                candidatoNome: parent.funcionario.nome, candidatoIdade: parent.funcionario.idade, candidatoFormacao: parent.funcionario.formacao, candidatoNivelAcademico: parent.funcionario.nivelAcademico, candidatoNivelIngles: parent.funcionario.nivelIngles,
                cargo: parent.cargo, salario: parent.salario, desc: parent.desc, area: parent.area, image: parent.imagem});
            })
            // console.log(element["-LBEHim-1JcaPfrpU0F4"].title);
          });
          // console.log(parent.title);
          // console.log(parent.desc);
          console.log(parent.allJobs);
          parent.jobs = parent.allJobs.slice();
      });
    });

    
  }

  no_click () {
    console.log("no_click fired");
    var parent = this;
    parent.disabled = true;
    var index = parent.jobs.length-1;
    // var target = event.target || event.srcElement || event.currentTarget;
    // var idAttr = target.attributes.id;
    // var value = idAttr.nodeValue;
    var finishedPromise = anime({
      targets: '#card-' + index,
      translateX: -550,
      rotate: '-1turn',
      easing: 'easeInOutQuad'
    });
    
    var promise = finishedPromise.finished.then(logFinished);
    // console.log(value);
    function logFinished() {
      parent.jobs.pop();
      parent.disabled = false;
      console.log("jobs",parent.jobs[parent.jobs.length-1]);
      console.log("jobs",parent.jobs);
    } 
  }

  yes_click () {
    console.log("yes_click fired");
    var parent = this;
    parent.disabled = true;
    if (this.jobs.length > 0) {
      this.userId = this.afAuth.auth.currentUser.uid;
      this.match.vaga.vagaId = this.jobs[this.jobs.length-1]["vagaId"];
      this.match.vaga.vagaTitle = this.jobs[this.jobs.length-1]["title"];
      this.match.vaga.vagaCargo = this.jobs[this.jobs.length-1]["cargo"];
      this.match.candidato.candidatoId = this.userId;
      this.match.candidato.nome = this.jobs[this.jobs.length-1]["candidatoNome"];
      this.match.candidato.idade = this.jobs[this.jobs.length-1]["candidatoIdade"];
      this.match.candidato.formacao = this.jobs[this.jobs.length-1]["candidatoFormacao"];
      this.match.candidato.formacao = this.jobs[this.jobs.length - 1]["candidatoFormacao"];
      this.match.candidato.nivelAcademico = this.jobs[this.jobs.length-1]["candidatoNivelAcademico"];
      this.match.candidato.nivelIngles = this.jobs[this.jobs.length-1]["candidatoNivelIngles"];
      this.match.empresa = this.jobs[this.jobs.length-1]["empresa"];
      this.match.empresaName = this.jobs[this.jobs.length-1]["empresaName"];
      this.match.status = "H";
      // console.log(this.match);

      this.provider.saveMatch(this.match)
      .then(() => {
      })
      .catch((e) => {
        this.toast.create({ message: 'Ocorreu um erro.', duration: 3000}).present();
        console.error(e);
      })

      var index = parent.jobs.length-1;
      var finishedPromise = anime({
        targets: '#card-' + index,
        translateX: 550,
        rotate: '1turn',
        easing: 'easeInOutQuad'
      });
      
      var animateFinished = function() {
        parent.jobs.pop();
        parent.disabled = false;
        console.log("jobs",parent.jobs[parent.jobs.length-1]);
        console.log("jobs",parent.jobs);
      } 
      var promise = finishedPromise.finished.then(animateFinished);
      // console.log(value);
    }
  }

  myswiperight(e) {
    console.log(e);
    this.yes_click();
  }

  myswipeleft(e) {
    console.log(e);
    this.no_click();
  }

  vagaDetail(vagaId) {
    this.navCtrl.push(VagaDetailPage, {
      id: vagaId
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncVagasPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FuncVagasPage');
    console.log(this.global._vagaFiltro);
    var parent = this;
    if (this.global._vagaFiltro != '') {
      this.jobs = [];
      if (this.global._vagaFiltro == 'Todos') {
        this.jobs = this.allJobs.slice();
      } else {
        this.allJobs.forEach(function(element){
          if (element["area"] == parent.global._vagaFiltro) {
            parent.jobs.push(element);
          }
        })
      }
    }
    console.log("this.jobs length", this.jobs.length);
    console.log("this.allJobs length", this.allJobs.length);
  }

}

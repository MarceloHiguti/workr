import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsersProvider } from '../../providers/users/users';
import { VagaCandidatoDetailPage } from '../vaga-candidato-detail/vaga-candidato-detail';
import { GlobalProvider } from "../../providers/global/global";
import anime from 'animejs';
import 'hammerjs';
import 'hammer-timejs';

@IonicPage()
@Component({
  selector: 'page-empresa-candidato',
  templateUrl: 'empresa-candidato.html',
})
export class EmpresaCandidatoPage {
  matchId: string;
  status: string;
  empresa: string;
  allMatches: Array<Object> = [];
  matches: Array<Object> = [];

  vaga = {
    vagaId: "",
    vagaCargo: "",
    vagaTitle: ""
  };

  candidato = {
    candidatoId: "",
    nome: "",
    idade: "",
    formacao: "",
    nivelAcademico: "",
    nivelIngles: ""
  };

  match = {
    key: "",
    status: "",
    feedback: {
      motivo:  "",
      observacao: ""
    }
  };

  constructor(private afAuth: AngularFireAuth, public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private provider: UsersProvider, private toast: ToastController) { 
    var user = this.afAuth.auth.currentUser;
    // this.empresa = user.displayName;
    this.empresa = this.global._displayName;
    console.log("this.empresa");
    console.log(this.empresa);
    var parent = this;
    var matchesRef = this.db.database.ref("matches/").orderByChild('empresa').equalTo(this.empresa).once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        // console.log(obj);
        if (obj[0] != null) {
          obj.forEach(element => {
            // console.log("element");
            // console.log(element);
            keys = Object.keys(element);
            keys.forEach((value, index) => {
              parent.matchId = value;
              parent.candidato.candidatoId = element[value].candidato.candidatoId;
              parent.vaga.vagaId = element[value].vaga.vagaId;
              parent.status = element[value].status;
              parent.candidato.nome = element[value].candidato.nome;
              parent.candidato.idade = element[value].candidato.idade;
              parent.candidato.formacao = element[value].candidato.formacao;
              parent.candidato.nivelAcademico = element[value].candidato.nivelAcademico;
              parent.candidato.nivelIngles = element[value].candidato.nivelIngles;
              parent.vaga.vagaTitle = element[value].vaga.vagaTitle;
              parent.vaga.vagaCargo = element[value].vaga.vagaCargo;


              if (parent.status != 'Y' && parent.status != 'N') {
                parent.allMatches.push({matchId: parent.matchId, candidatoId: parent.candidato.candidatoId, vagaId: parent.vaga.vagaId, status: parent.status,
                  candidatoNome: parent.candidato.nome, candidatoIdade: parent.candidato.idade, candidatoFormacao: parent.candidato.formacao, candidatoNivel: parent.candidato.nivelAcademico, candidadtoIngles: parent.candidato.nivelIngles, 
                  vagaTitle: parent.vaga.vagaTitle, vagaCargo: parent.vaga.vagaCargo});
              }
            })
          });
        }
        parent.matches = parent.allMatches.slice();
        console.log("parent.matches");
        console.log(parent.allMatches);
    });
  }

  no_click () {
    console.log("no_click fired");
    var parent = this;
    if (this.matches.length > 0) {
      this.match["key"] = this.matches[this.matches.length-1]["matchId"];
      this.match["status"] = "N";
      this.match.feedback.motivo = this.global._feedbackMotivo;
      this.match.feedback.observacao = this.global._feedbackObservacao;
      console.log("matches",this.matches[this.matches.length-1]);
      console.log("matches",this.matches);

      this.provider.updateMatch(this.match)
      .then(() => {
        this.global._feedbackMotivo = 'nenhum';
        this.global._feedbackObservacao = '';
      })
      .catch((e) => {
        this.toast.create({ message: 'Ocorreu um erro.', duration: 3000}).present();
        console.error(e);
        this.global._feedbackMotivo = 'nenhum';
        this.global._feedbackObservacao = '';
      })
    }

    var index = parent.matches.length-1;
    var finishedPromise = anime({
      targets: '#card-candidate-' + index,
      translateX: -550,
      rotate: '-1turn',
      easing: 'easeInOutQuad'
    });
    
    var promise = finishedPromise.finished.then(logFinished);
    // console.log(value);
    function logFinished() {
      parent.matches.pop();
      console.log("matches",parent.matches[parent.matches.length-1]);
      console.log("matches",parent.matches);
    } 
  }

  yes_click () {
    console.log("yes_click fired");
    var parent = this;
    if (this.matches.length > 0) {
      this.match["key"] = this.matches[this.matches.length-1]["matchId"];
      this.match["status"] = "Y";
      this.match.feedback.motivo = this.global._feedbackMotivo;
      this.match.feedback.observacao = this.global._feedbackObservacao;
      console.log("matches",this.matches[this.matches.length-1]);
      console.log("matches",this.matches);

      this.provider.updateMatch(this.match)
      .then(() => {
        this.global._feedbackMotivo = 'nenhum';
        this.global._feedbackObservacao = '';
      })
      .catch((e) => {
        this.toast.create({ message: 'Ocorreu um erro.', duration: 3000}).present();
        console.error(e);
        this.global._feedbackMotivo = 'nenhum';
        this.global._feedbackObservacao = '';
      })

      var index = parent.matches.length-1;
      var finishedPromise = anime({
        targets: '#card-candidate-' + index,
        translateX: 550,
        rotate: '1turn',
        easing: 'easeInOutQuad'
      });
      
      var animateFinished = function() {
        parent.matches.pop();
        console.log("matches",parent.matches[parent.matches.length-1]);
        console.log("matches",parent.matches);
      } 
      var promise = finishedPromise.finished.then(animateFinished);
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

  ionViewDidEnter() {
    console.log('ionViewDidEnter EmpresaCandidatoPage');
    // console.log(this.global._candidatoNivel);
    // console.log(this.global._candidatoIngles);
    var parent = this;
    this.matches = [];
    this.allMatches.forEach(function(element) {
      if (element["status"] != 'Y' && element["status"] != 'N') {
        if(parseInt(element["candidatoNivel"]) >= parseInt(parent.global._candidatoNivel)) {
          if(parseInt(element["candidadtoIngles"]) >= parseInt(parent.global._candidatoIngles)) {
            parent.matches.push(element);
          }
        }
      }
    });
  }

  candidatoDetail(candidatoId) {
    this.navCtrl.push(VagaCandidatoDetailPage,
    {
      candidatoId: candidatoId
    });
  }
}

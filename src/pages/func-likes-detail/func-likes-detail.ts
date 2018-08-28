import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ChatEmpresaCandidatoPage } from '../chat-empresa-candidato/chat-empresa-candidato';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-func-likes-detail',
  templateUrl: 'func-likes-detail.html',
})
export class FuncLikesDetailPage {

  feedback: string;
  feedbackObs: string;
  matchId: string;
  status: string;
  vagaId: string;
  vaga = {
    imagem: '',
    empresa: '',
    title: '',
    description: '',
    area: '',
    cargo: '',
    salario: ''
  };
  arquivo;
  referencia;
  imagemPath;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.referencia = firebase.storage().ref();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FuncLikesDetailPage');
    console.log(this.navParams.get('id'));
    this.matchId = this.navParams.get('id');
    var parent = this;
    var matchesRef = this.db.database.ref("matches/" + this.matchId).once("value")
      .then(function(snapshot) {
        var obj = [];
        obj.push(snapshot.val()); 
        // console.log(obj);
        if (obj[0].feedback != undefined) {
          parent.feedback = obj[0].feedback.motivo;
          parent.feedbackObs = obj[0].feedback.observacao;
        }
        parent.status = obj[0].status;
        parent.vagaId = obj[0].vaga.vagaId;

        var ref = parent.db.database.ref("vagas/" + obj[0].vaga.vagaId).once("value")
        .then(function(snapshot) {
          var vagaObj = [];
          vagaObj.push(snapshot.val());
          console.log(vagaObj);
          if (vagaObj[0] != undefined) {
            parent.vaga.empresa = vagaObj[0].empresa;
            parent.vaga.title = vagaObj[0].title;
            parent.vaga.description = vagaObj[0].description;
            parent.vaga.area = vagaObj[0].area;
            parent.vaga.cargo = vagaObj[0].cargo;
            parent.vaga.salario = vagaObj[0].salario;

            if (vagaObj[0].imagem != '') {
              let caminho = parent.referencia.child('imagens/' + obj[0].vaga.vagaId + '/' + vagaObj[0].imagem );
              caminho.getDownloadURL().then(url => {
                  // this.imagemPath = url;
                  // console.log("url");
                  // console.log(url); // AQUI VOCÊ JÁ TEM O ARQUIVO
                  parent.vaga.imagem = url;
              });
            }
          }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncLikesDetailPage');
  }

  chatMatch() {
    this.navCtrl.push(ChatEmpresaCandidatoPage, {
      matchId: this.matchId 
    });
  }

}

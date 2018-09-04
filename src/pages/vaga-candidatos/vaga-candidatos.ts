import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from '../../providers/users/users';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { CandidatoAceitoDetailPage } from '../candidato-aceito-detail/candidato-aceito-detail';


@IonicPage()
@Component({
  selector: 'page-vaga-candidatos',
  templateUrl: 'vaga-candidatos.html',
})
export class VagaCandidatosPage {
  vagaId: string;
  users: any;
  candidato = {
    id: '',
    nome: '',
    idade: '',
    formacao: '',
    idioma: ''
  }
  status: string;
  matchId: string;
  arquivo;
  referencia;
  candidatos: Array<Object> = [];

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, private app: App, public navParams: NavParams, public db: AngularFireDatabase, private provider: UsersProvider, private toast: ToastController) {
    this.vagaId = navParams.get('vagaId');
    // console.log("vagaId: ", this.vagaId);
    this.referencia = firebase.storage().ref();
    var parent = this;
    var matchesRef = this.db.database.ref("matches/").orderByChild('vaga/vagaId').equalTo(this.vagaId).once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        // console.log(obj);
        if (obj[0] != null) {
          obj.forEach(element => {
            keys = Object.keys(element);
            // console.log(keys);
            keys.forEach((value, index) => {
              parent.candidato.id = element[value].candidato.candidatoId;
              parent.candidato.nome = element[value].candidato.nome;
              parent.status = element[value].status;
              if (parent.status == 'Y'){
                parent.matchId = value;
                parent.candidatos.push({id: parent.candidato.id, nome: parent.candidato.nome});
              }
            })
          });
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VagaCandidatosPage');
  }

  candidatoAceitoDetail(candidatoId) {
    this.navCtrl.push(CandidatoAceitoDetailPage, {
      candidatoId: candidatoId,
      matchId: this.matchId
    });
  }

}

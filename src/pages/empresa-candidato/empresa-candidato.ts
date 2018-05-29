import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsersProvider } from '../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-empresa-candidato',
  templateUrl: 'empresa-candidato.html',
})
export class EmpresaCandidatoPage {
  matchId: string;
  funcionarioId: string;
  vagaId: string;
  status: string;
  funcionarioNome: string;
  vagaTitle: string;
  vagaCargo: string;
  empresa: string;
  matches: Array<Object> = [];

  match: Object = {
    key: "",
    status: ""
  };

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private provider: UsersProvider, private toast: ToastController) {
    var user = this.afAuth.auth.currentUser;
    this.empresa = user.displayName;
    var parent = this;
    var matchesRef = this.db.database.ref("matches/").orderByChild('empresa').equalTo(this.empresa).once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        // console.log(obj);
        if (obj[0] != null) {
          obj.forEach(element => {
            keys = Object.keys(element);
            keys.forEach((value, index) => {
              parent.matchId = value;
              parent.funcionarioId = element[value].funcionarioId;
              parent.vagaId = element[value].vagaId;
              parent.status = element[value].status;
              parent.funcionarioNome = element[value].funcionarioNome;
              parent.vagaTitle = element[value].vagaTitle;
              parent.vagaCargo = element[value].vagaCargo;
              parent.matches.push({matchId: parent.matchId, funcionarioId: parent.funcionarioId, vagaId: parent.vagaId, status: parent.status,
                funcionarioNome: parent.funcionarioNome, 
                vagaTitle: parent.vagaTitle, vagaCargo: parent.vagaCargo});  
            })
          });
        }
        console.log("parent.matches");
        console.log(parent.matches);
    });
  }

  no_click () {
    console.log("no_click fired");
    if (this.matches.length > 0) {
      this.match["key"] = this.matches[this.matches.length-1]["matchId"];
      this.match["status"] = "N";
      console.log("matches",this.matches[this.matches.length-1]);
      console.log("matches",this.matches);

      this.provider.updateMatch(this.match)
      .then(() => {
      })
      .catch((e) => {
        this.toast.create({ message: 'Ocorreu um erro.', duration: 3000}).present();
        console.error(e);
      })
    }

    this.matches.pop();
  }

  yes_click () {
    console.log("yes_click fired");
    if (this.matches.length > 0) {
      this.match["key"] = this.matches[this.matches.length-1]["matchId"];
      this.match["status"] = "Y";
      console.log("matches",this.matches[this.matches.length-1]);
      console.log("matches",this.matches);

      this.provider.updateMatch(this.match)
      .then(() => {
      })
      .catch((e) => {
        this.toast.create({ message: 'Ocorreu um erro.', duration: 3000}).present();
        console.error(e);
      })

      this.matches.pop();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpresaCandidatoPage');
  }
}

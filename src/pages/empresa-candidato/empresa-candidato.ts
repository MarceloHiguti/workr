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
  status: string;
  empresa: string;
  name: string;
  jobStatus: string;
  matches: Array<Object> = [];
  candidates: Array<Object> = [];

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
              parent.status = element[value].status;
              parent.matches.push({matchId: parent.matchId, funcionarioId: parent.funcionarioId, status: parent.status});
            })
          });
        }
        // console.log("parent.matches");
        // console.log(parent.matches);
        
        parent.matches.forEach(function(match){
          // console.log(match);
          var jobsRef = parent.db.database.ref("users/").orderByKey().equalTo(match["funcionarioId"]).once("value")
          .then(function(snapshot) {
            var obj = [];
            var keys = [];
            obj.push(snapshot.val()); 
            // console.log(obj);
            obj.forEach(element => {
              // console.log(element);
              keys = Object.keys(element);
              // console.log("keys");
              // console.log(keys);
              keys.forEach((value, index) => {
                // console.log(value);
                parent.name = element[value].name;
                parent.jobStatus = match["status"];
                parent.matchId = match["matchId"];
                parent.candidates.push({name: parent.name, matchId: parent.matchId, status: parent.jobStatus});
              })
            });
            console.log("parent.candidates");
            console.log(parent.candidates);
          });
        });
    });
  }

  no_click () {
    console.log("no_click fired");
    if (this.candidates.length > 0) {
      this.match["key"] = this.candidates[this.candidates.length-1]["matchId"];
      this.match["status"] = "N";
      console.log("candidates",this.candidates[this.candidates.length-1]);
      console.log("candidates",this.candidates);

      this.provider.updateMatch(this.match)
      .then(() => {
      })
      .catch((e) => {
        this.toast.create({ message: 'Ocorreu um erro.', duration: 3000}).present();
        console.error(e);
      })
    }

    this.candidates.pop();
  }

  yes_click () {
    console.log("yes_click fired");
    if (this.candidates.length > 0) {
      this.match["key"] = this.candidates[this.candidates.length-1]["matchId"];
      this.match["status"] = "Y";
      console.log("candidates",this.candidates[this.candidates.length-1]);
      console.log("candidates",this.candidates);

      this.provider.updateMatch(this.match)
      .then(() => {
      })
      .catch((e) => {
        this.toast.create({ message: 'Ocorreu um erro.', duration: 3000}).present();
        console.error(e);
      })

      this.candidates.pop();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpresaCandidatoPage');
  }

}

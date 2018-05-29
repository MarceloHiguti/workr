import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsersProvider } from '../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-func-likes',
  templateUrl: 'func-likes.html',
})
export class FuncLikesPage {

  funcionarioId: string;
  vagaId: string;
  status: string;
  jobStatus: string;
  title: string;
  empresa: string;
  matches: Array<Object> = [];
  jobs: Array<Object> = [];

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private provider: UsersProvider, private toast: ToastController) {
    console.log("constructor FuncLikesPage");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncLikesPage');
  }
  
  ionViewDidEnter() {
    console.log('ionViewDidEnter FuncLikesPage');
    this.funcionarioId = this.afAuth.auth.currentUser.uid;
    var parent = this;
    parent.matches = [];
    parent.jobs = [];
    var matchesRef = this.db.database.ref("matches/").orderByChild('funcionarioId').equalTo(this.funcionarioId).once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        // console.log(obj);
        if (obj[0] != null) {
          obj.forEach(element => {
            keys = Object.keys(element);
            keys.forEach((value, index) => {
              parent.vagaId = element[value].vagaId;
              parent.status = element[value].status;
              parent.matches.push({vagaId: parent.vagaId, status: parent.status});
            })
          });
        }
        console.log("parent.matches");
        console.log(parent.matches);
        
        parent.matches.forEach(function(match){
          // console.log(match);
          var jobsRef = parent.db.database.ref("vagas/").orderByKey().equalTo(match["vagaId"]).once("value")
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
                parent.jobStatus = match["status"];
                parent.jobs.push({title: parent.title, empresa: parent.empresa, status: parent.jobStatus});
              })
            });
            console.log("parent.jobs");
            console.log(parent.jobs);
          });
        });
    });
  }

  deletarVagas() {
    this.provider.removeMatches();
  }
}

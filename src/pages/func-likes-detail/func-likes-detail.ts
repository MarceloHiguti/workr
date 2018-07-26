import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-func-likes-detail',
  templateUrl: 'func-likes-detail.html',
})
export class FuncLikesDetailPage {

  feedback: string;
  feedbackObs: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase,) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FuncLikesDetailPage');
    console.log(this.navParams.get('id'));
    var parent = this;
    var matchesRef = this.db.database.ref("matches/" + this.navParams.get('id')).once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        console.log(obj);
        if (obj[0] != null) {
          parent.feedback = obj[0].feedback;
          parent.feedbackObs = obj[0].feedbackObs;
          // parent.matches.push({vagaId: parent.vagaId, status: parent.status});
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncLikesDetailPage');
  }

}

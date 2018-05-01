import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-func-vagas',
  templateUrl: 'func-vagas.html',
})
export class FuncVagasPage {

  title: String;
  desc: String;

  jobs: Object[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public users: UsersProvider) {
    // this.jobs = [
    //   {
    //     title: "titulo 1",
    //     desc: "desc 1"
    //   }, 
    //   {
    //     title: "titulo 2",
    //     desc: "desc 2"
    //   }, 
    //   {
    //     title: "titulo 3",
    //     desc: "desc 3"
    //   }, 
    // ]
    var parent = this;
    var ref = this.db.database.ref("vagas/").once("value")
      .then(function(snapshot) {
        var obj = [];
        obj.push(snapshot.val()); 
        // console.log(obj);
        obj.forEach(element => {
          // console.log(element);
          // console.log(element["-LBEHim-1JcaPfrpU0F4"].title);
          parent.title = element["-LBEHim-1JcaPfrpU0F4"].title;
          parent.desc = element["-LBEHim-1JcaPfrpU0F4"].description;
        });
        console.log(parent.title);
        console.log(parent.desc);
        parent.jobs = [{title: parent.title, desc: parent.desc}];
        console.log(parent.jobs);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncVagasPage');
  }

}

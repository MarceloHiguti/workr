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
  jobs: Array<Object> = [];

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
    //   }
    // ]
    // this.jobs.push( {
    //   title: "titulo 1",
    //   desc: "desc 1"
    // });
    // console.log(this.jobs);

    var parent = this;
    var ref = this.db.database.ref("vagas/").once("value")
      .then(function(snapshot) {
        var obj = [];
        var keys = [];
        obj.push(snapshot.val()); 
        // console.log(obj);
        obj.forEach(element => {
          // console.log(element);
          keys = Object.keys(element);
          keys.forEach(value => {
            parent.title = element[value].title;
            parent.desc = element[value].description;
            parent.jobs.push({title: parent.title, desc: parent.desc});
          })
          // console.log(element["-LBEHim-1JcaPfrpU0F4"].title);
        });
        // console.log(parent.title);
        // console.log(parent.desc);
        console.log(parent.jobs);
    });
  }

  log (a) {
    console.log("log fired");
    console.log(a);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncVagasPage');
  }

}

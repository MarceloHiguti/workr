import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-vaga-detail',
  templateUrl: 'vaga-detail.html',
})
export class VagaDetailPage {

  // imagem = "assets/imgs/vaga_default.png";
  vagaId: string;
  vaga = {
    imagem: "assets/imgs/vaga_default.png",
    empresa: '',
    title: '',
    description: '',
    area: '',
    cargo: '',
    salario: ''
  };
  referencia;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.referencia = firebase.storage().ref();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter VagaDetailPage');
    this.vagaId = this.navParams.get('id');
    console.log(this.navParams.get('id'));
    var parent = this;
    var ref = parent.db.database.ref("vagas/" + this.vagaId).once("value")
      .then(function (snapshot) {
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
            let caminho = parent.referencia.child('imagens/' + parent.vagaId + '/' + vagaObj[0].imagem);
            caminho.getDownloadURL().then(url => {
              // this.imagemPath = url;
              // console.log("url");
              // console.log(url); // AQUI VOCÊ JÁ TEM O ARQUIVO
              parent.vaga.imagem = url;
            });
          }
        }
      });
  }

}

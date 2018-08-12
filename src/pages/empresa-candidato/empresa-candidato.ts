import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsersProvider } from '../../providers/users/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VagaCandidatoDetailPage } from '../vaga-candidato-detail/vaga-candidato-detail';

@IonicPage()
@Component({
  selector: 'page-empresa-candidato',
  templateUrl: 'empresa-candidato.html',
})
export class EmpresaCandidatoPage {
  matchId: string;
  candidatoId: string;
  vagaId: string;
  status: string;
  candidatoNome: string;
  vagaTitle: string;
  vagaCargo: string;
  empresa: string;
  matches: Array<Object> = [];

  match: Object = {
    key: "",
    status: "",
    feedback: "",
    feedbackObs: ""
  };

  form: FormGroup;
  feedbackPicker: string;
  feedbackPickerSelected: string;
  feedback: any;

  constructor(private afAuth: AngularFireAuth, private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private provider: UsersProvider, private toast: ToastController) {
    
    this.feedbackPickerSelected = 'nenhum';
    this.feedback = this.navParams.data.feedback || {};
    this.createForm();
    
    var user = this.afAuth.auth.currentUser;
    this.empresa = user.displayName;
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
            keys = Object.keys(element);
            keys.forEach((value, index) => {
              parent.matchId = value;
              parent.candidatoId = element[value].candidatoId;
              parent.vagaId = element[value].vagaId;
              parent.status = element[value].status;
              parent.candidatoNome = element[value].candidatoNome;
              parent.vagaTitle = element[value].vagaTitle;
              parent.vagaCargo = element[value].vagaCargo;
              parent.matches.push({matchId: parent.matchId, candidatoId: parent.candidatoId, vagaId: parent.vagaId, status: parent.status,
                candidatoNome: parent.candidatoNome, 
                vagaTitle: parent.vagaTitle, vagaCargo: parent.vagaCargo});  
            })
          });
        }
        console.log("parent.matches");
        console.log(parent.matches);
    });
  }

  createForm () {
    this.form = this.formBuilder.group({
      feedbackPicker: this.feedbackPickerSelected,
      feedbackText: this.feedback.feedbackText
    })
  }

  pickerChange () {
    console.log(this.feedbackPicker);
    this.feedbackPickerSelected = this.feedbackPicker;
  }

  no_click () {
    console.log("no_click fired");
    if (this.matches.length > 0) {
      this.match["key"] = this.matches[this.matches.length-1]["matchId"];
      this.match["status"] = "N";
      this.match["feedback"] = this.feedbackPickerSelected;
      this.match["feedbackObs"] = this.form.value.feedbackText;
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

  candidatoDetail(candidatoId) {
    this.navCtrl.push(VagaCandidatoDetailPage,
    {
      candidatoId: candidatoId
    });
  }
}

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
  status: string;
  empresa: string;
  matches: Array<Object> = [];

  vaga = {
    vagaId: "",
    vagaCargo: "",
    vagaTitle: ""
  };

  candidato = {
    candidatoId: "",
    candidatoNome: ""
  };

  match = {
    key: "",
    status: "",
    feedback: {
      motivo:  "",
      observacao: ""
    }
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
              parent.candidato.candidatoId = element[value].candidato.candidatoId;
              parent.vaga.vagaId = element[value].vaga.vagaId;
              parent.status = element[value].status;
              parent.candidato.candidatoNome = element[value].candidato.candidatoNome;
              parent.vaga.vagaTitle = element[value].vaga.vagaTitle;
              parent.vaga.vagaCargo = element[value].vaga.vagaCargo;
              parent.matches.push({matchId: parent.matchId, candidatoId: parent.candidato.candidatoId, vagaId: parent.vaga.vagaId, status: parent.status,
                candidatoNome: parent.candidato.candidatoNome, 
                vagaTitle: parent.vaga.vagaTitle, vagaCargo: parent.vaga.vagaCargo});  
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
      this.match.feedback.motivo = this.feedbackPickerSelected;
      this.match.feedback.observacao = this.form.value.feedbackText;
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
      this.match.feedback.motivo = this.feedbackPickerSelected;
      this.match.feedback.observacao = this.form.value.feedbackText;
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

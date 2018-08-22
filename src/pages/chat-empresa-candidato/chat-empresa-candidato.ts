import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsersProvider } from '../../providers/users/users';
import { AngularFireAuth } from 'angularfire2/auth';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-chat-empresa-candidato',
  templateUrl: 'chat-empresa-candidato.html',
})
export class ChatEmpresaCandidatoPage {

  chats: Array<Object> = [];
  data;
  subs;
  messages;
  mensagem;
  username;
  textValue;
  chatTextArea;

  // @ViewChild('chatTextArea') msgInput: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private afAuth:AngularFireAuth, private provider: UsersProvider, private toast: ToastController, public element:ElementRef) {
    this.username = this.afAuth.auth.currentUser.displayName;
    this.db.list('chats/111').valueChanges().subscribe( data => {
      this.messages = data;
      console.log(data);
    });
    console.log(this.username);
  }

  sendMessage() {
    // let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0].value;
    // console.log(this.chatTextArea);

    let data = moment().format('YYYY-MM-DD HH:mm:ss');
    this.mensagem = {
      date: data,
      id: "111",
      username: this.username,
      message: this.chatTextArea
    };

    this.provider.saveMessage(this.mensagem)
      .then(() => {
        this.chatTextArea = '';
      })
      .catch((e) => {
        this.toast.create({ message: 'Ocorreu um erro.', duration: 3000}).present();
        console.error(e);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatEmpresaCandidatoPage');
  }

}

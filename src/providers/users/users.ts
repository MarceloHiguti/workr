import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UsersProvider {
  private PATH = 'users/';
  private pathVagas = 'vagas/';
  private pathMatch = 'matches/';
  private pathChats = 'chats/';

  constructor(private db: AngularFireDatabase) {
  }

  getAll(collection) {
    // return this.db.list(this.PATH, ref => ref.orderByChild('name'))
    return this.db.list(collection)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }
  
  selectFirebase (collection, key) {
    var ref = this.db.database.ref(collection + "/");
    ref.once("value")
      .then(function(snapshot) {
        var obj = snapshot.val(); 
        console.log(obj);
        return obj;

        // var node = snapshot.val();
        // var user = snapshot.child(key).val();
        // var name = snapshot.child(key + "/name").val();
        // var type = snapshot.child(key).child("type").val()
        // var age = snapshot.child("age").val();
        // console.log(node);
        // console.log(user);
        // console.log(name);
        // console.log(type);
        // console.log(age);
      });
  }
  
  existNode (collection, key) {
    this.db.database.ref(collection + "/" + key).once("value")
      .then(function(snapshot) {
        return snapshot.exists();
      });
  }
  
  // Método para pesquisar por uma coluna
  // get (key: string ){
  //   return this.db.list(this.PATH, ref => ref.orderByChild('name').equalTo(key))
  //     .snapshotChanges()
  //     .map (Changes => {
  //       return Changes.map(p => ({
  //         key: p.payload.key, ...p.payload.val()
  //       }));
  //     })
  // } 

  saveFuncionario(user: any) {
    return new Promise((resolve, reject) => {
      console.log("user");
      console.log(user);
      if (user.key) {
        this.db.list(this.PATH)
          .update(user.key, {  type: user.tipo, name: user.nome, idade: user.idade, celular: user.celular, email: user.email, formacao: user.formacao, idioma: user.idioma, nivelAcademico: user.nivelAcademico, nivelIngles: user.nivelIngles, curriculo: user.curriculo })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ name: user.nome, idade: user.idade, celular: user.celular, email: user.email, formacao: user.formacao, idioma: user.idioma, nivelAcademico: user.nivelAcademico, nivelIngles: user.nivelIngles, curriculo: user.curriculo })
          .then(() => resolve());
      }
    })
  }

  saveEmpresa(user: any) {
    return new Promise((resolve, reject) => {
      if (user.key) {
        this.db.list(this.PATH)
          .update(user.key, { type: user.tipo, name: user.nome, email: user.email, endereco: user.endereco, desc: user.desc, imagem: user.imagem })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ type: user.tipo, name: user.nome, email: user.email, endereco: user.endereco, desc: user.desc, imagem: user.imagem })
          .then(() => resolve());
      }
    })
  }

  saveVaga(user: any) {
    return new Promise((resolve, reject) => {
      if (user.key) {
        this.db.list(this.pathVagas)
          .update(user.key, { title: user.title, empresa: user.empresa, cargo: user.cargo, area: user.area, salario: user.salario, description: user.description, imagem: user.imagem })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.pathVagas)
          .push({ title: user.title, empresa: user.empresa, cargo: user.cargo, area: user.area, salario: user.salario, description: user.description, imagem: user.imagem })
          .then(() => resolve());
      }
    })
  }

  saveMatch(match: any) {
    return new Promise((resolve, reject) => {
      this.db.list(this.pathMatch)
        .push({
          vaga: {
              vagaId: match.vaga.vagaId, 
              vagaTitle: match.vaga.vagaTitle, 
              vagaCargo: match.vaga.vagaCargo
          },
          candidato: {
              candidatoId: match.candidato.candidatoId, 
              nome: match.candidato.nome,
              idade: match.candidato.idade,
              formacao: match.candidato.formacao,
              nivelAcademico: match.candidato.nivelAcademico,
              nivelIngles: match.candidato.nivelIngles
          },
          empresa: match.empresa, 
          status: match.status 
      })
        .then(() => resolve());
    })
  }

  saveMessage(mensagem: any) {
    return new Promise((resolve, reject) => {
      this.db.list(this.pathChats + "/" + mensagem.id)
        .update(mensagem.date, {
          username: mensagem.username, 
          message: mensagem.message
      })
        .then(() => resolve());
    })
  }

  updateMatch(match: any) {
    return new Promise((resolve, reject) => {
      this.db.list(this.pathMatch)
        .update(match.key, { status: match.status, feedback: { motivo: match.feedback.motivo, observacao: match.feedback.observacao}})
        .then(() => resolve())
        .catch((e) => reject(e));
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

  removeMatches() {
    return this.db.list(this.pathMatch).remove();
  }
}

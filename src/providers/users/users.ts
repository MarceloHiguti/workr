import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UsersProvider {
  private PATH = 'users/';
  private pathVagas = 'vagas/';
  private pathMatch = 'matches/';

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

  save(user: any) {
    return new Promise((resolve, reject) => {
      if (user.key) {
        this.db.list(this.PATH)
          .update(user.key, { name: user.name, type: user.type })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ name: user.name, type: user.type })
          .then(() => resolve());
      }
    })
  }

  saveVaga(user: any) {
    return new Promise((resolve, reject) => {
      if (user.key) {
        this.db.list(this.pathVagas)
          .update(user.key, { title: user.title, empresa: user.empresa, cargo: user.cargo, salario: user.salario, description: user.description })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.pathVagas)
          .push({ title: user.title, empresa: user.empresa, cargo: user.cargo, salario: user.salario, description: user.description })
          .then(() => resolve());
      }
    })
  }

  saveMatch(user: any) {
    return new Promise((resolve, reject) => {
      this.db.list(this.pathMatch)
        .push({ vagaId: user.vagaId, funcionarioId: user.funcionarioId, empresa: user.empresa, status: user.status })
        .then(() => resolve());
    })
  }

  updateMatch(user: any) {
    return new Promise((resolve, reject) => {
      this.db.list(this.pathMatch)
        .update(user.key, { status: user.status })
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

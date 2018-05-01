import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LoggedInPage } from '../pages/logged-in/logged-in';
import { CardPage } from '../pages/card/card';
import { CardDetailPage } from '../pages/card-detail/card-detail';

import { SQLite } from '@ionic-native/sqlite';
import { UsersProvider } from '../providers/users/users';

import { EmpresaTabPage } from '../pages/empresa-tab/empresa-tab';
import { EmpresaTabVagasPage } from '../pages/empresa-tab-vagas/empresa-tab-vagas';
import { CadastrarVagaPage } from '../pages/cadastrar-vaga/cadastrar-vaga';
import { FuncVagasPage } from '../pages/func-vagas/func-vagas';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    LoggedInPage,
    CardPage,
    CardDetailPage,
    EmpresaTabPage,
    EmpresaTabVagasPage,
    CadastrarVagaPage,
    FuncVagasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDkw1K9aGON_qri0AY6Jk0bQHCS5Tyq7kg",
      authDomain: "workr-f8b0a.firebaseapp.com",
      databaseURL: "https://workr-f8b0a.firebaseio.com",
      projectId: "workr-f8b0a",
      storageBucket: "workr-f8b0a.appspot.com",
      messagingSenderId: "749224329835"
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    LoggedInPage,
    CardPage,
    CardDetailPage,
    EmpresaTabPage,
    EmpresaTabVagasPage,
    CadastrarVagaPage,
    FuncVagasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    UsersProvider
  ]
})
export class AppModule {}

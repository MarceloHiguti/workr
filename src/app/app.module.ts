import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuncLikesPage } from '../pages/func-likes/func-likes';
import { FuncionarioTabPage } from '../pages/funcionario-tab/funcionario-tab';
import { EmpresaCandidatoPage } from '../pages/empresa-candidato/empresa-candidato';
import { FuncLikesDetailPage } from '../pages/func-likes-detail/func-likes-detail';
import { FuncConfigPage } from '../pages/func-config/func-config';
import { RegisterEmpresaPage } from '../pages/register-empresa/register-empresa';
import { RegisterFuncionarioPage } from '../pages/register-funcionario/register-funcionario';
import { GlobalProvider } from '../providers/global/global';

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
    FuncVagasPage,
    FuncionarioTabPage,
    FuncLikesPage,
    EmpresaCandidatoPage,
    FuncLikesDetailPage,
    FuncConfigPage,
    RegisterEmpresaPage,
    RegisterFuncionarioPage
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
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule
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
    FuncVagasPage,
    FuncionarioTabPage,
    FuncLikesPage,
    EmpresaCandidatoPage,
    FuncLikesDetailPage,
    FuncConfigPage,
    RegisterEmpresaPage,
    RegisterFuncionarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileChooser,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    UsersProvider,
    GlobalProvider
  ]
})
export class AppModule {}

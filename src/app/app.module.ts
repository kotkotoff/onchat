import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { AuthGuard } from './guards/auth-guard.service';
import { FormsModule } from '@angular/forms';
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    TopNavbarComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'chat' }
    ])
  ],
  providers: [AuthService, UserService, AuthGuard, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

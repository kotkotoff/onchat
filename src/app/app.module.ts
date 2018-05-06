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
import { MainComponent } from './main/main.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { AuthGuard } from './guards/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AddPostComponent } from './add-post/add-post.component';
import { OpenPostComponent } from './open-post/open-post.component';
import { PostCardComponent } from './post-card/post-card.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    TopNavbarComponent,
    TimeAgoPipe,
    AddPostComponent,
    OpenPostComponent,
    PostCardComponent,
    ModalDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    InfiniteScrollModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: MainComponent, canActivate: [AuthGuard]},
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'main' }
    ])
  ],
  providers: [AuthService, UserService, AuthGuard, MessageService, NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [ModalDeleteComponent]
})
export class AppModule { }

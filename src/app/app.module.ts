import { CommentService } from './services/comment.service';
import { AddPostComponent } from './add-post/add-post.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../environments/environment';
import { FocusDirective } from './directives/focus.directive';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MessageService } from './services/message.service';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { NgModule } from '@angular/core';
import { OpenPostComponent } from './open-post/open-post.component';
import { PostCardComponent } from './post-card/post-card.component';
import { RouterModule } from '@angular/router';
import { TimeAgoPipe } from 'time-ago-pipe';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { UserService } from './services/user.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

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
    ModalDeleteComponent,
    FocusDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    InfiniteScrollModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: MainComponent, canActivate: [AuthGuard]},
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'main' }
    ])
  ],
  providers: [AuthService, UserService, AuthGuard, MessageService, CommentService],
  bootstrap: [AppComponent],
  entryComponents: [ModalDeleteComponent]
})
export class AppModule { }

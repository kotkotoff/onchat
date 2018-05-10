import { LinkParser } from './model/link-parser';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard.service';
import { CommentService } from './services/comment.service';
import { AddPostComponent } from './add-post/add-post.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../environments/environment';
import { FocusDirective } from './shared/focus.directive';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
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
import { LikesComponent } from './likes/likes.component';
import {HttpClientModule} from '@angular/common/http';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { LoaderImageDirective } from './shared/loader-image.directive';

@NgModule({
  declarations: [
    AppComponent,
    AddPostComponent,
    LoginComponent,
    MainComponent,
    TopNavbarComponent,
    TimeAgoPipe,
    OpenPostComponent,
    PostCardComponent,
    ModalDeleteComponent,
    FocusDirective,
    LikesComponent,
    LoaderImageDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    InfiniteScrollModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: MainComponent, canActivate: [AuthGuard]},
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'main' }
    ])
  ],
  providers: [AuthService, UserService, AuthGuard, MessageService, CommentService, LinkParser],
  bootstrap: [AppComponent],
  entryComponents: [ModalDeleteComponent]
})
export class AppModule { }

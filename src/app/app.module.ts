import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailsComponent } from './posts/post-details-component/post-details-component.component';
import { PostEditComponentComponent } from './posts/post-edit-component/post-edit-component.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SubscriptionsComponent,
    NotificationsComponent,
    ProfileComponent,
    ProfileEditComponent,
    ProfileDetailsComponent,
    PostsComponent,
    PostDetailsComponent,
    PostEditComponentComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
    }
],
bootstrap: [AppComponent]
})
export class AppModule { }

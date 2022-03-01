import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopularComponent } from './popular/popular.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { PopularListComponent } from './popular/popular-list/popular-list.component';
import { PopularDetailsComponent } from './popular/popular-details/popular-details.component';
import { PopularItemComponent } from './popular/popular-list/popular-item/popular-item.component';
import { PostEditComponent } from './popular/post-edit/post-edit.component';
import { PostStartComponent } from './popular/post-start/post-start.component';

@NgModule({
  declarations: [
    AppComponent,
    PopularComponent,
    SubscriptionsComponent,
    NotificationsComponent,
    ProfileComponent,
    PopularListComponent,
    PopularDetailsComponent,
    PopularItemComponent,
    PostEditComponent,
    PostStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

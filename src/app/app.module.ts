import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopularComponent } from './popular/popular.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { PopularListComponent } from './popular/popular-list/popular-list.component';
import { PopularDetailsComponent } from './popular/popular-details/popular-details.component';
import { PopularItemComponent } from './popular/popular-list/popular-item/popular-item.component';

@NgModule({
  declarations: [
    AppComponent,
    PopularComponent,
    SubscriptionsComponent,
    NotificationsComponent,
    ProfileComponent,
    PopularListComponent,
    PopularDetailsComponent,
    PopularItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

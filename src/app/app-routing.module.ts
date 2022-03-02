import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';
import { PopularDetailsComponent } from './popular/popular-details/popular-details.component';
import { PopularComponent } from './popular/popular.component';
import { PostEditComponent } from './popular/post-edit/post-edit.component';
import { PostStartComponent } from './popular/post-start/post-start.component';
import { ProfileComponent } from './profile/profile.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

const routes: Routes = [
  { path: '',  redirectTo: '/popular', pathMatch: 'full' },
  { path: 'popular', component: PopularComponent, children: [
    { path: '', component: PostStartComponent, pathMatch: 'full' },
    { path: ':id', component: PopularDetailsComponent },
    { path: ':id/edit', component: PostEditComponent },
  ] },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'new', component: PostEditComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

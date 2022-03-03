import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';
import { PopularDetailsComponent } from './popular/popular-details/popular-details.component';
import { PopularComponent } from './popular/popular.component';
import { PostEditComponent } from './popular/post-edit/post-edit.component';
import { PostStartComponent } from './popular/post-start/post-start.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
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
  { path: 'profiles', children: [
    { path: '', component: ProfileComponent, pathMatch: 'full'},
    { path: ':id', component: ProfileDetailsComponent },
    { path: ':id/edit', component: ProfileEditComponent },
  ]},
  { path: 'new', component: PostEditComponent },
  { path: 'login', component: ProfileEditComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

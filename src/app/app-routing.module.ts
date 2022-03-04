import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PostDetailsComponent } from './posts/post-details-component/post-details-component.component';
import { PostEditComponentComponent } from './posts/post-edit-component/post-edit-component.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

const routes: Routes = [
  { path: '',  redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', children: [
    { path: '', component: PostsComponent, pathMatch: 'full'},
    { path: ':id', component: PostDetailsComponent },
    { path: ':id/edit', component: PostEditComponentComponent },
  ]},

  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'profiles', children: [
    { path: '', component: ProfileComponent, pathMatch: 'full'},
    { path: ':id', component: ProfileDetailsComponent },
    { path: ':id/edit', component: ProfileEditComponent },
  ]},
  { path: 'new', component: PostEditComponentComponent },
  { path: 'login', component: ProfileEditComponent},
  { path: 'auth', component: AuthComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

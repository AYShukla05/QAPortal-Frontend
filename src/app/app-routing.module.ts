import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { PostEditComponentComponent } from './posts/post-edit-component/post-edit-component.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts',  pathMatch: 'full' },
  // Lazy loading posts
  { path: 'posts', loadChildren: () => import('./posts/post.module').then(m=>m.PostModule)},
  // Lazy loading Subscriptions
  { path: 'subscriptions', loadChildren: () => import('./subscriptions/subscriptions.module').then(m=>m.SubscriptionsModule)},
  // Lazy loading Notifications
  { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)},
  // Lazy loading Profiles
  { path: 'profiles', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
  { path: 'new', component: PostEditComponentComponent, canActivate:[AuthGuard] },
  { path: 'signup', component: ProfileEditComponent},
  { path: 'login', component: AuthComponent},
  { path: 'my-profile', component: ProfileDetailsComponent, canActivate:[AuthGuard]},
  { path: '**', redirectTo: '/posts'}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

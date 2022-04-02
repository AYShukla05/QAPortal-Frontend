import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { PostEditComponentComponent } from './posts/post-edit-component/post-edit-component.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { VerificationPendingComponent } from './verification-pending/verification-pending.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts',  pathMatch: 'full' },
  // Lazy loading posts
  { path: 'posts', loadChildren: () => import('./posts/post.module').then(m=>m.PostModule)},
  // Lazy loading Subscriptions
  { path: 'subscriptions', loadChildren: () => import('./subscriptions/subscriptions.module').then(m=>m.SubscriptionsModule)},
  { path: 'subscribers', loadChildren: () => import('./subscribers/subscribers.module').then(m=>m.SubscribersModule)},

  // Lazy loading Notifications
  { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)},
  // Lazy loading Profiles
  { path: 'profiles', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
  { path: 'new', component: PostEditComponentComponent, canActivate:[AuthGuard] },
  { path: 'signup', component: ProfileEditComponent},
  { path: 'login', component: AuthComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password/:id', component: ResetPasswordComponent},
  { path: 'my-profile', component: ProfileDetailsComponent, canActivate:[AuthGuard]},
  { path: 'search', component: SearchResultComponent},
  { path: 'verify', component: VerificationPendingComponent},
  { path: 'verifying/:id/:token', component: VerificationPendingComponent},
  { path: '**', redirectTo: '/posts'}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

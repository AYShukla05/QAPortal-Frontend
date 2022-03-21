import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { ProfileDetailsComponent } from "./profile-details/profile-details.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { ProfileComponent } from "./profile.component";

const routes: Routes = [
    { path: '', children: [
        { path: '', component: ProfileComponent, pathMatch: 'full'},
        { path: ':id', component: ProfileDetailsComponent },
        { path: ':id/edit', component: ProfileEditComponent, canActivate:[AuthGuard] },
      ]},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ProfileRoutingModule{

}
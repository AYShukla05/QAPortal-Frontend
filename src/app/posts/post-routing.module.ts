import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { PostDetailsComponent } from "./post-details-component/post-details-component.component";
import { PostEditComponentComponent } from "./post-edit-component/post-edit-component.component";
import { PostsComponent } from "./posts.component";

const routes:Routes = [
    { path: '', children: [
        { path: '', component: PostsComponent, pathMatch: 'full'},
        { path: ':id', component: PostDetailsComponent },
        { path: ':id/edit', component: PostEditComponentComponent, canActivate:[AuthGuard] },
      ]},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PostRoutingModule{

}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { ModalModule } from "../modal/modal.module";

import { PostDetailsComponent } from "./post-details-component/post-details-component.component";
import { PostEditComponentComponent } from "./post-edit-component/post-edit-component.component";
import { PostRoutingModule } from "./post-routing.module";
import { PostsComponent } from "./posts.component";

@NgModule({
    declarations: [
    PostsComponent,
    PostDetailsComponent,
    PostEditComponentComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        PostRoutingModule,
        ModalModule
    ]
})
export class PostModule{}
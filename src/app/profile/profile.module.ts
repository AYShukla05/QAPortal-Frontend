import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {  FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { ModalModule } from "../modal";
import { ProfileDetailsComponent } from "./profile-details/profile-details.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileEditComponent,
        ProfileDetailsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        ProfileRoutingModule,
        ModalModule
    ]
})
export class ProfileModule{
    
}
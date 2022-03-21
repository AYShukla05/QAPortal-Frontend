import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { AuthGuard } from "../auth/auth.guard";
import { NotificationsComponent } from "./notifications.component";

@NgModule({
    declarations: [
        NotificationsComponent,

    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        RouterModule,
        RouterModule.forChild(
            [
            {path: '', component: NotificationsComponent, canActivate:[AuthGuard] }
        ]
        )    
    ]
})
export class NotificationsModule{

}
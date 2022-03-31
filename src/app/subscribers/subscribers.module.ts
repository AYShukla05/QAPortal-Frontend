import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { AuthGuard } from "../auth/auth.guard";
import { SubscribersComponent } from "./subscribers.component";

@NgModule({
    declarations: [
        SubscribersComponent,

    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        RouterModule.forChild(
            [
                {path: '', component: SubscribersComponent, canActivate:[AuthGuard] }
            ]
            
            )    
    ]
})
export class SubscribersModule{

}
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { AuthGuard } from "../auth/auth.guard";
import { SubscriptionsComponent } from "./subscriptions.component";

@NgModule({
    declarations: [
        SubscriptionsComponent,

    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        RouterModule.forChild(
            [
                {path: '', component: SubscriptionsComponent, canActivate:[AuthGuard] }
            ]
            
            )    
    ]
})
export class SubscriptionsModule{

}
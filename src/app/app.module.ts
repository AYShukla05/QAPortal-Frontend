import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth.interceptor';
import { ModalModule } from './modal';
import { HeaderComponent } from './header/header.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { VerificationPendingComponent } from './verification-pending/verification-pending.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    SearchResultComponent,
    VerificationPendingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule,
    HttpClientModule,
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
    }
],
bootstrap: [AppComponent]
})
export class AppModule { }

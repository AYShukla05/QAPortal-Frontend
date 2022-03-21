import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{
    isAuth: boolean = false;
    constructor(private authService: AuthService,private router: Router){}
    
    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
      ):| boolean
      | UrlTree
      | Promise<boolean | UrlTree>
      | Observable<boolean | UrlTree> {
          this.isAuth = this.authService.isLoggedIn
          console.log(this.isAuth)
          if(this.isAuth){
              return true
          }
          this.authService.isLoggedIn = false
          return this.router.createUrlTree(['login'])
      }
    
    }
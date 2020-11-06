import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree > {
        return this.authService.user.pipe(
            take(1), // make sure it just take the latest version and unsubscribe to avoid race conditions
            map(user => {
                const isAuth = !!user; // return true or false depending if the user is null or not
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            }),
            // tap(isAuth => {
            //     if (!isAuth) {
            //         this.router.navigate(['/auth']);
            //     }
            // })
        );        
    }
}
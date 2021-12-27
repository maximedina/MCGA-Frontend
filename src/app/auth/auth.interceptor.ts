import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/internal/operators/tap"; // call tap exactly this way, otherwise it will conflict with Observable.
import { SecurityService } from "../services/security.service";

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private securityService: SecurityService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Interceptado");
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("user") !== null
    ) {
      const cloneReq = req.clone({
        headers: req.headers.set("sessionToken", localStorage.getItem("token")),
      });
      return next.handle(cloneReq).pipe(
        tap(
          (succ) => {},
          (err) => {
            if (err.status === 401) {
              console.log("redireccion auth.interceptor");
              this.router.navigate(["/login"]);
              this.securityService.logout();
            }
          }
        )
      );
    } else {
      return next.handle(req.clone());
    }
  }
}

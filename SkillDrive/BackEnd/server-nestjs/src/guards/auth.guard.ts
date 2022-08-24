import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { IncomingHttpHeaders } from "http";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    type AuthRequest = Request & { authorization: string };
    
    const reqHeader: AuthRequest = context.switchToHttp().getRequest().headers;
    
    console.log(reqHeader.authorization);
    return true;
  }
}
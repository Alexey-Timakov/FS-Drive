import { validateAccessToken } from "@/services/validate.token";
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    type AuthRequest = Request & { authorization: string };

    const reqHeader: AuthRequest = context.switchToHttp().getRequest().headers;
    const authHeader: string = reqHeader.authorization;
    if (!authHeader) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    const accessToken: string = authHeader.split(" ")[1];
    if (!accessToken) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    const result = validateAccessToken(accessToken);
    if (result) {
      return true
    } else {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  }
}
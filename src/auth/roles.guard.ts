import { Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import { Reflector} from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<Role[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return this.matchRoles(roles, user);
    }

    matchRoles(roles: string[], user: any): boolean {
        const userRoles = user.roles;
        return userRoles.some(role => roles.includes(role));
    }
}
    // canActivate(context: ExecutionContext): boolean {
    //     const roles = this.reflector.get<string[]>('roles', context.getHandler());
    //     if (!roles) {
    //         return true;
    //     }
    //     const request = context.switchToHttp().getRequest();
    //     const user = request.user;
    //     return this.matchRoles(roles, user);
    // }
    //
    // matchRoles(roles: string[], user: any): boolean {
    //     const userRoles = user.roles;
    //     return userRoles.some(role => roles.includes(role));
    // }
}

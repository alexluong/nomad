import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserModel } from '../../user/interfaces/user.model';

@Guard()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(req, context: ExecutionContext): boolean {
        const {parent, handler} = context;
        const roles = this.reflector.get<string[]>('roles', handler);
        if (!roles) {
            return true;
        }

        const user = req.user as UserModel;
        const hasRole = () => !!roles.find(role => user.role.toString() === role);

        return user && hasRole();
    }
}
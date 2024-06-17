import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/roles.enum';


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext) {
        /* Verificar se a rota possui um decorator aplicado */
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }
        /* Verifica o usuário */
        const { user } = context.switchToHttp().getRequest();

        const rolesFiltered = requiredRoles.some((role: number) => role <= user.role);

        return rolesFiltered;


    }

}
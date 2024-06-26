import {CanActivate,Injectable,ExecutionContext} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    )  {}

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();
        const  {authorization} = request.headers;
        try {
            const data = await this.authService.checkToken((authorization ?? '').split(' ')[1]);
            request.tokenPayload = data;
            request.user = await this.userService.findOne(data.id);
            return true;

        } catch (e) {
            return false;
        }
    }

}
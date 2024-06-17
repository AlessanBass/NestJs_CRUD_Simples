import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, isEnum } from "class-validator";
import { Role } from "src/enums/roles.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 6,
        minLowercase:1,
        minSymbols:1,
        minNumbers:1,
        minUppercase:1
    })
    senha: string;

    //@IsOptional()
    @IsEnum(Role)
    role: number;
}

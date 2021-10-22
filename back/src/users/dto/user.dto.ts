import { IsEmail,IsNotEmpty } from "class-validator";

export class UserDto {
    readonly id: number;

    @IsNotEmpty()
    readonly type: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;
}

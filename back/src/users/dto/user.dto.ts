import { IsEmail,IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    type: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    birthday: Date;
}

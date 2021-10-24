import { IsEmail,IsNotEmpty } from "class-validator";

export class UserDto {
    readonly id: number;
    readonly username: string;

    @IsNotEmpty()
    readonly type: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}

export class TeacherDto {
    @IsNotEmpty()
    readonly studentId: number;

    @IsNotEmpty()
    readonly teacherId: number;
}
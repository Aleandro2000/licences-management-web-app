export class UserDto {
    readonly id: number;
    readonly username: string;
    readonly type: string;
    readonly email: string;
    readonly password: string;
}

export class TeacherDto {
    readonly studentId: number;
    readonly teacherId: number;
}
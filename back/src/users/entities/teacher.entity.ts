import { IsEmail,IsNotEmpty } from "class-validator";
import { Department } from "src/department/entities/department.entity";
import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,OneToMany } from "typeorm";
import { Student } from "./student.entity";

@Entity()
export class Teacher extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    @IsNotEmpty()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column({default: false})
    isAdmin: boolean;

    @OneToMany(() => Student, student => student.teacher)
    student: Student;

    @OneToMany(() => Department, department => department.teacher)
    department: Department;
}
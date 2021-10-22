import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,OneToMany,ManyToOne } from "typeorm";
import { IsEmail,IsNotEmpty } from "class-validator";

@Entity()
export class Teacher extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    birthday: Date;

    @Column({default: false})
    isAdmin: boolean;

    @ManyToOne(() => Student, student => student.teacher)
    student: Student[];
}

@Entity()
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    birthday: Date;

    @OneToMany(() => Teacher, teacher => teacher.student)
    teacher: Teacher;
}

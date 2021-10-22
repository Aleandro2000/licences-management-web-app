import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,OneToMany,ManyToOne } from "typeorm";

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

    @OneToMany(() => Teacher, teacher => teacher.student)
    teacher: Teacher;
}
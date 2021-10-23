import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,OneToMany,ManyToOne } from "typeorm";
import { University } from "../../universities/entities/university.entity";

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

    @ManyToOne(() => Teacher, teacher => teacher.student)
    teacher: Teacher[];
    
    @ManyToOne(() => University, university => university.student)
    university: University[];
}

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

    @OneToMany(() => Student, student => student.teacher)
    student: Student;
    
    @ManyToOne(() => University, university => university.student)
    university: University[];
}
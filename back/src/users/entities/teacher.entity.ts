import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,OneToMany } from "typeorm";
import { University } from "../../universities/entities/university.entity";
import { Student } from "./student.entity";

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

    @Column({default: false})
    isAdmin: boolean;

    @OneToMany(() => Student, student => student.teacher)
    student: Student;
    
    @OneToMany(() => University, university => university.student)
    university: University;
}
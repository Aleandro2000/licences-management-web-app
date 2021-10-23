import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,OneToMany,ManyToOne } from "typeorm";
import { Student,Teacher } from "../../users/entities/user.entity"

@Entity()
export class University extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Student, student => student.university)
    student: Student;

    @OneToMany(() => Teacher, teacher => teacher.university)
    teacher: Teacher;
}
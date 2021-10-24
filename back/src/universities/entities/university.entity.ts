import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,OneToMany,ManyToOne,JoinColumn } from "typeorm";
import { Student } from "../../users/entities/student.entity";
import { Teacher } from "../../users/entities/teacher.entity";
import { Licence } from "../../licences/entities/licence.entity";

@Entity()
export class University extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Student, student => student.university)
    @JoinColumn({name: "studentId"})
    student: Student;
    studentId: number;

    @ManyToOne(() => Teacher, teacher => teacher.university)
    @JoinColumn({name: "teacherId"})
    teacher: Teacher;
    teacherId: number;

    @OneToMany(() => Licence, licence => licence.university)
    licence: Licence;
}
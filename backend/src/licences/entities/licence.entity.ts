import { IsNotEmpty } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { Student } from "../../users/entities/student.entity";
import { University } from "../../universities/entities/university.entity";

@Entity()
export class Licence extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    @IsNotEmpty()
    content: string;

    @Column()
    @IsNotEmpty()
    studentId: number;

    @Column()
    @IsNotEmpty()
    universityId: number;

    @ManyToOne(() => Student, student => student.licence)
    @JoinColumn({ name: "studentId" })
    student: Student;

    @ManyToOne(() => University, university => university.licence)
    @JoinColumn({ name: "universityId" })
    university: University;
}
import { IsNotEmpty } from "class-validator";
import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,ManyToOne,JoinColumn } from "typeorm";
import { Student } from "../../users/entities/student.entity";
import { University } from "../../universities/entities/university.entity";

@Entity()
export class Diploma extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    @IsNotEmpty()
    grade: number;
    
    @Column()
    @IsNotEmpty()
    studentId: number;
    
    @Column()
    @IsNotEmpty()
    universityId: number;

    @ManyToOne(() => Student, student => student.diploma)
    @JoinColumn({name: "studentId"})
    student: Student;

    @ManyToOne(() => University, university => university.diploma)
    @JoinColumn({name: "universityId"})
    university: University;
}
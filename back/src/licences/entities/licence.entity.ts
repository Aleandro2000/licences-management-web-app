import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,ManyToOne,JoinColumn } from "typeorm";
import { Student } from "../../users/entities/student.entity";
import { University } from "../../universities/entities/university.entity";

@Entity()
export class Licence extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    file: BinaryType;

    @ManyToOne(() => Student, student => student.licence)
    @JoinColumn({name: "studentId"})
    student: Student;
    studentId: number;

    @ManyToOne(() => University, university => university.licence)
    @JoinColumn({name: "universityId"})
    university: University;
    universityId: number;
}
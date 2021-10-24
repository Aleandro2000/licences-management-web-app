import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,ManyToOne,JoinColumn } from "typeorm";
import { Student } from "../../users/entities/student.entity";
import { University } from "../../universities/entities/university.entity";

@Entity()
export class Licence extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;
    
    @Column()
    studentId: number;
    
    @Column()
    universityId: number;

    @ManyToOne(() => Student, student => student.licence)
    @JoinColumn({name: "studentId"})
    student: Student;

    @ManyToOne(() => University, university => university.licence)
    @JoinColumn({name: "universityId"})
    university: University;
}
import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,OneToMany,ManyToOne,JoinColumn } from "typeorm";
import { Student } from "../../users/entities/student.entity";
import { Licence } from "../../licences/entities/licence.entity";

@Entity()
export class University extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    studentId: number;

    @ManyToOne(() => Student, student => student.university)
    @JoinColumn({name: "studentId"})
    student: Student;

    @OneToMany(() => Licence, licence => licence.university)
    licence: Licence;
}
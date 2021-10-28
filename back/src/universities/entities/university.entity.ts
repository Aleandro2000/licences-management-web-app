import { IsNotEmpty } from "class-validator";
import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,OneToMany,ManyToOne,JoinColumn } from "typeorm";
import { Student } from "../../users/entities/student.entity";
import { Licence } from "../../licences/entities/licence.entity";
import { Diploma } from "src/diploma/entities/diploma.entity";

@Entity()
export class University extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    studentId: number;

    @ManyToOne(() => Student, student => student.university)
    @JoinColumn({name: "studentId"})
    student: Student;

    @OneToMany(() => Licence, licence => licence.university)
    licence: Licence;

    @OneToMany(() => Diploma, diploma => diploma.university)
    diploma: Diploma;
}
import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,OneToMany,ManyToOne,JoinColumn } from "typeorm";
import { University } from "../../universities/entities/university.entity";
import { Licence } from "../../licences/entities/licence.entity";
import { Diploma } from "../../diploma/entities/diploma.entity";
import { Teacher } from "./teacher.entity";

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
    @JoinColumn({name: "teacherId"})
    teacher: Teacher;
    teacherId: number;
    
    @OneToMany(() => University, university => university.student)
    university: University;

    @OneToMany(() => Licence, licence => licence.university)
    licence: Licence;

    @OneToMany(() => Diploma, diploma => diploma.university)
    diploma: Diploma;
}
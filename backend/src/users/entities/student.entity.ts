import { IsEmail, IsNotEmpty } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { University } from "../../universities/entities/university.entity";
import { Licence } from "../../licences/entities/licence.entity";
import { Diploma } from "../../diploma/entities/diploma.entity";
import { Teacher } from "./teacher.entity";

@Entity()
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    @IsNotEmpty()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column({ default: null })
    teacherId: number;

    @ManyToOne(() => Teacher, teacher => teacher.student)
    @JoinColumn({ name: "teacherId" })
    teacher: Teacher;

    @OneToMany(() => University, university => university.student)
    university: University;

    @OneToMany(() => Licence, licence => licence.student)
    licence: Licence;

    @OneToMany(() => Diploma, diploma => diploma.student)
    diploma: Diploma;
}
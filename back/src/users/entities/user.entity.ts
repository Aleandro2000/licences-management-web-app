import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,OneToMany,ManyToOne } from "typeorm";
import { University } from "../../universities/entities/university.entity";
import { Licence } from "../../licences/entities/licence.entity";
import { Diploma } from "../../diploma/entities/diploma.entity";

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
    teacher: Teacher[];
    
    @OneToMany(() => University, university => university.student)
    university: University;

    @OneToMany(() => Licence, licence => licence.university)
    licence: Licence;

    @OneToMany(() => Diploma, diploma => diploma.university)
    diploma: Diploma;
}

@Entity()
export class Teacher extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    isAdmin: boolean;

    @OneToMany(() => Student, student => student.teacher)
    student: Student;
    
    @OneToMany(() => University, university => university.student)
    university: University;
}
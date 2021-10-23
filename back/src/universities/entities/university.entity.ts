import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,OneToMany,ManyToOne } from "typeorm";
import { Student,Teacher } from "../../users/entities/user.entity";
import { Licence } from "../../licences/entities/licence.entity";

@Entity()
export class University extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Student, student => student.university)
    student: Student[];

    @ManyToOne(() => Teacher, teacher => teacher.university)
    teacher: Teacher[];

    @OneToMany(() => Licence, licence => licence.university)
    licence: Licence;
}
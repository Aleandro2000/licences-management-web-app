import { Entity,Column,PrimaryGeneratedColumn,BaseEntity,OneToMany,ManyToOne } from "typeorm";
import { Student } from "../../users/entities/user.entity";
import { University } from "../../universities/entities/university.entity";

@Entity()
export class Diploma extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    file: BinaryType;

    @ManyToOne(() => Student, student => student.licence)
    student: Student[];

    @ManyToOne(() => University, university => university.licence)
    university: University[];
}
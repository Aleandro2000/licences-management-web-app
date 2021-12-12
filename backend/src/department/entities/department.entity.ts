import { IsNotEmpty } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm'
import { Teacher } from '../../users/entities/teacher.entity'

@Entity()
export class Department extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    teacherId: number;

    @ManyToOne(() => Teacher, teacher => teacher.department, {onDelete: "CASCADE"})
    @JoinColumn({ name: 'teacherId' })
    teacher: Teacher;
}

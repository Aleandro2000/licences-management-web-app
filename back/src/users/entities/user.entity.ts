import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Students {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    birth_date: Date;

    @Column({default: null})
    teacher_id: number;
}

@Entity()
export class Teachers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    birth_date: Date;
}
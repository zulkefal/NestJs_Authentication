import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: 'User ID',
        unsigned: true,
    })
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
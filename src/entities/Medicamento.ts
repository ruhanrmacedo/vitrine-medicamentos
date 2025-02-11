import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Medicamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nome: string;

    @Column({ nullable: true })
    descricao: string;

    @Column({ type: "int", nullable: false })
    quantidade: number;

    @ManyToOne(() => User, (user) => user.medicamentos)
    @JoinColumn({ name: "userId" })
    user: User;
}

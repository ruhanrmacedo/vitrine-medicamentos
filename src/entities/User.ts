import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, BeforeInsert } from "typeorm";
import bcrypt from "bcrypt";
import { Role } from "./Role";
import { Medicamento } from "./Medicamento";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column()
    senha: string;

    @BeforeInsert()
    async hashSenha() {
        this.senha = await bcrypt.hash(this.senha, 10);
    }

    @OneToMany(() => Medicamento, (medicamento) => medicamento.user)
    medicamentos: Medicamento[];

    @ManyToMany(() => Role, (role) => role.users, { eager: true })
    @JoinTable({ name: "user_roles", joinColumn: { name: "user_id" }, inverseJoinColumn: { name: "role_id" } })
    roles: Role[];
}

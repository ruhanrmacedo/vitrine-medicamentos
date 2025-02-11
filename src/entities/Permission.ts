import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

@Entity({ name: "permissions" })
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    description: string;

    @Column({ default: new Date() })
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    @ManyToMany(() => Role, (role) => role.permissions)
    @JoinTable({ name: "permission_role", joinColumn: { name: "permission_id" }, inverseJoinColumn: { name: "role_id" } })
    roles: Role[];
}

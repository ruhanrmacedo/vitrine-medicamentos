import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";

@Entity({ name: "roles" })
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    description: string;

    @Column({ default: new Date() })
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    @ManyToMany(() => User, (user) => user.roles)
    @JoinTable({ name: "user_roles", joinColumn: { name: "role_id" }, inverseJoinColumn: { name: "user_id" } })
    users: User[];

    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable({ name: "permission_role", joinColumn: { name: "role_id" }, inverseJoinColumn: { name: "permission_id" } })
    permissions: Permission[];
}

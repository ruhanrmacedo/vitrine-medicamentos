import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany,} from "typeorm";
import bcrypt from "bcrypt";
import { Medicamento } from "./Medicamento";
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number = 0;
  
    @Column()
    nome: string = "";
  
    @Column({ unique: true })
    email: string = "";
  
    @Column()
    senha: string = "";
  
    @BeforeInsert()
    async hashPassword() {
      this.senha = await bcrypt.hash(this.senha, 10);
    }

    @OneToMany(() => Medicamento, (medicamento) => medicamento.user)
    medicamentos!: Medicamento[];
  }
  
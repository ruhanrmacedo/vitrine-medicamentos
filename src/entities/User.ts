import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert,} from "typeorm";
import bcrypt from "bcrypt";
  
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
  }
  
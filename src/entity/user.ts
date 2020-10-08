import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    unique: true,
  })
  mobile: string;

  @Column({ type: "text" })
  firstname: string;

  @Column({ type: "text" })
  lastname: string;

  @Column({
    type: "text",
    nullable: true,
  })
  birthdate: string | null;

  @Column({
    type: "text",
    nullable: true,
  })
  gender: string | null;

  @Column({
    type: "text",
    unique: true,
  })
  email: string;
}

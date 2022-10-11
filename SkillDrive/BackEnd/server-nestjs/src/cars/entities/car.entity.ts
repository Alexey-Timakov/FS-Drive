import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class Cars {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  minimumPrice: number;

  @Column()
  categoryClass: string;

  @Column()
  primaryImageLink: string;

  @Column()
  user: string;
}
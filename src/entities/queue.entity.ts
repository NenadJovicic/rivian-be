import { Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Office } from './office.entity';
import { User } from './user.entity';

@Table({
  modelName: 'queue',
  tableName: 'queue',
  timestamps: true,
  createdAt: true,
  updatedAt: false,
})
export class Queue extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false, field: 'user_id', unique: true })
  userId: string;

  @ForeignKey(() => Office)
  @Column({ allowNull: false, field: 'office_id' })
  officeId: string;
}

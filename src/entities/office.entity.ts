import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ modelName: 'office', tableName: 'office' })
export class Office extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ type: DataType.STRING(150), allowNull: false })
  address: string;

  @Column({ type: DataType.INTEGER, allowNull: false, field: 'zip_code' })
  zipCode: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}

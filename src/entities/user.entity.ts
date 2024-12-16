import { Column, DataType, Default, DefaultScope, ForeignKey, Model, PrimaryKey, Scopes, Table } from 'sequelize-typescript';
import { Office } from './office.entity';

@Table({ modelName: 'user', tableName: 'user' })
@DefaultScope(() => {
  return {
    attributes: { exclude: ['password'] },
  };
})
@Scopes(() => ({
  login: {},
}))
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ type: DataType.STRING(50), allowNull: false, field: 'first_name' })
  firstName: string;

  @Column({ type: DataType.STRING(50), allowNull: false, field: 'last_name' })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ForeignKey(() => Office)
  @Column({ allowNull: false, field: 'default_office_id', type: DataType.UUID })
  defaultOfficeId: string;
}

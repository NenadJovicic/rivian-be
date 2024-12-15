import { Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Office } from './office.entity';

@Table({ modelName: 'charging_spot', tableName: 'charging_spot' })
export class ChargingSpot extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ type: DataType.STRING(10), allowNull: false, field: 'spot_name' })
  spotName: string;

  @ForeignKey(() => Office)
  @Column({ field: 'office_id', allowNull: false })
  officeId: string;
}

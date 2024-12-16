import { Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ChargingSession } from './charging-session.entity';
import { Office } from './office.entity';

@Table({ modelName: 'charging_spot', tableName: 'charging_spot', timestamps: false })
export class ChargingSpot extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ type: DataType.STRING(10), allowNull: false, field: 'spot_name' })
  spotName: string;

  @ForeignKey(() => Office)
  @Column({ field: 'office_id', allowNull: false, type: DataType.UUID })
  officeId: string;

  @HasMany(() => ChargingSession)
  chargingSessions: ChargingSession[];
}

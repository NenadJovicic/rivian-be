import {
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ChargingSpot } from './charging-spot.entity';
import { User } from './user.entity';

@Table({ modelName: 'charging_session', tableName: 'charging_session' })
export class ChargingSession extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false, field: 'user_id' })
  userId: string;

  @ForeignKey(() => ChargingSpot)
  @Column({ allowNull: false, field: 'spot_id' })
  spotId: string;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  startTime: number;

  @Column({ type: DataType.DATE, allowNull: true })
  /**
   * endTime is optional and should we written in DB after charging is done
   * Also, it is used for queries to see which sessions are in progress
   */
  endTime?: number;
}

import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Scopes, Table } from 'sequelize-typescript';
import { ChargingSpot } from './charging-spot.entity';
import { User } from './user.entity';

@Table({
  modelName: 'charging_session',
  tableName: 'charging_session',
  timestamps: false,
  indexes: [
    {
      name: 'active_charging_session',
      unique: true,
      fields: ['spot_id'],
      where: { end_time: null },
    },
  ],
})
@Scopes(() => {
  return {
    withSpot: {
      include: [{ model: ChargingSpot, as: 'spot' }],
    },
  };
})
export class ChargingSession extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false, field: 'user_id', type: DataType.UUID })
  userId: string;

  @ForeignKey(() => ChargingSpot)
  @Column({ allowNull: false, field: 'spot_id', type: DataType.UUID })
  spotId: string;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW, field: 'start_time' })
  startTime: Date;

  @Column({ type: DataType.DATE, allowNull: true, field: 'end_time' })
  /**
   * endTime is optional and should we written in DB after charging is done
   * Also, it is used for queries to see which sessions are in progress
   */
  endTime?: Date;

  @BelongsTo(() => ChargingSpot)
  spot?: ChargingSpot;
}

import {
  PrimaryColumn,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';
import moment from 'moment';

export const dateTransformer: ValueTransformer = {
  // set 方法
  to: (entityValue: string | undefined | Date): Date | undefined => {
    if (entityValue === undefined) {
      return entityValue as any;
    }
    if (typeof entityValue === 'string') {
      return new Date(entityValue);
    }
    return entityValue;
  },
  // get 方法
  from: (databaseValue: Date): string => {
    const date = moment(databaseValue);
    return date.isValid() ? date.format('YYYY-MM-DD HH:mm:ss') : '';
  },
};

export enum DeleteStatus {
  Normal = 0,
  Deleted = 1,
  RecycleBin = 2,
  AdminDeleted = 3,
}

export type IOrder = 'DESC' | 'ASC';

abstract class _BaseEntity {
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: [dateTransformer],
  })
  public createdAt!: string;

  @UpdateDateColumn({
    name: 'modify_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: [dateTransformer],
  })
  public updatedAt!: string;
  public deleted!: DeleteStatus;
}

export abstract class BaseEntity extends _BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    comment: '自增',
  })
  public id!: number;
}

export abstract class SnowflakeBaseEntity extends _BaseEntity {
  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    comment: '雪花 ID',
  })
  public id!: string;
}

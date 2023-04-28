import { Column, Entity, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SnowflakeBaseEntity } from './base';

@Entity('user')
export class UserEntity extends SnowflakeBaseEntity {
  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100 })
  nickname: string; //昵称

  // 查询时不选择此字段
  @Column({ select: false })
  password: string; // 密码

  @Column('simple-enum', { enum: ['root', 'normal'] })
  role: string; // 用户角色

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password);
  }
}

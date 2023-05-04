import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getYmlByKey } from './';

export const getTypeOrmModule = (entities: any[] = []) => {
  return TypeOrmModule.forRoot({
    ...getYmlByKey('db'),
    entities,
    // 驼峰 -> 下划线
    namingStrategy: new SnakeNamingStrategy(),
    dateStrings: true, // 将日期类型数据转化为字符串类型
  });
};

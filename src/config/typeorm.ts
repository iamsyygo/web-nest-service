import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getYmlByKey } from './';

export const getTypeOrmModule = (entities: any[] = []) => {
  return TypeOrmModule.forRoot({
    ...getYmlByKey('db'),
    entities,
    // 驼峰 -> 下划线
    namingStrategy: new SnakeNamingStrategy(),
  });
};

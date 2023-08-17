import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getYmlByKey } from './';

export const getTypeOrmModule = (entities: any[] = []) => {
  return TypeOrmModule.forRoot({
    ...getYmlByKey('db'),
    entities,
    // 驼峰转下划线
    namingStrategy: new SnakeNamingStrategy(),
    // 将日期类型转换为字符串类型返回
    dateStrings: true,
    // 重试次数
    retryAttempts: 5,
    // 程序关闭不会断开连接
    keepConnectionAlive: true,
    logger: 'file',
  });
};

import { MulterModule as _MulterModule } from '@nestjs/platform-express';
import { getYmlByKey } from './yaml';
export const MulterModule = _MulterModule.registerAsync({
  useFactory: () => ({
    dest: getYmlByKey('file').url || 'uploads', // 上传文件的目录
    // fileFilter: (req, file, cb) => {}, // 自定义生成文件名
  }),
});

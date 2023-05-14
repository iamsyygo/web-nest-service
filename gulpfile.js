/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const pkg = require('./package.json');
const SSH = require('gulp-ssh');

const config = {
  host: '20.24.199.5',
  port: 22,
  username: 'service_0910',
  password: 'service_20000910',
  localPath: './dist/**',
  remotePath: `/www`,
};

// 其他需要上传的
const restFiles = ['./package.json', './pnpm-lock.yaml', './dev.yaml'];

// 获取命令行参数
const argv = process.argv.slice(2);
const hasBuild = argv.includes('build');

// 创建SSH对象
const _SSH = new SSH({
  ignoreErrors: false, // 忽略错误继续执行
  sshConfig: config,
});

// 删除remote下的文件 - files: 文件路径数组
function handleDeleteRemote() {
  const remote = config.remotePath.replace(/\/+$/, '') + '/' + pkg.name;
  return (
    _SSH
      // 删除除 node_modules 以外的文件
      .shell([`cd ${remote}`, `rm -rf !(node_modules)`], {
        filePath: 'shell.log',
      })
      .pipe(gulp.dest('logs'))
  );
}

// 上传代码
function handleUploadBusiness() {
  const remote = config.remotePath.replace(/\/+$/, '') + '/' + pkg.name;
  const core = remote + '/core';
  return gulp.src(config.localPath).pipe(_SSH.dest(core)).pipe(gulp.dest('logs'));
}

// 上传依赖包文件
function handleUploadRelyOn() {
  const remote = config.remotePath.replace(/\/+$/, '') + '/' + pkg.name;
  return gulp.src(restFiles).pipe(_SSH.dest(remote)).pipe(gulp.dest('logs'));
}

// 组合 gulp 任务
const pushRemote = gulp.series(handleDeleteRemote, handleUploadBusiness, handleUploadRelyOn);

// 导出 gulp 任务
module.exports = {
  pushRemote,
};

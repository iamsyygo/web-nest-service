import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'dev.yaml';
const YAML_CONFIG_PATH = join(process.cwd(), YAML_CONFIG_FILENAME);

/**
 * 获取 yml 配置
 * @return {Record<string, any>} 配置
 */
export const getYml = () => {
  return yaml.load(readFileSync(YAML_CONFIG_PATH, 'utf8')) as Record<string, any>;
};

/**
 * 根据 key 获取 yml 配置
 * @param {string} key 配置 key
 * @return {any} 配置
 */
export const getYmlByKey = (key: string) => {
  return getYml()[key];
};

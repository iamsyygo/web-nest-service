// 分页

import { ApiProperty } from '@nestjs/swagger';
import { Repository, SelectQueryBuilder } from 'typeorm';
import * as dayjs from 'dayjs';

export class PaginateOptions {
  @ApiProperty({ description: '页码', default: 1 })
  page: number;
  @ApiProperty({ description: '页数', default: 10 })
  limit: number;
  fuzzy?: Record<string, any>;
  exact?: Record<string, any>;
  exclude?: string[];
  order?: Record<string, 'ASC' | 'DESC'>;
  timeRanges?: Record<string, string>; // 时间范围, 例如: { daterange: '2021-01-01,2021-01-02' }
  dates?: Record<string, string>; // 日期
}

/**
 * 模糊查询
 * @param {SelectQueryBuilder<T>} entity
 * @param {Record<string, any>} fuzzy
 * @returns {SelectQueryBuilder<T>}
 */
export const fuzzyQuery = <T>(entity: SelectQueryBuilder<T>, fuzzy: Record<string, any>) => {
  Object.keys(fuzzy).forEach((key) => {
    entity.andWhere(`q.${key} like :${key}`, { [key]: `%${fuzzy[key]}%` });
  });
  return entity;
};

/**
 * 精确查询
 * @param {SelectQueryBuilder<T>} entity
 * @param {Record<string, any>} exact
 * @returns {SelectQueryBuilder<T>}
 */
export const exactQuery = <T>(entity: SelectQueryBuilder<T>, exact: Record<string, any>) => {
  Object.keys(exact).forEach((key) => {
    entity.andWhere(`q.${key} = :${key}`, { [key]: exact[key] });
  });
  return entity;
};

/**
 * 排除查询
 * @param {SelectQueryBuilder<T>} entity
 * @param {string[]} exclude
 * @returns {SelectQueryBuilder<T>}
 */
export const excludeQuery = <T>(entity: SelectQueryBuilder<T>, exclude: string[]) => {
  exclude.forEach((key) => {
    entity.andWhere(`q.${key} != :${key}`, { [key]: exclude[key] });
  });
  return entity;
};

/**
 * 排序查询
 * @param {SelectQueryBuilder<T>} entity
 * @param {Record<string, 'ASC' | 'DESC'>} order
 * @returns {SelectQueryBuilder<T>}
 */
export const orderQuery = <T>(entity: SelectQueryBuilder<T>, order: PaginateOptions['order']) => {
  Object.keys(order).forEach((key) => {
    entity.orderBy(`q.${key}`, order[key]);
  });
  return entity;
};

/**
 * 分页查询
 * @param {SelectQueryBuilder<T>} entity
 * @param {number} page
 * @param {number} limit
 * @returns {SelectQueryBuilder<T>}
 */
export const pageQuery = <T>(entity: SelectQueryBuilder<T>, page: number, limit: number) => {
  entity.skip((page - 1) * limit).take(limit);
  return entity;
};

/**
 * 单个时间范围查询
 * @param {SelectQueryBuilder<T>} entity
 * @param {string} key
 * @param {string} start
 * @param {string} end
 * @param {string} format
 * @returns {SelectQueryBuilder<T>}
 */
export const timeRangeQuery = <T>(
  entity: SelectQueryBuilder<T>,
  key: string,
  start: string,
  end: string,
) => {
  console.log(start, end);
  entity.andWhere(`q.${key} between :start and :end`, {
    start,
    end,
  });
  return entity;
};

/**
 * 多个时间查询
 * @param {SelectQueryBuilder<T>} entity
 * @param {Record<string, string>} dates
 * @returns {SelectQueryBuilder<T>}
 */
export const datesQuery = <T>(entity: SelectQueryBuilder<T>, dates: Record<string, string>) => {
  Object.keys(dates).forEach((key) => {
    const date = dates[key];
    if (!date) return entity;
    const start = dayjs(date).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs(date).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    timeRangeQuery(entity, key, start, end);
  });
  return entity;
};

/**
 * 多个时间范围查询
 * @param {SelectQueryBuilder<T>} entity
 * @param {Record<string, [start: string, end: string]>} timeRange
 * @param {string} format
 * @returns {SelectQueryBuilder<T>}
 */
export const timeRangesQuery = <T>(
  entity: SelectQueryBuilder<T>,
  timeRange: PaginateOptions['timeRanges'],
) => {
  Object.keys(timeRange).forEach((key) => {
    const [start, end] = timeRange[key]?.split(',');
    start && end && timeRangeQuery(entity, key, start, end);
  });
  return entity;
};

/**
 * 分页查询
 * @param {Repository<T>} entity
 * @param {PaginateOptions} options
 * @returns {Promise<{ list: T[]; total: number; page: number; limit: number }>}
 */
export const paginate = async <T>(entity: Repository<T>, options: PaginateOptions) => {
  const { page = 1, limit = 10, exact, fuzzy, exclude, order, timeRanges, dates } = options;
  const q = entity.createQueryBuilder('q');
  fuzzy && fuzzyQuery(q, fuzzy);
  exact && exactQuery(q, exact);
  timeRanges && timeRangesQuery(q, timeRanges);
  dates && datesQuery(q, dates);
  order && orderQuery(q, order);
  exclude && excludeQuery(q, exclude);

  pageQuery(q, page, limit);
  const [list, total] = await q.getManyAndCount();
  return {
    list,
    meta: {
      total,
      page,
      limit,
    },
  };
};
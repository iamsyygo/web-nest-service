import { FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm';

export type IOrder<T> = Array<`${string & keyof T}:${'ASC' | 'DESC'}`>;

export interface FindAllOptions<T> {
  alias?: string;
  page?: number;
  pageSize?: number;
  // order?: IOrder<T>;
  where?: FindOptionsWhere<T>;
  condition?: FindAllCondition<T>;
}

export type IDateRanges<T> = Partial<Record<keyof T, [string, string] | string[]>>;

export interface FindDateRangesOptions<T> {
  alias: string;
  queryBuilder: SelectQueryBuilder<T>;
  dateRanges: IDateRanges<T>;
}

export interface FindOrderOptions<T> {
  alias: string;
  queryBuilder: SelectQueryBuilder<T>;
  order: IOrder<T>;
}

export interface FindLikesOptions<T> {
  alias: string;
  queryBuilder: SelectQueryBuilder<T>;
  likes: Partial<T>;
}

export interface FindAllCondition<T> {
  order?: IOrder<T>;
  dateRanges?: IDateRanges<T>;
  likes?: Partial<T>;
}

export interface PageResult<T> {
  data: T[];
  total: number;
  meta?: {
    page: number;
    pageSize: number;
    averagePage: number;
  };
}

/**
 * 检查是否一个实体与给定id存在于数据库中
 * @param {Repository<T>} repository - 存储库搜索实体
 * @param  {string} id - 条件
 * @returns {Promise<T | null>}
 */
export function isExistById<T>(repository: Repository<T>, id: string): Promise<T | null> {
  return repository.findOne({
    where: { id } as unknown as FindOptionsWhere<T>,
  });
}

/**
 * 检查是否一个实体与给定条件存在于数据库中
 * @param {Repository<T>} repository - 存储库搜索实体
 * @param  {Partial<T>} condition - 条件
 * @returns {Promise<T | null>}
 */
export function isExistByCondition<T>(
  repository: Repository<T>,
  condition: Partial<T>,
): Promise<T | null> {
  return repository.findOne({
    where: condition as unknown as FindOptionsWhere<T>,
  });
}

/**
 * 查询时间范围内的数据
 * @param {string} alias - 查询构建器de别名
 * @param {SelectQueryBuilder<T>} queryBuilder - 查询构建器
 * @param  {IDateRanges} dateRanges - 时间范围
 * @returns {Promise<T[]>}
 */
export function findDateRanges<T>(options: FindDateRangesOptions<T>): SelectQueryBuilder<T> {
  const { alias, queryBuilder, dateRanges } = options;
  const values = JSON.parse(JSON.stringify(dateRanges));

  const keys = Object.keys(values);
  if (keys.length === 0) return queryBuilder;

  const conditions = keys.map((key) => {
    const [start, end] = dateRanges[key];
    return `${alias}.${key} BETWEEN '${start}' AND '${end}'`;
  });

  return queryBuilder.andWhere(conditions.join(' AND '));
}

/**
 * 排序查询
 * @param {string} alias - 查询构建器de别名
 * @param {SelectQueryBuilder<T>} queryBuilder - 查询构建器
 * @param  {IOrder<T>} order - 排序
 * @returns {Promise<T[]>}
 */
export function findOrder<T>(options: FindOrderOptions<T>): SelectQueryBuilder<T> {
  const { alias, queryBuilder, order } = options;
  order.map((item) => {
    const [key, value] = item.split(':');
    queryBuilder.orderBy(`${alias}.${key}`, value.toLocaleUpperCase() as 'ASC' | 'DESC');
  });
  return queryBuilder;
}

/**
 * 模糊查询
 * @param {string} alias - 查询构建器de别名
 * @param {SelectQueryBuilder<T>} queryBuilder - 查询构建器
 * @param  {Partial<T>} likes - 模糊查询条件
 * @returns {Promise<T[]>}
 */
export function findLikes<T>(options: FindLikesOptions<T>): SelectQueryBuilder<T> {
  const { alias, queryBuilder, likes } = options;
  const conditions = Object.entries(JSON.parse(JSON.stringify(likes))).map(([key, value]) => {
    return `${alias}.${key} LIKE '%${value}%'`;
  });
  if (!conditions.length) return queryBuilder;
  return queryBuilder.andWhere(conditions.join(' AND '));
}

/**
 * 精确查询
 * @param {string} alias - 查询构建器de别名
 * @param {SelectQueryBuilder<T>} queryBuilder - 查询构建器
 * @param  {Partial<T>} exact - 精确查询条件
 * @returns {Promise<T[]>}
 */
export function findExact<T>(options: FindLikesOptions<T>): SelectQueryBuilder<T> {
  const { alias, queryBuilder, likes } = options;
  const conditions = Object.entries(JSON.parse(JSON.stringify(likes))).map(([key, value]) => {
    return `${alias}.${key} = '${value}'`;
  });
  return queryBuilder.andWhere(conditions.join(' AND '));
}

/**
 * 分页查询
 * @param {Repository<T>} repository - 存储库搜索实体
 * @param  {number} page - 页码
 * @param  {number} size - 每页条数
 * @param  {Partial<T>} condition - 条件
 * @param  {string} order - 排序
 * @returns {Promise<T[] | null>}
 */
export function findPage<T>(
  repository: Repository<T>,
  options: FindAllOptions<T>,
): Promise<PageResult<T>> {
  const { alias = 'q', page = 1, pageSize = 10, where, condition } = options;
  const queryBuilder = repository.createQueryBuilder(alias);
  if (where) {
    queryBuilder.andWhere(where);
  }
  const _condition = JSON.parse(JSON.stringify(condition));
  if (_condition) {
    const { order, dateRanges, likes } = _condition;
    order && findOrder({ alias, queryBuilder, order });
    dateRanges && findDateRanges({ alias, queryBuilder, dateRanges });
    likes && findLikes({ alias, queryBuilder, likes });
  }
  return findPagination(queryBuilder, page, pageSize);
}

/**
 * 简单分页查询
 * @param {SelectQueryBuilder<T>} queryBuilder - 查询构建器
 * @param  {number} page - 页码
 * @param  {number} pageSize - 每页条数
 * @param  {number} total - 总条数
 * @returns {Promise<T[]>}
 */
export async function findPagination<T>(
  queryBuilder: SelectQueryBuilder<T>,
  page: number,
  pageSize: number,
): Promise<PageResult<T>> {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const total = await queryBuilder.getCount();
  const averagePage = Math.ceil(total / pageSize);
  const data = await queryBuilder.skip(skip).take(take).getMany();
  return {
    data,
    total,
    meta: {
      page,
      pageSize,
      averagePage,
    },
  };
}

import * as dayjs from 'dayjs';

export const getDate = (format = 'YYYY-MM-DD') => dayjs().format(format);

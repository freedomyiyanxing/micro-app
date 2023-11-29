import request from '@/api';

export const getList = (params) => {
  return request({
    url: '/api/blade-system/device/list',
    method: 'get',
    params,
  });
};

/**
 * 全站http配置
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios';
import XEUtils from 'xe-utils';
import NProgress from 'nprogress';
import { Message } from 'element-ui';

const pendingRequest = new Map();

function generateReqKey(config) {
  const { method, url, params, data } = config;
  return [method, url, XEUtils.serialize(params), XEUtils.serialize(data)].join('&');
}

function addPendingRequest(config) {
  const requestKey = generateReqKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
}

function removePendingRequest(config) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancel = pendingRequest.get(requestKey);
    cancel(requestKey);
    pendingRequest.delete(requestKey);
  }
}

const instance = axios.create({
  timeout: 10000, // 设置超时时长 10秒
  // withCredentials: true, // 跨域请求，允许保存cookie
  validateStatus: (status) => status >= 200 && status <= 500, // 返回其他状态吗
});

NProgress.configure({
  showSpinner: true,
});

instance.interceptors.request.use(
  (request) => {
    NProgress.start();
    const meta = request.meta || Object.create(null);
    const isToken = meta.isToken === false;
    request.headers.Authorization = 'Basic c2FiZXI6c2FiZXJfc2VjcmV0';
    request.headers['Blade-Auth'] = `bearer eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMywxNCwxNiwyMCwyMiwyMywxMTEsMTE0LDExNSwxMTYsMTE3LDExOCIsInJvbGVfbmFtZSI6ImFkbWluaXN0cmF0b3Is6ZSA5ZSuLOmUgOWUruaAu-ebkSzplIDllK7nu4_nkIYs6LSi5Yqh57uP55CGLOmUgOWUruS4u-euoSzlupTmlLbkvJrorqEs5bqU5LuY5Lya6K6hLOW8gOelqOWRmCzmiqXlhbPkuJPlkZgs5Ye657qzLOi0ouWKoeWFqOWRmCIsInVzZXJfaWQiOiI4NSIsInJvbGVfaWQiOiIxLDgsMTAsMjMsNCwyMiwyNCwyNSwyNiwyNywzMiw1OCIsInVzZXJfbmFtZSI6IueOi-WNkyIsInJvbGVfY29kZSI6IkFETUlOLFNBTEVTX0RJUkVDVE9SLFNBTEVTX01BTkFHRVIsU0FMRVNfU1VQRVJWSVNPUixTQUxFLEZJTkFOQ0lBTF9NQU5BR0VSLEFSX0FDQ09VTlRBTlQsQVBfQUNDT1VOVEFOVCxEUkFXRVIsQ1VTVE9NU19TUEVDSUFMSVNULENBU0hJRVIsRklOQU5DSUFMX1NUQUZGIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsIm5ldHdvcmtfdHlwZSI6IjAiLCJhY2NvdW50Ijoid2FuZ3podW8iLCJjbGllbnRfaWQiOiJzYWJlciIsImV4cCI6MTcwMTc3MDMzOCwibmJmIjoxNzAxMTY1NTM4fQ.4U6oNVeqLG5fZ-dm4YgLwG5_H6IEIHQxgJjmiQnTj_E`;
    // const { token } = store.getters;
    // 根据环境添加请求头
    if (process.env.SHT_APP_ROUTE) {
      request.headers['X-Route-Label'] = process.env.SHT_APP_ROUTE;
    }
    // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
    // headers中配置serialize为true开启序列化
    if (request.method === 'post' && meta.isSerialize === true) {
      request.data = XEUtils.serialize(request.data);
    }
    // 移除请求参数中的 total;
    if (request.method === 'get' && request?.params) {
      if ('total' in request.params) {
        delete request.params.total;
      }
    }

    // 检查是否存在重复请求，若存在则取消已发的请求
    removePendingRequest(request);
    // 把当前请求添加到pendingRequest对象中
    addPendingRequest(request);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    NProgress.done();
    const message = `服务器异常: ${res.data.msg || '未知错误'}`;

    // 检查是否存在重复请求，若存在则取消已发的请求
    removePendingRequest(res.config);
    // 解决方式：如果res.data.code 有则取 res.data.code 否则取 res.status
    const status = res.data.code ? res.data.code : res.status;
    // 如果是401则跳转到登录页面
    if (status === 401) {
      const msg = '重定向到登录页面';
      // console.log('--->', msg);
      // store.dispatch('LogOut').then(() => router.push({ path: '/login' }));
      return Promise.reject(msg);
    }
    // 参数异常 && 客户端异常
    if (status >= 400 && status < 500) {
      Message.error(message);
      return Promise.reject(message);
    }

    // 服务端异常
    if (status >= 500) {
      Message.error(message);
      return Promise.reject(message);
    }
    // 正常处理
    return res;
  },
  (error) => {
    NProgress.done();
    removePendingRequest(error.config || Object.create(null));
    if (axios.isCancel(error)) {
      console.log(`已取消的重复请求：${error.message}`);
      Message({
        message: `已取消的重复请求：${error.message}`,
        type: 'warning',
      });
    } else {
      Message({
        message: '服务异常, 请联系管理员',
        type: 'error',
        duration: 3000,
      });
    }
    return Promise.reject(new Error(error));
  },
);

export default instance;

/**
 * 原生xhr
 * @param url
 * @return {Promise<unknown>}
 */
export const httpRequest = (url) =>
  new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.timeout = 5000;
      xhr.addEventListener('loadend', ({ currentTarget }) => {
        if (currentTarget.status === 200) {
          resolve(currentTarget.status);
        } else {
          reject();
        }
      });
      xhr.open('GET', url);
      xhr.send();
    } catch (e) {
      reject();
      console.log('错误在预期当中---');
    }
  });

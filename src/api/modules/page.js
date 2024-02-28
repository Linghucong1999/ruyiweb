/**
 * 页面API
 */

import $axios from '@/service/httpServer';

// 新增页面
export const createPage = params => $axios.post('/ruyi/page/create', params);

// 获取所有页面
export const getAllPage = params => $axios.get('/ruyi/page/getMyPages', params);

// 获取页面详情
export const getPageDetail = params => $axios.get('/ruyi/page/getPageDetail', params);

// 更新页面元素
export const updatedPage = params => $axios.post('/ruyi/page/update', params);
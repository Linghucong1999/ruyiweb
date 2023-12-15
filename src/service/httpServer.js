import axios from 'axios';
import store from '@/store/index';
import $config from '@/config/index';
import { Cookie } from '@/common/js/mUtils';
import qs from 'qs';


//线上环境需要配置axios.defaults.baseURL,生产环境使用proxy代理即可
if (process.env.NODE_ENV !== 'development') {
    axios.defaults.baseURL = $config.baseURL;
}

axios.defaults.headers['Content-Type'] = 'applicathion/json;charset=utf-8';
axios.defaults.timeout = 30000;

//请求拦截器
axios.interceptors.request.use(config => {
    //每次请求都加上token
    config.headers.Authorization = store.getters.authorization;
    // 设置请求头中的x-csrf-token值为从cookie中获取的x-csrf-token
    config.headers['x-csrf-token'] = Cookie.get('x-csrf-token');
})
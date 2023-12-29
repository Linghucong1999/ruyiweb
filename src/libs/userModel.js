/**
 * 账号相关操作模块
 */

import store from "@/store";
import router from "@/router";
import { login, register, getUserInfo, loginByEmail, sendEmailCode } from "@/api";

let userModel = {
    /**
     * 检测是否登录
     * @returns {Promise<void>}
     */
    async checkLoginState() {
        let userData = store.state.user;    //模块user的状态
        return !!userData.access_token;
    },

    /**
     * 登录
     * @returns {Promise<void>}
     */
    async doLogin(data) {
        try {
            let res = await login(data);
            // store.commit('updateAccessToken', res.body.access_token);
            // store.commit('updateUserInfo', res.body.userInfo);
            return res.body;
        } catch (err) {
            return err;
        }
        // return new Promise((resolve, reject) => {
        //     login(data).then(res => {
        //         store.commit('updateAccessToken', res.body.access_token);
        //         store.commit('updateUserInfo', res.body.userInfo);
        //         resolve(res.body);
        //     }).catch(err => {
        //         reject(err);
        //     })
        // })
    },
    /**
     * 发送验证码
     * @returns {Promise<void>}
     */
    async sendEmailAndCode(data) {
        return new Promise((resolve, reject) => {
            sendEmailCode(data).then(res => {
                resolve(res.body);
            }).catch(err => {
                reject(err);
            })
        })
    },

    /**
     * 邮箱登录
     * @returns {Promise<void>}
     */
    async doLoginByEmail(data) {
        return new Promise((resolve, reject) => {
            loginByEmail(data).then(res => {
                store.commit('updateAccessToken', res.body.access_token);
                store.commit('updateUserInfo', res.body.userInfo);
                resolve(res.body);
            }).catch(err => {
                reject(err);
            })
        })
    },


    /**
     * 注册
     */
    async doRegister(data) {
        return new Promise((resolve, reject) => {
            register(data).then(res => {
                store.commit('updateAccessToken', res.body.access_token);
                store.commit('updateUserInfo', res.body.userInfo);
                resolve(res.body);
            }).catch(err => {
                reject(err);
            })
        })
    },

    /**
     * 获取用户信息
     */
    getUserInfoData() {
        return new Promise((resolve, reject) => {
            getUserInfo().then(res => {
                store.commit('updateUserInfo', res.body);
                resolve(res.body);
            }).catch(err => {
                reject(err);
            })
        })
    },

    /**
     * 退出登录
     */
    async doLogout() {
        //清楚store中的user token
        store.commit('updateAccessToken', '');
        window.sessionStorage.setItem('beforeLoginUrl', '');
        userModel.goLogin();
    },

    /**
     * 跳转登录
     */
    async goLogin() {
        //将路由保存在缓存中，用于登录完成后跳转
        let indexOf = window.location.href.indexOf('#/');
        let currentUrl = window.location.href.slice(indexOf + 1, window.location.href.length);
        window.sessionStorage.setItem('beforeLoginUrl', currentUrl);
        store.commit('updateAccessToken', '');
        router.push({ name: 'Layout' });
    },

    async goBeforeLoginUrl() {
        // 获取sessionStorage中的beforeLoginUrl
        let url = window.sessionStorage.getItem('beforeLoginUrl');
        // 判断beforeLoginUrl是否存在，或者是否包含/login
        if (!url || url.indexOf('/login') != -1) {
            // 如果不存在或者包含/login，则跳转到根路由
            router.push('/');
        } else {
            // 如果存在，则跳转到beforeLoginUrl路由，并将beforeLoginUrl设置为空
            router.push(url);
            window.sessionStorage.setItem('beforeLoginUrl', '');
        }
    }
}

export default userModel;
/**
 * 用户相关
 */
import { setLocalStorage, getLocalStorage } from '@/common/js/mUtils';
const state = {
    access_token: '',
    permissionsList: [],
    userInfo: {} // 用户信息
}

const actions = {};

const mutations = {
    /**
     * 更新用户data info数据
     */
    updateUserInfo(state, data) {
        state.userInfo = { ...data };
        //存储状态
        mutations.saveUserToLocal(state);
    },

    /**
     * 更新相关的token
     */
    updateAccessToken(state, data) {
        state.access_token = data || '';
        mutations.saveUserToLocal(state);
    },

    /**
     * 更新个人权限
     */
    updatePermissionsList(state, data) {
        state.permissionsList = data || [];
        mutations.saveUserToLocal(state);
    },

    /**
     * 将 user state 数据存储在localstore里面
     */
    saveUserToLocal(state) {
        setLocalStorage('user', state);
    },

    /**
     * 从localStorage取出数据更新user
     */
    getUserFromLocal(state) {
        let user = getLocalStorage('user');
        if (user) {
            for (let key in user) {
                state[key] = user[key];
            }
        }
    }
}

const getters = {
    authorization(state) {
        return state.access_token ? 'Bearer ' + state.access_token : '';
    },
    userInfo(state) {
        return state.userInfo;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
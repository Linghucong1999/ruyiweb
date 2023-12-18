/**
 * 用户相关的api
 */
import $axios from "@/service/httpServer";

//登录
export const login = data => $axios.post("/ruyi/auth/login", data);

//注册
export const register = data => $axios.post("/ruyi/auth/register", data);

//获取用户信息
export const getUserInfo = () => $axios.get("/ruyi/user/info");

//修改用户昵称
export const updateUserNickname = data => $axios.post("/ruyi/user/updata/name", data);

//修改密码
export const updateUserPassword = data => $axios.post("/ruyi/user/updata/password", data);

//修改头像
export const updateUserAvatar = data => $axios.post("/ruyi/user/updata/avater", data);

//关键词搜索用户
export const getUserListByKeywords = data => $axios.get('/ruyi/user/getUserList', data);
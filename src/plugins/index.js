/**
 * 组件库入口
 */

import Text from './text';

/**
 * 所有组件列表
 */
const components = [
    Text,
];

// 定义install方法
const install = function (Vue) {
    // 判断是否安装，安装过就不继续往下执行
    if (install.installed) return;
    install.installed = true;
    // 便利注册的组件
    components.map(component=>Vue.component(component.name,component));
};

// 检测到Vue才执行
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

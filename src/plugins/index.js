/**
 * 组件库入口
 */

import Text from './text';
import Image from './image';
import Button from './button';
import Rectangle from './rectangle';
import Divider from './divider';
import Iframe from './iframe';
import CheckBox from './checkBox';
import TimeSelect from './time-select';
import DateTimeSelect from './date-time-select';
import NumberInput from './number-input';
import Textarea from './textarea';

/**
 * 所有组件列表
 */
const components = [
    Text,
    Image,
    Button,
    Rectangle,
    Divider,
    Iframe,
    CheckBox,
    TimeSelect,
    DateTimeSelect,
    Textarea,
    NumberInput,
];

// 定义install方法
const install = function (Vue) {
    // 判断是否安装，安装过就不继续往下执行
    if (install.installed) return;
    install.installed = true;
    // 遍历注册的组件
    components.map(component => Vue.component(component.name, component));
};

// 检测到Vue才执行
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

let ruyi_register_components_object = {};
components.forEach(item => {
    ruyi_register_components_object[item.name] = item;
});

export {
    Text,
    Image,
    Button,
    Rectangle,
    Divider,
    Iframe,
    CheckBox,
    TimeSelect,
    DateTimeSelect,
    NumberInput,
    Textarea,
    ruyi_register_components_object,
};

export default {
    install,
};
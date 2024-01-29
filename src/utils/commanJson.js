// import configList from '@/config/index';
export const sideBarMenus = [
    {
        label: '组件列表',
        value: 'componentLibs',
        elementUiIcon: 'el-icon-s-operation'
    },
    {
        label: '页面管理',
        value: 'pageManage',
        elementUiIcon: 'el-icon-document'
    },
    {
        label: '模板库',
        value: 'templateLibs',
        elementUiIcon: 'el-icon-s-promotion'
    },
];

export const operationDataList = [
    {
        title: "发布",
        eventType: "publish",
        extraClassName: "",
        iconClass: "el-icon-upload",
    },
    {
        title: "发布模板市场",
        eventType: "publishTemplate",
        extraClassName: "",
        iconClass: "el-icon-s-shop",
    },
    {
        title: "复制链接",
        eventType: "copyUrl",
        extraClassName: "",
        iconClass: "el-icon-connection",
    },
    {
        title: "设为我的模板",
        eventType: "setTemplate",
        extraClassName: "",
        iconClass: "el-icon-document-copy",
    },
    {
        title: "页面数据",
        eventType: "viewPageData",
        extraClassName: "",
        iconClass: "el-icon-document",
    },
    {
        title: "协作设置",
        eventType: "cooperation",
        extraClassName: "",
        iconClass: "el-icon-s-operation",
    },
    {
        title: "删除",
        eventType: "delete",
        extraClassName: "error",
        iconClass: "el-icon-delete",
    },
    {
        title: "退出协作",
        eventType: "unCooperation",
        extraClassName: "error",
        iconClass: "el-icon-right",
    },
];

export const elementConfig = [];
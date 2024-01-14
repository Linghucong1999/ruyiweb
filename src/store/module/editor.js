// import { cloneDeep, merge } from "lodash";

/**
 * 编辑数据状态存储
 */
const state = {
    //当前编辑器编辑工程项目数据
    projectData: {},

    //当前正在编辑的页面uuid
    acticePageUUID: '',
    //画板中选中的元素UUID
    acticeElementUUID: '',
    //历史操作数据用于undo redo
    historyCache: [],
    //undo redo指针
    currentHistoryIndex: -1,
    activeAttrEditCollapse: ['1'],
};

export default {
    state
};
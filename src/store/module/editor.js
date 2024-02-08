import { cloneDeep } from "lodash";
import editorProjectConfig from '@/pages/editor/DataModel';
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

// 记住 commit唤醒的是mutations,dispatch唤醒的是actions,action中可以通过调用commit方法来触发mutation

const actions = {
    /**
     * 初始化编辑项目数据
     * @param {*} state
     * @param {*} data
     */
    setProjectData({ commit, state, dispatch }, data) {
        let projectData = data;
        if (!projectData) {
            projectData = editorProjectConfig.getProjectConfig();
        }
        commit('setProjectData', projectData);

        // 选中的项目没有页面的话，就为此项目新建一个页面
        if (!state.projectData.pages || state.projectData.pages.length === 0) {
            dispatch('addPage');
        }
        dispatch('setActivePageUUID', state.projectData.pages[0].uuid);
    },

    /**
     * 设置当前页面的uuid
     * @param state
     * @param data
     */
    setActivePageUUID({ commit }, data) {
        commit('setActivePageUUID', data);
        //当前选中的页面切换后清空元素选中的uuid
        commit('setActiveElementUUID', '');
    },

    /**
     * 添加页面
     *
     */
    addPage({ commit, state }, uuid) {
        let data = editorProjectConfig.getProjectConfig();
        let index = -1;
        if (uuid) {
            index = state.projectData.pages.findIndex(item => item.uuid === uuid);
        } else {
            index = state.projectData.pages.length - 1;
        }
        commit('insertPage', data, index);
        commit('addHistoryCache');
    },

    /**
     * 添加元素
     * @param commit
     * @param {*} data
     */
    addElement({ commit,state }, eldata) {
        const activePage = getters.activePage(state);
        const data = editorProjectConfig.getElementConfig(eldata, { zIndex: activePage.elements.length + 1 });
        commit('addElement', data);
        commit('setActiveElementUUID', data.uuid);
        commit('addHistoryCache');
    },
};

const mutations = {
    //页面设置

    setProjectData(state, data) {
        state.projectData = data;
    },

    //新增页面
    insertPage(state, data, index) {
        if (index) {
            state.projectData.pages.splice(index, 0, data);
        } else {
            state.projectData.pages.push(data);
        }
    },
    setActivePageUUID(state, uuid) {
        state.acticePageUUID = uuid;
    },
    setActiveElementUUID(state, uuid) {
        state.acticeElementUUID = uuid;
    },

    //历史记录

    /**
     * 新增一条历史记录
     * @param {*} state
     */
    addHistoryCache(state) {
        if (state.currentHistoryIndex + 1 < state.historyCache.length) {
            state.historyCache.splice(state.currentHistoryIndex + 1);
        }
        state.historyCache.push({
            projectData: cloneDeep(state.projectData),
            activePageUUID: state.activePageUUID,
            acticeElementUUID: state.acticeElementUUID,
        });

        //限制uudo步数，记录步数
        state.historyCache.splice(100);
        state.currentHistoryIndex++;
    },

    // 元素相关

    /**
     *往画板添加元素
     */
    addElement(state, eldata) {
        const index = state.projectData.pages.findIndex(item =>{return item.uuid === state.acticePageUUID;});
        state.projectData.pages[index].elements.push(eldata);
    }
};

const getters = {

    /**
     * 当前选中页面
     */
    activePage() {
        if (!state.projectData.pages || !state.acticePageUUID) {
            return {commonStyle:{},config:{}};
        }
        return state.projectData.pages.find(item=>{return item.uuid === state.acticePageUUID;});
    }
};
export default {
    state,
    actions,
    mutations,
    getters
};
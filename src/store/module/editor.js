import { cloneDeep, merge } from "lodash";
import editorProjectConfig from '@/pages/editor/DataModel';
/**
 * 编辑数据状态存储
 */
const state = {
    //当前编辑器编辑工程项目数据
    projectData: {},

    //当前正在编辑的页面uuid
    activePageUUID: '',
    //画板中选中的元素UUID
    activeElementUUID: '',
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
     * @param uuid
     */
    setActivePageUUID({ commit }, uuid) {
        commit('setActivePageUUID', uuid);
        //当前选中的页面切换后清空元素选中的uuid
        commit('setActiveElementUUID', '');
    },

    /**
     * 被激活的元素
     * @param state
     * @param uuid
     */
    setActiveElementUUID({ commit }, uuid) {
        commit('setActiveElementUUID', uuid);
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

    // 元素相关

    /**
     * 添加元素
     * @param commit
     * @param {*} data
     */
    addElement({ commit, state }, eldata) {
        const activePage = getters.activePage(state);
        const data = editorProjectConfig.getElementConfig(eldata, { zIndex: activePage.elements.length + 1 });
        commit('addElement', data);
        commit('setActiveElementUUID', data.uuid);
        commit('addHistoryCache');
    },

    /**
     * 元素指令，用于结束针对元素修改相关指令，再由此方法派发actions做具体修改
     * @param {*} param0
     * @param {*} command
     */
    elementCommand({ commit, dispatch }, command) {
        let elData = getters.activeElement();
        switch (command) {
            case 'copy':
                dispatch('copyElement', elData);
                break;
            case 'delete':
                dispatch('deleteElement', elData.uuid);
                break;
            case 'fontA+':
                dispatch('resetElementCommonStyle', { fontSize: elData.commonStyle.fontSize + 1 });
                break;
            case 'fontA-':
                dispatch('resetElementCommonStyle', { fontSize: elData.commonStyle.fontSize - 1 });
                break;
            case 'fontB':
                dispatch('resetElementCommonStyle', { fontWeight: elData.commonStyle.fontWeight === 'bold' ? 'normal' : 'bold' });
                break;
            case 'layerUp':
                commit('resetElementZindex', { uuid: elData.uuid, type: 'layerUp' });
                break;
            case 'layerDown':
                commit('resetElementZindex', { uuid: elData.uuid, type: 'layerDown' });
                break;
            case 'layerTop':
                commit('resetElementZindex', { uuid: elData.uuid, type: 'layerTop' });
                break;
            case 'layerBottom':
                commit('resetElementZindex', { uuid: elData.uuid, type: 'layerBottom' });
                break;
            default:
                break;
        }
    },
    copyElement({ commit }, elData) {
        let copyOrignData = elData ? elData : getters.activeElement();
        let activePage = getters.activePage();
        let data = editorProjectConfig.copyElement(copyOrignData, { zIndex: activePage.elements.length + 1 });
        commit('addElement', data);
        commit('setActiveElementUUID', data.uuid);
        commit('addHistoryCache');
    },
    deleteElement({ state, commit }, uuid) {
        // 删除选中元素的同时，取消选中元素事件
        if (uuid === state.activeElementUUID) commit('setActiveElementUUID', '');

        // 将页面元素的zIndex重置再删除
        commit('resetElementZindex', { uuid: uuid, type: 'set0' });
        commit('deleteElemet', uuid);
        commit('addHistoryCache');
    },
    resetElementCommonStyle({ commit }, style) {
        commit('resetElementCommonStyle', style);
        commit('addHistoryCache');
    },

    // 历史记录
    /**
     * 计入历史
     */
    addHistoryCache({ commit }) {
        commit('addHistoryCache');
    },
    /**
     *撤销
     */
    editorUndo({ commit, state }) {
        if (!getters.canUndo(state)) return;
        const prevState = state.historyCache[state.currentHistoryIndex - 1];
        commit('relapceEditorState', cloneDeep(prevState));
        commit('editorUndo');
    },

    editorRedo({ commit, state }) {
        if (!getters.canRedo(state)) return;
        const nextState = state.historyCache[state.currentHistoryIndex + 1];
        commit('relapceEditorState', cloneDeep(nextState));
        commit('editorRedo');
    }
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
        state.activePageUUID = uuid;
    },
    setActiveElementUUID(state, uuid) {
        state.activeElementUUID = uuid;
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
            activeElementUUID: state.activeElementUUID,
        });

        //限制uudo步数，记录步数
        state.historyCache.splice(100);
        state.currentHistoryIndex++;
    },

    /**
     *更新编辑器项目数据，从history中拿数据
     */
    relapceEditorState(state, data) {
        state.projectData = cloneDeep(data.projectData);
        state.activePageUUID = data.activePageUUID;
        state.activeElementUUID = data.activeElementUUID;
    },

    /**
     * 撤销操作
     */
    editorUndo(state) {
        state.currentHistoryIndex--;
    },

    /**
     * 重做按钮操作
     */
    editorRedo(state) {
        state.currentHistoryIndex++;
    },

    // 元素相关

    /**
     *往画板添加元素
     */
    addElement(state, eldata) {
        const index = state.projectData.pages.findIndex(item => { return item.uuid === state.activePageUUID; });
        state.projectData.pages[index].elements.push(eldata);
    },

    /**
     * 改变元素的zIndex
     * @param {*} state
     * @param {*} param1 type:layerUp上一层,layerDown下一层,layerTop置顶,layerBottom置底
     */
    resetElementZindex(state, { uuid, type }) {
        let eluuid = uuid || state.activeElementUUID;
        // 获取当前激活页
        let activePage = getters.activePage(state);
        // 获取当前元素
        let currentElement = activePage.elements.find(v => { return v.uuid === eluuid; });
        // 获取当前元素的z-index
        let itemZindex = currentElement.commonStyle.zIndex;
        // 获取当前页面的元素个数
        let maxIndex = activePage.elements.length;
        // 获取最小z-index
        let minIndex = 1;
        // 定义z-index的移动方向
        let zIndexDirc = {
            layerUp: Math.min(itemZindex + 1, maxIndex),
            layerDown: Math.max(itemZindex - 1, minIndex),
            layerTop: maxIndex,
            layerBottom: minIndex,
            set0: 0,
        };
        // 如果z-index移动方向不存在，则返回
        if (zIndexDirc[type] === undefined) return;
        // 获取当前z-index
        let currentZIndex = zIndexDirc[type];
        // 设置当前元素的z-index
        currentElement.commonStyle.zIndex = currentZIndex;
        // 遍历当前页面的元素，如果当前元素不是当前元素，则根据z-index移动方向，改变其他元素的z-index
        activePage.elements.forEach(item => {
            if (eluuid === item.uuid) return;
            if (type === 'layerUp' && item.commonStyle.zIndex === currentZIndex) {
                item.commonStyle.zIndex--;
            }
            if (type === 'layerDown' && item.commonStyle.zIndex === currentZIndex) {
                item.commonStyle.zIndex++;
            }

            if (type === 'layerTop' && item.commonStyle.zIndex > itemZindex) {
                item.commonStyle.zIndex--;
            }
            if ((type === 'layerBottom' || type === 'set0') && item.commonStyle.zIndex < itemZindex) {
                item.commonStyle.zIndex++;
            }
        });
    },

    deleteElemet(state, uuid) {
        let activePage = getters.activePage(state);
        let elementIndex = activePage.elements.findIndex(item => { return item.uuid === uuid; });
        activePage.elements.splice(elementIndex, 1);
    },

    /**
     * 重置元素样式
     * @param {*} state
     * @param {*} style
     */
    resetElementCommonStyle(state, style) {
        let activeElement = getters.activeElement(state);
        activeElement.commonStyle = merge(activeElement.commonStyle, style);
    }
};

const getters = {

    /**
     * 当前选中页面
     */
    activePage() {
        if (!state.projectData.pages || !state.activePageUUID) {
            return { commonStyle: {}, config: {} };
        }
        return state.projectData.pages.find(item => { return item.uuid === state.activePageUUID; });
    },

    /**
     * 当前选中页面的索引
     */
    currentPageIndex(state) {
        if (!state.projectData.pages) {
            // 如果不存在页面就返回-1
            return -1;
        }
        return state.projectData.pages.findIndex(item => { return item.uuid === state.activePageUUID; });
    },
    /**
     * 选中的页面元素索引
     * @param {*} state
     * @returns
     */
    activeElementIndex(state) {
        if (!state.projectData.pages) return -1;
        let currentPageIndex = state.projectData.pages.findIndex(item => item.uuid === state.activePageUUID);
        if (currentPageIndex === -1) return -1;
        return state.projectData.pages[currentPageIndex].elements.findIndex(item => item.uuid === state.activeElementUUID);
    },

    /**
     * 当前选中的元素
     */
    activeElement() {
        if (!state.projectData.pages) return -1;
        let currentPageIndex = state.projectData.pages.findIndex(item => item.uuid === state.activePageUUID);
        if (currentPageIndex === -1) return -1;
        return state.projectData.pages[currentPageIndex].elements.find(item => item.uuid === state.activeElementUUID);
    },

    canUndo(state) {
        return state.currentHistoryIndex > 0;
    },

    canRedo(state) {
        return state.historyCache.length > state.currentHistoryIndex + 1;
    }

};
export default {
    state,
    actions,
    mutations,
    getters
};
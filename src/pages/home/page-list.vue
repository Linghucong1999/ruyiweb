<template>
  <div class="clearfix my-page-list">
    <div class="page-search-wrapper bg-white">
      <el-tabs v-model="searchForm.pageMode" @tab-click="handlePageModeClick">
        <el-tab-pane
          v-for="(item, index) in pageModeList"
          :key="index"
          :name="item.value"
          :label="item.label"
          :disabled="item.disabled"
        ></el-tab-pane>
      </el-tabs>
    </div>

    <el-scrollbar class="page-list-wrapper scroll-wrapper">
      <div class="page-content">
        <div class="my-page-nav-list">
          <div
            class="my-page-nav-item"
            @click="doSearch('my')"
            :class="{ active: searchForm.type === 'my' }"
          >
            我的作品({{ myCount }})
          </div>

          <div
            class="my-page-nav-item"
            @click="doSearch('cooperation')"
            :class="{ active: searchForm.type === 'cooperation' }"
          >
            协作作品({{ shareCount }})
          </div>
        </div>
        <div class="page-item-wrapper" v-loading="loading">难受</div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      searchForm: {
        type: "my",
        pageMode: "H5",
      },
      pageModeList: [],
      myCount: 0,
      shareCount: 0,
    };
  },
  created() {
    this.pageModeList = this.$config.pageModeList;
  },
  methods: {
    handlePageModeClick(tab, event) {
      console.log(tab, event);
    },
    doSearch(type) {
      console.log(type);
    },
  },
};
</script>
<style lang="less" scoped>
.my-page-list {
  height: 100%;
}

.page-list-wrapper {
  height: calc(100% - 40px);
}

.my-page-nav-list {
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  .my-page-nav-item {
    padding-right: 32px;
    text-align: center;
    cursor: pointer;

    &.active {
      color: @primary;
    }
    &:hover {
      color: @primary;
    }
  }
}
</style>
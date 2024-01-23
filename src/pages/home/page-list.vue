<template>
  <div class="clearfix my-page-list">
    <div class="page-search-wrapper bg-white">
      <el-tabs v-model="searchParams.pageMode" @tab-click="handlePageModeClick">
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
            :class="{ active: searchParams.type === 'my' }"
          >
            我的作品({{ myCount }})
          </div>

          <div
            class="my-page-nav-item"
            @click="doSearch('cooperation')"
            :class="{ active: searchParams.type === 'cooperation' }"
          >
            协作作品({{ shareCount }})
          </div>
        </div>

        <div class="page-item-wrapper" v-loading="loading">
          <div class="page-item">
            <Thumbnail :page-tye="searchParams.pageMode" />
          </div>

          <div class="page-item"></div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import Thumbnail from "@/components/thumbnail.vue";
export default {
  components: { Thumbnail },
  data() {
    return {
      loading: false,
      searchParams: {
        type: "my",
        pageMode: "H5",
      },
      pageModeList: [],
      myCount: 0,
      shareCount: 0,
      pageList: [],
    };
  },
  created() {
    this.pageModeList = this.$config.pageModeList;
    this.getAllPageList();
  },
  methods: {
    handlePageModeClick(tab, event) {
      console.log(tab, event);
    },
    doSearch(type) {
      console.log(type);
    },
    //获取所有页面
    getAllPageList() {
      this.$api.getAllPage(this.searchParams).then((res) => {
        this.pageList = res.body.pages || [];
        this.myCount = res.body.myPageCount;
        this.shareCount = res.body.myCooperationPageCount;
      });
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
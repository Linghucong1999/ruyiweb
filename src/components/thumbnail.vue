<template>
  <div>
    <div v-if="pageData">
      <div class="page-thumbnail-panel" v-loading="loading">
        <span class="unpublish" v-if="!pageData.isPublish && showPublishState"
          >未发布</span
        >
        <div class="thumbnail-panel-cover">
          <div class="header-mask">
            <div class="details-btn" @click="preview(pageData._id)">预览</div>
          </div>
          <div class="image-wrapper">
            <img :src="pageData.coverImage || defaultImageCover" />
          </div>
        </div>
      </div>
      <div class="page-item-title">
        <el-tag
          :type="
            !pageData.isPublish && showPublishState ? 'warning' : 'success'
          "
          effect="plain"
          >{{ pageData.title || "未命名作品" }}</el-tag
        >
      </div>

      <div class="thumbnail-panel-btn" v-if="btnList.length">
        <el-button
          class="btn-wrapper"
          v-if="btnList.includes('edit')"
          @click="edit"
          type="text"
          size="mini"
          >编辑</el-button
        >
        <el-button
          class="btn-wrapper"
          type="text"
          size="mini"
          v-if="btnList.includes('useTemplate')"
          >使用模板</el-button
        >
        <el-button
          class="btn-wrapper"
          v-if="btnList.includes('copyTemplate')"
          type="text"
          size="mini"
          >复制</el-button
        >
        <div class="btn-wrapper-more" v-if="showMoreBtn">
          <el-dropdown @command="command" placement="top-start" size="mini">
            <el-button type="text" size="mini"
              >更多<i class="el-icon-more el-icon--right"></i
            ></el-button>
            <el-dropdown-menu slot="dropdown">
              <template v-for="(item, index) in operationDataList">
                <el-dropdown-item
                  :key="index"
                  :command="item.eventType"
                  :class="item.extraClassName"
                  :icon="item.iconClass"
                  v-if="btnList.includes(item.eventType)"
                  >{{ item.title }}</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div v-else v-loading="loading" class="page-thumbnail-panel-footer create">
      <el-button
        type="primary"
        size="small"
        @click="newPage"
        icon="el-icon-plus"
        >新建页面</el-button
      >
    </div>
  </div>
</template>
<script>
import editDataModel from "@/pages/editor/DataModel";

export default {
  props: {
    pageTye: {
      type: String,
      default: "H5",
    },
    pageData: {
      type: Object,
      default: () => {},
    },
    showPublishState: {
      type: Boolean,
      default: true,
    },
    btnList: {
      type: Array,
      default: () => [],
    },
    showMoreBtn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      defaultImageCover: require("@/common/images/sign_bg.47eec442.png"),
      operationDataList: [
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
      ],
    };
  },
  methods: {
    newPage() {
      let newPageData = editDataModel.getProjectConfig();
      this.loading = true;
      this.$api
        .createPage(newPageData)
        .then((res) => {
          this.loading = false;
          if (res.body) {
            this.$router.push({ name: "Edit", query: { id: res.body._id } });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    preview(id) {
      this.$emit("showPreview", id);
    },
    command(type) {
      console.log(type);
    },
    //编辑
    edit() {
      this.$router.push({ name: "Edit", query: { id: this.pageData._id } });
    },
  },
};
</script>
<style lang="less" scoped>
.page-thumbnail-panel {
  width: 230px;
  height: 296px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  position: relative;
  transition: all 0.3s ease-in-out 0s;
  box-shadow: 13px -3px 19px -10px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 0 10px #ccc;
    transform: translate3d(0, -2px, 0);

    .header-mask {
      opacity: 1;
    }
  }

  .header-mask {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    border-radius: 4px 4px 0 0;
    padding-top: 92px;
    color: #f8f1f1;
    text-align: center;
    cursor: pointer;
    transition: top 0.28s ease-in-out, opacity 0.28s ease-in-out,
      height 0.28s ease-in-out;
  }

  .unpublish {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 12px;
    display: block;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    background-color: #cdd0d3;
    border-radius: 4px 0 12px 0;
  }
}
.thumbnail-panel-cover {
  flex: 1;
  position: relative;

  .image-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 5px;
    z-index: 10;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.page-item-title {
  height: 36px;
  width: 100%;
  line-height: 36px;
  padding: 0 8px;
  // font-size: 16px;
  text-align: center;
  font-weight: bold;
}

.thumbnail-panel-btn {
  height: 36px;
  width: 100%;
  display: flex;
  flex-direction: row;

  .btn-wrapper {
    flex: 1;
    text-align: center;
  }
  .btn-wrapper-more {
    flex: 1;
    text-align: center;
    line-height: 36px;
  }
}
</style>
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
  },
  data() {
    return {
      loading: false,
      defaultImageCover: require("@/common/images/sign_bg.47eec442.png"),
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
</style>
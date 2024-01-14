<template>
  <div class="user-head-btn-components">
    <el-dropdown v-if="isLogined">
      <div class="inline-block">
        <div class="user-header-btn-img">
          <img :src="userData.avatar || userHeadImage" alt="" />
        </div>
        <span class="user-head-btn-name">{{ userData.name }}</span>
      </div>
      <el-dropdown-menu v-if="isLogined">
        <el-dropdown-item>
          <user-info
            :user-data.sync="userData"
            :show-edit="true"
            @success="handleSuccesAvatar"
          >
            <i class="el-icon-user"></i>个人中心
          </user-info>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import userInfo from "./user-info.vue";
import { cloneDeep } from "lodash";
import userModel from "@/libs/userModel";

export default {
  components: {
    userInfo,
  },
  data() {
    return {
      userHeadImage: require("@/common/images/headerImage.png"),
    };
  },
  computed: {
    isLogined() {
      return this.$store.state.user.access_token;
    },
    userData() {
      let userInfo = cloneDeep(this.$store.state.user.userInfo) || {};
      // Object.assign(userInfo.avatar, this.$config.baseURL + userInfo.avatar);
      return userInfo;
    },
  },
  methods: {
    async handleSuccesAvatar() {
      await userModel.getUserInfoData();
    },
  },
};
</script>
<style lang="less" scoped></style>
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
                <el-dropdown-item>个人中心</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import userModel from '@/libs/userModel';
import userInfo from './user-info.vue';

export default {
    data() {
        return {
            userHeadImage: require('@/common/images/headerImage.png'),
        }
    },
    computed: {
        isLogined() {
            return this.$store.state.user.access_token;
        },
        userData() {
            return this.$store.state.user.userInfo || {};
        }
    },

}
</script>
<style lang="less" scoped></style>
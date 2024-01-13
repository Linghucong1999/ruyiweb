<template>
    <div class="user-info-plane-dialog inline-block">
        <div class="inline-block" @click="show">
            <slot></slot>
        </div>

        <el-dialog title="个人中心" class="page-dialog-warapper" :visible.sync="dialogVisible" v-if="dialogVisible"
            width="500px" append-to-body @close="closeDialog">
            <div class="user-info-plane">
                <div class="user-image-wrapper">
                    <div class="user-image-inner">
                        <img :src="userData.avatar || userHeadImage" />

                        <div class="user-image-upload" v-if="showEdit">
                            <el-tooltip content="点击头像更换 (只支持jpg、png、jpeg格式且大小不超过1M的图片)" placement=""></el-tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>

    </div>
</template>
<script>
export default {
    props: {
        userData: {
            type: Object,
            default: () => { return {} },
        },
        showEdit: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            dialogVisible: false,
            userHeadImage: require('@/common/images/headerImage.png'),
        }
    },
    methods: {
        show() {

        },
        closeDialog() { },
    }
}
</script>

<style lang="less" scoped></style>
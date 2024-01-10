<template>
    <div class="components-page-header">
        <div class="page-header-inner">
            <div class="inline-block logo-wrapper">
                <!-- <img class="cursor-pointer" @click="goHome" src="../assets/icons/mcd-logo.svg" /> -->
                <img class="cursor-pointer" @click="goHome" src="../common/images/ie-mcd-logo.png" />
                <slot name="left-slot"></slot>
            </div>

            <div class="header-center-wrapper">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        goHome() {
            this.$router.push('/')
        }
    }
}
</script>
<style lang="less" scoped></style>
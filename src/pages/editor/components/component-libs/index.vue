<template>
  <div class="components-libs-wrapper">
    <p class="page-title">组件库</p>
    <el-scrollbar style="height: 100%">
      <ul>
        <li v-for="(item, index) in componentsList" :key="index">
          <div class="components-libs-title">
            <el-tag type="success">{{ item.title }}</el-tag>
          </div>
          <div v-if="item.components && item.components.length">
            <div
              class="components-libs-item"
              v-for="(element, rowindex) in item.components"
              :key="rowindex"
              @click="handleClick(element)"
            >
              <div class="lib-item-img"><i :class="[element.icon]"></i></div>
              <div class="lib-item-title">{{ element.title }}</div>
            </div>
          </div>

          <div v-else>
            <div class="background-components-zero">
              <lottie :options="{ animationData: animation }"></lottie>
            </div>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script>
import { elementConfig } from "@/utils/commanJson";
import bg from "@/assets/Model/bg.json";
export default {
  data() {
    return {
      componentsList: elementConfig,
      animation: bg,
    };
  },
  methods: {
    handleClick(element) {
      console.log(element);
    },
  },
};
</script>
<style lang="less" scoped>
.components-libs-title {
  margin-bottom: 10px;
}

.components-libs-item {
  color: #949292;
  text-align: center;
  // background: #e3e2e2;
  width: 120px;
  display: flex;
  // flex-direction: column;
  padding: 6px 6px;
  margin: 5px;
  border: 1px solid #e6e6e6;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #ecf5ff;
    border: 1px solid #ecf5ff;
    color: @primary;
  }

  .lib-item-title {
    text-align: center;
    margin-left: 5px;
    line-height: 18px;
  }
}

.background-components-zero {
  width: 200px;
  height: 200px;
}

::v-deep.el-tabs--left .el-tabs__active-bar.is-left {
  left: 0;
  right: auto;
}
</style>
<script setup lang="ts">
// 导入自带的可设置页面的标题logo的函数
import { useHead } from "@unhead/vue";
// 导入全局配置文件
import GLOBAL_CONFIG from "./config";
import { onMounted, ref, watch } from "vue";
// 导入组件
import BanTouchMask from "@/components/BanTouchMask.vue";
import CenterLogo from "@/components/CenterLogo.vue";
import GithubBadge from "@/components/GithubBadge.vue";
import ICP from "@/components/ICP.vue";
import WebsiteDrawer from "./components/WebsiteDrawer.vue";
// 导入页面变化函数
import useMobileVhCssVar from "@/hooks/useMobileVhCssVar";

// 定义该组件的名字
defineOptions({
  name: "App",
});

// 禁止点击开关；页面动画加载完成图标向上移动和文字显示和向上移动；icp组件文字移动开关
const animationEnd = ref<boolean>(false);
// 模糊开关，抽屉开关
const drawerVisible = ref<boolean>(false);
//开启子组件的 background-loaded(背景图监听)函数开关
const backgroundLoaded = ref<boolean>(false);

// 使用页面变化适应函数
useMobileVhCssVar();

onMounted(() => {
  // 预计动画1300毫秒后结束，打开开关
  setTimeout(() => {
    animationEnd.value = true;
  }, 1300);
});

// 图片加载成功背景色80%黑色
watch([backgroundLoaded, animationEnd], () => {
  if (backgroundLoaded.value && animationEnd.value) {
    document.body.style.backgroundColor = "rgba(0,0,0,0.8)";
  }
});

// 配置网页标题
useHead({
  title: GLOBAL_CONFIG.TKD.title,
  meta: [
    {
      name: "description",
      content: GLOBAL_CONFIG.TKD.description,
    },
    {
      name: "keywords",
      content: GLOBAL_CONFIG.TKD.keywords,
    },
  ],
});
</script>

<template>
  <div id="main-view">
    <!-- 遮罩：防止用户在动画播放期间点击屏幕 -->
    <BanTouchMask :touchable="animationEnd" />

    <!-- github 徽标 -->
    <GithubBadge />

    <!-- 中间LOGO部分 -->
    <!-- 中间logo部分 
      点击菜单让背景模糊；
      动画结束动画和文字上移，文字显示；
      启动子组件的 background-loaded 函数
    -->
    <CenterLogo
      :drawer-visible="drawerVisible"
      :touchable="animationEnd"
      @background-loaded="backgroundLoaded = true"
    />

    <!-- 应用抽屉 -->
    <WebsiteDrawer v-model="drawerVisible" />

    <!-- 备案号 -->
    <!-- 动画结束元素向下移动 -->
    <ICP :visible="animationEnd" />
  </div>
</template>

<style lang="scss" scoped>
#main-view {
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
</style>

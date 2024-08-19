<script lang="ts" setup>
// 导入全局配置对象
import GLOBAL_CONFIG from "@/config";
// 随机数字函数
import { randomNum } from "@/utils";
import { onMounted, ref } from "vue";
// 导入图标
import LocalLogo from "@/assets/logo.svg";
// 一个可以配置网页标题、logo的方法
import { useHead } from "@unhead/vue";
import { log } from "console";

//城建名字为 CenterLogo 的组件
defineOptions({
  name: "CenterLogo",
});

//定义 父子传的参数
defineProps<{
  drawerVisible: boolean; //模糊开关
  touchable: boolean; //页面动画效果加载成功图标上移，文字显示和上移开关
}>();

// 定义emit函数常量  定义了该组件的事件 事件名：backgroundLoaded 参数:[]
const emit = defineEmits<{
  backgroundLoaded: [];
}>();

// 定义背景图是否加载完成
const bgLoaded = ref<boolean>(false);
const slogan = ref<string>("");

// 是否在全局配置有logo图片，有则加载
if (GLOBAL_CONFIG.LOGO_URL) {
  // alert("logo");
  useHead({
    link: [
      {
        rel: "preload",
        href: GLOBAL_CONFIG.LOGO_URL,
        as: "image",
      },
    ],
  });
}

/**
 * 加载背景图片   加载成功就可以父组件就可以使用backgroundLoaded方法
 */
function loadBackground() {
  var img = new Image();
  img.src = GLOBAL_CONFIG.BACKGROUND_IMG_URL;
  img.addEventListener("load", () => {
    bgLoaded.value = true;
    emit("backgroundLoaded");
  });
}

/**
 * 前往我的博客
 */
function goToBlog() {
  window.location.href = GLOBAL_CONFIG.BLOG_URL;
}

// 网站欢迎语
function randomSlogan() {
  const slogans = GLOBAL_CONFIG.SLOGANS;
  slogan.value = slogans[randomNum(0, slogans.length - 1)];
}

const img = ref(null);

onMounted(() => {
  console.log(document.querySelector(".main-logo").style);
  if (img.value) {
    console.log(window.getComputedStyle(img.value).borderRadius);
    setTimeout(() => {
      img.value.style.borderRadius = "20%";
    }, 480);
    // console.log(window.getComputedStyle(img.value).borderRadius);
  }

  randomSlogan();
  loadBackground();
});
</script>

<template>
  <div
    :class="['logo-area', { 'is-blur': drawerVisible }]"
    :style="{ background: `url(${$config.BACKGROUND_IMG_URL})` }"
  >
    <div :class="['img-shadow', { 'img-shadow-show': bgLoaded }]"></div>
    <div
      class="inner"
      style="cursor: pointer"
      @click="goToBlog"
    >
      <!-- 图标向上移动 -->
      <img
        ref="img"
        :class="['main-logo', { 'main-logo-top': touchable }]"
        :src="GLOBAL_CONFIG.LOGO_URL || LocalLogo"
      />
      <!-- 文字显示和向上移动 -->
      <div :class="['hello', { hello_bottom: touchable }]">
        <div>{{ slogan }}</div>
        <div class="hello_bottom_text">点击以访问 {{ $config.BLOG_NAME }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo-area {
  background-size: cover !important;
  background-position: center !important;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 100%;
  animation: logoEnter 1.2s;
  animation-fill-mode: forwards;
  transition: all 0.8s;
  // 让父元素模糊
  &.is-blur {
    filter: blur(5px);
  }
  .img-shadow {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #fda085;
    overflow: hidden;
    transition: background-color 0.5s;
    border-radius: 100%;
    animation: shadowEnter 1.2s;
    animation-fill-mode: forwards;
  }
  .img-shadow-show {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .inner {
    position: relative;
    .main-logo {
      height: 7rem;
      position: absolute;
      transform: translate(-50%, -50%);
      transition: all 1s;
      top: 0;
      border-radius: 50%;
      transition: 1s;
    }
    .main-logo-top {
      top: -3.2rem;
      // border-radius: 10%;
    }
    .hello {
      color: #ffffff;
      width: 18.75rem;
      text-align: center;
      position: absolute;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
      opacity: 0;
      top: 100px;
      transition: all 1s;
    }
    //文字显示和向上移动
    .hello_bottom {
      opacity: 1;
      top: 3.5rem;
      .hello_bottom_text {
        font-size: var(--regular-font-size);
        margin-top: 0.5rem;
        padding-top: 0.5rem;
        border-top: 1px solid #fff;
      }
    }
  }
}
</style>

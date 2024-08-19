<script lang="ts" setup>
import { computed, onMounted, ref, toRefs, watch } from "vue";
import { UpOutlined } from "@ant-design/icons-vue";
// 导入全局配置文件
import GLOBAL_CONFIG from "@/config";
// 导入组件
import useTouch from "@/hooks/useTouch";
// 导入组件
import Drawer from "@/components/basic/Drawer.vue";
import Tabs from "@/components/basic/Tabs/index.vue";
import TabPanel from "@/components/basic/Tabs/TabPanel.vue";
// 导入ts 接口
import { TabPanelProps } from "./basic/Tabs/types";
// 导入WebsiteItem
import WebsiteItem from "./basic/WebsiteItem.vue";
// 导入useMouseWheel方法
import useMouseWheel from "@/hooks/useMouseWheel";
// 导入isWebsiteSortsOld方法
import { isWebsiteSortsOld } from "@/utils/typeDefender";

// 定义类型 WebsiteConfig
type WebsiteConfig = WebsiteSortNew;

// 为组建命名
defineOptions({
  name: "WebsiteDrawer",
});

// 父子组件传参数
const props = defineProps<{
  modelValue: boolean;
}>();

// 传递的方法 update:modelValue 类型boolean，通知父组件的状态变化，比如用户的上滑动作
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

// 接受  props 的 modelValue 量 ，我的想法应该是把modelValue从props分解出来
const { modelValue } = toRefs(props);
// activeTabs 包含 TabPanelProps接口类型 中的 name 属性
const activeTabs = ref<TabPanelProps["name"]>(0);
// websiteSorts 包含 WebsiteSort 类型的对象
const websiteSorts = ref<WebsiteSort[]>([]);
// websiteItems 包含 WebsiteItem 类型的对象
const websiteItems = ref<WebsiteItem[]>([]);
const disableUserActionInput = ref(false);

// 计算属性 【判断是否是旧数据，是则需要处理，无论是否都会返回数据】
// WebsiteConfig[] 表示为 websiteConfig 计算属性的类型
const websiteConfig = computed<WebsiteConfig[]>(() => {
  // 调用 isWebsiteSortsOld 判断数据是否需要处理(是否为旧版数据)
  if (isWebsiteSortsOld(websiteSorts.value, websiteItems.value)) {
    return websiteSorts.value.map((sort) => {
      //用 map 方法 遍历
      return {
        ...sort, //复制 sort 属性
        //添加 sites 属性
        sites:
          // 遍历筛选 websiteItems 元素 ，条件 元素的sortId 是否等于 sort 或 空数组
          websiteItems.value.filter((item) => item.sortId === sort.id) || [],
      };
    });
  } else {
    return websiteSorts.value;
  }
});

// 封装鼠标向上滚动事件,向上滚动执行
useMouseWheel({
  disable: disableUserActionInput,
  onWheelUp() {
    emit("update:modelValue", true);
  },
});

// 封装上滑事件的逻辑，上滑执行，参数1表示触摸事件的开关，参数2为回调函数使用emit函数触发"update:modelValue"的事件，值true
// 这个事件可能会被父组件监听，所以并用于更新父子组件绑定的modelValue
useTouch({
  disable: disableUserActionInput,
  onSlideUp() {
    emit("update:modelValue", true);
  },
});

function onDrawerHandlerClick() {
  emit("update:modelValue", true);
}

// 获取项目资源
function getWebsiteDrawerData() {
  websiteSorts.value = GLOBAL_CONFIG.WEBSITE_SORTS;
  websiteItems.value = GLOBAL_CONFIG.WEBSITE_ITEMS;
}

//监听modelValue
watch(
  modelValue,
  // modelValue为true，
  (newVal) => {
    disableUserActionInput.value = newVal;
  },
  // watch首次执行就检查依赖项
  { immediate: true }
);

// 获取数据
onMounted(() => {
  getWebsiteDrawerData();
});
</script>

<template>
  <section class="website-drawer">
    <!-- Drawer 打开开关 -->
    <div
      class="drawer-handler"
      @click="onDrawerHandlerClick"
    >
      <span class="drawer-handler__icon">
        <up-outlined />
      </span>
      <span class="drawer-handler__text slide-up">Slide Up</span>
      <span class="drawer-handler__text wheel-up">Wheel Up</span>
    </div>
    <!-- Drawer -->
    <Drawer
      :model-value="modelValue"
      class="website-drawer__drawer"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <Tabs v-model="activeTabs">
        <TabPanel
          v-for="(config, index) in websiteConfig"
          :key="index"
          :name="index"
          :label="config.title"
          :class="{
            'empty-panel': !config.sites?.length,
          }"
        >
          <template v-if="config.sites?.length">
            <WebsiteItem
              v-for="(website, subIndex) in config.sites"
              :key="subIndex"
              :item="website"
            />
          </template>
          <div v-else>😥 这里什么都没有</div>
        </TabPanel>
      </Tabs>
    </Drawer>
  </section>
</template>

<style lang="scss" scoped>
.website-drawer {
  .drawer-handler {
    position: absolute;
    color: #fff;
    bottom: 5vh;
    transition: all 1s;
    display: flex;
    flex-direction: column;
    transform: translateX(-50%);
    text-align: center;
    cursor: pointer;
    &__icon {
      transform: scale(1.2, 0.8);
    }
    &__text {
      font-size: var(--regular-font-size);
      margin-top: var(--mini-gap);
      animation: float 4s infinite ease-in-out;

      &.slide-up {
        @media (any-hover: hover) {
          display: none;
        }
      }

      &.wheel-up {
        @media (hover: none) {
          display: none;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.website-drawer__drawer {
  .drawer__content {
    .tabs__header {
      width: calc(100% - 1.2rem);
    }
    .tabs__content {
      height: 60vh;

      .tab-panel {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto;
        grid-gap: var(--mini-gap);
        align-items: flex-start;

        @media screen and (min-width: 768px) {
          grid-template-columns: repeat(4, 1fr);
        }

        &.empty-panel {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--secondary-text-color);
        }
      }
    }
  }
}
</style>

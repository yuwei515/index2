import { isNode } from "@/utils";
import { Ref, watch } from "vue";

// 定义接口 
interface useMouseWheelOptions {
  onWheelUp?: () => void;//可回调的函数，检测鼠标向上滚动时触发
  disable: Ref<boolean>;//响应式boolean，用于控制鼠标滚动事件的开关
}


// 定义导出的函数，该函数传入的参数必须符合接口的标准
export function useMouseWheel({ onWheelUp, disable }: useMouseWheelOptions) {
  // 定义函数onMouseWheel在WheelEvent鼠标滚动事件时触发
  function onMouseWheel(event: WheelEvent) {
    // 向上滚动时触发
    if (event.deltaY < 0) {
      onWheelUp?.();
    }
  }


  // 监听鼠标滚动开启的开关
  watch(
    disable,
    (newVal) => {
      // 不是node.js环境
      if (isNode()) {
        return;
      }
      if (newVal) {
        // 移除鼠标事件
        window.removeEventListener("wheel", onMouseWheel);
      } else {
        // 添加鼠标事件
        window.addEventListener("wheel", onMouseWheel);
      }
    },
    {
      // 首次监听执行依赖项的检查 
      immediate: true,
    }
  );
}

export default useMouseWheel;

import { isNode } from "@/utils";
import { Ref, watch } from "vue";


// 定义接口
interface useTouchOptions {
  onSlideUp?: () => void;//可回调的函数，检测到向上滑动的动作是会触发
  disable: Ref<boolean>;//响应式的boolean ，控制触摸事件的启动与否
}


// 定义要导出的函数，该函数接受符合 useTouchOptions 接口的的对象作为参数【参数是一个函数和booolean】
export function useTouch({ onSlideUp, disable }: useTouchOptions) {
  // 定义对象 储存 触摸事件开始的位置和时间戳
  const touchStart = { x: 0, y: 0, timestamp: 0 };

  // onTouchStart 函数在TouchEvent事件触发时记录触发点的起始位置
  function onTouchStart(event: TouchEvent) {
    touchStart.x = event.touches[0].clientX;
    touchStart.y = event.touches[0].clientY;
    touchStart.timestamp = event.timeStamp;
  }

  // onTouchEnd函数在TouchEvent触发时记录触摸点的变化量，据此判断是否是上滑动作
  function onTouchEnd(event: TouchEvent) {
    // 定义touchEnd储存触摸点的量
    const touchEnd = {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
      timestamp: event.timeStamp,
    };

    // 计算变化量
    const diff = {
      x: touchEnd.x - touchStart.x,
      y: touchEnd.y - touchStart.y,
      timestamp: touchEnd.timestamp - touchStart.timestamp,
    };

    // 判断是否上滑动作，如果y坐标的变化量且改变化在1s内
    if (diff.y < -100 && diff.timestamp < 1000) {
      // 调用回调函数
      onSlideUp?.();
    }
  }

  // 监听触摸事件的启用
  watch(
    disable,
    (newVal) => {
      // 是否是node.js环境
      if (isNode()) {
        return;
      }
      // 移除记录位置和变化量
      if (newVal) {
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchend", onTouchEnd);
      } else {
        // 添加记录位置和变化量
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchend", onTouchEnd);
      }
    },
    {
      // 表示首次进行时进行依赖项的检查
      immediate: true,
    }
  );
}

export default useTouch;

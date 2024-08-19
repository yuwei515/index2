import { onMounted } from "vue";

/**
 * 为移动端设置视口高度的css变量
 * 大概意思解释 页面变化为原来的0.01
 */
export function useMobileVhCssVar() {
  const setVhCssVar = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  // 进入界面执行setVhCssVar方法，监听页面变化执行setVhCssVar方法
  onMounted(() => {
    setVhCssVar();
    window.addEventListener("resize", setVhCssVar);
  });
}


export default useMobileVhCssVar;

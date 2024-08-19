export function randomNum(minNum: number, maxNum: number) {
  switch (arguments.length) {
    case 1:
      return parseInt(`${Math.random() * minNum + 1}`, 10);
    case 2:
      return parseInt(`${Math.random() * (maxNum - minNum + 1) + minNum}`, 10);
    default:
      return 0;
  }
}

export function isNode() {
  // 目的：环境是否是node.js。通过判断是否在浏览器环境运行判断是否有node，因为浏览器widow是一个全局对象，有则表示在浏览器运行，无则表示不在
  return typeof window === "undefined";
}

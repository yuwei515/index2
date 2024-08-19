// 传入两个参数
// 传入两个参数，传入之前他们的类型是WebsiteSort[]等，强调websiteSorts类型为WebsiteSortOld[]，接下来检查这两个参数是否符合条件
// 条件一isWebsiteSortOld的每个元素必须有id并且没有sites字段，条件二websiteItems为数组长度不能为零而且每个元素必须有sortId，符合这两个条件是旧数据
export function isWebsiteSortsOld(
  websiteSorts: WebsiteSort[],
  websiteItems: WebsiteItem[]
): websiteSorts is WebsiteSortOld[] {//类型守卫语法，高数编译器websiteSorts 类型为WebsiteSortOld[]
  // 检查websiteSorts里的每个数据 如果 websiteSorts 的每一项都有 id 并且没有 sites 字段
  const isWebsiteSortOld = websiteSorts.every(
    (sort) =>
      (sort as WebsiteSortOld).id !== undefined &&
      // as 告诉编译器sort类型为
      (sort as WebsiteSortOld).id !== undefined &&
      !(sort as WebsiteSortNew).sites
  );
  // 且 websiteItems 的每一项都有 sortId 【检查websiteItems，首先websiteItems必须是数组，并且长度大于零和每项元素必须含有sortId】
  const hasWebsiteItems =
    websiteItems instanceof Array &&
    websiteItems.length > 0 &&
    websiteItems.every((item) => item.sortId !== undefined);
  // 则认为是旧版【不通过检查则为旧数据】
  return isWebsiteSortOld && hasWebsiteItems;
}

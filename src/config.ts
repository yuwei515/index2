/** Website 分类配置 */
const WEBSITE_SORTS: WebsiteSort[] = [
  {
    title: "前端网页项目",
    sites: [
      {
        title: "学校官网",
        url: "https://yuwei515.github.io/test/school/1/#",
        icon: "https://yuwei515.github.io/test/school/1/img/logo.png",
        color: "#0171CD",
      },
      // {
      //   title: "主标题",
      //   description: "网站描述",
      //   url: "http://www.your-web-page.com/",
      //   icon: "",
      // },
      // {
      //   title: "主标题",
      //   description: "网站描述",
      //   url: "http://www.your-web-page.com/",
      //   icon: "",
      // },
    ],
  },
  {
    title: "双碳管理系统全栈项目",
    sites: [
      {
        title: "双碳管理系统",
        url: "http://192.168.1.106:8088/",
        description: "双碳管理系统后台",
        icon: "http://localhost:8088/src/assets/logo/logo.png",
      },
      {
        title: "双碳管理系统",
        url: "http://192.168.1.106:8081/",
        description: "双碳管理系统用户界面",
        icon: "http://localhost:8088/src/assets/logo/logo.png",
      },
      {
        title: "双碳管理系统",
        url: "http://192.168.1.106:8083/",
        description: "双碳管理系统可视化",
        icon: "http://localhost:8088/src/assets/logo/logo.png",
      }
    ]
  },
  {
    title: "电商管理系统全栈项目",
    sites: [
      {
        title: "电商项目",
        url: "",
        description: "暂时还没有准备"
      }
    ]
  },
  // {
  //   title: "示例分类4",
  // },
  // {
  //   title: "示例分类5",
  // },
  // {
  //   title: "友情链接",
  //   sites: [
  //     {
  //       title: "EsunR Blog",
  //       description: "EsunR 的博客",
  //       url: "https://www.esunr.xyz",
  //       icon: "https://esunr-image-bed.oss-cn-beijing.aliyuncs.com/logo.jpg",
  //     },
  //   ],
  // },
];

/** Website 配置（2023.3.29 已废弃） */
const WEBSITE_ITEMS: WebsiteItem[] = [];

const GLOBAL_CONFIG = {
  /**
   * 博客名称
   */
  // BLOG_NAME: "EsunR-Blog",
  BLOG_NAME: "Yuwei",
  /**
   * 个人博客链接
   */
  // BLOG_URL: "https://blog.esunr.xyz",
  BLOG_URL: "https://yuwei515.github.io/test/",
  /**
   * 指定中心 LOGO 图片地址
   */
  LOGO_URL: 'src/assets/26418d8f61524be581317322587823b5.gif',
  /**
   * 个人 Github 链接
   */
  GITHUB_URL: "https://github.com/yuwei515",
  // GITHUB_URL: "https://github.com/EsunR",
  /**
   * 背景图片地址
   */
  BACKGROUND_IMG_URL: "https://api.dujin.org/bing/1920.php",
  /**
   * ICP 备案号，留空不显示
   */
  ICP: null,
  // ICP: "京ICP证000001号",
  ICP_URL: "#",
  // ICP_URL: "https://beian.miit.gov.cn/",
  FOOTER_INFO: true,
  /**
   * 网站欢迎标语
   */
  SLOGANS: [
    "欢迎拜访",
    "歡迎拜訪",
    "Welcome, my friend!",
    "訪問へようこそ",
    "嗨，别来无恙",
    "不忘初心，一生浪漫",
    "最近还好吗？",
    // "流星，落花，萤火",
    // "马车越空，晃荡越响",
  ],
  /**
   * Website 分类配置
   */
  WEBSITE_SORTS,
  /**
   * Website 配置（2023.3.29 已废弃）
   */
  WEBSITE_ITEMS,
  /**
   * 网站 Title Keywords Description 的配置，用于 SEO
   */
  TKD: {
    title: "Yu Wei Index",//页面名称
    keywords: "Yu, Wei, Index Page",//页面关键词
    description: "This is my personal blog index page.",//页面描述
  },
};

export default GLOBAL_CONFIG;

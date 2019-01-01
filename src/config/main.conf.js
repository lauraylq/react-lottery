const conf = {
  theme: 'black',
  i18n: false,
  table: {
    defaultPageSize: 3,
  },
  DBInfo: {
    // indexDB名称
    DBName: 'sftc-lottery',
    // indexDB版本
    version: '1',
    // indexDB存储表名称
    storeName: {
      user: 'user', // 用户
      award: 'award', // 奖项
    },
    // 校验数据--等待timeout执行
    timeout: 25000,
  },
  sexMap: {
    0: '全部',
    1: '男',
    2: '女',
  },
  // 是否需要下载抽奖截图
  download: {
    show: false,
    delay: 800,
  },
};

export default conf;

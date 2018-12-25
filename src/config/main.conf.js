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
    version: '4',
    // indexDB存储表名称
    storeName: {
      user: 'user', // 用户
      award: 'type', // 奖项
    },
    // 校验数据--等待timeout执行
    timeout: 25000,
  },
};

export default conf;

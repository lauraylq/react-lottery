export function insert(db, storeName, tempData) {
  return new Promise((resolve, reject) => {
    let storeNum = 0;
    // 使用事务
    const transaction = window.db.transaction(storeName, // 事务操作的对象存储空间名
      'readwrite'); // 事务模式:'readwrite'可读写模式;READ_ONLY只读模式;VERSION_CHANGE版本升级模式;
    // 2.1、当事务中的所有操作请求都被处理完成时触发
    transaction.oncomplete = (event) => {
      resolve(storeNum);
    };
    // 2.2、当事务中出现错误时触发，默认的处理方式为回滚事务；
    transaction.onerror = (event) => {
      alert('数据插入失败');
      reject(event);
    };
    // 2.3、当事务被终止时触发
    transaction.onabort = (event) => {};
    // 2.4、从事务中获得相关的对象存储空间对象
    const objStore = transaction.objectStore(storeName);
    // 2.5、向storeName存储空间加入一个storeName对象，获得request对象用于处理用户对数据库的操作请求
    tempData.forEach((item) => {
      const request = objStore.add(item);
      request.onsuccess = (e) => {
        storeNum += 1;
      };
    });
  });
}

export default {};

// 新增数据
export function insert(storeName, tempData) {
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
      reject(event);
    };
    // 2.3、当事务被终止时触发
    transaction.onabort = (event) => {};
    // 2.4、从事务中获得相关的对象存储空间对象
    const objStore = transaction.objectStore(storeName);
    // 2.5、向storeName存储空间加入一个storeName对象，获得request对象用于处理用户对数据库的操作请求
    if (Array.isArray(tempData)) {
      tempData.forEach((item) => {
        const request = objStore.add(item);
        request.onsuccess = (e) => {
          storeNum += 1;
        };
      });
    } else {
      const request = objStore.add(tempData);
      request.onsuccess = (e) => {
        storeNum += 1;
      };
    }
  });
}

// 根据主键获取数据
export function getDataByKey(storeName, key) {
  return new Promise((resolve, reject) => {
    // 使用事务
    const transaction = window.db.transaction(storeName);
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get(key);
    request.onsuccess = (event) => {
      if (request.result) {
        resolve(request.result);
      } else {
        alert('数据获取失败');
      }
    };
    // 2.2、当事务中出现错误时触发，默认的处理方式为回滚事务；
    transaction.onerror = (event) => {
      reject(event);
    };
  });
}

// 根据主键删除数据
export function deleteDataByKey(storeName, key) {
  return new Promise((resolve, reject) => {
    // 使用事务
    const transaction = window.db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.delete(key);
    request.onsuccess = (event) => {
      resolve('success');
    };
    // 2.2、当事务中出现错误时触发，默认的处理方式为回滚事务；
    transaction.onerror = (event) => {
      reject(event);
    };
  });
}

// 清空数据表
export function clearObjectStore(storeName) {
  const transaction = window.db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  store.clear();
}

// 更新数据
export function updateData(storeName, obj) {
  return new Promise((resolve, reject) => {
    // 使用事务
    const transaction = window.db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.put(obj);
    request.onsuccess = (event) => {
      resolve('success');
    };
    // 2.2、当事务中出现错误时触发，默认的处理方式为回滚事务；
    transaction.onerror = (event) => {
      reject(event);
    };
  });
}


// 根据表中全部数据
export function getData(storeName) {
  return new Promise((resolve, reject) => {
    // 使用事务
    if (window.db) {
      const transaction = window.db.transaction(storeName, 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.openCursor();

      const dataArr = [];
      request.onsuccess = (event) => {
        // 创建一个游标
        const cursor = event.target.result;
        // 根据游标判断是否有数据
        if (cursor) {
          const linkRecord = cursor.value;
          linkRecord.key = cursor.key;
          dataArr.push(linkRecord);
          // 调用cursor.continue()方法访问下一条数据
          // 当游标到达下一条数据时，onsuccess事件会再一次触发
          cursor.continue();
        } else {
          // 如果一个结果也没有，说明游标到底了，输出信息
          resolve(dataArr);
        }
      };
      // 2.2、当事务中出现错误时触发，默认的处理方式为回滚事务；
      transaction.onerror = (event) => {
        reject(event);
      };
    }
  });
}

export default {};

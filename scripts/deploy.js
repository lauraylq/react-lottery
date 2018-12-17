const deploy = require('eden-remote-deploy');

const deployCfg = {
  user: {
    receiver: 'http://8.8.8.8:8888/receiver.php',
    root: '/home/odp/',
  },
};

const edenCfg = [{
  from: 'dist/static/**',
  to: 'webroot/static/',
}];

const hostName = process.argv[2];// 捕获机器名字

if (hostName && deployCfg[hostName]) {
  // eslint-disable-next-line
  const receiver = deployCfg[hostName].receiver;
  console.info('==>   Receiver:', receiver);

  deploy(edenCfg, receiver, deployCfg[hostName].root);
} else {
  console.error('==>   请输入正确的部署机器名');
}

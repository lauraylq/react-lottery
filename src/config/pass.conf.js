const conf = {
  enable: false,
  uri: {
    login: '/static/pass.html#/login',
    logout: '/static/pass.html#/logout',
    editpwd: '/static/pass.html#/editpwd',
    bindphone: '/static/pass.html#/bindphone',
  },
};

export const gotoPass = (type) => {
  if (conf.enable && conf.uri[type]) {
    window.location.href = conf.uri[type];
  }
};

export default conf;

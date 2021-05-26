module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513779989145_1674';

  // add your config here
  // 加载 errorHandler 中间件
  config.middleware = ['errorHandler'];

  // 只对 /api 前缀的 url 路径生效
  // config.errorHandler = {
  //   match: '/api',
  // }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['*'],
  };

  config.multipart = {
    fileExtensions: [
      '.apk',
      '.pptx',
      '.docx',
      '.csv',
      '.doc',
      '.ppt',
      '.pdf',
      '.pages',
      '.wav',
      '.mov',
    ], // 增加对 .apk 扩展名的支持
  };
  config.bcrypt = {
    saltRounds: 10, // sdefault 10
  };

  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'egg_iaccounts_db',
    username: 'root',
    timezone: '+08:00',
    password: 'Wjr@13867223154',
  };
  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt', // optional
  };

  return config;
};

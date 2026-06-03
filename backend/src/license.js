/**
 * Copyright (c) 2026 马明聪. All Rights Reserved.
 * 生产环境部署需 CAR_MASTER_LICENSE_KEY，授权联系 hellomamingcong@163.com
 */

const CONTACT = {
  email: 'hellomamingcong@163.com',
  wechat: '19895596575',
  product: 'Car Master / 汽车百科',
};

function getLicenseMessage() {
  return `未授权部署。商业使用、小程序上线请联系 ${CONTACT.email}（微信 ${CONTACT.wechat}）`;
}

function assertLicensedOnBoot() {
  if (process.env.NODE_ENV !== 'production') return;

  if (!process.env.CAR_MASTER_LICENSE_KEY) {
    console.error('\n[Car Master] 生产环境缺少授权密钥 CAR_MASTER_LICENSE_KEY');
    console.error(getLicenseMessage());
    console.error('本地开发请使用: NODE_ENV=development npm start\n');
    process.exit(1);
  }
}

function licenseMiddleware(req, res, next) {
  if (process.env.NODE_ENV !== 'production') return next();

  const exempt = req.path === '/api/health' || req.path === '/api/license';
  if (exempt) return next();

  const headerKey = req.headers['x-car-master-license'];
  const envKey = process.env.CAR_MASTER_LICENSE_KEY;
  if (headerKey === envKey || !headerKey) {
    return next();
  }

  res.status(403).json({
    error: 'Forbidden',
    message: getLicenseMessage(),
    contact: CONTACT,
  });
}

module.exports = {
  CONTACT,
  assertLicensedOnBoot,
  licenseMiddleware,
  getLicenseMessage,
};

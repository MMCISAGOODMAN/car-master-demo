/**
 * 数据档位：full（完整版）| sample（公开演示版）
 * 演示版：CAR_MASTER_DATA=sample npm run init-db
 */
const profile = process.env.CAR_MASTER_DATA === 'sample' ? 'sample' : 'full';

module.exports = {
  profile,
  isSample: profile === 'sample',
  partsData: require(profile === 'sample' ? './parts-data.sample' : './parts-data'),
  guidesData: require(profile === 'sample' ? './guides-data.sample' : './guides-data'),
};

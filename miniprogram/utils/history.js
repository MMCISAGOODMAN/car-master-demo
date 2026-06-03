const KEY = 'car_history';
const MAX = 30;

function getList() {
  return wx.getStorageSync(KEY) || [];
}

function save(list) {
  wx.setStorageSync(KEY, list.slice(0, MAX));
}

function add(item) {
  const list = getList().filter((i) => !(i.type === item.type && i.id === item.id));
  list.unshift({ ...item, viewedAt: Date.now() });
  save(list);
  return list;
}

function remove(type, id) {
  const list = getList().filter((i) => !(i.type === type && i.id === id));
  save(list);
  return list;
}

function clear() {
  wx.removeStorageSync(KEY);
}

module.exports = { getList, add, remove, clear };

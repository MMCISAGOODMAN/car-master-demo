const MAINTAIN_KEY = 'car_maintain';
const FUEL_KEY = 'car_fuel';

function getList(key) {
  return wx.getStorageSync(key) || [];
}

function saveList(key, list) {
  wx.setStorageSync(key, list);
}

function parseDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('-').map(Number);
  if (parts.length < 3) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function getMaintainStatus(dateStr) {
  const target = parseDate(dateStr);
  if (!target) {
    return { status: 'normal', label: '', diffDays: null, sort: 3 };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.round((target - today) / 86400000);

  if (diffDays < 0) {
    return {
      status: 'overdue',
      label: `已过期 ${Math.abs(diffDays)} 天`,
      diffDays,
      sort: 0
    };
  }
  if (diffDays === 0) {
    return { status: 'today', label: '今天到期', diffDays, sort: 1 };
  }
  if (diffDays <= 7) {
    return { status: 'soon', label: `${diffDays} 天后到期`, diffDays, sort: 2 };
  }
  return { status: 'normal', label: `${diffDays} 天后`, diffDays, sort: 3 };
}

function enrichMaintainItem(item) {
  const statusInfo = getMaintainStatus(item.date);
  return {
    ...item,
    status: statusInfo.status,
    statusLabel: statusInfo.label,
    statusSort: statusInfo.sort,
    diffDays: statusInfo.diffDays
  };
}

function getMaintainListEnriched() {
  return getList(MAINTAIN_KEY)
    .map(enrichMaintainItem)
    .sort((a, b) => {
      if (a.statusSort !== b.statusSort) return a.statusSort - b.statusSort;
      return (a.diffDays ?? 9999) - (b.diffDays ?? 9999);
    });
}

function getMaintainAlerts() {
  const list = getMaintainListEnriched();
  const overdue = list.filter((i) => i.status === 'overdue');
  const today = list.filter((i) => i.status === 'today');
  const soon = list.filter((i) => i.status === 'soon');
  return {
    overdue,
    today,
    soon,
    alertCount: overdue.length + today.length,
    hasAlert: overdue.length + today.length > 0
  };
}

function addMaintain(item) {
  const list = getList(MAINTAIN_KEY);
  list.unshift({ ...item, id: Date.now() });
  saveList(MAINTAIN_KEY, list);
  return list;
}

function removeMaintain(id) {
  const list = getList(MAINTAIN_KEY).filter((i) => i.id !== id);
  saveList(MAINTAIN_KEY, list);
  return list;
}

function addFuel(record) {
  const list = getList(FUEL_KEY);
  list.unshift({ ...record, id: Date.now() });
  saveList(FUEL_KEY, list);
  return list;
}

function removeFuel(id) {
  const list = getList(FUEL_KEY).filter((i) => i.id !== id);
  saveList(FUEL_KEY, list);
  return list;
}

module.exports = {
  getMaintainList: () => getList(MAINTAIN_KEY),
  getMaintainListEnriched,
  getMaintainAlerts,
  addMaintain,
  removeMaintain,
  getFuelList: () => getList(FUEL_KEY),
  addFuel,
  removeFuel
};

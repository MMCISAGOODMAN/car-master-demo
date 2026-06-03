const KEY = 'car_favorites';

function getAll() {
  return wx.getStorageSync(KEY) || { parts: [], faults: [] };
}

function save(data) {
  wx.setStorageSync(KEY, data);
}

function isPartFavorite(id) {
  return getAll().parts.some((p) => p.id === id);
}

function isFaultFavorite(id) {
  return getAll().faults.some((f) => f.id === id);
}

function togglePart(part) {
  const data = getAll();
  const idx = data.parts.findIndex((p) => p.id === part.id);
  if (idx >= 0) {
    data.parts.splice(idx, 1);
    save(data);
    return false;
  }
  data.parts.unshift({
    id: part.id,
    name: part.name,
    categoryName: part.categoryName,
    imageUrl: part.imageUrl,
    savedAt: Date.now()
  });
  save(data);
  return true;
}

function toggleFault(fault) {
  const data = getAll();
  const idx = data.faults.findIndex((f) => f.id === fault.id);
  if (idx >= 0) {
    data.faults.splice(idx, 1);
    save(data);
    return false;
  }
  data.faults.unshift({
    id: fault.id,
    title: fault.title,
    categoryName: fault.categoryName,
    dangerLevel: fault.dangerLevel,
    savedAt: Date.now()
  });
  save(data);
  return true;
}

function removePart(id) {
  const data = getAll();
  data.parts = data.parts.filter((p) => p.id !== id);
  save(data);
}

function removeFault(id) {
  const data = getAll();
  data.faults = data.faults.filter((f) => f.id !== id);
  save(data);
}

module.exports = {
  getAll,
  isPartFavorite,
  isFaultFavorite,
  togglePart,
  toggleFault,
  removePart,
  removeFault
};

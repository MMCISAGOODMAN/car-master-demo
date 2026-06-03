const KEY = 'car_garage';

function getCar() {
  return wx.getStorageSync(KEY) || null;
}

function saveCar(car) {
  wx.setStorageSync(KEY, { ...car, updatedAt: Date.now() });
  return getCar();
}

function clearCar() {
  wx.removeStorageSync(KEY);
}

module.exports = { getCar, saveCar, clearCar };

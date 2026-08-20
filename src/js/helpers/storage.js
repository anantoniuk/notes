export const save = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Не вдалося зберегти дані в сховище !!", error);
  }
};

export const load = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : null;
  } catch (error) {
    console.error("Не вдалося завантажити дані зі сховище !!", error);
  }
};

export const remove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Не вдалося видалити дані за ключем ${key} !!`, error);
  }
};

export const clear = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Не вдалося очистити сховище !!", error);
  }
};

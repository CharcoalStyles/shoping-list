import { openDB } from "idb";
import { uid } from "uid";

import axios from "axios";

type InitData = {
  url: string;
  count?: number;
} & (PostData | DeleteData);

type CompleteData = {
  url: string;
  count: number;
} & (PostData | DeleteData);

type PostData = {
  method: "POST";
  body: any;
};

type DeleteData = {
  method: "DELETE";
};

const store = "push-data";

const dbPromise = () => openDB("data.offline", 1, {
  upgrade(db) {
    db.createObjectStore(store, {
      keyPath: "key",
    });
  },
});

async function get(key: string) {
  return (await dbPromise()).get(store, key);
}

async function set(key: string, val: CompleteData) {
  return (await dbPromise()).put(store, {
    ...val,
    fetchTime: new Date().getTime(),
    key,
  });
}

async function listKeys() {
  return (await dbPromise()).getAllKeys(store);
}

export const pushData = async (data: InitData | CompleteData) => {
  const updatedData: CompleteData =
    data.count !== undefined
      ? { ...data, count: data.count + 1 }
      : { ...data, count: 1 };

  console.log({ updatedData })

  let response = null;

  switch (data.method) {
    case "POST":
      response = axios.post(data.url, data.body);
      break;
    case "DELETE":
      response = axios.delete(data.url);
      break;
  }

  try {
    await response;
    return true;
  } catch (error) {
    if (updatedData.count <= 3) {
      //save the data to the database
      await set(uid(), updatedData);
    }

    return false;
  }

};

export const processQueue = async () => {
  const keys = await listKeys();

  keys.forEach(async (key) => {
    const data = await get(key.toString());

    await pushData(data);
    await (await dbPromise()).delete(store, key);
  });
};

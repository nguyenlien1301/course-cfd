import Cookies from "js-cookie";
import { STORAGE } from "../constants/storage";

export const localToken = {
  get: () => JSON.parse(localStorage.getItem(STORAGE.token)),
  set: (token) => localStorage.setItem(STORAGE.token, JSON.stringify(token)),
  remove: () => localStorage.removeItem(STORAGE.token),
};
export const cookieToken = {
  // get: () =>
  //   JSON.parse(
  //     Cookies.get(STORAGE.token) === undefined
  //       ? null
  //       : Cookies.get(STORAGE.token)
  //   ),
  get: () => {
    const cookieValue = Cookies.get(STORAGE.token);
    return cookieValue ? JSON.parse(cookieValue) : null;
  },
  set: (token) => Cookies.set(STORAGE.token, JSON.stringify(token)),
  remove: () => Cookies.remove(STORAGE.token),
};

export const tokenMethod = {
  get: () => {
    // nếu muốn dùng local thì đóng cooki và ngc lai
    // return localToken.get()
    return cookieToken.get();
  },
  set: (token) => {
    // return localToken.set()
    return cookieToken.set(token);
  },
  remove: () => {
    // return localToken.remove()
    return cookieToken.remove();
  },
};

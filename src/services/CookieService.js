import Cookies from "universal-cookie";
const cookies = new Cookies();
class CookieService {
  getCookie(name) {
    return cookies.get(name);
  }

  setCookie(name, value, options) {
    cookies.set(name, value, options);
  }

  removeCookie(name) {
    cookies.remove(name);
  }
}

export default new CookieService();

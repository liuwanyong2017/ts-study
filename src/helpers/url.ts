import {encode, isDate, isPlainObject} from "./util";

const makeURL = (url: string, params?: any): string => {
  const parts: string[] = [];
  if (params) {
    Object.keys(params).map(
      key => {
        const val = params[key];
        if (val === null || val === undefined) return;
        let values = [];
        if (Array.isArray(val)) {
          key += "[]";
          values = val;
        } else {
          values.push(val);
        }
        values.map(
          val => {
            if (isDate(val)) {
              val = val.toISOString();
            } else if (isPlainObject(val)) {
              val = JSON.stringify(val);
            }
            parts.push(`${encode(key)}=${encode(val)}`);
          }
        );
      }
    );
  }
  let serializedParams = parts.join("&");
  if (serializedParams) {
    const markIndex = url.indexOf("#");
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf("?") >= 0 ? "&" : "?") + serializedParams;
  }
  return url;
};

export default makeURL;

interface URLOrigin {
  host: string
  protocol: string
}

export function isURLSameOrigin(url: string): boolean {
  const currentOrigin = resolveURL(window.location.href);
  const parsedOrigin = resolveURL(url);
  return currentOrigin.host === parsedOrigin.host &&
    currentOrigin.protocol === parsedOrigin.protocol;
}

const urlParsingNode = document.createElement("a");

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute("href", url);
  const {protocol, host} = urlParsingNode;
  return {
    protocol, host
  };
}

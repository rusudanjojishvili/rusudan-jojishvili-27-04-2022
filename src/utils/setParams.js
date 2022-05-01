// reusable function for setting the query params of axios
export function setParams(props) {
    let params = new URLSearchParams();
  
    for (const property in props) {
      if (props[property] !== undefined && props[property] !== null && props[property] !== '') {
        params.append(`${property}`, props[property]);
      }
    }
  
    let request = {
      params,
      paramsSerializer: (params) => {
        let result = '';
        for (const [key, value] of params) {
          result += `${key}=${encodeURIComponent(value)}&`;
        }
        return result.substring(0, result.length - 1);
      },
    };
  
    return request
  }
import fetch from 'smooth-fetch';
import qs from 'qs';

const {
  API_PROTOCOL,
  API_HOSTNAME,
  API_PORT,
  IS_CORS,
} = process.env;

/**
 * Call fetch api to access auth protected resources
 * Resolve and reject promises based on status code
 * Support fetch api with queries
 * @param {string} resource - Resource path
 * @param {Object} config - Fetch options
 * @return {Object}
 */
export const requestProtected = fetch(
  `${API_PROTOCOL}://${API_HOSTNAME}:${API_PORT}`,
  {
    mode: IS_CORS === true ? 'cors' : 'same-origin',
    queryFormatter: (query) => {
      return qs.stringify(query, {
        indices: false,
      });
    },
  },
);

import Service from '@ember/service';
import require, { has } from 'require';

let _fetch = function () {
  throw new Error("It seems you have neither fetch nor jQuery available");
}

if (has('fetch')) {
  // use `fetch` module by default, this is commonly provided by ember-fetch
  _fetch = require('fetch').default;
} else if (typeof fetch === 'function') {
  // fallback to using global fetch
  _fetch = fetch;
} 

const hasJQuery = typeof jQuery !== 'undefined';

export default Service.extend({
  host: 'https://api.mapbox.com',

  async request(endpoint) {
    let url = this.host + endpoint;

    if (hasJQuery) {
      return jQuery.getJSON(url);
    } else {
      let response = await _fetch(url);
      return response.json();
    }
  }
});

import Service from '@ember/service';
import require, { has } from 'require';

const hasEmberAjax = has('ember-ajax');
const hasEmberFetch = has('fetch');

let _fetch;
let _request;

if (hasEmberFetch) {
  // use `fetch` module by default, this is commonly provided by ember-fetch
  _fetch = require('fetch').default;
} else if (typeof fetch === 'function') {
  // fallback to using global fetch
  _fetch = fetch;
} else {
  _fetch = function() {
    throw new Error("It seems you have neither fetch nor jQuery available, you may want to `ember install ember-fetch`.");
  }
}

if (hasEmberAjax) {
  _request = require('ember-ajax/request').default;
}

export default Service.extend({
  host: 'https://api.mapbox.com',

  async request(endpoint) {
    let url = this.host + endpoint;

    if ( hasEmberFetch ) {
      return await this._useFetch(url);
    } else if (hasEmberAjax) {
      return await _request(url);
    } else {
      return await this._useFetch(url);
    }
  },

  async _useFetch(url) {
    let response = await _fetch(url);
    return response.json();    
  }
});

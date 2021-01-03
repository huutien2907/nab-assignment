// eslint-disable-next-line
const NodeEnvironment = require('jest-environment-node');
const getBrowser = require('./getBrowser');
const jest = require('jest-mock');

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

class PuppeteerEnvironment extends NodeEnvironment {
  // Jest is not available here, so we have to reverse engineer
  // the setTimeout function, see https://github.com/facebook/jest/blob/v23.1.0/packages/jest-runtime/src/index.js#L823
  setTimeout(timeout) {
    if (this.global.jasmine) {
      // eslint-disable-next-line no-underscore-dangle
      this.global.jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    } else {
      this.global[Symbol.for('TEST_TIMEOUT_SYMBOL')] = timeout;
    }
  }

  async setup() {
    const browser = await getBrowser();
    const page = await browser.newPage();
    this.global.browser = browser;
    this.global.page = page;

    function copyProps(src, target) {
      Object.defineProperties(target, {
        ...Object.getOwnPropertyDescriptors(src),
        ...Object.getOwnPropertyDescriptors(target),
      });
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // deprecated
          removeListener: jest.fn(), // deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
    }

    this.global.window = window;
    this.global.document = window.document;
    this.global.navigator = {
      userAgent: 'node.js',
    };
    this.global.HTMLElement = window.HTMLElement;
    this.global.requestAnimationFrame = function (callback) {
      return setTimeout(callback, 0);
    };
    this.global.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
    copyProps(window, global);
  }

  async teardown() {
    const { page, browser } = this.global;

    if (page) {
      await page.close();
    }

    if (browser) {
      await browser.disconnect();
    }

    if (browser) {
      await browser.close();
    }
  }
}

module.exports = PuppeteerEnvironment;

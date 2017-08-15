const chai = require('chai');
const { Builder, By, until, Button } = require("selenium-webdriver");
const { assert } = chai;
const config = require('../../config');
const locator = require('./locator');

describe('鼠标右键', function () {
  let driver;
  this.timeout(30 * 1000);    //每个用例执行超时30秒。

  before(function () {
    driver = new Builder()
      .forBrowser("chrome")
      .build();
  });

  after(function () {
    return driver.quit(); //必须返回quit()返回值，否则浏览器无法自动关闭
  })

  it('点击右键', function () {
    return driver.get(locator.home.url)
      .then(_ => driver.wait(until.titleIs("鼠标点击测试"), 10000))
      .then(_ => driver.sleep(5000))  //等待，方便观察。
      .then(_ => driver.findElement(locator.home.body))
      .then(el => driver.actions().mouseMove(el).click(Button.RIGHT).perform())
      .then(_ => driver.sleep(3000))  //等待，方便观察。
  });

});
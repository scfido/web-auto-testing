const chai = require('chai');
const { Builder, By, until } = require("selenium-webdriver");
const { assert } = chai;
const config = require('../../config');
const locator = require('./locator');

describe('selenium web driver', function () {
  this.timeout(30 * 1000);    //每个用例执行超时30秒。
  let driver;

  before(function () {
    driver = new Builder()
      .forBrowser("chrome")
      .build();
  });

  after(function () {
    return driver.quit(); //必须返回quit()返回值，否则浏览器无法自动关闭
  })

  it('baidu home page', function () {
    return driver.get(locator.baidu.url)
      .then(_ => driver.sleep(2000))  //等待5秒。这里并不需要sleep，只是演示sleep功能。
      .then(_ => driver.wait(until.titleIs("百度一下，你就知道"), 10000))
  });

  it("禅道首页", function () {
    return driver.get(locator.zentao.url)
      .then(_ => driver.wait(until.titleContains("禅道开源项目管理软件"), 10000))
  });


  it("错误密码登陆禅道", function () {
    return driver.get(locator.zentao.urls.login)
      .then(_ => driver.wait(until.titleIs("用户登录 - 禅道"), 10000))
      .then(_ => driver.findElement(locator.zentao.input_accont).sendKeys(config.username))
      .then(_ => driver.findElement(locator.zentao.input_password).sendKeys(config.wrongPassword))
      .then(_ => driver.findElement(locator.zentao.button_submit).click())
      .then(_ => driver.switchTo().alert()) //切换到错误提示对话框
      .then(alert => alert.dismiss())       //确认对话框
  });

  it("正确密码登陆禅道", function () {
    return driver.findElement(locator.zentao.input_accont)
      .then(e => {
        e.clear();
        e.sendKeys(config.username)
      })
      .then(_ => driver.findElement(locator.zentao.input_password))
      .then(e => {
        e.clear();
        e.sendKeys(config.password)  //password替换成正确的密码
      })
      .then(_ => driver.findElement(locator.zentao.button_submit).click())
      .then(_ => driver.wait(until.titleIs("我的地盘 - 禅道"), 10000))
  });

});
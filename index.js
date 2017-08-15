const webdriver = require("selenium-webdriver");
const By = webdriver.By;
const until = webdriver.until;

let driver = new webdriver.Builder()
    .forBrowser("chrome")
    .build();
driver.get("http://192.168.0.1");
driver.wait(until.titleIs("内部管理系统汇总"), 5000);
driver.quit();
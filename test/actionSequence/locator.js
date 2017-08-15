const { By } = require("selenium-webdriver");
const path = require("path");

module.exports = {
    /** 测试首页 */
    home: {
        /** 首页 */
        url: "file://" + path.resolve(__dirname ,"../../pages/actionSequence.html"),
        /** 窗口内容 */
        body: By.id("main")
    }
}
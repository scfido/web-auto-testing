const { By } = require("selenium-webdriver");

module.exports = {
    /** 百度搜索 */
    baidu: {
        /** 首页 */
        url: "http://www.baidu.com",
        /** 搜索框 */
        link_zentao: By.id("kw")
    },
    /** 禅道首页 */
    zentao: {
        url: "http://www.zentao.net/",
        //页面内的其它链接
        urls: {
            /**登陆禅道Demo */
            login: "http://demo.zentao.net/"
        },
        /** 用户名输入框*/
        input_accont: By.name("account"),
        /** 登陆密码*/
        input_password: By.name("password"),
        /** 登陆按钮 */
        button_submit: By.id("submit")
    }
}
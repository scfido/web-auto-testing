let assert = require('chai').assert;
let webapi = require('../utils/webapi');

describe('CMS 5 WebAPI接口', function () {
    this.slow(450);

    it("载入WebAPI测试工具", function () {
        assert.isObject(webapi);
    });

    it("异步测试", function (done) {
        webapi.get("http://localhost:5000/cms/api/version?sleep=10")
            .then(json => {
                assert.isOk(json);
                done();
            })
    });


    it("Promise支持测试", function () {
        return webapi.get("http://localhost:5000/cms/api/version?sleep=10")
            .then(json => {
                assert.isOk(json);
            })
    });

    it('获取API版本号', function () {
        const ok = { version: "1.0" }
        // this.timeout(1000);

        return webapi.get("http://localhost:5000/cms/api/version?sleep=100")
            .then(json => {
                assert.deepEqual(json, ok)
            })
    });
});
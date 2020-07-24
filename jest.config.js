module.exports = {
  testMatch: ["**/*.test.js"],
  // 是否手机测试时的覆盖率
  collectCoverage: true,
  // 指定哪些文件需收集覆盖率信息
  collectCoverageFrom: ["src/*.js", "!**/node_modules"]
}
const assert = require("assert");
const isGray = require("..").isGray;

function test(grayRule, accountDesc, expected) {
  assert.equal(isGray(grayRule, accountDesc), expected);
  isGray(grayRule, accountDesc);
  console.log(`"${grayRule}" with "${accountDesc}" is ${expected}`);
}

test("white:zwork", "E.zwork.1", true);
test("white:companya", "E.zwork.1", false);
test("white:zwork|zworktest", "E.zwork.1", true);
test("white:zwork|zworktest", "E.zworktest.1", true);
test("white:zwork.1,3,5", "E.zwork.3", true);
test("white:zwork.1,3,5", "E.zwork.7", false);
test("white:zwork.1-100", "E.zwork.99", true);
test("white:zwork.1-100", "E.zwork.1", true);
test("white:zwork.1-100", "E.zwork.101", false);

test("allow", "E.zwork.101", true);
test("deny", "E.zwork.101", false);

test("white:zwork.%7", "E.zwork.7", true);
test("white:zwork.%7", "E.zwork.14", true);
test("white:zwork.%7", "E.zwork.13", false);

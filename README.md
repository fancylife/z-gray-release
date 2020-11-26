# z-gray-release.js

## 快速开始
```
const isGray = require('z-gray-release').isGray;
isGray('white:zwork','E.zwork.1'); // true or false

```

## 企业级灰度策略

||||
|--- |--- |--- |
|配置|说明|规则|
|white:zwork|只有zwork企业的⼈可以访问|开放单个企业|
|white:zwork|zworktest|只有zwork/zworktest企业可以访问|开放多个企业|
|white:zwork.1,3,5|只有zwork.1,zwork.3,zwork.5这三个⼈可以访问|开放部分员⼯|
|white:zwork.1-100|只有zwork.1-100前100号员⼯可以访问|开放ID区间|
|allow|任何企业都可以访问, 和 white:* ⼀样|放全量|
|deny|任何企业都不能访问, 和 black:* ⼀样|关闭灰度|

TODO
||||
|--- |--- |--- |
|white:zwork.%7|zwork企业员⼯ id%7==0 才可以访问，⽐如zwork.7,zwork.14|百分⽐|
|white:%3|任何企业id%3 == 0 就可以访问(如果企业id⾮数字，则为 id.hashcode%3 == 0)|放量33%|
|white:*.%4|任何企业,员⼯id%4 == 0 就可以访问|员⼯id百分⽐|
|white:%3.%4|任何企业id%3 == 0并且员⼯id%4 == 0 就可以访问|企业及员⼯id百分⽐|


## Test

```
npm run test;
```

# sofa-template

react boilerplate for sofa.

## npm run create [pageName]

## 开发手册

1、必要时，请将表单数据与Redux进行绑定，以减少不必要的关于表单是否清空等引起的问题；在示例部分将检索表单、创建表单都进行了绑定；

2、由于lodash库较大，使用时尽量按需引入，勿全量引入；

``` javascript
// bad
import { isEmpty } from 'lodash';
import _ from 'lodash';

// good
import isEmpty from 'lodash/isEmpty';

```

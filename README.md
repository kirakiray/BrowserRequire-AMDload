# BrowserRequire-AMDload

Make BrowserRequire support AMD Module

让BrowserRequire支持AMD模块。

###优点

插件压缩代码只有1kb左右，加上BrowserRequire一共7kb左右，比requirejs的压缩文件还小。

###缺点

不支持requirejs模块的Common Wrapper语法。

```javascript
//AMD Module
define(['moduleA','moduleB'],function(a,b){
	return a + b;
});
```

```javascript
//requirejs Common Wrapper
define(['require','moduleA','moduleB'],function(require){
	var a = require('moduleA'),
	b = require('moduleB');
	return a + b;
});
```

Common Wrapper天生与BrowserRequire不合，即使添加了AMD模块兼容插件(AMDload)，带Common Wrapper的AMD模块将无法运行在BrowserRequire上。

###目录介绍

dist————br-AMDload插件的压缩文件

src————br-AMDload插件的源代码

###使用插件

```html
<script src="js/br.js"></script>
<!--框架主文件-->
<script src="js/br-AMDload.js"></script>
<!--AMDload插件-->
```

或采用异步方式添加，详情请查看[插件使用文档](https://github.com/kirakiray/BrowserRequire/wiki/插件使用和介绍)

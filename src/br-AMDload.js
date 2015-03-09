//让browserRequire使用AMD规范的模块
/**
    @fileoverview br.js兼容AMD模块（requireJS模块）插件
    但不兼容带有CMD模块兼容语法的AMD模块
*/
require.extend(function (baseResources, F, C, R, Global) {
    //展开C
    var Require = C.Require,
        BindEvent = C.BindEvent,
        GatherFunction = C.GatherFunction,
        CombRequire = C.CombRequire;
    //私有方法（模块过滤器）
    var filterModule = function (args) {
        var arg0 = args[0],
            arg1 = args[1],
            arg2 = args[2];
        //判断是否browserRequire模块定义规范
        if ((args.length == 1) || (args.length == 2 && (F.getType(arg1) == "string" || F.getType(arg1) == "array"))) {
            R.define.apply(R, args);
            return;
        } else {
            //非browserRequire模块定义规范，AMD规范
            //写入临时模块
            var tempM = {
                //模块的内容
                main: "",
                names: []
            };
            //模块内容，依赖模块
            var contentFun, dependModule;
            if (args.length == 2 && F.getType(arg0) == 'array' && F.getType(arg1) == 'function') {
                //第1参数为数组，第2参数为函数的参数下，为AMD模块
                contentFun = arg1, dependModules = arg0;
            } else if (args.length == 3 && F.getType(arg0) == 'string' && F.getType(arg1) == 'array' && F.getType(arg2) == 'function') {
                //第1参数为字符串，第二参数为数组，第三参数为函数，为AMD模块
                contentFun = arg2, dependModules = arg1;
                tempM.names.push(arg0);
            }
            baseResources.tempM = tempM;
            //优化操作
            if (dependModules.length) {
                //注册载入模块
                var reObj = R.defindedRequire.apply(R, dependModules);
                reObj.ready = function () {
                    tempM.main = contentFun.apply(F.create(window), arguments);
                };
            } else {
                //没有参数的立即执行
                tempM.main = contentFun.apply(F.create(window), arguments);
            }
            return;
        }
    };
    //旧的define
    var oldDefine = Global.define;
    //兼容模块
    Global.define = function () {
        //转换成数组
        var args = F.transArgumtnts(arguments);
        //进入模块过滤器
        args = filterModule(args);
    };
    F.extend(Global.define, oldDefine);
    //扩展AMD属性
    Global.define.amd = {
        jQuery: true,
        value: "browserRequire"
    };
}, 'AMDload');
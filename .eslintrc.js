/*module.exports = {
    "env": {
        "browser": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "camelcase": 2, // 强制驼峰法命名
        "id-match": 2, // 禁止重复定义
        "indent": [2,"tab"], // 缩进采取Tab
        "semi": [2, "always"], // 语句强制分号结尾
        "quotes": [2,"single"], // 引号类型 单引号
        "no-dupe-args": 2,// 函数参数不能重复
        "curly": [2, "all"],//必须使用 if(){} 中的{}
        "one-var":2, // 语句块不允许出现连续两个var
        "vars-on-top": 2, // 定义的变量必须在作用域的顶部
        "newline-after-var": 2, // 定义完变量必须换一行
        "space-before-blocks": [2, "always"],//不以新行开始的块{前面要不要有空格
        "space-before-function-paren": [2, "never"],//函数定义时括号前面要不要有空格
        "no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格
        "space-in-parens": [2, "never"],//小括号里面要不要有空格
        "space-infix-ops": 2,//中缀操作符周围要不要有空格
        "space-unary-ops": [2, { "words": true, "nonwords": false }],//一元运算符的前/后要不要加空格
        "spaced-comment": 2,//注释风格要不要有空格什么的
        "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
        "operator-linebreak": [2, "after"],// 换行时运算符在行尾还是行首
        "no-unneeded-ternary": 2,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
        "no-unreachable": 2,// 不能有无法执行的代码
        "default-case": 2,//switch语句最后必须有default
        "no-sequences": 0,//禁止使用逗号运算符
        "no-empty": 2,// 块语句中的内容不能为空
        "no-eq-null": 2, // 禁止对null使用==或!=运算符
        "eqeqeq": 2,//必须使用全等
        "use-isnan": 2,// 禁止比较时使用NaN，只能用isNaN()
        "no-underscore-dangle": 2, //标识符不能以下划线开头
        "no-undef": 2, // 不能有未定义的变量
        "no-use-before-define": 2,// 未定义前不能使用
        "no-unused-vars": [1, {"vars": "all", "args": "after-used"}],// 不能有声明后未被使用的变量或参数 
        "no-alert": 1, // 警告弹窗
        "no-console": 1, // 警告控制台输出
        "no-debugger": 1, // 警告debugger
        "no-trailing-spaces": 1, //一行结束后不能有空格
        "eol-last": 0, //文件以单一的换行符结尾
        "padded-blocks": 0,//块语句内行首行尾是否要空行
    }
};*/
// Proxy test

// const target = { name: 'tony' }
// const repersentative = new Proxy(target, {
//     get(target, key) {
//         return key in target ? target[key]: 'undefined'
//     },
//     set(target, key, value) {
//         target[key] = value
//     },
// })

/**
 * vue.js Proxy
 * 响应式
**/

// 集合, Set中的元素只会出现一次, 具有唯一性
const bucket = new Set();

// 目标对象
const target = { text: 'hello world' }

// 原始数据代理
const obj = new Proxy(target, {
    get(target, key) {
        bucket.add(effect);

        return key in target ? target[key]: 'undefined'
    },

    set(target, key, newVal) {
        // 设置属性
        target[key] = newVal;

        // 取出副作用函数并执行
        bucket.forEach( fn => {
            fn();
        });

        // 设置成功
        return true;
    }
})

// 副作用函数
function effect() {
    document.body.innerText = obj.text
}
// 执行副作用函数，触发读取操作
effect();

//修改响应式数据
setTimeout(() => {
   obj.text = 'hello proxy'
}, 1000)








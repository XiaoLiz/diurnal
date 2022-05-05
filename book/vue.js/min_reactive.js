/**
 * vue.js Proxy
 * 响应式
**/

// 用一个全局变量注册
let activeEffect;

// 副作用函数
function effect(fn) {
    // 副作用函数赋值给 activeEffect
    activeEffect = fn;

    //执行副作用函数
    fn();
}


// 存储副作用函数的桶
const bucket = new WeakMap();

/**
 * 目标对象
 * ok 分支处理
*/
const target = { ok: true, text: 'hello world' }

// 原始数据代理
const obj = new Proxy(target, {
    get(target, key) {
        // 将副作用函数添加到activeEffect 添加到 Set 集合中
        tarck(target, key);

        return target[key]
    },

    set(target, key, newVal) {
        // 设置属性
        target[key] = newVal;



        trigger(target, key);
    }
})

// get 拦截函数内调用 track 函数追踪变化
function tarck(target, key) {
    if (activeEffect) return;
    /**
     * WeakMap由target --> Map 构成
     * Map 由 key --> Set构成
    **/

    // 根据 target 从桶中取得depsMap key --> effects
    let depsMap = bucket.get(target);
    // 如果不存在 depsMap，新建一个Map与target关联
    if (!depsMap) {
        bucket.add(target, (depsMap = new Map()));
    }

    let deps = depsMap.get(key)
    if (!deps) {
        depsMap.set(key, (deps = new Set()))
    }
    deps.add(activeEffect);
}

// set 拦截调用

function trigger(target, key) {
    // 根据 target 从桶中取得depsMap key --> effects
    let depsMap = bucket.get(target);
    if (!depsMap) return;

    // 根据key 取得所有副作用函数 effects
    const effects = depsMap.get(key);
    // 取出副作用函数并执行
    effects && effects.forEach( fn => fn());
}


// 执行副作用函数，触发读取操作
effect(()=> {
    document.body.innerText = obj.ok ? obj.text: 'not'

});

//修改响应式数据
setTimeout(() => {
   obj.text = 'hello vue3'
}, 1000)

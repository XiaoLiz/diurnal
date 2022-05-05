
// 用一个全局变量注册
let activeEffect;

// 存储副作用函数的桶
const bucket = new WeakMap();

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
    if (!activeEffect) return;

    // 根据 target 从桶中取得depsMap key --> effects
    let depsMap = bucket.get(target);
    // 如果不存在 depsMap，新建一个Map与target关联
    if (!depsMap) {
        bucket.set(target, (depsMap = new Map()));
    }

    let deps = depsMap.get(key)
    if (!deps) {
        depsMap.set(key, (deps = new Set()))
    }

    // 当前激活的副作用函数添加到依赖集合 deps 中
    deps.add(activeEffect);

    // 将其添加到 activeEffect.deps数组中
    activeEffect.deps.push(deps);
}

// set 拦截调用
function trigger(target, key) {
    console.log('trigger');

    // 根据 target 从桶中取得depsMap key --> effects
    let depsMap = bucket.get(target);
    if (!depsMap) return;

    // 根据key 取得所有副作用函数 effects
    const effects = depsMap.get(key);
    // 取出副作用函数并执行
    // effects && effects.forEach( fn => fn());
    const effectsToRun = new Set(effects)
    effectsToRun && effectsToRun.forEach( effectFn => effectFn());
}

// 副作用函数
function effect(fn) {
    const effectFn = () => {
        // cleaup 函数完成清除工作
        cleanup(effectFn);
        // 当effectFn执行时，将其设置为当前激活的副作用函数
        activeEffect = effectFn;
        fn();
    }

    // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
    effectFn.deps = [];
    //执行副作用函数
    effectFn();
}

function cleanup(effectFn) {
    for (let i = 0; i < effectFn.deps.length; i++) {
        // deps是依赖集合
        const deps = effectFn.deps[i];
        // 将effect从依赖集合中移除
        deps.delete(effectFn)
    }
    //重置 effectFn.deps 数组
    effectFn.deps.length = 0
}

// 执行副作用函数，触发读取操作
effect(()=> {
    console.log(obj, 'proxy')
    document.body.innerText = obj.ok ? obj.text : 'not'
});

// //修改响应式数据
setTimeout(() => {
    obj.ok = false;
    setTimeout(() => {
        obj.text = 'hello vue3'
    }, 1000)
}, 1000)
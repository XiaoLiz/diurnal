# Clipboard.js 项目实战


### 一、clipboard.js 简介

clipboard.js 是一个用于将文本复制到剪贴板的 JS 库。没有使用 Flash，没有使用任何框架，开启 gzipped 压缩后仅仅只有 **3kb**。

![image-20210108072049160](/Users/liyi/Library/Application Support/typora-user-images/image-20210108072049160.png)

出现clipboard.js 初忠是什么？因为作者 Zeno Rocha 认为：

```
将文本复制到剪贴板应该不难。它不需要几十个步骤来配置，也不需要加载数百KB的文件。最最重要的是，它不应该依赖于Flash或其他任何框架。
```

该库依赖于 Selection 和 execCommand API，几乎所有的浏览器都支持 Selection API，而execCommand API 却存在一定的兼容性问题：

![image-20210108071957941](/Users/liyi/Library/Application Support/typora-user-images/image-20210108071957941.png)

(图片来源：https://www.caniuse.com/?search=Selection)

![image-20210108072710009](/Users/liyi/Library/Application Support/typora-user-images/image-20210108072710009.png)

(图片来源: https://www.caniuse.com/?search=execCommand%20copy)

![image-20210108072915260](/Users/liyi/Library/Application Support/typora-user-images/image-20210108072915260.png)

(图片来源：https://www.caniuse.com/?search=execCommand%20cut)
对于较老的浏览器，clipboard.js 也可以优雅地降级。好的，现在我们来看一下如何使用 clipboard.js。

### 二、Selection 与 execCommand API

#### 3.1 Selection API

`Selection` 对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。文本选区由用户拖拽鼠标经过文字而产生。要获取用于检查或修改的 Selection 对象，请调用 [`window.getSelection()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getSelection)。

#### 3.2 execCommand API

`document.execCommand` API 允许运行命令来操作网页中的内容，常用的命令有 **backColor**、
**bold** 、**copy**、**cut**、**delete**、**insertHTML**、**insertImage**、**fontSize**等。下面我们来看一下该 API 的语法：

```javascript
bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)
```

- aCommandName：字符串类型，用于表示命令的名称；
- aShowDefaultUI：布尔类型，用于表示是否展示用户界面，一般为 false；
- aValueArgument：额外参数，一些命令（比如 insertImage）需要额外的参数（提供插入图片的 URL），默认为 null。

 execCommand API 兼容性问题如何解决的呢？ 源码中提供了一个静态方法: `isSupported` 方法，用于检测当前的浏览器是否支持指定的命令：

```javascript
// action = 'copy'、'cut';
document.queryCommandSupported(action);
```

Document.queryCommandSupported 兼容性，具体的兼容性如下图所示：

![image-20210109135350956](/Users/liyi/Library/Application Support/typora-user-images/image-20210109135350956.png)



参考以上API，实现一个精简版demo， 代码如下:

```html
html:

<input id="target-text" class="modal_text" value="测试input复制文本" />
<button class="btn clipboard-target-btn" id="copyBtn">复制</button>
<button class="btn clipboard-target-btn" id="cancelBtn">取消</button>

<script>
   let target_element = document.getElementById("target-text");
    document.getElementById("copyBtn")
    .addEventListener("click", e =>  {
        // input DOM 复制文本
        if(target_element.nodeName === "INPUT") {
            target_element.focus();
            target_element.select();
            document.execCommand('copy');
        }

        //div DOM 或者其它元素复制
        else {
            const select_text = selectElementText(target_element);

            const ele = createInput(select_text);
            document.execCommand('copy');
          	destroy(ele);
        }
    })

   document.getElementById("copyBtn")
    .addEventListener("click", e =>  {

   })

    function createInput(str) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = str;
        input.style.position = 'absolute';
        input.style.top = '-9999px';
        input.style.left = '-9999px';
        document.body.appendChild(input);

        return input;
    }

    function selectElementText(target_element) {
        const selectedText = "";
        const selection = window.getSelection();      // 表示用户选择的文本范围或光标的当前位置。
        const range = document.createRange();         // 返回一个 Range 对象。

        selection.removeAllRanges();                // 会从当前selection对象中移除所有的range对象
        range.selectNodeContents(target_element);   // 方法用于设置 Range，使其包含一个 Node 的内容
        selection.addRange(range);  // 向选区（Selection）中添加一个区域（Range）。

        // console.log(selection, "selection 2")
        selectedText = selection.toString();
        return selectedText;
    }

    // 销毁 input 元素 HTMLInputElement
    function destroy(el) {
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
            el = null;
        }
    }

    function clearSelection(target_element) {
        if (target_element) {
            target_element.focus();
        }
        // 屏蔽默认键盘弹出
        document.activeElement.blur();
        window.getSelection().removeAllRanges();
    }
</script>
```

这个例子让用户使用按钮选择或取消选择一个段落。
Document.createRange()、Range.selectNodeContents() 和 Selection.addRange() 用于选择内容。
Window.getSelection() 和 Selection.removeAllRanges() 用于取消选择。

### 三、clipboard.js 使用

在使用 clipboard.js 之前，你可以通过 NPM 或 CDN 的方式来引用：

**NPM**:

```shell
npm install clipboard --save
```

**CDN:**

```shell
<script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js"></script>
```

**4.1 使用方式:**

```html
<input id="foo" type="text" value="这是一个测试文本">
<button class="btn" data-clipboard-action="copy" data-clipboard-target="#foo">复制</button>

<script>
  var clipboard = new ClipboardJS('.btn');
  clipboard.on('success', function(e) {
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
  });

  clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });
</script>
```

除了 `input` 元素之外，复制的目标还可以是 `div` 或 `textarea` 元素。
在以上示例中，我们复制的目标是通过 **data-\* 属性** 来指定。此外，我们也可以在实例化 clipboard 对象时，设置复制的目标：

```html
<button class="btn" data-clipboard-text="复制这是一个文本">Copy</button>

<script>
  var clipboard = new ClipboardJS('.btn');
  clipboard.on('success', function(e) {
      console.log(e.text, '====e.text====');
  });
  clipboard.on('error', function(e) {
    console.log(e, '====error====');
  });
</script>
```



###四、Clipboardjs 源码核心模块：

#### 4.1 Clipboard 类

根据参考示例，从最简单的用法去分析：

```html
<!-- 定义一些标记 -->
<input id="foo" type="text" value="这是一个测试文本">
<button class="btn" data-clipboard-action="copy" data-clipboard-target="#foo">复制</button>

<!-- 实例化 clipboard -->
<script>
  let clipboard = new ClipboardJS('.btn', {

  });
  clipboard.on('success', function(e) {
    console.log(e);
  });

  clipboard.on('error', function(e) {
    console.log(e);
  });
</script>
```

通过上面的初始化实例 ClipboardJS，我们可以快速地找到切入点 —— `new ClipboardJS('.btn')`
查找 “./src/clipboard.js”文件中的  clipboard 构造函数：

```javascript
import Emitter from 'tiny-emitter';
import listen from 'good-listener';

class Clipboard extends Emitter {
    constructor(trigger, options) {
        super();
        this.resolveOptions(options);
        this.listenClick(trigger);
    }
}
```

根据上面构造函数 的信息，this.resolveOptions(options)` 设置 Clipboard 的配置信息，暂时忽略，`
`继续看下面的 `listenClick` 方法是用来监听 `click` 事件，该方法的具体实现如下：

```javascript
import ClipboardAction from './clipboard-action';

// src/clipboard.js
listenClick(trigger) {
		this.listener = listen(trigger, 'click', (e) => this.onClick(e));
}

// src/clipboard.js
onClick(e) {
  const trigger = e.delegateTarget || e.currentTarget;

  // 为每次点击事件，创建一个新的ClipboardAction对象
  if (this.clipboardAction) {
    this.clipboardAction = null;
  }
  this.clipboardAction = new ClipboardAction({
    action    : this.action(trigger),
    target    : this.target(trigger),
    text      : this.text(trigger),
    container : this.container,
    trigger   : trigger,
    emitter   : this
  });
}
```

在 `onClick` 方法内部，会使用事件触发目标来创建 `ClipboardAction` 对象。当你点击本示例 **复制** 按钮时，创建的 `ClipboardAction` 对象如下所示：

![image-20210110093659271](/Users/liyi/Library/Application Support/typora-user-images/image-20210110093659271.png)



创建`ClipboardAction` 对象时，所使用到的方法都有了解。那么 `this.action`、`this.target` 和 `this.text` 这几个方法是在哪里定义的呢？通过阅读源码，我们发现在 `resolveOptions` 方法内部会初始化上述 3 个方法：

```javascript
resolveOptions(options = {}) {
	this.action    = (typeof options.action    === 'function') ? options.action    : this.defaultAction;
	this.target    = (typeof options.target    === 'function') ? options.target    : this.defaultTarget;
	this.text      = (typeof options.text      === 'function') ? options.text      : this.defaultText;
	this.container = (typeof options.container === 'object')   ? options.container : document.body;
}
```

在 **resolveOptions** 方法内部，如果用户自定义了处理函数，则会优先使用用户自定义的函数，否则将使用 `clipboard.js` 中对应的默认处理函数。由于我们在调用 `Clipboard` 构造函数时，并未设置 `options` 参数，所以将使用默认的处理函数:

![image-20210110121050170](/Users/liyi/Library/Application Support/typora-user-images/image-20210110121050170.png)

另一个 `defaultAction`、`defaultTarget` 和 `defaultText` 方法内部都会调用 `getAttributeValue` 方法来获取事件触发对象上自定义属性

```javascript
function getAttributeValue(suffix, element) {
    const attribute = `data-clipboard-${suffix}`;

    if (!element.hasAttribute(attribute)) {
        return;
    }

    return element.getAttribute(attribute);
}
```



#### 4.2 ClipboardAction 类

#### `ClipboardAction` 类被定义在 `src/clipboard-action.js` 文件内：

```javascript
// src/clipboard-action.js*
class ClipboardAction {
  	constructor(options) {
    		this.resolveOptions(options);
   			this.initSelection();
  	}
}
```

与 `Clipboard` 类的构造函数一样，`ClipboardAction` 类的构造函数会优先解析 `options` 配置对象，然后调用 `initSelection` 方法，来初始化选区。在 `initSelection` 方法中会根据 `text` 和 `target` 属性来选择不同的选择策:

```javascript
initSelection() {
  	if (this.text) {
    	this.selectFake();
  } else if (this.target) {
    	this.selectTarget();
  }
}
```

对于下面的示例，我们是通过 **data-\* 属性** 来指定复制的目标，即 `data-clipboard-target="#targetTtext"`，相应的代码如下：

```html
<div id="targetTtext">这是一个测试文本</div>
<button class="btn" data-clipboard-action="copy" data-clipboard-target="#targetTtext">复制</button>
```

element 自定义`target` 属性的情况，，则会进入 `else if` 分支，然后调用 `this.selectTarget` 方法：

```javascript
// src/clipboard-action.js
import select from 'select';

selectTarget() {
  this.selectedText = select(this.target);
  this.copyText();
}
```

在获取选中的文本之后，`selectTarget` 方法会继续调用 `copyText` 方法来复制文本,    调用 `this.handleResult` 方法来派发复制的状态信息：：

```javascript
copyText() {
    let succeeded;
    try {
      succeeded = document.execCommand(this.action);
    } catch (err) {
      succeeded = false;
    }
  	this.handleResult(succeeded);
}

handleResult(succeeded) {
    this.emitter.emit(succeeded ? 'success' : 'error', {
        action: this.action,
        text: this.selectedText,
        trigger: this.trigger,
        clearSelection: this.clearSelection.bind(this)
    });
}
```

`this.emitter` 对象是来自哪里的？`this.emitter` 对象也就是 `Clipboard` 实例：

```javascript
// src/clipboard.js
class Clipboard extends Emitter {
  onClick(e) {
    const trigger = e.delegateTarget || e.currentTarget;
    // 省略部分代码
    this.clipboardAction = new ClipboardAction({
      // 省略部分属性
      trigger   : trigger,
      emitter   : this // Clipboard 实例
    });
  }
}
```

#### 根据代码分析总结主要执行流程:

![image-20210111091629039](/Users/liyi/Library/Application Support/typora-user-images/image-20210111091629039.png)

###五、 Clipboard API

剪贴板 **Clipboard** **API** 提供了响应剪贴板命令（剪切、复制和粘贴）与异步读写系统剪贴板的能力。从权限 [Permissions API](https://developer.mozilla.org/zh-CN/docs/Web/API/Permissions_API) 获取权限之后，才能访问剪贴板内容；如果用户没有授予权限，则不允许读取或更改剪贴板内容。

该 API 被设计用来取代使用 [`document.execCommand()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand) 的剪贴板访问方式。

Navigator API: clipboard 兼容性

![image-20210108174453910](/Users/liyi/Library/Application Support/typora-user-images/image-20210108174453910.png)


参考资料:

1.[MDN execCommand](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand)
2.[MDN Selection](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)
3.[MDN Clipboard ](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard)
4.[Range对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)

实践demo：
[Codepen 原生API实现copy功能]( https://codepen.io/VoLi/pen/BaLqNEm?editors=1011)

应用场景:
[富文本编辑器](https://www.wangeditor.com/)


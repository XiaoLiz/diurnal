## DAY-LOG

### 2022-05-10

#### 知识点
- 回溯法
本质是回溯思想，实现回溯发的重点通常是实现递归。

*递归的实现考虑3个方面*：
- 搜索设计 、递归状态 、递归结束条件
- 搜索设计：
  - 对求解的空间进行**划分**，让**每一层**递归都去尝试搜索**一部分的空间解**，直至搜索完所有可能的解空间。
- 递归状态：
  - 用来区别不同递归，也是为了搜索而设计，主要用来标识当前**状态**，例如index找出当前可继续进行的**搜索空进**，进行下一层递归。- 某些情况携带多个状态，用来标记当前路径信息，比如path记录路径以及cur记录当前路径某个信息
- 递归结束条件：两个方面
  - 找到可行性解，提前结束搜索；
  - 搜索完毕，没有可搜索的解空间。

- 递归: 程序调用自身的编程技巧称为递归

- 深度优先遍历(DFS: Depth First Search)
  - DFS思路：沿着子树尽可能**深度搜索树分支**，达到叶子节点后通过**回溯**重复上述过程，知道所有的节点都被访问

- 双指针：指有两个游标指针指向不同的位置。双指针部署具体算法思想，而是一种解题技巧。


####  algorithm playground
- [46. 全排列](https://leetcode.cn/problems/permutations/description/)
- [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/description/)
- [剑指 Offer 06. 从尾到头打印链表](https://leetcode.cn/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)
- [剑指 Offer 35. 复杂链表的复制](https://leetcode.cn/problems/fu-za-lian-biao-de-fu-zhi-lcof/)


### 2022-05-09
- [15. 两数相加](https://leetcode.cn/problems/add-two-numbers/description/)
- [155. 最小栈](https://leetcode.cn/problems/min-stack/submissions/)
- [剑指 Offer 09. 用两个栈实现队列](https://leetcode.cn/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)
- [剑指 Offer 30. 包含min函数的栈](https://leetcode.cn/problems/bao-han-minhan-shu-de-zhan-lcof/)


### 2022-05-07
#### 知识点
- 二分法思想进行排序计算
- leftpad
- 运算符

#### algorithm playground
- [15. 三数之和](https://leetcode-cn.com/problems/3sum/description/)

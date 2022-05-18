## DAY-LOG

### 2022-05-18

- [二进制:原码、补码、反码](https://zhuanlan.zhihu.com/p/99082236)
- 2022-05-18
  - [704] 二分查找
  - [35] 搜索插入位置
  - [108] 将有序数组转换为二叉搜索树
  - [109] **有序链表转换二叉搜索树**
  - [654] 最大二叉树
  - [230] 二叉搜索树中第K小的元素
  - [700] 二叉搜索树中的搜索
  - [701] 二叉搜索树中的插入操作

### 2022-05-17

- **树结构**
  - [110] 平衡二叉树
  - [222] 完全二叉树的节点个数
  - [257] 二叉树的所有路径

  - 层级对比 (广度优先)
  - [102] 二叉树的层序遍历
  - [107] 二叉树的层序遍历 II
  - [199] 二叉树的右视图
  - [637] 二叉树的层平均值
  - [116] 填充每个节点的下一个右侧节点指针
  - [117] 填充每个节点的下一个右侧节点指针 II
  - [429] N 叉树的层序遍历
  - [515] 在每个树行中找最大值
  - [112] 路径总和
  - [404] 左叶子之和
  - [98] 验证二叉搜索树
  - [99] 恢复二叉搜索树


### 2022-05-16

- **链表**
  - [92] 反转链表 II
  - [160] 相交链表
  - [142] 环形链表 II

- **树结构**	
  - [100] 二叉树的前序遍历（迭代实现）
  - [144] 二叉树的前序遍历（迭代实现）
  - [100] 相同的树
  - [101] 对称二叉树
  - [111] 二叉树的最小深度
  - [114] 二叉树展开为链表
  - [617] 合并二叉树
  - [236] 二叉树的最近公共祖先
  - [543] 二叉树的直径
  - [572] 另一棵树的子树
 
### 2022-05-13

- **数组**
  - [26] 删除有序数组中的重复项
  - [27] 移除元素
  - [167] 两数之和 II - 输入有序数组
  - [283] 移动零
  - [209] **长度最小的子数组**
  - [344] 反转字符串
  - [977] 有序数组的平方

- **链表**
  - [19] 删除链表的倒数第 N 个结点
  - [21] 合并两个有序链表
  - [206] 翻转链表
  - [234] 回文链表
  - [876] 链表的中间结点


### 2022-05-13
#### 阅读
1.《神奇手账》如何正确使用手账 - 笔记
2. 梳理年度储蓄计划，进度40%

#### 考察知识点
1.**动态规划**
2.贪心算法思维
3.二分查找

- [300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/description/)
- [322. 零钱兑换](https://leetcode.cn/problems/coin-change/description/)
- [509. 斐波那契数](https://leetcode.cn/problems/fibonacci-number/)


### 2022-05-11
#### 阅读
《黑客与画家》

#### 知识点
1.贪心算法
2.动态规划
#### playground
- [79. 单词搜索-回溯](https://leetcode.cn/problems/word-search/)
- [455. 分发饼干](https://leetcode.cn/problems/assign-cookies/description/)
- [860. 柠檬水找零](https://leetcode.cn/problems/lemonade-change/description/)


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


#### algorithm playground
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

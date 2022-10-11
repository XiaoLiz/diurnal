# 零基础SQL教程

作为一名前端，学的数据库毕业后没有应用，已经忘光了。学习廖雪峰老师SQL教程源于页面基础数据分析应用。

## 查询数据

- 基本查询

要查询数据库表的数据，我们使用如下的SQL语句：

```sh
SELECT * FROM <表名>

SELECT * FROM events
```

使用SELECT *FROM events 时，SELECT是关键字，表示将要执行一个查询，’*‘表示所有列，FROM表示将要从events表查询数据。
查询的是一个二维表，key value

- 条件查询

```sh
SELECT * FROM <表名> WHERE <条件表达式>
SELECT * FROM events WHERE date >= '2022-10-10'
```

条件查询方式1：表达式可以用<条件1> AND <条件2>, 表达满足条件1并且满足条件2. 比如 时间大于等于 2022-10-11日的数据切 且限制查询分数

```sh
SELECT * FROM <表名> WHERE <条件表达式>

SELECT * FROM events
WHERE date >= '2022-10-10'
AND score >= 80
```

条件查询方式2：表达式可以用<条件1> or <条件2>, 二者为或关系

```sh
SELECT * FROM <表名> WHERE <条件表达式>
SELECT * FROM events WHERE date >= '2022-10-10' OR score >= 80
```

条件查询方式3：表达式可以用 NOT <条件>, 不如排除小于80分的 NOT score < 80， NOT一般不常用

```sh
SELECT * FROM <表名> WHERE NOT <条件表达式>
SELECT * FROM events NOT score < 80
```

*如果不加括号，条件运算按照NOT、AND、OR的优先级进行，即NOT优先级最高，其次是AND，最后是OR。加上括号可以改变优先级。*

- 投影查询

SELECT * 查询性能消耗太大，这种情况可以使用投影查询，返回希望列的数据，而不是所有列的数据，我们可以用SELECT 列1, 列2, 列3 FROM ...，
让结果集仅包含指定列。这种操作称为投影查询。

```sh
SELECT id, score, name FROM students
```

使用投影查询，并将列名重命名

```sh
SELECT id, score num, name FROM students
```

- 排序


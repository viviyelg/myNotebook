## git笔记

### 创建版本库（repository）

1. 创建一个空目录：

   ```
   $ mkdir learngit
   $ cd learngit
   $ pwd
   /Users/michael/learngit
   ```

2. 通过`git init` 把这个目录变成Git可以管理的仓库：

   ```
   $ git init
   ```

### 把文件添加到版本库

一定要放到learngit目录下（子目录亦可）

1. `git add` 把文件添加到仓库

   ```
   $ git add readme.txt
   ```

2. `git commit` 告诉Git, 把文件提交到仓库

   ```
   $ git commit -m "wrote a readme file" 
   ```

`git status` 可以让我们时刻掌握仓库当前的状态

`gti diff` 可以看到做了什么修改

### 版本回退 

1. `HEAD`指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。
2. 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。
3. 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

### 撤销修改

`git checkout -- file`可以丢弃工作区的修改：

一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。

### 删除文件

```
$ git rm test.txt
```



### 远程仓库

1. 创建SSH Key

   ```
   $ ssh-keygen -t rsa -C "youremail@example.com"
   ```

2. 登录GitHub，打开“Account settings”，“SSH Keys”页面；

   然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴`id_rsa.pub`文件的内容。

### 添加远程库

1. 登陆GitHub，然后，在右上角找到“Create a new repo”按钮，创建一个新的仓库

2. 我们根据GitHub的提示，在本地的`learngit`仓库下运行命令

3. 远程库的名字就是`origin`，这是Git默认的叫法，也可以改成别的，但是`origin`这个名字一看就知道是远程库

4. 把本地库的内容推送到远程，用`git push`命令，实际上是把当前分支`master`推送到远程。

   由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。

5. 从现在起，只要本地作了提交，就可以通过命令

   ```
   $ git push origin master
   ```

### 从远程库克隆

1. 登陆GitHub，创建一个新的仓库，名字叫`gitskills`

2. 用命令`git clone`克隆一个本地库

   ```
   $ git clone git@github.com:michaelliao/gitskills.git
   ```

### 创建与合并分支

1. 创建`dev`分支，然后切换到`dev`分支：

   ```
   $ git checkout -b dev
   ```

   `git checkout`命令加上`-b`参数表示创建并切换,相当于以下两条命令：

   ```
   $ git branch dev
   $ git checkout dev
   ```

2. 用`git branch`命令查看当前分支：

   ```
   $ git branch
   ```

3. `dev`分支的工作完成，我们就可以切换回`master`分支

   ```
   $ git checkout master
   ```

4. 把`dev`分支的工作成果合并到`master`分支上

   ```
   $ git merge dev
   ```

5. 删除`dev`分支

   ```
   $ git branch -d dev
   ```

### 解决冲突

- `git status`可以告诉我们冲突的文件

- 直接查看冲突文件内容，Git用`<<<<<<<`，`=======`，`>>>>>>>`标记出不同分支的内容

- 带参数的`git log`也可以看到分支的合并情况

  ```
  $ git log --graph --pretty=oneline --abbrev-commit
  ```


### 分支管理策略

### Bug分支

当手头工作没有完成时，先把工作现场`git stash`一下，然后去修复bug，修复后，再`git stash pop`，回到工作现场。

### 多人协作

多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin branch-name`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin branch-name`推送就能成功！

如果`git pull`提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream branch-name origin/branch-name`。

- 查看远程库信息，使用`git remote -v`；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

### 创建标签

- 命令`git tag `用于新建一个标签，默认为`HEAD`，也可以指定一个commit id；
- `git tag -a  -m "blablabla..."`可以指定标签信息；
- `git tag -s  -m "blablabla..."`可以用PGP签名标签；
- 命令`git tag`可以查看所有标签。


- 命令`git push origin `可以推送一个本地标签；
- 命令`git push origin --tags`可以推送全部未推送过的本地标签；
- 命令`git tag -d `可以删除一个本地标签；
- 命令`git push origin :refs/tags/`可以删除一个远程标签。

### 操作标签

- 命令`git push origin `可以推送一个本地标签；
- 命令`git push origin --tags`可以推送全部未推送过的本地标签；
- 命令`git tag -d `可以删除一个本地标签；
- 命令`git push origin :refs/tags/`可以删除一个远程标签。
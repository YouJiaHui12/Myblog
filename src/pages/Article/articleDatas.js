const articleDatas = {
  data: [
    {
      articleId: 'article1',
      articleName: 'React.js 小书',
      aricleDetail: `
* 很多课程一上来就给大家如何配置环境、怎么写 React.js 组件。但是本课程还是希望大家对问题的根源有一个更加深入的了解，其实很多的库、框架都是解决类似的问题。只有我们对这些库、框架解决的问题有深入的了解和思考以后，我们才能得心应手地使用它们，并且有新的框架出来也不会太过迷茫———因为其实它们解决都是同一个问题。
* 这两节课我们来探讨一下是什么样的问题导致了我们需要前端页面进行组件化，前端页面的组件化需要解决什么样的问题。后续课程我们再来看看 React.js 是怎么解决这些问题的。
* 所以这几节所讲的内容将和 React.js 的内容没有太大的关系，但是如果你能顺利了解这几节的内容，那么后面那些对新手来说很复杂的概念对你来说就是非常自然的事。
## 一个简单的点赞功能
---
* 我们会从一个简单的点赞功能讲起。 假设现在我们需要实现一个点赞、取消点赞的功能。如果你对前端稍微有一点了解，你就顺手拈来：
* HTML:
\`\`\`html
<body>
<div class='wrapper'>
<button class='like-btn'>
<span class='like-text'>点赞</span>
<span>👍</span>
</button>
</div>
</body>
\`\`\`
* 为了模拟现实当中的实际情况，所以这里特意把这个 button 里面的 HTML 结构搞得稍微复杂一些。有了这个 HTML 结构，现在就给它加入一些 JavaScript 的行为：
* JavaScript：
\`\`\`JavaScript
const button = document.querySelector('.like-btn')
const buttonText = button.querySelector('.like-text')
let isLiked = false
button.addEventListener('click', () => {
isLiked = !isLiked
if (isLiked) {
buttonText.innerHTML = '取消'
} else {
buttonText.innerHTML = '点赞'
}
}, false)
\`\`\`
* 功能和实现都很简单，按钮已经可以提供点赞和取消点赞的功能。这时候你的同事跑过来了，说他很喜欢你的按钮，他也想用你写的这个点赞功能。这时候问题就来了，你就会发现这种实现方式很致命：你的同事要把整个 button 和里面的结构复制过去，还有整段 JavaScript 代码也要复制过去。这样的实现方式没有任何可复用性。
## 结构复用
---
* 现在我们来重新编写这个点赞功能，让它具备一定的可复用。这次我们先写一个类，这个类有 render 方法，这个方法里面直接返回一个表示 HTML 结构的字符串：
\`\`\`JavaScript
class LikeButton {
render () {
return 
<button id='like-btn'>
<span class='like-text'>赞</span>
<span>👍</span>
</button>
}
}
\`\`\`
* 然后可以用这个类来构建不同的点赞功能的实例，然后把它们插到页面中。
\`\`\`JavaScript
const wrapper = document.querySelector('.wrapper')
const likeButton1 = new LikeButton()
wrapper.innerHTML = likeButton1.render()

const likeButton2 = new LikeButton()
wrapper.innerHTML += likeButton2.render()
\`\`\`
* 这里非常暴力地使用了 innerHTML ，把两个按钮粗鲁地插入了 wrapper 当中。虽然你可能会对这种实现方式非常不满意，但我们还是勉强了实现了结构的复用。我们后面再来优化它。
## 实现简单的组件化
---
* 你一定会发现，现在的按钮是死的，你点击它它根本不会有什么反应。因为根本没有往上面添加事件。但是问题来了，LikeButton 类里面是虽然说有一个 button，但是这玩意根本就是在字符串里面的。你怎么能往一个字符串里面添加事件呢？DOM 事件的 API 只有 DOM 结构才能用。我们需要 DOM 结构，准确地来说：我们需要这个点赞功能的 HTML 字符串表示的 DOM 结构。假设我们现在有一个函数 createDOMFromString ，你往这个函数传入 HTML 字符串，但是它会把相应的 DOM 元素返回给你。这个问题就可以解决了。
\`\`\`JavaScript
// ::String => ::Document
const createDOMFromString = (domString) => {
const div = document.createElement('div')
div.innerHTML = domString
return div
}
\`\`\`
* 先不用管这个函数应该怎么实现，先知道它是干嘛的。拿来用就好，这时候用它来改写一下 LikeButton 类：
\`\`\`JavaScript
class LikeButton {
render () {
this.el = createDOMFromString(
<button class='like-button'>
<span class='like-text'>点赞</span>
<span>👍</span>
</button>
)
this.el.addEventListener('click', () => console.log('click'), false)
return this.el
}
}
\`\`\`
* 现在 render() 返回的不是一个 html 字符串了，而是一个由这个 html 字符串所生成的 DOM。在返回 DOM 元素之前会先给这个 DOM 元素上添加事件再返回。
* 因为现在 render 返回的是 DOM 元素，所以不能用 innerHTML 暴力地插入 wrapper。而是要用 DOM API 插进去。
\`\`\`JavaScript
const wrapper = document.querySelector('.wrapper')

const likeButton1 = new LikeButton()
wrapper.appendChild(likeButton1.render())

const likeButton2 = new LikeButton()
wrapper.appendChild(likeButton2.render())
\`\`\`
* 现在你点击这两个按钮，每个按钮都会在控制台打印 click，说明事件绑定成功了。但是按钮上的文本还是没有发生改变，只要稍微改动一下 LikeButton 的代码就可以完成完整的功能：
\`\`\`JavaScript
class LikeButton {
constructor () {
this.state = { isLiked: false }
}

changeLikeText () {
const likeText = this.el.querySelector('.like-text')
this.state.isLiked = !this.state.isLiked
likeText.innerHTML = this.state.isLiked ? '取消' : '点赞'
}

render () {
this.el = createDOMFromString(
<button class='like-button'>
<span class='like-text'>点赞</span>
<span>👍</span>
</button>
)
this.el.addEventListener('click', this.changeLikeText.bind(this), false)
return this.el
}
}
\`\`\`
* 这里的代码稍微长了一些，但是还是很好理解。只不过是在给 LikeButton 类添加了构造函数，这个构造函数会给每一个 LikeButton 的实例添加一个对象 state，state 里面保存了每个按钮自己是否点赞的状态。还改写了原来的事件绑定函数：原来只打印 click，现在点击的按钮的时候会调用 changeLikeText 方法，这个方法会根据 this.state 的状态改变点赞按钮的文本。
* 现在这个组件的可复用性已经很不错了，你的同事们只要实例化一下然后插入到 DOM 里面去就好了。`
    },
    {
      articleId: 'article2',
      articleName: '被称为“开发者神器”的GitHub，到底该怎么用？',
      aricleDetail: `
* GitHub是一个拥有数十亿行代码的网站，每天有数百万开发者聚集在一起，研究开源软件中存在的问题。
* 简而言之，它是为软件开发人员构建的平台，是围绕Git构建的。
### 正是Github，让社会化编程成为现实。
## 什么是 Github?
* github是一个基于git的代码托管平台，付费用户可以建私人仓库，我们一般的免费用户只能使用公共仓库，也就是代码要公开。
## 注册账户以及创建仓库
* 要想使用github第一步当然是注册github账号了， github官网地址：https://github.com/。 之后就可以创建仓库了（免费用户只能建公共仓库），Create a New Repository，填好名称后Create，之后会出现一些仓库的配置信息，这也是一个git的简单教程。
## 配置Git
* 首先在本地创建ssh key；
\`\`\` JavaScript
$ ssh-keygen -t rsa -C "your_email@youremail.com"
\`\`\`
* 后面的your_email@youremail.com改为你在github上注册的邮箱，之后会要求确认路径和输入密码，我们这使用默认的一路回车就行。成功的话会在~/下生成.ssh文件夹，进去，打开id_rsa.pub，复制里面的key。
* 回到github上，进入 Account Settings（账户配置），左边选择SSH Keys，Add SSH Key,title随便填，粘贴在你电脑上生成的key。
* 为了验证是否成功，在git bash下输入：
\`\`\` JavaScript
$ ssh -T git@github.com
\`\`\`
* 如果是第一次的会提示是否continue，输入yes就会看到：You've successfully authenticated, but GitHub does not provide shell access 。这就表示已成功连上github。
* 接下来我们要做的就是把本地仓库传到github上去，在此之前还需要设置username和email，因为github每次commit都会记录他们。
\`\`\`JavaScript
$ git config --global user.name "your name"
$ git config --global user.email "your_email@youremail.com"
\`\`\`
* 进入要上传的仓库，右键git bash，添加远程地址：
\`\`\`JavaScript
$ git remote add origin git@github.com:yourName/yourRepo.git
\`\`\`
* 后面的yourName和yourRepo表示你再github的用户名和刚才新建的仓库，加完之后进入.git，打开config，这里会多出一个remote "origin"内容，这就是刚才添加的远程地址，也可以直接修改config来配置远程地址。
* 创建新文件夹，打开，然后执行 git init 以创建新的 git 仓库。
## 检出仓库
* 执行如下命令以创建一个本地仓库的克隆版本：
\`\`\`JavaScript
git clone /path/to/repository
\`\`\`
* 如果是远端服务器上的仓库，你的命令会是这个样子：
\`\`\`JavaScript
git clone username@host:/path/to/repository
\`\`\`
## 工作流
* 你的本地仓库由 git 维护的三棵"树"组成。第一个是你的 工作目录，它持有实际文件；第二个是 暂存区（Index），它像个缓存区域，临时保存你的改动；最后是 HEAD，它指向你最后一次提交的结果。
* 你可以提出更改（把它们添加到暂存区），使用如下命令：
\`\`\`JavaScript
git add <filename>
git add *
\`\`\`
* 这是 git 基本工作流程的第一步；使用如下命令以实际提交改动：
\`\`\`JavaScript
git commit -m "代码提交信息"
\`\`\`
* 现在，你的改动已经提交到了 HEAD，但是还没到你的远端仓库。
## 推送改动
* 你的改动现在已经在本地仓库的 HEAD 中了。执行如下命令以将这些改动提交到远端仓库：
\`\`\`JavaScript
git push origin master
\`\`\`
* 可以把 master 换成你想要推送的任何分支。 
* 如果你还没有克隆现有仓库，并欲将你的仓库连接到某个远程服务器，你可以使用如下命令添加：
\`\`\`JavaScript
git remote add origin <server>
\`\`\`
* 如此你就能够将你的改动推送到所添加的服务器上去了。
## 分支
* 分支是用来将特性开发绝缘开来的。在你创建仓库的时候，master 是"默认的"分支。在其他分支上进行开发，完成后再将它们合并到主分支上。
* 创建一个叫做"feature_x"的分支，并切换过去：
\`\`\`JavaScript
git checkout -b feature_x
\`\`\`
* 切换回主分支：
\`\`\`JavaScript
git checkout master
\`\`\`
* 再把新建的分支删掉：
\`\`\`JavaScript
git branch -d feature_x
\`\`\`
* 除非你将分支推送到远端仓库，不然该分支就是 不为他人所见的：
\`\`\`JavaScript
git push origin <branch>
\`\`\`
## 更新与合并
* 要更新你的本地仓库至最新改动，执行：
\`\`\`JavaScript
git pull
\`\`\`
* 以在你的工作目录中 获取（fetch） 并 合并（merge） 远端的改动。
* 要合并其他分支到你的当前分支（例如 master），执行：
\`\`\`JavaScript
git merge <branch>
\`\`\`
* 在这两种情况下，git 都会尝试去自动合并改动。遗憾的是，这可能并非每次都成功，并可能出现冲突（conflicts）。 这时候就需要你修改这些文件来手动合并这些冲突（conflicts）。改完之后，你需要执行如下命令以将它们标记为合并成功：
\`\`\`JavaScript
git add <filename>
\`\`\`
* 在合并改动之前，你可以使用如下命令预览差异：
\`\`\`JavaScript
git diff <source_branch> <target_branch>
\`\`\`
## 替换本地改动
* 假如你操作失误（当然，这最好永远不要发生），你可以使用如下命令替换掉本地改动：
\`\`\`JavaScript
git checkout -- <filename>
\`\`\`
* 此命令会使用 HEAD 中的最新内容替换掉你的工作目录中的文件。已添加到暂存区的改动以及新文件都不会受到影响。
* 假如你想丢弃你在本地的所有改动与提交，可以到服务器上获取最新的版本历史，并将你本地主分支指向它：
\`\`\`JavaScript
git fetch origin
git reset --hard origin/master
\`\`\`
## 链接与资源
### 相关文章
* Github 简明指南：http://rogerdudler.github.io/git-guide/index.zh.html
* 如何高效利用GitHub:http://www.yangzhiping.com/tech/github.html`
    },
    {
      articleId: 'article3',
      articleName: 'Redux 入门教程',
      aricleDetail: `
## 零、你可能不需要 Redux
* 首先明确一点，Redux 是一个有用的架构，但不是非用不可。事实上，大多数情况，你可以不用它，只用 React 就够了。
* 简单说，如果你的UI层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。
*  Redux 的适用场景：多交互、多数据源。
* 从组件角度看，如果你的应用有以下场景，可以考虑使用 Redux。
* 某个组件的状态，需要共享
* 某个状态需要在任何地方都可以拿到
* 一个组件需要改变全局状态
* 一个组件需要改变另一个组件的状态
## 一、设计思想
---
* Redux 的设计思想很简单，就两句话。
* （1）Web 应用是一个状态机，视图与状态是一一对应的。
* （2）所有的状态，保存在一个对象里面。
## 二、基本概念和 API
---
* 3.1 Store

* Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
* Redux 提供createStore这个函数，用来生成 Store。
\`\`\`JavaScript
import { createStore } from 'redux';
const store = createStore(fn);
\`\`\`
* 上面代码中，createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。

* 3.2 State
* Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。
* 当前时刻的 State，可以通过store.getState()拿到。
\`\`\`JavaScript
import { createStore } from 'redux';
const store = createStore(fn);

const state = store.getState();
\`\`\`
* Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。
* 3.3 Action

* State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。
* Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置，社区有一个规范可以参考。
\`\`\`JavaScript
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
\`\`\`
* 上面代码中，Action 的名称是ADD_TODO，它携带的信息是字符串Learn Redux。
* 可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。
* 3.4 Action Creator

* View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。
\`\`\`JavaScript
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action = addTodo('Learn Redux');
\`\`\`
* 上面代码中，addTodo函数就是一个 Action Creator。
* 3.5 store.dispatch()

* store.dispatch()是 View 发出 Action 的唯一方法。
\`\`\`JavaScript
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
\`\`\`
* 上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。
* 结合 Action Creator，这段代码可以改写如下。
\`\`\`JavaScript
store.dispatch(addTodo('Learn Redux'));
\`\`\`
### 3.6 Reducer
* Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
* Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
\`\`\`JavaScript
const reducer = function (state, action) {
  // ...
  return new_state;
};
\`\`\`
* 整个应用的初始状态，可以作为 State 的默认值。下面是一个实际的例子。
\`\`\`JavaScript
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
return state + action.payload;
    default: 
return state;
  }
};

const state = reducer(1, {
  type: 'ADD',
  payload: 2
});
\`\`\`
* 上面代码中，reducer函数收到名为ADD的 Action 以后，就返回一个新的 State，作为加法的计算结果。其他运算的逻辑（比如减法），也可以根据 Action 的不同来实现。
* 实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。
\`\`\`JavaScript
import { createStore } from 'redux';
const store = createStore(reducer);
\`\`\`
* 上面代码中，createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
* 为什么这个函数叫做 Reducer 呢？因为它可以作为数组的reduce方法的参数。请看下面的例子，一系列 Action 对象按照顺序作为一个数组。
\`\`\`JavaScript
const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 }
];

const total = actions.reduce(reducer, 0); // 3
\`\`\`
* 上面代码中，数组actions表示依次有三个 Action，分别是加0、加1和加2。数组的reduce方法接受 Reducer 函数作为参数，就可以直接得到最终的状态3。
* 3.7 store.subscribe()

* Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
\`\`\`JavaScript
import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);
\`\`\`
* 显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。
* store.subscribe方法返回一个函数，调用这个函数就可以解除监听。
\`\`\`JavaScript
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
\`\`\`


* 作者： 阮一峰

* 日期： 2016年9月18日`
    }
  ]
};

export default articleDatas;

var result = `/* 
* 面试官你好，我是陈创
* 我想尝试做一份会动的简历
* 这是一份会动的简历
*/

/*首先我们准备一些样式*/
*{ 
    transition: all 1s; 
} 
html{
    background: #272822; 
    color: #F1E5C3;
}

#code{
    border: 1px solid #aaa; 
    padding: 16px; 
}

/* 像编辑器一样高亮吧 */
.token.selector{ color: #690; }
.token.property{ color: #905; }
/*这个效果使用了prism.js这个库*/


/* 加个简单动画？*/

@keyframes fade-out-in {
    0% { opacity: 1; }
   50% { opacity: 0; }
  100% { opacity: 1; }
}
#code{
    animation: 1s fade-out-in 2;
}
#code-wrapper::after{
    animation: 3s fade-out-in infinite;
}


`
var result2 = `
/*简历是需要一张纸的*/
#code-wrapper{
    width: 50%; left: 0; position: fixed; 
    height: 100%;
}
  #paper > .content {
   display: block;
}
  
#paper{
    background: #444; padding: 16px;
    position: fixed; width: 50%; height: 100%; right: 0;
    display: flex; align-items: flex-start;
}
#paper > .content{
    width: 100%;
    height: 100%;
    padding-left: 16px;
    overflow: hidden;
    background: white;
    display: block;
    color:black;
}

/*dengdengdeng*/
`
var md = `
# 自我介绍

我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`


writeCss('', result, () => {
    createPaper(() => {
        writeCss(result, result2, () => {
            writeMarkdown(md, () => {
                convertMarkdownToHtml(() => {
                    console.log('ok')
                })
            })
        })
    })
})


function convertMarkdownToHtml(fn) {
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
}


function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = 10000
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn && fn.call()
        }
    }, 35)
}


function writeCss(prefix, result, fn) {
    let domCode = document.querySelector('#code')
    var n = 0
    var id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + result.substring(0, n), Prism.languages.css);
        styleTag.innerHTML = prefix + result.substring(0, n)
        domCode.scrollTop = 10000
        if (n >= result.length) {
            window.clearInterval(id)
            fn && fn.call()
        }
    }, 0)
}
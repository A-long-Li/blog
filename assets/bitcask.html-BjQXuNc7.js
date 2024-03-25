import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o as r,c as o,d as e,f as s,a as c,e as t}from"./app-rO6VXmY4.js";const l={},p=t('<h2 id="bitcask" tabindex="-1"><a class="header-anchor" href="#bitcask"><span>BitCask</span></a></h2><h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h3><p>bitcask是一个kv数据库，和市面上常见的Redis不同的是，它是直接把数据存储到磁盘上的。是一个面向磁盘的kv数据库。</p><p>一个 bitcask 实例就是系统上的一个目录，并且限制同一时刻只能有一个进程打开这个目录。目录中有多个文件，同一时刻只有一个活跃的文件用于写入。 当活跃文件写到满足一个<mark>阈值</mark>之后，就会被关闭，成为旧的数据文件，并且打开一个新的文件用于写入。 所以这个目录中就是一个活跃文件和多个旧的数据文件的集合。 当前活跃文件的写入是追加写入的，这意味着可以利用顺序 IO，不会有多余的磁盘寻址，最大限度保证了吞吐。</p><p>删除操作实际上也是一次追加写入，只不过写入的是一个特殊的墓碑值，用于标记一条记录的删除，也就是说不会实际去删除某条数据。当下次 merge 的时候，才会将这种无效的数据清理掉。</p><p>merge 会遍历所有不可变的旧数据文件，将所有有效的数据重新写到新的数据文件中，并且将旧的数据文件删除掉。 merge完成之后内存中的索引会更新。 merge 完成后，还会为每个数据文件生成一个 hint 文件，hint 文件可以看做是全部数据的索引，它和数据文件唯一的区别是，它不会存储实际的 value。</p><p>它的作用是在 bitcask 启动的时候，直接加载 hint 文件中的数据，快速构建索引，而不用去全部重新加载数据文件，换句话说，就是在启动的 时候加载更少的数据，因为 hint 文件不存储 value，它的容量会比数据文件小。</p><h3 id="索引" tabindex="-1"><a class="header-anchor" href="#索引"><span>索引</span></a></h3><p>bitcask选择了art（自适应基数树）树做为索引，可以通过压缩节点（将两个相同前缀的键值合并在一起）来减少内存占用。这样就可以在内存中存储更多的索引。</p>',9),h={href:"https://www.codercto.com/a/117148.html",target:"_blank",rel:"noopener noreferrer"},d=t('<h3 id="如何保证可靠性" tabindex="-1"><a class="header-anchor" href="#如何保证可靠性"><span>如何保证可靠性</span></a></h3><ul><li>先写日志</li><li>数据顺序写入</li><li>定期合并</li><li>数据校验</li></ul><h2 id="nanogo" tabindex="-1"><a class="header-anchor" href="#nanogo"><span>nanogo</span></a></h2><h3 id="路由树" tabindex="-1"><a class="header-anchor" href="#路由树"><span>路由树</span></a></h3><p>使用Trie树（字典树）来实现</p><h3 id="函数级中间件" tabindex="-1"><a class="header-anchor" href="#函数级中间件"><span>函数级中间件</span></a></h3><p>重写http的handle函数，完全匹配请求方法和路由名称</p><h3 id="接下来的发展" tabindex="-1"><a class="header-anchor" href="#接下来的发展"><span>接下来的发展</span></a></h3><ul><li>添加模板渲染支持</li></ul>',9);function k(m,g){const a=i("ExternalLinkIcon");return r(),o("div",null,[p,e("p",null,[e("a",h,[s("art树介绍"),c(a)])]),d])}const f=n(l,[["render",k],["__file","bitcask.html.vue"]]),v=JSON.parse('{"path":"/notes/unorder/bitcask.html","title":"面试项目","lang":"zh-CN","frontmatter":{"title":"面试项目","icon":"fa-solid fa-database","category":"note","tag":["bitcask","kv"],"description":"BitCask 简介 bitcask是一个kv数据库，和市面上常见的Redis不同的是，它是直接把数据存储到磁盘上的。是一个面向磁盘的kv数据库。 一个 bitcask 实例就是系统上的一个目录，并且限制同一时刻只能有一个进程打开这个目录。目录中有多个文件，同一时刻只有一个活跃的文件用于写入。 当活跃文件写到满足一个阈值之后，就会被关闭，成为旧的数据文...","head":[["meta",{"property":"og:url","content":"https://zarttic.github.io/notes/unorder/bitcask.html"}],["meta",{"property":"og:site_name","content":"文档库"}],["meta",{"property":"og:title","content":"面试项目"}],["meta",{"property":"og:description","content":"BitCask 简介 bitcask是一个kv数据库，和市面上常见的Redis不同的是，它是直接把数据存储到磁盘上的。是一个面向磁盘的kv数据库。 一个 bitcask 实例就是系统上的一个目录，并且限制同一时刻只能有一个进程打开这个目录。目录中有多个文件，同一时刻只有一个活跃的文件用于写入。 当活跃文件写到满足一个阈值之后，就会被关闭，成为旧的数据文..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-25T12:02:23.000Z"}],["meta",{"property":"article:author","content":"zarttic"}],["meta",{"property":"article:tag","content":"bitcask"}],["meta",{"property":"article:tag","content":"kv"}],["meta",{"property":"article:modified_time","content":"2024-03-25T12:02:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"面试项目\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-25T12:02:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"zarttic\\",\\"url\\":\\"https://github.com/zarttic\\"}]}"]]},"headers":[{"level":2,"title":"BitCask","slug":"bitcask","link":"#bitcask","children":[{"level":3,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":3,"title":"索引","slug":"索引","link":"#索引","children":[]},{"level":3,"title":"如何保证可靠性","slug":"如何保证可靠性","link":"#如何保证可靠性","children":[]}]},{"level":2,"title":"nanogo","slug":"nanogo","link":"#nanogo","children":[{"level":3,"title":"路由树","slug":"路由树","link":"#路由树","children":[]},{"level":3,"title":"函数级中间件","slug":"函数级中间件","link":"#函数级中间件","children":[]},{"level":3,"title":"接下来的发展","slug":"接下来的发展","link":"#接下来的发展","children":[]}]}],"git":{"createdTime":1711368143000,"updatedTime":1711368143000,"contributors":[{"name":"zarttic","email":"332209078@qq.com","commits":1}]},"readingTime":{"minutes":2.21,"words":662},"filePathRelative":"notes/unorder/bitcask.md","localizedDate":"2024年3月25日","autoDesc":true,"excerpt":"<h2>BitCask</h2>\\n<h3>简介</h3>\\n<p>bitcask是一个kv数据库，和市面上常见的Redis不同的是，它是直接把数据存储到磁盘上的。是一个面向磁盘的kv数据库。</p>\\n<p>一个 bitcask 实例就是系统上的一个目录，并且限制同一时刻只能有一个进程打开这个目录。目录中有多个文件，同一时刻只有一个活跃的文件用于写入。\\n当活跃文件写到满足一个<mark>阈值</mark>之后，就会被关闭，成为旧的数据文件，并且打开一个新的文件用于写入。\\n所以这个目录中就是一个活跃文件和多个旧的数据文件的集合。\\n当前活跃文件的写入是追加写入的，这意味着可以利用顺序 IO，不会有多余的磁盘寻址，最大限度保证了吞吐。</p>"}');export{f as comp,v as data};

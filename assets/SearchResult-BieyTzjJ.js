import{l as j,i as Z,m as ee,p as M,q as se,s as te,v as ae,x as le,j as T,y as L,z as re,A as B,k as t,B as F,C as I,R as U,D as ue,E as oe,G as ie,H as ne,I as ce,J as ve,K as de,L as he,O as pe,M as ye,N as me,P as ge,Q as fe,S as He,T as $}from"./app-CZQbtGmX.js";const Re=["/","/golang/","/home/","/home/disable.html","/home/encrypt.html","/home/layout.html","/home/markdown.html","/home/page.html","/java/","/notes/","/resource/","/golang/std/","/golang/std/context.html","/golang/std/io.html","/golang/std/runtime.html","/notes/order/","/notes/order/database.html","/notes/order/linux.html","/notes/unorder/","/notes/unorder/mess.html","/404.html"],ke="SEARCH_PRO_QUERY_HISTORY",p=j(ke,[]),Qe=()=>{const{queryHistoryCount:a}=$,l=a>0;return{enabled:l,queryHistory:p,addQueryHistory:r=>{l&&(p.value.length<a?p.value=Array.from(new Set([r,...p.value])):p.value=Array.from(new Set([r,...p.value.slice(0,a-1)])))},removeQueryHistory:r=>{p.value=[...p.value.slice(0,r),...p.value.slice(r+1)]}}},P=a=>Re[a.id]+("anchor"in a?`#${a.anchor}`:""),xe="SEARCH_PRO_RESULT_HISTORY",{resultHistoryCount:E}=$,y=j(xe,[]),we=()=>{const a=E>0;return{enabled:a,resultHistory:y,addResultHistory:l=>{if(a){const r={link:P(l),display:l.display};"header"in l&&(r.header=l.header),y.value.length<E?y.value=[r,...y.value]:y.value=[r,...y.value.slice(0,E-1)]}},removeResultHistory:l=>{y.value=[...y.value.slice(0,l),...y.value.slice(l+1)]}}},Se=a=>{const l=ce(),r=M(),C=ve(),o=T(!1),g=de([]);return he(()=>{const{search:k,terminate:m}=pe(),Q=()=>{g.value=[],o.value=!1},f=He(d=>{o.value=!0,d?k(d,r.value,l.value).then(h=>{var x,H;return((H=(x=l.value).searchFilter)==null?void 0:H.call(x,h,d,r.value,C.value))??h}).then(h=>{g.value=h,o.value=!1}).catch(h=>{console.error(h),Q()}):Q()},$.searchDelay);B([a,r],()=>f(a.value),{immediate:!0}),ye(()=>{m()})}),{searching:o,results:g}};var be=Z({name:"SearchResult",props:{query:{type:String,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(a,{emit:l}){const r=ee(),C=M(),o=se(te),{enabled:g,addQueryHistory:k,queryHistory:m,removeQueryHistory:Q}=Qe(),{enabled:f,resultHistory:d,addResultHistory:h,removeResultHistory:x}=we(),H=g||f,b=ae(a,"query"),{results:R,searching:Y}=Se(b),u=le({isQuery:!0,index:0}),c=T(0),v=T(0),O=L(()=>H&&(m.value.length>0||d.value.length>0)),q=L(()=>R.value.length>0),A=L(()=>R.value[c.value]||null),z=()=>{const{isQuery:e,index:s}=u;s===0?(u.isQuery=!e,u.index=e?d.value.length-1:m.value.length-1):u.index=s-1},G=()=>{const{isQuery:e,index:s}=u;s===(e?m.value.length-1:d.value.length-1)?(u.isQuery=!e,u.index=0):u.index=s+1},J=()=>{c.value=c.value>0?c.value-1:R.value.length-1,v.value=A.value.contents.length-1},K=()=>{c.value=c.value<R.value.length-1?c.value+1:0,v.value=0},N=()=>{v.value<A.value.contents.length-1?v.value+=1:K()},V=()=>{v.value>0?v.value-=1:J()},D=e=>e.map(s=>me(s)?s:t(s[0],s[1])),W=e=>{if(e.type==="customField"){const s=ge[e.index]||"$content",[i,S=""]=fe(s)?s[C.value].split("$content"):s.split("$content");return e.display.map(n=>t("div",D([i,...n,S])))}return e.display.map(s=>t("div",D(s)))},w=()=>{c.value=0,v.value=0,l("updateQuery",""),l("close")};return re("keydown",e=>{if(a.isFocusing){if(q.value){if(e.key==="ArrowUp")V();else if(e.key==="ArrowDown")N();else if(e.key==="Enter"){const s=A.value.contents[v.value];k(a.query),h(s),r.push(P(s)),w()}}else if(f){if(e.key==="ArrowUp")z();else if(e.key==="ArrowDown")G();else if(e.key==="Enter"){const{index:s}=u;u.isQuery?(l("updateQuery",m.value[s]),e.preventDefault()):(r.push(d.value[s].link),w())}}}}),B([c,v],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>t("div",{class:["search-pro-result-wrapper",{empty:b.value?!q.value:!O.value}],id:"search-pro-results"},b.value===""?H?O.value?[g?t("ul",{class:"search-pro-result-list"},t("li",{class:"search-pro-result-list-item"},[t("div",{class:"search-pro-result-title"},o.value.queryHistory),m.value.map((e,s)=>t("div",{class:["search-pro-result-item",{active:u.isQuery&&u.index===s}],onClick:()=>{l("updateQuery",e)}},[t(F,{class:"search-pro-result-type"}),t("div",{class:"search-pro-result-content"},e),t("button",{class:"search-pro-remove-icon",innerHTML:I,onClick:i=>{i.preventDefault(),i.stopPropagation(),Q(s)}})]))])):null,f?t("ul",{class:"search-pro-result-list"},t("li",{class:"search-pro-result-list-item"},[t("div",{class:"search-pro-result-title"},o.value.resultHistory),d.value.map((e,s)=>t(U,{to:e.link,class:["search-pro-result-item",{active:!u.isQuery&&u.index===s}],onClick:()=>{w()}},()=>[t(F,{class:"search-pro-result-type"}),t("div",{class:"search-pro-result-content"},[e.header?t("div",{class:"content-header"},e.header):null,t("div",e.display.map(i=>D(i)).flat())]),t("button",{class:"search-pro-remove-icon",innerHTML:I,onClick:i=>{i.preventDefault(),i.stopPropagation(),x(s)}})]))])):null]:o.value.emptyHistory:o.value.emptyResult:Y.value?t(ue,{hint:o.value.searching}):q.value?t("ul",{class:"search-pro-result-list"},R.value.map(({title:e,contents:s},i)=>{const S=c.value===i;return t("li",{class:["search-pro-result-list-item",{active:S}]},[t("div",{class:"search-pro-result-title"},e||o.value.defaultTitle),s.map((n,X)=>{const _=S&&v.value===X;return t(U,{to:P(n),class:["search-pro-result-item",{active:_,"aria-selected":_}],onClick:()=>{k(a.query),h(n),w()}},()=>[n.type==="text"?null:t(n.type==="title"?oe:n.type==="heading"?ie:ne,{class:"search-pro-result-type"}),t("div",{class:"search-pro-result-content"},[n.type==="text"&&n.header?t("div",{class:"content-header"},n.header):null,t("div",W(n))])])})])})):o.value.emptyResult)}});export{be as default};

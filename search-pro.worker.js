const L=Object.entries,st=Object.fromEntries,nt="ENTRIES",T="KEYS",R="VALUES",_="";class k{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=E(this._path);if(E(s)===_)return{done:!1,value:this.result()};const n=t.get(E(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=E(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>E(t)).filter(t=>t!==_).join("")}value(){return E(this._path).node.get(_)}result(){switch(this._type){case R:return this.value();case T:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const E=e=>e[e.length-1],ot=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return W(e,t,s,n,i,1,o,""),n},W=(e,t,s,n,o,u,i,r)=>{const d=u*i;t:for(const c of e.keys())if(c===_){const a=o[d-1];a<=s&&n.set(r,[e.get(c),a])}else{let a=u;for(let h=0;h<c.length;++h,++a){const m=c[h],g=i*a,p=g-i;let l=o[g];const f=Math.max(0,a-s-1),y=Math.min(i-1,a+s);for(let F=f;F<y;++F){const D=m!==t[F],z=o[p+F]+ +D,A=o[p+F+1]+1,w=o[g+F]+1,V=o[g+F+1]=Math.min(z,A,w);V<l&&(l=V)}if(l>s)continue t}W(e.get(c),t,s,n,o,a,i,r+c)}};class C{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=x(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=M(n);for(const i of o.keys())if(i!==_&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,ut(this._tree,t)}entries(){return new k(this,nt)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return ot(this._tree,t,s)}get(t){const s=I(this._tree,t);return s!==void 0?s.get(_):void 0}has(t){const s=I(this._tree,t);return s!==void 0&&s.has(_)}keys(){return new k(this,T)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,O(this._tree,t).set(_,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=O(this._tree,t);return n.set(_,s(n.get(_))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=O(this._tree,t);let o=n.get(_);return o===void 0&&n.set(_,o=s()),o}values(){return new k(this,R)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const x=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==_&&t.startsWith(n))return s.push([e,n]),x(e.get(n),t.slice(n.length),s);return s.push([e,t]),x(void 0,"",s)},I=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==_&&t.startsWith(s))return I(e.get(s),t.slice(s.length))},O=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==_&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const d=e.get(u);if(r===u.length)e=d;else{const c=new Map;c.set(u.slice(r),d),e.set(t.slice(n,n+r),c),e.delete(u),e=c}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},ut=(e,t)=>{const[s,n]=x(e,t);if(s!==void 0){if(s.delete(_),s.size===0)q(n);else if(s.size===1){const[o,u]=s.entries().next().value;$(n,o,u)}}},q=e=>{if(e.length===0)return;const[t,s]=M(e);if(t.delete(s),t.size===0)q(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==_&&$(e.slice(0,-1),n,o)}},$=(e,t,s)=>{if(e.length===0)return;const[n,o]=M(e);n.set(o+t,s),n.delete(o)},M=e=>e[e.length-1],it=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},rt=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,S="or",N="and",ct="and_not",lt=(e,t)=>{e.includes(t)||e.push(t)},P=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},G=({score:e},{score:t})=>t-e,ht=()=>new Map,b=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},H=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,dt={[S]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),P(n.terms,u)}}return e},[N]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);P(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[ct]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},at=(e,t,s,n,o,u)=>{const{k:i,b:r,d}=u;return Math.log(1+(s-t+.5)/(t+.5))*(d+e*(i+1)/(e+i*(1-r+r*n/o)))},ft=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},J=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},mt=(e,t,s,n)=>{if(!e._index.has(n)){J(e,s,t,n);return}const o=e._index.fetch(n,ht),u=o.get(t);u==null||u.get(s)==null?J(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},gt={k:1.2,b:.7,d:.5},pt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(rt),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof console?.[e]=="function"&&console[e](t)},autoVacuum:!0},U={combineWith:S,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:gt},Ft={combineWith:N,prefix:(e,t,s)=>t===s.length-1},_t={batchSize:1e3,batchWait:10},K={minDirtFactor:.1,minDirtCount:20},yt={..._t,...K},X=Symbol("*"),At=(e,t)=>{const s=new Map,n={...e._options.searchOptions,...t};for(const[o,u]of e._documentIds){const i=n.boostDocument?n.boostDocument(u,"",e._storedFields.get(o)):1;s.set(o,{score:i,terms:[],match:{}})}return s},Y=(e,t=S)=>{if(e.length===0)return new Map;const s=t.toLowerCase(),n=dt[s];if(!n)throw new Error(`Invalid combination operator: ${t}`);return e.reduce(n)||new Map},B=(e,t,s,n,o,u,i,r,d=new Map)=>{if(o==null)return d;for(const c of Object.keys(u)){const a=u[c],h=e._fieldIds[c],m=o.get(h);if(m==null)continue;let g=m.size;const p=e._avgFieldLength[h];for(const l of m.keys()){if(!e._documentIds.has(l)){mt(e,h,l,s),g-=1;continue}const f=i?i(e._documentIds.get(l),s,e._storedFields.get(l)):1;if(!f)continue;const y=m.get(l),F=e._fieldLength.get(l)[h],D=at(y,g,e._documentCount,F,p,r),z=n*a*f*D,A=d.get(l);if(A){A.score+=z,lt(A.terms,t);const w=H(A.match,s);w?w.push(c):A.match[s]=[c]}else d.set(l,{score:z,terms:[t],match:{[s]:[c]}})}}return d},Ct=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((l,f)=>({...l,[f]:H(n.boost,f)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:d}=n,{fuzzy:c,prefix:a}={...U.weights,...i},h=e._index.get(t.term),m=B(e,t.term,t.term,1,h,o,u,d);let g,p;if(t.prefix&&(g=e._index.atPrefix(t.term)),t.fuzzy){const l=t.fuzzy===!0?.2:t.fuzzy,f=l<1?Math.min(r,Math.round(t.term.length*l)):l;f&&(p=e._index.fuzzyGet(t.term,f))}if(g)for(const[l,f]of g){const y=l.length-t.term.length;if(!y)continue;p?.delete(l);const F=a*l.length/(l.length+.3*y);B(e,t.term,l,F,f,o,u,d,m)}if(p)for(const l of p.keys()){const[f,y]=p.get(l);if(!y)continue;const F=c*l.length/(l.length+y);B(e,t.term,l,F,f,o,u,d,m)}return m},Q=(e,t,s={})=>{if(t===X)return At(e,s);if(typeof t!="string"){const a={...s,...t,queries:void 0},h=t.queries.map(m=>Q(e,m,a));return Y(h,a.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:d}=i,c=r(t).flatMap(a=>d(a)).filter(a=>!!a).map(ft(i)).map(a=>Ct(e,a,i));return Y(c,i.combineWith)},Z=(e,t,s={})=>{const n=Q(e,t,s),o=[];for(const[u,{score:i,terms:r,match:d}]of n){const c=r.length||1,a={id:e._documentIds.get(u),score:i*c,terms:Object.keys(d),queryTerms:r,match:d};Object.assign(a,e._storedFields.get(u)),(s.filter==null||s.filter(a))&&o.push(a)}return t===X&&s.boostDocument==null&&e._options.searchOptions.boostDocument==null||o.sort(G),o},Et=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of Z(e,t,s)){const r=i.join(" "),d=n.get(r);d!=null?(d.score+=u,d.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:d}]of n)o.push({suggestion:u,terms:r,score:i/d});return o.sort(G),o};class zt{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if(t?.fields==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...pt,...t,autoVacuum:s,searchOptions:{...U,...t.searchOptions||{}},autoSuggestOptions:{...Ft,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=K,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const wt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:d,serializationVersion:c},a)=>{if(c!==1&&c!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const h=new zt(a);h._documentCount=t,h._nextId=s,h._documentIds=b(n),h._idToShortId=new Map,h._fieldIds=o,h._fieldLength=b(u),h._avgFieldLength=i,h._storedFields=b(r),h._dirtCount=d||0,h._index=new C;for(const[m,g]of h._documentIds)h._idToShortId.set(g,m);for(const[m,g]of e){const p=new Map;for(const l of Object.keys(g)){let f=g[l];c===1&&(f=f.ds),p.set(parseInt(l,10),b(f))}h._index.set(m,p)}return h},j=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(c,a=!1)=>{let h="";i===0?h=c.length>20?`… ${c.slice(-20)}`:c:a?h=c.length+i>100?`${c.slice(0,100-i)}… `:c:h=c.length>20?`${c.slice(0,20)} … ${c.slice(-20)}`:c,h&&o.push(h),i+=h.length,a||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let d=s.indexOf(n,u);if(d===-1)return null;for(;d>=0;){const c=d+n.length;if(r(e.slice(u,d)),u=c,i>100)break;d=s.indexOf(n,u)}return i<100&&r(e.slice(u),!0),o},xt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),bt=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),tt=(e,t,s={})=>{const n={};return Z(t,e,{boost:{h:2,t:1,c:4},prefix:!0,...s}).forEach(o=>{const{id:u,terms:i,score:r}=o,d=u.includes("@"),c=u.includes("#"),[a,h]=u.split(/[#@]/),m=Number(a),g=i.sort((l,f)=>l.length-f.length).filter((l,f)=>i.slice(f+1).every(y=>!y.includes(l))),{contents:p}=n[m]??={title:"",contents:[]};if(d)p.push([{type:"customField",id:m,index:h,display:g.map(l=>o.c.map(f=>j(f,l))).flat().filter(l=>l!==null)},r]);else{const l=g.map(f=>j(o.h,f)).filter(f=>f!==null);if(l.length&&p.push([{type:c?"heading":"title",id:m,...c&&{anchor:h},display:l},r]),"t"in o)for(const f of o.t){const y=g.map(F=>j(f,F)).filter(F=>F!==null);y.length&&p.push([{type:"text",id:m,...c&&{anchor:h},display:y},r])}}}),L(n).sort(([,o],[,u])=>"max"==="total"?xt(o,u):bt(o,u)).map(([o,{title:u,contents:i}])=>{if(!u){const r=it(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},et=(e,t,s={})=>Et(t,e,{fuzzy:.2,maxFuzzy:3,...s}).map(({suggestion:n})=>n),v=st(L(JSON.parse("{\"/\":{\"documentCount\":57,\"nextId\":57,\"documentIds\":{\"0\":\"0\",\"1\":\"1\",\"2\":\"1#功能亮点\",\"3\":\"1#bar\",\"4\":\"1#foo\",\"5\":\"2\",\"6\":\"2@0\",\"7\":\"3\",\"8\":\"3@0\",\"9\":\"3@1\",\"10\":\"4\",\"11\":\"4@0\",\"12\":\"4@1\",\"13\":\"5\",\"14\":\"5@0\",\"15\":\"5@1\",\"16\":\"6\",\"17\":\"6#markdown-介绍\",\"18\":\"6#markdown-配置\",\"19\":\"6#markdown-扩展\",\"20\":\"6#vuepress-扩展\",\"21\":\"6#主题扩展\",\"22\":\"6#提示容器\",\"23\":\"6#代码块\",\"24\":\"6#上下角标\",\"25\":\"6#自定义对齐\",\"26\":\"6#attrs\",\"27\":\"6#脚注\",\"28\":\"6#标记\",\"29\":\"6#任务列表\",\"30\":\"6#图片增强\",\"31\":\"6#组件\",\"32\":\"6@0\",\"33\":\"6@1\",\"34\":\"7\",\"35\":\"7#页面标题\",\"36\":\"7#页面信息\",\"37\":\"7#页面内容\",\"38\":\"7#组件\",\"39\":\"7@0\",\"40\":\"7@1\",\"41\":\"8\",\"42\":\"8@0\",\"43\":\"9\",\"44\":\"9#介绍\",\"45\":\"9#详情\",\"46\":\"10\",\"47\":\"11\",\"48\":\"11#介绍\",\"49\":\"11#详情\",\"50\":\"12\",\"51\":\"13\",\"52\":\"13@0\",\"53\":\"14\",\"54\":\"14@0\",\"55\":\"14@1\",\"56\":\"15\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[1,12],\"1\":[1],\"2\":[1],\"3\":[1,1],\"4\":[1,1],\"5\":[1],\"6\":[null,null,1],\"7\":[1,18],\"8\":[null,null,1],\"9\":[null,null,1],\"10\":[1,7],\"11\":[null,null,1],\"12\":[null,null,1],\"13\":[1,20],\"14\":[null,null,1],\"15\":[null,null,1],\"16\":[2,11],\"17\":[2,8],\"18\":[2,13],\"19\":[2,11],\"20\":[2,10],\"21\":[1,10],\"22\":[1,19],\"23\":[1,1],\"24\":[1,3],\"25\":[1,3],\"26\":[1,5],\"27\":[1,2],\"28\":[1,3],\"29\":[1,6],\"30\":[1,2],\"31\":[1],\"32\":[null,null,1],\"33\":[null,null,1],\"34\":[1,3],\"35\":[1,19],\"36\":[1,20],\"37\":[1,12],\"38\":[1,13],\"39\":[null,null,1],\"40\":[null,null,2],\"41\":[1],\"42\":[null,null,1],\"43\":[2],\"44\":[1,4],\"45\":[1,1],\"46\":[1,2],\"47\":[2],\"48\":[1,4],\"49\":[1,1],\"50\":[1,2],\"51\":[1],\"52\":[null,null,1],\"53\":[2],\"54\":[null,null,1],\"55\":[null,null,1],\"56\":[1,3]},\"averageFieldLength\":[1.1613107821450528,8.130063850255262,0.6025221865413297],\"storedFields\":{\"0\":{\"h\":\"项目主页\",\"t\":[\"这是项目主页的案例。你可以在这里放置你的主体内容。\",\"想要使用此布局，你需要在页面 front matter 中设置 home: true。\",\"配置项的相关说明详见 项目主页配置。\"]},\"1\":{\"h\":\"指南\"},\"2\":{\"h\":\"功能亮点\"},\"3\":{\"h\":\"Bar\",\"t\":[\"...\"]},\"4\":{\"h\":\"Foo\",\"t\":[\"...\"]},\"5\":{\"h\":\"主要功能与配置演示\"},\"6\":{\"c\":[\"使用指南\"]},\"7\":{\"h\":\"布局与功能禁用\",\"t\":[\"你可以通过设置页面的 Frontmatter，在页面禁用功能与布局。\",\"本页面就是一个示例，禁用了如下功能:\",\"导航栏\",\"侧边栏\",\"路径导航\",\"页面信息\",\"贡献者\",\"编辑此页链接\",\"更新时间\",\"上一篇/下一篇 链接\",\"评论\",\"页脚\",\"返回顶部按钮\"]},\"8\":{\"c\":[\"使用指南\"]},\"9\":{\"c\":[\"禁用\"]},\"10\":{\"h\":\"密码加密的文章\",\"t\":[\"实际的文章内容。\",\"段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字段落 1 文字。\",\"段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字段落 2 文字。\"]},\"11\":{\"c\":[\"使用指南\"]},\"12\":{\"c\":[\"加密\"]},\"13\":{\"h\":\"布局\",\"t\":[\"布局包括:\",\"导航栏\",\"侧边栏\",\"页脚\",\"同时每个页面包含:\",\"路径导航\",\"标题和页面信息\",\"TOC (文章标题列表)\",\"贡献者、更新时间等页面元信息\",\"评论\",\"主题也带有以下元素:\",\"夜间模式按钮\",\"返回顶部按钮\",\"打印按钮\",\"你可以在主题选项和页面的 frontmatter 中自定义它们。\"]},\"14\":{\"c\":[\"指南\"]},\"15\":{\"c\":[\"布局\"]},\"16\":{\"h\":\"Markdown 展示\",\"t\":[\"VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。\",\"你应该创建和编写 Markdown 文件，以便 VuePress 可以根据文件结构将它们转换为不同的页面。\"]},\"17\":{\"h\":\"Markdown 介绍\",\"t\":[\"如果你是一个新手，还不会编写 Markdown，请先阅读 Markdown 介绍 和 Markdown 演示。\"]},\"18\":{\"h\":\"Markdown 配置\",\"t\":[\"VuePress 通过 Frontmatter 为每个 Markdown 页面引入配置。\",\"相关信息\",\"Frontmatter 是 VuePress 中很重要的一个概念，如果你不了解它，你需要阅读 Frontmatter 介绍。\"]},\"19\":{\"h\":\"Markdown 扩展\",\"t\":[\"VuePress 会使用 markdown-it 来解析 Markdown 内容，因此可以借助于 markdown-it 插件来实现 语法扩展 。\"]},\"20\":{\"h\":\"VuePress 扩展\",\"t\":[\"为了丰富文档写作，VuePress 对 Markdown 语法进行了扩展。\",\"关于这些扩展，请阅读 VuePress 中的 Markdown 扩展。\"]},\"21\":{\"h\":\"主题扩展\",\"t\":[\"通过 vuepress-plugin-md-enhance，主题扩展了更多 Markdown 语法，提供更加丰富的写作功能。\"]},\"22\":{\"h\":\"提示容器\",\"t\":[\"安全的在 Markdown 中使用 {{ variable }}。\",\"自定义标题\",\"信息容器，包含 代码 与 链接。\",\"const a = 1; \",\"自定义标题\",\"提示容器\",\"自定义标题\",\"警告容器\",\"自定义标题\",\"危险容器\",\"自定义标题\",\"详情容器\",\"查看详情\"]},\"23\":{\"h\":\"代码块\",\"t\":[\"查看详情\"]},\"24\":{\"h\":\"上下角标\",\"t\":[\"19th H2O\",\"查看详情\"]},\"25\":{\"h\":\"自定义对齐\",\"t\":[\"我是居中的\",\"我在右对齐\",\"查看详情\"]},\"26\":{\"h\":\"Attrs\",\"t\":[\"一个拥有 ID 的 单词。\",\"查看详情\"]},\"27\":{\"h\":\"脚注\",\"t\":[\"此文字有脚注^first.\",\"查看详情\"]},\"28\":{\"h\":\"标记\",\"t\":[\"你可以标记 重要的内容 。\",\"查看详情\"]},\"29\":{\"h\":\"任务列表\",\"t\":[\"[x] 计划 1\",\"[ ] 计划 2\",\"查看详情\"]},\"30\":{\"h\":\"图片增强\",\"t\":[\"支持为图片设置颜色模式和大小\",\"查看详情\"]},\"31\":{\"h\":\"组件\"},\"32\":{\"c\":[\"使用指南\"]},\"33\":{\"c\":[\"Markdown\"]},\"34\":{\"h\":\"页面配置\",\"t\":[\"more 注释之前的内容被视为文章摘要。\"]},\"35\":{\"h\":\"页面标题\",\"t\":[\"The first H1 title in Markdown will be regarded as page title.\",\"Markdown 中的第一个 H1 标题会被视为页面标题。\",\"你可以在 Markdown 的 Frontmatter 中设置页面标题。\",\"--- title: 页面标题 --- \"]},\"36\":{\"h\":\"页面信息\",\"t\":[\"你可以在 Markdown 的 Frontmatter 中设置页面信息。\",\"作者设置为 Ms.Hope。\",\"写作日期为 2020 年 1 月 1 日\",\"分类为 “使用指南”\",\"标签为 “页面配置” 和 “使用指南”\"]},\"37\":{\"h\":\"页面内容\",\"t\":[\"你可以自由在这里书写你的 Markdown。\",\"图片引入\",\"你可以将图片和 Markdown 文件放置在一起使用相对路径进行引用。\",\"对于 .vuepress/public 文件夹的图片，请使用绝对链接 / 进行引用。\"]},\"38\":{\"h\":\"组件\",\"t\":[\"每个 Markdown 页面都会被转换为一个 Vue 组件，这意味着你可以在 Markdown 中使用 Vue 语法：\",\"{{ 1 + 1 }}\",\"{{ i }}\",\"你也可以创建并引入你自己的组件。\"]},\"39\":{\"c\":[\"使用指南\"]},\"40\":{\"c\":[\"页面配置\",\"使用指南\"]},\"41\":{\"h\":\"杂记\"},\"42\":{\"c\":[\"使用指南\"]},\"43\":{\"h\":\"Bar 功能\"},\"44\":{\"h\":\"介绍\",\"t\":[\"我们支持 bar 功能，...\"]},\"45\":{\"h\":\"详情\",\"t\":[\"...\"]},\"46\":{\"h\":\"Baz\",\"t\":[\"功能详情...\"]},\"47\":{\"h\":\"Foo 功能\"},\"48\":{\"h\":\"介绍\",\"t\":[\"我们支持 foo 功能，...\"]},\"49\":{\"h\":\"详情\",\"t\":[\"...\"]},\"50\":{\"h\":\"Ray\",\"t\":[\"功能详情...\"]},\"51\":{\"h\":\"待整理的杂记\"},\"52\":{\"c\":[\"使用指南\"]},\"53\":{\"h\":\"Linux 相关\"},\"54\":{\"c\":[\"使用指南\"]},\"55\":{\"c\":[\"Markdown\"]},\"56\":{\"h\":\"\",\"t\":[\"404 Not Found\"]}},\"dirtCount\":0,\"index\":[[\"not\",{\"1\":{\"56\":1}}],[\"404\",{\"1\":{\"56\":1}}],[\"相关\",{\"0\":{\"53\":1}}],[\"相关信息\",{\"1\":{\"18\":1}}],[\"linux\",{\"0\":{\"53\":1}}],[\"待整理的杂记\",{\"0\":{\"51\":1}}],[\"ray\",{\"0\":{\"50\":1}}],[\"regarded\",{\"1\":{\"35\":1}}],[\"详情\",{\"0\":{\"45\":1,\"49\":1}}],[\"详情容器\",{\"1\":{\"22\":1}}],[\"功能详情\",{\"1\":{\"46\":1,\"50\":1}}],[\"功能\",{\"0\":{\"43\":1,\"47\":1},\"1\":{\"44\":1,\"48\":1}}],[\"功能亮点\",{\"0\":{\"2\":1}}],[\"杂记\",{\"0\":{\"41\":1}}],[\"+\",{\"1\":{\"38\":1}}],[\"这意味着你可以在\",{\"1\":{\"38\":1}}],[\"这是项目主页的案例\",{\"1\":{\"0\":1}}],[\"每个\",{\"1\":{\"38\":1}}],[\"进行引用\",{\"1\":{\"37\":1}}],[\"图片引入\",{\"1\":{\"37\":1}}],[\"图片增强\",{\"0\":{\"30\":1}}],[\"分类为\",{\"1\":{\"36\":1}}],[\"日\",{\"1\":{\"36\":1}}],[\"月\",{\"1\":{\"36\":1}}],[\"年\",{\"1\":{\"36\":1}}],[\"写作日期为\",{\"1\":{\"36\":1}}],[\"作者设置为\",{\"1\":{\"36\":1}}],[\"public\",{\"1\":{\"37\":1}}],[\"page\",{\"1\":{\"35\":1}}],[\"plugin\",{\"1\":{\"21\":1}}],[\"baz\",{\"0\":{\"46\":1}}],[\"bar\",{\"0\":{\"3\":1,\"43\":1},\"1\":{\"44\":1}}],[\"be\",{\"1\":{\"35\":1}}],[\"will\",{\"1\":{\"35\":1}}],[\"注释之前的内容被视为文章摘要\",{\"1\":{\"34\":1}}],[\"组件\",{\"0\":{\"31\":1,\"38\":1},\"1\":{\"38\":1}}],[\"支持为图片设置颜色模式和大小\",{\"1\":{\"30\":1}}],[\"计划\",{\"1\":{\"29\":2}}],[\"x\",{\"1\":{\"29\":1}}],[\"任务列表\",{\"0\":{\"29\":1}}],[\"重要的内容\",{\"1\":{\"28\":1}}],[\"标签为\",{\"1\":{\"36\":1}}],[\"标题会被视为页面标题\",{\"1\":{\"35\":1}}],[\"标题和页面信息\",{\"1\":{\"13\":1}}],[\"标记\",{\"0\":{\"28\":1}}],[\"此文字有脚注^first\",{\"1\":{\"27\":1}}],[\"脚注\",{\"0\":{\"27\":1}}],[\"单词\",{\"1\":{\"26\":1}}],[\"的\",{\"1\":{\"26\":1,\"35\":1,\"36\":1}}],[\"i\",{\"1\":{\"38\":1}}],[\"in\",{\"1\":{\"35\":1}}],[\"id\",{\"1\":{\"26\":1}}],[\"it\",{\"1\":{\"19\":2}}],[\"一个拥有\",{\"1\":{\"26\":1}}],[\"我们支持\",{\"1\":{\"44\":1,\"48\":1}}],[\"我在右对齐\",{\"1\":{\"25\":1}}],[\"我是居中的\",{\"1\":{\"25\":1}}],[\"自定义对齐\",{\"0\":{\"25\":1}}],[\"自定义标题\",{\"1\":{\"22\":5}}],[\"hope\",{\"1\":{\"36\":1}}],[\"home\",{\"1\":{\"0\":1}}],[\"h1\",{\"1\":{\"35\":2}}],[\"h2o\",{\"1\":{\"24\":1}}],[\"上下角标\",{\"0\":{\"24\":1}}],[\"上一篇\",{\"1\":{\"7\":1}}],[\"查看详情\",{\"1\":{\"22\":1,\"23\":1,\"24\":1,\"25\":1,\"26\":1,\"27\":1,\"28\":1,\"29\":1,\"30\":1}}],[\"危险容器\",{\"1\":{\"22\":1}}],[\"警告容器\",{\"1\":{\"22\":1}}],[\"=\",{\"1\":{\"22\":1}}],[\"as\",{\"1\":{\"35\":1}}],[\"attrs\",{\"0\":{\"26\":1}}],[\"a\",{\"1\":{\"22\":1}}],[\"const\",{\"1\":{\"22\":1}}],[\"与\",{\"1\":{\"22\":1}}],[\"代码块\",{\"0\":{\"23\":1}}],[\"代码\",{\"1\":{\"22\":1}}],[\"包含\",{\"1\":{\"22\":1}}],[\"信息容器\",{\"1\":{\"22\":1}}],[\"vue\",{\"1\":{\"38\":2}}],[\"vuepress\",{\"0\":{\"20\":1},\"1\":{\"16\":2,\"18\":2,\"19\":1,\"20\":2,\"21\":1,\"37\":1}}],[\"variable\",{\"1\":{\"22\":1}}],[\"安全的在\",{\"1\":{\"22\":1}}],[\"提示容器\",{\"0\":{\"22\":1},\"1\":{\"22\":1}}],[\"提供更加丰富的写作功能\",{\"1\":{\"21\":1}}],[\"enhance\",{\"1\":{\"21\":1}}],[\"ms\",{\"1\":{\"36\":1}}],[\"more\",{\"1\":{\"34\":1}}],[\"md\",{\"1\":{\"21\":1}}],[\"markdown\",{\"0\":{\"16\":1,\"17\":1,\"18\":1,\"19\":1},\"1\":{\"16\":2,\"17\":3,\"18\":1,\"19\":3,\"20\":2,\"21\":1,\"22\":1,\"35\":3,\"36\":1,\"37\":2,\"38\":2},\"2\":{\"33\":1,\"55\":1}}],[\"matter\",{\"1\":{\"0\":1}}],[\"请使用绝对链接\",{\"1\":{\"37\":1}}],[\"请阅读\",{\"1\":{\"20\":1}}],[\"请先阅读\",{\"1\":{\"17\":1}}],[\"关于这些扩展\",{\"1\":{\"20\":1}}],[\"语法\",{\"1\":{\"21\":1,\"38\":1}}],[\"语法进行了扩展\",{\"1\":{\"20\":1}}],[\"语法扩展\",{\"1\":{\"19\":1}}],[\"对于\",{\"1\":{\"37\":1}}],[\"对\",{\"1\":{\"20\":1}}],[\"为了丰富文档写作\",{\"1\":{\"20\":1}}],[\"为每个\",{\"1\":{\"18\":1}}],[\"插件来实现\",{\"1\":{\"19\":1}}],[\"内容\",{\"1\":{\"19\":1}}],[\"来解析\",{\"1\":{\"19\":1}}],[\"会使用\",{\"1\":{\"19\":1}}],[\"扩展\",{\"0\":{\"19\":1,\"20\":1},\"1\":{\"20\":1}}],[\"如果你不了解它\",{\"1\":{\"18\":1}}],[\"如果你是一个新手\",{\"1\":{\"17\":1}}],[\"是\",{\"1\":{\"18\":1}}],[\"通过\",{\"1\":{\"18\":1,\"21\":1}}],[\"配置\",{\"0\":{\"18\":1}}],[\"配置项的相关说明详见\",{\"1\":{\"0\":1}}],[\"演示\",{\"1\":{\"17\":1}}],[\"和\",{\"1\":{\"17\":1,\"36\":1}}],[\"还不会编写\",{\"1\":{\"17\":1}}],[\"介绍\",{\"0\":{\"17\":1,\"44\":1,\"48\":1},\"1\":{\"17\":1,\"18\":1}}],[\"可以根据文件结构将它们转换为不同的页面\",{\"1\":{\"16\":1}}],[\"以便\",{\"1\":{\"16\":1}}],[\"因此可以借助于\",{\"1\":{\"19\":1}}],[\"因此\",{\"1\":{\"16\":1}}],[\"展示\",{\"0\":{\"16\":1}}],[\"中使用\",{\"1\":{\"22\":1,\"38\":1}}],[\"中的第一个\",{\"1\":{\"35\":1}}],[\"中的\",{\"1\":{\"20\":1}}],[\"中很重要的一个概念\",{\"1\":{\"18\":1}}],[\"中自定义它们\",{\"1\":{\"13\":1}}],[\"中设置页面信息\",{\"1\":{\"36\":1}}],[\"中设置页面标题\",{\"1\":{\"35\":1}}],[\"中设置\",{\"1\":{\"0\":1}}],[\"打印按钮\",{\"1\":{\"13\":1}}],[\"夜间模式按钮\",{\"1\":{\"13\":1}}],[\"主题扩展了更多\",{\"1\":{\"21\":1}}],[\"主题扩展\",{\"0\":{\"21\":1}}],[\"主题也带有以下元素\",{\"1\":{\"13\":1}}],[\"主要从\",{\"1\":{\"16\":1}}],[\"主要功能与配置演示\",{\"0\":{\"5\":1}}],[\"文件夹的图片\",{\"1\":{\"37\":1}}],[\"文件放置在一起使用相对路径进行引用\",{\"1\":{\"37\":1}}],[\"文件\",{\"1\":{\"16\":1}}],[\"文件生成页面\",{\"1\":{\"16\":1}}],[\"文章标题列表\",{\"1\":{\"13\":1}}],[\"文字\",{\"1\":{\"10\":2}}],[\"文字段落\",{\"1\":{\"10\":24}}],[\"title\",{\"1\":{\"35\":3}}],[\"the\",{\"1\":{\"35\":1}}],[\"toc\",{\"1\":{\"13\":1}}],[\"true\",{\"1\":{\"0\":1}}],[\"同时每个页面包含\",{\"1\":{\"13\":1}}],[\"布局包括\",{\"1\":{\"13\":1}}],[\"布局\",{\"0\":{\"13\":1},\"2\":{\"15\":1}}],[\"布局与功能禁用\",{\"0\":{\"7\":1}}],[\"加密\",{\"2\":{\"12\":1}}],[\"2020\",{\"1\":{\"36\":1}}],[\"2\",{\"1\":{\"10\":14,\"29\":1}}],[\"19th\",{\"1\":{\"24\":1}}],[\"1\",{\"1\":{\"10\":12,\"22\":1,\"29\":1,\"36\":2,\"38\":2}}],[\"段落\",{\"1\":{\"10\":2}}],[\"实际的文章内容\",{\"1\":{\"10\":1}}],[\"密码加密的文章\",{\"0\":{\"10\":1}}],[\"禁用\",{\"2\":{\"9\":1}}],[\"禁用了如下功能\",{\"1\":{\"7\":1}}],[\"返回顶部按钮\",{\"1\":{\"7\":1,\"13\":1}}],[\"页面都会被转换为一个\",{\"1\":{\"38\":1}}],[\"页面内容\",{\"0\":{\"37\":1}}],[\"页面标题\",{\"0\":{\"35\":1},\"1\":{\"35\":1}}],[\"页面配置\",{\"0\":{\"34\":1},\"1\":{\"36\":1},\"2\":{\"40\":1}}],[\"页面引入配置\",{\"1\":{\"18\":1}}],[\"页面信息\",{\"0\":{\"36\":1},\"1\":{\"7\":1}}],[\"页脚\",{\"1\":{\"7\":1,\"13\":1}}],[\"评论\",{\"1\":{\"7\":1,\"13\":1}}],[\"链接\",{\"1\":{\"7\":1,\"22\":1}}],[\"下一篇\",{\"1\":{\"7\":1}}],[\"更新时间等页面元信息\",{\"1\":{\"13\":1}}],[\"更新时间\",{\"1\":{\"7\":1}}],[\"编辑此页链接\",{\"1\":{\"7\":1}}],[\"贡献者\",{\"1\":{\"7\":1,\"13\":1}}],[\"路径导航\",{\"1\":{\"7\":1,\"13\":1}}],[\"侧边栏\",{\"1\":{\"7\":1,\"13\":1}}],[\"导航栏\",{\"1\":{\"7\":1,\"13\":1}}],[\"本页面就是一个示例\",{\"1\":{\"7\":1}}],[\"在页面禁用功能与布局\",{\"1\":{\"7\":1}}],[\"使用指南\",{\"1\":{\"36\":2},\"2\":{\"6\":1,\"8\":1,\"11\":1,\"32\":1,\"39\":1,\"40\":1,\"42\":1,\"52\":1,\"54\":1}}],[\"found\",{\"1\":{\"56\":1}}],[\"foo\",{\"0\":{\"4\":1,\"47\":1},\"1\":{\"48\":1}}],[\"first\",{\"1\":{\"35\":1}}],[\"frontmatter\",{\"1\":{\"7\":1,\"13\":1,\"18\":3,\"35\":1,\"36\":1}}],[\"front\",{\"1\":{\"0\":1}}],[\"指南\",{\"0\":{\"1\":1},\"2\":{\"14\":1}}],[\"你也可以创建并引入你自己的组件\",{\"1\":{\"38\":1}}],[\"你需要阅读\",{\"1\":{\"18\":1}}],[\"你需要在页面\",{\"1\":{\"0\":1}}],[\"你应该创建和编写\",{\"1\":{\"16\":1}}],[\"你可以将图片和\",{\"1\":{\"37\":1}}],[\"你可以自由在这里书写你的\",{\"1\":{\"37\":1}}],[\"你可以标记\",{\"1\":{\"28\":1}}],[\"你可以使用它轻松生成文档或博客站点\",{\"1\":{\"16\":1}}],[\"你可以在\",{\"1\":{\"35\":1,\"36\":1}}],[\"你可以在主题选项和页面的\",{\"1\":{\"13\":1}}],[\"你可以在这里放置你的主体内容\",{\"1\":{\"0\":1}}],[\"你可以通过设置页面的\",{\"1\":{\"7\":1}}],[\"想要使用此布局\",{\"1\":{\"0\":1}}],[\"项目主页配置\",{\"1\":{\"0\":1}}],[\"项目主页\",{\"0\":{\"0\":1}}]],\"serializationVersion\":2}}")).map(([e,t])=>[e,wt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n}})=>{e==="suggest"?self.postMessage(et(t,v[s],n)):e==="search"?self.postMessage(tt(t,v[s],n)):self.postMessage({suggestions:et(t,v[s],n),results:tt(t,v[s],n)})};
//# sourceMappingURL=index.js.map

webpackJsonp([1],{"/eQD":function(t,e){},"5kWq":function(t,e){},AB0r:function(t,e){},"Cj3+":function(t,e){},MXkr:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("4yKu");var s=a("wolx"),n=(a("3Lne"),a("SSsa")),i=(a("k3b4"),a("+2ln")),r=(a("mMXg"),a("qYlo")),c=(a("nI2B"),a("qWG/")),o=(a("OWWB"),a("1fWZ")),l=a("7+uW"),h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var d=a("VU/8")({name:"App"},h,!1,function(t){a("OErC")},"data-v-1ed10a27",null).exports,u=a("/ocq"),p=a("Gu7T"),v=a.n(p),m=a("//Fk"),f=a.n(m),b=a("BO1k"),w=a.n(b),y=(a("eqfM"),a("/QYm")),_={data:function(){return{show:!1,tabsValue:{},tabsNames:{},parentActive:0,children:[]}},props:{tabsItems:{type:Array},striped:{type:Boolean,default:!1},lineBetween:{type:Boolean,default:!1}},methods:{itemClick:function(t){this.children=this.tabsItems[t].children;var e=void 0;try{(e=this.tabsValue[t]).parent=t}catch(a){e={parent:t}}this.$set(this.tabsValue,t,e),this.parentActive=t,this.children?this.show=!0:this.show=!1},setItem:function(t){var e=this,a={indexs:[],ids:[]};return this.tabsItems[this.parentActive].radio?(this.children=this.children.map(function(a,s){return t===s?(a.select=!0,e.tabsNames[e.parentActive]=a.name):a.select=!1,a}),this.show=!1):0===t?this.children=this.children.map(function(e,a){return e.select=t===a,e}):(this.children[0].select=!1,this.children=this.children.map(function(e,a){return t===a&&(e.select=!e.select),e})),this.children.forEach(function(t,e){t.select&&(a.indexs.push(e),a.ids.push(t.id))}),a},reset:function(){this.tabsValue={},this.show=!1,this.tabsItems.forEach(function(t){t.children.forEach(function(t){t.select=!1})})},subClick:function(t){var e=void 0,a=this.setItem(t);try{(e=this.tabsValue[this.parentActive]).subIndex=a.indexs,e.subId=a.ids}catch(t){e={parent:this.parentActive,subIndex:a.index,subId:a.ids}}this.$set(this.tabsValue,this.parentActive,e),this.$emit("click",this.tabsValue[this.parentActive])}}},k={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wrap"},[a("div",{staticClass:"tabs",class:{striped:t.striped}},t._l(t.tabsItems,function(e,s){return a("div",{key:s,staticClass:"child",on:{click:function(e){t.itemClick(s)}}},[a("span",{class:{"van-hairline--left":t.lineBetween&&0!=s}},[t.tabsNames[s]?a("span",[t._v(t._s(t.tabsNames[s]))]):a("span",[t._v("\n          "+t._s(e.name)+"\n        ")]),t._v(" "),e.children?a("i",{staticClass:"icon van-icon van-icon-arrow"}):t._e()])])})),t._v(" "),a("van-popup",{attrs:{position:"top",transition:"fade"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[a("div",{staticClass:"padding"},t._l(t.children,function(e,s){return a("div",{key:s,staticClass:"item",class:e.select?"select":"",on:{click:function(e){t.subClick(s)}}},[t._v("\n        "+t._s(e.name)+"\n        "),a("i",{staticClass:"icon van-icon van-icon-success"})])}))])],1)},staticRenderFns:[]};var x="http://aldexam.com:19080/",g={province:x+"data/province",type:x+"data/type",batch:x+"data/batch",score:x+"score",header:x+"score/header",download:x+"score/download"},C={data:function(){return{score:"",type:1,params:{},showSort:!1,activeName:"文科",tableHeader:[],listUrl:"",downloadUrl:"",listData:[],tabsItems:[{name:"省份",children:[]},{name:"分类",children:[]},{name:"批次",children:[]},{name:"排序",radio:!0,children:[{id:1,name:"综合排名"},{id:2,name:"地区排名"},{id:3,name:"类别排名"}]},{name:"策略",radio:!0,children:[{id:"",name:"全部"},{id:1,name:"低"},{id:2,name:"高"},{id:3,name:"中"}]}],sortData:[{text:"理科",type:2},{text:"文科",type:1}]}},filters:{tactics:function(t){if("number"==typeof t)return t;var e=parseInt(t);return 1===e?"低":2===e?"高":3===e?"中":t}},components:{Tabs:a("VU/8")(_,k,!1,function(t){a("OrkN")},"data-v-5e04ece3",null).exports},methods:{download:function(){var t="";for(var e in this.params)"filter"!==e&&(t+="&"+e+"="+this.params[e]);t&&(t=t.substring(1)),window.open(this.downloadUrl+"?"+t)},itemClick:function(t){var e=parseInt(t.parent),a=t.subId.join(",");0===e?this.$set(this.params,"province",a):1===e?this.$set(this.params,"ctype",a):2===e?this.$set(this.params,"batch",a):3===e?this.$set(this.params,"seq",a):4===e&&this.$set(this.params,"filter",a),this.listUrl&&this.changeParams()},onSearch:function(){var t=this;this.score?(this.listUrl=g.score+"/"+this.score+"/"+this.type,this.downloadUrl=g.download+"/"+this.score+"/"+this.type,this.reset(),y.a.loading({mask:!0,duration:0,message:"正在查询..."}),this.$axios.get(this.listUrl).then(function(e){y.a.clear(),e.length?t.listData=t.getListData(e):(t.listData=[],Object(y.a)("没有查询到数据"))}).catch(function(t){console.log(t),Object(y.a)("接口请求失败")})):Object(y.a)("请先输入线差")},changeParams:function(){var t=this,e=this.params,a=e.province,s=e.ctype,n=e.batch,i=e.seq,r=e.filter;y.a.loading({mask:!0,duration:0,message:"正在查询..."}),this.$axios.get(this.listUrl,{params:{province:a,ctype:s,batch:n,seq:i}}).then(function(e){if(y.a.clear(),e.length){var a=void 0;a=r?e.filter(function(t){return t.type===r}):e,t.listData=t.getListData(a)}else t.listData=[],Object(y.a)("没有查询到数据")}).catch(function(t){console.log(t),Object(y.a)("接口请求失败")})},reset:function(){this.$refs.tabs.reset(),this.params={}},getListData:function(t){var e=void 0,a=[],s=!0,n=!1,i=void 0;try{for(var r,c=w()(t);!(s=(r=c.next()).done);s=!0){e=r.value;var o=[],l=void 0,h=!0,d=!1,u=void 0;try{for(var p,v=w()(this.tableHeader);!(h=(p=v.next()).done);h=!0)l=p.value,console.log(l),o.push({name:l.desc,value:e[l.name]})}catch(t){d=!0,u=t}finally{try{!h&&v.return&&v.return()}finally{if(d)throw u}}a.push(o)}}catch(t){n=!0,i=t}finally{try{!s&&c.return&&c.return()}finally{if(n)throw i}}return a},sortOk:function(t,e){this.showSort=!1,this.activeName=t.text,this.type=t.type},sortCancel:function(t){this.showSort=!1,console.log(t)}},created:function(){var t=this;f.a.all([this.$axios.get(g.province),this.$axios.get(g.type),this.$axios.get(g.batch)]).then(function(e){t.tabsItems[0].children=[{id:"",name:"全部"}].concat(v()(t.tabsItems[0].children),v()(e[0])),t.tabsItems[1].children=[{id:"",name:"全部"}].concat(v()(t.tabsItems[1].children),v()(e[1])),t.tabsItems[2].children=[{id:"",name:"全部"}].concat(v()(t.tabsItems[2].children),v()(e[2]))}),this.$axios.get(g.header).then(function(e){t.tableHeader=e})}},I={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pages"},[a("div",{staticClass:"header"},[a("div",{staticClass:"sort-btn",on:{click:function(e){t.showSort=!t.showSort}}},[t._v("\n      "+t._s(t.activeName)+"\n      "),a("span",{staticClass:"arrow"})]),t._v(" "),a("form",{attrs:{action:"/"}},[a("van-search",{attrs:{placeholder:"请输入线差","show-action":""},on:{search:t.onSearch},model:{value:t.score,callback:function(e){t.score=e},expression:"score"}},[a("div",{staticClass:"search-btn-wrap",attrs:{slot:"action"},slot:"action"},[a("van-button",{attrs:{size:"small",tag:"span"},on:{click:t.onSearch}},[t._v("搜索")])],1)])],1)]),t._v(" "),a("Tabs",{ref:"tabs",staticClass:"van-hairline--bottom",attrs:{lineBetween:"",tabsItems:t.tabsItems},on:{click:t.itemClick}}),t._v(" "),t.listData.length?a("van-cell",{attrs:{title:"文件"}},[a("van-button",{attrs:{type:"primary",size:"small"},on:{click:t.download}},[t._v("下载")])],1):t._e(),t._v(" "),a("div",{staticClass:"container"},[a("table",[a("thead",[a("tr",t._l(t.tableHeader,function(e,s){return a("th",{key:s},[t._v(t._s(e.desc))])}))]),t._v(" "),a("tbody",t._l(t.listData,function(e,s){return a("tr",{key:s},t._l(e,function(e,s){return a("td",{key:s},[t._v(t._s(t._f("tactics")(e.value)))])}))}))]),t._v(" "),t.listData.length?t._e():a("div",{staticClass:"no-content text-center padding"},[t._v("\n      ---没有查询到数据---\n    ")])]),t._v(" "),a("van-popup",{attrs:{position:"bottom"},model:{value:t.showSort,callback:function(e){t.showSort=e},expression:"showSort"}},[a("van-picker",{attrs:{"show-toolbar":"",title:"请选择",columns:t.sortData},on:{confirm:t.sortOk,cancel:t.sortCancel},model:{value:t.params.sort,callback:function(e){t.$set(t.params,"sort",e)},expression:"params.sort"}})],1)],1)},staticRenderFns:[]};var $=a("VU/8")(C,I,!1,function(t){a("AB0r")},"data-v-2c2c2b82",null).exports;l.a.use(u.a);var D=new u.a({routes:[{path:"*",redirect:"/index"},{path:"/index",component:$}]}),O=a("mtWM"),A=a.n(O);A.a.defaults.timeout=2e4,A.a.defaults.headers["Content-Type"]="application/x-www-form-urlencoded",A.a.interceptors.response.use(function(t){return t.data},function(t){return f.a.reject(t)}),l.a.prototype.$axios=A.a;a("MXkr");l.a.config.productionTip=!1,l.a.use(s.a).use(n.a).use(i.a).use(r.a).use(c.a).use(o.a),a("hKoQ").polyfill(),new l.a({el:"#app",router:D,components:{App:d},template:"<App/>"})},OErC:function(t,e){},OrkN:function(t,e){},dSDO:function(t,e){},f4F5:function(t,e){},lbtJ:function(t,e){}},["NHnr"]);
(function(t){function e(e){for(var n,r,o=e[0],c=e[1],l=e[2],d=0,p=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&p.push(s[r][0]),s[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(p.length)p.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,o=1;o<a.length;o++){var c=a[o];0!==s[c]&&(n=!1)}n&&(i.splice(e--,1),t=r(r.s=a[0]))}return t}var n={},s={app:0},i=[];function r(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=n,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var n=a("8a23"),s=a.n(n);s.a},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-content",[a("div",{staticClass:"viewport_wrapper"},[a("div",{staticClass:"mask_phone"},[a("div",{staticClass:"main_wrapper"},[a("div",{staticClass:"status_bar"},[t._v(t._s(t.timestamp))]),a("div",{staticClass:"header"},[t._v(" 친구 ")]),a("div",{staticClass:"my_profile"},[a("div",{staticClass:"my_avatar"}),a("div",{staticClass:"my_info"},[a("div",{staticClass:"my_name"},[t._v(" 김박사 ")]),a("div",{staticClass:"my_status"},[t._v(" Lab Apocalypse ")])])]),a("div",{staticClass:"divider"}),a("div",{staticClass:"friends_header"},[t._v(" 친구 1 ")]),a("div",{staticClass:"friend_profile",on:{click:t.openSheet}},[a("div",{staticClass:"friend_avatar"}),a("div",{staticClass:"friend_info"},[a("div",{staticClass:"friend_name"},[t._v(" 고양휘 ")]),a("div",{staticClass:"friend_status"},[t._v(" 클릭해서 시작하세요! ")])])]),a("div",{staticClass:"footer"},[t._v(" CS372 Team 11 ")]),a("div",{staticClass:"sheet_profile",class:{activated:t.open}},[a("div",{staticClass:"profile_close"},[a("v-btn",{attrs:{icon:"",color:"white"},on:{click:t.closeSheet}},[a("v-icon",[t._v("mdi-close")])],1)],1),a("div",{staticClass:"profile_avatar"}),a("div",{staticClass:"profile_name"},[t._v(" 고양휘 ")]),a("div",{staticClass:"profile_status"},[a("v-text-field",{staticClass:"profile_status",attrs:{dark:"",color:"white",dense:"",counter:"",maxlength:"90",placeholder:"초성을 입력하세요.",rules:[t.rules.required,t.rules.kor]},model:{value:t.consonants,callback:function(e){t.consonants=e},expression:"consonants"}})],1),a("div",{staticClass:"profile_divider"}),a("div",{staticClass:"profile_action"},[a("div",{staticClass:"profile_analysis"},[a("v-icon",{attrs:{color:"#e9e9e9"}},[t._v("mdi-magnify")]),a("span",[t._v("분석하기")])],1)])])])])])])],1)},i=[],r={name:"App",computed:{},data:function(){return{timestamp:"",open:!1,consonants:"",rules:{required:function(t){return!!t||"최소 한 글자 이상 입력해주세요."},kor:function(t){var e=/^[\u3131-\uD79D]+$/;return e.test(t)||"한국어 입력만 가능합니다."}}}},created:function(){setInterval(this.getNow,1e3)},methods:{getNow:function(){var t=new Date,e=t.getHours()+":";t.getMinutes()<10&&(e+="0"),e+=t.getMinutes(),this.timestamp=e},openSheet:function(){var t=this;this.open=!0,setTimeout((function(){t.bgLoad=!0}),1e3)},closeSheet:function(){this.open=!1}}},o=r,c=(a("034f"),a("2877")),l=a("6544"),u=a.n(l),d=a("7496"),p=a("8336"),f=a("a75b"),v=a("132d"),_=a("8654"),h=Object(c["a"])(o,s,i,!1,null,null,null),m=h.exports;u()(h,{VApp:d["a"],VBtn:p["a"],VContent:f["a"],VIcon:v["a"],VTextField:_["a"]});a("d1e78");var C=a("f309");n["a"].use(C["a"]);var b=new C["a"]({icons:{iconfont:"md"}});n["a"].config.productionTip=!1,new n["a"]({vuetify:b,render:function(t){return t(m)}}).$mount("#app")},"8a23":function(t,e,a){}});
//# sourceMappingURL=app.38efe03d.js.map
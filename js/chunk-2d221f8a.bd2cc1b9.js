(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d221f8a"],{cd2e:function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{staticClass:"fill-height align-start",attrs:{fluid:""}},[r("v-container",{staticClass:"ma-0 pa-0"},[r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("h1",{staticClass:"text-h3 font-weight-light"},[t._v("DEBUG - Configurações processamento")])])],1),r("v-row",[r("v-col",{attrs:{cols:"3"}},[r("v-btn",{attrs:{elevation:"2",color:"warning"},on:{click:t.iniciarProcessamento}},[t._v("Iniciar processamento")])],1),r("v-col",{attrs:{cols:"3"}},[r("v-btn",{attrs:{elevation:"2",color:"error"},on:{click:t.pararProcessamento}},[t._v("Parar processamento")])],1)],1)],1)],1)},n=[],a=(r("96cf"),r("1da1")),s=r("ad8e"),c={name:"ProcessamentoConfig",data:function(){return{}},methods:{iniciarProcessamento:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s["a"].postIniciarProcessamento();case 3:this.showToast("Processamento iniciado!"),t.next=10;break;case 6:t.prev=6,t.t0=t["catch"](0),console.log(t.t0),this.showToast("Ocorreu um erro.","Erro","error");case 10:case"end":return t.stop()}}),t,this,[[0,6]])})));function e(){return t.apply(this,arguments)}return e}(),pararProcessamento:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s["a"].postPararProcessamento();case 3:this.showToast("Processamento parado!","Info","info"),t.next=10;break;case 6:t.prev=6,t.t0=t["catch"](0),console.log(t.t0),this.showToast("Ocorreu um erro.","Erro","error");case 10:case"end":return t.stop()}}),t,this,[[0,6]])})));function e(){return t.apply(this,arguments)}return e}(),showToast:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Sucesso",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"success";this.$swal({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,icon:r,title:e,text:t})}}},i=c,u=r("2877"),l=r("6544"),h=r.n(l),p=r("8336"),v=r("62ad"),m=r("a523"),f=r("0fd9"),w=Object(u["a"])(i,o,n,!1,null,null,null);e["default"]=w.exports;h()(w,{VBtn:p["a"],VCol:v["a"],VContainer:m["a"],VRow:f["a"]})}}]);
//# sourceMappingURL=chunk-2d221f8a.bd2cc1b9.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31afe64a"],{"169a":function(e,a,t){"use strict";t("7db0"),t("caad"),t("45fc"),t("a9e3"),t("2532"),t("498a");var i=t("5530"),n=t("2909"),o=t("ade3"),s=(t("368e"),t("480e")),r=t("4ad4"),c=t("b848"),l=t("75eb"),d=t("e707"),u=t("e4d3"),h=t("21be"),f=t("f2e7"),v=t("a293"),p=t("58df"),m=t("d9bd"),g=t("80d2"),b=Object(p["a"])(r["a"],c["a"],l["a"],d["a"],u["a"],h["a"],f["a"]);a["a"]=b.extend({name:"v-dialog",directives:{ClickOutside:v["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200,previousActiveElement:null}},computed:{classes:function(){var e;return e={},Object(o["a"])(e,"v-dialog ".concat(this.contentClass).trim(),!0),Object(o["a"])(e,"v-dialog--active",this.isActive),Object(o["a"])(e,"v-dialog--persistent",this.persistent),Object(o["a"])(e,"v-dialog--fullscreen",this.fullscreen),Object(o["a"])(e,"v-dialog--scrollable",this.scrollable),Object(o["a"])(e,"v-dialog--animated",this.animate),e},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(e){var a;e?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null==(a=this.previousActiveElement)||a.focus())},fullscreen:function(e){this.isActive&&(e?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(m["e"])("full-width",this)},beforeMount:function(){var e=this;this.$nextTick((function(){e.isBooted=e.isActive,e.isActive&&e.show()}))},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var e=this;this.animate=!1,this.$nextTick((function(){e.animate=!0,window.clearTimeout(e.animateTimeout),e.animateTimeout=window.setTimeout((function(){return e.animate=!1}),150)}))},closeConditional:function(e){var a=e.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(a)||this.overlay&&a&&!this.overlay.$el.contains(a))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):d["a"].options.methods.hideScroll.call(this)},show:function(){var e=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){e.$nextTick((function(){e.previousActiveElement=document.activeElement,e.$refs.content.focus(),e.bind()}))}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(e){this.$emit("click:outside",e),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(e){if(e.keyCode===g["w"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var a=this.getActivator();this.$nextTick((function(){return a&&a.focus()}))}this.$emit("keydown",e)},onFocusin:function(e){if(e&&this.retainFocus){var a=e.target;if(a&&![document,this.$refs.content].includes(a)&&!this.$refs.content.contains(a)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(e){return e.contains(a)}))){var t=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),i=Object(n["a"])(t).find((function(e){return!e.hasAttribute("disabled")}));i&&i.focus()}}},genContent:function(){var e=this;return this.showLazyContent((function(){return[e.$createElement(s["a"],{props:{root:!0,light:e.light,dark:e.dark}},[e.$createElement("div",{class:e.contentClasses,attrs:Object(i["a"])({role:"document",tabindex:e.isActive?0:void 0},e.getScopeIdAttrs()),on:{keydown:e.onKeydown},style:{zIndex:e.activeZIndex},ref:"content"},[e.genTransition()])])]}))},genTransition:function(){var e=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[e]):e},genInnerContent:function(){var e={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(e.style=Object(i["a"])(Object(i["a"])({},e.style),{},{maxWidth:"none"===this.maxWidth?void 0:Object(g["g"])(this.maxWidth),width:"auto"===this.width?void 0:Object(g["g"])(this.width)})),this.$createElement("div",e,this.getContentSlot())}},render:function(e){return e("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},"368e":function(e,a,t){},"3ca7":function(e,a,t){"use strict";t.r(a);var i=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("v-container",{staticClass:"fill-height align-start",attrs:{fluid:""}},[t("v-container",{staticClass:"ma-0 pa-0"},[t("v-row",[t("v-col",[t("h1",{staticClass:"text-h3 font-weight-light"},[e._v(" Operadoras e Financeiras ")])])],1),t("v-row",[t("v-col",{attrs:{cols:"6"}},[t("v-text-field",{attrs:{label:"Pesquisar"},on:{input:e.debounceSearch}})],1)],1),t("v-row",[t("v-col",[t("v-data-table",{staticClass:"table-cursor elevation-1 row-pointer",attrs:{headers:e.headers,items:e.linhasClassificadas,"items-per-page":5,search:e.search,"custom-filter":e.customFilter,"footer-props":{showFirstLastPage:!0,firstIcon:"mdi-arrow-collapse-left",lastIcon:"mdi-arrow-collapse-right",prevIcon:"mdi-minus",nextIcon:"mdi-plus"}},on:{"click:row":e.classificacaoClick},scopedSlots:e._u([{key:"item.linha",fn:function(a){var t=a.item;return[e._v(" "+e._s(t.linha.codificacao+" - "+t.linha.descricao)+" ")]}},{key:"item.tipoLinha",fn:function(a){var t=a.item;return[e._v(" "+e._s(t.tipoLinha.nome)+" ")]}},{key:"item.dataValidade",fn:function(a){var t=a.item;return[e._v(" "+e._s(null===t.dataValidade?"-":t.dataValidade)+" ")]}}],null,!0)})],1)],1),t("EditarOperadoraFinanceira",{attrs:{classificacao:e.classificacaoSelecionada},on:{closeModal:e.closeModal}})],1)],1)},n=[],o=(t("caad"),t("ac1f"),t("2532"),t("841c"),t("96cf"),t("1da1")),s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return null!==e.classificacao?t("v-row",{attrs:{justify:"center"}},[t("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:e.dialog,callback:function(a){e.dialog=a},expression:"dialog"}},[t("v-card",[t("v-toolbar",{attrs:{dark:"",color:"purple"}},[t("v-btn",{attrs:{icon:"",dark:""},on:{click:e.closeModal}},[t("v-icon",[e._v("mdi-close")])],1),t("v-toolbar-title",[e._v(" Configurar Operadora e Financeira: "+e._s(e.classificacao.linha.codificacao+" - "+e.classificacao.linha.descricao)+" ")]),t("v-spacer"),t("v-toolbar-items",[t("v-btn",{attrs:{dark:"",text:""},on:{click:e.closeModal}},[e._v(" OK ")])],1)],1),t("v-list",{attrs:{"three-line":"",subheader:""}},[t("v-subheader",[e._v("Detalhes Operadoras e Financeiras: "+e._s(e.classificacao.linha.codificacao+" - "+e.classificacao.linha.descricao))]),t("v-list-item",[t("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.ofiOperadorasFinanceiras,"items-per-page":-1,"hide-default-footer":""},scopedSlots:e._u([{key:"item.operadora",fn:function(a){var t=a.item;return[e._v(" "+e._s(null!==t.operadora?t.operadora:"Qualquer Operadora")+" ")]}},{key:"item.financeira",fn:function(a){var t=a.item;return[e._v(" "+e._s(null!==t.financeira?t.financeira:"Própria Operadora")+" ")]}},{key:"item.controls",fn:function(a){return[t("v-btn",{attrs:{dark:"",small:"",color:"red"},on:{click:function(t){return e.onDeleteButtonClick(a.item)}}},[t("v-icon",{attrs:{dark:""}},[e._v("mdi-delete-outline")])],1)]}}],null,!0)})],1),t("v-list-item",[t("v-container",{staticClass:"ma-0 pa-0"},[t("v-row",[t("v-col",{attrs:{cols:"3"}},[t("v-text-field",{attrs:{label:"Operadora",clearable:"",required:""},model:{value:e.cadastro.operadora,callback:function(a){e.$set(e.cadastro,"operadora",a)},expression:"cadastro.operadora"}})],1),t("v-col",{attrs:{cols:"3"}},[t("v-text-field",{attrs:{label:"Financeira",clearable:"",required:""},model:{value:e.cadastro.financeira,callback:function(a){e.$set(e.cadastro,"financeira",a)},expression:"cadastro.financeira"}})],1),t("v-col",{attrs:{cols:"6"}},[t("v-btn",{attrs:{color:"primary"},on:{click:e.onCadastroButtonClick}},[e._v("Adicionar")])],1)],1)],1)],1)],1)],1)],1)],1):e._e()},r=[],c=(t("498a"),t("ad8e")),l={name:"EditarOperadoraFinanceira",props:{classificacao:Object},data:function(){return{dialog:!1,notifications:!1,sound:!0,widgets:!1,cadastro:{operadora:"",financeira:""},headers:[{text:"operadora",value:"operadora"},{text:"financeira",value:"financeira"},{text:"",value:"controls",sortable:!1}],ofiOperadorasFinanceiras:[]}},watch:{classificacao:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.debug("Classificacao atualizada"),console.log(this.classificacao.linha.descricao),this.dialog=!0,e.prev=3,e.next=6,c["a"].getOperadoraFinanceiraCllId(this.classificacao.id);case 6:a=e.sent,console.log(a,JSON.parse(JSON.stringify(a.operadorasFinanceiras))),this.ofiOperadorasFinanceiras=a.operadorasFinanceiras,console.info("ok"),e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](3),console.error("erro ao carregar");case 15:case"end":return e.stop()}}),e,this,[[3,12]])})));function a(){return e.apply(this,arguments)}return a}()},methods:{closeModal:function(){this.dialog=!1,this.$emit("closeModal")},onDeleteButtonClick:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(a){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(a),e.prev=1,e.next=4,c["a"].deleteOperadoraFinanceira(a.ofiId);case 4:console.info("Sucesso no delete"),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](1),console.error("Erro no cadastro");case 10:return e.prev=10,e.next=13,c["a"].getOperadoraFinanceiraCllId(this.classificacao.id);case 13:t=e.sent,console.log(t,JSON.parse(JSON.stringify(t.operadorasFinanceiras))),this.ofiOperadorasFinanceiras=t.operadorasFinanceiras,console.info("ok"),e.next=22;break;case 19:e.prev=19,e.t1=e["catch"](10),console.error("erro ao carregar");case 22:case"end":return e.stop()}}),e,this,[[1,7],[10,19]])})));function a(a){return e.apply(this,arguments)}return a}(),onCadastroButtonClick:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var a,t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={cllId:this.classificacao.id,operadora:null===this.cadastro.operadora||""===this.cadastro.operadora.trim()?null:+this.cadastro.operadora,financeira:null===this.cadastro.financeira||""===this.cadastro.financeira.trim()?null:+this.cadastro.financeira},e.prev=1,e.next=4,c["a"].postOperadoraFinanceira(a);case 4:console.info("Sucesso no cadastro"),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](1),console.error("Erro no cadastro");case 10:return e.prev=10,e.next=13,c["a"].getOperadoraFinanceiraCllId(this.classificacao.id);case 13:t=e.sent,console.log(t,JSON.parse(JSON.stringify(t.operadorasFinanceiras))),this.ofiOperadorasFinanceiras=t.operadorasFinanceiras,console.info("ok"),e.next=22;break;case 19:e.prev=19,e.t1=e["catch"](10),console.error("erro ao carregar");case 22:case"end":return e.stop()}}),e,this,[[1,7],[10,19]])})));function a(){return e.apply(this,arguments)}return a}()}},d=l,u=t("2877"),h=t("6544"),f=t.n(h),v=t("8336"),p=t("b0af"),m=t("62ad"),g=t("a523"),b=t("8fea"),k=t("169a"),w=t("132d"),O=t("8860"),C=t("da13"),x=t("0fd9"),y=(t("20f6"),t("80d2")),_=Object(y["h"])("spacer","div","v-spacer"),F=t("e0c7"),S=t("8654"),V=t("71d9"),$=t("2a7f"),j=Object(u["a"])(d,s,r,!1,null,null,null),A=j.exports;f()(j,{VBtn:v["a"],VCard:p["a"],VCol:m["a"],VContainer:g["a"],VDataTable:b["a"],VDialog:k["a"],VIcon:w["a"],VList:O["a"],VListItem:C["a"],VRow:x["a"],VSpacer:_,VSubheader:F["a"],VTextField:S["a"],VToolbar:V["a"],VToolbarItems:$["a"],VToolbarTitle:$["b"]});var I=t("2ef0"),B=t.n(I),T={name:"OperadorasFinanceiras",title:"Operadoras e Financeiras",components:{EditarOperadoraFinanceira:A},data:function(){return{headers:[{text:"linha",value:"linha"},{text:"tipoLinha",value:"tipoLinha"},{text:"dataVigencia",value:"dataVigencia"},{text:"dataValidade",value:"dataValidade"}],linhasClassificadas:[],search:"",classificacaoSelecionada:null}},created:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c["a"].getListaClassificaoLinha();case 3:a=e.sent,this.linhasClassificadas=a.classificacaoLinha,console.log(a),console.info("Classificacao linhas carregado"),e.next=13;break;case 9:e.prev=9,e.t0=e["catch"](0),console.error("Não foi possivel carregar as Classificações de linhas"),this.showToast("Não foi possivel carregar as Classificações de linhas.","Erro","error");case 13:case"end":return e.stop()}}),e,this,[[0,9]])})));function a(){return e.apply(this,arguments)}return a}(),methods:{classificacaoClick:function(e){this.classificacaoSelecionada=e},closeModal:function(){console.log("Close modal")},debounceSearch:B.a.debounce((function(e){this.search=e,this.showToast("Realizando busca...","Info","info")}),2e3),customFilter:function(e,a,t){return null!=e&&null!=a&&e==a||t.linha.descricao.toLowerCase().includes(a.toLowerCase())||t.linha.codificacao.toLowerCase().includes(a.toLowerCase())||t.linId==a},showToast:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Sucesso",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"success";this.$swal({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,icon:t,title:a,text:e})}}},E=T,L=(t("3fd9"),Object(u["a"])(E,i,n,!1,null,"08c43ca5",null));a["default"]=L.exports;f()(L,{VCol:m["a"],VContainer:g["a"],VDataTable:b["a"],VRow:x["a"],VTextField:S["a"]})},"3fd9":function(e,a,t){"use strict";t("e5bc")},"615b":function(e,a,t){},b0af:function(e,a,t){"use strict";t("0481"),t("4069"),t("a9e3");var i=t("5530"),n=(t("615b"),t("10d2")),o=t("297c"),s=t("1c87"),r=t("58df");a["a"]=Object(r["a"])(o["a"],s["a"],n["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({"v-card":!0},s["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},n["a"].options.computed.classes.call(this))},styles:function(){var e=Object(i["a"])({},n["a"].options.computed.styles.call(this));return this.img&&(e.background='url("'.concat(this.img,'") center center / cover no-repeat')),e}},methods:{genProgress:function(){var e=o["a"].options.methods.genProgress.call(this);return e?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[e]):null}},render:function(e){var a=this.generateRouteLink(),t=a.tag,i=a.data;return i.style=this.styles,this.isClickable&&(i.attrs=i.attrs||{},i.attrs.tabindex=0),e(t,this.setBackgroundColor(this.color,i),[this.genProgress(),this.$slots.default])}})},e5bc:function(e,a,t){}}]);
//# sourceMappingURL=chunk-31afe64a.1663afad.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ea2e1d0"],{"0e06":function(e,t,i){},"16b7":function(e,t,i){"use strict";i("a9e3");var a=i("2b0e");t["a"]=a["a"].extend().extend({name:"delayable",props:{openDelay:{type:[Number,String],default:0},closeDelay:{type:[Number,String],default:0}},data:function(){return{openTimeout:void 0,closeTimeout:void 0}},methods:{clearDelay:function(){clearTimeout(this.openTimeout),clearTimeout(this.closeTimeout)},runDelay:function(e,t){var i=this;this.clearDelay();var a=parseInt(this["".concat(e,"Delay")],10);this["".concat(e,"Timeout")]=setTimeout(t||function(){i.isActive={open:!0,close:!1}[e]},a)}}})},"269a":function(e,t){e.exports=function(e,t){var i="function"===typeof e.exports?e.exports.extendOptions:e.options;for(var a in"function"===typeof e.exports&&(i.directives=e.exports.options.directives),i.directives=i.directives||{},t)i.directives[a]=i.directives[a]||t[a]}},"297c":function(e,t,i){"use strict";i("a9e3");var a=i("2b0e"),r=(i("c7cd"),i("5530")),s=i("ade3"),n=(i("6ece"),i("0789")),o=i("a9ad"),l=i("fe6c"),c=i("a452"),d=i("7560"),u=i("80d2"),h=i("58df"),v=Object(h["a"])(o["a"],Object(l["b"])(["absolute","fixed","top","bottom"]),c["a"],d["a"]),p=v.extend({name:"v-progress-linear",props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data:function(){return{internalLazyValue:this.value||0}},computed:{__cachedBackground:function(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar:function(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType:function(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer:function(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate:function(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:Object(u["g"])(this.normalizedValue,"%")}}))},__cachedIndeterminate:function(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream:function(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:Object(u["g"])(100-this.normalizedBuffer,"%")}})):null},backgroundStyle:function(){var e,t=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return e={opacity:t},Object(s["a"])(e,this.isReversed?"right":"left",Object(u["g"])(this.normalizedValue,"%")),Object(s["a"])(e,"width",Object(u["g"])(this.normalizedBuffer-this.normalizedValue,"%")),e},classes:function(){return Object(r["a"])({"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped},this.themeClasses)},computedTransition:function(){return this.indeterminate?n["c"]:n["d"]},isReversed:function(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer:function(){return this.normalize(this.bufferValue)},normalizedValue:function(){return this.normalize(this.internalLazyValue)},reactive:function(){return Boolean(this.$listeners.change)},styles:function(){var e={};return this.active||(e.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(e.width=Object(u["g"])(this.normalizedBuffer,"%")),e}},methods:{genContent:function(){var e=Object(u["r"])(this,"default",{value:this.internalLazyValue});return e?this.$createElement("div",{staticClass:"v-progress-linear__content"},e):null},genListeners:function(){var e=this.$listeners;return this.reactive&&(e.click=this.onClick),e},genProgressBar:function(e){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:Object(s["a"])({},e,!0)}))},onClick:function(e){if(this.reactive){var t=this.$el.getBoundingClientRect(),i=t.width;this.internalValue=e.offsetX/i*100}},normalize:function(e){return e<0?0:e>100?100:parseFloat(e)}},render:function(e){var t={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,style:{bottom:this.bottom?0:void 0,height:this.active?Object(u["g"])(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return e("div",t,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}}),m=p;t["a"]=a["a"].extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress:function(){return!1===this.loading?null:this.$slots.progress||this.$createElement(m,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},"615b":function(e,t,i){},"6da0":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-app-bar",{attrs:{app:"",color:"primary",dark:"","elevate-on-scroll":""}},[a("v-toolbar-title",[e._v("Seleção BRT - Debug")])],1),a("v-main",[a("v-container",{staticClass:"ma-0 pa-0 fill-height",attrs:{fluid:""}},[a("v-row",{staticClass:"text-center"},[a("v-col",{attrs:{cols:"12"}},[a("v-img",{attrs:{src:i("ad23"),contain:"",height:"100"}})],1),a("v-col",{staticClass:"mb-4"},[a("h1",{staticClass:"display-2 font-weight-bold mb-3"},[e._v("Selecione um BRT")])])],1),a("v-row",{staticClass:"text-center"},e._l(e.brts,(function(t){return a("v-col",{key:t.id,staticClass:"mb-4",attrs:{cols:"12",md:"3",sm:"3"}},[a("v-hover",{attrs:{"close-delay":"65"},scopedSlots:e._u([{key:"default",fn:function(i){var r=i.hover;return[a("v-card",{directives:[{name:"ripple",rawName:"v-ripple",value:{class:"primary--text"},expression:"{ class: `primary--text` }"}],staticClass:"mx-auto cursor-pointer",attrs:{elevation:r?1:0,color:r?"primary lighten-3":"","max-width":"300",outlined:""},on:{click:function(i){return e.selecionaBRT(t)}}},[a("v-list-item",{attrs:{"three-line":""}},[a("v-list-item-content",[a("v-list-item-title",{staticClass:"headline my-1"},[e._v(e._s(t.nome))]),a("v-list-item-subtitle",[e._v(e._s(t.descricao))])],1)],1)],1)]}}],null,!0)})],1)})),1)],1)],1),a("v-footer",{attrs:{absolute:"",color:"primary",dark:"",app:""}},[a("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[a("strong",[e._v("Ripper")]),e._v(" - "+e._s((new Date).getFullYear())+" ")])],1)],1)},r=[],s={name:"SelecionaBRT",title:"Seleção BRT",data:function(){return{brts:[{id:1,nome:"BRT A",descricao:"Brt operando A"},{id:2,nome:"BRT B",descricao:"Brt operando B"},{id:3,nome:"BRT C",descricao:"Brt operando C"},{id:4,nome:"BRT D",descricao:"Brt operando D"},{id:5,nome:"BRT E",descricao:"Brt operando E"}]}},methods:{selecionaBRT:function(e){console.log("Selecionado BRT",e.id,e.nome,e.descricao,e),this.$router.push("/brt/".concat(e.id))}}},n=s,o=(i("8548"),i("2877")),l=i("6544"),c=i.n(l),d=i("40dc"),u=i("b0af"),h=i("62ad"),v=i("a523"),p=i("553a"),m=i("16b7"),f=i("f2e7"),g=i("58df"),b=i("d9bd"),y=Object(g["a"])(m["a"],f["a"]).extend({name:"v-hover",props:{disabled:{type:Boolean,default:!1},value:{type:Boolean,default:void 0}},methods:{onMouseEnter:function(){this.runDelay("open")},onMouseLeave:function(){this.runDelay("close")}},render:function(){return this.$scopedSlots.default||void 0!==this.value?(this.$scopedSlots.default&&(e=this.$scopedSlots.default({hover:this.isActive})),Array.isArray(e)&&1===e.length&&(e=e[0]),e&&!Array.isArray(e)&&e.tag?(this.disabled||(e.data=e.data||{},this._g(e.data,{mouseenter:this.onMouseEnter,mouseleave:this.onMouseLeave})),e):(Object(b["c"])("v-hover should only contain a single element",this),e)):(Object(b["c"])("v-hover is missing a default scopedSlot or bound value",this),null);var e}}),_=i("adda"),B=i("da13"),C=i("5d23"),k=i("f6c4"),x=i("0fd9"),T=i("2a7f"),S=i("269a"),O=i.n(S),V=i("5607"),j=Object(o["a"])(n,a,r,!1,null,"1b0244f0",null);t["default"]=j.exports;c()(j,{VAppBar:d["a"],VCard:u["a"],VCol:h["a"],VContainer:v["a"],VFooter:p["a"],VHover:y,VImg:_["a"],VListItem:B["a"],VListItemContent:C["a"],VListItemSubtitle:C["b"],VListItemTitle:C["c"],VMain:k["a"],VRow:x["a"],VToolbarTitle:T["b"]}),O()(j,{Ripple:V["a"]})},"6ece":function(e,t,i){},8548:function(e,t,i){"use strict";i("0e06")},ad23:function(e,t,i){e.exports=i.p+"img/icons-actions-edit-select.08a1a6fd.svg"},b0af:function(e,t,i){"use strict";i("0481"),i("4069"),i("a9e3");var a=i("5530"),r=(i("615b"),i("10d2")),s=i("297c"),n=i("1c87"),o=i("58df");t["a"]=Object(o["a"])(s["a"],n["a"],r["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({"v-card":!0},n["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},r["a"].options.computed.classes.call(this))},styles:function(){var e=Object(a["a"])({},r["a"].options.computed.styles.call(this));return this.img&&(e.background='url("'.concat(this.img,'") center center / cover no-repeat')),e}},methods:{genProgress:function(){var e=s["a"].options.methods.genProgress.call(this);return e?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[e]):null}},render:function(e){var t=this.generateRouteLink(),i=t.tag,a=t.data;return a.style=this.styles,this.isClickable&&(a.attrs=a.attrs||{},a.attrs.tabindex=0),e(i,this.setBackgroundColor(this.color,a),[this.genProgress(),this.$slots.default])}})}}]);
//# sourceMappingURL=chunk-3ea2e1d0.1e725644.js.map
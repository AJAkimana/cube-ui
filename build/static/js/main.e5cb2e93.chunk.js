(this.webpackJsonpcube=this.webpackJsonpcube||[]).push([[0],{110:function(e,t,a){},136:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(9),s=a.n(r),i=a(17),o=(a(110),a(46)),l=a(12),j=a(27),d=a(34),u=a.n(d),b=a(57),h=a(58),O=a.n(h),x=a(59),m="USER_REGISTER_REQUEST",p="USER_REGISTER_SUCCESS",f="USER_REGISTER_FAIL",g="USER_SIGNIN_REQUEST",v="USER_SIGNIN_SUCCESS",S="USER_SIGNIN_FAIL",y="USER_SIGNOUT",N="USER_LIST_REQUEST",I="USER_LIST_SUCCESS",E="USER_LIST_FAIL",C=a(2);function w(){return Object(C.jsxs)("div",{className:"loading",children:[Object(C.jsx)("i",{className:"fa fa-spinner fa-spin"})," Loading..."]})}function R(e){return Object(C.jsx)("div",{className:"alert alert-".concat(e.variant||"info"),children:e.children})}var _=a.p+"static/media/ari_cube.2edefd08.png";function T(e){var t=Object(n.useState)(""),a=Object(j.a)(t,2),c=a[0],r=a[1],s=Object(n.useState)(""),o=Object(j.a)(s,2),l=o[0],d=o[1],h=e.location.search?e.location.search.split("=")[1]:"/home",m=Object(i.c)((function(e){return e.userSignin})),p=m.userInfo,f=m.loading,y=m.error,N=Object(i.b)();return Object(n.useEffect)((function(){p&&e.history.push(h)}),[e.history,h,p]),Object(C.jsx)("div",{children:Object(C.jsxs)("form",{className:"form",onSubmit:function(e){e.preventDefault(),N(function(e,t){return function(){var a=Object(b.a)(u.a.mark((function a(n){var c,r;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n({type:g,payload:{email:e,password:t}}),a.prev=1,a.next=4,O.a.post("".concat(x.a.API_URL,"auth/login"),{email:e,password:t});case 4:c=a.sent,r=c.data,n({type:v,payload:r}),localStorage.setItem("userInfo",JSON.stringify(r)),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(1),n({type:S,payload:a.t0.response&&a.t0.response.data.message?a.t0.response.data.message:a.t0.message});case 13:case"end":return a.stop()}}),a,null,[[1,10]])})));return function(e){return a.apply(this,arguments)}}()}(c,l))},children:[Object(C.jsx)("div",{children:Object(C.jsx)("img",{src:_,alt:"#",className:"logo"})}),Object(C.jsx)("div",{children:Object(C.jsx)("h1",{children:"Sign In to ARI CUBE"})}),f&&Object(C.jsx)(w,{}),y&&Object(C.jsx)(R,{variant:"danger",children:y}),Object(C.jsxs)("div",{children:[Object(C.jsx)("label",{htmlFor:"email",children:"Email address"}),Object(C.jsx)("input",{type:"email",id:"email",placeholder:"Enter email",required:!0,onChange:function(e){return r(e.target.value)}})]}),Object(C.jsxs)("div",{children:[Object(C.jsx)("label",{htmlFor:"password",children:"Password"}),Object(C.jsx)("input",{type:"password",id:"password",placeholder:"Enter password",required:!0,onChange:function(e){return d(e.target.value)}})]}),Object(C.jsxs)("div",{children:[Object(C.jsx)("label",{}),Object(C.jsx)("button",{className:"primary",type:"submit",children:"Login"})]})]})})}var U=a(166),k=a(168),A=a(182),L=a(169),F=a(170),P=a(179),B=a(181),M=a(86),z=a.n(M),G=a(164),W=Object(G.a)((function(e){return{paper:{display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:"#8967fc"},input:{fontSize:16},form:{width:"100%",marginTop:e.spacing(2),color:"black",fontSize:16},submit:{margin:e.spacing(3,0,2),backgroundColor:"#8967fc",borderRadius:5,float:"left",maxWidth:"100%",color:"white",fontSize:16,"&:hover":{backgroundColor:"#8967fc",color:"#FFFFFF"}}}}));function D(e){var t=W(),a=Object(n.useState)(""),c=Object(j.a)(a,2),r=c[0],s=c[1],o=Object(n.useState)(""),l=Object(j.a)(o,2),d=l[0],h=l[1],g=Object(n.useState)(""),v=Object(j.a)(g,2),S=v[0],y=v[1],N=Object(n.useState)(""),I=Object(j.a)(N,2),E=I[0],_=I[1],T=Object(n.useState)(""),M=Object(j.a)(T,2),G=M[0],D=M[1],J=Object(i.c)((function(e){return e.userRegister})),H=(J.userInfo,J.loading),Q=J.error,V=Object(i.b)();return Object(C.jsxs)(U.a,{component:"main",children:[Object(C.jsx)(k.a,{}),Object(C.jsxs)("div",{className:t.paper,children:[Object(C.jsx)(A.a,{className:t.avatar,children:Object(C.jsx)(z.a,{})}),Object(C.jsx)(L.a,{component:"h1",variant:"h4",children:"REGISTER USER"}),H&&Object(C.jsx)(w,{}),Q&&Object(C.jsx)(R,{variant:"danger",children:Q}),Object(C.jsxs)("form",{className:t.form,onSubmit:function(e){e.preventDefault(),V(function(e,t,a,n,c){return function(){var r=Object(b.a)(u.a.mark((function r(s){var i,o;return u.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return s({type:m,payload:{fullName:e,email:t,phoneNumber:a,companyName:n,address:c}}),r.prev=1,r.next=4,O.a.post("".concat(x.a.API_URL,"user/register"),{fullName:e,email:t,phoneNumber:a,companyName:n,address:c});case 4:i=r.sent,o=i.data,s({type:p,payload:o}),localStorage.setItem("userInfo",JSON.stringify(o)),r.next=13;break;case 10:r.prev=10,r.t0=r.catch(1),s({type:f,payload:r.t0.response&&r.t0.response.data.message?r.t0.response.data.message:r.t0.message});case 13:case"end":return r.stop()}}),r,null,[[1,10]])})));return function(e){return r.apply(this,arguments)}}()}(r,d,S,E,G))},children:[Object(C.jsxs)(F.a,{container:!0,spacing:1,children:[Object(C.jsx)(F.a,{item:!0,xs:12,children:Object(C.jsx)(P.a,{className:t.input,autoComplete:"fname",name:"fullName",variant:"outlined",fullWidth:!0,id:"fullName",label:"Full Name",onChange:function(e){return s(e.target.value)},autoFocus:!0})}),Object(C.jsx)(F.a,{item:!0,xs:12,children:Object(C.jsx)(P.a,{variant:"outlined",fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",onChange:function(e){return h(e.target.value)}})}),Object(C.jsx)(F.a,{item:!0,xs:12,children:Object(C.jsx)(P.a,{variant:"outlined",fullWidth:!0,name:"phoneNumber",label:"Phone Number",type:"phoneNumber",id:"phoneNumber",autoComplete:"phone number",onChange:function(e){return y(e.target.value)}})}),Object(C.jsx)(F.a,{item:!0,xs:12,children:Object(C.jsx)(P.a,{variant:"outlined",fullWidth:!0,name:"companyName",label:"Company Name",type:"companyName",id:"companyName",autoComplete:"Company Name",onChange:function(e){return _(e.target.value)}})}),Object(C.jsx)(F.a,{item:!0,xs:12,children:Object(C.jsx)(P.a,{variant:"outlined",fullWidth:!0,name:"address",label:"Your Address",type:"address",id:"address",autoComplete:"address",onChange:function(e){return D(e.target.value)}})})]}),Object(C.jsx)(B.a,{type:"submit",fullWidth:!0,variant:"contained",className:t.submit,children:"SUBMIT"})]})]})]})}var J=a(21),H=a(171),Q=a(172),V=a(180),q=a(87),X=a.n(q),Y=a(60),$=function(e){return Object(C.jsx)(H.a,Object(J.a)(Object(J.a)({sx:{height:"100%"}},e),{},{children:Object(C.jsxs)(Q.a,{children:[Object(C.jsxs)(F.a,{container:!0,spacing:3,sx:{justifyContent:"space-between"},children:[Object(C.jsxs)(F.a,{item:!0,children:[Object(C.jsx)(L.a,{color:"textSecondary",gutterBottom:!0,variant:"h6",children:"INVOICE's AMOUNT"}),Object(C.jsx)(L.a,{color:"textPrimary",variant:"h3",children:"$2,000"})]}),Object(C.jsx)(F.a,{item:!0,children:Object(C.jsx)(A.a,{sx:{backgroundColor:Y.a[600],height:56,width:56},children:Object(C.jsx)(X.a,{})})})]}),Object(C.jsx)(V.a,{sx:{pt:2,display:"flex",alignItems:"center"}})]})}))},K=a(61),Z=a(55),ee=a.n(Z),te=function(e){return Object(C.jsx)(H.a,Object(J.a)(Object(J.a)({},e),{},{children:Object(C.jsxs)(Q.a,{children:[Object(C.jsxs)(F.a,{container:!0,spacing:3,sx:{justifyContent:"space-between"},children:[Object(C.jsxs)(F.a,{item:!0,children:[Object(C.jsx)(L.a,{color:"textSecondary",gutterBottom:!0,variant:"h6",children:"TOTAL CUSTOMERS"}),Object(C.jsx)(L.a,{color:"textPrimary",variant:"h3",children:"5"})]}),Object(C.jsx)(F.a,{item:!0,children:Object(C.jsx)(A.a,{sx:{backgroundColor:K.a[600],height:56,width:56},children:Object(C.jsx)(ee.a,{})})})]}),Object(C.jsx)(V.a,{sx:{alignItems:"center",display:"flex",pt:2}})]})}))},ae=function(e){return Object(C.jsx)(H.a,Object(J.a)(Object(J.a)({},e),{},{children:Object(C.jsxs)(Q.a,{children:[Object(C.jsxs)(F.a,{container:!0,spacing:3,sx:{justifyContent:"space-between"},children:[Object(C.jsxs)(F.a,{item:!0,children:[Object(C.jsx)(L.a,{color:"textSecondary",gutterBottom:!0,variant:"h6",children:"TOTAL PROJECTS"}),Object(C.jsx)(L.a,{color:"textPrimary",variant:"h3",children:"10"})]}),Object(C.jsx)(F.a,{item:!0,children:Object(C.jsx)(A.a,{sx:{backgroundColor:K.a[600],height:56,width:56},children:Object(C.jsx)("feed",{})})})]}),Object(C.jsx)(V.a,{sx:{alignItems:"center",display:"flex",pt:2}})]})}))},ne=a(5),ce=a(88),re=a.n(ce),se=a(173),ie=a(174),oe=a(175),le=a(139),je=a(176),de=a(177),ue=a(178),be=Object(ne.a)((function(e){return{head:{backgroundColor:"#8967fc",color:e.palette.common.white,fontSize:16},body:{fontSize:16}}}))(se.a),he=Object(ne.a)((function(e){return{root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.action.hover}}}}))(ie.a),Oe=Object(ne.a)((function(e){return{root:{color:"#8967fc",float:"right",fontSize:14,"&:hover":{backgroundColor:"none",color:"none",BorderColor:"none"}}}}))(B.a),xe=Object(G.a)({table:{width:"100%"}});function me(){var e=xe(),t=Object(i.c)((function(e){return e.userList})),a=t.loading,c=t.error,r=t.users,s=Object(i.b)();return Object(n.useEffect)((function(){s(function(){var e=Object(b.a)(u.a.mark((function e(t,a){var n,c,r,s,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:N}),e.prev=1,n=a(),c=n.userSignin.userInfo,e.next=5,O.a.get("".concat(x.a.API_URL,"auth/users"),{headers:{Authorization:"Bearer ".concat(c.token)}});case 5:r=e.sent,s=r.data,t({type:I,payload:s}),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),i=e.t0.response&&e.t0.response.data.message?e.t0.response.data.message:e.t0.message,t({type:E,payload:i});case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t,a){return e.apply(this,arguments)}}())}),[s]),Object(C.jsxs)(oe.a,{component:le.a,children:[Object(C.jsx)("h1",{children:"Users"}),a?Object(C.jsx)(w,{}):c?Object(C.jsx)(R,{variant:"danger",children:c}):Object(C.jsxs)(je.a,{className:e.table,"aria-label":"customized table",children:[Object(C.jsx)(de.a,{children:Object(C.jsxs)(ie.a,{children:[Object(C.jsx)(be,{children:"NAME"}),Object(C.jsx)(be,{children:"EMAIL"}),Object(C.jsx)(be,{children:"TELEPHONE"}),Object(C.jsx)(be,{children:"COMPANY NAME"})]})}),Object(C.jsx)(ue.a,{children:r.data.slice(0,5).map((function(e){return Object(C.jsxs)(he,{children:[Object(C.jsx)(be,{children:e.fullName}),Object(C.jsx)(be,{children:e.email}),Object(C.jsx)(be,{children:e.phoneNumber}),Object(C.jsx)(be,{children:e.companyName})]},e._id)}))})]}),Object(C.jsx)(V.a,{sx:{p:2},children:Object(C.jsx)(Oe,{endIcon:Object(C.jsx)(re.a,{}),children:"View All"})})]})}var pe=function(e){return Object(C.jsx)(H.a,Object(J.a)(Object(J.a)({},e),{},{children:Object(C.jsxs)(Q.a,{children:[Object(C.jsxs)(F.a,{container:!0,spacing:3,sx:{justifyContent:"space-between"},children:[Object(C.jsxs)(F.a,{item:!0,children:[Object(C.jsx)(L.a,{color:"textSecondary",gutterBottom:!0,variant:"h6",children:"TOTAL QUOTES"}),Object(C.jsx)(L.a,{color:"textPrimary",variant:"h3",children:"10"})]}),Object(C.jsx)(F.a,{item:!0,children:Object(C.jsx)(A.a,{sx:{backgroundColor:K.a[600],height:56,width:56},children:Object(C.jsx)(ee.a,{})})})]}),Object(C.jsx)(V.a,{sx:{alignItems:"center",display:"flex",pt:2}})]})}))};function fe(e){return Object(C.jsx)(V.a,{sx:{backgroundColor:"background.default",minHeight:"100%",py:3},children:Object(C.jsx)(U.a,{maxWidth:!1,children:Object(C.jsxs)(F.a,{container:!0,spacing:3,children:[Object(C.jsx)(F.a,{item:!0,lg:3,sm:6,xl:3,xs:12,children:Object(C.jsx)($,{})}),Object(C.jsx)(F.a,{item:!0,lg:3,sm:6,xl:3,xs:12,children:Object(C.jsx)(te,{})}),Object(C.jsx)(F.a,{item:!0,lg:3,sm:6,xl:3,xs:12,children:Object(C.jsx)(ae,{})}),Object(C.jsx)(F.a,{item:!0,lg:3,sm:6,xl:3,xs:12,children:Object(C.jsx)(pe,{sx:{height:"100%"}})}),Object(C.jsx)(F.a,{item:!0,lg:5,md:9,xl:6,xs:12,children:Object(C.jsx)(D,{})}),Object(C.jsx)(F.a,{item:!0,lg:7,md:9,xl:6,xs:12,children:Object(C.jsx)(me,{})})]})})})}var ge=function(){var e=Object(i.c)((function(e){return e.userSignin})).userInfo,t=Object(i.b)();return Object(C.jsx)(o.a,{children:Object(C.jsxs)("div",{className:"App",children:[Object(C.jsxs)("header",{className:"App-Header",children:[Object(C.jsx)("h2",{children:"Augmented Reality Innovations"}),e?Object(C.jsxs)("div",{className:"dropdown",children:[Object(C.jsxs)(o.b,{to:"#",children:[e.data.user.fullName," ",Object(C.jsx)("i",{className:"fa fa-caret-down"})," "]}),Object(C.jsx)("ul",{className:"dropdown-content",children:Object(C.jsx)("li",{children:Object(C.jsx)(o.b,{to:"/",onClick:function(){t((function(e){localStorage.removeItem("userInfo"),e({type:y})}))},children:"Sign Out"})})})]}):Object(C.jsx)(o.b,{to:"/",children:"Home"})]}),Object(C.jsxs)("main",{children:[Object(C.jsx)(l.a,{path:"/",component:T,exact:!0}),Object(C.jsx)(l.a,{path:"/home",component:fe})]})]})})},ve=a(33),Se=a(89),ye={userSignin:{userInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null}},Ne=Object(ve.c)({userSignin:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case g:return{loading:!0};case v:return{loading:!1,userInfo:t.payload};case S:return{loading:!1,error:t.payload};case y:return{};default:return e}},userList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{loading:!0},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case N:return{loading:!0};case I:return{loading:!1,users:t.payload};case E:return{loading:!1,error:t.payload};default:return e}},userRegister:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case m:return{loading:!0};case p:return{loading:!1,userInfo:t.payload};case f:return{loading:!1,error:t.payload};default:return e}}}),Ie=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||ve.d,Ee=Object(ve.e)(Ne,ye,Ie(Object(ve.a)(Se.a))),Ce=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,185)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),r(e),s(e)}))};s.a.render(Object(C.jsx)(i.a,{store:Ee,children:Object(C.jsx)(c.a.StrictMode,{children:Object(C.jsx)(ge,{})})}),document.getElementById("root")),Ce()}},[[136,1,2]]]);
//# sourceMappingURL=main.e5cb2e93.chunk.js.map
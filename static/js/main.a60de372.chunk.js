(this["webpackJsonpcovid-19-tracker"]=this["webpackJsonpcovid-19-tracker"]||[]).push([[0],{209:function(e,t,r){},210:function(e,t,r){},211:function(e,t,r){},212:function(e,t,r){},213:function(e,t,r){"use strict";r.r(t);var n=r(1),a=r(0),c=r.n(a),i=r(34),o=r.n(i),s=(r(88),r(4)),u=r.n(s),l=r(8),d=r(10),j=r(231),b=r(238),p=r(232),h=r(233),m=r(37),f=r.n(m),v=(r(94),function(e){var t=e.data,r=t.confirmed,a=t.recovered,c=t.deaths,i=t.lastUpdate;return r?Object(n.jsx)("div",{id:"card-wrapper",children:Object(n.jsxs)(j.a,{container:!0,spacing:3,justify:"center",children:[Object(n.jsx)(j.a,{item:!0,component:b.a,xs:10,md:3,className:"card",children:Object(n.jsxs)(p.a,{className:"card-content",children:[Object(n.jsx)(h.a,{color:"textSecondary",gutterBottom:!0,children:"Infected"}),Object(n.jsx)(h.a,{variant:"h5",children:Object(n.jsx)(f.a,{start:0,end:r.value,duration:2.75,separator:","})}),Object(n.jsx)(h.a,{color:"textSecondary",children:new Date(i).toDateString()}),Object(n.jsx)(h.a,{variant:"body2",children:"Number of active cases of COVID-19"})]})}),Object(n.jsx)(j.a,{item:!0,component:b.a,xs:10,md:3,className:"card",children:Object(n.jsxs)(p.a,{children:[Object(n.jsx)(h.a,{color:"textSecondary",gutterBottom:!0,children:"Recovered"}),Object(n.jsx)(h.a,{variant:"h5",children:Object(n.jsx)(f.a,{start:0,end:a.value,duration:2.75,separator:","})}),Object(n.jsx)(h.a,{color:"textSecondary",children:new Date(i).toDateString()}),Object(n.jsx)(h.a,{variant:"body2",children:"Number of  recoveries from COVID-19"})]})}),Object(n.jsx)(j.a,{item:!0,component:b.a,xs:10,md:3,className:"card",children:Object(n.jsxs)(p.a,{children:[Object(n.jsx)(h.a,{color:"textSecondary",gutterBottom:!0,children:"Deaths"}),Object(n.jsx)(h.a,{variant:"h5",children:Object(n.jsx)(f.a,{start:0,end:c.value,duration:2.75,separator:","})}),Object(n.jsx)(h.a,{color:"textSecondary",children:new Date(i).toDateString()}),Object(n.jsx)(h.a,{variant:"body2",children:"Number of deths caused by COVID-19"})]})})]})}):"Loading ..."}),x=r(239),O=r(237),g=r(27),y=r.n(g),S="https://covid19.mathdro.id/api",w=function(){var e=Object(l.a)(u.a.mark((function e(t){var r,n,a,c,i,o,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=S,"Global"===t&&(r=S),t&&"Global"!==t&&(r="".concat(S,"/countries/").concat(t)),e.prev=4,e.next=7,y.a.get(r);case 7:return n=e.sent,a=n.data,c=a.confirmed,i=a.recovered,o=a.deaths,s=a.lastUpdate,e.abrupt("return",{confirmed:c,recovered:i,deaths:o,lastUpdate:s});case 16:e.prev=16,e.t0=e.catch(4);case 18:case"end":return e.stop()}}),e,null,[[4,16]])})));return function(t){return e.apply(this,arguments)}}(),C=function(){var e=Object(l.a)(u.a.mark((function e(){var t,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.a.get("".concat(S,"/daily"));case 3:return t=e.sent,r=t.data,e.abrupt("return",r.map((function(e){return{confirmed:e.totalConfirmed,date:e.reportDate,deaths:e.deaths.total}})));case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=Object(l.a)(u.a.mark((function e(){var t,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.a.get("".concat(S,"/countries"));case 3:return t=e.sent,r=t.data.countries,e.abrupt("return",r.map((function(e){return e.name})));case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(l.a)(u.a.mark((function e(){var t,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=B.map(function(){var e=Object(l.a)(u.a.mark((function e(t){var r,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.a.get("".concat(S,"/countries/").concat(t,"/confirmed"));case 3:return r=e.sent,n=r.data,e.abrupt("return",n.map((function(e){return{confirmed:e.confirmed,deaths:e.deaths,recovered:e.recovered,active:e.active,province:e.provinceState,lat:e.lat,long:e.long,country:e.countryRegion}})));case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()),r=function(){var e=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(t.map(function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),e.next=4,r();case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burma","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Brazzaville)","Congo (Kinshasa)","Costa Rica","Croatia","Cuba","Cyprus","Czechia","Denmark","Diamond Princess","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Holy See","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","South Korea","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","MS Zaandam","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Macedonia","Norway","Oman","Pakistan","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan*","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Trinidad and Tobago","Tunisia","Turkey","US","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","West Bank and Gaza","Yemen","Zambia","Zimbabwe"],D=function(e){var t=Object(a.useState)([]),r=Object(d.a)(t,2),c=r[0],i=r[1];return Object(a.useEffect)((function(){(function(){var e=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=i,e.next=3,N();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[i]),Object(n.jsx)("div",{children:Object(n.jsx)(x.a,{className:"form",children:Object(n.jsxs)(O.a,{onChange:function(t){e.toggleCountry(t.target.value)},children:[Object(n.jsx)("option",{value:"Global",children:"Global"}),c.map((function(e,t){return Object(n.jsx)("option",{value:e,children:e},t)}))]})})})},M=r(50),R=(r(209),function(e){var t=e.data,r=t.confirmed,c=t.recovered,i=t.deaths,o=e.country,s=Object(a.useState)([]),j=Object(d.a)(s,2),b=j[0],p=j[1];if(Object(a.useEffect)((function(){(function(){var e=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=p,e.next=3,C();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),!r)return"Loading...";var h=0!==b.length?Object(n.jsx)(M.Line,{data:{labels:b.map((function(e){return e.date})),datasets:[{data:b.map((function(e){return e.confirmed})),label:"Infected",fill:!0,lineTension:.1,borderColor:"rgba(0, 0, 255, 1)",backgroundColor:"rgba(154, 154, 228, 0.4)",pointRadius:1,pointBorderColor:"rgba(0, 0, 255, 1)",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(0, 0, 255, 1)",pointHoverBorderColor:"rgba(0, 0, 255, 1)"},{data:b.map((function(e){return e.deaths})),label:"Deaths",fill:!0,lineTension:.1,borderColor:"rgba(255, 0, 0, 1)",backgroundColor:"rgba(228, 154, 154, 0.4)",pointRadius:1,pointBorderColor:"rgba(255, 0, 0, 1)",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(255, 0, 0, 1)",pointHoverBorderColor:"rgba(255, 0, 0, 1)"}]}}):null,m=0!==r.length?Object(n.jsx)(M.Bar,{data:{labels:["Infected","Recovered","Deaths"],datasets:[{data:[r.value,c.value,i.value],backgroundColor:["rgba(0, 0, 255, 0.5)","rgba(0, 255, 0, 0.5)","rgba(255, 0, 0, 0.5)"]}]},options:{legend:{display:!1},title:{display:!0,text:"Current state in ".concat(o)}}}):null;return Object(n.jsx)("div",{className:"chart",children:o&&"Global"!==o?m:h})}),z=(r(210),r(234)),G=r(240),I=r(235),A=r(236),P=r(13),L=r.n(P),E=function(e){var t=function(e){var t=[];return t=e>7e5?[20,20]:e>5e5?[15,15]:e>3e5?[10,10]:[5,5],new L.a.Icon({iconUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Red_Circle%28small%29.svg/1024px-Red_Circle%28small%29.svg.png",iconSize:t})};return Object(n.jsx)("div",{id:"camulative-map-wrapper",children:Object(n.jsxs)(z.a,{center:[28.45835,10.07813],zoom:1,scrollWheelZoom:!1,children:[Object(n.jsx)(G.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),e.noProvince.map((function(r,a){return Object(n.jsx)(I.a,{position:[r.lat,r.long],icon:t(r.confirmed),children:Object(n.jsxs)(A.a,{children:[Object(n.jsx)("h3",{children:r.country}),Object(n.jsxs)("p",{children:["Cases: ",Object(n.jsx)("strong",{children:e.formatNumber(r.confirmed)})]}),Object(n.jsxs)("p",{children:["Recovered: ",Object(n.jsx)("strong",{children:e.formatNumber(r.recovered)})]}),Object(n.jsxs)("p",{children:["Deaths: ",Object(n.jsx)("strong",{children:e.formatNumber(r.deaths)})]})]})},a)})),e.provinces.map((function(r){return r.map((function(r,a){return Object(n.jsx)(I.a,{position:[r.lat,r.long],icon:t(r.confirmed),children:Object(n.jsxs)(A.a,{position:[r.lat,r.long],children:[Object(n.jsxs)("h2",{children:[r.province,", ",r.country]}),Object(n.jsxs)("p",{children:["Cases: ",Object(n.jsx)("strong",{children:e.formatNumber(r.confirmed)})]}),Object(n.jsxs)("p",{children:["Recovered: ",Object(n.jsx)("strong",{children:e.formatNumber(r.recovered)})]}),Object(n.jsxs)("p",{children:["Deaths: ",Object(n.jsx)("strong",{children:e.formatNumber(r.deaths)})]})]})},a)}))})),e.usProvinces.map((function(r){return r.map((function(r,a){return Object(n.jsx)(I.a,{position:[r.lat,r.long],icon:t(r.confirmed),children:Object(n.jsxs)(A.a,{position:[r.lat,r.long],children:[Object(n.jsxs)("h2",{children:[r.province,", ",r.country]}),Object(n.jsxs)("p",{children:["Cases: ",Object(n.jsx)("strong",{children:e.formatNumber(r.confirmed)})]}),Object(n.jsxs)("p",{children:["Recovered: ",Object(n.jsx)("strong",{children:e.formatNumber(r.recovered)})]}),Object(n.jsxs)("p",{children:["Deaths: ",Object(n.jsx)("strong",{children:e.formatNumber(r.deaths)})]})]})},a)}))}))]})})},U=(r(211),function(e){var t=function(e){var t=[];return t=e>7e5?[20,20]:e>5e5?[15,15]:e>3e5?[10,10]:[5,5],new L.a.Icon({iconUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Red_Circle%28small%29.svg/1024px-Red_Circle%28small%29.svg.png",iconSize:t})};return Object(n.jsx)("div",{id:"active-map-wrapper",children:Object(n.jsxs)(z.a,{center:[28.45835,10.07813],zoom:1,scrollWheelZoom:!1,children:[Object(n.jsx)(G.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),e.noProvince.map((function(r,a){return Object(n.jsx)(I.a,{position:[r.lat,r.long],icon:t(r.active),children:Object(n.jsxs)(A.a,{children:[Object(n.jsx)("h3",{children:r.country}),Object(n.jsxs)("p",{children:["Cases: ",Object(n.jsx)("strong",{children:e.formatNumber(r.confirmed)})]}),Object(n.jsxs)("p",{children:["Recovered: ",Object(n.jsx)("strong",{children:e.formatNumber(r.recovered)})]}),Object(n.jsxs)("p",{children:["Deaths: ",Object(n.jsx)("strong",{children:e.formatNumber(r.deaths)})]}),Object(n.jsxs)("p",{children:["Active : ",Object(n.jsx)("strong",{children:e.formatNumber(r.active)})]})]})},a)})),e.provinces.map((function(r){return r.map((function(r,a){return Object(n.jsx)(I.a,{position:[r.lat,r.long],icon:t(r.active),children:Object(n.jsxs)(A.a,{position:[r.lat,r.long],children:[Object(n.jsxs)("h2",{children:[r.province,", ",r.country]}),Object(n.jsxs)("p",{children:["Cases: ",Object(n.jsx)("strong",{children:e.formatNumber(r.confirmed)})]}),Object(n.jsxs)("p",{children:["Recovered: ",Object(n.jsx)("strong",{children:e.formatNumber(r.recovered)})]}),Object(n.jsxs)("p",{children:["Deaths: ",Object(n.jsx)("strong",{children:e.formatNumber(r.deaths)})]}),Object(n.jsxs)("p",{children:["Active : ",Object(n.jsx)("strong",{children:e.formatNumber(r.active)})]})]})},a)}))})),e.usProvinces.map((function(r){return r.map((function(r,a){return Object(n.jsx)(I.a,{position:[r.lat,r.long],icon:t(r.active),children:Object(n.jsxs)(A.a,{position:[r.lat,r.long],children:[Object(n.jsxs)("h2",{children:[r.province,", ",r.country]}),Object(n.jsxs)("p",{children:["Cases: ",Object(n.jsx)("strong",{children:e.formatNumber(r.confirmed)})]}),Object(n.jsxs)("p",{children:["Recovered: ",Object(n.jsx)("strong",{children:e.formatNumber(r.recovered)})]}),Object(n.jsxs)("p",{children:["Deaths: ",Object(n.jsx)("strong",{children:e.formatNumber(r.deaths)})]}),Object(n.jsxs)("p",{children:["Active : ",Object(n.jsx)("strong",{children:e.formatNumber(r.active)})]})]})},a)}))}))]})})}),T=function(e){var t=Object(a.useState)(),r=Object(d.a)(t,2),c=r[0],i=r[1];if(Object(a.useEffect)((function(){(function(){var e=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=i,e.next=3,k();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[i]),!c)return"Loading";var o=c.filter((function(e){return 1===e.length})).map((function(e){return e[0]})).filter((function(e){return e})).filter((function(e){var t=e.lat,r=e.confirmed;return null!==t&&r>5e4}));console.log(o);var s=c.filter((function(e){return e.length>1})).map((function(e){return e.filter((function(e){var t=e.lat,r=e.confirmed,n=e.country;return null!==t&&"US"!==n&&r>1e4}))})),j=c.filter((function(e){return e.length>1})).map((function(e){return e.filter((function(e){var t=e.lat,r=e.confirmed,n=e.country;return null!==t&&"US"===n&&r>5e4}))})),b=function(e){var t=Number(e).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,"),r=t.split(".");return r.length>1&&(t=r[0]),t};return Object(n.jsx)("div",{children:"calmulative"===e.isMap?Object(n.jsx)(E,{noProvince:o,provinces:s,usProvinces:j,formatNumber:b}):Object(n.jsx)(U,{noProvince:o,provinces:s,usProvinces:j,formatNumber:b})})},H=(r(212),Object(n.jsx)("img",{src:"https://img.icons8.com/dusk/100/000000/coronavirus.png"})),K=function(){var e=Object(a.useState)({}),t=Object(d.a)(e,2),r=t[0],c=t[1],i=Object(a.useState)(""),o=Object(d.a)(i,2),s=o[0],j=o[1],b=Object(a.useState)("calmulative"),p=Object(d.a)(b,2),h=p[0],m=p[1];Object(a.useEffect)((function(){(function(){var e=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=c,e.next=3,w();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var f=function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=c,e.next=3,w(t);case 3:e.t1=e.sent,(0,e.t0)(e.t1),j(t);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(n.jsxs)("div",{id:"app-wrapper",children:[Object(n.jsxs)("div",{id:"header",children:[Object(n.jsx)("h1",{children:"C"}),Object(n.jsx)("span",{id:"icon",children:H}),Object(n.jsx)("h1",{children:"VID-19"})]}),Object(n.jsxs)("div",{id:"maps-wrapper",children:[Object(n.jsx)(T,{isMap:h}),Object(n.jsxs)("div",{id:"map-toggler",children:[Object(n.jsx)("div",{className:"toggler",onClick:function(){m("calmulative")},children:"Calmulative Cases"}),Object(n.jsx)("div",{className:"toggler",onClick:function(){m("active")},children:"Active Cases"})]})]}),Object(n.jsx)(v,{data:r}),Object(n.jsx)(D,{toggleCountry:f}),Object(n.jsx)(R,{data:r,country:s})]})};o.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(K,{})}),document.getElementById("root"))},88:function(e,t,r){},94:function(e,t,r){}},[[213,1,2]]]);
//# sourceMappingURL=main.a60de372.chunk.js.map
jQuery.atmosphere=function(){jQuery(window).bind("unload.atmosphere",function(){jQuery.atmosphere.unsubscribe()
});
jQuery(window).bind("offline",function(){jQuery.atmosphere.unsubscribe()
});
jQuery(window).keypress(function(b){if(b.keyCode==27){b.preventDefault()
}});
var a=function(c){var b,e=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,d={};
while(b=e.exec(c)){d[b[1]]=b[2]
}return d
};
return{version:"2.0.0-jquery",requests:[],callbacks:[],onError:function(b){},onClose:function(b){},onOpen:function(b){},onMessage:function(b){},onReconnect:function(c,b){},onMessagePublished:function(b){},onTransportFailure:function(c,b){},onLocalMessage:function(b){},onFailureToReconnect:function(c,b){},AtmosphereRequest:function(F){var H={timeout:300000,method:"GET",headers:{},contentType:"",callback:null,url:"",data:"",suspend:true,maxRequest:-1,reconnect:true,maxStreamingLength:10000000,lastIndex:0,logLevel:"info",requestCount:0,fallbackMethod:"GET",fallbackTransport:"streaming",transport:"long-polling",webSocketImpl:null,webSocketBinaryType:null,dispatchUrl:null,webSocketPathDelimiter:"@@",enableXDR:false,rewriteURL:false,attachHeadersAsQueryString:true,executeCallbackBeforeReconnect:false,readyState:0,lastTimestamp:0,withCredentials:false,trackMessageLength:false,messageDelimiter:"|",connectTimeout:-1,reconnectInterval:0,dropAtmosphereHeaders:true,uuid:0,shared:false,readResponsesHeaders:false,maxReconnectOnClose:5,enableProtocol:true,onError:function(au){},onClose:function(au){},onOpen:function(au){},onMessage:function(au){},onReopen:function(av,au){},onReconnect:function(av,au){},onMessagePublished:function(au){},onTransportFailure:function(av,au){},onLocalMessage:function(au){},onFailureToReconnect:function(av,au){}};
var P={status:200,reasonPhrase:"OK",responseBody:"",messages:[],headers:[],state:"messageReceived",transport:"polling",error:null,request:null,partialMessage:"",errorHandled:false,id:0};
var S=null;
var i=null;
var o=null;
var x=null;
var z=null;
var ad=true;
var f=0;
var aq=false;
var T=null;
var ak;
var k=null;
var C=jQuery.now();
var D;
at(F);
function al(){ad=true;
aq=false;
f=0;
S=null;
i=null;
o=null;
x=null
}function t(){af();
al()
}function at(au){t();
H=jQuery.extend(H,au);
H.mrequest=H.reconnect;
if(!H.reconnect){H.reconnect=true
}}function j(){return H.webSocketImpl!=null||window.WebSocket||window.MozWebSocket
}function L(){return window.EventSource
}function m(){if(H.shared){k=ab(H);
if(k!=null){if(H.logLevel=="debug"){jQuery.atmosphere.debug("Storage service available. All communication will be local")
}if(k.open(H)){return
}}if(H.logLevel=="debug"){jQuery.atmosphere.debug("No Storage service available.")
}k=null
}H.firstMessage=true;
H.isOpen=false;
H.ctime=jQuery.now();
if(H.transport!="websocket"&&H.transport!="sse"){l(H)
}else{if(H.transport=="websocket"){if(!j()){J("Websocket is not supported, using request.fallbackTransport ("+H.fallbackTransport+")")
}else{ae(false)
}}else{if(H.transport=="sse"){if(!L()){J("Server Side Events(SSE) is not supported, using request.fallbackTransport ("+H.fallbackTransport+")")
}else{B(false)
}}}}}function ab(ay){var aB,av,ax,aw="atmosphere-"+ay.url,au={storage:function(){if(!jQuery.atmosphere.supportStorage()){return
}var aE=window.localStorage,aC=function(aF){return jQuery.parseJSON(aE.getItem(aw+"-"+aF))
},aD=function(aF,aG){aE.setItem(aw+"-"+aF,jQuery.stringifyJSON(aG))
};
return{init:function(){aD("children",aC("children").concat([C]));
jQuery(window).on("storage.socket",function(aF){aF=aF.originalEvent;
if(aF.key===aw&&aF.newValue){aA(aF.newValue)
}});
return aC("opened")
},signal:function(aF,aG){aE.setItem(aw,jQuery.stringifyJSON({target:"p",type:aF,data:aG}))
},close:function(){var aF,aG=aC("children");
jQuery(window).off("storage.socket");
if(aG){aF=jQuery.inArray(ay.id,aG);
if(aF>-1){aG.splice(aF,1);
aD("children",aG)
}}}}
},windowref:function(){var aC=window.open("",aw.replace(/\W/g,""));
if(!aC||aC.closed||!aC.callbacks){return
}return{init:function(){aC.callbacks.push(aA);
aC.children.push(C);
return aC.opened
},signal:function(aD,aE){if(!aC.closed&&aC.fire){aC.fire(jQuery.stringifyJSON({target:"p",type:aD,data:aE}))
}},close:function(){function aD(aG,aF){var aE=jQuery.inArray(aF,aG);
if(aE>-1){aG.splice(aE,1)
}}if(!ax){aD(aC.callbacks,aA);
aD(aC.children,C)
}}}
}};
function aA(aC){var aE=jQuery.parseJSON(aC),aD=aE.data;
if(aE.target==="c"){switch(aE.type){case"open":G("opening","local",H);
break;
case"close":if(!ax){ax=true;
if(aD.reason==="aborted"){ah()
}else{if(aD.heir===C){m()
}else{setTimeout(function(){m()
},100)
}}}break;
case"message":y(aD,"messageReceived",200,ay.transport);
break;
case"localMessage":W(aD);
break
}}}function az(){var aC=new RegExp("(?:^|; )("+encodeURIComponent(aw)+")=([^;]*)").exec(document.cookie);
if(aC){return jQuery.parseJSON(decodeURIComponent(aC[2]))
}}aB=az();
if(!aB||jQuery.now()-aB.ts>1000){return
}av=au.storage()||au.windowref();
if(!av){return
}return{open:function(){var aC;
D=setInterval(function(){var aD=aB;
aB=az();
if(!aB||aD.ts===aB.ts){aA(jQuery.stringifyJSON({target:"c",type:"close",data:{reason:"error",heir:aD.heir}}))
}},1000);
aC=av.init();
if(aC){setTimeout(function(){G("opening","local",ay)
},50)
}return aC
},send:function(aC){av.signal("send",aC)
},localSend:function(aC){av.signal("localSend",jQuery.stringifyJSON({id:C,event:aC}))
},close:function(){if(!aq){clearInterval(D);
av.signal("close");
av.close()
}}}
}function X(){var av,au="atmosphere-"+H.url,az={storage:function(){if(!jQuery.atmosphere.supportStorage()){return
}var aA=window.localStorage;
return{init:function(){jQuery(window).on("storage.socket",function(aB){aB=aB.originalEvent;
if(aB.key===au&&aB.newValue){aw(aB.newValue)
}})
},signal:function(aB,aC){aA.setItem(au,jQuery.stringifyJSON({target:"c",type:aB,data:aC}))
},get:function(aB){return jQuery.parseJSON(aA.getItem(au+"-"+aB))
},set:function(aB,aC){aA.setItem(au+"-"+aB,jQuery.stringifyJSON(aC))
},close:function(){jQuery(window).off("storage.socket");
aA.removeItem(au);
aA.removeItem(au+"-opened");
aA.removeItem(au+"-children")
}}
},windowref:function(){var aA=au.replace(/\W/g,""),aB=(jQuery('iframe[name="'+aA+'"]')[0]||jQuery('<iframe name="'+aA+'" />').hide().appendTo("body")[0]).contentWindow;
return{init:function(){aB.callbacks=[aw];
aB.fire=function(aC){var aD;
for(aD=0;
aD<aB.callbacks.length;
aD++){aB.callbacks[aD](aC)
}}
},signal:function(aC,aD){if(!aB.closed&&aB.fire){aB.fire(jQuery.stringifyJSON({target:"c",type:aC,data:aD}))
}},get:function(aC){return !aB.closed?aB[aC]:null
},set:function(aC,aD){if(!aB.closed){aB[aC]=aD
}},close:function(){}}
}};
function aw(aA){var aC=jQuery.parseJSON(aA),aB=aC.data;
if(aC.target==="p"){switch(aC.type){case"send":ag(aB);
break;
case"localSend":W(aB);
break;
case"close":ah();
break
}}}T=function ay(aA){av.signal("message",aA)
};
function ax(){document.cookie=encodeURIComponent(au)+"="+encodeURIComponent(jQuery.stringifyJSON({ts:jQuery.now()+1,heir:(av.get("children")||[])[0]}))
}av=az.storage()||az.windowref();
av.init();
if(H.logLevel=="debug"){jQuery.atmosphere.debug("Installed StorageService "+av)
}av.set("children",[]);
if(av.get("opened")!=null&&!av.get("opened")){av.set("opened",false)
}ax();
D=setInterval(ax,1000);
ak=av
}function G(aw,az,av){if(H.shared&&az!="local"){X()
}if(ak!=null){ak.set("opened",true)
}av.close=function(){ah()
};
if(f>0&&aw=="re-connecting"){av.isReopen=true;
Y(P)
}else{if(P.error==null){P.request=av;
var ax=P.state;
P.state=aw;
var au=P.transport;
P.transport=az;
var ay=P.responseBody;
v();
P.responseBody=ay;
P.state=ax;
P.transport=au
}}}function s(aw){aw.transport="jsonp";
var av=H;
if((aw!=null)&&(typeof(aw)!="undefined")){av=aw
}var au=av.url;
if(av.dispatchUrl!=null){au+=av.dispatchUrl
}var ax=av.data;
if(av.attachHeadersAsQueryString){au=Q(av);
if(ax!=""){au+="&X-Atmosphere-Post-Body="+encodeURIComponent(ax)
}ax=""
}z=jQuery.ajax({url:au,type:av.method,dataType:"jsonp",error:function(ay,aA,az){P.error=true;
if(ay.status<300){K(z,av,0)
}else{Z(ay.status,az)
}},jsonp:"jsonpTransport",success:function(az){if(av.reconnect){if(av.maxRequest==-1||av.requestCount++<av.maxRequest){aa(z,av);
if(!av.executeCallbackBeforeReconnect){K(z,av,0)
}var aB=az.message;
if(aB!=null&&typeof aB!="string"){try{aB=jQuery.stringifyJSON(aB)
}catch(aA){}}var ay=q(aB,av,P);
if(!ay){y(P.responseBody,"messageReceived",200,av.transport)
}if(av.executeCallbackBeforeReconnect){K(z,av,0)
}}else{jQuery.atmosphere.log(H.logLevel,["JSONP reconnect maximum try reached "+H.requestCount]);
Z(0,"maxRequest reached")
}}},data:av.data,beforeSend:function(ay){b(ay,av,false)
}})
}function U(ax){var av=H;
if((ax!=null)&&(typeof(ax)!="undefined")){av=ax
}var au=av.url;
if(av.dispatchUrl!=null){au+=av.dispatchUrl
}var ay=av.data;
if(av.attachHeadersAsQueryString){au=Q(av);
if(ay!=""){au+="&X-Atmosphere-Post-Body="+encodeURIComponent(ay)
}ay=""
}var aw=typeof(av.async)!="undefined"?av.async:true;
z=jQuery.ajax({url:au,type:av.method,error:function(az,aB,aA){P.error=true;
if(az.status<300){K(z,av)
}else{Z(az.status,aA)
}},success:function(aB,aC,aA){if(av.reconnect){if(av.maxRequest==-1||av.requestCount++<av.maxRequest){if(!av.executeCallbackBeforeReconnect){K(z,av,0)
}var az=q(aB,av,P);
if(!az){y(P.responseBody,"messageReceived",200,av.transport)
}if(av.executeCallbackBeforeReconnect){K(z,av,0)
}}else{jQuery.atmosphere.log(H.logLevel,["AJAX reconnect maximum try reached "+H.requestCount]);
Z(0,"maxRequest reached")
}}},beforeSend:function(az){b(az,av,false)
},crossDomain:av.enableXDR,async:aw})
}function d(au){if(H.webSocketImpl!=null){return H.webSocketImpl
}else{if(window.WebSocket){return new WebSocket(au)
}else{return new MozWebSocket(au)
}}}function e(){var au=Q(H);
return decodeURI(jQuery('<a href="'+au+'"/>')[0].href.replace(/^http/,"ws"))
}function ar(){var au=Q(H);
return au
}function B(av){P.transport="sse";
var au=ar(H.url);
if(H.logLevel=="debug"){jQuery.atmosphere.debug("Invoking executeSSE");
jQuery.atmosphere.debug("Using URL: "+au)
}if(H.enableProtocol&&av){var ax=jQuery.now()-H.ctime;
H.lastTimestamp=Number(H.stime)+Number(ax)
}if(av&&!H.reconnect){if(i!=null){af()
}return
}try{i=new EventSource(au,{withCredentials:H.withCredentials})
}catch(aw){Z(0,aw);
J("SSE failed. Downgrading to fallback transport and resending");
return
}if(H.connectTimeout>0){H.id=setTimeout(function(){if(!av){af()
}},H.connectTimeout)
}i.onopen=function(ay){r(H);
if(H.logLevel=="debug"){jQuery.atmosphere.debug("SSE successfully opened")
}if(!H.enableProtocol){if(!av){G("opening","sse",H)
}else{G("re-opening","sse",H)
}}av=true;
if(H.method=="POST"){P.state="messageReceived";
i.send(H.data)
}};
i.onmessage=function(az){r(H);
if(az.origin!=window.location.protocol+"//"+window.location.host){jQuery.atmosphere.log(H.logLevel,["Origin was not "+window.location.protocol+"//"+window.location.host]);
return
}P.state="messageReceived";
P.status=200;
az=az.data;
var ay=q(az,H,P);
if(!ay){v();
P.responseBody="";
P.messages=[]
}};
i.onerror=function(ay){clearTimeout(H.id);
ac(av);
af();
if(aq){jQuery.atmosphere.log(H.logLevel,["SSE closed normally"])
}else{if(!av){J("SSE failed. Downgrading to fallback transport and resending")
}else{if(H.reconnect&&(P.transport=="sse")){if(f++<H.maxReconnectOnClose){G("re-connecting",H.transport,H);
H.id=setTimeout(function(){B(true)
},H.reconnectInterval);
P.responseBody="";
P.messages=[]
}else{jQuery.atmosphere.log(H.logLevel,["SSE reconnect maximum try reached "+f]);
Z(0,"maxReconnectOnClose reached")
}}}}}
}function ae(av){P.transport="websocket";
if(H.enableProtocol&&av){var aw=jQuery.now()-H.ctime;
H.lastTimestamp=Number(H.stime)+Number(aw)
}var au=e(H.url);
if(H.logLevel=="debug"){jQuery.atmosphere.debug("Invoking executeWebSocket");
jQuery.atmosphere.debug("Using URL: "+au)
}if(av&&!H.reconnect){if(S!=null){af()
}return
}S=d(au);
if(H.webSocketBinaryType!=null){S.binaryType=H.webSocketBinaryType
}if(H.connectTimeout>0){H.id=setTimeout(function(){if(!av){var ax={code:1002,reason:"",wasClean:false};
S.onclose(ax);
try{af()
}catch(ay){}return
}},H.connectTimeout)
}S.onopen=function(ax){r(H);
if(H.logLevel=="debug"){jQuery.atmosphere.debug("Websocket successfully opened")
}if(!H.enableProtocol){if(!av){G("opening","websocket",H)
}else{G("re-opening","websocket",H)
}}av=true;
S.webSocketOpened=av;
if(H.method=="POST"){P.state="messageReceived";
S.send(H.data)
}};
S.onmessage=function(az){r(H);
P.state="messageReceived";
P.status=200;
var az=az.data;
var ax=typeof(az)=="string";
if(ax){var ay=q(az,H,P);
if(!ay){v();
P.responseBody="";
P.messages=[]
}}else{if(!n(H,az)){return
}P.responseBody=az;
v();
P.responseBody=null
}};
S.onerror=function(ax){clearTimeout(H.id)
};
S.onclose=function(ax){if(P.state=="closed"){return
}clearTimeout(H.id);
var ay=ax.reason;
if(ay===""){switch(ax.code){case 1000:ay="Normal closure; the connection successfully completed whatever purpose for which it was created.";
break;
case 1001:ay="The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.";
break;
case 1002:ay="The endpoint is terminating the connection due to a protocol error.";
break;
case 1003:ay="The connection is being terminated because the endpoint received data of a type it cannot accept (for example, a text-only endpoint received binary data).";
break;
case 1004:ay="The endpoint is terminating the connection because a data frame was received that is too large.";
break;
case 1005:ay="Unknown: no status code was provided even though one was expected.";
break;
case 1006:ay="Connection was closed abnormally (that is, with no close frame being sent).";
break
}}jQuery.atmosphere.warn("Websocket closed, reason: "+ay);
jQuery.atmosphere.warn("Websocket closed, wasClean: "+ax.wasClean);
ac(av);
P.state="closed";
if(aq){jQuery.atmosphere.log(H.logLevel,["Websocket closed normally"])
}else{if(!av){J("Websocket failed. Downgrading to Comet and resending")
}else{if(H.reconnect&&P.transport=="websocket"){af();
if(f++<H.maxReconnectOnClose){G("re-connecting",H.transport,H);
H.id=setTimeout(function(){P.responseBody="";
P.messages=[];
ae(true)
},H.reconnectInterval)
}else{jQuery.atmosphere.log(H.logLevel,["Websocket reconnect maximum try reached "+H.requestCount]);
jQuery.atmosphere.warn("Websocket error, reason: "+ax.reason);
Z(0,"maxReconnectOnClose reached")
}}}}};
if(S.url===undefined){S.onclose({reason:"Android 4.1 does not support websockets.",wasClean:false})
}}function n(ax,aw){var au=true;
if(jQuery.trim(aw)!=0&&ax.enableProtocol&&ax.firstMessage){ax.firstMessage=false;
var av=aw.split(ax.messageDelimiter);
var ay=av.length==2?0:1;
ax.uuid=jQuery.trim(av[ay]);
ax.stime=jQuery.trim(av[ay+1]);
au=false;
if(ax.transport!="long-polling"){ai(ax)
}}else{ai(ax)
}return au
}function r(au){clearTimeout(au.id);
if(au.transport!="polling"){au.id=setTimeout(function(){ac(true);
af();
w()
},au.timeout)
}}function Z(au,av){af();
clearTimeout(H.id);
P.state="error";
P.reasonPhrase=av;
P.responseBody="";
P.status=au;
P.messages=[];
v()
}function q(ay,ax,au){if(!n(H,ay)){return true
}if(ay.length==0){return true
}if(ax.trackMessageLength){ay=au.partialMessage+ay;
var aw=[];
var av=ay.indexOf(ax.messageDelimiter);
while(av!=-1){var aA=jQuery.trim(ay.substring(0,av));
var az=parseInt(aA,10);
if(isNaN(az)){throw'message length "'+aA+'" is not a number'
}av+=ax.messageDelimiter.length;
if(av+az>ay.length){av=-1
}else{aw.push(ay.substring(av,av+az));
ay=ay.substring(av+az,ay.length);
av=ay.indexOf(ax.messageDelimiter)
}}au.partialMessage=ay;
if(aw.length!=0){au.responseBody=aw.join(ax.messageDelimiter);
au.messages=aw;
return false
}else{au.responseBody="";
au.messages=[];
return true
}}else{au.responseBody=ay
}return false
}function J(au){jQuery.atmosphere.log(H.logLevel,[au]);
if(typeof(H.onTransportFailure)!="undefined"){H.onTransportFailure(au,H)
}else{if(typeof(jQuery.atmosphere.onTransportFailure)!="undefined"){jQuery.atmosphere.onTransportFailure(au,H)
}}H.transport=H.fallbackTransport;
var av=H.connectTimeout==-1?0:H.connectTimeout;
if(H.reconnect&&H.transport!="none"||H.transport==null){H.method=H.fallbackMethod;
P.transport=H.fallbackTransport;
H.fallbackTransport="none";
H.id=setTimeout(function(){m()
},av)
}else{Z(500,"Unable to reconnect with fallback transport")
}}function Q(aw,au){var av=H;
if((aw!=null)&&(typeof(aw)!="undefined")){av=aw
}if(au==null){au=av.url
}if(!av.attachHeadersAsQueryString){return au
}if(au.indexOf("X-Atmosphere-Framework")!=-1){return au
}au+=(au.indexOf("?")!=-1)?"&":"?";
au+="X-Atmosphere-tracking-id="+av.uuid;
au+="&X-Atmosphere-Framework="+jQuery.atmosphere.version;
au+="&X-Atmosphere-Transport="+av.transport;
if(av.trackMessageLength){au+="&X-Atmosphere-TrackMessageSize=true"
}if(av.lastTimestamp!=undefined){au+="&X-Cache-Date="+av.lastTimestamp
}else{au+="&X-Cache-Date="+0
}if(av.contentType!=""){au+="&Content-Type="+av.contentType
}if(av.enableProtocol){au+="&X-atmo-protocol=true"
}jQuery.each(av.headers,function(ax,az){var ay=jQuery.isFunction(az)?az.call(this,av,aw,P):az;
if(ay!=null){au+="&"+encodeURIComponent(ax)+"="+encodeURIComponent(ay)
}});
return au
}function am(){if(jQuery.browser.msie){if(typeof XMLHttpRequest=="undefined"){XMLHttpRequest=function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")
}catch(au){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")
}catch(au){}try{return new ActiveXObject("Microsoft.XMLHTTP")
}catch(au){}throw new Error("This browser does not support XMLHttpRequest.")
}
}}return new XMLHttpRequest()
}function ai(au){if(!au.isOpen){au.isOpen=true;
G("opening",au.transport,au)
}else{if(au.isReopen){au.isReopen=false;
G("re-opening",au.transport,au)
}}}function l(aw){var au=H;
if((aw!=null)||(typeof(aw)!="undefined")){au=aw
}au.lastIndex=0;
au.readyState=0;
if((au.transport=="jsonp")||((au.enableXDR)&&(jQuery.atmosphere.checkCORSSupport()))){s(au);
return
}if(au.transport=="ajax"){U(aw);
return
}if(jQuery.browser.msie&&jQuery.browser.version<10){if((au.transport=="streaming")){au.enableXDR&&window.XDomainRequest?I(au):ap(au);
return
}if((au.enableXDR)&&(window.XDomainRequest)){I(au);
return
}}var ax=function(){au.lastIndex=0;
if(au.reconnect&&f++<au.maxReconnectOnClose){G("re-connecting",aw.transport,aw);
K(av,au,aw.reconnectInterval)
}else{Z(0,"maxReconnectOnClose reached")
}};
if(au.reconnect&&(au.maxRequest==-1||au.requestCount++<au.maxRequest)){var av=am();
av.hasData=false;
b(av,au,true);
if(au.suspend){o=av
}if(au.transport!="polling"){P.transport=au.transport;
av.onabort=function(){ac(true)
};
av.onerror=function(){P.error=true;
try{P.status=XMLHttpRequest.status
}catch(ay){P.status=500
}if(!P.status){P.status=500
}af();
if(!P.errorHandled){ax()
}}
}av.onreadystatechange=function(){if(aq){return
}P.error=null;
var az=false;
var aE=false;
if(jQuery.browser.opera&&au.transport=="streaming"&&au.readyState>2&&av.readyState==4){af();
ax();
return
}au.readyState=av.readyState;
if(au.transport=="streaming"&&av.readyState>=3){aE=true
}else{if(au.transport=="long-polling"&&av.readyState===4){aE=true
}}r(H);
if((!au.enableProtocol||!aw.firstMessage)&&au.transport!="polling"&&av.readyState==2){ai(au)
}if(aE){var ay=0;
if(av.readyState!=0){ay=av.status>1000?0:av.status
}if(ay>=300||ay==0){P.errorHandled=true;
af();
ax();
return
}var aC=av.responseText;
if(jQuery.trim(aC.length)==0&&au.transport=="long-polling"){if(!av.hasData){ax()
}else{av.hasData=false
}return
}av.hasData=true;
aa(av,H);
if(au.transport=="streaming"){if(!jQuery.browser.opera){var aB=aC.substring(au.lastIndex,aC.length);
az=q(aB,au,P);
au.lastIndex=aC.length;
if(az){return
}}else{jQuery.atmosphere.iterate(function(){if(P.status!=500&&av.responseText.length>au.lastIndex){try{P.status=av.status;
P.headers=a(av.getAllResponseHeaders());
aa(av,H)
}catch(aG){P.status=404
}r(H);
P.state="messageReceived";
var aF=av.responseText.substring(au.lastIndex);
au.lastIndex=av.responseText.length;
az=q(aF,au,P);
if(!az){v()
}E(av,au)
}else{if(P.status>400){au.lastIndex=av.responseText.length;
return false
}}},0)
}}else{az=q(aC,au,P)
}try{P.status=av.status;
P.headers=a(av.getAllResponseHeaders());
aa(av,au)
}catch(aD){P.status=404
}if(au.suspend){P.state=P.status==0?"closed":"messageReceived"
}else{P.state="messagePublished"
}var aA=aw.transport!="streaming";
if(aA&&!au.executeCallbackBeforeReconnect){K(av,au,0)
}if(P.responseBody.length!=0&&!az){v()
}if(aA&&au.executeCallbackBeforeReconnect){K(av,au,0)
}E(av,au)
}};
av.send(au.data);
ad=true
}else{if(au.logLevel=="debug"){jQuery.atmosphere.log(au.logLevel,["Max re-connection reached."])
}Z(0,"maxRequest reached")
}}function b(aw,ax,av){var au=ax.url;
if(ax.dispatchUrl!=null&&ax.method=="POST"){au+=ax.dispatchUrl
}au=Q(ax,au);
au=jQuery.atmosphere.prepareURL(au);
if(av){aw.open(ax.method,au,true);
if(ax.connectTimeout>-1){ax.id=setTimeout(function(){if(ax.requestCount==0){af();
y("Connect timeout","closed",200,ax.transport)
}},ax.connectTimeout)
}}if(H.withCredentials){if("withCredentials" in aw){aw.withCredentials=true
}}if(!H.dropAtmosphereHeaders){aw.setRequestHeader("X-Atmosphere-Framework",jQuery.atmosphere.version);
aw.setRequestHeader("X-Atmosphere-Transport",ax.transport);
if(ax.lastTimestamp!=undefined){aw.setRequestHeader("X-Cache-Date",ax.lastTimestamp)
}else{aw.setRequestHeader("X-Cache-Date",0)
}if(ax.trackMessageLength){aw.setRequestHeader("X-Atmosphere-TrackMessageSize","true")
}aw.setRequestHeader("X-Atmosphere-tracking-id",ax.uuid)
}if(ax.contentType!=""){aw.setRequestHeader("Content-Type",ax.contentType)
}jQuery.each(ax.headers,function(ay,aA){var az=jQuery.isFunction(aA)?aA.call(this,aw,ax,av,P):aA;
if(az!=null){aw.setRequestHeader(ay,az)
}})
}function K(av,aw,ax){if(aw.reconnect||(aw.suspend&&ad)){var au=0;
if(av.readyState!=0){au=av.status>1000?0:av.status
}P.status=au==0?204:au;
P.reason=au==0?"Server resumed the connection or down.":"OK";
clearTimeout(aw.id);
aw.id=setTimeout(function(){l(aw)
},ax)
}}function Y(au){au.state="re-connecting";
V(au)
}function I(au){if(au.transport!="polling"){x=O(au);
x.open()
}else{O(au).open()
}}function O(aw){var av=H;
if((aw!=null)&&(typeof(aw)!="undefined")){av=aw
}var aB=av.transport;
var aA=0;
var au=new window.XDomainRequest();
var ay=function(){if(av.transport=="long-polling"&&(av.reconnect&&(av.maxRequest==-1||av.requestCount++<av.maxRequest))){au.status=200;
I(av)
}};
var az=av.rewriteURL||function(aD){var aC=/(?:^|;\s*)(JSESSIONID|PHPSESSID)=([^;]*)/.exec(document.cookie);
switch(aC&&aC[1]){case"JSESSIONID":return aD.replace(/;jsessionid=[^\?]*|(\?)|$/,";jsessionid="+aC[2]+"$1");
case"PHPSESSID":return aD.replace(/\?PHPSESSID=[^&]*&?|\?|$/,"?PHPSESSID="+aC[2]+"&").replace(/&$/,"")
}return aD
};
au.onprogress=function(){ax(au)
};
au.onerror=function(){if(av.transport!="polling"){af();
if(f++<av.maxReconnectOnClose){av.id=setTimeout(function(){G("re-connecting",aw.transport,aw);
I(av)
},av.reconnectInterval)
}else{Z(0,"maxReconnectOnClose reached")
}}};
au.onload=function(){};
var ax=function(aC){clearTimeout(av.id);
var aE=aC.responseText;
aE=aE.substring(aA);
aA+=aE.length;
if(aB!="polling"){av.id=setTimeout(function(){f=av.maxReconnectOnClose;
ac(true);
w();
af()
},av.timeout);
var aD=q(aE,av,P);
if(aB=="long-polling"&&jQuery.trim(aE)==0){return
}if(av.executeCallbackBeforeReconnect){ay()
}if(!aD){y(P.responseBody,"messageReceived",200,aB)
}if(!av.executeCallbackBeforeReconnect){ay()
}}};
return{open:function(){var aC=av.url;
if(av.dispatchUrl!=null){aC+=av.dispatchUrl
}aC=Q(av,aC);
au.open(av.method,az(aC));
if(av.method=="GET"){au.send()
}else{au.send(av.data)
}if(av.connectTimeout>-1){av.id=setTimeout(function(){if(av.requestCount==0){af();
y("Connect timeout","closed",200,av.transport)
}},av.connectTimeout)
}},close:function(){au.abort()
}}
}function ap(au){x=p(au);
x.open()
}function p(ax){var aw=H;
if((ax!=null)&&(typeof(ax)!="undefined")){aw=ax
}var av;
var ay=new window.ActiveXObject("htmlfile");
ay.open();
ay.close();
var au=aw.url;
if(aw.dispatchUrl!=null){au+=aw.dispatchUrl
}if(aw.transport!="polling"){P.transport=aw.transport
}return{open:function(){var az=ay.createElement("iframe");
au=Q(aw);
if(aw.data!=""){au+="&X-Atmosphere-Post-Body="+encodeURIComponent(aw.data)
}au=jQuery.atmosphere.prepareURL(au);
az.src=au;
ay.body.appendChild(az);
var aA=az.contentDocument||az.contentWindow.document;
av=jQuery.atmosphere.iterate(function(){try{if(!aA.firstChild){return
}if(aA.readyState==="complete"){try{jQuery.noop(aA.fileSize)
}catch(aG){y("Connection Failure","error",500,aw.transport);
return false
}}var aD=aA.body?aA.body.lastChild:aA;
var aF=function(){var aI=aD.cloneNode(true);
aI.appendChild(aA.createTextNode("."));
var aH=aI.innerText;
aH=aH.substring(0,aH.length-1);
return aH
};
if(!jQuery.nodeName(aD,"pre")){var aC=aA.head||aA.getElementsByTagName("head")[0]||aA.documentElement||aA;
var aB=aA.createElement("script");
aB.text="document.write('<plaintext>')";
aC.insertBefore(aB,aC.firstChild);
aC.removeChild(aB);
aD=aA.body.lastChild
}if(aw.closed){aw.isReopen=true
}av=jQuery.atmosphere.iterate(function(){var aI=aF();
if(aI.length>aw.lastIndex){r(H);
P.status=200;
P.error=null;
aD.innerText="";
var aH=q(aI,aw,P);
if(aH){return""
}y(P.responseBody,"messageReceived",200,aw.transport)
}aw.lastIndex=0;
if(aA.readyState==="complete"){ac(true);
G("re-connecting",aw.transport,aw);
aw.id=setTimeout(function(){ap(aw)
},aw.reconnectInterval);
return false
}},null);
return false
}catch(aE){P.error=true;
G("re-connecting",aw.transport,aw);
if(f++<aw.maxReconnectOnClose){aw.id=setTimeout(function(){ap(aw)
},aw.reconnectInterval)
}else{Z(0,"maxReconnectOnClose reached")
}ay.execCommand("Stop");
ay.close();
return false
}})
},close:function(){if(av){av()
}ay.execCommand("Stop");
ac(true)
}}
}function ag(au){if(k!=null){g(au)
}else{if(o!=null||i!=null){c(au)
}else{if(x!=null){R(au)
}else{if(z!=null){N(au)
}else{if(S!=null){A(au)
}}}}}}function h(av){var au=aj(av);
au.transport="ajax";
au.method="GET";
au.async=false;
au.reconnect=false;
l(au)
}function g(au){k.send(au)
}function u(av){if(av.length==0){return
}try{if(k){k.localSend(av)
}else{if(ak){ak.signal("localMessage",jQuery.stringifyJSON({id:C,event:av}))
}}}catch(au){jQuery.atmosphere.error(au)
}}function c(av){var au=aj(av);
l(au)
}function R(av){if(H.enableXDR&&jQuery.atmosphere.checkCORSSupport()){var au=aj(av);
au.reconnect=false;
s(au)
}else{c(av)
}}function N(au){c(au)
}function M(au){var av=au;
if(typeof(av)=="object"){av=au.data
}return av
}function aj(av){var aw=M(av);
var au={connected:false,timeout:60000,method:"POST",url:H.url,contentType:H.contentType,headers:H.headers,reconnect:true,callback:null,data:aw,suspend:false,maxRequest:-1,logLevel:"info",requestCount:0,withCredentials:H.withCredentials,transport:"polling",isOpen:true,attachHeadersAsQueryString:true,enableXDR:H.enableXDR,uuid:H.uuid,dispatchUrl:H.dispatchUrl,enableProtocol:false,messageDelimiter:"|",maxReconnectOnClose:H.maxReconnectOnClose};
if(typeof(av)=="object"){au=jQuery.extend(au,av)
}return au
}function A(au){var ax=M(au);
var av;
try{if(H.dispatchUrl!=null){av=H.webSocketPathDelimiter+H.dispatchUrl+H.webSocketPathDelimiter+ax
}else{av=ax
}S.send(av)
}catch(aw){S.onclose=function(ay){};
af();
J("Websocket failed. Downgrading to Comet and resending "+av);
c(au)
}}function W(av){var au=jQuery.parseJSON(av);
if(au.id!=C){if(typeof(H.onLocalMessage)!="undefined"){H.onLocalMessage(au.event)
}else{if(typeof(jQuery.atmosphere.onLocalMessage)!="undefined"){jQuery.atmosphere.onLocalMessage(au.event)
}}}}function y(ax,au,av,aw){P.responseBody=ax;
P.transport=aw;
P.status=av;
P.state=au;
v()
}function aa(au,ax){if(!ax.readResponsesHeaders&&!ax.enableProtocol){ax.lastTimestamp=jQuery.now();
ax.uuid=jQuery.atmosphere.guid();
return
}try{var aw=au.getResponseHeader("X-Cache-Date");
if(aw&&aw!=null&&aw.length>0){ax.lastTimestamp=aw.split(" ").pop()
}var av=au.getResponseHeader("X-Atmosphere-tracking-id");
if(av&&av!=null){ax.uuid=av.split(" ").pop()
}if(ax.headers){jQuery.each(H.headers,function(aA){var az=au.getResponseHeader(aA);
if(az){P.headers[aA]=az
}})
}}catch(ay){}}function V(au){ao(au,H);
ao(au,jQuery.atmosphere)
}function ao(av,aw){switch(av.state){case"messageReceived":f=0;
if(typeof(aw.onMessage)!="undefined"){aw.onMessage(av)
}break;
case"error":if(typeof(aw.onError)!="undefined"){aw.onError(av)
}break;
case"opening":if(typeof(aw.onOpen)!="undefined"){aw.onOpen(av)
}break;
case"messagePublished":if(typeof(aw.onMessagePublished)!="undefined"){aw.onMessagePublished(av)
}break;
case"re-connecting":if(typeof(aw.onReconnect)!="undefined"){aw.onReconnect(H,av)
}break;
case"re-opening":if(typeof(aw.onReopen)!="undefined"){aw.onReopen(H,av)
}break;
case"fail-to-reconnect":if(typeof(aw.onFailureToReconnect)!="undefined"){aw.onFailureToReconnect(H,av)
}break;
case"unsubscribe":case"closed":var au=typeof(H.closed)!="undefined"?H.closed:false;
if(typeof(aw.onClose)!="undefined"&&!au){aw.onClose(av)
}H.closed=true;
break
}}function ac(au){if(P.state!="closed"){P.state="closed";
P.responseBody="";
P.messages=[];
P.status=!au?501:200;
v()
}}function v(){var aw=function(az,aA){aA(P)
};
if(k==null&&T!=null){T(P.responseBody)
}H.reconnect=H.mrequest;
var au=typeof(P.responseBody)=="string";
var ax=(au&&H.trackMessageLength)?(P.messages.length>0?P.messages:[""]):new Array(P.responseBody);
for(var av=0;
av<ax.length;
av++){if(ax.length>1&&ax[av].length==0){continue
}P.responseBody=(au)?jQuery.trim(ax[av]):ax[av];
if(k==null&&T!=null){T(P.responseBody)
}if(P.responseBody.length==0&&P.state=="messageReceived"){continue
}V(P);
if(jQuery.atmosphere.callbacks.length>0){if(H.logLevel=="debug"){jQuery.atmosphere.debug("Invoking "+jQuery.atmosphere.callbacks.length+" global callbacks: "+P.state)
}try{jQuery.each(jQuery.atmosphere.callbacks,aw)
}catch(ay){jQuery.atmosphere.log(H.logLevel,["Callback exception"+ay])
}}if(typeof(H.callback)=="function"){if(H.logLevel=="debug"){jQuery.atmosphere.debug("Invoking request callbacks")
}try{H.callback(P)
}catch(ay){jQuery.atmosphere.log(H.logLevel,["Callback exception"+ay])
}}}}function E(av,au){if(P.partialMessage==""&&(au.transport=="streaming")&&(av.responseText.length>au.maxStreamingLength)){P.messages=[];
ac(true);
w();
af();
K(av,au,0)
}}function w(){if(H.enableProtocol&&!H.firstMessage){var av="X-Atmosphere-Transport=close&X-Atmosphere-tracking-id="+H.uuid;
var au=H.url.replace(/([?&])_=[^&]*/,av);
au=au+(au===H.url?(/\?/.test(H.url)?"&":"?")+av:"");
if(H.connectTimeout>-1){jQuery.ajax({url:au,async:false,timeout:H.connectTimeout})
}else{jQuery.ajax({url:au,async:false})
}}}function ah(){H.reconnect=false;
aq=true;
P.request=H;
P.state="unsubscribe";
P.responseBody="";
P.status=408;
v();
w();
af()
}function af(){if(x!=null){x.close();
x=null
}if(z!=null){z.abort();
z=null
}if(o!=null){o.abort();
o=null
}if(S!=null){if(S.webSocketOpened){S.close()
}S=null
}if(i!=null){i.close();
i=null
}an()
}function an(){if(ak!=null){clearInterval(D);
document.cookie=encodeURIComponent("atmosphere-"+H.url)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
ak.signal("close",{reason:"",heir:!aq?C:(ak.get("children")||[])[0]});
ak.close()
}if(k!=null){k.close()
}}this.subscribe=function(au){at(au);
m()
};
this.execute=function(){m()
};
this.invokeCallback=function(){v()
};
this.close=function(){ah()
};
this.disconnect=function(){w()
};
this.getUrl=function(){return H.url
};
this.push=function(aw,av){if(av!=null){var au=H.dispatchUrl;
H.dispatchUrl=av;
ag(aw);
H.dispatchUrl=au
}else{ag(aw)
}};
this.getUUID=function(){return H.uuid
};
this.pushLocal=function(au){u(au)
};
this.enableProtocol=function(au){return H.enableProtocol
};
this.request=H;
this.response=P
},subscribe:function(b,e,d){if(typeof(e)=="function"){jQuery.atmosphere.addCallback(e)
}if(typeof(b)!="string"){d=b
}else{d.url=b
}var c=new jQuery.atmosphere.AtmosphereRequest(d);
c.execute();
jQuery.atmosphere.requests[jQuery.atmosphere.requests.length]=c;
return c
},addCallback:function(b){if(jQuery.inArray(b,jQuery.atmosphere.callbacks)==-1){jQuery.atmosphere.callbacks.push(b)
}},removeCallback:function(c){var b=jQuery.inArray(c,jQuery.atmosphere.callbacks);
if(b!=-1){jQuery.atmosphere.callbacks.splice(b,1)
}},unsubscribe:function(){if(jQuery.atmosphere.requests.length>0){var b=[].concat(jQuery.atmosphere.requests);
for(var d=0;
d<b.length;
d++){var c=b[d];
c.close();
clearTimeout(c.response.request.id)
}}jQuery.atmosphere.requests=[];
jQuery.atmosphere.callbacks=[]
},unsubscribeUrl:function(c){var b=-1;
if(jQuery.atmosphere.requests.length>0){for(var e=0;
e<jQuery.atmosphere.requests.length;
e++){var d=jQuery.atmosphere.requests[e];
if(d.getUrl()==c){d.close();
clearTimeout(d.response.request.id);
b=e;
break
}}}if(b>=0){jQuery.atmosphere.requests.splice(b,1)
}},publish:function(c){if(typeof(c.callback)=="function"){jQuery.atmosphere.addCallback(callback)
}c.transport="polling";
var b=new jQuery.atmosphere.AtmosphereRequest(c);
jQuery.atmosphere.requests[jQuery.atmosphere.requests.length]=b;
return b
},checkCORSSupport:function(){if(jQuery.browser.msie&&!window.XDomainRequest){return true
}else{if(jQuery.browser.opera&&jQuery.browser.version<12){return true
}}var b=navigator.userAgent.toLowerCase();
var c=b.indexOf("android")>-1;
if(c){return true
}return false
},S4:function(){return(((1+Math.random())*65536)|0).toString(16).substring(1)
},guid:function(){return(jQuery.atmosphere.S4()+jQuery.atmosphere.S4()+"-"+jQuery.atmosphere.S4()+"-"+jQuery.atmosphere.S4()+"-"+jQuery.atmosphere.S4()+"-"+jQuery.atmosphere.S4()+jQuery.atmosphere.S4()+jQuery.atmosphere.S4())
},prepareURL:function(c){var d=jQuery.now();
var b=c.replace(/([?&])_=[^&]*/,"$1_="+d);
return b+(b===c?(/\?/.test(c)?"&":"?")+"_="+d:"")
},param:function(b){return jQuery.param(b,jQuery.ajaxSettings.traditional)
},supportStorage:function(){var c=window.localStorage;
if(c){try{c.setItem("t","t");
c.removeItem("t");
return window.StorageEvent&&!jQuery.browser.msie&&!(jQuery.browser.mozilla&&jQuery.browser.version.split(".")[0]==="1")
}catch(b){}}return false
},iterate:function(d,c){var e;
c=c||0;
(function b(){e=setTimeout(function(){if(d()===false){return
}b()
},c)
})();
return function(){clearTimeout(e)
}
},log:function(d,c){if(window.console){var b=window.console[d];
if(typeof b=="function"){b.apply(window.console,c)
}}},warn:function(){jQuery.atmosphere.log("warn",arguments)
},info:function(){jQuery.atmosphere.log("info",arguments)
},debug:function(){jQuery.atmosphere.log("debug",arguments)
},error:function(){jQuery.atmosphere.log("error",arguments)
}}
}();
(function(){var a,b;
jQuery.uaMatch=function(d){d=d.toLowerCase();
var c=/(chrome)[ \/]([\w.]+)/.exec(d)||/(webkit)[ \/]([\w.]+)/.exec(d)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(d)||/(msie) ([\w.]+)/.exec(d)||d.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(d)||[];
return{browser:c[1]||"",version:c[2]||"0"}
};
a=jQuery.uaMatch(navigator.userAgent);
b={};
if(a.browser){b[a.browser]=true;
b.version=a.version
}if(b.chrome){b.webkit=true
}else{if(b.webkit){b.safari=true
}}jQuery.browser=b;
jQuery.sub=function(){function c(f,g){return new c.fn.init(f,g)
}jQuery.extend(true,c,this);
c.superclass=this;
c.fn=c.prototype=this();
c.fn.constructor=c;
c.sub=this.sub;
c.fn.init=function e(f,g){if(g&&g instanceof jQuery&&!(g instanceof c)){g=c(g)
}return jQuery.fn.init.call(this,f,g,d)
};
c.fn.init.prototype=c.fn;
var d=c(document);
return c
}
})();
(function(d){var g=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function a(f){return'"'+f.replace(g,function(h){var i=c[h];
return typeof i==="string"?i:"\\u"+("0000"+h.charCodeAt(0).toString(16)).slice(-4)
})+'"'
}function b(f){return f<10?"0"+f:f
}function e(m,l){var k,j,f,h,o=l[m],n=typeof o;
if(o&&typeof o==="object"&&typeof o.toJSON==="function"){o=o.toJSON(m);
n=typeof o
}switch(n){case"string":return a(o);
case"number":return isFinite(o)?String(o):"null";
case"boolean":return String(o);
case"object":if(!o){return"null"
}switch(Object.prototype.toString.call(o)){case"[object Date]":return isFinite(o.valueOf())?'"'+o.getUTCFullYear()+"-"+b(o.getUTCMonth()+1)+"-"+b(o.getUTCDate())+"T"+b(o.getUTCHours())+":"+b(o.getUTCMinutes())+":"+b(o.getUTCSeconds())+'Z"':"null";
case"[object Array]":f=o.length;
h=[];
for(k=0;
k<f;
k++){h.push(e(k,o)||"null")
}return"["+h.join(",")+"]";
default:h=[];
for(k in o){if(Object.prototype.hasOwnProperty.call(o,k)){j=e(k,o);
if(j){h.push(a(k)+":"+j)
}}}return"{"+h.join(",")+"}"
}}}d.stringifyJSON=function(f){if(window.JSON&&window.JSON.stringify){return window.JSON.stringify(f)
}return e("",{"":f})
}
}(jQuery));
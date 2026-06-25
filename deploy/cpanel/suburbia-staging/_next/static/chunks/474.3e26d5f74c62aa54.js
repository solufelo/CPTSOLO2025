"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[474],{2034:(e,t,r)=>{r.d(t,{_:()=>u});var i=r(8945),n=r(2115),l=r(5339),s=r(4877);let o={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},a={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `},u=n.forwardRef(({scale:e=10,frames:t=1/0,opacity:r=1,width:u=1,height:c=1,blur:d=1,near:m=0,far:v=10,resolution:f=512,smooth:p=!0,color:h="#000000",depthWrite:x=!1,renderOrder:y,...g},M)=>{let b,k,D=n.useRef(null),w=(0,s.C)(e=>e.scene),U=(0,s.C)(e=>e.gl),P=n.useRef(null);u*=Array.isArray(e)?e[0]:e||1,c*=Array.isArray(e)?e[1]:e||1;let[j,E,R,T,S,C,I]=n.useMemo(()=>{let e=new l.nWS(f,f),t=new l.nWS(f,f);t.texture.generateMipmaps=e.texture.generateMipmaps=!1;let r=new l.bdM(u,c).rotateX(Math.PI/2),i=new l.eaF(r),n=new l.CSG;n.depthTest=n.depthWrite=!1,n.onBeforeCompile=e=>{e.uniforms={...e.uniforms,ucolor:{value:new l.Q1f(h)}},e.fragmentShader=e.fragmentShader.replace("void main() {",`uniform vec3 ucolor;
           void main() {
          `),e.fragmentShader=e.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );")};let s=new l.BKk(o),d=new l.BKk(a);return d.depthTest=s.depthTest=!1,[e,r,n,i,s,d,t]},[f,u,c,e,h]),W=e=>{T.visible=!0,T.material=S,S.uniforms.tDiffuse.value=j.texture,S.uniforms.h.value=e/256,U.setRenderTarget(I),U.render(T,P.current),T.material=C,C.uniforms.tDiffuse.value=I.texture,C.uniforms.v.value=e/256,U.setRenderTarget(j),U.render(T,P.current),T.visible=!1},$=0;return(0,s.D)(()=>{P.current&&(t===1/0||$<t)&&($++,b=w.background,k=w.overrideMaterial,D.current.visible=!1,w.background=null,w.overrideMaterial=R,U.setRenderTarget(j),U.render(w,P.current),W(d),p&&W(.4*d),U.setRenderTarget(null),D.current.visible=!0,w.overrideMaterial=k,w.background=b)}),n.useImperativeHandle(M,()=>D.current,[]),n.createElement("group",(0,i.A)({"rotation-x":Math.PI/2},g,{ref:D}),n.createElement("mesh",{renderOrder:y,geometry:E,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},n.createElement("meshBasicMaterial",{transparent:!0,map:j.texture,opacity:r,depthWrite:x})),n.createElement("orthographicCamera",{ref:P,args:[-u/2,u/2,c/2,-c/2,m,v]}))})},3646:(e,t,r)=>{let i,n;r.d(t,{E:()=>g});var l=r(8945),s=r(2115),o=r(2669),a=r(5339),u=r(4877);let c=new a.Pq0,d=new a.Pq0,m=new a.Pq0,v=new a.I9Y;function f(e,t,r){let i=c.setFromMatrixPosition(e.matrixWorld);i.project(t);let n=r.width/2,l=r.height/2;return[i.x*n+n,-(i.y*l)+l]}let p=e=>1e-10>Math.abs(e)?0:e;function h(e,t,r=""){let i="matrix3d(";for(let r=0;16!==r;r++)i+=p(t[r]*e.elements[r])+(15!==r?",":")");return r+i}let x=(i=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>h(e,i)),y=(n=e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1],(e,t)=>h(e,n(t),"translate(-50%,-50%)")),g=s.forwardRef(({children:e,eps:t=.001,style:r,className:i,prepend:n,center:h,fullscreen:g,portal:M,distanceFactor:b,sprite:k=!1,transform:D=!1,occlude:w,onOcclude:U,castShadow:P,receiveShadow:j,material:E,geometry:R,zIndexRange:T=[0x1000037,0],calculatePosition:S=f,as:C="div",wrapperClass:I,pointerEvents:W="auto",...$},L)=>{let{gl:F,camera:_,scene:A,size:z,raycaster:N,events:q,viewport:H}=(0,u.C)(),[B]=s.useState(()=>document.createElement(C)),O=s.useRef(null),V=s.useRef(null),Z=s.useRef(0),G=s.useRef([0,0]),K=s.useRef(null),Y=s.useRef(null),Q=(null==M?void 0:M.current)||q.connected||F.domElement.parentNode,X=s.useRef(null),J=s.useRef(!1),ee=s.useMemo(()=>w&&"blending"!==w||Array.isArray(w)&&w.length&&function(e){return e&&"object"==typeof e&&"current"in e}(w[0]),[w]);s.useLayoutEffect(()=>{let e=F.domElement;w&&"blending"===w?(e.style.zIndex=`${Math.floor(T[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[w]),s.useLayoutEffect(()=>{if(V.current){let e=O.current=o.createRoot(B);if(A.updateMatrixWorld(),D)B.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{let e=S(V.current,_,z);B.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return Q&&(n?Q.prepend(B):Q.appendChild(B)),()=>{Q&&Q.removeChild(B),e.unmount()}}},[Q,D]),s.useLayoutEffect(()=>{I&&(B.className=I)},[I]);let et=s.useMemo(()=>D?{position:"absolute",top:0,left:0,width:z.width,height:z.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:h?"translate3d(-50%,-50%,0)":"none",...g&&{top:-z.height/2,left:-z.width/2,width:z.width,height:z.height},...r},[r,h,g,z,D]),er=s.useMemo(()=>({position:"absolute",pointerEvents:W}),[W]);s.useLayoutEffect(()=>{var t,n;J.current=!1,D?null==(t=O.current)||t.render(s.createElement("div",{ref:K,style:et},s.createElement("div",{ref:Y,style:er},s.createElement("div",{ref:L,className:i,style:r,children:e})))):null==(n=O.current)||n.render(s.createElement("div",{ref:L,style:et,className:i,children:e}))});let ei=s.useRef(!0);(0,u.D)(e=>{if(V.current){_.updateMatrixWorld(),V.current.updateWorldMatrix(!0,!1);let e=D?G.current:S(V.current,_,z);if(D||Math.abs(Z.current-_.zoom)>t||Math.abs(G.current[0]-e[0])>t||Math.abs(G.current[1]-e[1])>t){let t=function(e,t){let r=c.setFromMatrixPosition(e.matrixWorld),i=d.setFromMatrixPosition(t.matrixWorld),n=r.sub(i),l=t.getWorldDirection(m);return n.angleTo(l)>Math.PI/2}(V.current,_),r=!1;ee&&(Array.isArray(w)?r=w.map(e=>e.current):"blending"!==w&&(r=[A]));let i=ei.current;r?ei.current=function(e,t,r,i){let n=c.setFromMatrixPosition(e.matrixWorld),l=n.clone();l.project(t),v.set(l.x,l.y),r.setFromCamera(v,t);let s=r.intersectObjects(i,!0);if(s.length){let e=s[0].distance;return n.distanceTo(r.ray.origin)<e}return!0}(V.current,_,N,r)&&!t:ei.current=!t,i!==ei.current&&(U?U(!ei.current):B.style.display=ei.current?"block":"none");let n=Math.floor(T[0]/2),l=w?ee?[T[0],n]:[n-1,0]:T;if(B.style.zIndex=`${function(e,t,r){if(t instanceof a.ubm||t instanceof a.qUd){let i=c.setFromMatrixPosition(e.matrixWorld),n=d.setFromMatrixPosition(t.matrixWorld),l=i.distanceTo(n),s=(r[1]-r[0])/(t.far-t.near),o=r[1]-s*t.far;return Math.round(s*l+o)}}(V.current,_,l)}`,D){let[e,t]=[z.width/2,z.height/2],r=_.projectionMatrix.elements[5]*t,{isOrthographicCamera:i,top:n,left:l,bottom:s,right:o}=_,a=x(_.matrixWorldInverse),u=i?`scale(${r})translate(${p(-(o+l)/2)}px,${p((n+s)/2)}px)`:`translateZ(${r}px)`,c=V.current.matrixWorld;k&&((c=_.matrixWorldInverse.clone().transpose().copyPosition(c).scale(V.current.scale)).elements[3]=c.elements[7]=c.elements[11]=0,c.elements[15]=1),B.style.width=z.width+"px",B.style.height=z.height+"px",B.style.perspective=i?"":`${r}px`,K.current&&Y.current&&(K.current.style.transform=`${u}${a}translate(${e}px,${t}px)`,Y.current.style.transform=y(c,1/((b||10)/400)))}else{let t=void 0===b?1:function(e,t){if(t instanceof a.qUd)return t.zoom;if(!(t instanceof a.ubm))return 1;{let r=c.setFromMatrixPosition(e.matrixWorld),i=d.setFromMatrixPosition(t.matrixWorld);return 1/(2*Math.tan(t.fov*Math.PI/180/2)*r.distanceTo(i))}}(V.current,_)*b;B.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}G.current=e,Z.current=_.zoom}}if(!ee&&X.current&&!J.current)if(D){if(K.current){let e=K.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){let{isOrthographicCamera:t}=_;if(t||R)$.scale&&(Array.isArray($.scale)?$.scale instanceof a.Pq0?X.current.scale.copy($.scale.clone().divideScalar(1)):X.current.scale.set(1/$.scale[0],1/$.scale[1],1/$.scale[2]):X.current.scale.setScalar(1/$.scale));else{let t=(b||10)/400,r=e.clientWidth*t,i=e.clientHeight*t;X.current.scale.set(r,i,1)}J.current=!0}}}else{let t=B.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){let e=1/H.factor,r=t.clientWidth*e,i=t.clientHeight*e;X.current.scale.set(r,i,1),J.current=!0}X.current.lookAt(e.camera.position)}});let en=s.useMemo(()=>({vertexShader:D?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[D]);return s.createElement("group",(0,l.A)({},$,{ref:V}),w&&!ee&&s.createElement("mesh",{castShadow:P,receiveShadow:j,ref:X},R||s.createElement("planeGeometry",null),E||s.createElement("shaderMaterial",{side:a.$EB,vertexShader:en.vertexShader,fragmentShader:en.fragmentShader})))})},6922:(e,t,r)=>{r.d(t,{$:()=>M});var i=r(5155),n=r(2115),l=r(9495);let s={listItem:"list-item",oListItem:"o-list-item",list:"group-list-item",oList:"group-o-list-item",span:"span"},o={[s.listItem]:"listItem",[s.oListItem]:"oListItem",[s.list]:"list",[s.oList]:"oList"},a=e=>(t,r,i,n,l)=>{let s=e[o[t]||t];if(s)return s({type:t,node:r,text:i,children:n,key:l})},u=()=>(++u.i).toString();u.i=0;let c=(e,t=[])=>({key:u(),type:e.type,text:"text"in e?e.text:void 0,node:e,children:t}),d=e=>c({type:s.span,text:e,spans:[]}),m=e=>{if("text"in e)return c(e,v(e.spans,e));if("items"in e){let t=[];for(let r=0;r<e.items.length;r++)t.push(m(e.items[r]));return c(e,t)}return c(e)},v=(e,t,r)=>{if(!e.length)return[d(t.text)];let i=e.slice(0);i.sort((e,t)=>e.start-t.start||t.end-e.end);let n=[];for(let e=0;e<i.length;e++){let l=i[e],s=r&&r.start||0,o=l.start-s,a=l.end-s,u=t.text.slice(o,a),m=[];for(let t=e;t<i.length;t++){let e=i[t];e!==l&&(e.start>=l.start&&e.end<=l.end?(m.push(e),i.splice(t,1),t--):e.start<l.end&&e.end>l.start&&(m.push({...e,end:l.end}),i[t]={...e,start:l.end}))}0===e&&o>0&&n.push(d(t.text.slice(0,o)));let f={...l,text:u};n.push(c(f,v(m,{...t,text:u},l))),a<t.text.length&&n.push(d(t.text.slice(a,i[e+1]?i[e+1].start-s:void 0)))}return n},f=(e,t)=>{let r=[];for(let i=0;i<e.length;i++){let n=e[i],l=t(n.type,n.node,n.text,f(n.children,t),n.key);null!=l&&r.push(l)}return r};var p=r(319),h=r(2292),x=r(277);let y=(0,n.forwardRef)(function(e,t){let{field:r,document:n,linkResolver:s,internalComponent:o,externalComponent:a,children:u,...c}=e;if(p.A)if(r)if(r.link_type)("text"in r?Object.keys(r).length>2:Object.keys(r).length>1)&&!("url"in r||"uid"in r||"id"in r)&&console.warn(`[PrismicLink] The provided field is missing required properties to properly render a link. The link may not render correctly. For more details, see ${(0,h.R)("missing-link-properties")}`,r);else throw console.error(`[PrismicLink] This "field" prop value caused an error to be thrown.
`,r),Error(`[PrismicLink] The provided field is missing required properties to properly render a link. The link will not render. For more details, see ${(0,h.R)("missing-link-properties")}`);else n&&!("url"in n||"id"in n)&&console.warn(`[PrismicLink] The provided document is missing required properties to properly render a link. The link may not render correctly. For more details, see ${(0,h.R)("missing-link-properties")}`,n);let{href:d,rel:m,...v}=((e,t={})=>{if(e&&("link_type"in e?(0,l.nf)(e):e)){let r="target"in e?e.target:void 0,i=(0,x.z)(e,t.linkResolver),n=null==i?void 0:i,l="string"==typeof n&&!(e=>{let t=/^(\/(?!\/)|#)/.test(e),r=!t&&!/^https?:\/\//.test(e);return t&&!r})(n),s=t.rel?t.rel({href:n,isExternal:l,target:r}):l?"noreferrer":void 0;return{href:n,target:r,rel:null==s?void 0:s}}return{}})(r??n,{linkResolver:s,rel:"function"==typeof c.rel?c.rel:void 0}),f=m;"rel"in c&&"function"!=typeof c.rel&&(f=c.rel);let y=("href"in c?c.href:d)||"",g=o||"a",M=y&&!function(e){let t=/^(\/(?!\/)|#)/.test(e),r=!t&&!/^https?:\/\//.test(e);return t&&!r}(y)?a||"a":g;return(0,i.jsx)(M,{ref:t,...v,...c,href:y,rel:f,children:"children"in e?u:null==r?void 0:r.text})}),g=e=>{if("direction"in e&&"rtl"===e.direction)return"rtl"},M=e=>{let t,{linkResolver:r,field:o,fallback:c,components:d,externalLinkComponent:v,internalLinkComponent:x,...M}=e;if(p.A&&"className"in M&&console.warn(`[PrismicRichText] className cannot be passed to <PrismicRichText> since it renders an array without a wrapping component. For more details, see ${(0,h.R)("classname-is-not-a-valid-prop")}.`,o),!l.YD(o))return null!=c?(0,i.jsx)(i.Fragment,{children:c}):null;let b=((...e)=>(...t)=>{for(let r=0;r<e.length;r++){let i=e[r];if(i){let e=i(...t);if(null!=e)return e}}})("object"==typeof d?a(d):d,(e=>a({heading1:({node:e,children:t,key:r})=>(0,i.jsx)("h1",{dir:g(e),children:t},r),heading2:({node:e,children:t,key:r})=>(0,i.jsx)("h2",{dir:g(e),children:t},r),heading3:({node:e,children:t,key:r})=>(0,i.jsx)("h3",{dir:g(e),children:t},r),heading4:({node:e,children:t,key:r})=>(0,i.jsx)("h4",{dir:g(e),children:t},r),heading5:({node:e,children:t,key:r})=>(0,i.jsx)("h5",{dir:g(e),children:t},r),heading6:({node:e,children:t,key:r})=>(0,i.jsx)("h6",{dir:g(e),children:t},r),paragraph:({node:e,children:t,key:r})=>(0,i.jsx)("p",{dir:g(e),children:t},r),preformatted:({node:e,key:t})=>(0,i.jsx)("pre",{children:e.text},t),strong:({children:e,key:t})=>(0,i.jsx)("strong",{children:e},t),em:({children:e,key:t})=>(0,i.jsx)("em",{children:e},t),listItem:({node:e,children:t,key:r})=>(0,i.jsx)("li",{dir:g(e),children:t},r),oListItem:({node:e,children:t,key:r})=>(0,i.jsx)("li",{dir:g(e),children:t},r),list:({children:e,key:t})=>(0,i.jsx)("ul",{children:e},t),oList:({children:e,key:t})=>(0,i.jsx)("ol",{children:e},t),image:({node:t,key:r})=>{let n=(0,i.jsx)("img",{src:t.url,alt:t.alt??void 0,"data-copyright":t.copyright?t.copyright:void 0});return(0,i.jsx)("p",{className:"block-img",children:t.linkTo?(0,i.jsx)(y,{linkResolver:e.linkResolver,internalComponent:e.internalLinkComponent,externalComponent:e.externalLinkComponent,field:t.linkTo,children:n}):n},r)},embed:({node:e,key:t})=>(0,i.jsx)("div",{"data-oembed":e.oembed.embed_url,"data-oembed-type":e.oembed.type,"data-oembed-provider":e.oembed.provider_name,dangerouslySetInnerHTML:{__html:e.oembed.html??""}},t),hyperlink:({node:t,children:r,key:n})=>(0,i.jsx)(y,{field:t.data,linkResolver:e.linkResolver,internalComponent:e.internalLinkComponent,externalComponent:e.externalLinkComponent,children:r},n),label:({node:e,children:t,key:r})=>(0,i.jsx)("span",{className:e.data.label,children:t},r),span:({text:e,key:t})=>{let r=[],l=0;for(let t of e.split("\n"))l>0&&r.push((0,i.jsx)("br",{},`${l}__break`)),r.push((0,i.jsx)(n.Fragment,{children:t},`${l}__line`)),l++;return(0,i.jsx)(n.Fragment,{children:r},t)}}))({linkResolver:r,internalLinkComponent:x,externalLinkComponent:v})),k=(t=(e,t,r,i,l)=>{let s=b(e,t,r,i,l);return(0,n.isValidElement)(s)&&null==s.key?(0,n.cloneElement)(s,{key:l}):s},f((e=>{let t=(e=>{let t=e.slice(0);for(let e=0;e<t.length;e++){let r=t[e];if(r.type===s.listItem||r.type===s.oListItem){let i=[r];for(;t[e+1]&&t[e+1].type===r.type;)i.push(t[e+1]),t.splice(e,1);r.type===s.listItem?t[e]={type:s.list,items:i}:t[e]={type:s.oList,items:i}}}return t})(e),r=[];for(let e=0;e<t.length;e++)r.push(m(t[e]));return{key:u(),children:r}})(o).children,t));return k?(0,i.jsx)(i.Fragment,{children:k}):null!=c?(0,i.jsx)(i.Fragment,{children:c}):null}}}]);
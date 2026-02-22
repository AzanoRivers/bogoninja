import { G as decodeKey } from './chunks/astro/server_Cys_r4bo.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_AB-0Y6Rt.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/DevCode/Repositories/03_Bogoninja/Web/","cacheDir":"file:///C:/DevCode/Repositories/03_Bogoninja/Web/node_modules/.astro/","outDir":"file:///C:/DevCode/Repositories/03_Bogoninja/Web/dist/","srcDir":"file:///C:/DevCode/Repositories/03_Bogoninja/Web/src/","publicDir":"file:///C:/DevCode/Repositories/03_Bogoninja/Web/public/","buildClientDir":"file:///C:/DevCode/Repositories/03_Bogoninja/Web/dist/client/","buildServerDir":"file:///C:/DevCode/Repositories/03_Bogoninja/Web/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"500.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/500","isIndex":false,"type":"page","pattern":"^\\/500\\/?$","segments":[[{"content":"500","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/500.astro","pathname":"/500","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.17.3_@vercel+functi_ad3800b60f989d91e1c7197a95f7882d/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/version","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/version\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"version","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/version.ts","pathname":"/api/version","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://bogota.ninja","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/DevCode/Repositories/03_Bogoninja/Web/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/DevCode/Repositories/03_Bogoninja/Web/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["C:/DevCode/Repositories/03_Bogoninja/Web/src/pages/500.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/DevCode/Repositories/03_Bogoninja/Web/src/layout/home/DesktopContent.astro",{"propagation":"in-tree","containsHead":false}],["C:/DevCode/Repositories/03_Bogoninja/Web/src/layout/index.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/DevCode/Repositories/03_Bogoninja/Web/src/layout/home/MobileContent.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/500@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.17.3_@vercel+functi_ad3800b60f989d91e1c7197a95f7882d/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/500@_@astro":"pages/500.astro.mjs","\u0000@astro-page:src/pages/api/version@_@ts":"pages/api/version.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_5BZUo1tA.mjs","C:/DevCode/Repositories/03_Bogoninja/Web/node_modules/.pnpm/astro@5.17.3_@vercel+functi_ad3800b60f989d91e1c7197a95f7882d/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_sjX2EeS_.mjs","C:\\DevCode\\Repositories\\03_Bogoninja\\Web\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\DevCode\\Repositories\\03_Bogoninja\\Web\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_Leb8W6mu.mjs","@astrojs/react/client.js":"_astro/client.T9fhd2RU.js","C:/DevCode/Repositories/03_Bogoninja/Web/src/layout/MainLayout.astro?astro&type=script&index=0&lang.ts":"_astro/MainLayout.astro_astro_type_script_index_0_lang.DdaHdqvP.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/DevCode/Repositories/03_Bogoninja/Web/src/layout/MainLayout.astro?astro&type=script&index=0&lang.ts","const o=()=>{if(window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches)return;const t=document.querySelectorAll(\".scroll-reveal, .scroll-reveal-slow, .scroll-reveal-fast, .scroll-reveal-left, .scroll-reveal-right\");if(t.length===0)return;const l={root:null,rootMargin:\"0px 0px -100px 0px\",threshold:.1},n=e=>{e.forEach(r=>{r.isIntersecting&&(r.target.classList.add(\"is-visible\"),s.unobserve(r.target))})},s=new IntersectionObserver(n,l);t.forEach(e=>{s.observe(e)})};document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",o):o();document.addEventListener(\"astro:page-load\",o);"]],"assets":["/_astro/joti-one-latin-400-normal.Cerjcgxm.woff2","/_astro/lato-latin-700-normal.BUGMgin4.woff2","/_astro/lato-latin-400-normal.BEhtfm5r.woff2","/_astro/lato-latin-ext-700-normal.C6gwlRgY.woff2","/_astro/joti-one-latin-ext-400-normal.wTCRjv3e.woff2","/_astro/lato-latin-ext-400-normal.CK4GAP86.woff2","/_astro/joti-one-latin-400-normal.CWUrLrBR.woff","/_astro/lato-latin-700-normal.DAdL7O4w.woff","/_astro/lato-latin-400-normal.B11PyLys.woff","/_astro/joti-one-latin-ext-400-normal.BdofAFCu.woff","/_astro/index.CdTFrByR.css","/bogoninja.png","/favicon.png","/favicon.svg","/logo-800x800.png","/images/centroastrobog.jpg","/images/deuna.svg","/images/firme.svg","/images/line.svg","/images/monserratewebp.webp","/images/mosca.svg","/images/papaya.svg","/images/torrescyberpunk.webp","/images/torrescyberpunk3.webp","/images/torresdelparque1.jpg","/images/video-play-placeholder.svg","/images/vivo.svg","/images/yoazano.webp","/_astro/client.T9fhd2RU.js","/404.html","/500.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"YkfPpVJX8R8y+6p6HzpD/4CZee4dGDP0K2SsPzWscXg="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };

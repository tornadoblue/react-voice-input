var Jr = Object.defineProperty;
var Kr = (r, t, o) => t in r ? Jr(r, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : r[t] = o;
var N = (r, t, o) => Kr(r, typeof t != "symbol" ? t + "" : t, o);
import * as xr from "react";
import wr, { useState as oe, useEffect as be, useRef as Fe, useCallback as me } from "react";
import { Slot as Xr } from "@radix-ui/react-slot";
import { Info as Hr, Save as Zr, AlertTriangle as Qr, RotateCcw as et, StopCircle as rt, Mic as tt } from "lucide-react";
import { toast as De } from "sonner";
var Ve = { exports: {} }, Pe = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ur;
function ot() {
  if (ur) return Pe;
  ur = 1;
  var r = wr, t = Symbol.for("react.element"), o = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, c = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(l, d, f) {
    var p, h = {}, g = null, A = null;
    f !== void 0 && (g = "" + f), d.key !== void 0 && (g = "" + d.key), d.ref !== void 0 && (A = d.ref);
    for (p in d) n.call(d, p) && !s.hasOwnProperty(p) && (h[p] = d[p]);
    if (l && l.defaultProps) for (p in d = l.defaultProps, d) h[p] === void 0 && (h[p] = d[p]);
    return { $$typeof: t, type: l, key: g, ref: A, props: h, _owner: c.current };
  }
  return Pe.Fragment = o, Pe.jsx = a, Pe.jsxs = a, Pe;
}
var Oe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dr;
function nt() {
  return dr || (dr = 1, process.env.NODE_ENV !== "production" && function() {
    var r = wr, t = Symbol.for("react.element"), o = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), l = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), A = Symbol.for("react.offscreen"), F = Symbol.iterator, b = "@@iterator";
    function y(e) {
      if (e === null || typeof e != "object")
        return null;
      var i = F && e[F] || e[b];
      return typeof i == "function" ? i : null;
    }
    var E = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function R(e) {
      {
        for (var i = arguments.length, u = new Array(i > 1 ? i - 1 : 0), m = 1; m < i; m++)
          u[m - 1] = arguments[m];
        B("error", e, u);
      }
    }
    function B(e, i, u) {
      {
        var m = E.ReactDebugCurrentFrame, T = m.getStackAddendum();
        T !== "" && (i += "%s", u = u.concat([T]));
        var k = u.map(function(w) {
          return String(w);
        });
        k.unshift("Warning: " + i), Function.prototype.apply.call(console[e], console, k);
      }
    }
    var W = !1, ne = !1, fe = !1, ie = !1, Z = !1, Q;
    Q = Symbol.for("react.module.reference");
    function se(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === n || e === s || Z || e === c || e === f || e === p || ie || e === A || W || ne || fe || typeof e == "object" && e !== null && (e.$$typeof === g || e.$$typeof === h || e.$$typeof === a || e.$$typeof === l || e.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Q || e.getModuleId !== void 0));
    }
    function X(e, i, u) {
      var m = e.displayName;
      if (m)
        return m;
      var T = i.displayName || i.name || "";
      return T !== "" ? u + "(" + T + ")" : u;
    }
    function C(e) {
      return e.displayName || "Context";
    }
    function z(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && R("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case n:
          return "Fragment";
        case o:
          return "Portal";
        case s:
          return "Profiler";
        case c:
          return "StrictMode";
        case f:
          return "Suspense";
        case p:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            var i = e;
            return C(i) + ".Consumer";
          case a:
            var u = e;
            return C(u._context) + ".Provider";
          case d:
            return X(e, e.render, "ForwardRef");
          case h:
            var m = e.displayName || null;
            return m !== null ? m : z(e.type) || "Memo";
          case g: {
            var T = e, k = T._payload, w = T._init;
            try {
              return z(w(k));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var P = Object.assign, L = 0, U, ae, G, J, le, D, Ee;
    function pe() {
    }
    pe.__reactDisabledLog = !0;
    function Ue() {
      {
        if (L === 0) {
          U = console.log, ae = console.info, G = console.warn, J = console.error, le = console.group, D = console.groupCollapsed, Ee = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: pe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        L++;
      }
    }
    function Ae() {
      {
        if (L--, L === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: P({}, e, {
              value: U
            }),
            info: P({}, e, {
              value: ae
            }),
            warn: P({}, e, {
              value: G
            }),
            error: P({}, e, {
              value: J
            }),
            group: P({}, e, {
              value: le
            }),
            groupCollapsed: P({}, e, {
              value: D
            }),
            groupEnd: P({}, e, {
              value: Ee
            })
          });
        }
        L < 0 && R("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ee = E.ReactCurrentDispatcher, ke;
    function ve(e, i, u) {
      {
        if (ke === void 0)
          try {
            throw Error();
          } catch (T) {
            var m = T.stack.trim().match(/\n( *(at )?)/);
            ke = m && m[1] || "";
          }
        return `
` + ke + e;
      }
    }
    var _e = !1, ye;
    {
      var We = typeof WeakMap == "function" ? WeakMap : Map;
      ye = new We();
    }
    function Ie(e, i) {
      if (!e || _e)
        return "";
      {
        var u = ye.get(e);
        if (u !== void 0)
          return u;
      }
      var m;
      _e = !0;
      var T = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var k;
      k = ee.current, ee.current = null, Ue();
      try {
        if (i) {
          var w = function() {
            throw Error();
          };
          if (Object.defineProperty(w.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(w, []);
            } catch ($) {
              m = $;
            }
            Reflect.construct(e, [], w);
          } else {
            try {
              w.call();
            } catch ($) {
              m = $;
            }
            e.call(w.prototype);
          }
        } else {
          try {
            throw Error();
          } catch ($) {
            m = $;
          }
          e();
        }
      } catch ($) {
        if ($ && m && typeof $.stack == "string") {
          for (var x = $.stack.split(`
`), V = m.stack.split(`
`), O = x.length - 1, M = V.length - 1; O >= 1 && M >= 0 && x[O] !== V[M]; )
            M--;
          for (; O >= 1 && M >= 0; O--, M--)
            if (x[O] !== V[M]) {
              if (O !== 1 || M !== 1)
                do
                  if (O--, M--, M < 0 || x[O] !== V[M]) {
                    var q = `
` + x[O].replace(" at new ", " at ");
                    return e.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", e.displayName)), typeof e == "function" && ye.set(e, q), q;
                  }
                while (O >= 1 && M >= 0);
              break;
            }
        }
      } finally {
        _e = !1, ee.current = k, Ae(), Error.prepareStackTrace = T;
      }
      var Se = e ? e.displayName || e.name : "", ge = Se ? ve(Se) : "";
      return typeof e == "function" && ye.set(e, ge), ge;
    }
    function ze(e, i, u) {
      return Ie(e, !1);
    }
    function S(e) {
      var i = e.prototype;
      return !!(i && i.isReactComponent);
    }
    function K(e, i, u) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ie(e, S(e));
      if (typeof e == "string")
        return ve(e);
      switch (e) {
        case f:
          return ve("Suspense");
        case p:
          return ve("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case d:
            return ze(e.render);
          case h:
            return K(e.type, i, u);
          case g: {
            var m = e, T = m._payload, k = m._init;
            try {
              return K(k(T), i, u);
            } catch {
            }
          }
        }
      return "";
    }
    var I = Object.prototype.hasOwnProperty, H = {}, Y = E.ReactDebugCurrentFrame;
    function re(e) {
      if (e) {
        var i = e._owner, u = K(e.type, e._source, i ? i.type : null);
        Y.setExtraStackFrame(u);
      } else
        Y.setExtraStackFrame(null);
    }
    function xe(e, i, u, m, T) {
      {
        var k = Function.call.bind(I);
        for (var w in e)
          if (k(e, w)) {
            var x = void 0;
            try {
              if (typeof e[w] != "function") {
                var V = Error((m || "React class") + ": " + u + " type `" + w + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[w] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw V.name = "Invariant Violation", V;
              }
              x = e[w](i, w, m, u, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (O) {
              x = O;
            }
            x && !(x instanceof Error) && (re(T), R("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", u, w, typeof x), re(null)), x instanceof Error && !(x.message in H) && (H[x.message] = !0, re(T), R("Failed %s type: %s", u, x.message), re(null));
          }
      }
    }
    var he = Array.isArray;
    function we(e) {
      return he(e);
    }
    function je(e) {
      {
        var i = typeof Symbol == "function" && Symbol.toStringTag, u = i && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return u;
      }
    }
    function Le(e) {
      try {
        return Ze(e), !1;
      } catch {
        return !0;
      }
    }
    function Ze(e) {
      return "" + e;
    }
    function Qe(e) {
      if (Le(e))
        return R("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", je(e)), Ze(e);
    }
    var er = E.ReactCurrentOwner, Ir = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, rr, tr;
    function jr(e) {
      if (I.call(e, "ref")) {
        var i = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Pr(e) {
      if (I.call(e, "key")) {
        var i = Object.getOwnPropertyDescriptor(e, "key").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Or(e, i) {
      typeof e.ref == "string" && er.current;
    }
    function Nr(e, i) {
      {
        var u = function() {
          rr || (rr = !0, R("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        u.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: u,
          configurable: !0
        });
      }
    }
    function Mr(e, i) {
      {
        var u = function() {
          tr || (tr = !0, R("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        u.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: u,
          configurable: !0
        });
      }
    }
    var Fr = function(e, i, u, m, T, k, w) {
      var x = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: e,
        key: i,
        ref: u,
        props: w,
        // Record the component responsible for creating this element.
        _owner: k
      };
      return x._store = {}, Object.defineProperty(x._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(x, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: m
      }), Object.defineProperty(x, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: T
      }), Object.freeze && (Object.freeze(x.props), Object.freeze(x)), x;
    };
    function Ur(e, i, u, m, T) {
      {
        var k, w = {}, x = null, V = null;
        u !== void 0 && (Qe(u), x = "" + u), Pr(i) && (Qe(i.key), x = "" + i.key), jr(i) && (V = i.ref, Or(i, T));
        for (k in i)
          I.call(i, k) && !Ir.hasOwnProperty(k) && (w[k] = i[k]);
        if (e && e.defaultProps) {
          var O = e.defaultProps;
          for (k in O)
            w[k] === void 0 && (w[k] = O[k]);
        }
        if (x || V) {
          var M = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          x && Nr(w, M), V && Mr(w, M);
        }
        return Fr(e, x, V, T, m, er.current, w);
      }
    }
    var $e = E.ReactCurrentOwner, or = E.ReactDebugCurrentFrame;
    function Re(e) {
      if (e) {
        var i = e._owner, u = K(e.type, e._source, i ? i.type : null);
        or.setExtraStackFrame(u);
      } else
        or.setExtraStackFrame(null);
    }
    var Be;
    Be = !1;
    function Ge(e) {
      return typeof e == "object" && e !== null && e.$$typeof === t;
    }
    function nr() {
      {
        if ($e.current) {
          var e = z($e.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function zr(e) {
      return "";
    }
    var ir = {};
    function Lr(e) {
      {
        var i = nr();
        if (!i) {
          var u = typeof e == "string" ? e : e.displayName || e.name;
          u && (i = `

Check the top-level render call using <` + u + ">.");
        }
        return i;
      }
    }
    function sr(e, i) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var u = Lr(i);
        if (ir[u])
          return;
        ir[u] = !0;
        var m = "";
        e && e._owner && e._owner !== $e.current && (m = " It was passed a child from " + z(e._owner.type) + "."), Re(e), R('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', u, m), Re(null);
      }
    }
    function ar(e, i) {
      {
        if (typeof e != "object")
          return;
        if (we(e))
          for (var u = 0; u < e.length; u++) {
            var m = e[u];
            Ge(m) && sr(m, i);
          }
        else if (Ge(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var T = y(e);
          if (typeof T == "function" && T !== e.entries)
            for (var k = T.call(e), w; !(w = k.next()).done; )
              Ge(w.value) && sr(w.value, i);
        }
      }
    }
    function Dr(e) {
      {
        var i = e.type;
        if (i == null || typeof i == "string")
          return;
        var u;
        if (typeof i == "function")
          u = i.propTypes;
        else if (typeof i == "object" && (i.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        i.$$typeof === h))
          u = i.propTypes;
        else
          return;
        if (u) {
          var m = z(i);
          xe(u, e.props, "prop", m, e);
        } else if (i.PropTypes !== void 0 && !Be) {
          Be = !0;
          var T = z(i);
          R("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", T || "Unknown");
        }
        typeof i.getDefaultProps == "function" && !i.getDefaultProps.isReactClassApproved && R("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Vr(e) {
      {
        for (var i = Object.keys(e.props), u = 0; u < i.length; u++) {
          var m = i[u];
          if (m !== "children" && m !== "key") {
            Re(e), R("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), Re(null);
            break;
          }
        }
        e.ref !== null && (Re(e), R("Invalid attribute `ref` supplied to `React.Fragment`."), Re(null));
      }
    }
    var lr = {};
    function cr(e, i, u, m, T, k) {
      {
        var w = se(e);
        if (!w) {
          var x = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (x += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var V = zr();
          V ? x += V : x += nr();
          var O;
          e === null ? O = "null" : we(e) ? O = "array" : e !== void 0 && e.$$typeof === t ? (O = "<" + (z(e.type) || "Unknown") + " />", x = " Did you accidentally export a JSX literal instead of a component?") : O = typeof e, R("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, x);
        }
        var M = Ur(e, i, u, T, k);
        if (M == null)
          return M;
        if (w) {
          var q = i.children;
          if (q !== void 0)
            if (m)
              if (we(q)) {
                for (var Se = 0; Se < q.length; Se++)
                  ar(q[Se], e);
                Object.freeze && Object.freeze(q);
              } else
                R("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ar(q, e);
        }
        if (I.call(i, "key")) {
          var ge = z(e), $ = Object.keys(i).filter(function(qr) {
            return qr !== "key";
          }), Ye = $.length > 0 ? "{key: someKey, " + $.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!lr[ge + Ye]) {
            var Yr = $.length > 0 ? "{" + $.join(": ..., ") + ": ...}" : "{}";
            R(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ye, ge, Yr, ge), lr[ge + Ye] = !0;
          }
        }
        return e === n ? Vr(M) : Dr(M), M;
      }
    }
    function Wr(e, i, u) {
      return cr(e, i, u, !0);
    }
    function $r(e, i, u) {
      return cr(e, i, u, !1);
    }
    var Br = $r, Gr = Wr;
    Oe.Fragment = n, Oe.jsx = Br, Oe.jsxs = Gr;
  }()), Oe;
}
var fr;
function it() {
  return fr || (fr = 1, process.env.NODE_ENV === "production" ? Ve.exports = ot() : Ve.exports = nt()), Ve.exports;
}
var _ = it();
function Rr(r) {
  var t, o, n = "";
  if (typeof r == "string" || typeof r == "number") n += r;
  else if (typeof r == "object") if (Array.isArray(r)) {
    var c = r.length;
    for (t = 0; t < c; t++) r[t] && (o = Rr(r[t])) && (n && (n += " "), n += o);
  } else for (o in r) r[o] && (n && (n += " "), n += o);
  return n;
}
function Sr() {
  for (var r, t, o = 0, n = "", c = arguments.length; o < c; o++) (r = arguments[o]) && (t = Rr(r)) && (n && (n += " "), n += t);
  return n;
}
const pr = (r) => typeof r == "boolean" ? `${r}` : r === 0 ? "0" : r, hr = Sr, st = (r, t) => (o) => {
  var n;
  if ((t == null ? void 0 : t.variants) == null) return hr(r, o == null ? void 0 : o.class, o == null ? void 0 : o.className);
  const { variants: c, defaultVariants: s } = t, a = Object.keys(c).map((f) => {
    const p = o == null ? void 0 : o[f], h = s == null ? void 0 : s[f];
    if (p === null) return null;
    const g = pr(p) || pr(h);
    return c[f][g];
  }), l = o && Object.entries(o).reduce((f, p) => {
    let [h, g] = p;
    return g === void 0 || (f[h] = g), f;
  }, {}), d = t == null || (n = t.compoundVariants) === null || n === void 0 ? void 0 : n.reduce((f, p) => {
    let { class: h, className: g, ...A } = p;
    return Object.entries(A).every((F) => {
      let [b, y] = F;
      return Array.isArray(y) ? y.includes({
        ...s,
        ...l
      }[b]) : {
        ...s,
        ...l
      }[b] === y;
    }) ? [
      ...f,
      h,
      g
    ] : f;
  }, []);
  return hr(r, a, d, o == null ? void 0 : o.class, o == null ? void 0 : o.className);
}, He = "-", at = (r) => {
  const t = ct(r), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: n
  } = r;
  return {
    getClassGroupId: (a) => {
      const l = a.split(He);
      return l[0] === "" && l.length !== 1 && l.shift(), Cr(l, t) || lt(a);
    },
    getConflictingClassGroupIds: (a, l) => {
      const d = o[a] || [];
      return l && n[a] ? [...d, ...n[a]] : d;
    }
  };
}, Cr = (r, t) => {
  var a;
  if (r.length === 0)
    return t.classGroupId;
  const o = r[0], n = t.nextPart.get(o), c = n ? Cr(r.slice(1), n) : void 0;
  if (c)
    return c;
  if (t.validators.length === 0)
    return;
  const s = r.join(He);
  return (a = t.validators.find(({
    validator: l
  }) => l(s))) == null ? void 0 : a.classGroupId;
}, gr = /^\[(.+)\]$/, lt = (r) => {
  if (gr.test(r)) {
    const t = gr.exec(r)[1], o = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, ct = (r) => {
  const {
    theme: t,
    prefix: o
  } = r, n = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return dt(Object.entries(r.classGroups), o).forEach(([s, a]) => {
    Ke(a, n, s, t);
  }), n;
}, Ke = (r, t, o, n) => {
  r.forEach((c) => {
    if (typeof c == "string") {
      const s = c === "" ? t : mr(t, c);
      s.classGroupId = o;
      return;
    }
    if (typeof c == "function") {
      if (ut(c)) {
        Ke(c(n), t, o, n);
        return;
      }
      t.validators.push({
        validator: c,
        classGroupId: o
      });
      return;
    }
    Object.entries(c).forEach(([s, a]) => {
      Ke(a, mr(t, s), o, n);
    });
  });
}, mr = (r, t) => {
  let o = r;
  return t.split(He).forEach((n) => {
    o.nextPart.has(n) || o.nextPart.set(n, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(n);
  }), o;
}, ut = (r) => r.isThemeGetter, dt = (r, t) => t ? r.map(([o, n]) => {
  const c = n.map((s) => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, l]) => [t + a, l])) : s);
  return [o, c];
}) : r, ft = (r) => {
  if (r < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  const c = (s, a) => {
    o.set(s, a), t++, t > r && (t = 0, n = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let a = o.get(s);
      if (a !== void 0)
        return a;
      if ((a = n.get(s)) !== void 0)
        return c(s, a), a;
    },
    set(s, a) {
      o.has(s) ? o.set(s, a) : c(s, a);
    }
  };
}, Tr = "!", pt = (r) => {
  const {
    separator: t,
    experimentalParseClassName: o
  } = r, n = t.length === 1, c = t[0], s = t.length, a = (l) => {
    const d = [];
    let f = 0, p = 0, h;
    for (let y = 0; y < l.length; y++) {
      let E = l[y];
      if (f === 0) {
        if (E === c && (n || l.slice(y, y + s) === t)) {
          d.push(l.slice(p, y)), p = y + s;
          continue;
        }
        if (E === "/") {
          h = y;
          continue;
        }
      }
      E === "[" ? f++ : E === "]" && f--;
    }
    const g = d.length === 0 ? l : l.substring(p), A = g.startsWith(Tr), F = A ? g.substring(1) : g, b = h && h > p ? h - p : void 0;
    return {
      modifiers: d,
      hasImportantModifier: A,
      baseClassName: F,
      maybePostfixModifierPosition: b
    };
  };
  return o ? (l) => o({
    className: l,
    parseClassName: a
  }) : a;
}, ht = (r) => {
  if (r.length <= 1)
    return r;
  const t = [];
  let o = [];
  return r.forEach((n) => {
    n[0] === "[" ? (t.push(...o.sort(), n), o = []) : o.push(n);
  }), t.push(...o.sort()), t;
}, gt = (r) => ({
  cache: ft(r.cacheSize),
  parseClassName: pt(r),
  ...at(r)
}), mt = /\s+/, bt = (r, t) => {
  const {
    parseClassName: o,
    getClassGroupId: n,
    getConflictingClassGroupIds: c
  } = t, s = [], a = r.trim().split(mt);
  let l = "";
  for (let d = a.length - 1; d >= 0; d -= 1) {
    const f = a[d], {
      modifiers: p,
      hasImportantModifier: h,
      baseClassName: g,
      maybePostfixModifierPosition: A
    } = o(f);
    let F = !!A, b = n(F ? g.substring(0, A) : g);
    if (!b) {
      if (!F) {
        l = f + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (b = n(g), !b) {
        l = f + (l.length > 0 ? " " + l : l);
        continue;
      }
      F = !1;
    }
    const y = ht(p).join(":"), E = h ? y + Tr : y, R = E + b;
    if (s.includes(R))
      continue;
    s.push(R);
    const B = c(b, F);
    for (let W = 0; W < B.length; ++W) {
      const ne = B[W];
      s.push(E + ne);
    }
    l = f + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function vt() {
  let r = 0, t, o, n = "";
  for (; r < arguments.length; )
    (t = arguments[r++]) && (o = Er(t)) && (n && (n += " "), n += o);
  return n;
}
const Er = (r) => {
  if (typeof r == "string")
    return r;
  let t, o = "";
  for (let n = 0; n < r.length; n++)
    r[n] && (t = Er(r[n])) && (o && (o += " "), o += t);
  return o;
};
function yt(r, ...t) {
  let o, n, c, s = a;
  function a(d) {
    const f = t.reduce((p, h) => h(p), r());
    return o = gt(f), n = o.cache.get, c = o.cache.set, s = l, l(d);
  }
  function l(d) {
    const f = n(d);
    if (f)
      return f;
    const p = bt(d, o);
    return c(d, p), p;
  }
  return function() {
    return s(vt.apply(null, arguments));
  };
}
const j = (r) => {
  const t = (o) => o[r] || [];
  return t.isThemeGetter = !0, t;
}, Ar = /^\[(?:([a-z-]+):)?(.+)\]$/i, xt = /^\d+\/\d+$/, wt = /* @__PURE__ */ new Set(["px", "full", "screen"]), Rt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, St = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ct = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Tt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Et = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, te = (r) => Ce(r) || wt.has(r) || xt.test(r), ce = (r) => Te(r, "length", Nt), Ce = (r) => !!r && !Number.isNaN(Number(r)), qe = (r) => Te(r, "number", Ce), Ne = (r) => !!r && Number.isInteger(Number(r)), At = (r) => r.endsWith("%") && Ce(r.slice(0, -1)), v = (r) => Ar.test(r), ue = (r) => Rt.test(r), kt = /* @__PURE__ */ new Set(["length", "size", "percentage"]), _t = (r) => Te(r, kt, kr), It = (r) => Te(r, "position", kr), jt = /* @__PURE__ */ new Set(["image", "url"]), Pt = (r) => Te(r, jt, Ft), Ot = (r) => Te(r, "", Mt), Me = () => !0, Te = (r, t, o) => {
  const n = Ar.exec(r);
  return n ? n[1] ? typeof t == "string" ? n[1] === t : t.has(n[1]) : o(n[2]) : !1;
}, Nt = (r) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  St.test(r) && !Ct.test(r)
), kr = () => !1, Mt = (r) => Tt.test(r), Ft = (r) => Et.test(r), Ut = () => {
  const r = j("colors"), t = j("spacing"), o = j("blur"), n = j("brightness"), c = j("borderColor"), s = j("borderRadius"), a = j("borderSpacing"), l = j("borderWidth"), d = j("contrast"), f = j("grayscale"), p = j("hueRotate"), h = j("invert"), g = j("gap"), A = j("gradientColorStops"), F = j("gradientColorStopPositions"), b = j("inset"), y = j("margin"), E = j("opacity"), R = j("padding"), B = j("saturate"), W = j("scale"), ne = j("sepia"), fe = j("skew"), ie = j("space"), Z = j("translate"), Q = () => ["auto", "contain", "none"], se = () => ["auto", "hidden", "clip", "visible", "scroll"], X = () => ["auto", v, t], C = () => [v, t], z = () => ["", te, ce], P = () => ["auto", Ce, v], L = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], U = () => ["solid", "dashed", "dotted", "double", "none"], ae = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], G = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], J = () => ["", "0", v], le = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], D = () => [Ce, v];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Me],
      spacing: [te, ce],
      blur: ["none", "", ue, v],
      brightness: D(),
      borderColor: [r],
      borderRadius: ["none", "", "full", ue, v],
      borderSpacing: C(),
      borderWidth: z(),
      contrast: D(),
      grayscale: J(),
      hueRotate: D(),
      invert: J(),
      gap: C(),
      gradientColorStops: [r],
      gradientColorStopPositions: [At, ce],
      inset: X(),
      margin: X(),
      opacity: D(),
      padding: C(),
      saturate: D(),
      scale: D(),
      sepia: J(),
      skew: D(),
      space: C(),
      translate: C()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", v]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ue]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": le()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": le()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...L(), v]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: se()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": se()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": se()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: Q()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Q()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Q()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [b]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [b]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [b]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [b]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [b]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [b]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [b]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [b]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [b]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", Ne, v]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: X()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", v]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: J()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: J()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Ne, v]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Me]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Ne, v]
        }, v]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": P()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": P()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Me]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Ne, v]
        }, v]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": P()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": P()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", v]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", v]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [g]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [g]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [g]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...G()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...G(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...G(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [R]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [R]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [R]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [R]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [R]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [R]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [R]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [R]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [R]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [y]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [y]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [y]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [y]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [y]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [y]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [y]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [y]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [y]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [ie]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [ie]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", v, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [v, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [v, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [ue]
        }, ue]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [v, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [v, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [v, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [v, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", ue, ce]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", qe]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Me]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", v]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Ce, qe]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", te, v]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", v]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", v]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [r]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [E]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [r]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [E]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...U(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", te, ce]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", te, v]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [r]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: C()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", v]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", v]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [E]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...L(), It]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", _t]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Pt]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [r]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [F]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [F]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [F]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [A]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [A]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [A]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [s]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [s]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [s]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [s]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [s]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [s]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [s]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [s]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [s]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [s]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [s]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [s]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [s]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [s]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [s]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [l]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [l]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [l]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [l]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [l]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [l]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [l]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [l]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [l]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [E]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...U(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [l]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [l]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [E]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: U()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [c]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [c]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [c]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [c]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [c]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [c]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [c]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [c]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [c]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [c]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...U()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [te, v]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [te, ce]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [r]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: z()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [r]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [E]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [te, ce]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [r]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", ue, Ot]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Me]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [E]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ae(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ae()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [o]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [n]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [d]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", ue, v]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [f]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [p]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [h]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [B]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [ne]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [o]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [n]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [d]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [f]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [p]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [h]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [E]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [B]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [ne]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [a]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [a]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [a]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", v]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: D()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", v]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: D()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", v]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [W]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [W]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [W]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Ne, v]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [Z]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [Z]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [fe]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [fe]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", v]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", r]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", v]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [r]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": C()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": C()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": C()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": C()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": C()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": C()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": C()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": C()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": C()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": C()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": C()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": C()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": C()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": C()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": C()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": C()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": C()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": C()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", v]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [r, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [te, ce, qe]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [r, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, zt = /* @__PURE__ */ yt(Ut);
function de(...r) {
  return zt(Sr(r));
}
const Lt = st(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Xe = xr.forwardRef(
  ({ className: r, variant: t, size: o, asChild: n = !1, ...c }, s) => {
    const a = n ? Xr : "button";
    return /* @__PURE__ */ _.jsx(
      a,
      {
        className: de(Lt({ variant: t, size: o, className: r })),
        ref: s,
        ...c
      }
    );
  }
);
Xe.displayName = "Button";
const _r = xr.forwardRef(
  ({ className: r, ...t }, o) => /* @__PURE__ */ _.jsx(
    "textarea",
    {
      className: de(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        r
      ),
      ref: o,
      ...t
    }
  )
);
_r.displayName = "Textarea";
const Dt = ({
  initialText: r,
  onTextChange: t,
  onEditing: o,
  isEditing: n,
  placeholder: c = "Type here...",
  className: s,
  // For the root div
  textDisplayClassName: a
  // For the Textarea
}) => {
  const [l, d] = oe(r), f = (p) => {
    const h = p.target.value;
    d(h), t(h), n || o();
  };
  return be(() => {
    n || d(r);
  }, [r, n]), /* @__PURE__ */ _.jsx("div", { className: de("flex flex-col space-y-2", s), children: /* @__PURE__ */ _.jsx(
    _r,
    {
      value: l,
      onChange: f,
      placeholder: c,
      className: de(
        "w-full min-h-[60px] text-lg",
        // Default text size changed to text-lg
        a
        // Apply custom classes for the textarea
      ),
      rows: 3
    }
  ) });
}, br = ({
  audioData: r,
  color: t = "#3b82f6",
  // Default blue-500
  className: o,
  backgroundColor: n = "transparent"
  // Default transparent
}) => {
  const c = Fe(null);
  return be(() => {
    const s = c.current;
    if (!s) return;
    const a = s.getContext("2d");
    if (!a) return;
    const { width: l, height: d } = s;
    if (a.clearRect(0, 0, l, d), a.fillStyle = n, a.fillRect(0, 0, l, d), !r || r.length === 0) {
      a.beginPath(), a.moveTo(0, d / 2), a.lineTo(l, d / 2), a.strokeStyle = t, a.lineWidth = 1, a.stroke();
      return;
    }
    a.lineWidth = 2, a.strokeStyle = t, a.beginPath();
    const f = l * 1 / r.length;
    let p = 0;
    for (let h = 0; h < r.length; h++) {
      const A = r[h] / 128 * d / 2;
      h === 0 ? a.moveTo(p, A) : a.lineTo(p, A), p += f;
    }
    a.lineTo(l, d / 2), a.stroke();
  }, [r, t, n]), /* @__PURE__ */ _.jsx(
    "canvas",
    {
      ref: c,
      className: de("w-full h-16 rounded-md", o),
      width: 300,
      height: 64
    }
  );
}, Vt = 3e3, Wt = 5e3;
class $t {
  constructor(t) {
    N(this, "mediaRecorder", null);
    N(this, "audioChunks", []);
    N(this, "speechRecognition", null);
    N(this, "audioContext", null);
    N(this, "analyserNode", null);
    N(this, "sourceNode", null);
    N(this, "dataArray", null);
    N(this, "animationFrameId", null);
    N(this, "drawWaveformCallCount", 0);
    N(this, "silenceTimeoutId", null);
    N(this, "initialSpeechTimeoutId", null);
    N(this, "hasDetectedSpeech", !1);
    N(this, "isManuallyStopping", !1);
    N(this, "stopReason", null);
    N(this, "recognitionServiceTrulyActive", !1);
    N(this, "options");
    N(this, "finalText", "");
    N(this, "interimText", "");
    N(this, "drawWaveform", () => {
      this.drawWaveformCallCount++, this.drawWaveformCallCount % 30, this.analyserNode && this.dataArray && this.mediaRecorder && this.mediaRecorder.state === "recording" ? (this.drawWaveformCallCount % 60, this.analyserNode.getByteTimeDomainData(this.dataArray), this.options.onAudioData(new Uint8Array(this.dataArray)), this.animationFrameId = requestAnimationFrame(this.drawWaveform)) : (this.drawWaveformCallCount === 1 || this.drawWaveformCallCount % 60, this.animationFrameId && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null));
    });
    N(this, "cleanupAudioProcessing", () => {
      if (this.animationFrameId && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null), this.audioContext && this.audioContext.state !== "closed" && this.sourceNode)
        try {
          this.sourceNode.disconnect();
        } catch {
        }
      this.sourceNode = null, this.analyserNode = null, this.audioContext && this.audioContext.state !== "closed" && this.audioContext.close().catch((t) => {
      }), this.audioContext = null, this.dataArray = null;
    });
    this.options = {
      ...t,
      silenceTimeout: t.silenceTimeout ?? Vt,
      initialSpeechTimeout: t.initialSpeechTimeout ?? Wt,
      continuous: t.continuous ?? !0,
      interimResults: t.interimResults ?? !0
    }, this.initializeSpeechRecognition();
  }
  initializeSpeechRecognition() {
    const t = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!t) {
      console.warn("ESR: Speech Recognition API not supported.");
      return;
    }
    try {
      this.speechRecognition = new t(), this.speechRecognition.continuous = this.options.continuous, this.speechRecognition.interimResults = this.options.interimResults, this.speechRecognition.lang = navigator.language || "en-US", this.speechRecognition.onresult = (o) => {
        this.clearInitialSpeechTimer(), this.hasDetectedSpeech = !0, this.resetSilenceTimer();
        let n = "", c = "";
        for (let s = o.resultIndex; s < o.results.length; ++s) {
          const a = o.results[s][0].transcript;
          o.results[s].isFinal ? c += a : n += a;
        }
        c && (this.finalText = c.trim(), this.options.onFinalTranscript(this.finalText)), n && (this.interimText = n.trim(), this.options.onInterimTranscript(this.interimText));
      }, this.speechRecognition.onerror = (o) => {
        const n = this.recognitionServiceTrulyActive;
        this.recognitionServiceTrulyActive = !1;
        let c = o.error || "Unknown speech error.";
        o.error === "no-speech" ? (c = "No speech detected.", this.stopReason = "initial_timeout") : o.error === "not-allowed" && (c = "Microphone access denied."), o.error === "aborted" && (this.isManuallyStopping || this.stopReason === "dispose") || n && this.options.onError(c), this.stopRecordingInternal(this.stopReason || "error");
      }, this.speechRecognition.onstart = () => {
        this.stopReason !== "dispose" && (this.recognitionServiceTrulyActive = !0, this.options.onRecordingStart(), this.startInitialSpeechTimer());
      }, this.speechRecognition.onend = () => {
        var o;
        this.recognitionServiceTrulyActive = !1, this.stopReason !== "dispose" && ((o = this.mediaRecorder) == null ? void 0 : o.state) === "recording" && this.stopRecordingInternal(this.stopReason || "manual");
      }, this.speechRecognition.onspeechend = () => {
        this.resetSilenceTimer();
      };
    } catch (o) {
      this.speechRecognition = null, console.error("ESR: Init SR failed", o);
    }
  }
  startInitialSpeechTimer() {
    this.clearInitialSpeechTimer(), this.hasDetectedSpeech = !1;
    const t = this.options.initialSpeechTimeout;
    typeof t != "number" || t <= 0 || (this.initialSpeechTimeoutId = setTimeout(() => {
      !this.hasDetectedSpeech && this.recognitionServiceTrulyActive && (this.options.onError("No speech detected."), this.stopReason = "initial_timeout", this.stopRecordingInternal("initial_timeout"));
    }, t));
  }
  clearInitialSpeechTimer() {
    this.initialSpeechTimeoutId && clearTimeout(this.initialSpeechTimeoutId), this.initialSpeechTimeoutId = null;
  }
  resetSilenceTimer() {
    if (this.clearSilenceTimer(), this.recognitionServiceTrulyActive) {
      const t = this.options.silenceTimeout;
      if (typeof t != "number" || t <= 0) return;
      this.silenceTimeoutId = setTimeout(() => {
        this.recognitionServiceTrulyActive && (!this.finalText && !this.interimText ? (this.finalText && this.options.onFinalTranscript(this.finalText), this.interimText && this.options.onInterimTranscript(this.interimText), this.stopRecordingInternal("manual")) : (this.stopReason = "silence", this.stopRecordingInternal("silence")));
      }, t);
    }
  }
  clearSilenceTimer() {
    this.silenceTimeoutId && clearTimeout(this.silenceTimeoutId), this.silenceTimeoutId = null;
  }
  setupMediaRecorder(t) {
    this.drawWaveformCallCount = 0;
    try {
      this.mediaRecorder = new MediaRecorder(t), this.audioChunks = [], this.mediaRecorder.ondataavailable = (o) => {
        o.data.size > 0 && this.audioChunks.push(o.data);
      }, this.mediaRecorder.onstop = () => {
        var c;
        const o = this.audioChunks.length > 0 ? new Blob(this.audioChunks, { type: (c = this.audioChunks[0]) == null ? void 0 : c.type }) : null, n = o ? URL.createObjectURL(o) : null;
        this.options.onRecordingStop(o, n), this.cleanupAudioProcessing(), this.audioChunks = [];
      }, this.mediaRecorder.onerror = (o) => {
        this.options.onError("MediaRecorder error."), this.stopRecordingInternal("error");
      }, this.mediaRecorder.start(), console.log(`ESR: MediaRecorder started in setup. State: ${this.mediaRecorder.state}`);
    } catch (o) {
      console.error("ESR: Error setting up MediaRecorder:", o), this.options.onError("Failed to set up audio recording component.");
      return;
    }
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)(), this.analyserNode = this.audioContext.createAnalyser(), this.analyserNode.fftSize = 2048, this.dataArray = new Uint8Array(this.analyserNode.frequencyBinCount), this.sourceNode = this.audioContext.createMediaStreamSource(t), this.sourceNode.connect(this.analyserNode), console.log("ESR: Web Audio API setup for waveform. Initial drawWaveform call."), this.drawWaveform();
    } catch (o) {
      console.error("ESR: Error setting up Web Audio API for waveform:", o);
    }
  }
  async startRecording() {
    if (!this.speechRecognition) {
      this.options.onError("SR not init.");
      return;
    }
    if (!(this.recognitionServiceTrulyActive || this.mediaRecorder && this.mediaRecorder.state === "recording")) {
      this.isManuallyStopping = !1, this.stopReason = null, this.hasDetectedSpeech = !1;
      try {
        const t = await navigator.mediaDevices.getUserMedia({ audio: !0 });
        if (this.setupMediaRecorder(t), !this.mediaRecorder || this.mediaRecorder.state !== "recording") {
          console.error("ESR: MediaRecorder did not start correctly in setup."), t.getTracks().forEach((o) => o.stop());
          return;
        }
        this.speechRecognition.start();
      } catch (t) {
        console.error("ESR: Error in startRecording sequence:", t), this.recognitionServiceTrulyActive = !1;
        let o = "Error starting recording.";
        t instanceof Error && (t.name === "NotAllowedError" ? o = "Microphone access denied." : t.name === "NotFoundError" && (o = "No microphone found.")), this.options.onError(o), this.cleanupAudioProcessing();
      }
    }
  }
  stopRecording(t = "manual") {
    this.stopReason !== "dispose" && (!this.recognitionServiceTrulyActive && (!this.mediaRecorder || this.mediaRecorder.state === "inactive") || (this.isManuallyStopping = !0, this.stopReason = t, this.stopRecordingInternal(t)));
  }
  stopRecordingInternal(t) {
    if (this.clearInitialSpeechTimer(), this.clearSilenceTimer(), this.speechRecognition && (this.recognitionServiceTrulyActive || t === "dispose"))
      try {
        this.speechRecognition.stop();
      } catch {
        this.recognitionServiceTrulyActive = !1;
      }
    this.mediaRecorder && (this.mediaRecorder.state === "recording" ? this.mediaRecorder.stop() : t !== "dispose" && this.cleanupAudioProcessing()), t === "dispose" && this.cleanupAudioProcessing();
  }
  dispose() {
    if (this.stopReason = "dispose", this.isManuallyStopping = !0, this.clearInitialSpeechTimer(), this.clearSilenceTimer(), this.speechRecognition)
      try {
        this.speechRecognition.stop();
      } catch {
      }
    this.recognitionServiceTrulyActive = !1, this.mediaRecorder, this.cleanupAudioProcessing(), this.audioChunks = [], this.speechRecognition = null, this.mediaRecorder = null;
  }
}
async function Bt(r) {
  try {
    const t = await r.arrayBuffer(), o = new (window.AudioContext || window.webkitAudioContext)(), n = await o.decodeAudioData(t);
    return await o.close(), { audioBuffer: n, duration: n.duration };
  } catch (t) {
    return console.error("Error decoding audio blob:", t), null;
  }
}
function Gt(r, t = 0.5, o = 0.01, n = 0.05) {
  const { sampleRate: c, length: s } = r;
  if (s === 0) return 0;
  const a = Math.floor(c * n), l = Math.ceil(t / n), d = r.getChannelData(0);
  let f = Math.floor(s / a) - 1, p = 0;
  for (let g = Math.floor(s / a) - 1; g >= 0; g--) {
    const A = g * a, F = Math.min(A + a, s);
    let b = 0;
    for (let y = A; y < F; y++) {
      const E = Math.abs(d[y]);
      E > b && (b = E);
    }
    if (b < o)
      g === Math.floor(s / a) - 1 - p && p++;
    else {
      f = g;
      break;
    }
  }
  let h = (f + 1) * a / c;
  if (h = Math.min(h, r.duration), console.log(`AudioUtils: Initial lastSoundTime: ${h.toFixed(2)}s. Consecutive silent chunks at end: ${p}`), p >= l) {
    const g = s / c - p * n;
    return console.log(`AudioUtils: Sufficient trailing silence detected. Sound considered to end at: ${g.toFixed(2)}s`), g;
  } else
    return console.log(`AudioUtils: Not enough trailing silence (found ${p * n}s, need ${t}s). Returning original duration or end of last detected sound.`), r.duration;
}
function Yt(r, t) {
  const { sampleRate: o, numberOfChannels: n, length: c } = r, s = Math.max(0.01, t), a = Math.floor(s * o);
  if (a <= 0 || a > c)
    return console.error("AudioUtils: Invalid new duration for trimming.", s, "Original:", r.duration, "Attempted samples:", a, "Original samples:", c), r;
  if (Math.abs(r.duration - s) < 0.01)
    return console.log("AudioUtils: Trim duration very close to original. Returning original buffer."), r;
  try {
    const l = new (window.AudioContext || window.webkitAudioContext)(), d = l.createBuffer(
      n,
      a,
      o
    );
    for (let f = 0; f < n; f++) {
      const p = r.getChannelData(f);
      d.getChannelData(f).set(p.subarray(0, a));
    }
    return l.close(), console.log(`AudioUtils: Trimmed AudioBuffer from ${r.duration.toFixed(2)}s to ${d.duration.toFixed(2)}s`), d;
  } catch (l) {
    return console.error("AudioUtils: Error trimming AudioBuffer:", l), null;
  }
}
function qt(r) {
  const t = r.numberOfChannels, o = t, n = r.length * t * 2 + 44, c = new ArrayBuffer(n), s = new DataView(c), a = [];
  let l = 0, d = 0, f = 0;
  function p(g) {
    s.setUint16(f, g, !0), f += 2;
  }
  function h(g) {
    s.setUint32(f, g, !0), f += 4;
  }
  for (h(1179011410), h(n - 8), h(1163280727), h(544501094), h(16), p(1), p(o), h(r.sampleRate), h(r.sampleRate * 2 * o), p(o * 2), p(16), h(1635017060), h(n - f - 4), l = 0; l < o; l++)
    a.push(r.getChannelData(l));
  for (let g = 0; g < r.length; g++)
    for (let A = 0; A < t; A++)
      d = Math.max(-1, Math.min(1, a[A][g])), s.setInt16(f, d * 32767, !0), f += 2;
  return console.log("AudioUtils: Encoded AudioBuffer to WAV Blob."), new Blob([s], { type: "audio/wav" });
}
const Jt = "0.2.5", Kt = {
  version: Jt
}, vr = "stop recording", yr = 0.75, Xt = 3e3, Ht = 5e3, Je = (r) => r ? r.charAt(0).toUpperCase() + r.slice(1) : "", oo = ({
  onSave: r,
  initialText: t = "",
  autoStartRecording: o = !1,
  showWaveform: n = !0,
  showInterimTranscript: c = !0,
  customWaveformColor: s,
  placeholder: a = "Press Record button to start the dictation, or type here...",
  // Updated default placeholder
  disabled: l = !1,
  silenceTimeout: d = Xt,
  initialSpeechTimeout: f = Ht,
  showVersionInfo: p = !0,
  textDisplayClassName: h,
  interimTranscriptClassName: g,
  recordButtonClassName: A,
  className: F = "w-full max-w-2xl"
}) => {
  const [b, y] = oe("idle"), [E, R] = oe(""), [B, W] = oe(t), [ne, fe] = oe(null), [ie, Z] = oe(null), [Q, se] = oe(null), [X, C] = oe(null), [z, P] = oe(!1), L = Fe(null), U = Fe(""), ae = Fe(!1), G = Fe(b);
  be(() => {
    G.current = b;
  }, [b]);
  const J = me((S) => {
    const K = S.trim();
    if (!K) return;
    let I = U.current;
    if (!I)
      U.current = Je(K);
    else {
      const H = I.slice(-1), Y = [".", "!", "?"].includes(H), re = I.endsWith(" ");
      !Y && !re ? I += ". " : Y && !re && (I += " "), U.current = I + Je(K);
    }
    U.current = U.current.trim(), G.current === "recording" && (W(U.current), P(!1));
  }, []), le = me((S) => {
    c && R(Je(S.trim()));
  }, [c]), D = me(() => {
    console.log("VIC: handleRecordingStart triggered"), y("recording"), Z(null), R(""), U.current = "", se(null), C((S) => (S && URL.revokeObjectURL(S), null)), P(!1);
  }, []), Ee = me(async (S, K) => {
    console.log("VIC: handleRecordingStop triggered. Audio Blob exists:", !!S, "Audio URL:", K);
    let I = U.current.trim();
    I && ![".", "!", "?"].includes(I.slice(-1)) && (I += "."), y("idle"), R("");
    let H = S, Y = K;
    if (I.toLowerCase().endsWith(vr + ".") && S) {
      const re = vr + ".", xe = I.toLowerCase().lastIndexOf(re);
      if (xe === 0 || xe > 0 && I[xe - 1] === " ") {
        I = I.substring(0, xe).trim();
        const he = await Bt(S);
        if (he) {
          const we = Gt(he.audioBuffer, yr);
          if (we < he.duration - yr / 2) {
            const je = Yt(he.audioBuffer, we);
            if (je && je !== he.audioBuffer) {
              const Le = qt(je);
              Y && URL.revokeObjectURL(Y), H = Le, Y = URL.createObjectURL(Le);
            }
          }
        }
      }
    }
    W(I), se(H), C(Y), I || H ? (console.log("VIC: handleRecordingStop, calling onSave with:", { text: I, blob: !!H, url: Y }), r(I, H, Y)) : console.log("VIC: handleRecordingStop, NOT calling onSave (no text/audio)."), P(!1);
  }, [r]), pe = me((S) => {
    console.error("VIC: handleError triggered:", S), y("error"), Z(S), R(""), fe(null), De.error(S || "An unknown recording error occurred.", { duration: 5e3 }), U.current = "", P(!1);
  }, []), Ue = me((S) => {
    n && fe(new Uint8Array(S));
  }, [n]), Ae = me(async () => {
    if (console.log("VIC: startRecording called. Current state:", G.current, "Disabled:", l), !l) {
      if (!L.current) {
        De.error("Recorder not ready. Please try again."), console.error("VIC: startRecording - speechRecorderRef is null!");
        return;
      }
      if (G.current === "idle") {
        console.log("VIC: startRecording - starting recording."), Z(null), y("listening"), U.current = "";
        try {
          await L.current.startRecording(), console.log("VIC: startRecording - startRecording promise resolved.");
        } catch (S) {
          console.error("VIC: startRecording - error calling startRecording:", S), pe(S.message || "Failed to start recording."), y("idle");
        }
      }
    }
  }, [l, pe]);
  be(() => {
    console.log("VIC: Initializing EnhancedSpeechRecorder with timeouts:", { silenceTimeout: d, initialSpeechTimeout: f });
    const S = new $t({
      onFinalTranscript: J,
      onInterimTranscript: le,
      onRecordingStart: D,
      onRecordingStop: Ee,
      onError: pe,
      onAudioData: Ue,
      silenceTimeout: d,
      initialSpeechTimeout: f
    });
    return L.current = S, () => {
      console.log("VIC: Disposing EnhancedSpeechRecorder."), S.dispose(), L.current = null;
    };
  }, [J, le, D, Ee, pe, Ue, d, f]), be(() => {
    if (o && !l && !ae.current && L.current) {
      console.log("VIC: Auto-starting recording due to autoStartRecording prop"), ae.current = !0;
      const S = setTimeout(() => {
        Ae();
      }, 100);
      return () => clearTimeout(S);
    }
  }, [o, l, Ae]), be(() => {
    !ee && !z && B !== t && W(t);
  }, [t, B, z, b]);
  const ee = b === "recording" || b === "listening";
  be(() => {
    const S = X;
    return () => {
      S && URL.revokeObjectURL(S);
    };
  }, [X]);
  const ke = async () => {
    if (console.log("VIC: toggleRecording called. Current state:", G.current, "Disabled:", l), !l) {
      if (!L.current) {
        De.error("Recorder not ready. Please try again."), console.error("VIC: toggleRecording - speechRecorderRef is null!");
        return;
      }
      ee ? (console.log("VIC: toggleRecording - stopping recording."), L.current.stopRecording("manual")) : await Ae();
    }
  }, ve = (S) => {
    W(S), z || P(!0);
  }, _e = () => {
    console.log("VIC: handleManualSave, calling onSave with:", { text: B, blob: !!Q, url: X }), r(B, Q, X), De.success("Text saved manually!"), P(!1);
  }, ye = () => {
    console.log("VIC: handleRetryError called."), Z(null), y("idle"), P(!1);
  }, We = () => b === "error" ? /* @__PURE__ */ _.jsx(et, { className: "w-4 h-4" }) : ee ? /* @__PURE__ */ _.jsx(rt, { className: "w-4 h-4" }) : /* @__PURE__ */ _.jsx(tt, { className: "w-4 h-4" }), Ie = () => b === "error" ? "Retry" : b === "listening" ? "Listening..." : b === "recording" ? "Stop Recording" : "Record", ze = Kt.version;
  return /* @__PURE__ */ _.jsx("div", { className: F, children: /* @__PURE__ */ _.jsxs("div", { className: de("relative p-3 sm:p-4 border rounded-lg shadow-sm bg-card mx-auto space-y-3", { "opacity-75 cursor-not-allowed": l }), children: [
    p && ze && /* @__PURE__ */ _.jsxs("div", { className: "absolute top-2 right-2 flex items-center space-x-1 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ _.jsx(Hr, { className: "w-3 h-3" }),
      /* @__PURE__ */ _.jsxs("span", { children: [
        "v",
        ze
      ] })
    ] }),
    /* @__PURE__ */ _.jsx("div", { className: "flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-4", children: /* @__PURE__ */ _.jsx("div", { className: "flex-grow w-full", children: /* @__PURE__ */ _.jsx(
      Dt,
      {
        initialText: B,
        onTextChange: ve,
        placeholder: a,
        className: "w-full",
        textDisplayClassName: h,
        isEditing: z,
        onEditing: () => {
          P(!0);
        }
      }
    ) }) }),
    /* @__PURE__ */ _.jsxs("div", { className: "flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ _.jsxs(
        Xe,
        {
          onClick: b === "error" ? ye : ke,
          disabled: l && b !== "error",
          className: de(
            "flex-shrink-0 w-full sm:w-auto",
            A,
            b === "error" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""
          ),
          "aria-label": Ie(),
          children: [
            We(),
            /* @__PURE__ */ _.jsx("span", { className: "ml-2", children: Ie() })
          ]
        }
      ),
      z && /* @__PURE__ */ _.jsxs(Xe, { onClick: _e, className: "flex-shrink-0 w-full sm:w-auto", children: [
        /* @__PURE__ */ _.jsx(Zr, { className: "w-4 h-4 mr-2" }),
        "Save Text"
      ] })
    ] }),
    b === "error" && ie && /* @__PURE__ */ _.jsxs("div", { className: "flex items-center p-2 text-sm text-destructive-foreground bg-destructive rounded-md", children: [
      /* @__PURE__ */ _.jsx(Qr, { className: "w-4 h-4 mr-2 flex-shrink-0" }),
      " ",
      /* @__PURE__ */ _.jsxs("span", { children: [
        "Error: ",
        ie
      ] })
    ] }),
    c && ee && E && /* @__PURE__ */ _.jsxs("div", { className: de(
      "p-2 text-sm text-muted-foreground bg-muted/30 rounded-md min-h-[2.5rem] italic",
      // Default base styles
      g
      // Custom styles passed as prop
    ), children: [
      "Live: ",
      E
    ] }),
    n && ee && /* @__PURE__ */ _.jsx(br, { audioData: ne, color: s, className: "w-full h-16" }),
    n && b === "idle" && !ie && /* @__PURE__ */ _.jsx(br, { audioData: null, color: s, className: "w-full h-16" })
  ] }) });
};
export {
  oo as VoiceInputCapture
};
//# sourceMappingURL=react-voice-input.es.js.map

var Jr = Object.defineProperty;
var Kr = (r, t, o) => t in r ? Jr(r, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : r[t] = o;
var M = (r, t, o) => Kr(r, typeof t != "symbol" ? t + "" : t, o);
import * as mr from "react";
import br, { useState as se, useEffect as xe, useRef as Ne, useCallback as ye } from "react";
import { Slot as Xr } from "@radix-ui/react-slot";
import { Info as Hr, Save as Zr, AlertTriangle as Qr, RotateCcw as et, StopCircle as rt, Mic as tt } from "lucide-react";
import { toast as De } from "sonner";
var Oe = { exports: {} }, Ce = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ir;
function ot() {
  if (ir) return Ce;
  ir = 1;
  var r = br, t = Symbol.for("react.element"), o = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, c = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(l, f, p) {
    var d, h = {}, g = null, S = null;
    p !== void 0 && (g = "" + p), f.key !== void 0 && (g = "" + f.key), f.ref !== void 0 && (S = f.ref);
    for (d in f) n.call(f, d) && !s.hasOwnProperty(d) && (h[d] = f[d]);
    if (l && l.defaultProps) for (d in f = l.defaultProps, f) h[d] === void 0 && (h[d] = f[d]);
    return { $$typeof: t, type: l, key: g, ref: S, props: h, _owner: c.current };
  }
  return Ce.Fragment = o, Ce.jsx = a, Ce.jsxs = a, Ce;
}
var Ee = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sr;
function nt() {
  return sr || (sr = 1, process.env.NODE_ENV !== "production" && function() {
    var r = br, t = Symbol.for("react.element"), o = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), l = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), j = Symbol.iterator, C = "@@iterator";
    function x(e) {
      if (e === null || typeof e != "object")
        return null;
      var i = j && e[j] || e[C];
      return typeof i == "function" ? i : null;
    }
    var A = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(e) {
      {
        for (var i = arguments.length, u = new Array(i > 1 ? i - 1 : 0), m = 1; m < i; m++)
          u[m - 1] = arguments[m];
        B("error", e, u);
      }
    }
    function B(e, i, u) {
      {
        var m = A.ReactDebugCurrentFrame, T = m.getStackAddendum();
        T !== "" && (i += "%s", u = u.concat([T]));
        var k = u.map(function(y) {
          return String(y);
        });
        k.unshift("Warning: " + i), Function.prototype.apply.call(console[e], console, k);
      }
    }
    var G = !1, ee = !1, re = !1, ce = !1, Z = !1, U;
    U = Symbol.for("react.module.reference");
    function J(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === n || e === s || Z || e === c || e === p || e === d || ce || e === S || G || ee || re || typeof e == "object" && e !== null && (e.$$typeof === g || e.$$typeof === h || e.$$typeof === a || e.$$typeof === l || e.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === U || e.getModuleId !== void 0));
    }
    function F(e, i, u) {
      var m = e.displayName;
      if (m)
        return m;
      var T = i.displayName || i.name || "";
      return T !== "" ? u + "(" + T + ")" : u;
    }
    function E(e) {
      return e.displayName || "Context";
    }
    function W(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
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
        case p:
          return "Suspense";
        case d:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            var i = e;
            return E(i) + ".Consumer";
          case a:
            var u = e;
            return E(u._context) + ".Provider";
          case f:
            return F(e, e.render, "ForwardRef");
          case h:
            var m = e.displayName || null;
            return m !== null ? m : W(e.type) || "Memo";
          case g: {
            var T = e, k = T._payload, y = T._init;
            try {
              return W(y(k));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var z = Object.assign, K = 0, Q, te, oe, D, de, V, _e;
    function Ie() {
    }
    Ie.__reactDisabledLog = !0;
    function Me() {
      {
        if (K === 0) {
          Q = console.log, te = console.info, oe = console.warn, D = console.error, de = console.group, V = console.groupCollapsed, _e = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Ie,
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
        K++;
      }
    }
    function je() {
      {
        if (K--, K === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: z({}, e, {
              value: Q
            }),
            info: z({}, e, {
              value: te
            }),
            warn: z({}, e, {
              value: oe
            }),
            error: z({}, e, {
              value: D
            }),
            group: z({}, e, {
              value: de
            }),
            groupCollapsed: z({}, e, {
              value: V
            }),
            groupEnd: z({}, e, {
              value: _e
            })
          });
        }
        K < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ge = A.ReactCurrentDispatcher, R;
    function X(e, i, u) {
      {
        if (R === void 0)
          try {
            throw Error();
          } catch (T) {
            var m = T.stack.trim().match(/\n( *(at )?)/);
            R = m && m[1] || "";
          }
        return `
` + R + e;
      }
    }
    var P = !1, Y;
    {
      var H = typeof WeakMap == "function" ? WeakMap : Map;
      Y = new H();
    }
    function ue(e, i) {
      if (!e || P)
        return "";
      {
        var u = Y.get(e);
        if (u !== void 0)
          return u;
      }
      var m;
      P = !0;
      var T = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var k;
      k = ge.current, ge.current = null, Me();
      try {
        if (i) {
          var y = function() {
            throw Error();
          };
          if (Object.defineProperty(y.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(y, []);
            } catch ($) {
              m = $;
            }
            Reflect.construct(e, [], y);
          } else {
            try {
              y.call();
            } catch ($) {
              m = $;
            }
            e.call(y.prototype);
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
          for (var v = $.stack.split(`
`), L = m.stack.split(`
`), O = v.length - 1, N = L.length - 1; O >= 1 && N >= 0 && v[O] !== L[N]; )
            N--;
          for (; O >= 1 && N >= 0; O--, N--)
            if (v[O] !== L[N]) {
              if (O !== 1 || N !== 1)
                do
                  if (O--, N--, N < 0 || v[O] !== L[N]) {
                    var q = `
` + v[O].replace(" at new ", " at ");
                    return e.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", e.displayName)), typeof e == "function" && Y.set(e, q), q;
                  }
                while (O >= 1 && N >= 0);
              break;
            }
        }
      } finally {
        P = !1, ge.current = k, je(), Error.prepareStackTrace = T;
      }
      var ve = e ? e.displayName || e.name : "", he = ve ? X(ve) : "";
      return typeof e == "function" && Y.set(e, he), he;
    }
    function me(e, i, u) {
      return ue(e, !1);
    }
    function fe(e) {
      var i = e.prototype;
      return !!(i && i.isReactComponent);
    }
    function pe(e, i, u) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ue(e, fe(e));
      if (typeof e == "string")
        return X(e);
      switch (e) {
        case p:
          return X("Suspense");
        case d:
          return X("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            return me(e.render);
          case h:
            return pe(e.type, i, u);
          case g: {
            var m = e, T = m._payload, k = m._init;
            try {
              return pe(k(T), i, u);
            } catch {
            }
          }
        }
      return "";
    }
    var ne = Object.prototype.hasOwnProperty, Se = {}, Ye = A.ReactDebugCurrentFrame;
    function Pe(e) {
      if (e) {
        var i = e._owner, u = pe(e.type, e._source, i ? i.type : null);
        Ye.setExtraStackFrame(u);
      } else
        Ye.setExtraStackFrame(null);
    }
    function Tr(e, i, u, m, T) {
      {
        var k = Function.call.bind(ne);
        for (var y in e)
          if (k(e, y)) {
            var v = void 0;
            try {
              if (typeof e[y] != "function") {
                var L = Error((m || "React class") + ": " + u + " type `" + y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[y] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw L.name = "Invariant Violation", L;
              }
              v = e[y](i, y, m, u, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (O) {
              v = O;
            }
            v && !(v instanceof Error) && (Pe(T), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", u, y, typeof v), Pe(null)), v instanceof Error && !(v.message in Se) && (Se[v.message] = !0, Pe(T), w("Failed %s type: %s", u, v.message), Pe(null));
          }
      }
    }
    var Ar = Array.isArray;
    function Fe(e) {
      return Ar(e);
    }
    function kr(e) {
      {
        var i = typeof Symbol == "function" && Symbol.toStringTag, u = i && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return u;
      }
    }
    function _r(e) {
      try {
        return qe(e), !1;
      } catch {
        return !0;
      }
    }
    function qe(e) {
      return "" + e;
    }
    function Je(e) {
      if (_r(e))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", kr(e)), qe(e);
    }
    var Ke = A.ReactCurrentOwner, Ir = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Xe, He;
    function jr(e) {
      if (ne.call(e, "ref")) {
        var i = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Pr(e) {
      if (ne.call(e, "key")) {
        var i = Object.getOwnPropertyDescriptor(e, "key").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Or(e, i) {
      typeof e.ref == "string" && Ke.current;
    }
    function Nr(e, i) {
      {
        var u = function() {
          Xe || (Xe = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
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
          He || (He = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        u.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: u,
          configurable: !0
        });
      }
    }
    var Fr = function(e, i, u, m, T, k, y) {
      var v = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: e,
        key: i,
        ref: u,
        props: y,
        // Record the component responsible for creating this element.
        _owner: k
      };
      return v._store = {}, Object.defineProperty(v._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(v, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: m
      }), Object.defineProperty(v, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: T
      }), Object.freeze && (Object.freeze(v.props), Object.freeze(v)), v;
    };
    function Ur(e, i, u, m, T) {
      {
        var k, y = {}, v = null, L = null;
        u !== void 0 && (Je(u), v = "" + u), Pr(i) && (Je(i.key), v = "" + i.key), jr(i) && (L = i.ref, Or(i, T));
        for (k in i)
          ne.call(i, k) && !Ir.hasOwnProperty(k) && (y[k] = i[k]);
        if (e && e.defaultProps) {
          var O = e.defaultProps;
          for (k in O)
            y[k] === void 0 && (y[k] = O[k]);
        }
        if (v || L) {
          var N = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          v && Nr(y, N), L && Mr(y, N);
        }
        return Fr(e, v, L, T, m, Ke.current, y);
      }
    }
    var Ue = A.ReactCurrentOwner, Ze = A.ReactDebugCurrentFrame;
    function be(e) {
      if (e) {
        var i = e._owner, u = pe(e.type, e._source, i ? i.type : null);
        Ze.setExtraStackFrame(u);
      } else
        Ze.setExtraStackFrame(null);
    }
    var ze;
    ze = !1;
    function Le(e) {
      return typeof e == "object" && e !== null && e.$$typeof === t;
    }
    function Qe() {
      {
        if (Ue.current) {
          var e = W(Ue.current.type);
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
    var er = {};
    function Lr(e) {
      {
        var i = Qe();
        if (!i) {
          var u = typeof e == "string" ? e : e.displayName || e.name;
          u && (i = `

Check the top-level render call using <` + u + ">.");
        }
        return i;
      }
    }
    function rr(e, i) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var u = Lr(i);
        if (er[u])
          return;
        er[u] = !0;
        var m = "";
        e && e._owner && e._owner !== Ue.current && (m = " It was passed a child from " + W(e._owner.type) + "."), be(e), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', u, m), be(null);
      }
    }
    function tr(e, i) {
      {
        if (typeof e != "object")
          return;
        if (Fe(e))
          for (var u = 0; u < e.length; u++) {
            var m = e[u];
            Le(m) && rr(m, i);
          }
        else if (Le(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var T = x(e);
          if (typeof T == "function" && T !== e.entries)
            for (var k = T.call(e), y; !(y = k.next()).done; )
              Le(y.value) && rr(y.value, i);
        }
      }
    }
    function Wr(e) {
      {
        var i = e.type;
        if (i == null || typeof i == "string")
          return;
        var u;
        if (typeof i == "function")
          u = i.propTypes;
        else if (typeof i == "object" && (i.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        i.$$typeof === h))
          u = i.propTypes;
        else
          return;
        if (u) {
          var m = W(i);
          Tr(u, e.props, "prop", m, e);
        } else if (i.PropTypes !== void 0 && !ze) {
          ze = !0;
          var T = W(i);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", T || "Unknown");
        }
        typeof i.getDefaultProps == "function" && !i.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Dr(e) {
      {
        for (var i = Object.keys(e.props), u = 0; u < i.length; u++) {
          var m = i[u];
          if (m !== "children" && m !== "key") {
            be(e), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), be(null);
            break;
          }
        }
        e.ref !== null && (be(e), w("Invalid attribute `ref` supplied to `React.Fragment`."), be(null));
      }
    }
    var or = {};
    function nr(e, i, u, m, T, k) {
      {
        var y = J(e);
        if (!y) {
          var v = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var L = zr();
          L ? v += L : v += Qe();
          var O;
          e === null ? O = "null" : Fe(e) ? O = "array" : e !== void 0 && e.$$typeof === t ? (O = "<" + (W(e.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : O = typeof e, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, v);
        }
        var N = Ur(e, i, u, T, k);
        if (N == null)
          return N;
        if (y) {
          var q = i.children;
          if (q !== void 0)
            if (m)
              if (Fe(q)) {
                for (var ve = 0; ve < q.length; ve++)
                  tr(q[ve], e);
                Object.freeze && Object.freeze(q);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              tr(q, e);
        }
        if (ne.call(i, "key")) {
          var he = W(e), $ = Object.keys(i).filter(function(qr) {
            return qr !== "key";
          }), We = $.length > 0 ? "{key: someKey, " + $.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!or[he + We]) {
            var Yr = $.length > 0 ? "{" + $.join(": ..., ") + ": ...}" : "{}";
            w(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, We, he, Yr, he), or[he + We] = !0;
          }
        }
        return e === n ? Dr(N) : Wr(N), N;
      }
    }
    function Vr(e, i, u) {
      return nr(e, i, u, !0);
    }
    function $r(e, i, u) {
      return nr(e, i, u, !1);
    }
    var Br = $r, Gr = Vr;
    Ee.Fragment = n, Ee.jsx = Br, Ee.jsxs = Gr;
  }()), Ee;
}
var ar;
function it() {
  return ar || (ar = 1, process.env.NODE_ENV === "production" ? Oe.exports = ot() : Oe.exports = nt()), Oe.exports;
}
var _ = it();
function vr(r) {
  var t, o, n = "";
  if (typeof r == "string" || typeof r == "number") n += r;
  else if (typeof r == "object") if (Array.isArray(r)) {
    var c = r.length;
    for (t = 0; t < c; t++) r[t] && (o = vr(r[t])) && (n && (n += " "), n += o);
  } else for (o in r) r[o] && (n && (n += " "), n += o);
  return n;
}
function yr() {
  for (var r, t, o = 0, n = "", c = arguments.length; o < c; o++) (r = arguments[o]) && (t = vr(r)) && (n && (n += " "), n += t);
  return n;
}
const lr = (r) => typeof r == "boolean" ? `${r}` : r === 0 ? "0" : r, cr = yr, st = (r, t) => (o) => {
  var n;
  if ((t == null ? void 0 : t.variants) == null) return cr(r, o == null ? void 0 : o.class, o == null ? void 0 : o.className);
  const { variants: c, defaultVariants: s } = t, a = Object.keys(c).map((p) => {
    const d = o == null ? void 0 : o[p], h = s == null ? void 0 : s[p];
    if (d === null) return null;
    const g = lr(d) || lr(h);
    return c[p][g];
  }), l = o && Object.entries(o).reduce((p, d) => {
    let [h, g] = d;
    return g === void 0 || (p[h] = g), p;
  }, {}), f = t == null || (n = t.compoundVariants) === null || n === void 0 ? void 0 : n.reduce((p, d) => {
    let { class: h, className: g, ...S } = d;
    return Object.entries(S).every((j) => {
      let [C, x] = j;
      return Array.isArray(x) ? x.includes({
        ...s,
        ...l
      }[C]) : {
        ...s,
        ...l
      }[C] === x;
    }) ? [
      ...p,
      h,
      g
    ] : p;
  }, []);
  return cr(r, a, f, o == null ? void 0 : o.class, o == null ? void 0 : o.className);
}, Ge = "-", at = (r) => {
  const t = ct(r), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: n
  } = r;
  return {
    getClassGroupId: (a) => {
      const l = a.split(Ge);
      return l[0] === "" && l.length !== 1 && l.shift(), xr(l, t) || lt(a);
    },
    getConflictingClassGroupIds: (a, l) => {
      const f = o[a] || [];
      return l && n[a] ? [...f, ...n[a]] : f;
    }
  };
}, xr = (r, t) => {
  var a;
  if (r.length === 0)
    return t.classGroupId;
  const o = r[0], n = t.nextPart.get(o), c = n ? xr(r.slice(1), n) : void 0;
  if (c)
    return c;
  if (t.validators.length === 0)
    return;
  const s = r.join(Ge);
  return (a = t.validators.find(({
    validator: l
  }) => l(s))) == null ? void 0 : a.classGroupId;
}, dr = /^\[(.+)\]$/, lt = (r) => {
  if (dr.test(r)) {
    const t = dr.exec(r)[1], o = t == null ? void 0 : t.substring(0, t.indexOf(":"));
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
  return ut(Object.entries(r.classGroups), o).forEach(([s, a]) => {
    $e(a, n, s, t);
  }), n;
}, $e = (r, t, o, n) => {
  r.forEach((c) => {
    if (typeof c == "string") {
      const s = c === "" ? t : ur(t, c);
      s.classGroupId = o;
      return;
    }
    if (typeof c == "function") {
      if (dt(c)) {
        $e(c(n), t, o, n);
        return;
      }
      t.validators.push({
        validator: c,
        classGroupId: o
      });
      return;
    }
    Object.entries(c).forEach(([s, a]) => {
      $e(a, ur(t, s), o, n);
    });
  });
}, ur = (r, t) => {
  let o = r;
  return t.split(Ge).forEach((n) => {
    o.nextPart.has(n) || o.nextPart.set(n, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(n);
  }), o;
}, dt = (r) => r.isThemeGetter, ut = (r, t) => t ? r.map(([o, n]) => {
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
}, wr = "!", pt = (r) => {
  const {
    separator: t,
    experimentalParseClassName: o
  } = r, n = t.length === 1, c = t[0], s = t.length, a = (l) => {
    const f = [];
    let p = 0, d = 0, h;
    for (let x = 0; x < l.length; x++) {
      let A = l[x];
      if (p === 0) {
        if (A === c && (n || l.slice(x, x + s) === t)) {
          f.push(l.slice(d, x)), d = x + s;
          continue;
        }
        if (A === "/") {
          h = x;
          continue;
        }
      }
      A === "[" ? p++ : A === "]" && p--;
    }
    const g = f.length === 0 ? l : l.substring(d), S = g.startsWith(wr), j = S ? g.substring(1) : g, C = h && h > d ? h - d : void 0;
    return {
      modifiers: f,
      hasImportantModifier: S,
      baseClassName: j,
      maybePostfixModifierPosition: C
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
  for (let f = a.length - 1; f >= 0; f -= 1) {
    const p = a[f], {
      modifiers: d,
      hasImportantModifier: h,
      baseClassName: g,
      maybePostfixModifierPosition: S
    } = o(p);
    let j = !!S, C = n(j ? g.substring(0, S) : g);
    if (!C) {
      if (!j) {
        l = p + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (C = n(g), !C) {
        l = p + (l.length > 0 ? " " + l : l);
        continue;
      }
      j = !1;
    }
    const x = ht(d).join(":"), A = h ? x + wr : x, w = A + C;
    if (s.includes(w))
      continue;
    s.push(w);
    const B = c(C, j);
    for (let G = 0; G < B.length; ++G) {
      const ee = B[G];
      s.push(A + ee);
    }
    l = p + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function vt() {
  let r = 0, t, o, n = "";
  for (; r < arguments.length; )
    (t = arguments[r++]) && (o = Rr(t)) && (n && (n += " "), n += o);
  return n;
}
const Rr = (r) => {
  if (typeof r == "string")
    return r;
  let t, o = "";
  for (let n = 0; n < r.length; n++)
    r[n] && (t = Rr(r[n])) && (o && (o += " "), o += t);
  return o;
};
function yt(r, ...t) {
  let o, n, c, s = a;
  function a(f) {
    const p = t.reduce((d, h) => h(d), r());
    return o = gt(p), n = o.cache.get, c = o.cache.set, s = l, l(f);
  }
  function l(f) {
    const p = n(f);
    if (p)
      return p;
    const d = bt(f, o);
    return c(f, d), d;
  }
  return function() {
    return s(vt.apply(null, arguments));
  };
}
const I = (r) => {
  const t = (o) => o[r] || [];
  return t.isThemeGetter = !0, t;
}, Sr = /^\[(?:([a-z-]+):)?(.+)\]$/i, xt = /^\d+\/\d+$/, wt = /* @__PURE__ */ new Set(["px", "full", "screen"]), Rt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, St = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ct = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Et = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Tt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ie = (r) => we(r) || wt.has(r) || xt.test(r), ae = (r) => Re(r, "length", Nt), we = (r) => !!r && !Number.isNaN(Number(r)), Ve = (r) => Re(r, "number", we), Te = (r) => !!r && Number.isInteger(Number(r)), At = (r) => r.endsWith("%") && we(r.slice(0, -1)), b = (r) => Sr.test(r), le = (r) => Rt.test(r), kt = /* @__PURE__ */ new Set(["length", "size", "percentage"]), _t = (r) => Re(r, kt, Cr), It = (r) => Re(r, "position", Cr), jt = /* @__PURE__ */ new Set(["image", "url"]), Pt = (r) => Re(r, jt, Ft), Ot = (r) => Re(r, "", Mt), Ae = () => !0, Re = (r, t, o) => {
  const n = Sr.exec(r);
  return n ? n[1] ? typeof t == "string" ? n[1] === t : t.has(n[1]) : o(n[2]) : !1;
}, Nt = (r) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  St.test(r) && !Ct.test(r)
), Cr = () => !1, Mt = (r) => Et.test(r), Ft = (r) => Tt.test(r), Ut = () => {
  const r = I("colors"), t = I("spacing"), o = I("blur"), n = I("brightness"), c = I("borderColor"), s = I("borderRadius"), a = I("borderSpacing"), l = I("borderWidth"), f = I("contrast"), p = I("grayscale"), d = I("hueRotate"), h = I("invert"), g = I("gap"), S = I("gradientColorStops"), j = I("gradientColorStopPositions"), C = I("inset"), x = I("margin"), A = I("opacity"), w = I("padding"), B = I("saturate"), G = I("scale"), ee = I("sepia"), re = I("skew"), ce = I("space"), Z = I("translate"), U = () => ["auto", "contain", "none"], J = () => ["auto", "hidden", "clip", "visible", "scroll"], F = () => ["auto", b, t], E = () => [b, t], W = () => ["", ie, ae], z = () => ["auto", we, b], K = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], Q = () => ["solid", "dashed", "dotted", "double", "none"], te = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], oe = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], D = () => ["", "0", b], de = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], V = () => [we, b];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Ae],
      spacing: [ie, ae],
      blur: ["none", "", le, b],
      brightness: V(),
      borderColor: [r],
      borderRadius: ["none", "", "full", le, b],
      borderSpacing: E(),
      borderWidth: W(),
      contrast: V(),
      grayscale: D(),
      hueRotate: V(),
      invert: D(),
      gap: E(),
      gradientColorStops: [r],
      gradientColorStopPositions: [At, ae],
      inset: F(),
      margin: F(),
      opacity: V(),
      padding: E(),
      saturate: V(),
      scale: V(),
      sepia: D(),
      skew: V(),
      space: E(),
      translate: E()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", b]
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
        columns: [le]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": de()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": de()
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
        object: [...K(), b]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: J()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": J()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": J()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: U()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": U()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": U()
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
        inset: [C]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [C]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [C]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [C]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [C]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [C]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [C]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [C]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [C]
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
        z: ["auto", Te, b]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: F()
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
        flex: ["1", "auto", "initial", "none", b]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: D()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: D()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Te, b]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Ae]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Te, b]
        }, b]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": z()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": z()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Ae]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Te, b]
        }, b]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": z()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": z()
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
        "auto-cols": ["auto", "min", "max", "fr", b]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", b]
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
        justify: ["normal", ...oe()]
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
        content: ["normal", ...oe(), "baseline"]
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
        "place-content": [...oe(), "baseline"]
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
        p: [w]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [w]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [w]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [w]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [w]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [w]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [w]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [w]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [w]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [x]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [x]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [x]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [x]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [x]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [x]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [x]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [x]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [x]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [ce]
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
        "space-y": [ce]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", b, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [b, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [b, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [le]
        }, le]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [b, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [b, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [b, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [b, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", le, ae]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Ve]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Ae]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", b]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", we, Ve]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ie, b]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", b]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", b]
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
        "placeholder-opacity": [A]
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
        "text-opacity": [A]
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
        decoration: [...Q(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", ie, ae]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", ie, b]
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
        indent: E()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", b]
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
        content: ["none", b]
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
        "bg-opacity": [A]
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
        bg: [...K(), It]
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
        from: [j]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [j]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [j]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [S]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [S]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [S]
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
        "border-opacity": [A]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...Q(), "hidden"]
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
        "divide-opacity": [A]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: Q()
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
        outline: ["", ...Q()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ie, b]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [ie, ae]
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
        ring: W()
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
        "ring-opacity": [A]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [ie, ae]
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
        shadow: ["", "inner", "none", le, Ot]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Ae]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [A]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...te(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": te()
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
        contrast: [f]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", le, b]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [p]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [d]
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
        sepia: [ee]
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
        "backdrop-contrast": [f]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [p]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [d]
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
        "backdrop-opacity": [A]
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
        "backdrop-sepia": [ee]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", b]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: V()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", b]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: V()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", b]
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
        scale: [G]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [G]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [G]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Te, b]
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
        "skew-x": [re]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [re]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", b]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", b]
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
        "scroll-m": E()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": E()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": E()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": E()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": E()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": E()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": E()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": E()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": E()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": E()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": E()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": E()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": E()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": E()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": E()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": E()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": E()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": E()
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
        "will-change": ["auto", "scroll", "contents", "transform", b]
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
        stroke: [ie, ae, Ve]
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
function ke(...r) {
  return zt(yr(r));
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
), Be = mr.forwardRef(
  ({ className: r, variant: t, size: o, asChild: n = !1, ...c }, s) => {
    const a = n ? Xr : "button";
    return /* @__PURE__ */ _.jsx(
      a,
      {
        className: ke(Lt({ variant: t, size: o, className: r })),
        ref: s,
        ...c
      }
    );
  }
);
Be.displayName = "Button";
const Er = mr.forwardRef(
  ({ className: r, ...t }, o) => /* @__PURE__ */ _.jsx(
    "textarea",
    {
      className: ke(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        r
      ),
      ref: o,
      ...t
    }
  )
);
Er.displayName = "Textarea";
const Wt = ({
  initialText: r,
  onTextChange: t,
  onEditing: o,
  isEditing: n,
  placeholder: c = "Type here...",
  className: s
}) => {
  const [a, l] = se(r), f = (p) => {
    const d = p.target.value;
    l(d), t(d), n || o();
  };
  return xe(() => {
    n || l(r);
  }, [r, n]), /* @__PURE__ */ _.jsx("div", { className: `flex flex-col space-y-2 ${s}`, children: /* @__PURE__ */ _.jsx(
    Er,
    {
      value: a,
      onChange: f,
      placeholder: c,
      className: "w-full min-h-[60px] text-base",
      rows: 3
    }
  ) });
}, fr = ({
  audioData: r,
  color: t = "#3b82f6",
  // Default blue-500
  className: o,
  backgroundColor: n = "transparent"
  // Default transparent
}) => {
  const c = Ne(null);
  return xe(() => {
    const s = c.current;
    if (!s) return;
    const a = s.getContext("2d");
    if (!a) return;
    const { width: l, height: f } = s;
    if (a.clearRect(0, 0, l, f), a.fillStyle = n, a.fillRect(0, 0, l, f), !r || r.length === 0) {
      a.beginPath(), a.moveTo(0, f / 2), a.lineTo(l, f / 2), a.strokeStyle = t, a.lineWidth = 1, a.stroke();
      return;
    }
    a.lineWidth = 2, a.strokeStyle = t, a.beginPath();
    const p = l * 1 / r.length;
    let d = 0;
    for (let h = 0; h < r.length; h++) {
      const S = r[h] / 128 * f / 2;
      h === 0 ? a.moveTo(d, S) : a.lineTo(d, S), d += p;
    }
    a.lineTo(l, f / 2), a.stroke();
  }, [r, t, n]), /* @__PURE__ */ _.jsx(
    "canvas",
    {
      ref: c,
      className: ke("w-full h-16 rounded-md", o),
      width: 300,
      height: 64
    }
  );
}, Dt = 3e3, Vt = 5e3;
class $t {
  constructor(t) {
    M(this, "mediaRecorder", null);
    M(this, "audioChunks", []);
    M(this, "speechRecognition", null);
    M(this, "audioContext", null);
    M(this, "analyserNode", null);
    M(this, "sourceNode", null);
    M(this, "dataArray", null);
    M(this, "animationFrameId", null);
    M(this, "drawWaveformCallCount", 0);
    M(this, "silenceTimeoutId", null);
    M(this, "initialSpeechTimeoutId", null);
    M(this, "hasDetectedSpeech", !1);
    M(this, "isManuallyStopping", !1);
    M(this, "stopReason", null);
    M(this, "recognitionServiceTrulyActive", !1);
    M(this, "options");
    M(this, "drawWaveform", () => {
      this.drawWaveformCallCount++, this.drawWaveformCallCount % 30, this.analyserNode && this.dataArray && this.mediaRecorder && this.mediaRecorder.state === "recording" ? (this.drawWaveformCallCount % 60, this.analyserNode.getByteTimeDomainData(this.dataArray), this.options.onAudioData(new Uint8Array(this.dataArray)), this.animationFrameId = requestAnimationFrame(this.drawWaveform)) : (this.drawWaveformCallCount === 1 || this.drawWaveformCallCount % 60, this.animationFrameId && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null));
    });
    M(this, "cleanupAudioProcessing", () => {
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
      silenceTimeout: t.silenceTimeout ?? Dt,
      initialSpeechTimeout: t.initialSpeechTimeout ?? Vt,
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
        c && this.options.onFinalTranscript(c.trim()), n && this.options.onInterimTranscript(n.trim());
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
        this.recognitionServiceTrulyActive && (this.options.onError("Silence detected, stopping."), this.stopReason = "silence", this.stopRecordingInternal("silence"));
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
  const a = Math.floor(c * n), l = Math.ceil(t / n), f = r.getChannelData(0);
  let p = Math.floor(s / a) - 1, d = 0;
  for (let g = Math.floor(s / a) - 1; g >= 0; g--) {
    const S = g * a, j = Math.min(S + a, s);
    let C = 0;
    for (let x = S; x < j; x++) {
      const A = Math.abs(f[x]);
      A > C && (C = A);
    }
    if (C < o)
      g === Math.floor(s / a) - 1 - d && d++;
    else {
      p = g;
      break;
    }
  }
  let h = (p + 1) * a / c;
  if (h = Math.min(h, r.duration), console.log(`AudioUtils: Initial lastSoundTime: ${h.toFixed(2)}s. Consecutive silent chunks at end: ${d}`), d >= l) {
    const g = s / c - d * n;
    return console.log(`AudioUtils: Sufficient trailing silence detected. Sound considered to end at: ${g.toFixed(2)}s`), g;
  } else
    return console.log(`AudioUtils: Not enough trailing silence (found ${d * n}s, need ${t}s). Returning original duration or end of last detected sound.`), r.duration;
}
function Yt(r, t) {
  const { sampleRate: o, numberOfChannels: n, length: c } = r, s = Math.max(0.01, t), a = Math.floor(s * o);
  if (a <= 0 || a > c)
    return console.error("AudioUtils: Invalid new duration for trimming.", s, "Original:", r.duration, "Attempted samples:", a, "Original samples:", c), r;
  if (Math.abs(r.duration - s) < 0.01)
    return console.log("AudioUtils: Trim duration very close to original. Returning original buffer."), r;
  try {
    const l = new (window.AudioContext || window.webkitAudioContext)(), f = l.createBuffer(
      n,
      a,
      o
    );
    for (let p = 0; p < n; p++) {
      const d = r.getChannelData(p);
      f.getChannelData(p).set(d.subarray(0, a));
    }
    return l.close(), console.log(`AudioUtils: Trimmed AudioBuffer from ${r.duration.toFixed(2)}s to ${f.duration.toFixed(2)}s`), f;
  } catch (l) {
    return console.error("AudioUtils: Error trimming AudioBuffer:", l), null;
  }
}
function qt(r) {
  const t = r.numberOfChannels, o = t, n = r.length * t * 2 + 44, c = new ArrayBuffer(n), s = new DataView(c), a = [];
  let l = 0, f = 0, p = 0;
  function d(g) {
    s.setUint16(p, g, !0), p += 2;
  }
  function h(g) {
    s.setUint32(p, g, !0), p += 4;
  }
  for (h(1179011410), h(n - 8), h(1163280727), h(544501094), h(16), d(1), d(o), h(r.sampleRate), h(r.sampleRate * 2 * o), d(o * 2), d(16), h(1635017060), h(n - p - 4), l = 0; l < o; l++)
    a.push(r.getChannelData(l));
  for (let g = 0; g < r.length; g++)
    for (let S = 0; S < t; S++)
      f = Math.max(-1, Math.min(1, a[S][g])), s.setInt16(p, f * 32767, !0), p += 2;
  return console.log("AudioUtils: Encoded AudioBuffer to WAV Blob."), new Blob([s], { type: "audio/wav" });
}
const Jt = "0.1.65", Kt = {
  version: Jt
}, pr = "stop recording", hr = 0.75, Xt = 3e3, Ht = 5e3, gr = (r) => r ? r.charAt(0).toUpperCase() + r.slice(1) : "", oo = ({
  onSave: r,
  initialText: t = "",
  showWaveform: o = !0,
  showInterimTranscript: n = !0,
  customWaveformColor: c,
  placeholder: s = "Speak or type here...",
  disabled: a = !1,
  silenceTimeout: l = Xt,
  initialSpeechTimeout: f = Ht,
  showVersionInfo: p = !0
}) => {
  const [d, h] = se("idle"), [g, S] = se(""), [j, C] = se(t), [x, A] = se(null), [w, B] = se(null), [G, ee] = se(null), [re, ce] = se(null), [Z, U] = se(!1), J = Ne(null), F = Ne(""), E = Ne(d);
  xe(() => {
    E.current = d;
  }, [d]);
  const W = ye((R) => {
    const X = R.trim();
    if (!X) return;
    let P = F.current;
    if (!P)
      F.current = gr(X);
    else {
      const Y = P.slice(-1), H = [".", "!", "?"].includes(Y), ue = P.endsWith(" ");
      !H && !ue ? P += ". " : H && !ue && (P += " "), F.current = P + gr(X);
    }
    F.current = F.current.trim(), E.current === "recording" && (C(F.current), U(!1));
  }, []), z = ye((R) => {
    n && S(R);
  }, [n]), K = ye(() => {
    console.log("VIC: handleRecordingStart triggered"), h("recording"), B(null), S(""), F.current = "", ee(null), ce((R) => (R && URL.revokeObjectURL(R), null)), U(!1);
  }, []), Q = ye(async (R, X) => {
    console.log("VIC: handleRecordingStop triggered. Audio Blob exists:", !!R, "Audio URL:", X);
    let P = F.current.trim();
    P && ![".", "!", "?"].includes(P.slice(-1)) && (P += "."), h("idle"), S("");
    let Y = R, H = X;
    if (P.toLowerCase().endsWith(pr + ".") && R) {
      const ue = pr + ".", me = P.toLowerCase().lastIndexOf(ue);
      if (me === 0 || me > 0 && P[me - 1] === " ") {
        P = P.substring(0, me).trim();
        const fe = await Bt(R);
        if (fe) {
          const pe = Gt(fe.audioBuffer, hr);
          if (pe < fe.duration - hr / 2) {
            const ne = Yt(fe.audioBuffer, pe);
            if (ne && ne !== fe.audioBuffer) {
              const Se = qt(ne);
              H && URL.revokeObjectURL(H), Y = Se, H = URL.createObjectURL(Se);
            }
          }
        }
      }
    }
    C(P), ee(Y), ce(H), P || Y ? (console.log("VIC: handleRecordingStop, calling onSave with:", { text: P, blob: !!Y, url: H }), r(P, Y, H)) : console.log("VIC: handleRecordingStop, NOT calling onSave (no text/audio)."), U(!1);
  }, [r]), te = ye((R) => {
    console.error("VIC: handleError triggered:", R), h("error"), B(R), S(""), A(null), De.error(R || "An unknown recording error occurred.", { duration: 5e3 }), F.current = "", U(!1);
  }, []), oe = ye((R) => {
    o && A(new Uint8Array(R));
  }, [o]);
  xe(() => {
    console.log("VIC: Initializing EnhancedSpeechRecorder with timeouts:", { silenceTimeout: l, initialSpeechTimeout: f });
    const R = new $t({
      onFinalTranscript: W,
      onInterimTranscript: z,
      onRecordingStart: K,
      onRecordingStop: Q,
      onError: te,
      onAudioData: oe,
      silenceTimeout: l,
      initialSpeechTimeout: f
    });
    return J.current = R, () => {
      console.log("VIC: Disposing EnhancedSpeechRecorder."), R.dispose(), J.current = null;
    };
  }, [W, z, K, Q, te, oe, l, f]), xe(() => {
    !D && !Z && j !== t && C(t);
  }, [t, j, Z, d]);
  const D = d === "recording" || d === "listening";
  xe(() => {
    const R = re;
    return () => {
      R && URL.revokeObjectURL(R);
    };
  }, [re]);
  const de = async () => {
    if (console.log("VIC: toggleRecording called. Current state:", E.current, "Disabled:", a), !a) {
      if (!J.current) {
        De.error("Recorder not ready. Please try again."), console.error("VIC: toggleRecording - speechRecorderRef is null!");
        return;
      }
      if (D)
        console.log("VIC: toggleRecording - stopping recording."), J.current.stopRecording("manual");
      else {
        console.log("VIC: toggleRecording - starting recording."), B(null), h("listening"), F.current = "";
        try {
          await J.current.startRecording(), console.log("VIC: toggleRecording - startRecording promise resolved.");
        } catch (R) {
          console.error("VIC: toggleRecording - error calling startRecording:", R), te(R.message || "Failed to start recording."), h("idle");
        }
      }
    }
  }, V = (R) => {
    C(R), Z || U(!0);
  }, _e = () => {
    console.log("VIC: handleManualSave, calling onSave with:", { text: j, blob: !!G, url: re }), r(j, G, re), De.success("Text saved manually!"), U(!1);
  }, Ie = () => {
    console.log("VIC: handleRetryError called."), B(null), h("idle"), U(!1);
  }, Me = () => d === "error" ? /* @__PURE__ */ _.jsx(et, { className: "w-4 h-4" }) : D ? /* @__PURE__ */ _.jsx(rt, { className: "w-4 h-4" }) : /* @__PURE__ */ _.jsx(tt, { className: "w-4 h-4" }), je = () => d === "error" ? "Retry" : d === "listening" ? "Listening..." : d === "recording" ? "Stop Recording" : "Record", ge = Kt.version;
  return /* @__PURE__ */ _.jsxs("div", { className: ke("relative p-3 sm:p-4 border rounded-lg shadow-sm bg-card w-full max-w-2xl mx-auto space-y-3", { "opacity-75 cursor-not-allowed": a }), children: [
    p && ge && /* @__PURE__ */ _.jsxs("div", { className: "absolute top-2 right-2 flex items-center space-x-1 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ _.jsx(Hr, { className: "w-3 h-3" }),
      /* @__PURE__ */ _.jsxs("span", { children: [
        "v",
        ge
      ] })
    ] }),
    /* @__PURE__ */ _.jsx("div", { className: "flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-4", children: /* @__PURE__ */ _.jsx("div", { className: "flex-grow w-full", children: /* @__PURE__ */ _.jsx(
      Wt,
      {
        initialText: j,
        onTextChange: V,
        placeholder: s,
        className: "w-full",
        isEditing: Z,
        onEditing: () => {
          U(!0);
        }
      }
    ) }) }),
    /* @__PURE__ */ _.jsxs("div", { className: "flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ _.jsxs(
        Be,
        {
          onClick: d === "error" ? Ie : de,
          disabled: a && d !== "error",
          className: ke("flex-shrink-0 w-full sm:w-auto", d === "error" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""),
          "aria-label": je(),
          children: [
            Me(),
            /* @__PURE__ */ _.jsx("span", { className: "ml-2", children: je() })
          ]
        }
      ),
      Z && /* @__PURE__ */ _.jsxs(Be, { onClick: _e, className: "flex-shrink-0 w-full sm:w-auto", children: [
        /* @__PURE__ */ _.jsx(Zr, { className: "w-4 h-4 mr-2" }),
        "Save Text"
      ] })
    ] }),
    d === "error" && w && /* @__PURE__ */ _.jsxs("div", { className: "flex items-center p-2 text-sm text-destructive-foreground bg-destructive rounded-md", children: [
      /* @__PURE__ */ _.jsx(Qr, { className: "w-4 h-4 mr-2 flex-shrink-0" }),
      " ",
      /* @__PURE__ */ _.jsxs("span", { children: [
        "Error: ",
        w
      ] })
    ] }),
    n && D && g && /* @__PURE__ */ _.jsxs("div", { className: "p-2 text-sm text-muted-foreground bg-muted/30 rounded-md min-h-[2.5rem] italic", children: [
      "Live: ",
      g
    ] }),
    o && D && /* @__PURE__ */ _.jsx(fr, { audioData: x, color: c, className: "w-full h-16" }),
    o && d === "idle" && !w && /* @__PURE__ */ _.jsx(fr, { audioData: null, color: c, className: "w-full h-16" })
  ] });
};
export {
  oo as VoiceInputCapture
};
//# sourceMappingURL=react-voice-input.es.js.map

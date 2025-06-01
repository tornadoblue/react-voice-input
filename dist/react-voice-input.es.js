var Jr = Object.defineProperty;
var Kr = (r, t, o) => t in r ? Jr(r, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : r[t] = o;
var M = (r, t, o) => Kr(r, typeof t != "symbol" ? t + "" : t, o);
import * as mr from "react";
import br, { useState as re, useEffect as ye, useRef as Ne, useCallback as ve } from "react";
import { Slot as Xr } from "@radix-ui/react-slot";
import { Save as Hr, Info as Zr, AlertTriangle as Qr, RotateCcw as et, StopCircle as rt, Mic as tt } from "lucide-react";
import { toast as De } from "sonner";
var Oe = { exports: {} }, Ee = {};
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
  if (ir) return Ee;
  ir = 1;
  var r = br, t = Symbol.for("react.element"), o = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, c = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(l, f, p) {
    var u, h = {}, g = null, S = null;
    p !== void 0 && (g = "" + p), f.key !== void 0 && (g = "" + f.key), f.ref !== void 0 && (S = f.ref);
    for (u in f) n.call(f, u) && !a.hasOwnProperty(u) && (h[u] = f[u]);
    if (l && l.defaultProps) for (u in f = l.defaultProps, f) h[u] === void 0 && (h[u] = f[u]);
    return { $$typeof: t, type: l, key: g, ref: S, props: h, _owner: c.current };
  }
  return Ee.Fragment = o, Ee.jsx = s, Ee.jsxs = s, Ee;
}
var Ae = {};
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
    var r = br, t = Symbol.for("react.element"), o = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), l = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), P = Symbol.iterator, x = "@@iterator";
    function w(e) {
      if (e === null || typeof e != "object")
        return null;
      var i = P && e[P] || e[x];
      return typeof i == "function" ? i : null;
    }
    var E = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function R(e) {
      {
        for (var i = arguments.length, d = new Array(i > 1 ? i - 1 : 0), m = 1; m < i; m++)
          d[m - 1] = arguments[m];
        $("error", e, d);
      }
    }
    function $(e, i, d) {
      {
        var m = E.ReactDebugCurrentFrame, T = m.getStackAddendum();
        T !== "" && (i += "%s", d = d.concat([T]));
        var k = d.map(function(y) {
          return String(y);
        });
        k.unshift("Warning: " + i), Function.prototype.apply.call(console[e], console, k);
      }
    }
    var J = !1, Z = !1, te = !1, ce = !1, K = !1, F;
    F = Symbol.for("react.module.reference");
    function V(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === n || e === a || K || e === c || e === p || e === u || ce || e === S || J || Z || te || typeof e == "object" && e !== null && (e.$$typeof === g || e.$$typeof === h || e.$$typeof === s || e.$$typeof === l || e.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === F || e.getModuleId !== void 0));
    }
    function oe(e, i, d) {
      var m = e.displayName;
      if (m)
        return m;
      var T = i.displayName || i.name || "";
      return T !== "" ? d + "(" + T + ")" : d;
    }
    function C(e) {
      return e.displayName || "Context";
    }
    function W(e) {
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
        case a:
          return "Profiler";
        case c:
          return "StrictMode";
        case p:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            var i = e;
            return C(i) + ".Consumer";
          case s:
            var d = e;
            return C(d._context) + ".Provider";
          case f:
            return oe(e, e.render, "ForwardRef");
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
    var U = Object.assign, B = 0, X, ue, ne, H, Q, D, Re;
    function Se() {
    }
    Se.__reactDisabledLog = !0;
    function A() {
      {
        if (B === 0) {
          X = console.log, ue = console.info, ne = console.warn, H = console.error, Q = console.group, D = console.groupCollapsed, Re = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Se,
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
        B++;
      }
    }
    function de() {
      {
        if (B--, B === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: U({}, e, {
              value: X
            }),
            info: U({}, e, {
              value: ue
            }),
            warn: U({}, e, {
              value: ne
            }),
            error: U({}, e, {
              value: H
            }),
            group: U({}, e, {
              value: Q
            }),
            groupCollapsed: U({}, e, {
              value: D
            }),
            groupEnd: U({}, e, {
              value: Re
            })
          });
        }
        B < 0 && R("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var j = E.ReactCurrentDispatcher, ie;
    function G(e, i, d) {
      {
        if (ie === void 0)
          try {
            throw Error();
          } catch (T) {
            var m = T.stack.trim().match(/\n( *(at )?)/);
            ie = m && m[1] || "";
          }
        return `
` + ie + e;
      }
    }
    var Y = !1, he;
    {
      var ge = typeof WeakMap == "function" ? WeakMap : Map;
      he = new ge();
    }
    function se(e, i) {
      if (!e || Y)
        return "";
      {
        var d = he.get(e);
        if (d !== void 0)
          return d;
      }
      var m;
      Y = !0;
      var T = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var k;
      k = j.current, j.current = null, A();
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
            } catch (L) {
              m = L;
            }
            Reflect.construct(e, [], y);
          } else {
            try {
              y.call();
            } catch (L) {
              m = L;
            }
            e.call(y.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (L) {
            m = L;
          }
          e();
        }
      } catch (L) {
        if (L && m && typeof L.stack == "string") {
          for (var v = L.stack.split(`
`), z = m.stack.split(`
`), O = v.length - 1, N = z.length - 1; O >= 1 && N >= 0 && v[O] !== z[N]; )
            N--;
          for (; O >= 1 && N >= 0; O--, N--)
            if (v[O] !== z[N]) {
              if (O !== 1 || N !== 1)
                do
                  if (O--, N--, N < 0 || v[O] !== z[N]) {
                    var q = `
` + v[O].replace(" at new ", " at ");
                    return e.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", e.displayName)), typeof e == "function" && he.set(e, q), q;
                  }
                while (O >= 1 && N >= 0);
              break;
            }
        }
      } finally {
        Y = !1, j.current = k, de(), Error.prepareStackTrace = T;
      }
      var be = e ? e.displayName || e.name : "", pe = be ? G(be) : "";
      return typeof e == "function" && he.set(e, pe), pe;
    }
    function je(e, i, d) {
      return se(e, !1);
    }
    function Ce(e) {
      var i = e.prototype;
      return !!(i && i.isReactComponent);
    }
    function fe(e, i, d) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return se(e, Ce(e));
      if (typeof e == "string")
        return G(e);
      switch (e) {
        case p:
          return G("Suspense");
        case u:
          return G("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            return je(e.render);
          case h:
            return fe(e.type, i, d);
          case g: {
            var m = e, T = m._payload, k = m._init;
            try {
              return fe(k(T), i, d);
            } catch {
            }
          }
        }
      return "";
    }
    var Te = Object.prototype.hasOwnProperty, Ge = {}, Ye = E.ReactDebugCurrentFrame;
    function Pe(e) {
      if (e) {
        var i = e._owner, d = fe(e.type, e._source, i ? i.type : null);
        Ye.setExtraStackFrame(d);
      } else
        Ye.setExtraStackFrame(null);
    }
    function Er(e, i, d, m, T) {
      {
        var k = Function.call.bind(Te);
        for (var y in e)
          if (k(e, y)) {
            var v = void 0;
            try {
              if (typeof e[y] != "function") {
                var z = Error((m || "React class") + ": " + d + " type `" + y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[y] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw z.name = "Invariant Violation", z;
              }
              v = e[y](i, y, m, d, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (O) {
              v = O;
            }
            v && !(v instanceof Error) && (Pe(T), R("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", d, y, typeof v), Pe(null)), v instanceof Error && !(v.message in Ge) && (Ge[v.message] = !0, Pe(T), R("Failed %s type: %s", d, v.message), Pe(null));
          }
      }
    }
    var Ar = Array.isArray;
    function Me(e) {
      return Ar(e);
    }
    function kr(e) {
      {
        var i = typeof Symbol == "function" && Symbol.toStringTag, d = i && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return d;
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
        return R("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", kr(e)), qe(e);
    }
    var Ke = E.ReactCurrentOwner, Ir = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Xe, He;
    function jr(e) {
      if (Te.call(e, "ref")) {
        var i = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Pr(e) {
      if (Te.call(e, "key")) {
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
        var d = function() {
          Xe || (Xe = !0, R("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        d.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: d,
          configurable: !0
        });
      }
    }
    function Mr(e, i) {
      {
        var d = function() {
          He || (He = !0, R("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        d.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: d,
          configurable: !0
        });
      }
    }
    var Fr = function(e, i, d, m, T, k, y) {
      var v = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: e,
        key: i,
        ref: d,
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
    function Ur(e, i, d, m, T) {
      {
        var k, y = {}, v = null, z = null;
        d !== void 0 && (Je(d), v = "" + d), Pr(i) && (Je(i.key), v = "" + i.key), jr(i) && (z = i.ref, Or(i, T));
        for (k in i)
          Te.call(i, k) && !Ir.hasOwnProperty(k) && (y[k] = i[k]);
        if (e && e.defaultProps) {
          var O = e.defaultProps;
          for (k in O)
            y[k] === void 0 && (y[k] = O[k]);
        }
        if (v || z) {
          var N = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          v && Nr(y, N), z && Mr(y, N);
        }
        return Fr(e, v, z, T, m, Ke.current, y);
      }
    }
    var Fe = E.ReactCurrentOwner, Ze = E.ReactDebugCurrentFrame;
    function me(e) {
      if (e) {
        var i = e._owner, d = fe(e.type, e._source, i ? i.type : null);
        Ze.setExtraStackFrame(d);
      } else
        Ze.setExtraStackFrame(null);
    }
    var Ue;
    Ue = !1;
    function ze(e) {
      return typeof e == "object" && e !== null && e.$$typeof === t;
    }
    function Qe() {
      {
        if (Fe.current) {
          var e = W(Fe.current.type);
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
    function Wr(e) {
      {
        var i = Qe();
        if (!i) {
          var d = typeof e == "string" ? e : e.displayName || e.name;
          d && (i = `

Check the top-level render call using <` + d + ">.");
        }
        return i;
      }
    }
    function rr(e, i) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var d = Wr(i);
        if (er[d])
          return;
        er[d] = !0;
        var m = "";
        e && e._owner && e._owner !== Fe.current && (m = " It was passed a child from " + W(e._owner.type) + "."), me(e), R('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', d, m), me(null);
      }
    }
    function tr(e, i) {
      {
        if (typeof e != "object")
          return;
        if (Me(e))
          for (var d = 0; d < e.length; d++) {
            var m = e[d];
            ze(m) && rr(m, i);
          }
        else if (ze(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var T = w(e);
          if (typeof T == "function" && T !== e.entries)
            for (var k = T.call(e), y; !(y = k.next()).done; )
              ze(y.value) && rr(y.value, i);
        }
      }
    }
    function Dr(e) {
      {
        var i = e.type;
        if (i == null || typeof i == "string")
          return;
        var d;
        if (typeof i == "function")
          d = i.propTypes;
        else if (typeof i == "object" && (i.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        i.$$typeof === h))
          d = i.propTypes;
        else
          return;
        if (d) {
          var m = W(i);
          Er(d, e.props, "prop", m, e);
        } else if (i.PropTypes !== void 0 && !Ue) {
          Ue = !0;
          var T = W(i);
          R("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", T || "Unknown");
        }
        typeof i.getDefaultProps == "function" && !i.getDefaultProps.isReactClassApproved && R("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Lr(e) {
      {
        for (var i = Object.keys(e.props), d = 0; d < i.length; d++) {
          var m = i[d];
          if (m !== "children" && m !== "key") {
            me(e), R("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), me(null);
            break;
          }
        }
        e.ref !== null && (me(e), R("Invalid attribute `ref` supplied to `React.Fragment`."), me(null));
      }
    }
    var or = {};
    function nr(e, i, d, m, T, k) {
      {
        var y = V(e);
        if (!y) {
          var v = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var z = zr();
          z ? v += z : v += Qe();
          var O;
          e === null ? O = "null" : Me(e) ? O = "array" : e !== void 0 && e.$$typeof === t ? (O = "<" + (W(e.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : O = typeof e, R("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, v);
        }
        var N = Ur(e, i, d, T, k);
        if (N == null)
          return N;
        if (y) {
          var q = i.children;
          if (q !== void 0)
            if (m)
              if (Me(q)) {
                for (var be = 0; be < q.length; be++)
                  tr(q[be], e);
                Object.freeze && Object.freeze(q);
              } else
                R("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              tr(q, e);
        }
        if (Te.call(i, "key")) {
          var pe = W(e), L = Object.keys(i).filter(function(qr) {
            return qr !== "key";
          }), We = L.length > 0 ? "{key: someKey, " + L.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!or[pe + We]) {
            var Yr = L.length > 0 ? "{" + L.join(": ..., ") + ": ...}" : "{}";
            R(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, We, pe, Yr, pe), or[pe + We] = !0;
          }
        }
        return e === n ? Lr(N) : Dr(N), N;
      }
    }
    function $r(e, i, d) {
      return nr(e, i, d, !0);
    }
    function Vr(e, i, d) {
      return nr(e, i, d, !1);
    }
    var Br = Vr, Gr = $r;
    Ae.Fragment = n, Ae.jsx = Br, Ae.jsxs = Gr;
  }()), Ae;
}
var ar;
function it() {
  return ar || (ar = 1, process.env.NODE_ENV === "production" ? Oe.exports = ot() : Oe.exports = nt()), Oe.exports;
}
var I = it();
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
  const { variants: c, defaultVariants: a } = t, s = Object.keys(c).map((p) => {
    const u = o == null ? void 0 : o[p], h = a == null ? void 0 : a[p];
    if (u === null) return null;
    const g = lr(u) || lr(h);
    return c[p][g];
  }), l = o && Object.entries(o).reduce((p, u) => {
    let [h, g] = u;
    return g === void 0 || (p[h] = g), p;
  }, {}), f = t == null || (n = t.compoundVariants) === null || n === void 0 ? void 0 : n.reduce((p, u) => {
    let { class: h, className: g, ...S } = u;
    return Object.entries(S).every((P) => {
      let [x, w] = P;
      return Array.isArray(w) ? w.includes({
        ...a,
        ...l
      }[x]) : {
        ...a,
        ...l
      }[x] === w;
    }) ? [
      ...p,
      h,
      g
    ] : p;
  }, []);
  return cr(r, s, f, o == null ? void 0 : o.class, o == null ? void 0 : o.className);
}, Ve = "-", at = (r) => {
  const t = ct(r), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: n
  } = r;
  return {
    getClassGroupId: (s) => {
      const l = s.split(Ve);
      return l[0] === "" && l.length !== 1 && l.shift(), xr(l, t) || lt(s);
    },
    getConflictingClassGroupIds: (s, l) => {
      const f = o[s] || [];
      return l && n[s] ? [...f, ...n[s]] : f;
    }
  };
}, xr = (r, t) => {
  var s;
  if (r.length === 0)
    return t.classGroupId;
  const o = r[0], n = t.nextPart.get(o), c = n ? xr(r.slice(1), n) : void 0;
  if (c)
    return c;
  if (t.validators.length === 0)
    return;
  const a = r.join(Ve);
  return (s = t.validators.find(({
    validator: l
  }) => l(a))) == null ? void 0 : s.classGroupId;
}, ur = /^\[(.+)\]$/, lt = (r) => {
  if (ur.test(r)) {
    const t = ur.exec(r)[1], o = t == null ? void 0 : t.substring(0, t.indexOf(":"));
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
  return dt(Object.entries(r.classGroups), o).forEach(([a, s]) => {
    $e(s, n, a, t);
  }), n;
}, $e = (r, t, o, n) => {
  r.forEach((c) => {
    if (typeof c == "string") {
      const a = c === "" ? t : dr(t, c);
      a.classGroupId = o;
      return;
    }
    if (typeof c == "function") {
      if (ut(c)) {
        $e(c(n), t, o, n);
        return;
      }
      t.validators.push({
        validator: c,
        classGroupId: o
      });
      return;
    }
    Object.entries(c).forEach(([a, s]) => {
      $e(s, dr(t, a), o, n);
    });
  });
}, dr = (r, t) => {
  let o = r;
  return t.split(Ve).forEach((n) => {
    o.nextPart.has(n) || o.nextPart.set(n, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(n);
  }), o;
}, ut = (r) => r.isThemeGetter, dt = (r, t) => t ? r.map(([o, n]) => {
  const c = n.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([s, l]) => [t + s, l])) : a);
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
  const c = (a, s) => {
    o.set(a, s), t++, t > r && (t = 0, n = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let s = o.get(a);
      if (s !== void 0)
        return s;
      if ((s = n.get(a)) !== void 0)
        return c(a, s), s;
    },
    set(a, s) {
      o.has(a) ? o.set(a, s) : c(a, s);
    }
  };
}, wr = "!", pt = (r) => {
  const {
    separator: t,
    experimentalParseClassName: o
  } = r, n = t.length === 1, c = t[0], a = t.length, s = (l) => {
    const f = [];
    let p = 0, u = 0, h;
    for (let w = 0; w < l.length; w++) {
      let E = l[w];
      if (p === 0) {
        if (E === c && (n || l.slice(w, w + a) === t)) {
          f.push(l.slice(u, w)), u = w + a;
          continue;
        }
        if (E === "/") {
          h = w;
          continue;
        }
      }
      E === "[" ? p++ : E === "]" && p--;
    }
    const g = f.length === 0 ? l : l.substring(u), S = g.startsWith(wr), P = S ? g.substring(1) : g, x = h && h > u ? h - u : void 0;
    return {
      modifiers: f,
      hasImportantModifier: S,
      baseClassName: P,
      maybePostfixModifierPosition: x
    };
  };
  return o ? (l) => o({
    className: l,
    parseClassName: s
  }) : s;
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
  } = t, a = [], s = r.trim().split(mt);
  let l = "";
  for (let f = s.length - 1; f >= 0; f -= 1) {
    const p = s[f], {
      modifiers: u,
      hasImportantModifier: h,
      baseClassName: g,
      maybePostfixModifierPosition: S
    } = o(p);
    let P = !!S, x = n(P ? g.substring(0, S) : g);
    if (!x) {
      if (!P) {
        l = p + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (x = n(g), !x) {
        l = p + (l.length > 0 ? " " + l : l);
        continue;
      }
      P = !1;
    }
    const w = ht(u).join(":"), E = h ? w + wr : w, R = E + x;
    if (a.includes(R))
      continue;
    a.push(R);
    const $ = c(x, P);
    for (let J = 0; J < $.length; ++J) {
      const Z = $[J];
      a.push(E + Z);
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
  let o, n, c, a = s;
  function s(f) {
    const p = t.reduce((u, h) => h(u), r());
    return o = gt(p), n = o.cache.get, c = o.cache.set, a = l, l(f);
  }
  function l(f) {
    const p = n(f);
    if (p)
      return p;
    const u = bt(f, o);
    return c(f, u), u;
  }
  return function() {
    return a(vt.apply(null, arguments));
  };
}
const _ = (r) => {
  const t = (o) => o[r] || [];
  return t.isThemeGetter = !0, t;
}, Sr = /^\[(?:([a-z-]+):)?(.+)\]$/i, xt = /^\d+\/\d+$/, wt = /* @__PURE__ */ new Set(["px", "full", "screen"]), Rt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, St = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ct = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Tt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Et = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ee = (r) => xe(r) || wt.has(r) || xt.test(r), ae = (r) => we(r, "length", Nt), xe = (r) => !!r && !Number.isNaN(Number(r)), Le = (r) => we(r, "number", xe), ke = (r) => !!r && Number.isInteger(Number(r)), At = (r) => r.endsWith("%") && xe(r.slice(0, -1)), b = (r) => Sr.test(r), le = (r) => Rt.test(r), kt = /* @__PURE__ */ new Set(["length", "size", "percentage"]), _t = (r) => we(r, kt, Cr), It = (r) => we(r, "position", Cr), jt = /* @__PURE__ */ new Set(["image", "url"]), Pt = (r) => we(r, jt, Ft), Ot = (r) => we(r, "", Mt), _e = () => !0, we = (r, t, o) => {
  const n = Sr.exec(r);
  return n ? n[1] ? typeof t == "string" ? n[1] === t : t.has(n[1]) : o(n[2]) : !1;
}, Nt = (r) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  St.test(r) && !Ct.test(r)
), Cr = () => !1, Mt = (r) => Tt.test(r), Ft = (r) => Et.test(r), Ut = () => {
  const r = _("colors"), t = _("spacing"), o = _("blur"), n = _("brightness"), c = _("borderColor"), a = _("borderRadius"), s = _("borderSpacing"), l = _("borderWidth"), f = _("contrast"), p = _("grayscale"), u = _("hueRotate"), h = _("invert"), g = _("gap"), S = _("gradientColorStops"), P = _("gradientColorStopPositions"), x = _("inset"), w = _("margin"), E = _("opacity"), R = _("padding"), $ = _("saturate"), J = _("scale"), Z = _("sepia"), te = _("skew"), ce = _("space"), K = _("translate"), F = () => ["auto", "contain", "none"], V = () => ["auto", "hidden", "clip", "visible", "scroll"], oe = () => ["auto", b, t], C = () => [b, t], W = () => ["", ee, ae], U = () => ["auto", xe, b], B = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], X = () => ["solid", "dashed", "dotted", "double", "none"], ue = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ne = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], H = () => ["", "0", b], Q = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], D = () => [xe, b];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [_e],
      spacing: [ee, ae],
      blur: ["none", "", le, b],
      brightness: D(),
      borderColor: [r],
      borderRadius: ["none", "", "full", le, b],
      borderSpacing: C(),
      borderWidth: W(),
      contrast: D(),
      grayscale: H(),
      hueRotate: D(),
      invert: H(),
      gap: C(),
      gradientColorStops: [r],
      gradientColorStopPositions: [At, ae],
      inset: oe(),
      margin: oe(),
      opacity: D(),
      padding: C(),
      saturate: D(),
      scale: D(),
      sepia: H(),
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
        "break-after": Q()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": Q()
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
        object: [...B(), b]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: V()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": V()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": V()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: F()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": F()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": F()
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
        inset: [x]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [x]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [x]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [x]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [x]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [x]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [x]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [x]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [x]
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
        z: ["auto", ke, b]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: oe()
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
        grow: H()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: H()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", ke, b]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [_e]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", ke, b]
        }, b]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": U()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": U()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [_e]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [ke, b]
        }, b]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": U()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": U()
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
        justify: ["normal", ...ne()]
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
        content: ["normal", ...ne(), "baseline"]
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
        "place-content": [...ne(), "baseline"]
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
        m: [w]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [w]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [w]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [w]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [w]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [w]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [w]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [w]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [w]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Le]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [_e]
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
        "line-clamp": ["none", xe, Le]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ee, b]
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
        decoration: [...X(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", ee, ae]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", ee, b]
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
        bg: [...B(), It]
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
        from: [P]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [P]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [P]
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
        rounded: [a]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [a]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [a]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [a]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [a]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [a]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [a]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [a]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [a]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [a]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [a]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [a]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [a]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [a]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [a]
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
        border: [...X(), "hidden"]
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
        divide: X()
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
        outline: ["", ...X()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ee, b]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [ee, ae]
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
        "ring-opacity": [E]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [ee, ae]
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
        shadow: [_e]
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
        "mix-blend": [...ue(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ue()
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
        "hue-rotate": [u]
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
        saturate: [$]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [Z]
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
        "backdrop-hue-rotate": [u]
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
        "backdrop-saturate": [$]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [Z]
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
        "border-spacing": [s]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [s]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [s]
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
        duration: D()
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
        delay: D()
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
        scale: [J]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [J]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [J]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [ke, b]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [K]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [K]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [te]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [te]
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
        stroke: [ee, ae, Le]
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
function Ie(...r) {
  return zt(yr(r));
}
const Wt = st(
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
  ({ className: r, variant: t, size: o, asChild: n = !1, ...c }, a) => {
    const s = n ? Xr : "button";
    return /* @__PURE__ */ I.jsx(
      s,
      {
        className: Ie(Wt({ variant: t, size: o, className: r })),
        ref: a,
        ...c
      }
    );
  }
);
Be.displayName = "Button";
const Tr = mr.forwardRef(
  ({ className: r, ...t }, o) => /* @__PURE__ */ I.jsx(
    "textarea",
    {
      className: Ie(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        r
      ),
      ref: o,
      ...t
    }
  )
);
Tr.displayName = "Textarea";
const Dt = ({
  initialText: r,
  onTextChange: t,
  placeholder: o = "Type here...",
  className: n
}) => {
  const [c, a] = re(r), [s, l] = re(!1);
  ye(() => {
    s || a(r);
  }, [r, s]);
  const f = (u) => {
    a(u.target.value), s || l(!0);
  }, p = () => {
    t(c), l(!1);
  };
  return /* @__PURE__ */ I.jsxs("div", { className: `flex flex-col space-y-2 ${n}`, children: [
    /* @__PURE__ */ I.jsx(
      Tr,
      {
        value: c,
        onChange: f,
        onBlur: p,
        placeholder: o,
        className: "w-full min-h-[60px] text-base",
        rows: 3
      }
    ),
    s && /* @__PURE__ */ I.jsxs(Be, { onClick: p, size: "sm", className: "self-end", children: [
      /* @__PURE__ */ I.jsx(Hr, { className: "w-4 h-4 mr-2" }),
      "Save Text"
    ] })
  ] });
}, fr = ({
  audioData: r,
  color: t = "#3b82f6",
  // Default blue-500
  className: o,
  backgroundColor: n = "transparent"
  // Default transparent
}) => {
  const c = Ne(null);
  return ye(() => {
    const a = c.current;
    if (!a) return;
    const s = a.getContext("2d");
    if (!s) return;
    const { width: l, height: f } = a;
    if (s.clearRect(0, 0, l, f), s.fillStyle = n, s.fillRect(0, 0, l, f), !r || r.length === 0) {
      s.beginPath(), s.moveTo(0, f / 2), s.lineTo(l, f / 2), s.strokeStyle = t, s.lineWidth = 1, s.stroke();
      return;
    }
    s.lineWidth = 2, s.strokeStyle = t, s.beginPath();
    const p = l * 1 / r.length;
    let u = 0;
    for (let h = 0; h < r.length; h++) {
      const S = r[h] / 128 * f / 2;
      h === 0 ? s.moveTo(u, S) : s.lineTo(u, S), u += p;
    }
    s.lineTo(l, f / 2), s.stroke();
  }, [r, t, n]), /* @__PURE__ */ I.jsx(
    "canvas",
    {
      ref: c,
      className: Ie("w-full h-16 rounded-md", o),
      width: 300,
      height: 64
    }
  );
}, Lt = 3e3, $t = 5e3;
class Vt {
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
      silenceTimeout: t.silenceTimeout ?? Lt,
      initialSpeechTimeout: t.initialSpeechTimeout ?? $t,
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
        for (let a = o.resultIndex; a < o.results.length; ++a) {
          const s = o.results[a][0].transcript;
          o.results[a].isFinal ? c += s : n += s;
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
  const { sampleRate: c, length: a } = r;
  if (a === 0) return 0;
  const s = Math.floor(c * n), l = Math.ceil(t / n), f = r.getChannelData(0);
  let p = Math.floor(a / s) - 1, u = 0;
  for (let g = Math.floor(a / s) - 1; g >= 0; g--) {
    const S = g * s, P = Math.min(S + s, a);
    let x = 0;
    for (let w = S; w < P; w++) {
      const E = Math.abs(f[w]);
      E > x && (x = E);
    }
    if (x < o)
      g === Math.floor(a / s) - 1 - u && u++;
    else {
      p = g;
      break;
    }
  }
  let h = (p + 1) * s / c;
  if (h = Math.min(h, r.duration), console.log(`AudioUtils: Initial lastSoundTime: ${h.toFixed(2)}s. Consecutive silent chunks at end: ${u}`), u >= l) {
    const g = a / c - u * n;
    return console.log(`AudioUtils: Sufficient trailing silence detected. Sound considered to end at: ${g.toFixed(2)}s`), g;
  } else
    return console.log(`AudioUtils: Not enough trailing silence (found ${u * n}s, need ${t}s). Returning original duration or end of last detected sound.`), r.duration;
}
function Yt(r, t) {
  const { sampleRate: o, numberOfChannels: n, length: c } = r, a = Math.max(0.01, t), s = Math.floor(a * o);
  if (s <= 0 || s > c)
    return console.error("AudioUtils: Invalid new duration for trimming.", a, "Original:", r.duration, "Attempted samples:", s, "Original samples:", c), r;
  if (Math.abs(r.duration - a) < 0.01)
    return console.log("AudioUtils: Trim duration very close to original. Returning original buffer."), r;
  try {
    const l = new (window.AudioContext || window.webkitAudioContext)(), f = l.createBuffer(
      n,
      s,
      o
    );
    for (let p = 0; p < n; p++) {
      const u = r.getChannelData(p);
      f.getChannelData(p).set(u.subarray(0, s));
    }
    return l.close(), console.log(`AudioUtils: Trimmed AudioBuffer from ${r.duration.toFixed(2)}s to ${f.duration.toFixed(2)}s`), f;
  } catch (l) {
    return console.error("AudioUtils: Error trimming AudioBuffer:", l), null;
  }
}
function qt(r) {
  const t = r.numberOfChannels, o = t, n = r.length * t * 2 + 44, c = new ArrayBuffer(n), a = new DataView(c), s = [];
  let l = 0, f = 0, p = 0;
  function u(g) {
    a.setUint16(p, g, !0), p += 2;
  }
  function h(g) {
    a.setUint32(p, g, !0), p += 4;
  }
  for (h(1179011410), h(n - 8), h(1163280727), h(544501094), h(16), u(1), u(o), h(r.sampleRate), h(r.sampleRate * 2 * o), u(o * 2), u(16), h(1635017060), h(n - p - 4), l = 0; l < o; l++)
    s.push(r.getChannelData(l));
  for (let g = 0; g < r.length; g++)
    for (let S = 0; S < t; S++)
      f = Math.max(-1, Math.min(1, s[S][g])), a.setInt16(p, f * 32767, !0), p += 2;
  return console.log("AudioUtils: Encoded AudioBuffer to WAV Blob."), new Blob([a], { type: "audio/wav" });
}
const Jt = "0.1.63", Kt = {
  version: Jt
}, pr = "stop recording", hr = 0.75, Xt = 3e3, Ht = 5e3, gr = (r) => r ? r.charAt(0).toUpperCase() + r.slice(1) : "", oo = ({
  onSave: r,
  initialText: t = "",
  showWaveform: o = !0,
  showInterimTranscript: n = !0,
  customWaveformColor: c,
  placeholder: a = "Speak or type here...",
  disabled: s = !1,
  silenceTimeout: l = Xt,
  initialSpeechTimeout: f = Ht,
  showVersionInfo: p = !0
}) => {
  const [u, h] = re("idle"), [g, S] = re(""), [P, x] = re(t), [w, E] = re(null), [R, $] = re(null), [J, Z] = re(null), [te, ce] = re(null), K = Ne(null), F = Ne(""), V = Ne(u);
  ye(() => {
    V.current = u;
  }, [u]);
  const oe = ve((A) => {
    const de = A.trim();
    if (!de) return;
    let j = F.current;
    if (!j)
      F.current = gr(de);
    else {
      const ie = j.slice(-1), G = [".", "!", "?"].includes(ie), Y = j.endsWith(" ");
      !G && !Y ? j += ". " : G && !Y && (j += " "), F.current = j + gr(de);
    }
    F.current = F.current.trim(), V.current === "recording" && x(F.current);
  }, []), C = ve((A) => {
    n && S(A);
  }, [n]), W = ve(() => {
    h("recording"), $(null), S(""), F.current = "", x(""), Z(null), ce((A) => (A && URL.revokeObjectURL(A), null));
  }, []), U = ve(async (A, de) => {
    let j = F.current.trim();
    j && ![".", "!", "?"].includes(j.slice(-1)) && (j += "."), h("idle"), S("");
    let ie = !1, G = A, Y = de;
    if (j.toLowerCase().endsWith(pr + ".") && A) {
      const he = pr + ".", ge = j.toLowerCase().lastIndexOf(he);
      if (ge === 0 || ge > 0 && j[ge - 1] === " ") {
        j = j.substring(0, ge).trim(), ie = !0;
        const se = await Bt(A);
        if (se) {
          const je = Gt(se.audioBuffer, hr);
          if (je < se.duration - hr / 2) {
            const Ce = Yt(se.audioBuffer, je);
            if (Ce && Ce !== se.audioBuffer) {
              const fe = qt(Ce);
              Y && URL.revokeObjectURL(Y), G = fe, Y = URL.createObjectURL(fe);
            }
          }
        }
      }
    }
    x(j), Z(G), ce(Y), j || G ? r(j, G, Y) : ie || x("");
  }, [r]), B = ve((A) => {
    h("error"), $(A), S(""), E(null), De.error(A || "An unknown recording error occurred.", { duration: 5e3 }), F.current = "";
  }, []), X = ve((A) => {
    o && E(new Uint8Array(A));
  }, [o]);
  ye(() => {
    const A = new Vt({
      onFinalTranscript: oe,
      onInterimTranscript: C,
      onRecordingStart: W,
      onRecordingStop: U,
      onError: B,
      onAudioData: X,
      silenceTimeout: l,
      initialSpeechTimeout: f
    });
    return K.current = A, () => {
      A.dispose(), K.current = null;
    };
  }, [oe, C, W, U, B, X, l, f]), ye(() => {
    V.current !== "recording" && V.current !== "listening" && t !== P && x(t);
  }, [t, P]), ye(() => {
    const A = te;
    return () => {
      A && URL.revokeObjectURL(A);
    };
  }, [te]);
  const ue = async () => {
    if (!s) {
      if (!K.current) {
        De.error("Recorder not ready. Please try again.");
        return;
      }
      if (V.current === "recording" || V.current === "listening")
        K.current.stopRecording("manual");
      else {
        $(null), h("listening");
        try {
          await K.current.startRecording();
        } catch (A) {
          B(A.message || "Failed to start recording."), h("idle");
        }
      }
    }
  }, ne = (A) => {
    x(A), r(A, J, te), De.success("Text saved manually!");
  }, H = () => {
    $(null), h("idle");
  }, Q = u === "recording" || u === "listening", D = () => u === "error" ? /* @__PURE__ */ I.jsx(et, { className: "w-4 h-4" }) : Q ? /* @__PURE__ */ I.jsx(rt, { className: "w-4 h-4" }) : /* @__PURE__ */ I.jsx(tt, { className: "w-4 h-4" }), Re = () => u === "error" ? "Retry" : u === "listening" ? "Listening..." : u === "recording" ? "Stop Recording" : "Record", Se = Kt.version;
  return /* @__PURE__ */ I.jsxs("div", { className: Ie("relative p-3 sm:p-4 border rounded-lg shadow-sm bg-card w-full max-w-2xl mx-auto space-y-3", { "opacity-75 cursor-not-allowed": s }), children: [
    p && Se && /* @__PURE__ */ I.jsxs("div", { className: "absolute top-2 right-2 flex items-center space-x-1 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ I.jsx(Zr, { className: "w-3 h-3" }),
      /* @__PURE__ */ I.jsxs("span", { children: [
        "v",
        Se
      ] })
    ] }),
    /* @__PURE__ */ I.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-4", children: [
      /* @__PURE__ */ I.jsxs(
        Be,
        {
          onClick: u === "error" ? H : ue,
          disabled: s && u !== "error",
          className: Ie("flex-shrink-0 w-full sm:w-auto", u === "error" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""),
          "aria-label": Re(),
          children: [
            D(),
            /* @__PURE__ */ I.jsx("span", { className: "ml-2", children: Re() })
          ]
        }
      ),
      /* @__PURE__ */ I.jsx("div", { className: "flex-grow w-full", children: /* @__PURE__ */ I.jsx(
        Dt,
        {
          initialText: P,
          onTextChange: ne,
          placeholder: a,
          className: "w-full"
        }
      ) })
    ] }),
    u === "error" && R && /* @__PURE__ */ I.jsxs("div", { className: "flex items-center p-2 text-sm text-destructive-foreground bg-destructive rounded-md", children: [
      /* @__PURE__ */ I.jsx(Qr, { className: "w-4 h-4 mr-2 flex-shrink-0" }),
      " ",
      /* @__PURE__ */ I.jsxs("span", { children: [
        "Error: ",
        R
      ] })
    ] }),
    n && Q && g && /* @__PURE__ */ I.jsx("div", { className: "p-2 text-sm text-muted-foreground bg-muted/30 rounded-md min-h-[2.5rem] italic", children: g }),
    o && Q && /* @__PURE__ */ I.jsx(fr, { audioData: w, color: c, className: "w-full h-16" }),
    o && u === "idle" && !R && /* @__PURE__ */ I.jsx(fr, { audioData: null, color: c, className: "w-full h-16" })
  ] });
};
export {
  oo as VoiceInputCapture
};
//# sourceMappingURL=react-voice-input.es.js.map

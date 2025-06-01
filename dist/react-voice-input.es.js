var Jr = Object.defineProperty;
var Kr = (r, t, o) => t in r ? Jr(r, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : r[t] = o;
var M = (r, t, o) => Kr(r, typeof t != "symbol" ? t + "" : t, o);
import * as mr from "react";
import br, { useState as oe, useEffect as xe, useRef as Me, useCallback as ye } from "react";
import { Slot as Xr } from "@radix-ui/react-slot";
import { Info as Hr, Save as Zr, AlertTriangle as Qr, RotateCcw as et, StopCircle as rt, Mic as tt } from "lucide-react";
import { toast as Le } from "sonner";
var Ne = { exports: {} }, Ce = {};
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
    var u, h = {}, g = null, S = null;
    p !== void 0 && (g = "" + p), f.key !== void 0 && (g = "" + f.key), f.ref !== void 0 && (S = f.ref);
    for (u in f) n.call(f, u) && !s.hasOwnProperty(u) && (h[u] = f[u]);
    if (l && l.defaultProps) for (u in f = l.defaultProps, f) h[u] === void 0 && (h[u] = f[u]);
    return { $$typeof: t, type: l, key: g, ref: S, props: h, _owner: c.current };
  }
  return Ce.Fragment = o, Ce.jsx = a, Ce.jsxs = a, Ce;
}
var Te = {};
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
    var r = br, t = Symbol.for("react.element"), o = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), l = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), O = Symbol.iterator, w = "@@iterator";
    function R(e) {
      if (e === null || typeof e != "object")
        return null;
      var i = O && e[O] || e[w];
      return typeof i == "function" ? i : null;
    }
    var A = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(e) {
      {
        for (var i = arguments.length, d = new Array(i > 1 ? i - 1 : 0), m = 1; m < i; m++)
          d[m - 1] = arguments[m];
        $("error", e, d);
      }
    }
    function $(e, i, d) {
      {
        var m = A.ReactDebugCurrentFrame, E = m.getStackAddendum();
        E !== "" && (i += "%s", d = d.concat([E]));
        var k = d.map(function(x) {
          return String(x);
        });
        k.unshift("Warning: " + i), Function.prototype.apply.call(console[e], console, k);
      }
    }
    var G = !1, H = !1, ne = !1, ce = !1, q = !1, F;
    F = Symbol.for("react.module.reference");
    function ie(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === n || e === s || q || e === c || e === p || e === u || ce || e === S || G || H || ne || typeof e == "object" && e !== null && (e.$$typeof === g || e.$$typeof === h || e.$$typeof === a || e.$$typeof === l || e.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === F || e.getModuleId !== void 0));
    }
    function ue(e, i, d) {
      var m = e.displayName;
      if (m)
        return m;
      var E = i.displayName || i.name || "";
      return E !== "" ? d + "(" + E + ")" : d;
    }
    function y(e) {
      return e.displayName || "Context";
    }
    function W(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
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
        case u:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            var i = e;
            return y(i) + ".Consumer";
          case a:
            var d = e;
            return y(d._context) + ".Provider";
          case f:
            return ue(e, e.render, "ForwardRef");
          case h:
            var m = e.displayName || null;
            return m !== null ? m : W(e.type) || "Memo";
          case g: {
            var E = e, k = E._payload, x = E._init;
            try {
              return W(x(k));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var U = Object.assign, Y = 0, J, Z, Q, K, de, D, ge;
    function _e() {
    }
    _e.__reactDisabledLog = !0;
    function Ie() {
      {
        if (Y === 0) {
          J = console.log, Z = console.info, Q = console.warn, K = console.error, de = console.group, D = console.groupCollapsed, ge = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: _e,
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
        Y++;
      }
    }
    function je() {
      {
        if (Y--, Y === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: U({}, e, {
              value: J
            }),
            info: U({}, e, {
              value: Z
            }),
            warn: U({}, e, {
              value: Q
            }),
            error: U({}, e, {
              value: K
            }),
            group: U({}, e, {
              value: de
            }),
            groupCollapsed: U({}, e, {
              value: D
            }),
            groupEnd: U({}, e, {
              value: ge
            })
          });
        }
        Y < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var T = A.ReactCurrentDispatcher, ee;
    function j(e, i, d) {
      {
        if (ee === void 0)
          try {
            throw Error();
          } catch (E) {
            var m = E.stack.trim().match(/\n( *(at )?)/);
            ee = m && m[1] || "";
          }
        return `
` + ee + e;
      }
    }
    var se = !1, V;
    {
      var X = typeof WeakMap == "function" ? WeakMap : Map;
      V = new X();
    }
    function Pe(e, i) {
      if (!e || se)
        return "";
      {
        var d = V.get(e);
        if (d !== void 0)
          return d;
      }
      var m;
      se = !0;
      var E = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var k;
      k = T.current, T.current = null, Ie();
      try {
        if (i) {
          var x = function() {
            throw Error();
          };
          if (Object.defineProperty(x.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(x, []);
            } catch (L) {
              m = L;
            }
            Reflect.construct(e, [], x);
          } else {
            try {
              x.call();
            } catch (L) {
              m = L;
            }
            e.call(x.prototype);
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
`), P = v.length - 1, N = z.length - 1; P >= 1 && N >= 0 && v[P] !== z[N]; )
            N--;
          for (; P >= 1 && N >= 0; P--, N--)
            if (v[P] !== z[N]) {
              if (P !== 1 || N !== 1)
                do
                  if (P--, N--, N < 0 || v[P] !== z[N]) {
                    var B = `
` + v[P].replace(" at new ", " at ");
                    return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), typeof e == "function" && V.set(e, B), B;
                  }
                while (P >= 1 && N >= 0);
              break;
            }
        }
      } finally {
        se = !1, T.current = k, je(), Error.prepareStackTrace = E;
      }
      var ve = e ? e.displayName || e.name : "", he = ve ? j(ve) : "";
      return typeof e == "function" && V.set(e, he), he;
    }
    function me(e, i, d) {
      return Pe(e, !1);
    }
    function fe(e) {
      var i = e.prototype;
      return !!(i && i.isReactComponent);
    }
    function pe(e, i, d) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Pe(e, fe(e));
      if (typeof e == "string")
        return j(e);
      switch (e) {
        case p:
          return j("Suspense");
        case u:
          return j("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            return me(e.render);
          case h:
            return pe(e.type, i, d);
          case g: {
            var m = e, E = m._payload, k = m._init;
            try {
              return pe(k(E), i, d);
            } catch {
            }
          }
        }
      return "";
    }
    var re = Object.prototype.hasOwnProperty, Se = {}, Ye = A.ReactDebugCurrentFrame;
    function Oe(e) {
      if (e) {
        var i = e._owner, d = pe(e.type, e._source, i ? i.type : null);
        Ye.setExtraStackFrame(d);
      } else
        Ye.setExtraStackFrame(null);
    }
    function Er(e, i, d, m, E) {
      {
        var k = Function.call.bind(re);
        for (var x in e)
          if (k(e, x)) {
            var v = void 0;
            try {
              if (typeof e[x] != "function") {
                var z = Error((m || "React class") + ": " + d + " type `" + x + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[x] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw z.name = "Invariant Violation", z;
              }
              v = e[x](i, x, m, d, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (P) {
              v = P;
            }
            v && !(v instanceof Error) && (Oe(E), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", d, x, typeof v), Oe(null)), v instanceof Error && !(v.message in Se) && (Se[v.message] = !0, Oe(E), C("Failed %s type: %s", d, v.message), Oe(null));
          }
      }
    }
    var Ar = Array.isArray;
    function Fe(e) {
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
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", kr(e)), qe(e);
    }
    var Ke = A.ReactCurrentOwner, Ir = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Xe, He;
    function jr(e) {
      if (re.call(e, "ref")) {
        var i = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Pr(e) {
      if (re.call(e, "key")) {
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
          Xe || (Xe = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
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
          He || (He = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        d.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: d,
          configurable: !0
        });
      }
    }
    var Fr = function(e, i, d, m, E, k, x) {
      var v = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: e,
        key: i,
        ref: d,
        props: x,
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
        value: E
      }), Object.freeze && (Object.freeze(v.props), Object.freeze(v)), v;
    };
    function Ur(e, i, d, m, E) {
      {
        var k, x = {}, v = null, z = null;
        d !== void 0 && (Je(d), v = "" + d), Pr(i) && (Je(i.key), v = "" + i.key), jr(i) && (z = i.ref, Or(i, E));
        for (k in i)
          re.call(i, k) && !Ir.hasOwnProperty(k) && (x[k] = i[k]);
        if (e && e.defaultProps) {
          var P = e.defaultProps;
          for (k in P)
            x[k] === void 0 && (x[k] = P[k]);
        }
        if (v || z) {
          var N = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          v && Nr(x, N), z && Mr(x, N);
        }
        return Fr(e, v, z, E, m, Ke.current, x);
      }
    }
    var Ue = A.ReactCurrentOwner, Ze = A.ReactDebugCurrentFrame;
    function be(e) {
      if (e) {
        var i = e._owner, d = pe(e.type, e._source, i ? i.type : null);
        Ze.setExtraStackFrame(d);
      } else
        Ze.setExtraStackFrame(null);
    }
    var ze;
    ze = !1;
    function We(e) {
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
        e && e._owner && e._owner !== Ue.current && (m = " It was passed a child from " + W(e._owner.type) + "."), be(e), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', d, m), be(null);
      }
    }
    function tr(e, i) {
      {
        if (typeof e != "object")
          return;
        if (Fe(e))
          for (var d = 0; d < e.length; d++) {
            var m = e[d];
            We(m) && rr(m, i);
          }
        else if (We(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var E = R(e);
          if (typeof E == "function" && E !== e.entries)
            for (var k = E.call(e), x; !(x = k.next()).done; )
              We(x.value) && rr(x.value, i);
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
        } else if (i.PropTypes !== void 0 && !ze) {
          ze = !0;
          var E = W(i);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", E || "Unknown");
        }
        typeof i.getDefaultProps == "function" && !i.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Lr(e) {
      {
        for (var i = Object.keys(e.props), d = 0; d < i.length; d++) {
          var m = i[d];
          if (m !== "children" && m !== "key") {
            be(e), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), be(null);
            break;
          }
        }
        e.ref !== null && (be(e), C("Invalid attribute `ref` supplied to `React.Fragment`."), be(null));
      }
    }
    var or = {};
    function nr(e, i, d, m, E, k) {
      {
        var x = ie(e);
        if (!x) {
          var v = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var z = zr();
          z ? v += z : v += Qe();
          var P;
          e === null ? P = "null" : Fe(e) ? P = "array" : e !== void 0 && e.$$typeof === t ? (P = "<" + (W(e.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : P = typeof e, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", P, v);
        }
        var N = Ur(e, i, d, E, k);
        if (N == null)
          return N;
        if (x) {
          var B = i.children;
          if (B !== void 0)
            if (m)
              if (Fe(B)) {
                for (var ve = 0; ve < B.length; ve++)
                  tr(B[ve], e);
                Object.freeze && Object.freeze(B);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              tr(B, e);
        }
        if (re.call(i, "key")) {
          var he = W(e), L = Object.keys(i).filter(function(qr) {
            return qr !== "key";
          }), De = L.length > 0 ? "{key: someKey, " + L.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!or[he + De]) {
            var Yr = L.length > 0 ? "{" + L.join(": ..., ") + ": ...}" : "{}";
            C(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, De, he, Yr, he), or[he + De] = !0;
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
    Te.Fragment = n, Te.jsx = Br, Te.jsxs = Gr;
  }()), Te;
}
var ar;
function it() {
  return ar || (ar = 1, process.env.NODE_ENV === "production" ? Ne.exports = ot() : Ne.exports = nt()), Ne.exports;
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
    const u = o == null ? void 0 : o[p], h = s == null ? void 0 : s[p];
    if (u === null) return null;
    const g = lr(u) || lr(h);
    return c[p][g];
  }), l = o && Object.entries(o).reduce((p, u) => {
    let [h, g] = u;
    return g === void 0 || (p[h] = g), p;
  }, {}), f = t == null || (n = t.compoundVariants) === null || n === void 0 ? void 0 : n.reduce((p, u) => {
    let { class: h, className: g, ...S } = u;
    return Object.entries(S).every((O) => {
      let [w, R] = O;
      return Array.isArray(R) ? R.includes({
        ...s,
        ...l
      }[w]) : {
        ...s,
        ...l
      }[w] === R;
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
  return dt(Object.entries(r.classGroups), o).forEach(([s, a]) => {
    Ve(a, n, s, t);
  }), n;
}, Ve = (r, t, o, n) => {
  r.forEach((c) => {
    if (typeof c == "string") {
      const s = c === "" ? t : dr(t, c);
      s.classGroupId = o;
      return;
    }
    if (typeof c == "function") {
      if (ut(c)) {
        Ve(c(n), t, o, n);
        return;
      }
      t.validators.push({
        validator: c,
        classGroupId: o
      });
      return;
    }
    Object.entries(c).forEach(([s, a]) => {
      Ve(a, dr(t, s), o, n);
    });
  });
}, dr = (r, t) => {
  let o = r;
  return t.split(Ge).forEach((n) => {
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
}, wr = "!", pt = (r) => {
  const {
    separator: t,
    experimentalParseClassName: o
  } = r, n = t.length === 1, c = t[0], s = t.length, a = (l) => {
    const f = [];
    let p = 0, u = 0, h;
    for (let R = 0; R < l.length; R++) {
      let A = l[R];
      if (p === 0) {
        if (A === c && (n || l.slice(R, R + s) === t)) {
          f.push(l.slice(u, R)), u = R + s;
          continue;
        }
        if (A === "/") {
          h = R;
          continue;
        }
      }
      A === "[" ? p++ : A === "]" && p--;
    }
    const g = f.length === 0 ? l : l.substring(u), S = g.startsWith(wr), O = S ? g.substring(1) : g, w = h && h > u ? h - u : void 0;
    return {
      modifiers: f,
      hasImportantModifier: S,
      baseClassName: O,
      maybePostfixModifierPosition: w
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
      modifiers: u,
      hasImportantModifier: h,
      baseClassName: g,
      maybePostfixModifierPosition: S
    } = o(p);
    let O = !!S, w = n(O ? g.substring(0, S) : g);
    if (!w) {
      if (!O) {
        l = p + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (w = n(g), !w) {
        l = p + (l.length > 0 ? " " + l : l);
        continue;
      }
      O = !1;
    }
    const R = ht(u).join(":"), A = h ? R + wr : R, C = A + w;
    if (s.includes(C))
      continue;
    s.push(C);
    const $ = c(w, O);
    for (let G = 0; G < $.length; ++G) {
      const H = $[G];
      s.push(A + H);
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
    const p = t.reduce((u, h) => h(u), r());
    return o = gt(p), n = o.cache.get, c = o.cache.set, s = l, l(f);
  }
  function l(f) {
    const p = n(f);
    if (p)
      return p;
    const u = bt(f, o);
    return c(f, u), u;
  }
  return function() {
    return s(vt.apply(null, arguments));
  };
}
const I = (r) => {
  const t = (o) => o[r] || [];
  return t.isThemeGetter = !0, t;
}, Sr = /^\[(?:([a-z-]+):)?(.+)\]$/i, xt = /^\d+\/\d+$/, wt = /* @__PURE__ */ new Set(["px", "full", "screen"]), Rt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, St = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ct = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Tt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Et = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, te = (r) => we(r) || wt.has(r) || xt.test(r), ae = (r) => Re(r, "length", Nt), we = (r) => !!r && !Number.isNaN(Number(r)), $e = (r) => Re(r, "number", we), Ee = (r) => !!r && Number.isInteger(Number(r)), At = (r) => r.endsWith("%") && we(r.slice(0, -1)), b = (r) => Sr.test(r), le = (r) => Rt.test(r), kt = /* @__PURE__ */ new Set(["length", "size", "percentage"]), _t = (r) => Re(r, kt, Cr), It = (r) => Re(r, "position", Cr), jt = /* @__PURE__ */ new Set(["image", "url"]), Pt = (r) => Re(r, jt, Ft), Ot = (r) => Re(r, "", Mt), Ae = () => !0, Re = (r, t, o) => {
  const n = Sr.exec(r);
  return n ? n[1] ? typeof t == "string" ? n[1] === t : t.has(n[1]) : o(n[2]) : !1;
}, Nt = (r) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  St.test(r) && !Ct.test(r)
), Cr = () => !1, Mt = (r) => Tt.test(r), Ft = (r) => Et.test(r), Ut = () => {
  const r = I("colors"), t = I("spacing"), o = I("blur"), n = I("brightness"), c = I("borderColor"), s = I("borderRadius"), a = I("borderSpacing"), l = I("borderWidth"), f = I("contrast"), p = I("grayscale"), u = I("hueRotate"), h = I("invert"), g = I("gap"), S = I("gradientColorStops"), O = I("gradientColorStopPositions"), w = I("inset"), R = I("margin"), A = I("opacity"), C = I("padding"), $ = I("saturate"), G = I("scale"), H = I("sepia"), ne = I("skew"), ce = I("space"), q = I("translate"), F = () => ["auto", "contain", "none"], ie = () => ["auto", "hidden", "clip", "visible", "scroll"], ue = () => ["auto", b, t], y = () => [b, t], W = () => ["", te, ae], U = () => ["auto", we, b], Y = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], J = () => ["solid", "dashed", "dotted", "double", "none"], Z = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Q = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], K = () => ["", "0", b], de = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], D = () => [we, b];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Ae],
      spacing: [te, ae],
      blur: ["none", "", le, b],
      brightness: D(),
      borderColor: [r],
      borderRadius: ["none", "", "full", le, b],
      borderSpacing: y(),
      borderWidth: W(),
      contrast: D(),
      grayscale: K(),
      hueRotate: D(),
      invert: K(),
      gap: y(),
      gradientColorStops: [r],
      gradientColorStopPositions: [At, ae],
      inset: ue(),
      margin: ue(),
      opacity: D(),
      padding: y(),
      saturate: D(),
      scale: D(),
      sepia: K(),
      skew: D(),
      space: y(),
      translate: y()
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
        object: [...Y(), b]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: ie()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": ie()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": ie()
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
        inset: [w]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [w]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [w]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [w]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [w]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [w]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [w]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [w]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [w]
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
        z: ["auto", Ee, b]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: ue()
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
        grow: K()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: K()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Ee, b]
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
          span: ["full", Ee, b]
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
        "grid-rows": [Ae]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Ee, b]
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
        justify: ["normal", ...Q()]
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
        content: ["normal", ...Q(), "baseline"]
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
        "place-content": [...Q(), "baseline"]
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
        p: [C]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [C]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [C]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [C]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [C]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [C]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [C]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [C]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [C]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [R]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [R]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [R]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [R]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [R]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [R]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [R]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [R]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [R]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", $e]
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
        "line-clamp": ["none", we, $e]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", te, b]
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
        decoration: [...J(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", te, ae]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", te, b]
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
        indent: y()
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
        bg: [...Y(), It]
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
        from: [O]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [O]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [O]
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
        border: [...J(), "hidden"]
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
        divide: J()
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
        outline: ["", ...J()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [te, b]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [te, ae]
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
        "ring-offset": [te, ae]
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
        "mix-blend": [...Z(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Z()
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
        sepia: [H]
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
        "backdrop-opacity": [A]
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
        "backdrop-sepia": [H]
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
        rotate: [Ee, b]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [q]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [q]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [ne]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [ne]
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
        "scroll-m": y()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": y()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": y()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": y()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": y()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": y()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": y()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": y()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": y()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": y()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": y()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": y()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": y()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": y()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": y()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": y()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": y()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": y()
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
        stroke: [te, ae, $e]
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
  ({ className: r, variant: t, size: o, asChild: n = !1, ...c }, s) => {
    const a = n ? Xr : "button";
    return /* @__PURE__ */ _.jsx(
      a,
      {
        className: ke(Wt({ variant: t, size: o, className: r })),
        ref: s,
        ...c
      }
    );
  }
);
Be.displayName = "Button";
const Tr = mr.forwardRef(
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
Tr.displayName = "Textarea";
const Dt = ({
  initialText: r,
  onTextChange: t,
  onEditing: o,
  isEditing: n,
  placeholder: c = "Type here...",
  className: s
}) => {
  const [a, l] = oe(r), f = (p) => {
    const u = p.target.value;
    l(u), t(u), n || o();
  };
  return xe(() => {
    n || l(r);
  }, [r, n]), /* @__PURE__ */ _.jsx("div", { className: `flex flex-col space-y-2 ${s}`, children: /* @__PURE__ */ _.jsx(
    Tr,
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
  const c = Me(null);
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
    let u = 0;
    for (let h = 0; h < r.length; h++) {
      const S = r[h] / 128 * f / 2;
      h === 0 ? a.moveTo(u, S) : a.lineTo(u, S), u += p;
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
  let p = Math.floor(s / a) - 1, u = 0;
  for (let g = Math.floor(s / a) - 1; g >= 0; g--) {
    const S = g * a, O = Math.min(S + a, s);
    let w = 0;
    for (let R = S; R < O; R++) {
      const A = Math.abs(f[R]);
      A > w && (w = A);
    }
    if (w < o)
      g === Math.floor(s / a) - 1 - u && u++;
    else {
      p = g;
      break;
    }
  }
  let h = (p + 1) * a / c;
  if (h = Math.min(h, r.duration), console.log(`AudioUtils: Initial lastSoundTime: ${h.toFixed(2)}s. Consecutive silent chunks at end: ${u}`), u >= l) {
    const g = s / c - u * n;
    return console.log(`AudioUtils: Sufficient trailing silence detected. Sound considered to end at: ${g.toFixed(2)}s`), g;
  } else
    return console.log(`AudioUtils: Not enough trailing silence (found ${u * n}s, need ${t}s). Returning original duration or end of last detected sound.`), r.duration;
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
      const u = r.getChannelData(p);
      f.getChannelData(p).set(u.subarray(0, a));
    }
    return l.close(), console.log(`AudioUtils: Trimmed AudioBuffer from ${r.duration.toFixed(2)}s to ${f.duration.toFixed(2)}s`), f;
  } catch (l) {
    return console.error("AudioUtils: Error trimming AudioBuffer:", l), null;
  }
}
function qt(r) {
  const t = r.numberOfChannels, o = t, n = r.length * t * 2 + 44, c = new ArrayBuffer(n), s = new DataView(c), a = [];
  let l = 0, f = 0, p = 0;
  function u(g) {
    s.setUint16(p, g, !0), p += 2;
  }
  function h(g) {
    s.setUint32(p, g, !0), p += 4;
  }
  for (h(1179011410), h(n - 8), h(1163280727), h(544501094), h(16), u(1), u(o), h(r.sampleRate), h(r.sampleRate * 2 * o), u(o * 2), u(16), h(1635017060), h(n - p - 4), l = 0; l < o; l++)
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
  const [u, h] = oe("idle"), [g, S] = oe(""), [O, w] = oe(t), [R, A] = oe(null), [C, $] = oe(null), [G, H] = oe(null), [ne, ce] = oe(null), q = Me(null), F = Me(""), [ie, ue] = oe(!1), y = Me(u);
  xe(() => {
    y.current = u;
  }, [u]);
  const W = ye((T) => {
    const ee = T.trim();
    if (!ee) return;
    let j = F.current;
    if (!j)
      F.current = gr(ee);
    else {
      const se = j.slice(-1), V = [".", "!", "?"].includes(se), X = j.endsWith(" ");
      !V && !X ? j += ". " : V && !X && (j += " "), F.current = j + gr(ee);
    }
    F.current = F.current.trim(), y.current === "recording" && w(F.current);
  }, []), U = ye((T) => {
    n && S(T);
  }, [n]), Y = ye(() => {
    h("recording"), $(null), S(""), F.current = "", w(""), H(null), ce((T) => (T && URL.revokeObjectURL(T), null));
  }, []), J = ye(async (T, ee) => {
    let j = F.current.trim();
    j && ![".", "!", "?"].includes(j.slice(-1)) && (j += "."), h("idle"), S("");
    let se = !1, V = T, X = ee;
    if (j.toLowerCase().endsWith(pr + ".") && T) {
      const Pe = pr + ".", me = j.toLowerCase().lastIndexOf(Pe);
      if (me === 0 || me > 0 && j[me - 1] === " ") {
        j = j.substring(0, me).trim(), se = !0;
        const fe = await Bt(T);
        if (fe) {
          const pe = Gt(fe.audioBuffer, hr);
          if (pe < fe.duration - hr / 2) {
            const re = Yt(fe.audioBuffer, pe);
            if (re && re !== fe.audioBuffer) {
              const Se = qt(re);
              X && URL.revokeObjectURL(X), V = Se, X = URL.createObjectURL(Se);
            }
          }
        }
      }
    }
    w(j), H(V), ce(X), j || V ? r(j, V, X) : se || w("");
  }, [r]), Z = ye((T) => {
    h("error"), $(T), S(""), A(null), Le.error(T || "An unknown recording error occurred.", { duration: 5e3 }), F.current = "";
  }, []), Q = ye((T) => {
    o && A(new Uint8Array(T));
  }, [o]);
  xe(() => {
    const T = new Vt({
      onFinalTranscript: W,
      onInterimTranscript: U,
      onRecordingStart: Y,
      onRecordingStop: J,
      onError: Z,
      onAudioData: Q,
      silenceTimeout: l,
      initialSpeechTimeout: f
    });
    return q.current = T, () => {
      T.dispose(), q.current = null;
    };
  }, [W, U, Y, J, Z, Q, l, f]), xe(() => {
    y.current !== "recording" && y.current !== "listening" && t !== O && w(t);
  }, [t, O]), xe(() => {
    const T = ne;
    return () => {
      T && URL.revokeObjectURL(T);
    };
  }, [ne]);
  const K = async () => {
    if (!a) {
      if (!q.current) {
        Le.error("Recorder not ready. Please try again.");
        return;
      }
      if (y.current === "recording" || y.current === "listening")
        q.current.stopRecording("manual");
      else {
        $(null), h("listening");
        try {
          await q.current.startRecording();
        } catch (T) {
          Z(T.message || "Failed to start recording."), h("idle");
        }
      }
    }
  }, de = (T) => {
    w(T), r(T, G, ne), Le.success("Text saved manually!");
  }, D = () => {
    $(null), h("idle");
  }, ge = u === "recording" || u === "listening", _e = () => u === "error" ? /* @__PURE__ */ _.jsx(et, { className: "w-4 h-4" }) : ge ? /* @__PURE__ */ _.jsx(rt, { className: "w-4 h-4" }) : /* @__PURE__ */ _.jsx(tt, { className: "w-4 h-4" }), Ie = () => u === "error" ? "Retry" : u === "listening" ? "Listening..." : u === "recording" ? "Stop Recording" : "Record", je = Kt.version;
  return /* @__PURE__ */ _.jsxs("div", { className: ke("relative p-3 sm:p-4 border rounded-lg shadow-sm bg-card w-full max-w-2xl mx-auto space-y-3", { "opacity-75 cursor-not-allowed": a }), children: [
    p && je && /* @__PURE__ */ _.jsxs("div", { className: "absolute top-2 right-2 flex items-center space-x-1 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ _.jsx(Hr, { className: "w-3 h-3" }),
      /* @__PURE__ */ _.jsxs("span", { children: [
        "v",
        je
      ] })
    ] }),
    /* @__PURE__ */ _.jsx("div", { className: "flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-4", children: /* @__PURE__ */ _.jsx("div", { className: "flex-grow w-full", children: /* @__PURE__ */ _.jsx(
      Dt,
      {
        initialText: g || t,
        onTextChange: S,
        placeholder: s,
        className: "w-full",
        isEditing: ie,
        onEditing: () => ue(!0)
      }
    ) }) }),
    /* @__PURE__ */ _.jsxs("div", { className: "flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ _.jsxs(
        Be,
        {
          onClick: u === "error" ? D : K,
          disabled: a && u !== "error",
          className: ke("flex-shrink-0 w-full sm:w-auto", u === "error" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""),
          "aria-label": Ie(),
          children: [
            _e(),
            /* @__PURE__ */ _.jsx("span", { className: "ml-2", children: Ie() })
          ]
        }
      ),
      ie && /* @__PURE__ */ _.jsxs(Be, { onClick: () => de(g), className: "flex-shrink-0 w-full sm:w-auto", children: [
        /* @__PURE__ */ _.jsx(Zr, { className: "w-4 h-4 mr-2" }),
        "Save Text"
      ] })
    ] }),
    u === "error" && C && /* @__PURE__ */ _.jsxs("div", { className: "flex items-center p-2 text-sm text-destructive-foreground bg-destructive rounded-md", children: [
      /* @__PURE__ */ _.jsx(Qr, { className: "w-4 h-4 mr-2 flex-shrink-0" }),
      " ",
      /* @__PURE__ */ _.jsxs("span", { children: [
        "Error: ",
        C
      ] })
    ] }),
    n && ge && g && /* @__PURE__ */ _.jsx("div", { className: "p-2 text-sm text-muted-foreground bg-muted/30 rounded-md min-h-[2.5rem] italic", children: g }),
    o && ge && /* @__PURE__ */ _.jsx(fr, { audioData: R, color: c, className: "w-full h-16" }),
    o && u === "idle" && !C && /* @__PURE__ */ _.jsx(fr, { audioData: null, color: c, className: "w-full h-16" })
  ] });
};
export {
  oo as VoiceInputCapture
};
//# sourceMappingURL=react-voice-input.es.js.map

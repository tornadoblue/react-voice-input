var Jt = Object.defineProperty;
var Kt = (t, r, o) => r in t ? Jt(t, r, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[r] = o;
var M = (t, r, o) => Kt(t, typeof r != "symbol" ? r + "" : r, o);
import * as bt from "react";
import vt, { useState as ne, useEffect as Re, useRef as Me, useCallback as we } from "react";
import { Slot as Xt } from "@radix-ui/react-slot";
import { Info as Ht, Save as Zt, AlertTriangle as Qt, RotateCcw as er, StopCircle as tr, Mic as rr } from "lucide-react";
import { toast as $e } from "sonner";
var Ne = { exports: {} }, ke = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var at;
function or() {
  if (at) return ke;
  at = 1;
  var t = vt, r = Symbol.for("react.element"), o = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, c = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(l, u, p) {
    var f, h = {}, g = null, b = null;
    p !== void 0 && (g = "" + p), u.key !== void 0 && (g = "" + u.key), u.ref !== void 0 && (b = u.ref);
    for (f in u) n.call(u, f) && !s.hasOwnProperty(f) && (h[f] = u[f]);
    if (l && l.defaultProps) for (f in u = l.defaultProps, u) h[f] === void 0 && (h[f] = u[f]);
    return { $$typeof: r, type: l, key: g, ref: b, props: h, _owner: c.current };
  }
  return ke.Fragment = o, ke.jsx = a, ke.jsxs = a, ke;
}
var _e = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lt;
function nr() {
  return lt || (lt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = vt, r = Symbol.for("react.element"), o = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), l = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), j = Symbol.iterator, A = "@@iterator";
    function y(e) {
      if (e === null || typeof e != "object")
        return null;
      var i = j && e[j] || e[A];
      return typeof i == "function" ? i : null;
    }
    var T = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function S(e) {
      {
        for (var i = arguments.length, d = new Array(i > 1 ? i - 1 : 0), m = 1; m < i; m++)
          d[m - 1] = arguments[m];
        H("error", e, d);
      }
    }
    function H(e, i, d) {
      {
        var m = T.ReactDebugCurrentFrame, E = m.getStackAddendum();
        E !== "" && (i += "%s", d = d.concat([E]));
        var k = d.map(function(R) {
          return String(R);
        });
        k.unshift("Warning: " + i), Function.prototype.apply.call(console[e], console, k);
      }
    }
    var D = !1, J = !1, Z = !1, he = !1, ge = !1, B;
    B = Symbol.for("react.module.reference");
    function ie(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === n || e === s || ge || e === c || e === p || e === f || he || e === b || D || J || Z || typeof e == "object" && e !== null && (e.$$typeof === g || e.$$typeof === h || e.$$typeof === a || e.$$typeof === l || e.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === B || e.getModuleId !== void 0));
    }
    function G(e, i, d) {
      var m = e.displayName;
      if (m)
        return m;
      var E = i.displayName || i.name || "";
      return E !== "" ? d + "(" + E + ")" : d;
    }
    function x(e) {
      return e.displayName || "Context";
    }
    function U(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
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
        case f:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            var i = e;
            return x(i) + ".Consumer";
          case a:
            var d = e;
            return x(d._context) + ".Provider";
          case u:
            return G(e, e.render, "ForwardRef");
          case h:
            var m = e.displayName || null;
            return m !== null ? m : U(e.type) || "Memo";
          case g: {
            var E = e, k = E._payload, R = E._init;
            try {
              return U(R(k));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var P = Object.assign, V = 0, K, se, Q, Y, ee, z, ae;
    function Pe() {
    }
    Pe.__reactDisabledLog = !0;
    function Fe() {
      {
        if (V === 0) {
          K = console.log, se = console.info, Q = console.warn, Y = console.error, ee = console.group, z = console.groupCollapsed, ae = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Pe,
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
        V++;
      }
    }
    function Ue() {
      {
        if (V--, V === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: P({}, e, {
              value: K
            }),
            info: P({}, e, {
              value: se
            }),
            warn: P({}, e, {
              value: Q
            }),
            error: P({}, e, {
              value: Y
            }),
            group: P({}, e, {
              value: ee
            }),
            groupCollapsed: P({}, e, {
              value: z
            }),
            groupEnd: P({}, e, {
              value: ae
            })
          });
        }
        V < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Te = T.ReactCurrentDispatcher, Ee;
    function me(e, i, d) {
      {
        if (Ee === void 0)
          try {
            throw Error();
          } catch (E) {
            var m = E.stack.trim().match(/\n( *(at )?)/);
            Ee = m && m[1] || "";
          }
        return `
` + Ee + e;
      }
    }
    var ve = !1, C;
    {
      var le = typeof WeakMap == "function" ? WeakMap : Map;
      C = new le();
    }
    function O(e, i) {
      if (!e || ve)
        return "";
      {
        var d = C.get(e);
        if (d !== void 0)
          return d;
      }
      var m;
      ve = !0;
      var E = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var k;
      k = Te.current, Te.current = null, Fe();
      try {
        if (i) {
          var R = function() {
            throw Error();
          };
          if (Object.defineProperty(R.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(R, []);
            } catch (W) {
              m = W;
            }
            Reflect.construct(e, [], R);
          } else {
            try {
              R.call();
            } catch (W) {
              m = W;
            }
            e.call(R.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (W) {
            m = W;
          }
          e();
        }
      } catch (W) {
        if (W && m && typeof W.stack == "string") {
          for (var w = W.stack.split(`
`), L = m.stack.split(`
`), N = w.length - 1, F = L.length - 1; N >= 1 && F >= 0 && w[N] !== L[F]; )
            F--;
          for (; N >= 1 && F >= 0; N--, F--)
            if (w[N] !== L[F]) {
              if (N !== 1 || F !== 1)
                do
                  if (N--, F--, F < 0 || w[N] !== L[F]) {
                    var $ = `
` + w[N].replace(" at new ", " at ");
                    return e.displayName && $.includes("<anonymous>") && ($ = $.replace("<anonymous>", e.displayName)), typeof e == "function" && C.set(e, $), $;
                  }
                while (N >= 1 && F >= 0);
              break;
            }
        }
      } finally {
        ve = !1, Te.current = k, Ue(), Error.prepareStackTrace = E;
      }
      var xe = e ? e.displayName || e.name : "", be = xe ? me(xe) : "";
      return typeof e == "function" && C.set(e, be), be;
    }
    function te(e, i, d) {
      return O(e, !1);
    }
    function q(e) {
      var i = e.prototype;
      return !!(i && i.isReactComponent);
    }
    function re(e, i, d) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return O(e, q(e));
      if (typeof e == "string")
        return me(e);
      switch (e) {
        case p:
          return me("Suspense");
        case f:
          return me("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case u:
            return te(e.render);
          case h:
            return re(e.type, i, d);
          case g: {
            var m = e, E = m._payload, k = m._init;
            try {
              return re(k(E), i, d);
            } catch {
            }
          }
        }
      return "";
    }
    var X = Object.prototype.hasOwnProperty, ce = {}, Ae = T.ReactDebugCurrentFrame;
    function de(e) {
      if (e) {
        var i = e._owner, d = re(e.type, e._source, i ? i.type : null);
        Ae.setExtraStackFrame(d);
      } else
        Ae.setExtraStackFrame(null);
    }
    function Oe(e, i, d, m, E) {
      {
        var k = Function.call.bind(X);
        for (var R in e)
          if (k(e, R)) {
            var w = void 0;
            try {
              if (typeof e[R] != "function") {
                var L = Error((m || "React class") + ": " + d + " type `" + R + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[R] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw L.name = "Invariant Violation", L;
              }
              w = e[R](i, R, m, d, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (N) {
              w = N;
            }
            w && !(w instanceof Error) && (de(E), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", d, R, typeof w), de(null)), w instanceof Error && !(w.message in ce) && (ce[w.message] = !0, de(E), S("Failed %s type: %s", d, w.message), de(null));
          }
      }
    }
    var At = Array.isArray;
    function ze(e) {
      return At(e);
    }
    function kt(e) {
      {
        var i = typeof Symbol == "function" && Symbol.toStringTag, d = i && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return d;
      }
    }
    function _t(e) {
      try {
        return Ke(e), !1;
      } catch {
        return !0;
      }
    }
    function Ke(e) {
      return "" + e;
    }
    function Xe(e) {
      if (_t(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", kt(e)), Ke(e);
    }
    var He = T.ReactCurrentOwner, It = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ze, Qe;
    function jt(e) {
      if (X.call(e, "ref")) {
        var i = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Pt(e) {
      if (X.call(e, "key")) {
        var i = Object.getOwnPropertyDescriptor(e, "key").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ot(e, i) {
      typeof e.ref == "string" && He.current;
    }
    function Nt(e, i) {
      {
        var d = function() {
          Ze || (Ze = !0, S("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        d.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: d,
          configurable: !0
        });
      }
    }
    function Mt(e, i) {
      {
        var d = function() {
          Qe || (Qe = !0, S("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        d.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: d,
          configurable: !0
        });
      }
    }
    var Ft = function(e, i, d, m, E, k, R) {
      var w = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: e,
        key: i,
        ref: d,
        props: R,
        // Record the component responsible for creating this element.
        _owner: k
      };
      return w._store = {}, Object.defineProperty(w._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(w, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: m
      }), Object.defineProperty(w, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: E
      }), Object.freeze && (Object.freeze(w.props), Object.freeze(w)), w;
    };
    function Ut(e, i, d, m, E) {
      {
        var k, R = {}, w = null, L = null;
        d !== void 0 && (Xe(d), w = "" + d), Pt(i) && (Xe(i.key), w = "" + i.key), jt(i) && (L = i.ref, Ot(i, E));
        for (k in i)
          X.call(i, k) && !It.hasOwnProperty(k) && (R[k] = i[k]);
        if (e && e.defaultProps) {
          var N = e.defaultProps;
          for (k in N)
            R[k] === void 0 && (R[k] = N[k]);
        }
        if (w || L) {
          var F = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          w && Nt(R, F), L && Mt(R, F);
        }
        return Ft(e, w, L, E, m, He.current, R);
      }
    }
    var Le = T.ReactCurrentOwner, et = T.ReactDebugCurrentFrame;
    function ye(e) {
      if (e) {
        var i = e._owner, d = re(e.type, e._source, i ? i.type : null);
        et.setExtraStackFrame(d);
      } else
        et.setExtraStackFrame(null);
    }
    var We;
    We = !1;
    function De(e) {
      return typeof e == "object" && e !== null && e.$$typeof === r;
    }
    function tt() {
      {
        if (Le.current) {
          var e = U(Le.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function zt(e) {
      return "";
    }
    var rt = {};
    function Lt(e) {
      {
        var i = tt();
        if (!i) {
          var d = typeof e == "string" ? e : e.displayName || e.name;
          d && (i = `

Check the top-level render call using <` + d + ">.");
        }
        return i;
      }
    }
    function ot(e, i) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var d = Lt(i);
        if (rt[d])
          return;
        rt[d] = !0;
        var m = "";
        e && e._owner && e._owner !== Le.current && (m = " It was passed a child from " + U(e._owner.type) + "."), ye(e), S('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', d, m), ye(null);
      }
    }
    function nt(e, i) {
      {
        if (typeof e != "object")
          return;
        if (ze(e))
          for (var d = 0; d < e.length; d++) {
            var m = e[d];
            De(m) && ot(m, i);
          }
        else if (De(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var E = y(e);
          if (typeof E == "function" && E !== e.entries)
            for (var k = E.call(e), R; !(R = k.next()).done; )
              De(R.value) && ot(R.value, i);
        }
      }
    }
    function Wt(e) {
      {
        var i = e.type;
        if (i == null || typeof i == "string")
          return;
        var d;
        if (typeof i == "function")
          d = i.propTypes;
        else if (typeof i == "object" && (i.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        i.$$typeof === h))
          d = i.propTypes;
        else
          return;
        if (d) {
          var m = U(i);
          Oe(d, e.props, "prop", m, e);
        } else if (i.PropTypes !== void 0 && !We) {
          We = !0;
          var E = U(i);
          S("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", E || "Unknown");
        }
        typeof i.getDefaultProps == "function" && !i.getDefaultProps.isReactClassApproved && S("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Dt(e) {
      {
        for (var i = Object.keys(e.props), d = 0; d < i.length; d++) {
          var m = i[d];
          if (m !== "children" && m !== "key") {
            ye(e), S("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), ye(null);
            break;
          }
        }
        e.ref !== null && (ye(e), S("Invalid attribute `ref` supplied to `React.Fragment`."), ye(null));
      }
    }
    var it = {};
    function st(e, i, d, m, E, k) {
      {
        var R = ie(e);
        if (!R) {
          var w = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (w += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var L = zt();
          L ? w += L : w += tt();
          var N;
          e === null ? N = "null" : ze(e) ? N = "array" : e !== void 0 && e.$$typeof === r ? (N = "<" + (U(e.type) || "Unknown") + " />", w = " Did you accidentally export a JSX literal instead of a component?") : N = typeof e, S("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", N, w);
        }
        var F = Ut(e, i, d, E, k);
        if (F == null)
          return F;
        if (R) {
          var $ = i.children;
          if ($ !== void 0)
            if (m)
              if (ze($)) {
                for (var xe = 0; xe < $.length; xe++)
                  nt($[xe], e);
                Object.freeze && Object.freeze($);
              } else
                S("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              nt($, e);
        }
        if (X.call(i, "key")) {
          var be = U(e), W = Object.keys(i).filter(function(qt) {
            return qt !== "key";
          }), Ve = W.length > 0 ? "{key: someKey, " + W.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!it[be + Ve]) {
            var Yt = W.length > 0 ? "{" + W.join(": ..., ") + ": ...}" : "{}";
            S(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ve, be, Yt, be), it[be + Ve] = !0;
          }
        }
        return e === n ? Dt(F) : Wt(F), F;
      }
    }
    function Vt(e, i, d) {
      return st(e, i, d, !0);
    }
    function $t(e, i, d) {
      return st(e, i, d, !1);
    }
    var Bt = $t, Gt = Vt;
    _e.Fragment = n, _e.jsx = Bt, _e.jsxs = Gt;
  }()), _e;
}
var ct;
function ir() {
  return ct || (ct = 1, process.env.NODE_ENV === "production" ? Ne.exports = or() : Ne.exports = nr()), Ne.exports;
}
var _ = ir();
function yt(t) {
  var r, o, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var c = t.length;
    for (r = 0; r < c; r++) t[r] && (o = yt(t[r])) && (n && (n += " "), n += o);
  } else for (o in t) t[o] && (n && (n += " "), n += o);
  return n;
}
function xt() {
  for (var t, r, o = 0, n = "", c = arguments.length; o < c; o++) (t = arguments[o]) && (r = yt(t)) && (n && (n += " "), n += r);
  return n;
}
const dt = (t) => typeof t == "boolean" ? `${t}` : t === 0 ? "0" : t, ut = xt, sr = (t, r) => (o) => {
  var n;
  if ((r == null ? void 0 : r.variants) == null) return ut(t, o == null ? void 0 : o.class, o == null ? void 0 : o.className);
  const { variants: c, defaultVariants: s } = r, a = Object.keys(c).map((p) => {
    const f = o == null ? void 0 : o[p], h = s == null ? void 0 : s[p];
    if (f === null) return null;
    const g = dt(f) || dt(h);
    return c[p][g];
  }), l = o && Object.entries(o).reduce((p, f) => {
    let [h, g] = f;
    return g === void 0 || (p[h] = g), p;
  }, {}), u = r == null || (n = r.compoundVariants) === null || n === void 0 ? void 0 : n.reduce((p, f) => {
    let { class: h, className: g, ...b } = f;
    return Object.entries(b).every((j) => {
      let [A, y] = j;
      return Array.isArray(y) ? y.includes({
        ...s,
        ...l
      }[A]) : {
        ...s,
        ...l
      }[A] === y;
    }) ? [
      ...p,
      h,
      g
    ] : p;
  }, []);
  return ut(t, a, u, o == null ? void 0 : o.class, o == null ? void 0 : o.className);
}, Je = "-", ar = (t) => {
  const r = cr(t), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: n
  } = t;
  return {
    getClassGroupId: (a) => {
      const l = a.split(Je);
      return l[0] === "" && l.length !== 1 && l.shift(), wt(l, r) || lr(a);
    },
    getConflictingClassGroupIds: (a, l) => {
      const u = o[a] || [];
      return l && n[a] ? [...u, ...n[a]] : u;
    }
  };
}, wt = (t, r) => {
  var a;
  if (t.length === 0)
    return r.classGroupId;
  const o = t[0], n = r.nextPart.get(o), c = n ? wt(t.slice(1), n) : void 0;
  if (c)
    return c;
  if (r.validators.length === 0)
    return;
  const s = t.join(Je);
  return (a = r.validators.find(({
    validator: l
  }) => l(s))) == null ? void 0 : a.classGroupId;
}, ft = /^\[(.+)\]$/, lr = (t) => {
  if (ft.test(t)) {
    const r = ft.exec(t)[1], o = r == null ? void 0 : r.substring(0, r.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, cr = (t) => {
  const {
    theme: r,
    prefix: o
  } = t, n = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return ur(Object.entries(t.classGroups), o).forEach(([s, a]) => {
    Ye(a, n, s, r);
  }), n;
}, Ye = (t, r, o, n) => {
  t.forEach((c) => {
    if (typeof c == "string") {
      const s = c === "" ? r : pt(r, c);
      s.classGroupId = o;
      return;
    }
    if (typeof c == "function") {
      if (dr(c)) {
        Ye(c(n), r, o, n);
        return;
      }
      r.validators.push({
        validator: c,
        classGroupId: o
      });
      return;
    }
    Object.entries(c).forEach(([s, a]) => {
      Ye(a, pt(r, s), o, n);
    });
  });
}, pt = (t, r) => {
  let o = t;
  return r.split(Je).forEach((n) => {
    o.nextPart.has(n) || o.nextPart.set(n, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(n);
  }), o;
}, dr = (t) => t.isThemeGetter, ur = (t, r) => r ? t.map(([o, n]) => {
  const c = n.map((s) => typeof s == "string" ? r + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, l]) => [r + a, l])) : s);
  return [o, c];
}) : t, fr = (t) => {
  if (t < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  const c = (s, a) => {
    o.set(s, a), r++, r > t && (r = 0, n = o, o = /* @__PURE__ */ new Map());
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
}, Rt = "!", pr = (t) => {
  const {
    separator: r,
    experimentalParseClassName: o
  } = t, n = r.length === 1, c = r[0], s = r.length, a = (l) => {
    const u = [];
    let p = 0, f = 0, h;
    for (let y = 0; y < l.length; y++) {
      let T = l[y];
      if (p === 0) {
        if (T === c && (n || l.slice(y, y + s) === r)) {
          u.push(l.slice(f, y)), f = y + s;
          continue;
        }
        if (T === "/") {
          h = y;
          continue;
        }
      }
      T === "[" ? p++ : T === "]" && p--;
    }
    const g = u.length === 0 ? l : l.substring(f), b = g.startsWith(Rt), j = b ? g.substring(1) : g, A = h && h > f ? h - f : void 0;
    return {
      modifiers: u,
      hasImportantModifier: b,
      baseClassName: j,
      maybePostfixModifierPosition: A
    };
  };
  return o ? (l) => o({
    className: l,
    parseClassName: a
  }) : a;
}, hr = (t) => {
  if (t.length <= 1)
    return t;
  const r = [];
  let o = [];
  return t.forEach((n) => {
    n[0] === "[" ? (r.push(...o.sort(), n), o = []) : o.push(n);
  }), r.push(...o.sort()), r;
}, gr = (t) => ({
  cache: fr(t.cacheSize),
  parseClassName: pr(t),
  ...ar(t)
}), mr = /\s+/, br = (t, r) => {
  const {
    parseClassName: o,
    getClassGroupId: n,
    getConflictingClassGroupIds: c
  } = r, s = [], a = t.trim().split(mr);
  let l = "";
  for (let u = a.length - 1; u >= 0; u -= 1) {
    const p = a[u], {
      modifiers: f,
      hasImportantModifier: h,
      baseClassName: g,
      maybePostfixModifierPosition: b
    } = o(p);
    let j = !!b, A = n(j ? g.substring(0, b) : g);
    if (!A) {
      if (!j) {
        l = p + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (A = n(g), !A) {
        l = p + (l.length > 0 ? " " + l : l);
        continue;
      }
      j = !1;
    }
    const y = hr(f).join(":"), T = h ? y + Rt : y, S = T + A;
    if (s.includes(S))
      continue;
    s.push(S);
    const H = c(A, j);
    for (let D = 0; D < H.length; ++D) {
      const J = H[D];
      s.push(T + J);
    }
    l = p + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function vr() {
  let t = 0, r, o, n = "";
  for (; t < arguments.length; )
    (r = arguments[t++]) && (o = St(r)) && (n && (n += " "), n += o);
  return n;
}
const St = (t) => {
  if (typeof t == "string")
    return t;
  let r, o = "";
  for (let n = 0; n < t.length; n++)
    t[n] && (r = St(t[n])) && (o && (o += " "), o += r);
  return o;
};
function yr(t, ...r) {
  let o, n, c, s = a;
  function a(u) {
    const p = r.reduce((f, h) => h(f), t());
    return o = gr(p), n = o.cache.get, c = o.cache.set, s = l, l(u);
  }
  function l(u) {
    const p = n(u);
    if (p)
      return p;
    const f = br(u, o);
    return c(u, f), f;
  }
  return function() {
    return s(vr.apply(null, arguments));
  };
}
const I = (t) => {
  const r = (o) => o[t] || [];
  return r.isThemeGetter = !0, r;
}, Ct = /^\[(?:([a-z-]+):)?(.+)\]$/i, xr = /^\d+\/\d+$/, wr = /* @__PURE__ */ new Set(["px", "full", "screen"]), Rr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Sr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Cr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Tr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Er = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, oe = (t) => Se(t) || wr.has(t) || xr.test(t), ue = (t) => Ce(t, "length", Nr), Se = (t) => !!t && !Number.isNaN(Number(t)), Be = (t) => Ce(t, "number", Se), Ie = (t) => !!t && Number.isInteger(Number(t)), Ar = (t) => t.endsWith("%") && Se(t.slice(0, -1)), v = (t) => Ct.test(t), fe = (t) => Rr.test(t), kr = /* @__PURE__ */ new Set(["length", "size", "percentage"]), _r = (t) => Ce(t, kr, Tt), Ir = (t) => Ce(t, "position", Tt), jr = /* @__PURE__ */ new Set(["image", "url"]), Pr = (t) => Ce(t, jr, Fr), Or = (t) => Ce(t, "", Mr), je = () => !0, Ce = (t, r, o) => {
  const n = Ct.exec(t);
  return n ? n[1] ? typeof r == "string" ? n[1] === r : r.has(n[1]) : o(n[2]) : !1;
}, Nr = (t) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Sr.test(t) && !Cr.test(t)
), Tt = () => !1, Mr = (t) => Tr.test(t), Fr = (t) => Er.test(t), Ur = () => {
  const t = I("colors"), r = I("spacing"), o = I("blur"), n = I("brightness"), c = I("borderColor"), s = I("borderRadius"), a = I("borderSpacing"), l = I("borderWidth"), u = I("contrast"), p = I("grayscale"), f = I("hueRotate"), h = I("invert"), g = I("gap"), b = I("gradientColorStops"), j = I("gradientColorStopPositions"), A = I("inset"), y = I("margin"), T = I("opacity"), S = I("padding"), H = I("saturate"), D = I("scale"), J = I("sepia"), Z = I("skew"), he = I("space"), ge = I("translate"), B = () => ["auto", "contain", "none"], ie = () => ["auto", "hidden", "clip", "visible", "scroll"], G = () => ["auto", v, r], x = () => [v, r], U = () => ["", oe, ue], P = () => ["auto", Se, v], V = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], K = () => ["solid", "dashed", "dotted", "double", "none"], se = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Q = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], Y = () => ["", "0", v], ee = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], z = () => [Se, v];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [je],
      spacing: [oe, ue],
      blur: ["none", "", fe, v],
      brightness: z(),
      borderColor: [t],
      borderRadius: ["none", "", "full", fe, v],
      borderSpacing: x(),
      borderWidth: U(),
      contrast: z(),
      grayscale: Y(),
      hueRotate: z(),
      invert: Y(),
      gap: x(),
      gradientColorStops: [t],
      gradientColorStopPositions: [Ar, ue],
      inset: G(),
      margin: G(),
      opacity: z(),
      padding: x(),
      saturate: z(),
      scale: z(),
      sepia: Y(),
      skew: z(),
      space: x(),
      translate: x()
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
        columns: [fe]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": ee()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": ee()
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
        object: [...V(), v]
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
        overscroll: B()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": B()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": B()
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
        inset: [A]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [A]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [A]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [A]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [A]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [A]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [A]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [A]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [A]
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
        z: ["auto", Ie, v]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: G()
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
        grow: Y()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: Y()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Ie, v]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [je]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Ie, v]
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
        "grid-rows": [je]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Ie, v]
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
        p: [S]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [S]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [S]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [S]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [S]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [S]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [S]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [S]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [S]
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
        "space-x": [he]
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
        "space-y": [he]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", v, r]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [v, r, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [v, r, "none", "full", "min", "max", "fit", "prose", {
          screen: [fe]
        }, fe]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [v, r, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [v, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [v, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [v, r, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", fe, ue]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Be]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [je]
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
        "line-clamp": ["none", Se, Be]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", oe, v]
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
        placeholder: [t]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [T]
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
        text: [t]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [T]
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
        decoration: [...K(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", oe, ue]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", oe, v]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [t]
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
        indent: x()
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
        "bg-opacity": [T]
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
        bg: [...V(), Ir]
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
        bg: ["auto", "cover", "contain", _r]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Pr]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [t]
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
        from: [b]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [b]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [b]
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
        "border-opacity": [T]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...K(), "hidden"]
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
        "divide-opacity": [T]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: K()
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
        outline: ["", ...K()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [oe, v]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [oe, ue]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [t]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: U()
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
        ring: [t]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [T]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [oe, ue]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [t]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", fe, Or]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [je]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [T]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...se(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": se()
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
        contrast: [u]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", fe, v]
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
        "hue-rotate": [f]
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
        saturate: [H]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [J]
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
        "backdrop-contrast": [u]
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
        "backdrop-hue-rotate": [f]
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
        "backdrop-opacity": [T]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [H]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [J]
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
        duration: z()
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
        delay: z()
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
        scale: [D]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [D]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [D]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Ie, v]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [ge]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [ge]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [Z]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [Z]
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
        accent: ["auto", t]
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
        caret: [t]
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
        "scroll-m": x()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": x()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": x()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": x()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": x()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": x()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": x()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": x()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": x()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": x()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": x()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": x()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": x()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": x()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": x()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": x()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": x()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": x()
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
        fill: [t, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [oe, ue, Be]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [t, "none"]
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
}, zr = /* @__PURE__ */ yr(Ur);
function pe(...t) {
  return zr(xt(t));
}
const Lr = sr(
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
), qe = bt.forwardRef(
  ({ className: t, variant: r, size: o, asChild: n = !1, ...c }, s) => {
    const a = n ? Xt : "button";
    return /* @__PURE__ */ _.jsx(
      a,
      {
        className: pe(Lr({ variant: r, size: o, className: t })),
        ref: s,
        ...c
      }
    );
  }
);
qe.displayName = "Button";
const Et = bt.forwardRef(
  ({ className: t, ...r }, o) => /* @__PURE__ */ _.jsx(
    "textarea",
    {
      className: pe(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        t
      ),
      ref: o,
      ...r
    }
  )
);
Et.displayName = "Textarea";
const Wr = ({
  initialText: t,
  onTextChange: r,
  onEditing: o,
  isEditing: n,
  placeholder: c = "Type here...",
  className: s,
  // For the root div
  textDisplayClassName: a
  // For the Textarea
}) => {
  const [l, u] = ne(t), p = (f) => {
    const h = f.target.value;
    u(h), r(h), n || o();
  };
  return Re(() => {
    n || u(t);
  }, [t, n]), /* @__PURE__ */ _.jsx("div", { className: pe("flex flex-col space-y-2", s), children: /* @__PURE__ */ _.jsx(
    Et,
    {
      value: l,
      onChange: p,
      placeholder: c,
      className: pe(
        "w-full min-h-[60px] text-lg",
        // Default text size changed to text-lg
        a
        // Apply custom classes for the textarea
      ),
      rows: 3
    }
  ) });
}, ht = ({
  audioData: t,
  color: r = "#3b82f6",
  // Default blue-500
  className: o,
  backgroundColor: n = "transparent"
  // Default transparent
}) => {
  const c = Me(null);
  return Re(() => {
    const s = c.current;
    if (!s) return;
    const a = s.getContext("2d");
    if (!a) return;
    const { width: l, height: u } = s;
    if (a.clearRect(0, 0, l, u), a.fillStyle = n, a.fillRect(0, 0, l, u), !t || t.length === 0) {
      a.beginPath(), a.moveTo(0, u / 2), a.lineTo(l, u / 2), a.strokeStyle = r, a.lineWidth = 1, a.stroke();
      return;
    }
    a.lineWidth = 2, a.strokeStyle = r, a.beginPath();
    const p = l * 1 / t.length;
    let f = 0;
    for (let h = 0; h < t.length; h++) {
      const b = t[h] / 128 * u / 2;
      h === 0 ? a.moveTo(f, b) : a.lineTo(f, b), f += p;
    }
    a.lineTo(l, u / 2), a.stroke();
  }, [t, r, n]), /* @__PURE__ */ _.jsx(
    "canvas",
    {
      ref: c,
      className: pe("w-full h-16 rounded-md", o),
      width: 300,
      height: 64
    }
  );
}, Dr = 3e3, Vr = 5e3;
class $r {
  constructor(r) {
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
    M(this, "finalText", "");
    M(this, "interimText", "");
    M(this, "drawWaveform", () => {
      this.drawWaveformCallCount++, this.drawWaveformCallCount % 30, this.analyserNode && this.dataArray && this.mediaRecorder && this.mediaRecorder.state === "recording" ? (this.drawWaveformCallCount % 60, this.analyserNode.getByteTimeDomainData(this.dataArray), this.options.onAudioData(new Uint8Array(this.dataArray)), this.animationFrameId = requestAnimationFrame(this.drawWaveform)) : (this.drawWaveformCallCount === 1 || this.drawWaveformCallCount % 60, this.animationFrameId && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null));
    });
    M(this, "cleanupAudioProcessing", () => {
      if (this.animationFrameId && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null), this.audioContext && this.audioContext.state !== "closed" && this.sourceNode)
        try {
          this.sourceNode.disconnect();
        } catch {
        }
      this.sourceNode = null, this.analyserNode = null, this.audioContext && this.audioContext.state !== "closed" && this.audioContext.close().catch((r) => {
      }), this.audioContext = null, this.dataArray = null;
    });
    this.options = {
      ...r,
      silenceTimeout: r.silenceTimeout ?? Dr,
      initialSpeechTimeout: r.initialSpeechTimeout ?? Vr,
      continuous: r.continuous ?? !0,
      interimResults: r.interimResults ?? !0
    }, this.initializeSpeechRecognition();
  }
  initializeSpeechRecognition() {
    const r = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!r) {
      console.warn("ESR: Speech Recognition API not supported.");
      return;
    }
    try {
      this.speechRecognition = new r(), this.speechRecognition.continuous = this.options.continuous, this.speechRecognition.interimResults = this.options.interimResults, this.speechRecognition.lang = navigator.language || "en-US", this.speechRecognition.onresult = (o) => {
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
    const r = this.options.initialSpeechTimeout;
    typeof r != "number" || r <= 0 || (this.initialSpeechTimeoutId = setTimeout(() => {
      !this.hasDetectedSpeech && this.recognitionServiceTrulyActive && (this.options.onError("No speech detected."), this.stopReason = "initial_timeout", this.stopRecordingInternal("initial_timeout"));
    }, r));
  }
  clearInitialSpeechTimer() {
    this.initialSpeechTimeoutId && clearTimeout(this.initialSpeechTimeoutId), this.initialSpeechTimeoutId = null;
  }
  resetSilenceTimer() {
    if (this.clearSilenceTimer(), this.recognitionServiceTrulyActive) {
      const r = this.options.silenceTimeout;
      if (typeof r != "number" || r <= 0) return;
      this.silenceTimeoutId = setTimeout(() => {
        this.recognitionServiceTrulyActive && (!this.finalText && !this.interimText ? (this.finalText && this.options.onFinalTranscript(this.finalText), this.interimText && this.options.onInterimTranscript(this.interimText), this.stopRecordingInternal("manual")) : (this.stopReason = "silence", this.stopRecordingInternal("silence")));
      }, r);
    }
  }
  clearSilenceTimer() {
    this.silenceTimeoutId && clearTimeout(this.silenceTimeoutId), this.silenceTimeoutId = null;
  }
  setupMediaRecorder(r) {
    this.drawWaveformCallCount = 0;
    try {
      this.mediaRecorder = new MediaRecorder(r), this.audioChunks = [], this.mediaRecorder.ondataavailable = (o) => {
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
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)(), this.analyserNode = this.audioContext.createAnalyser(), this.analyserNode.fftSize = 2048, this.dataArray = new Uint8Array(this.analyserNode.frequencyBinCount), this.sourceNode = this.audioContext.createMediaStreamSource(r), this.sourceNode.connect(this.analyserNode), console.log("ESR: Web Audio API setup for waveform. Initial drawWaveform call."), this.drawWaveform();
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
        const r = await navigator.mediaDevices.getUserMedia({ audio: !0 });
        if (this.setupMediaRecorder(r), !this.mediaRecorder || this.mediaRecorder.state !== "recording") {
          console.error("ESR: MediaRecorder did not start correctly in setup."), r.getTracks().forEach((o) => o.stop());
          return;
        }
        this.speechRecognition.start();
      } catch (r) {
        console.error("ESR: Error in startRecording sequence:", r), this.recognitionServiceTrulyActive = !1;
        let o = "Error starting recording.";
        r instanceof Error && (r.name === "NotAllowedError" ? o = "Microphone access denied." : r.name === "NotFoundError" && (o = "No microphone found.")), this.options.onError(o), this.cleanupAudioProcessing();
      }
    }
  }
  stopRecording(r = "manual") {
    this.stopReason !== "dispose" && (!this.recognitionServiceTrulyActive && (!this.mediaRecorder || this.mediaRecorder.state === "inactive") || (this.isManuallyStopping = !0, this.stopReason = r, this.stopRecordingInternal(r)));
  }
  stopRecordingInternal(r) {
    if (this.clearInitialSpeechTimer(), this.clearSilenceTimer(), this.speechRecognition && (this.recognitionServiceTrulyActive || r === "dispose"))
      try {
        this.speechRecognition.stop();
      } catch {
        this.recognitionServiceTrulyActive = !1;
      }
    this.mediaRecorder && (this.mediaRecorder.state === "recording" ? this.mediaRecorder.stop() : r !== "dispose" && this.cleanupAudioProcessing()), r === "dispose" && this.cleanupAudioProcessing();
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
async function Br(t) {
  try {
    const r = await t.arrayBuffer(), o = new (window.AudioContext || window.webkitAudioContext)(), n = await o.decodeAudioData(r);
    return await o.close(), { audioBuffer: n, duration: n.duration };
  } catch (r) {
    return console.error("Error decoding audio blob:", r), null;
  }
}
function Gr(t, r = 0.5, o = 0.01, n = 0.05) {
  const { sampleRate: c, length: s } = t;
  if (s === 0) return 0;
  const a = Math.floor(c * n), l = Math.ceil(r / n), u = t.getChannelData(0);
  let p = Math.floor(s / a) - 1, f = 0;
  for (let g = Math.floor(s / a) - 1; g >= 0; g--) {
    const b = g * a, j = Math.min(b + a, s);
    let A = 0;
    for (let y = b; y < j; y++) {
      const T = Math.abs(u[y]);
      T > A && (A = T);
    }
    if (A < o)
      g === Math.floor(s / a) - 1 - f && f++;
    else {
      p = g;
      break;
    }
  }
  let h = (p + 1) * a / c;
  if (h = Math.min(h, t.duration), console.log(`AudioUtils: Initial lastSoundTime: ${h.toFixed(2)}s. Consecutive silent chunks at end: ${f}`), f >= l) {
    const g = s / c - f * n;
    return console.log(`AudioUtils: Sufficient trailing silence detected. Sound considered to end at: ${g.toFixed(2)}s`), g;
  } else
    return console.log(`AudioUtils: Not enough trailing silence (found ${f * n}s, need ${r}s). Returning original duration or end of last detected sound.`), t.duration;
}
function Yr(t, r) {
  const { sampleRate: o, numberOfChannels: n, length: c } = t, s = Math.max(0.01, r), a = Math.floor(s * o);
  if (a <= 0 || a > c)
    return console.error("AudioUtils: Invalid new duration for trimming.", s, "Original:", t.duration, "Attempted samples:", a, "Original samples:", c), t;
  if (Math.abs(t.duration - s) < 0.01)
    return console.log("AudioUtils: Trim duration very close to original. Returning original buffer."), t;
  try {
    const l = new (window.AudioContext || window.webkitAudioContext)(), u = l.createBuffer(
      n,
      a,
      o
    );
    for (let p = 0; p < n; p++) {
      const f = t.getChannelData(p);
      u.getChannelData(p).set(f.subarray(0, a));
    }
    return l.close(), console.log(`AudioUtils: Trimmed AudioBuffer from ${t.duration.toFixed(2)}s to ${u.duration.toFixed(2)}s`), u;
  } catch (l) {
    return console.error("AudioUtils: Error trimming AudioBuffer:", l), null;
  }
}
function qr(t) {
  const r = t.numberOfChannels, o = r, n = t.length * r * 2 + 44, c = new ArrayBuffer(n), s = new DataView(c), a = [];
  let l = 0, u = 0, p = 0;
  function f(g) {
    s.setUint16(p, g, !0), p += 2;
  }
  function h(g) {
    s.setUint32(p, g, !0), p += 4;
  }
  for (h(1179011410), h(n - 8), h(1163280727), h(544501094), h(16), f(1), f(o), h(t.sampleRate), h(t.sampleRate * 2 * o), f(o * 2), f(16), h(1635017060), h(n - p - 4), l = 0; l < o; l++)
    a.push(t.getChannelData(l));
  for (let g = 0; g < t.length; g++)
    for (let b = 0; b < r; b++)
      u = Math.max(-1, Math.min(1, a[b][g])), s.setInt16(p, u * 32767, !0), p += 2;
  return console.log("AudioUtils: Encoded AudioBuffer to WAV Blob."), new Blob([s], { type: "audio/wav" });
}
const Jr = "0.2.2", Kr = {
  version: Jr
}, gt = "stop recording", mt = 0.75, Xr = 3e3, Hr = 5e3, Ge = (t) => t ? t.charAt(0).toUpperCase() + t.slice(1) : "", oo = ({
  onSave: t,
  initialText: r = "",
  showWaveform: o = !0,
  showInterimTranscript: n = !0,
  customWaveformColor: c,
  placeholder: s = "Press Record button to start the dictation, or type here...",
  // Updated default placeholder
  disabled: a = !1,
  silenceTimeout: l = Xr,
  initialSpeechTimeout: u = Hr,
  showVersionInfo: p = !0,
  textDisplayClassName: f,
  interimTranscriptClassName: h,
  recordButtonClassName: g
}) => {
  const [b, j] = ne("idle"), [A, y] = ne(""), [T, S] = ne(r), [H, D] = ne(null), [J, Z] = ne(null), [he, ge] = ne(null), [B, ie] = ne(null), [G, x] = ne(!1), U = Me(null), P = Me(""), V = Me(b);
  Re(() => {
    V.current = b;
  }, [b]);
  const K = we((C) => {
    const le = C.trim();
    if (!le) return;
    let O = P.current;
    if (!O)
      P.current = Ge(le);
    else {
      const te = O.slice(-1), q = [".", "!", "?"].includes(te), re = O.endsWith(" ");
      !q && !re ? O += ". " : q && !re && (O += " "), P.current = O + Ge(le);
    }
    P.current = P.current.trim(), V.current === "recording" && (S(P.current), x(!1));
  }, []), se = we((C) => {
    n && y(Ge(C.trim()));
  }, [n]), Q = we(() => {
    console.log("VIC: handleRecordingStart triggered"), j("recording"), Z(null), y(""), P.current = "", ge(null), ie((C) => (C && URL.revokeObjectURL(C), null)), x(!1);
  }, []), Y = we(async (C, le) => {
    console.log("VIC: handleRecordingStop triggered. Audio Blob exists:", !!C, "Audio URL:", le);
    let O = P.current.trim();
    O && ![".", "!", "?"].includes(O.slice(-1)) && (O += "."), j("idle"), y("");
    let te = C, q = le;
    if (O.toLowerCase().endsWith(gt + ".") && C) {
      const re = gt + ".", X = O.toLowerCase().lastIndexOf(re);
      if (X === 0 || X > 0 && O[X - 1] === " ") {
        O = O.substring(0, X).trim();
        const ce = await Br(C);
        if (ce) {
          const Ae = Gr(ce.audioBuffer, mt);
          if (Ae < ce.duration - mt / 2) {
            const de = Yr(ce.audioBuffer, Ae);
            if (de && de !== ce.audioBuffer) {
              const Oe = qr(de);
              q && URL.revokeObjectURL(q), te = Oe, q = URL.createObjectURL(Oe);
            }
          }
        }
      }
    }
    S(O), ge(te), ie(q), O || te ? (console.log("VIC: handleRecordingStop, calling onSave with:", { text: O, blob: !!te, url: q }), t(O, te, q)) : console.log("VIC: handleRecordingStop, NOT calling onSave (no text/audio)."), x(!1);
  }, [t]), ee = we((C) => {
    console.error("VIC: handleError triggered:", C), j("error"), Z(C), y(""), D(null), $e.error(C || "An unknown recording error occurred.", { duration: 5e3 }), P.current = "", x(!1);
  }, []), z = we((C) => {
    o && D(new Uint8Array(C));
  }, [o]);
  Re(() => {
    console.log("VIC: Initializing EnhancedSpeechRecorder with timeouts:", { silenceTimeout: l, initialSpeechTimeout: u });
    const C = new $r({
      onFinalTranscript: K,
      onInterimTranscript: se,
      onRecordingStart: Q,
      onRecordingStop: Y,
      onError: ee,
      onAudioData: z,
      silenceTimeout: l,
      initialSpeechTimeout: u
    });
    return U.current = C, () => {
      console.log("VIC: Disposing EnhancedSpeechRecorder."), C.dispose(), U.current = null;
    };
  }, [K, se, Q, Y, ee, z, l, u]), Re(() => {
    !ae && !G && T !== r && S(r);
  }, [r, T, G, b]);
  const ae = b === "recording" || b === "listening";
  Re(() => {
    const C = B;
    return () => {
      C && URL.revokeObjectURL(C);
    };
  }, [B]);
  const Pe = async () => {
    if (console.log("VIC: toggleRecording called. Current state:", V.current, "Disabled:", a), !a) {
      if (!U.current) {
        $e.error("Recorder not ready. Please try again."), console.error("VIC: toggleRecording - speechRecorderRef is null!");
        return;
      }
      if (ae)
        console.log("VIC: toggleRecording - stopping recording."), U.current.stopRecording("manual");
      else {
        console.log("VIC: toggleRecording - starting recording."), Z(null), j("listening"), P.current = "";
        try {
          await U.current.startRecording(), console.log("VIC: toggleRecording - startRecording promise resolved.");
        } catch (C) {
          console.error("VIC: toggleRecording - error calling startRecording:", C), ee(C.message || "Failed to start recording."), j("idle");
        }
      }
    }
  }, Fe = (C) => {
    S(C), G || x(!0);
  }, Ue = () => {
    console.log("VIC: handleManualSave, calling onSave with:", { text: T, blob: !!he, url: B }), t(T, he, B), $e.success("Text saved manually!"), x(!1);
  }, Te = () => {
    console.log("VIC: handleRetryError called."), Z(null), j("idle"), x(!1);
  }, Ee = () => b === "error" ? /* @__PURE__ */ _.jsx(er, { className: "w-4 h-4" }) : ae ? /* @__PURE__ */ _.jsx(tr, { className: "w-4 h-4" }) : /* @__PURE__ */ _.jsx(rr, { className: "w-4 h-4" }), me = () => b === "error" ? "Retry" : b === "listening" ? "Listening..." : b === "recording" ? "Stop Recording" : "Record", ve = Kr.version;
  return /* @__PURE__ */ _.jsxs("div", { className: pe("relative p-3 sm:p-4 border rounded-lg shadow-sm bg-card w-full max-w-2xl mx-auto space-y-3", { "opacity-75 cursor-not-allowed": a }), children: [
    p && ve && /* @__PURE__ */ _.jsxs("div", { className: "absolute top-2 right-2 flex items-center space-x-1 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ _.jsx(Ht, { className: "w-3 h-3" }),
      /* @__PURE__ */ _.jsxs("span", { children: [
        "v",
        ve
      ] })
    ] }),
    /* @__PURE__ */ _.jsx("div", { className: "flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-4", children: /* @__PURE__ */ _.jsx("div", { className: "flex-grow w-full", children: /* @__PURE__ */ _.jsx(
      Wr,
      {
        initialText: T,
        onTextChange: Fe,
        placeholder: s,
        className: "w-full",
        textDisplayClassName: f,
        isEditing: G,
        onEditing: () => {
          x(!0);
        }
      }
    ) }) }),
    /* @__PURE__ */ _.jsxs("div", { className: "flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ _.jsxs(
        qe,
        {
          onClick: b === "error" ? Te : Pe,
          disabled: a && b !== "error",
          className: pe(
            "flex-shrink-0 w-full sm:w-auto",
            g,
            b === "error" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""
          ),
          "aria-label": me(),
          children: [
            Ee(),
            /* @__PURE__ */ _.jsx("span", { className: "ml-2", children: me() })
          ]
        }
      ),
      G && /* @__PURE__ */ _.jsxs(qe, { onClick: Ue, className: "flex-shrink-0 w-full sm:w-auto", children: [
        /* @__PURE__ */ _.jsx(Zt, { className: "w-4 h-4 mr-2" }),
        "Save Text"
      ] })
    ] }),
    b === "error" && J && /* @__PURE__ */ _.jsxs("div", { className: "flex items-center p-2 text-sm text-destructive-foreground bg-destructive rounded-md", children: [
      /* @__PURE__ */ _.jsx(Qt, { className: "w-4 h-4 mr-2 flex-shrink-0" }),
      " ",
      /* @__PURE__ */ _.jsxs("span", { children: [
        "Error: ",
        J
      ] })
    ] }),
    n && ae && A && /* @__PURE__ */ _.jsxs("div", { className: pe(
      "p-2 text-sm text-muted-foreground bg-muted/30 rounded-md min-h-[2.5rem] italic",
      // Default base styles
      h
      // Custom styles passed as prop
    ), children: [
      "Live: ",
      A
    ] }),
    o && ae && /* @__PURE__ */ _.jsx(ht, { audioData: H, color: c, className: "w-full h-16" }),
    o && b === "idle" && !J && /* @__PURE__ */ _.jsx(ht, { audioData: null, color: c, className: "w-full h-16" })
  ] });
};
export {
  oo as VoiceInputCapture
};
//# sourceMappingURL=react-voice-input.es.js.map

var Jt = Object.defineProperty;
var Kt = (t, r, o) => r in t ? Jt(t, r, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[r] = o;
var N = (t, r, o) => Kt(t, typeof r != "symbol" ? r + "" : r, o);
import * as vt from "react";
import yt, { useState as oe, useEffect as Se, useRef as Fe, useCallback as Re } from "react";
import { Slot as Xt } from "@radix-ui/react-slot";
import { Info as Ht, Save as Zt, AlertTriangle as Qt, RotateCcw as er, StopCircle as tr, Mic as rr } from "lucide-react";
import { toast as Be } from "sonner";
var Me = { exports: {} }, Ie = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lt;
function or() {
  if (lt) return Ie;
  lt = 1;
  var t = yt, r = Symbol.for("react.element"), o = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, c = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(l, u, p) {
    var f, h = {}, g = null, k = null;
    p !== void 0 && (g = "" + p), u.key !== void 0 && (g = "" + u.key), u.ref !== void 0 && (k = u.ref);
    for (f in u) n.call(u, f) && !s.hasOwnProperty(f) && (h[f] = u[f]);
    if (l && l.defaultProps) for (f in u = l.defaultProps, u) h[f] === void 0 && (h[f] = u[f]);
    return { $$typeof: r, type: l, key: g, ref: k, props: h, _owner: c.current };
  }
  return Ie.Fragment = o, Ie.jsx = a, Ie.jsxs = a, Ie;
}
var je = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ct;
function nr() {
  return ct || (ct = 1, process.env.NODE_ENV !== "production" && function() {
    var t = yt, r = Symbol.for("react.element"), o = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), l = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), R = Symbol.iterator, S = "@@iterator";
    function y(e) {
      if (e === null || typeof e != "object")
        return null;
      var i = R && e[R] || e[S];
      return typeof i == "function" ? i : null;
    }
    var T = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function x(e) {
      {
        for (var i = arguments.length, d = new Array(i > 1 ? i - 1 : 0), m = 1; m < i; m++)
          d[m - 1] = arguments[m];
        $("error", e, d);
      }
    }
    function $(e, i, d) {
      {
        var m = T.ReactDebugCurrentFrame, A = m.getStackAddendum();
        A !== "" && (i += "%s", d = d.concat([A]));
        var _ = d.map(function(w) {
          return String(w);
        });
        _.unshift("Warning: " + i), Function.prototype.apply.call(console[e], console, _);
      }
    }
    var G = !1, X = !1, ne = !1, H = !1, pe = !1, Z;
    Z = Symbol.for("react.module.reference");
    function J(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === n || e === s || pe || e === c || e === p || e === f || H || e === k || G || X || ne || typeof e == "object" && e !== null && (e.$$typeof === g || e.$$typeof === h || e.$$typeof === a || e.$$typeof === l || e.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Z || e.getModuleId !== void 0));
    }
    function ie(e, i, d) {
      var m = e.displayName;
      if (m)
        return m;
      var A = i.displayName || i.name || "";
      return A !== "" ? d + "(" + A + ")" : d;
    }
    function C(e) {
      return e.displayName || "Context";
    }
    function M(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && x("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
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
            return C(i) + ".Consumer";
          case a:
            var d = e;
            return C(d._context) + ".Provider";
          case u:
            return ie(e, e.render, "ForwardRef");
          case h:
            var m = e.displayName || null;
            return m !== null ? m : M(e.type) || "Memo";
          case g: {
            var A = e, _ = A._payload, w = A._init;
            try {
              return M(w(_));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var z = Object.assign, U = 0, Y, se, Q, q, ae, L, Ee;
    function le() {
    }
    le.__reactDisabledLog = !0;
    function Ue() {
      {
        if (U === 0) {
          Y = console.log, se = console.info, Q = console.warn, q = console.error, ae = console.group, L = console.groupCollapsed, Ee = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: le,
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
        U++;
      }
    }
    function ze() {
      {
        if (U--, U === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: z({}, e, {
              value: Y
            }),
            info: z({}, e, {
              value: se
            }),
            warn: z({}, e, {
              value: Q
            }),
            error: z({}, e, {
              value: q
            }),
            group: z({}, e, {
              value: ae
            }),
            groupCollapsed: z({}, e, {
              value: L
            }),
            groupEnd: z({}, e, {
              value: Ee
            })
          });
        }
        U < 0 && x("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ae = T.ReactCurrentDispatcher, ke;
    function ve(e, i, d) {
      {
        if (ke === void 0)
          try {
            throw Error();
          } catch (A) {
            var m = A.stack.trim().match(/\n( *(at )?)/);
            ke = m && m[1] || "";
          }
        return `
` + ke + e;
      }
    }
    var ye = !1, he;
    {
      var E = typeof WeakMap == "function" ? WeakMap : Map;
      he = new E();
    }
    function ee(e, i) {
      if (!e || ye)
        return "";
      {
        var d = he.get(e);
        if (d !== void 0)
          return d;
      }
      var m;
      ye = !0;
      var A = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _;
      _ = Ae.current, Ae.current = null, Ue();
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
            } catch (V) {
              m = V;
            }
            Reflect.construct(e, [], w);
          } else {
            try {
              w.call();
            } catch (V) {
              m = V;
            }
            e.call(w.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (V) {
            m = V;
          }
          e();
        }
      } catch (V) {
        if (V && m && typeof V.stack == "string") {
          for (var v = V.stack.split(`
`), W = m.stack.split(`
`), O = v.length - 1, F = W.length - 1; O >= 1 && F >= 0 && v[O] !== W[F]; )
            F--;
          for (; O >= 1 && F >= 0; O--, F--)
            if (v[O] !== W[F]) {
              if (O !== 1 || F !== 1)
                do
                  if (O--, F--, F < 0 || v[O] !== W[F]) {
                    var B = `
` + v[O].replace(" at new ", " at ");
                    return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), typeof e == "function" && he.set(e, B), B;
                  }
                while (O >= 1 && F >= 0);
              break;
            }
        }
      } finally {
        ye = !1, Ae.current = _, ze(), Error.prepareStackTrace = A;
      }
      var we = e ? e.displayName || e.name : "", be = we ? ve(we) : "";
      return typeof e == "function" && he.set(e, be), be;
    }
    function P(e, i, d) {
      return ee(e, !1);
    }
    function te(e) {
      var i = e.prototype;
      return !!(i && i.isReactComponent);
    }
    function D(e, i, d) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ee(e, te(e));
      if (typeof e == "string")
        return ve(e);
      switch (e) {
        case p:
          return ve("Suspense");
        case f:
          return ve("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case u:
            return P(e.render);
          case h:
            return D(e.type, i, d);
          case g: {
            var m = e, A = m._payload, _ = m._init;
            try {
              return D(_(A), i, d);
            } catch {
            }
          }
        }
      return "";
    }
    var K = Object.prototype.hasOwnProperty, ge = {}, ce = T.ReactDebugCurrentFrame;
    function me(e) {
      if (e) {
        var i = e._owner, d = D(e.type, e._source, i ? i.type : null);
        ce.setExtraStackFrame(d);
      } else
        ce.setExtraStackFrame(null);
    }
    function _e(e, i, d, m, A) {
      {
        var _ = Function.call.bind(K);
        for (var w in e)
          if (_(e, w)) {
            var v = void 0;
            try {
              if (typeof e[w] != "function") {
                var W = Error((m || "React class") + ": " + d + " type `" + w + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[w] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw W.name = "Invariant Violation", W;
              }
              v = e[w](i, w, m, d, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (O) {
              v = O;
            }
            v && !(v instanceof Error) && (me(A), x("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", d, w, typeof v), me(null)), v instanceof Error && !(v.message in ge) && (ge[v.message] = !0, me(A), x("Failed %s type: %s", d, v.message), me(null));
          }
      }
    }
    var Ne = Array.isArray;
    function Le(e) {
      return Ne(e);
    }
    function kt(e) {
      {
        var i = typeof Symbol == "function" && Symbol.toStringTag, d = i && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return d;
      }
    }
    function _t(e) {
      try {
        return Xe(e), !1;
      } catch {
        return !0;
      }
    }
    function Xe(e) {
      return "" + e;
    }
    function He(e) {
      if (_t(e))
        return x("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", kt(e)), Xe(e);
    }
    var Ze = T.ReactCurrentOwner, It = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Qe, et;
    function jt(e) {
      if (K.call(e, "ref")) {
        var i = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Pt(e) {
      if (K.call(e, "key")) {
        var i = Object.getOwnPropertyDescriptor(e, "key").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ot(e, i) {
      typeof e.ref == "string" && Ze.current;
    }
    function Nt(e, i) {
      {
        var d = function() {
          Qe || (Qe = !0, x("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
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
          et || (et = !0, x("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        d.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: d,
          configurable: !0
        });
      }
    }
    var Ft = function(e, i, d, m, A, _, w) {
      var v = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: e,
        key: i,
        ref: d,
        props: w,
        // Record the component responsible for creating this element.
        _owner: _
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
        value: A
      }), Object.freeze && (Object.freeze(v.props), Object.freeze(v)), v;
    };
    function Ut(e, i, d, m, A) {
      {
        var _, w = {}, v = null, W = null;
        d !== void 0 && (He(d), v = "" + d), Pt(i) && (He(i.key), v = "" + i.key), jt(i) && (W = i.ref, Ot(i, A));
        for (_ in i)
          K.call(i, _) && !It.hasOwnProperty(_) && (w[_] = i[_]);
        if (e && e.defaultProps) {
          var O = e.defaultProps;
          for (_ in O)
            w[_] === void 0 && (w[_] = O[_]);
        }
        if (v || W) {
          var F = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          v && Nt(w, F), W && Mt(w, F);
        }
        return Ft(e, v, W, A, m, Ze.current, w);
      }
    }
    var We = T.ReactCurrentOwner, tt = T.ReactDebugCurrentFrame;
    function xe(e) {
      if (e) {
        var i = e._owner, d = D(e.type, e._source, i ? i.type : null);
        tt.setExtraStackFrame(d);
      } else
        tt.setExtraStackFrame(null);
    }
    var De;
    De = !1;
    function Ve(e) {
      return typeof e == "object" && e !== null && e.$$typeof === r;
    }
    function rt() {
      {
        if (We.current) {
          var e = M(We.current.type);
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
    var ot = {};
    function Lt(e) {
      {
        var i = rt();
        if (!i) {
          var d = typeof e == "string" ? e : e.displayName || e.name;
          d && (i = `

Check the top-level render call using <` + d + ">.");
        }
        return i;
      }
    }
    function nt(e, i) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var d = Lt(i);
        if (ot[d])
          return;
        ot[d] = !0;
        var m = "";
        e && e._owner && e._owner !== We.current && (m = " It was passed a child from " + M(e._owner.type) + "."), xe(e), x('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', d, m), xe(null);
      }
    }
    function it(e, i) {
      {
        if (typeof e != "object")
          return;
        if (Le(e))
          for (var d = 0; d < e.length; d++) {
            var m = e[d];
            Ve(m) && nt(m, i);
          }
        else if (Ve(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var A = y(e);
          if (typeof A == "function" && A !== e.entries)
            for (var _ = A.call(e), w; !(w = _.next()).done; )
              Ve(w.value) && nt(w.value, i);
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
          var m = M(i);
          _e(d, e.props, "prop", m, e);
        } else if (i.PropTypes !== void 0 && !De) {
          De = !0;
          var A = M(i);
          x("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", A || "Unknown");
        }
        typeof i.getDefaultProps == "function" && !i.getDefaultProps.isReactClassApproved && x("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Dt(e) {
      {
        for (var i = Object.keys(e.props), d = 0; d < i.length; d++) {
          var m = i[d];
          if (m !== "children" && m !== "key") {
            xe(e), x("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), xe(null);
            break;
          }
        }
        e.ref !== null && (xe(e), x("Invalid attribute `ref` supplied to `React.Fragment`."), xe(null));
      }
    }
    var st = {};
    function at(e, i, d, m, A, _) {
      {
        var w = J(e);
        if (!w) {
          var v = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var W = zt();
          W ? v += W : v += rt();
          var O;
          e === null ? O = "null" : Le(e) ? O = "array" : e !== void 0 && e.$$typeof === r ? (O = "<" + (M(e.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : O = typeof e, x("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, v);
        }
        var F = Ut(e, i, d, A, _);
        if (F == null)
          return F;
        if (w) {
          var B = i.children;
          if (B !== void 0)
            if (m)
              if (Le(B)) {
                for (var we = 0; we < B.length; we++)
                  it(B[we], e);
                Object.freeze && Object.freeze(B);
              } else
                x("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              it(B, e);
        }
        if (K.call(i, "key")) {
          var be = M(e), V = Object.keys(i).filter(function(qt) {
            return qt !== "key";
          }), $e = V.length > 0 ? "{key: someKey, " + V.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!st[be + $e]) {
            var Yt = V.length > 0 ? "{" + V.join(": ..., ") + ": ...}" : "{}";
            x(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, $e, be, Yt, be), st[be + $e] = !0;
          }
        }
        return e === n ? Dt(F) : Wt(F), F;
      }
    }
    function Vt(e, i, d) {
      return at(e, i, d, !0);
    }
    function $t(e, i, d) {
      return at(e, i, d, !1);
    }
    var Bt = $t, Gt = Vt;
    je.Fragment = n, je.jsx = Bt, je.jsxs = Gt;
  }()), je;
}
var dt;
function ir() {
  return dt || (dt = 1, process.env.NODE_ENV === "production" ? Me.exports = or() : Me.exports = nr()), Me.exports;
}
var I = ir();
function xt(t) {
  var r, o, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var c = t.length;
    for (r = 0; r < c; r++) t[r] && (o = xt(t[r])) && (n && (n += " "), n += o);
  } else for (o in t) t[o] && (n && (n += " "), n += o);
  return n;
}
function wt() {
  for (var t, r, o = 0, n = "", c = arguments.length; o < c; o++) (t = arguments[o]) && (r = xt(t)) && (n && (n += " "), n += r);
  return n;
}
const ut = (t) => typeof t == "boolean" ? `${t}` : t === 0 ? "0" : t, ft = wt, sr = (t, r) => (o) => {
  var n;
  if ((r == null ? void 0 : r.variants) == null) return ft(t, o == null ? void 0 : o.class, o == null ? void 0 : o.className);
  const { variants: c, defaultVariants: s } = r, a = Object.keys(c).map((p) => {
    const f = o == null ? void 0 : o[p], h = s == null ? void 0 : s[p];
    if (f === null) return null;
    const g = ut(f) || ut(h);
    return c[p][g];
  }), l = o && Object.entries(o).reduce((p, f) => {
    let [h, g] = f;
    return g === void 0 || (p[h] = g), p;
  }, {}), u = r == null || (n = r.compoundVariants) === null || n === void 0 ? void 0 : n.reduce((p, f) => {
    let { class: h, className: g, ...k } = f;
    return Object.entries(k).every((R) => {
      let [S, y] = R;
      return Array.isArray(y) ? y.includes({
        ...s,
        ...l
      }[S]) : {
        ...s,
        ...l
      }[S] === y;
    }) ? [
      ...p,
      h,
      g
    ] : p;
  }, []);
  return ft(t, a, u, o == null ? void 0 : o.class, o == null ? void 0 : o.className);
}, Ke = "-", ar = (t) => {
  const r = cr(t), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: n
  } = t;
  return {
    getClassGroupId: (a) => {
      const l = a.split(Ke);
      return l[0] === "" && l.length !== 1 && l.shift(), Rt(l, r) || lr(a);
    },
    getConflictingClassGroupIds: (a, l) => {
      const u = o[a] || [];
      return l && n[a] ? [...u, ...n[a]] : u;
    }
  };
}, Rt = (t, r) => {
  var a;
  if (t.length === 0)
    return r.classGroupId;
  const o = t[0], n = r.nextPart.get(o), c = n ? Rt(t.slice(1), n) : void 0;
  if (c)
    return c;
  if (r.validators.length === 0)
    return;
  const s = t.join(Ke);
  return (a = r.validators.find(({
    validator: l
  }) => l(s))) == null ? void 0 : a.classGroupId;
}, pt = /^\[(.+)\]$/, lr = (t) => {
  if (pt.test(t)) {
    const r = pt.exec(t)[1], o = r == null ? void 0 : r.substring(0, r.indexOf(":"));
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
    qe(a, n, s, r);
  }), n;
}, qe = (t, r, o, n) => {
  t.forEach((c) => {
    if (typeof c == "string") {
      const s = c === "" ? r : ht(r, c);
      s.classGroupId = o;
      return;
    }
    if (typeof c == "function") {
      if (dr(c)) {
        qe(c(n), r, o, n);
        return;
      }
      r.validators.push({
        validator: c,
        classGroupId: o
      });
      return;
    }
    Object.entries(c).forEach(([s, a]) => {
      qe(a, ht(r, s), o, n);
    });
  });
}, ht = (t, r) => {
  let o = t;
  return r.split(Ke).forEach((n) => {
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
}, St = "!", pr = (t) => {
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
    const g = u.length === 0 ? l : l.substring(f), k = g.startsWith(St), R = k ? g.substring(1) : g, S = h && h > f ? h - f : void 0;
    return {
      modifiers: u,
      hasImportantModifier: k,
      baseClassName: R,
      maybePostfixModifierPosition: S
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
      maybePostfixModifierPosition: k
    } = o(p);
    let R = !!k, S = n(R ? g.substring(0, k) : g);
    if (!S) {
      if (!R) {
        l = p + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (S = n(g), !S) {
        l = p + (l.length > 0 ? " " + l : l);
        continue;
      }
      R = !1;
    }
    const y = hr(f).join(":"), T = h ? y + St : y, x = T + S;
    if (s.includes(x))
      continue;
    s.push(x);
    const $ = c(S, R);
    for (let G = 0; G < $.length; ++G) {
      const X = $[G];
      s.push(T + X);
    }
    l = p + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function vr() {
  let t = 0, r, o, n = "";
  for (; t < arguments.length; )
    (r = arguments[t++]) && (o = Ct(r)) && (n && (n += " "), n += o);
  return n;
}
const Ct = (t) => {
  if (typeof t == "string")
    return t;
  let r, o = "";
  for (let n = 0; n < t.length; n++)
    t[n] && (r = Ct(t[n])) && (o && (o += " "), o += r);
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
const j = (t) => {
  const r = (o) => o[t] || [];
  return r.isThemeGetter = !0, r;
}, Tt = /^\[(?:([a-z-]+):)?(.+)\]$/i, xr = /^\d+\/\d+$/, wr = /* @__PURE__ */ new Set(["px", "full", "screen"]), Rr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Sr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Cr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Tr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Er = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, re = (t) => Ce(t) || wr.has(t) || xr.test(t), de = (t) => Te(t, "length", Nr), Ce = (t) => !!t && !Number.isNaN(Number(t)), Ge = (t) => Te(t, "number", Ce), Pe = (t) => !!t && Number.isInteger(Number(t)), Ar = (t) => t.endsWith("%") && Ce(t.slice(0, -1)), b = (t) => Tt.test(t), ue = (t) => Rr.test(t), kr = /* @__PURE__ */ new Set(["length", "size", "percentage"]), _r = (t) => Te(t, kr, Et), Ir = (t) => Te(t, "position", Et), jr = /* @__PURE__ */ new Set(["image", "url"]), Pr = (t) => Te(t, jr, Fr), Or = (t) => Te(t, "", Mr), Oe = () => !0, Te = (t, r, o) => {
  const n = Tt.exec(t);
  return n ? n[1] ? typeof r == "string" ? n[1] === r : r.has(n[1]) : o(n[2]) : !1;
}, Nr = (t) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Sr.test(t) && !Cr.test(t)
), Et = () => !1, Mr = (t) => Tr.test(t), Fr = (t) => Er.test(t), Ur = () => {
  const t = j("colors"), r = j("spacing"), o = j("blur"), n = j("brightness"), c = j("borderColor"), s = j("borderRadius"), a = j("borderSpacing"), l = j("borderWidth"), u = j("contrast"), p = j("grayscale"), f = j("hueRotate"), h = j("invert"), g = j("gap"), k = j("gradientColorStops"), R = j("gradientColorStopPositions"), S = j("inset"), y = j("margin"), T = j("opacity"), x = j("padding"), $ = j("saturate"), G = j("scale"), X = j("sepia"), ne = j("skew"), H = j("space"), pe = j("translate"), Z = () => ["auto", "contain", "none"], J = () => ["auto", "hidden", "clip", "visible", "scroll"], ie = () => ["auto", b, r], C = () => [b, r], M = () => ["", re, de], z = () => ["auto", Ce, b], U = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], Y = () => ["solid", "dashed", "dotted", "double", "none"], se = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Q = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], q = () => ["", "0", b], ae = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], L = () => [Ce, b];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Oe],
      spacing: [re, de],
      blur: ["none", "", ue, b],
      brightness: L(),
      borderColor: [t],
      borderRadius: ["none", "", "full", ue, b],
      borderSpacing: C(),
      borderWidth: M(),
      contrast: L(),
      grayscale: q(),
      hueRotate: L(),
      invert: q(),
      gap: C(),
      gradientColorStops: [t],
      gradientColorStopPositions: [Ar, de],
      inset: ie(),
      margin: ie(),
      opacity: L(),
      padding: C(),
      saturate: L(),
      scale: L(),
      sepia: q(),
      skew: L(),
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
        columns: [ue]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": ae()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": ae()
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
        object: [...U(), b]
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
        overscroll: Z()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Z()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Z()
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
        inset: [S]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [S]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [S]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [S]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [S]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [S]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [S]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [S]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [S]
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
        z: ["auto", Pe, b]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: ie()
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
        grow: q()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: q()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Pe, b]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Oe]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Pe, b]
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
        "grid-rows": [Oe]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Pe, b]
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
        p: [x]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [x]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [x]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [x]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [x]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [x]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [x]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [x]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [x]
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
        "space-x": [H]
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
        "space-y": [H]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", b, r]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [b, r, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [b, r, "none", "full", "min", "max", "fit", "prose", {
          screen: [ue]
        }, ue]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [b, r, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [b, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [b, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [b, r, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", ue, de]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Ge]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Oe]
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
        "line-clamp": ["none", Ce, Ge]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", re, b]
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
        decoration: [...Y(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", re, de]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", re, b]
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
        bg: [...U(), Ir]
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
        from: [R]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [R]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [R]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [k]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [k]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [k]
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
        border: [...Y(), "hidden"]
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
        divide: Y()
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
        outline: ["", ...Y()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [re, b]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [re, de]
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
        ring: M()
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
        "ring-offset": [re, de]
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
        shadow: ["", "inner", "none", ue, Or]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Oe]
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
        "drop-shadow": ["", "none", ue, b]
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
        saturate: [$]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [X]
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
        "backdrop-saturate": [$]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [X]
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
        duration: L()
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
        delay: L()
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
        rotate: [Pe, b]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [pe]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [pe]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", b]
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
        fill: [t, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [re, de, Ge]
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
function fe(...t) {
  return zr(wt(t));
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
), Je = vt.forwardRef(
  ({ className: t, variant: r, size: o, asChild: n = !1, ...c }, s) => {
    const a = n ? Xt : "button";
    return /* @__PURE__ */ I.jsx(
      a,
      {
        className: fe(Lr({ variant: r, size: o, className: t })),
        ref: s,
        ...c
      }
    );
  }
);
Je.displayName = "Button";
const At = vt.forwardRef(
  ({ className: t, ...r }, o) => /* @__PURE__ */ I.jsx(
    "textarea",
    {
      className: fe(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        t
      ),
      ref: o,
      ...r
    }
  )
);
At.displayName = "Textarea";
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
  const [l, u] = oe(t), p = (f) => {
    const h = f.target.value;
    u(h), r(h), n || o();
  };
  return Se(() => {
    n || u(t);
  }, [t, n]), /* @__PURE__ */ I.jsx("div", { className: fe("flex flex-col space-y-2", s), children: /* @__PURE__ */ I.jsx(
    At,
    {
      value: l,
      onChange: p,
      placeholder: c,
      className: fe(
        "w-full min-h-[60px] text-lg",
        // Default text size changed to text-lg
        a
        // Apply custom classes for the textarea
      ),
      rows: 3
    }
  ) });
}, gt = ({
  audioData: t,
  color: r = "#3b82f6",
  // Default blue-500
  className: o,
  backgroundColor: n = "transparent"
  // Default transparent
}) => {
  const c = Fe(null);
  return Se(() => {
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
      const k = t[h] / 128 * u / 2;
      h === 0 ? a.moveTo(f, k) : a.lineTo(f, k), f += p;
    }
    a.lineTo(l, u / 2), a.stroke();
  }, [t, r, n]), /* @__PURE__ */ I.jsx(
    "canvas",
    {
      ref: c,
      className: fe("w-full h-16 rounded-md", o),
      width: 300,
      height: 64
    }
  );
}, Dr = 3e3, Vr = 5e3;
class $r {
  constructor(r) {
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
    const k = g * a, R = Math.min(k + a, s);
    let S = 0;
    for (let y = k; y < R; y++) {
      const T = Math.abs(u[y]);
      T > S && (S = T);
    }
    if (S < o)
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
    for (let k = 0; k < r; k++)
      u = Math.max(-1, Math.min(1, a[k][g])), s.setInt16(p, u * 32767, !0), p += 2;
  return console.log("AudioUtils: Encoded AudioBuffer to WAV Blob."), new Blob([s], { type: "audio/wav" });
}
const Jr = "0.1.65", Kr = {
  version: Jr
}, mt = "stop recording", bt = 0.75, Xr = 3e3, Hr = 5e3, Ye = (t) => t ? t.charAt(0).toUpperCase() + t.slice(1) : "", oo = ({
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
  recordButtonClassName: g,
  className: k = "w-full max-w-2xl"
}) => {
  const [R, S] = oe("idle"), [y, T] = oe(""), [x, $] = oe(r), [G, X] = oe(null), [ne, H] = oe(null), [pe, Z] = oe(null), [J, ie] = oe(null), [C, M] = oe(!1), z = Fe(null), U = Fe(""), Y = Fe(R);
  Se(() => {
    Y.current = R;
  }, [R]);
  const se = Re((E) => {
    const ee = E.trim();
    if (!ee) return;
    let P = U.current;
    if (!P)
      U.current = Ye(ee);
    else {
      const te = P.slice(-1), D = [".", "!", "?"].includes(te), K = P.endsWith(" ");
      !D && !K ? P += ". " : D && !K && (P += " "), U.current = P + Ye(ee);
    }
    U.current = U.current.trim(), Y.current === "recording" && ($(U.current), M(!1));
  }, []), Q = Re((E) => {
    n && T(Ye(E.trim()));
  }, [n]), q = Re(() => {
    console.log("VIC: handleRecordingStart triggered"), S("recording"), H(null), T(""), U.current = "", Z(null), ie((E) => (E && URL.revokeObjectURL(E), null)), M(!1);
  }, []), ae = Re(async (E, ee) => {
    console.log("VIC: handleRecordingStop triggered. Audio Blob exists:", !!E, "Audio URL:", ee);
    let P = U.current.trim();
    P && ![".", "!", "?"].includes(P.slice(-1)) && (P += "."), S("idle"), T("");
    let te = E, D = ee;
    if (P.toLowerCase().endsWith(mt + ".") && E) {
      const K = mt + ".", ge = P.toLowerCase().lastIndexOf(K);
      if (ge === 0 || ge > 0 && P[ge - 1] === " ") {
        P = P.substring(0, ge).trim();
        const ce = await Br(E);
        if (ce) {
          const me = Gr(ce.audioBuffer, bt);
          if (me < ce.duration - bt / 2) {
            const _e = Yr(ce.audioBuffer, me);
            if (_e && _e !== ce.audioBuffer) {
              const Ne = qr(_e);
              D && URL.revokeObjectURL(D), te = Ne, D = URL.createObjectURL(Ne);
            }
          }
        }
      }
    }
    $(P), Z(te), ie(D), P || te ? (console.log("VIC: handleRecordingStop, calling onSave with:", { text: P, blob: !!te, url: D }), t(P, te, D)) : console.log("VIC: handleRecordingStop, NOT calling onSave (no text/audio)."), M(!1);
  }, [t]), L = Re((E) => {
    console.error("VIC: handleError triggered:", E), S("error"), H(E), T(""), X(null), Be.error(E || "An unknown recording error occurred.", { duration: 5e3 }), U.current = "", M(!1);
  }, []), Ee = Re((E) => {
    o && X(new Uint8Array(E));
  }, [o]);
  Se(() => {
    console.log("VIC: Initializing EnhancedSpeechRecorder with timeouts:", { silenceTimeout: l, initialSpeechTimeout: u });
    const E = new $r({
      onFinalTranscript: se,
      onInterimTranscript: Q,
      onRecordingStart: q,
      onRecordingStop: ae,
      onError: L,
      onAudioData: Ee,
      silenceTimeout: l,
      initialSpeechTimeout: u
    });
    return z.current = E, () => {
      console.log("VIC: Disposing EnhancedSpeechRecorder."), E.dispose(), z.current = null;
    };
  }, [se, Q, q, ae, L, Ee, l, u]), Se(() => {
    !le && !C && x !== r && $(r);
  }, [r, x, C, R]);
  const le = R === "recording" || R === "listening";
  Se(() => {
    const E = J;
    return () => {
      E && URL.revokeObjectURL(E);
    };
  }, [J]);
  const Ue = async () => {
    if (console.log("VIC: toggleRecording called. Current state:", Y.current, "Disabled:", a), !a) {
      if (!z.current) {
        Be.error("Recorder not ready. Please try again."), console.error("VIC: toggleRecording - speechRecorderRef is null!");
        return;
      }
      if (le)
        console.log("VIC: toggleRecording - stopping recording."), z.current.stopRecording("manual");
      else {
        console.log("VIC: toggleRecording - starting recording."), H(null), S("listening"), U.current = "";
        try {
          await z.current.startRecording(), console.log("VIC: toggleRecording - startRecording promise resolved.");
        } catch (E) {
          console.error("VIC: toggleRecording - error calling startRecording:", E), L(E.message || "Failed to start recording."), S("idle");
        }
      }
    }
  }, ze = (E) => {
    $(E), C || M(!0);
  }, Ae = () => {
    console.log("VIC: handleManualSave, calling onSave with:", { text: x, blob: !!pe, url: J }), t(x, pe, J), Be.success("Text saved manually!"), M(!1);
  }, ke = () => {
    console.log("VIC: handleRetryError called."), H(null), S("idle"), M(!1);
  }, ve = () => R === "error" ? /* @__PURE__ */ I.jsx(er, { className: "w-4 h-4" }) : le ? /* @__PURE__ */ I.jsx(tr, { className: "w-4 h-4" }) : /* @__PURE__ */ I.jsx(rr, { className: "w-4 h-4" }), ye = () => R === "error" ? "Retry" : R === "listening" ? "Listening..." : R === "recording" ? "Stop Recording" : "Record", he = Kr.version;
  return /* @__PURE__ */ I.jsx("div", { className: k, children: /* @__PURE__ */ I.jsxs("div", { className: fe("relative p-3 sm:p-4 border rounded-lg shadow-sm bg-card mx-auto space-y-3", { "opacity-75 cursor-not-allowed": a }), children: [
    p && he && /* @__PURE__ */ I.jsxs("div", { className: "absolute top-2 right-2 flex items-center space-x-1 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ I.jsx(Ht, { className: "w-3 h-3" }),
      /* @__PURE__ */ I.jsxs("span", { children: [
        "v",
        he
      ] })
    ] }),
    /* @__PURE__ */ I.jsx("div", { className: "flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-4", children: /* @__PURE__ */ I.jsx("div", { className: "flex-grow w-full", children: /* @__PURE__ */ I.jsx(
      Wr,
      {
        initialText: x,
        onTextChange: ze,
        placeholder: s,
        className: "w-full",
        textDisplayClassName: f,
        isEditing: C,
        onEditing: () => {
          M(!0);
        }
      }
    ) }) }),
    /* @__PURE__ */ I.jsxs("div", { className: "flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ I.jsxs(
        Je,
        {
          onClick: R === "error" ? ke : Ue,
          disabled: a && R !== "error",
          className: fe(
            "flex-shrink-0 w-full sm:w-auto",
            g,
            R === "error" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""
          ),
          "aria-label": ye(),
          children: [
            ve(),
            /* @__PURE__ */ I.jsx("span", { className: "ml-2", children: ye() })
          ]
        }
      ),
      C && /* @__PURE__ */ I.jsxs(Je, { onClick: Ae, className: "flex-shrink-0 w-full sm:w-auto", children: [
        /* @__PURE__ */ I.jsx(Zt, { className: "w-4 h-4 mr-2" }),
        "Save Text"
      ] })
    ] }),
    R === "error" && ne && /* @__PURE__ */ I.jsxs("div", { className: "flex items-center p-2 text-sm text-destructive-foreground bg-destructive rounded-md", children: [
      /* @__PURE__ */ I.jsx(Qt, { className: "w-4 h-4 mr-2 flex-shrink-0" }),
      " ",
      /* @__PURE__ */ I.jsxs("span", { children: [
        "Error: ",
        ne
      ] })
    ] }),
    n && le && y && /* @__PURE__ */ I.jsxs("div", { className: fe(
      "p-2 text-sm text-muted-foreground bg-muted/30 rounded-md min-h-[2.5rem] italic",
      // Default base styles
      h
      // Custom styles passed as prop
    ), children: [
      "Live: ",
      y
    ] }),
    o && le && /* @__PURE__ */ I.jsx(gt, { audioData: G, color: c, className: "w-full h-16" }),
    o && R === "idle" && !ne && /* @__PURE__ */ I.jsx(gt, { audioData: null, color: c, className: "w-full h-16" })
  ] }) });
};
export {
  oo as VoiceInputCapture
};
//# sourceMappingURL=react-voice-input.es.js.map

var Jr = Object.defineProperty;
var Kr = (r, o, t) => o in r ? Jr(r, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[o] = t;
var M = (r, o, t) => Kr(r, typeof o != "symbol" ? o + "" : o, t);
import * as gr from "react";
import mr, { useState as oe, useEffect as xe, useRef as Ne, useCallback as ye } from "react";
import { Slot as Xr } from "@radix-ui/react-slot";
import { Save as Hr, AlertTriangle as Zr, RotateCcw as Qr, StopCircle as et, Mic as rt } from "lucide-react";
import { toast as re } from "sonner";
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
var nr;
function tt() {
  if (nr) return Ce;
  nr = 1;
  var r = mr, o = Symbol.for("react.element"), t = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, c = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(l, p, d) {
    var f, h = {}, g = null, S = null;
    d !== void 0 && (g = "" + d), p.key !== void 0 && (g = "" + p.key), p.ref !== void 0 && (S = p.ref);
    for (f in p) n.call(p, f) && !s.hasOwnProperty(f) && (h[f] = p[f]);
    if (l && l.defaultProps) for (f in p = l.defaultProps, p) h[f] === void 0 && (h[f] = p[f]);
    return { $$typeof: o, type: l, key: g, ref: S, props: h, _owner: c.current };
  }
  return Ce.Fragment = t, Ce.jsx = a, Ce.jsxs = a, Ce;
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
var ir;
function ot() {
  return ir || (ir = 1, process.env.NODE_ENV !== "production" && function() {
    var r = mr, o = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), l = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), I = Symbol.iterator, k = "@@iterator";
    function y(e) {
      if (e === null || typeof e != "object")
        return null;
      var i = I && e[I] || e[k];
      return typeof i == "function" ? i : null;
    }
    var E = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(e) {
      {
        for (var i = arguments.length, u = new Array(i > 1 ? i - 1 : 0), m = 1; m < i; m++)
          u[m - 1] = arguments[m];
        Z("error", e, u);
      }
    }
    function Z(e, i, u) {
      {
        var m = E.ReactDebugCurrentFrame, T = m.getStackAddendum();
        T !== "" && (i += "%s", u = u.concat([T]));
        var A = u.map(function(x) {
          return String(x);
        });
        A.unshift("Warning: " + i), Function.prototype.apply.call(console[e], console, A);
      }
    }
    var B = !1, X = !1, ue = !1, Q = !1, D = !1, L;
    L = Symbol.for("react.module.reference");
    function ne(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === n || e === s || D || e === c || e === d || e === f || Q || e === S || B || X || ue || typeof e == "object" && e !== null && (e.$$typeof === g || e.$$typeof === h || e.$$typeof === a || e.$$typeof === l || e.$$typeof === p || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === L || e.getModuleId !== void 0));
    }
    function ie(e, i, u) {
      var m = e.displayName;
      if (m)
        return m;
      var T = i.displayName || i.name || "";
      return T !== "" ? u + "(" + T + ")" : u;
    }
    function C(e) {
      return e.displayName || "Context";
    }
    function $(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case n:
          return "Fragment";
        case t:
          return "Portal";
        case s:
          return "Profiler";
        case c:
          return "StrictMode";
        case d:
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
            var u = e;
            return C(u._context) + ".Provider";
          case p:
            return ie(e, e.render, "ForwardRef");
          case h:
            var m = e.displayName || null;
            return m !== null ? m : $(e.type) || "Memo";
          case g: {
            var T = e, A = T._payload, x = T._init;
            try {
              return $(x(A));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var F = Object.assign, J = 0, ee, fe, se, H, ae, z, R;
    function K() {
    }
    K.__reactDisabledLog = !0;
    function j() {
      {
        if (J === 0) {
          ee = console.log, fe = console.info, se = console.warn, H = console.error, ae = console.group, z = console.groupCollapsed, R = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: K,
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
        J++;
      }
    }
    function ge() {
      {
        if (J--, J === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: F({}, e, {
              value: ee
            }),
            info: F({}, e, {
              value: fe
            }),
            warn: F({}, e, {
              value: se
            }),
            error: F({}, e, {
              value: H
            }),
            group: F({}, e, {
              value: ae
            }),
            groupCollapsed: F({}, e, {
              value: z
            }),
            groupEnd: F({}, e, {
              value: R
            })
          });
        }
        J < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var G = E.ReactCurrentDispatcher, V;
    function me(e, i, u) {
      {
        if (V === void 0)
          try {
            throw Error();
          } catch (T) {
            var m = T.stack.trim().match(/\n( *(at )?)/);
            V = m && m[1] || "";
          }
        return `
` + V + e;
      }
    }
    var le = !1, Y;
    {
      var Se = typeof WeakMap == "function" ? WeakMap : Map;
      Y = new Se();
    }
    function pe(e, i) {
      if (!e || le)
        return "";
      {
        var u = Y.get(e);
        if (u !== void 0)
          return u;
      }
      var m;
      le = !0;
      var T = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var A;
      A = G.current, G.current = null, j();
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
            } catch (W) {
              m = W;
            }
            Reflect.construct(e, [], x);
          } else {
            try {
              x.call();
            } catch (W) {
              m = W;
            }
            e.call(x.prototype);
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
          for (var v = W.stack.split(`
`), U = m.stack.split(`
`), O = v.length - 1, N = U.length - 1; O >= 1 && N >= 0 && v[O] !== U[N]; )
            N--;
          for (; O >= 1 && N >= 0; O--, N--)
            if (v[O] !== U[N]) {
              if (O !== 1 || N !== 1)
                do
                  if (O--, N--, N < 0 || v[O] !== U[N]) {
                    var q = `
` + v[O].replace(" at new ", " at ");
                    return e.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", e.displayName)), typeof e == "function" && Y.set(e, q), q;
                  }
                while (O >= 1 && N >= 0);
              break;
            }
        }
      } finally {
        le = !1, G.current = A, ge(), Error.prepareStackTrace = T;
      }
      var ve = e ? e.displayName || e.name : "", he = ve ? me(ve) : "";
      return typeof e == "function" && Y.set(e, he), he;
    }
    function Ie(e, i, u) {
      return pe(e, !1);
    }
    function Cr(e) {
      var i = e.prototype;
      return !!(i && i.isReactComponent);
    }
    function Pe(e, i, u) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return pe(e, Cr(e));
      if (typeof e == "string")
        return me(e);
      switch (e) {
        case d:
          return me("Suspense");
        case f:
          return me("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case p:
            return Ie(e.render);
          case h:
            return Pe(e.type, i, u);
          case g: {
            var m = e, T = m._payload, A = m._init;
            try {
              return Pe(A(T), i, u);
            } catch {
            }
          }
        }
      return "";
    }
    var Ee = Object.prototype.hasOwnProperty, Be = {}, Ge = E.ReactDebugCurrentFrame;
    function je(e) {
      if (e) {
        var i = e._owner, u = Pe(e.type, e._source, i ? i.type : null);
        Ge.setExtraStackFrame(u);
      } else
        Ge.setExtraStackFrame(null);
    }
    function Tr(e, i, u, m, T) {
      {
        var A = Function.call.bind(Ee);
        for (var x in e)
          if (A(e, x)) {
            var v = void 0;
            try {
              if (typeof e[x] != "function") {
                var U = Error((m || "React class") + ": " + u + " type `" + x + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[x] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw U.name = "Invariant Violation", U;
              }
              v = e[x](i, x, m, u, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (O) {
              v = O;
            }
            v && !(v instanceof Error) && (je(T), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", u, x, typeof v), je(null)), v instanceof Error && !(v.message in Be) && (Be[v.message] = !0, je(T), w("Failed %s type: %s", u, v.message), je(null));
          }
      }
    }
    var kr = Array.isArray;
    function Me(e) {
      return kr(e);
    }
    function Ar(e) {
      {
        var i = typeof Symbol == "function" && Symbol.toStringTag, u = i && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return u;
      }
    }
    function _r(e) {
      try {
        return Ye(e), !1;
      } catch {
        return !0;
      }
    }
    function Ye(e) {
      return "" + e;
    }
    function qe(e) {
      if (_r(e))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ar(e)), Ye(e);
    }
    var Je = E.ReactCurrentOwner, Ir = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ke, Xe;
    function Pr(e) {
      if (Ee.call(e, "ref")) {
        var i = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function jr(e) {
      if (Ee.call(e, "key")) {
        var i = Object.getOwnPropertyDescriptor(e, "key").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Or(e, i) {
      typeof e.ref == "string" && Je.current;
    }
    function Nr(e, i) {
      {
        var u = function() {
          Ke || (Ke = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
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
          Xe || (Xe = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        u.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: u,
          configurable: !0
        });
      }
    }
    var Fr = function(e, i, u, m, T, A, x) {
      var v = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: o,
        // Built-in properties that belong on the element
        type: e,
        key: i,
        ref: u,
        props: x,
        // Record the component responsible for creating this element.
        _owner: A
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
    function zr(e, i, u, m, T) {
      {
        var A, x = {}, v = null, U = null;
        u !== void 0 && (qe(u), v = "" + u), jr(i) && (qe(i.key), v = "" + i.key), Pr(i) && (U = i.ref, Or(i, T));
        for (A in i)
          Ee.call(i, A) && !Ir.hasOwnProperty(A) && (x[A] = i[A]);
        if (e && e.defaultProps) {
          var O = e.defaultProps;
          for (A in O)
            x[A] === void 0 && (x[A] = O[A]);
        }
        if (v || U) {
          var N = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          v && Nr(x, N), U && Mr(x, N);
        }
        return Fr(e, v, U, T, m, Je.current, x);
      }
    }
    var Fe = E.ReactCurrentOwner, He = E.ReactDebugCurrentFrame;
    function be(e) {
      if (e) {
        var i = e._owner, u = Pe(e.type, e._source, i ? i.type : null);
        He.setExtraStackFrame(u);
      } else
        He.setExtraStackFrame(null);
    }
    var ze;
    ze = !1;
    function Ue(e) {
      return typeof e == "object" && e !== null && e.$$typeof === o;
    }
    function Ze() {
      {
        if (Fe.current) {
          var e = $(Fe.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function Ur(e) {
      return "";
    }
    var Qe = {};
    function Dr(e) {
      {
        var i = Ze();
        if (!i) {
          var u = typeof e == "string" ? e : e.displayName || e.name;
          u && (i = `

Check the top-level render call using <` + u + ">.");
        }
        return i;
      }
    }
    function er(e, i) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var u = Dr(i);
        if (Qe[u])
          return;
        Qe[u] = !0;
        var m = "";
        e && e._owner && e._owner !== Fe.current && (m = " It was passed a child from " + $(e._owner.type) + "."), be(e), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', u, m), be(null);
      }
    }
    function rr(e, i) {
      {
        if (typeof e != "object")
          return;
        if (Me(e))
          for (var u = 0; u < e.length; u++) {
            var m = e[u];
            Ue(m) && er(m, i);
          }
        else if (Ue(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var T = y(e);
          if (typeof T == "function" && T !== e.entries)
            for (var A = T.call(e), x; !(x = A.next()).done; )
              Ue(x.value) && er(x.value, i);
        }
      }
    }
    function Lr(e) {
      {
        var i = e.type;
        if (i == null || typeof i == "string")
          return;
        var u;
        if (typeof i == "function")
          u = i.propTypes;
        else if (typeof i == "object" && (i.$$typeof === p || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        i.$$typeof === h))
          u = i.propTypes;
        else
          return;
        if (u) {
          var m = $(i);
          Tr(u, e.props, "prop", m, e);
        } else if (i.PropTypes !== void 0 && !ze) {
          ze = !0;
          var T = $(i);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", T || "Unknown");
        }
        typeof i.getDefaultProps == "function" && !i.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function $r(e) {
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
    var tr = {};
    function or(e, i, u, m, T, A) {
      {
        var x = ne(e);
        if (!x) {
          var v = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var U = Ur();
          U ? v += U : v += Ze();
          var O;
          e === null ? O = "null" : Me(e) ? O = "array" : e !== void 0 && e.$$typeof === o ? (O = "<" + ($(e.type) || "Unknown") + " />", v = " Did you accidentally export a JSX literal instead of a component?") : O = typeof e, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, v);
        }
        var N = zr(e, i, u, T, A);
        if (N == null)
          return N;
        if (x) {
          var q = i.children;
          if (q !== void 0)
            if (m)
              if (Me(q)) {
                for (var ve = 0; ve < q.length; ve++)
                  rr(q[ve], e);
                Object.freeze && Object.freeze(q);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              rr(q, e);
        }
        if (Ee.call(i, "key")) {
          var he = $(e), W = Object.keys(i).filter(function(qr) {
            return qr !== "key";
          }), De = W.length > 0 ? "{key: someKey, " + W.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!tr[he + De]) {
            var Yr = W.length > 0 ? "{" + W.join(": ..., ") + ": ...}" : "{}";
            w(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, De, he, Yr, he), tr[he + De] = !0;
          }
        }
        return e === n ? $r(N) : Lr(N), N;
      }
    }
    function Wr(e, i, u) {
      return or(e, i, u, !0);
    }
    function Vr(e, i, u) {
      return or(e, i, u, !1);
    }
    var Br = Vr, Gr = Wr;
    Te.Fragment = n, Te.jsx = Br, Te.jsxs = Gr;
  }()), Te;
}
var sr;
function nt() {
  return sr || (sr = 1, process.env.NODE_ENV === "production" ? Oe.exports = tt() : Oe.exports = ot()), Oe.exports;
}
var P = nt();
function br(r) {
  var o, t, n = "";
  if (typeof r == "string" || typeof r == "number") n += r;
  else if (typeof r == "object") if (Array.isArray(r)) {
    var c = r.length;
    for (o = 0; o < c; o++) r[o] && (t = br(r[o])) && (n && (n += " "), n += t);
  } else for (t in r) r[t] && (n && (n += " "), n += t);
  return n;
}
function vr() {
  for (var r, o, t = 0, n = "", c = arguments.length; t < c; t++) (r = arguments[t]) && (o = br(r)) && (n && (n += " "), n += o);
  return n;
}
const ar = (r) => typeof r == "boolean" ? `${r}` : r === 0 ? "0" : r, lr = vr, it = (r, o) => (t) => {
  var n;
  if ((o == null ? void 0 : o.variants) == null) return lr(r, t == null ? void 0 : t.class, t == null ? void 0 : t.className);
  const { variants: c, defaultVariants: s } = o, a = Object.keys(c).map((d) => {
    const f = t == null ? void 0 : t[d], h = s == null ? void 0 : s[d];
    if (f === null) return null;
    const g = ar(f) || ar(h);
    return c[d][g];
  }), l = t && Object.entries(t).reduce((d, f) => {
    let [h, g] = f;
    return g === void 0 || (d[h] = g), d;
  }, {}), p = o == null || (n = o.compoundVariants) === null || n === void 0 ? void 0 : n.reduce((d, f) => {
    let { class: h, className: g, ...S } = f;
    return Object.entries(S).every((I) => {
      let [k, y] = I;
      return Array.isArray(y) ? y.includes({
        ...s,
        ...l
      }[k]) : {
        ...s,
        ...l
      }[k] === y;
    }) ? [
      ...d,
      h,
      g
    ] : d;
  }, []);
  return lr(r, a, p, t == null ? void 0 : t.class, t == null ? void 0 : t.className);
}, We = "-", st = (r) => {
  const o = lt(r), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: n
  } = r;
  return {
    getClassGroupId: (a) => {
      const l = a.split(We);
      return l[0] === "" && l.length !== 1 && l.shift(), yr(l, o) || at(a);
    },
    getConflictingClassGroupIds: (a, l) => {
      const p = t[a] || [];
      return l && n[a] ? [...p, ...n[a]] : p;
    }
  };
}, yr = (r, o) => {
  var a;
  if (r.length === 0)
    return o.classGroupId;
  const t = r[0], n = o.nextPart.get(t), c = n ? yr(r.slice(1), n) : void 0;
  if (c)
    return c;
  if (o.validators.length === 0)
    return;
  const s = r.join(We);
  return (a = o.validators.find(({
    validator: l
  }) => l(s))) == null ? void 0 : a.classGroupId;
}, cr = /^\[(.+)\]$/, at = (r) => {
  if (cr.test(r)) {
    const o = cr.exec(r)[1], t = o == null ? void 0 : o.substring(0, o.indexOf(":"));
    if (t)
      return "arbitrary.." + t;
  }
}, lt = (r) => {
  const {
    theme: o,
    prefix: t
  } = r, n = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return dt(Object.entries(r.classGroups), t).forEach(([s, a]) => {
    $e(a, n, s, o);
  }), n;
}, $e = (r, o, t, n) => {
  r.forEach((c) => {
    if (typeof c == "string") {
      const s = c === "" ? o : dr(o, c);
      s.classGroupId = t;
      return;
    }
    if (typeof c == "function") {
      if (ct(c)) {
        $e(c(n), o, t, n);
        return;
      }
      o.validators.push({
        validator: c,
        classGroupId: t
      });
      return;
    }
    Object.entries(c).forEach(([s, a]) => {
      $e(a, dr(o, s), t, n);
    });
  });
}, dr = (r, o) => {
  let t = r;
  return o.split(We).forEach((n) => {
    t.nextPart.has(n) || t.nextPart.set(n, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), t = t.nextPart.get(n);
  }), t;
}, ct = (r) => r.isThemeGetter, dt = (r, o) => o ? r.map(([t, n]) => {
  const c = n.map((s) => typeof s == "string" ? o + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, l]) => [o + a, l])) : s);
  return [t, c];
}) : r, ut = (r) => {
  if (r < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let o = 0, t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  const c = (s, a) => {
    t.set(s, a), o++, o > r && (o = 0, n = t, t = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let a = t.get(s);
      if (a !== void 0)
        return a;
      if ((a = n.get(s)) !== void 0)
        return c(s, a), a;
    },
    set(s, a) {
      t.has(s) ? t.set(s, a) : c(s, a);
    }
  };
}, xr = "!", ft = (r) => {
  const {
    separator: o,
    experimentalParseClassName: t
  } = r, n = o.length === 1, c = o[0], s = o.length, a = (l) => {
    const p = [];
    let d = 0, f = 0, h;
    for (let y = 0; y < l.length; y++) {
      let E = l[y];
      if (d === 0) {
        if (E === c && (n || l.slice(y, y + s) === o)) {
          p.push(l.slice(f, y)), f = y + s;
          continue;
        }
        if (E === "/") {
          h = y;
          continue;
        }
      }
      E === "[" ? d++ : E === "]" && d--;
    }
    const g = p.length === 0 ? l : l.substring(f), S = g.startsWith(xr), I = S ? g.substring(1) : g, k = h && h > f ? h - f : void 0;
    return {
      modifiers: p,
      hasImportantModifier: S,
      baseClassName: I,
      maybePostfixModifierPosition: k
    };
  };
  return t ? (l) => t({
    className: l,
    parseClassName: a
  }) : a;
}, pt = (r) => {
  if (r.length <= 1)
    return r;
  const o = [];
  let t = [];
  return r.forEach((n) => {
    n[0] === "[" ? (o.push(...t.sort(), n), t = []) : t.push(n);
  }), o.push(...t.sort()), o;
}, ht = (r) => ({
  cache: ut(r.cacheSize),
  parseClassName: ft(r),
  ...st(r)
}), gt = /\s+/, mt = (r, o) => {
  const {
    parseClassName: t,
    getClassGroupId: n,
    getConflictingClassGroupIds: c
  } = o, s = [], a = r.trim().split(gt);
  let l = "";
  for (let p = a.length - 1; p >= 0; p -= 1) {
    const d = a[p], {
      modifiers: f,
      hasImportantModifier: h,
      baseClassName: g,
      maybePostfixModifierPosition: S
    } = t(d);
    let I = !!S, k = n(I ? g.substring(0, S) : g);
    if (!k) {
      if (!I) {
        l = d + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (k = n(g), !k) {
        l = d + (l.length > 0 ? " " + l : l);
        continue;
      }
      I = !1;
    }
    const y = pt(f).join(":"), E = h ? y + xr : y, w = E + k;
    if (s.includes(w))
      continue;
    s.push(w);
    const Z = c(k, I);
    for (let B = 0; B < Z.length; ++B) {
      const X = Z[B];
      s.push(E + X);
    }
    l = d + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function bt() {
  let r = 0, o, t, n = "";
  for (; r < arguments.length; )
    (o = arguments[r++]) && (t = wr(o)) && (n && (n += " "), n += t);
  return n;
}
const wr = (r) => {
  if (typeof r == "string")
    return r;
  let o, t = "";
  for (let n = 0; n < r.length; n++)
    r[n] && (o = wr(r[n])) && (t && (t += " "), t += o);
  return t;
};
function vt(r, ...o) {
  let t, n, c, s = a;
  function a(p) {
    const d = o.reduce((f, h) => h(f), r());
    return t = ht(d), n = t.cache.get, c = t.cache.set, s = l, l(p);
  }
  function l(p) {
    const d = n(p);
    if (d)
      return d;
    const f = mt(p, t);
    return c(p, f), f;
  }
  return function() {
    return s(bt.apply(null, arguments));
  };
}
const _ = (r) => {
  const o = (t) => t[r] || [];
  return o.isThemeGetter = !0, o;
}, Rr = /^\[(?:([a-z-]+):)?(.+)\]$/i, yt = /^\d+\/\d+$/, xt = /* @__PURE__ */ new Set(["px", "full", "screen"]), wt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Rt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, St = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Et = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ct = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, te = (r) => we(r) || xt.has(r) || yt.test(r), ce = (r) => Re(r, "length", Ot), we = (r) => !!r && !Number.isNaN(Number(r)), Le = (r) => Re(r, "number", we), ke = (r) => !!r && Number.isInteger(Number(r)), Tt = (r) => r.endsWith("%") && we(r.slice(0, -1)), b = (r) => Rr.test(r), de = (r) => wt.test(r), kt = /* @__PURE__ */ new Set(["length", "size", "percentage"]), At = (r) => Re(r, kt, Sr), _t = (r) => Re(r, "position", Sr), It = /* @__PURE__ */ new Set(["image", "url"]), Pt = (r) => Re(r, It, Mt), jt = (r) => Re(r, "", Nt), Ae = () => !0, Re = (r, o, t) => {
  const n = Rr.exec(r);
  return n ? n[1] ? typeof o == "string" ? n[1] === o : o.has(n[1]) : t(n[2]) : !1;
}, Ot = (r) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Rt.test(r) && !St.test(r)
), Sr = () => !1, Nt = (r) => Et.test(r), Mt = (r) => Ct.test(r), Ft = () => {
  const r = _("colors"), o = _("spacing"), t = _("blur"), n = _("brightness"), c = _("borderColor"), s = _("borderRadius"), a = _("borderSpacing"), l = _("borderWidth"), p = _("contrast"), d = _("grayscale"), f = _("hueRotate"), h = _("invert"), g = _("gap"), S = _("gradientColorStops"), I = _("gradientColorStopPositions"), k = _("inset"), y = _("margin"), E = _("opacity"), w = _("padding"), Z = _("saturate"), B = _("scale"), X = _("sepia"), ue = _("skew"), Q = _("space"), D = _("translate"), L = () => ["auto", "contain", "none"], ne = () => ["auto", "hidden", "clip", "visible", "scroll"], ie = () => ["auto", b, o], C = () => [b, o], $ = () => ["", te, ce], F = () => ["auto", we, b], J = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], ee = () => ["solid", "dashed", "dotted", "double", "none"], fe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], se = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], H = () => ["", "0", b], ae = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], z = () => [we, b];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Ae],
      spacing: [te, ce],
      blur: ["none", "", de, b],
      brightness: z(),
      borderColor: [r],
      borderRadius: ["none", "", "full", de, b],
      borderSpacing: C(),
      borderWidth: $(),
      contrast: z(),
      grayscale: H(),
      hueRotate: z(),
      invert: H(),
      gap: C(),
      gradientColorStops: [r],
      gradientColorStopPositions: [Tt, ce],
      inset: ie(),
      margin: ie(),
      opacity: z(),
      padding: C(),
      saturate: z(),
      scale: z(),
      sepia: H(),
      skew: z(),
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
        columns: [de]
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
        object: [...J(), b]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: ne()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": ne()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": ne()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: L()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": L()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": L()
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
        inset: [k]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [k]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [k]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [k]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [k]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [k]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [k]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [k]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [k]
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
        "grid-cols": [Ae]
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
        "col-start": F()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": F()
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
          span: [ke, b]
        }, b]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": F()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": F()
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
        justify: ["normal", ...se()]
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
        content: ["normal", ...se(), "baseline"]
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
        "place-content": [...se(), "baseline"]
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
        "space-x": [Q]
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
        "space-y": [Q]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", b, o]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [b, o, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [b, o, "none", "full", "min", "max", "fit", "prose", {
          screen: [de]
        }, de]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [b, o, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [b, o, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [b, o, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [b, o, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", de, ce]
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
        "line-clamp": ["none", we, Le]
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
        decoration: [...ee(), "wavy"]
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
        bg: [...J(), _t]
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
        bg: ["auto", "cover", "contain", At]
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
        from: [I]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [I]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [I]
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
        "border-opacity": [E]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...ee(), "hidden"]
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
        divide: ee()
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
        outline: ["", ...ee()]
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
        ring: $()
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
        shadow: ["", "inner", "none", de, jt]
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
        opacity: [E]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...fe(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": fe()
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
        blur: [t]
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
        contrast: [p]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", de, b]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [d]
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
        saturate: [Z]
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
        "backdrop-blur": [t]
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
        "backdrop-contrast": [p]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [d]
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
        "backdrop-opacity": [E]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [Z]
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
        duration: z()
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
        delay: z()
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
        scale: [B]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [B]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [B]
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
        "translate-x": [D]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [D]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [ue]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [ue]
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
        stroke: [te, ce, Le]
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
}, zt = /* @__PURE__ */ vt(Ft);
function _e(...r) {
  return zt(vr(r));
}
const Ut = it(
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
), Ve = gr.forwardRef(
  ({ className: r, variant: o, size: t, asChild: n = !1, ...c }, s) => {
    const a = n ? Xr : "button";
    return /* @__PURE__ */ P.jsx(
      a,
      {
        className: _e(Ut({ variant: o, size: t, className: r })),
        ref: s,
        ...c
      }
    );
  }
);
Ve.displayName = "Button";
const Er = gr.forwardRef(
  ({ className: r, ...o }, t) => /* @__PURE__ */ P.jsx(
    "textarea",
    {
      className: _e(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        r
      ),
      ref: t,
      ...o
    }
  )
);
Er.displayName = "Textarea";
const Dt = ({
  initialText: r,
  onTextChange: o,
  placeholder: t = "Type here...",
  className: n
}) => {
  const [c, s] = oe(r), [a, l] = oe(!1);
  xe(() => {
    a || s(r);
  }, [r, a]);
  const p = (f) => {
    s(f.target.value), a || l(!0);
  }, d = () => {
    o(c), l(!1);
  };
  return /* @__PURE__ */ P.jsxs("div", { className: `flex flex-col space-y-2 ${n}`, children: [
    /* @__PURE__ */ P.jsx(
      Er,
      {
        value: c,
        onChange: p,
        onBlur: d,
        placeholder: t,
        className: "w-full min-h-[60px] text-base",
        rows: 3
      }
    ),
    a && /* @__PURE__ */ P.jsxs(Ve, { onClick: d, size: "sm", className: "self-end", children: [
      /* @__PURE__ */ P.jsx(Hr, { className: "w-4 h-4 mr-2" }),
      "Save Text"
    ] })
  ] });
}, ur = ({
  audioData: r,
  color: o = "#3b82f6",
  // Default blue-500
  className: t,
  backgroundColor: n = "transparent"
  // Default transparent
}) => {
  const c = Ne(null);
  return xe(() => {
    const s = c.current;
    if (!s) return;
    const a = s.getContext("2d");
    if (!a) return;
    const { width: l, height: p } = s;
    if (a.clearRect(0, 0, l, p), a.fillStyle = n, a.fillRect(0, 0, l, p), !r || r.length === 0) {
      a.beginPath(), a.moveTo(0, p / 2), a.lineTo(l, p / 2), a.strokeStyle = o, a.lineWidth = 1, a.stroke();
      return;
    }
    a.lineWidth = 2, a.strokeStyle = o, a.beginPath();
    const d = l * 1 / r.length;
    let f = 0;
    for (let h = 0; h < r.length; h++) {
      const S = r[h] / 128 * p / 2;
      h === 0 ? a.moveTo(f, S) : a.lineTo(f, S), f += d;
    }
    a.lineTo(l, p / 2), a.stroke();
  }, [r, o, n]), /* @__PURE__ */ P.jsx(
    "canvas",
    {
      ref: c,
      className: _e("w-full h-16 rounded-md", t),
      width: 300,
      height: 64
    }
  );
}, Lt = 3e3, $t = 5e3;
class Wt {
  constructor(o) {
    M(this, "mediaRecorder", null);
    M(this, "audioChunks", []);
    M(this, "speechRecognition", null);
    // Changed to any to bypass SpeechRecognition type issues
    M(this, "audioContext", null);
    M(this, "analyserNode", null);
    M(this, "sourceNode", null);
    M(this, "dataArray", null);
    M(this, "animationFrameId", null);
    M(this, "silenceTimeoutId", null);
    M(this, "initialSpeechTimeoutId", null);
    M(this, "hasDetectedSpeech", !1);
    M(this, "isManuallyStopping", !1);
    M(this, "stopReason", null);
    M(this, "options");
    M(this, "drawWaveform", () => {
      this.analyserNode && this.dataArray && (this.analyserNode.getByteTimeDomainData(this.dataArray), this.options.onAudioData(this.dataArray), this.animationFrameId = requestAnimationFrame(this.drawWaveform));
    });
    M(this, "cleanupAudioProcessing", () => {
      this.animationFrameId && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null), this.sourceNode && (this.sourceNode.disconnect(), this.sourceNode = null), this.analyserNode && (this.analyserNode = null), this.audioContext && this.audioContext.state !== "closed" && (this.audioContext.close().catch((o) => console.warn("ESR: Error closing audio context", o)), this.audioContext = null), this.dataArray = null;
    });
    this.options = {
      silenceTimeout: o.silenceTimeout ?? Lt,
      initialSpeechTimeout: o.initialSpeechTimeout ?? $t,
      continuous: o.continuous ?? !0,
      interimResults: o.interimResults ?? !0,
      ...o
    }, console.log("ESR: Constructor. Silence Timeout:", this.options.silenceTimeout, "Initial Speech Timeout:", this.options.initialSpeechTimeout), this.initializeSpeechRecognition();
  }
  initializeSpeechRecognition() {
    const o = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!o) {
      this.options.onError("Speech Recognition API not supported in this browser.");
      return;
    }
    this.speechRecognition = new o(), this.speechRecognition.continuous = this.options.continuous, this.speechRecognition.interimResults = this.options.interimResults, this.speechRecognition.lang = navigator.language || "en-US", this.speechRecognition.onresult = (t) => {
      this.clearInitialSpeechTimer(), this.hasDetectedSpeech = !0, this.resetSilenceTimer();
      let n = "";
      for (let c = t.resultIndex; c < t.results.length; ++c) {
        const s = t.results[c][0].transcript;
        t.results[c].isFinal ? (console.log("ESR: Final segment received from speech engine:", s), this.options.onFinalTranscript(s.trim())) : n += s;
      }
      n && this.options.onInterimTranscript(n.trim());
    }, this.speechRecognition.onerror = (t) => {
      console.error("ESR: Speech recognition error", t.error, t.message);
      let n = t.error;
      t.error === "no-speech" ? (n = "No speech detected. Please try again.", this.stopReason = "initial_timeout") : t.error === "audio-capture" ? n = "Audio capture error. Check microphone permissions." : t.error === "not-allowed" ? n = "Microphone access denied. Please allow microphone access." : n = t.message || "An unknown speech recognition error occurred.", this.options.onError(n), this.stopRecordingInternal(this.stopReason || "error");
    }, this.speechRecognition.onstart = () => {
      console.log("ESR: onstart fired."), this.options.onRecordingStart(), this.startInitialSpeechTimer();
    }, this.speechRecognition.onend = () => {
      console.log("ESR: onend fired. Reason for stop (if known before onstop):", this.stopReason), this.mediaRecorder && this.mediaRecorder.state === "recording" && this.stopRecordingInternal(this.stopReason || "manual");
    }, this.speechRecognition.onspeechend = () => {
      console.log("ESR: onspeechend fired."), this.resetSilenceTimer();
    };
  }
  startInitialSpeechTimer() {
    this.clearInitialSpeechTimer(), this.hasDetectedSpeech = !1, console.log("ESR: Starting initial speech timer for ms:", this.options.initialSpeechTimeout), this.initialSpeechTimeoutId = setTimeout(() => {
      this.hasDetectedSpeech || (console.log("ESR: Initial speech timeout, stopping recording."), this.options.onError("No speech detected within the initial timeout."), this.stopReason = "initial_timeout", this.stopRecordingInternal("initial_timeout"));
    }, this.options.initialSpeechTimeout);
  }
  clearInitialSpeechTimer() {
    this.initialSpeechTimeoutId && (clearTimeout(this.initialSpeechTimeoutId), this.initialSpeechTimeoutId = null);
  }
  resetSilenceTimer() {
    this.clearSilenceTimer(), this.silenceTimeoutId = setTimeout(() => {
      console.log("ESR: Silence (pause) detected, stopping recording."), this.stopReason = "silence", this.stopRecordingInternal("silence");
    }, this.options.silenceTimeout);
  }
  clearSilenceTimer() {
    this.silenceTimeoutId && (clearTimeout(this.silenceTimeoutId), this.silenceTimeoutId = null);
  }
  setupMediaRecorder(o) {
    try {
      this.mediaRecorder = new MediaRecorder(o), this.audioChunks = [], this.mediaRecorder.ondataavailable = (t) => {
        t.data.size > 0 && this.audioChunks.push(t.data);
      }, this.mediaRecorder.onstop = () => {
        var c;
        console.log("ESR: mediaRecorder.onstop. Reason for stop:", this.stopReason);
        const t = this.audioChunks.length > 0 ? new Blob(this.audioChunks, { type: ((c = this.audioChunks[0]) == null ? void 0 : c.type) || "audio/webm" }) : null, n = t ? URL.createObjectURL(t) : null;
        this.options.onRecordingStop(t, n), this.cleanupAudioProcessing(), this.audioChunks = [], this.isManuallyStopping = !1, this.stopReason = null;
      }, this.mediaRecorder.onerror = (t) => {
        console.error("ESR: MediaRecorder error", t), this.options.onError("MediaRecorder error."), this.stopRecordingInternal("error");
      };
    } catch (t) {
      console.error("ESR: Error setting up MediaRecorder:", t), this.options.onError("Failed to set up audio recording.");
      return;
    }
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)(), this.analyserNode = this.audioContext.createAnalyser(), this.analyserNode.fftSize = 2048;
      const t = this.analyserNode.frequencyBinCount;
      this.dataArray = new Uint8Array(t), this.sourceNode = this.audioContext.createMediaStreamSource(o), this.sourceNode.connect(this.analyserNode), this.drawWaveform();
    } catch (t) {
      console.error("ESR: Error setting up Web Audio API for waveform:", t);
    }
  }
  async startRecording() {
    if (console.log("ESR: Public startRecording called."), !this.speechRecognition) {
      this.options.onError("Speech recognition not initialized.");
      return;
    }
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      console.warn("ESR: Recording already in progress.");
      return;
    }
    this.isManuallyStopping = !1, this.stopReason = null;
    try {
      const o = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      this.setupMediaRecorder(o), this.mediaRecorder && this.mediaRecorder.start(), this.speechRecognition.start(), this.hasDetectedSpeech = !1;
    } catch (o) {
      console.error("ESR: Error starting recording:", o);
      let t = "Error starting recording.";
      o instanceof Error && (o.name === "NotAllowedError" || o.name === "PermissionDeniedError" ? t = "Microphone access denied. Please allow microphone access." : o.name === "NotFoundError" || o.name === "DevicesNotFoundError" ? t = "No microphone found. Please connect a microphone." : t = o.message || "Could not access microphone."), this.options.onError(t);
    }
  }
  stopRecording(o = "manual") {
    console.log("ESR: Public stopRecording (" + o + ") called."), this.isManuallyStopping = !0, this.stopReason = o, this.stopRecordingInternal(o);
  }
  stopRecordingInternal(o) {
    var t;
    if (console.log("ESR: stopRecordingInternal. Reason:", o), this.clearInitialSpeechTimer(), this.clearSilenceTimer(), this.speechRecognition)
      try {
        this.speechRecognition.stop();
      } catch (n) {
        console.warn("ESR: Error stopping speech recognition (might be already stopped):", n);
      }
    if (this.mediaRecorder && this.mediaRecorder.state === "recording")
      this.mediaRecorder.stop();
    else if (this.mediaRecorder && this.mediaRecorder.state === "inactive") {
      if (this.audioChunks.length > 0 && !this.isManuallyStopping) {
        const n = new Blob(this.audioChunks, { type: ((t = this.audioChunks[0]) == null ? void 0 : t.type) || "audio/webm" }), c = URL.createObjectURL(n);
        this.options.onRecordingStop(n, c), this.audioChunks = [];
      }
      this.cleanupAudioProcessing();
    } else
      this.cleanupAudioProcessing();
    this.mediaRecorder && this.mediaRecorder.stream && this.mediaRecorder.stream.getTracks().forEach((n) => n.stop());
  }
}
async function Vt(r) {
  try {
    const o = await r.arrayBuffer(), t = new (window.AudioContext || window.webkitAudioContext)(), n = await t.decodeAudioData(o);
    return await t.close(), { audioBuffer: n, duration: n.duration };
  } catch (o) {
    return console.error("Error decoding audio blob:", o), null;
  }
}
function Bt(r, o = 0.5, t = 0.01, n = 0.05) {
  const { sampleRate: c, length: s } = r;
  if (s === 0) return 0;
  const a = Math.floor(c * n), l = Math.ceil(o / n), p = r.getChannelData(0);
  let d = Math.floor(s / a) - 1, f = 0;
  for (let g = Math.floor(s / a) - 1; g >= 0; g--) {
    const S = g * a, I = Math.min(S + a, s);
    let k = 0;
    for (let y = S; y < I; y++) {
      const E = Math.abs(p[y]);
      E > k && (k = E);
    }
    if (k < t)
      g === Math.floor(s / a) - 1 - f && f++;
    else {
      d = g;
      break;
    }
  }
  let h = (d + 1) * a / c;
  if (h = Math.min(h, r.duration), console.log(`AudioUtils: Initial lastSoundTime: ${h.toFixed(2)}s. Consecutive silent chunks at end: ${f}`), f >= l) {
    const g = s / c - f * n;
    return console.log(`AudioUtils: Sufficient trailing silence detected. Sound considered to end at: ${g.toFixed(2)}s`), g;
  } else
    return console.log(`AudioUtils: Not enough trailing silence (found ${f * n}s, need ${o}s). Returning original duration or end of last detected sound.`), r.duration;
}
function Gt(r, o) {
  const { sampleRate: t, numberOfChannels: n, length: c } = r, s = Math.max(0.01, o), a = Math.floor(s * t);
  if (a <= 0 || a > c)
    return console.error("AudioUtils: Invalid new duration for trimming.", s, "Original:", r.duration, "Attempted samples:", a, "Original samples:", c), r;
  if (Math.abs(r.duration - s) < 0.01)
    return console.log("AudioUtils: Trim duration very close to original. Returning original buffer."), r;
  try {
    const l = new (window.AudioContext || window.webkitAudioContext)(), p = l.createBuffer(
      n,
      a,
      t
    );
    for (let d = 0; d < n; d++) {
      const f = r.getChannelData(d);
      p.getChannelData(d).set(f.subarray(0, a));
    }
    return l.close(), console.log(`AudioUtils: Trimmed AudioBuffer from ${r.duration.toFixed(2)}s to ${p.duration.toFixed(2)}s`), p;
  } catch (l) {
    return console.error("AudioUtils: Error trimming AudioBuffer:", l), null;
  }
}
function Yt(r) {
  const o = r.numberOfChannels, t = o, n = r.length * o * 2 + 44, c = new ArrayBuffer(n), s = new DataView(c), a = [];
  let l = 0, p = 0, d = 0;
  function f(g) {
    s.setUint16(d, g, !0), d += 2;
  }
  function h(g) {
    s.setUint32(d, g, !0), d += 4;
  }
  for (h(1179011410), h(n - 8), h(1163280727), h(544501094), h(16), f(1), f(t), h(r.sampleRate), h(r.sampleRate * 2 * t), f(t * 2), f(16), h(1635017060), h(n - d - 4), l = 0; l < t; l++)
    a.push(r.getChannelData(l));
  for (let g = 0; g < r.length; g++)
    for (let S = 0; S < o; S++)
      p = Math.max(-1, Math.min(1, a[S][g])), s.setInt16(d, p * 32767, !0), d += 2;
  return console.log("AudioUtils: Encoded AudioBuffer to WAV Blob."), new Blob([s], { type: "audio/wav" });
}
const fr = "stop recording", pr = 0.75, hr = (r) => r ? r.charAt(0).toUpperCase() + r.slice(1) : "", Zt = ({
  onSave: r,
  initialText: o = "",
  showWaveform: t = !0,
  showInterimTranscript: n = !0,
  customWaveformColor: c,
  placeholder: s = "Speak or type here...",
  disabled: a = !1,
  silenceTimeout: l,
  // This comes from VoiceInputCaptureProps now
  initialSpeechTimeout: p
  // This comes from VoiceInputCaptureProps now
}) => {
  const [d, f] = oe("idle"), [h, g] = oe(""), [S, I] = oe(o), [k, y] = oe(null), [E, w] = oe(null), [Z, B] = oe(null), [X, ue] = oe(null), Q = Ne(null), D = Ne(""), L = Ne(d);
  xe(() => {
    L.current = d;
  }, [d]);
  const ne = ye((R) => {
    const K = R.trim();
    if (!K) return;
    let j = D.current;
    if (!j)
      D.current = hr(K);
    else {
      const ge = j.slice(-1), G = [".", "!", "?"].includes(ge), V = j.endsWith(" ");
      !G && !V ? j += ". " : G && !V && (j += " "), D.current = j + hr(K);
    }
    D.current = D.current.trim(), L.current === "recording" && I(D.current);
  }, []), ie = ye((R) => {
    n && g(R);
  }, [n]), C = ye(() => {
    f("recording"), w(null), g(""), D.current = "", I(""), B(null), ue((R) => (R && URL.revokeObjectURL(R), null));
  }, []), $ = ye(async (R, K) => {
    let j = D.current.trim();
    console.log(`VIC: handleRecordingStop. Text: "${j}", Blob: ${!!R}`), j && ![".", "!", "?"].includes(j.slice(-1)) && (j += "."), f("idle"), g("");
    let ge = !1, G = R, V = K;
    if (j.toLowerCase().endsWith(fr + ".") && R) {
      const me = fr + ".", le = j.toLowerCase().lastIndexOf(me);
      if (le === 0 || le > 0 && j[le - 1] === " ") {
        console.log("VIC: 'stop recording.' command detected in text. Attempting audio trim."), j = j.substring(0, le).trim(), ge = !0;
        const Y = await Vt(R);
        if (Y) {
          const Se = Bt(Y.audioBuffer, pr);
          if (Se < Y.duration - pr / 2) {
            console.log(`VIC: Sound before command/trailing silence estimated to end at ${Se.toFixed(2)}s. Original duration: ${Y.duration.toFixed(2)}s.`);
            const pe = Gt(Y.audioBuffer, Se);
            if (pe && pe !== Y.audioBuffer) {
              const Ie = Yt(pe);
              V && URL.revokeObjectURL(V), G = Ie, V = URL.createObjectURL(Ie), re.success("Audio trimmed for 'stop recording' command."), console.log(`VIC: Audio trimmed. New blob size: ${G.size}, New URL: ${V}`);
            } else pe === Y.audioBuffer ? re.info("Audio trim resulted in no change, using original audio.") : re.info("Audio trimming failed, using original audio.");
          } else
            re.info("No significant trailing silence to trim, using original audio.");
        } else
          re.info("Audio decoding failed for trimming, using original audio.");
      }
    }
    I(j), B(G), ue(V), j || G ? r(j, G, V) : (ge ? re.info("'Stop recording' command processed, no other content.") : re.info("No text or audio detected for dictation."), I(""));
  }, [r]), F = ye((R) => {
    console.error(`VIC: handleError. Error: ${R}`), f("error"), w(R), g(""), y(null), re.error(R || "An unknown recording error occurred.", { duration: 5e3 }), D.current = "";
  }, []), J = ye((R) => {
    t && y(new Uint8Array(R));
  }, [t]);
  xe(() => (console.log("VIC: useEffect for EnhancedSpeechRecorder setup. Silence:", l, "Initial:", p), Q.current = new Wt({
    onFinalTranscript: ne,
    onInterimTranscript: ie,
    onRecordingStart: C,
    onRecordingStop: $,
    onError: F,
    onAudioData: J,
    silenceTimeout: l,
    initialSpeechTimeout: p
  }), () => {
    var R;
    console.log("VIC: Cleanup useEffect - Stopping recorder."), (R = Q.current) == null || R.stopRecording("manual");
  }), [ne, ie, C, $, F, J, l, p]), xe(() => {
    L.current !== "recording" && L.current !== "listening" && o !== S && I(o);
  }, [o, S]), xe(() => {
    const R = X;
    return () => {
      R && URL.revokeObjectURL(R);
    };
  }, [X]);
  const ee = async () => {
    var R, K;
    console.log(`VIC: toggleRecording. Current state: ${L.current}`), !a && (L.current === "recording" || L.current === "listening" ? (R = Q.current) == null || R.stopRecording("manual") : (w(null), f("listening"), await ((K = Q.current) == null ? void 0 : K.startRecording())));
  }, fe = (R) => {
    I(R), r(R, Z, X), re.success("Text saved manually!");
  }, se = () => {
    w(null), f("idle");
  }, H = () => d === "error" ? /* @__PURE__ */ P.jsx(Qr, { className: "w-5 h-5" }) : d === "recording" || d === "listening" ? /* @__PURE__ */ P.jsx(et, { className: "w-5 h-5 text-red-500" }) : /* @__PURE__ */ P.jsx(rt, { className: "w-5 h-5" }), ae = () => d === "error" ? "Retry" : d === "recording" ? "Stop Recording" : d === "listening" ? "Listening..." : "Start Recording", z = d === "recording" || d === "listening";
  return /* @__PURE__ */ P.jsxs("div", { className: _e("p-3 sm:p-4 border rounded-lg shadow-sm bg-card w-full max-w-2xl mx-auto space-y-3", { "opacity-75 cursor-not-allowed": a }), children: [
    /* @__PURE__ */ P.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2", children: [
      /* @__PURE__ */ P.jsxs(
        Ve,
        {
          onClick: d === "error" ? se : ee,
          disabled: a && d !== "error",
          className: _e("flex-shrink-0 w-full sm:w-auto", d === "error" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""),
          "aria-label": ae(),
          children: [
            H(),
            /* @__PURE__ */ P.jsx("span", { className: "ml-2", children: ae() })
          ]
        }
      ),
      /* @__PURE__ */ P.jsx("div", { className: "flex-grow w-full", children: /* @__PURE__ */ P.jsx(
        Dt,
        {
          initialText: S,
          onTextChange: fe,
          placeholder: s,
          className: "w-full"
        }
      ) })
    ] }),
    d === "error" && E && /* @__PURE__ */ P.jsxs("div", { className: "flex items-center p-2 text-sm text-destructive-foreground bg-destructive rounded-md", children: [
      /* @__PURE__ */ P.jsx(Zr, { className: "w-4 h-4 mr-2 flex-shrink-0" }),
      " ",
      /* @__PURE__ */ P.jsxs("span", { children: [
        "Error: ",
        E
      ] })
    ] }),
    n && z && h && /* @__PURE__ */ P.jsx("div", { className: "p-2 text-sm text-muted-foreground bg-muted/30 rounded-md min-h-[2.5rem] italic", children: h }),
    t && z && /* @__PURE__ */ P.jsx(ur, { audioData: k, color: c, className: "w-full h-16" }),
    t && d === "idle" && !E && // Show empty waveform when idle and no error
    /* @__PURE__ */ P.jsx(ur, { audioData: null, color: c, className: "w-full h-16" })
  ] });
};
export {
  Zt as VoiceInputCapture
};
//# sourceMappingURL=react-voice-input.es.js.map

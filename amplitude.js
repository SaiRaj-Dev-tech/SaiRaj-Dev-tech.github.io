!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).amplitude = t()
}(this, function() {
    "use strict";
    function t(e) {
        return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        )(e)
    }
    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
        e
    }
    function l(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {}
              , i = Object.keys(n);
            "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable
            }))),
            i.forEach(function(e) {
                r(t, e, n[e])
            })
        }
        return t
    }
    var f = "$default_instance"
      , c = 2
      , n = 4096
      , a = 1e3
      , h = "$identify"
      , g = "$groupidentify"
      , v = "amplitude_lastEventId"
      , m = "amplitude_lastEventTime"
      , y = "amplitude_lastIdentifyId"
      , _ = "amplitude_lastSequenceNumber"
      , w = "amplitude_sessionId"
      , b = "amplitude_deviceId"
      , I = "amplitude_optOut"
      , S = "amplitude_userId"
      , i = "amplitude_cookie_test"
      , o = "revenue_amount"
      , s = "$productId"
      , u = "$quantity"
      , p = "$price"
      , d = "$revenueType"
      , E = "amp_device_id"
      , O = "referrer"
      , x = "utm_source"
      , N = "utm_medium"
      , k = "utm_campaign"
      , T = "utm_term"
      , P = "utm_content"
      , A = function(e) {
        for (var t = "", n = 0; n < e.length; n++) {
            var i = e.charCodeAt(n);
            i < 128 ? t += String.fromCharCode(i) : (127 < i && i < 2048 ? t += String.fromCharCode(i >> 6 | 192) : (t += String.fromCharCode(i >> 12 | 224),
            t += String.fromCharCode(i >> 6 & 63 | 128)),
            t += String.fromCharCode(63 & i | 128))
        }
        return t
    }
      , R = function(e) {
        for (var t = "", n = 0, i = 0, r = 0, o = 0; n < e.length; )
            (i = e.charCodeAt(n)) < 128 ? (t += String.fromCharCode(i),
            n++) : 191 < i && i < 224 ? (r = e.charCodeAt(n + 1),
            t += String.fromCharCode((31 & i) << 6 | 63 & r),
            n += 2) : (r = e.charCodeAt(n + 1),
            o = e.charCodeAt(n + 2),
            t += String.fromCharCode((15 & i) << 12 | (63 & r) << 6 | 63 & o),
            n += 3);
        return t
    }
      , q = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(e) {
            try {
                if (window.btoa && window.atob)
                    return window.btoa(unescape(encodeURIComponent(e)))
            } catch (e) {}
            return q._encode(e)
        },
        _encode: function(e) {
            var t, n, i, r, o, s, a, u = "", p = 0;
            for (e = A(e); p < e.length; )
                r = (t = e.charCodeAt(p++)) >> 2,
                o = (3 & t) << 4 | (n = e.charCodeAt(p++)) >> 4,
                s = (15 & n) << 2 | (i = e.charCodeAt(p++)) >> 6,
                a = 63 & i,
                isNaN(n) ? s = a = 64 : isNaN(i) && (a = 64),
                u = u + q._keyStr.charAt(r) + q._keyStr.charAt(o) + q._keyStr.charAt(s) + q._keyStr.charAt(a);
            return u
        },
        decode: function(e) {
            try {
                if (window.btoa && window.atob)
                    return decodeURIComponent(escape(window.atob(e)))
            } catch (e) {}
            return q._decode(e)
        },
        _decode: function(e) {
            var t, n, i, r, o, s, a = "", u = 0;
            for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); u < e.length; )
                t = q._keyStr.indexOf(e.charAt(u++)) << 2 | (r = q._keyStr.indexOf(e.charAt(u++))) >> 4,
                n = (15 & r) << 4 | (o = q._keyStr.indexOf(e.charAt(u++))) >> 2,
                i = (3 & o) << 6 | (s = q._keyStr.indexOf(e.charAt(u++))),
                a += String.fromCharCode(t),
                64 !== o && (a += String.fromCharCode(n)),
                64 !== s && (a += String.fromCharCode(i));
            return a = R(a)
        }
    }
      , j = Object.prototype.toString;
    function C(e) {
        switch (j.call(e)) {
        case "[object Date]":
            return "date";
        case "[object RegExp]":
            return "regexp";
        case "[object Arguments]":
            return "arguments";
        case "[object Array]":
            return "array";
        case "[object Error]":
            return "error"
        }
        return null === e ? "null" : void 0 === e ? "undefined" : e != e ? "nan" : e && 1 === e.nodeType ? "element" : "undefined" != typeof Buffer && "function" == typeof Buffer.isBuffer && Buffer.isBuffer(e) ? "buffer" : t(e = e.valueOf ? e.valueOf() : Object.prototype.valueOf.apply(e))
    }
    var e, U = {
        DISABLE: 0,
        ERROR: 1,
        WARN: 2,
        INFO: 3
    }, D = U.WARN, M = {
        error: function(e) {
            D >= U.ERROR && z(e)
        },
        warn: function(e) {
            D >= U.WARN && z(e)
        },
        info: function(e) {
            D >= U.INFO && z(e)
        }
    }, z = function(e) {
        try {
            console.log("[Amplitude] " + e)
        } catch (e) {}
    }, B = function(e) {
        return "string" === C(e) && e.length > n ? e.substring(0, n) : e
    }, G = function(e) {
        var t = C(e);
        if ("object" !== t)
            return M.error("Error: invalid properties format. Expecting Javascript object, received " + t + ", ignoring"),
            {};
        if (Object.keys(e).length > a)
            return M.error("Error: too many properties (more than 1000), ignoring"),
            {};
        var n = {};
        for (var i in e)
            if (e.hasOwnProperty(i)) {
                var r = i
                  , o = C(r);
                "string" !== o && (r = String(r),
                M.warn("WARNING: Non-string property key, received type " + o + ', coercing to string "' + r + '"'));
                var s = F(r, e[i]);
                null !== s && (n[r] = s)
            }
        return n
    }, L = ["nan", "function", "arguments", "regexp", "element"], F = function e(t, n) {
        var i = C(n);
        if (-1 !== L.indexOf(i))
            M.warn('WARNING: Property key "' + t + '" with invalid value type ' + i + ", ignoring"),
            n = null;
        else if ("undefined" === i)
            n = null;
        else if ("error" === i)
            n = String(n),
            M.warn('WARNING: Property key "' + t + '" with value type error, coercing to ' + n);
        else if ("array" === i) {
            for (var r = [], o = 0; o < n.length; o++) {
                var s = n[o]
                  , a = C(s);
                "array" !== a ? "object" === a ? r.push(G(s)) : r.push(e(t, s)) : M.warn("WARNING: Cannot have " + a + " nested in an array property value, skipping")
            }
            n = r
        } else
            "object" === i && (n = G(n));
        return n
    }, K = function(e, t) {
        var n = C(t);
        if ("string" === n)
            return t;
        if ("date" === n || "number" === n || "boolean" === n)
            return t = String(t),
            M.warn("WARNING: Non-string groupName, received type " + n + ', coercing to string "' + t + '"'),
            t;
        if ("array" === n) {
            for (var i = [], r = 0; r < t.length; r++) {
                var o = t[r]
                  , s = C(o);
                "array" !== s && "object" !== s ? "string" === s ? i.push(o) : "date" !== s && "number" !== s && "boolean" !== s || (o = String(o),
                M.warn("WARNING: Non-string groupName, received type " + s + ', coercing to string "' + o + '"'),
                i.push(o)) : M.warn("WARNING: Skipping nested " + s + " in array groupName")
            }
            return i
        }
        M.warn("WARNING: Non-string groupName, received type " + n + ". Please use strings or array of strings for groupName")
    }, V = function(e) {
        U.hasOwnProperty(e) && (D = U[e])
    }, W = M, $ = function(e) {
        return !e || 0 === e.length
    }, J = function(e, t) {
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var n = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(t);
        return null === n ? void 0 : decodeURIComponent(n[1].replace(/\+/g, " "))
    }, Q = function e(t) {
        if ("array" === C(t))
            for (var n = 0; n < t.length; n++)
                t[n] = e(t[n]);
        else if ("object" === C(t))
            for (var i in t)
                t.hasOwnProperty(i) && (t[i] = e(t[i]));
        else
            t = B(t);
        return t
    }, X = function(e) {
        var t = C(e);
        if ("object" !== t)
            return M.error("Error: invalid groups format. Expecting Javascript object, received " + t + ", ignoring"),
            {};
        var n = {};
        for (var i in e)
            if (e.hasOwnProperty(i)) {
                var r = i
                  , o = C(r);
                "string" !== o && (r = String(r),
                M.warn("WARNING: Non-string groupType, received type " + o + ', coercing to string "' + r + '"'));
                var s = K(r, e[i]);
                null !== s && (n[r] = s)
            }
        return n
    }, H = function(e, t, n) {
        return C(e) === n || (M.error("Invalid " + t + " input type. Expected " + n + " but received " + C(e)),
        !1)
    }, Z = G, Y = function(e, t, n) {
        var i = null !== t ? n.expirationDays : -1;
        if (i) {
            var r = new Date;
            r.setTime(r.getTime() + 24 * i * 60 * 60 * 1e3),
            i = r
        }
        var o = e + "=" + t;
        i && (o += "; expires=" + i.toUTCString()),
        o += "; path=/",
        n.domain && (o += "; domain=" + n.domain),
        n.secure && (o += "; Secure"),
        document.cookie = o
    }, ee = function(e) {
        try {
            for (var t = document.cookie.split(";"), n = null, i = 0; i < t.length; i++) {
                for (var r = t[i]; " " === r.charAt(0); )
                    r = r.substring(1, r.length);
                if (0 === r.indexOf(e)) {
                    n = r.substring(e.length, r.length);
                    break
                }
            }
            return n
        } catch (e) {
            return null
        }
    }, te = {
        expirationDays: void 0,
        domain: void 0
    }, ne = function(e) {
        var t, n, i = (t = e,
        (n = document.createElement("a")).href = t,
        n.hostname || location.hostname).split("."), r = i[i.length - 1], o = [];
        if (4 === i.length && r === parseInt(r, 10))
            return o;
        if (i.length <= 1)
            return o;
        for (var s = i.length - 2; 0 <= s; --s)
            o.push(i.slice(s).join("."));
        for (var a = 0; a < o.length; ++a) {
            var u = "__tld_test__"
              , p = o[a]
              , c = {
                domain: "." + p
            };
            if (Y(u, 1, c),
            ee(u))
                return Y(u, null, c),
                p
        }
        return ""
    }, ie = function(e) {
        var t = "";
        return te.domain && (t = "." === te.domain.charAt(0) ? te.domain.substring(1) : te.domain),
        e + t
    }, re = function(e) {
        var t = ie(e) + "="
          , n = ee(t);
        try {
            if (n)
                return JSON.parse(q.decode(n))
        } catch (e) {
            return null
        }
        return null
    }, oe = function(e, t) {
        try {
            return Y(ie(e), q.encode(JSON.stringify(t)), te),
            !0
        } catch (e) {
            return !1
        }
    }, se = function(e) {
        try {
            return Y(ie(e), null, te),
            !0
        } catch (e) {
            return !1
        }
    }, ae = {
        reset: function() {
            te = {
                expirationDays: void 0,
                domain: void 0
            }
        },
        options: function(e) {
            if (0 === arguments.length)
                return te;
            e = e || {},
            te.expirationDays = e.expirationDays,
            te.secure = e.secure;
            var t = $(e.domain) ? "." + ne(window.location.href) : e.domain
              , n = Math.random();
            te.domain = t,
            oe("amplitude_test", n);
            var i = re("amplitude_test");
            return i && i === n || (t = null),
            se("amplitude_test"),
            te.domain = t,
            te
        },
        get: re,
        set: oe,
        remove: se
    };
    if (function() {
        var e, t = new Date;
        try {
            return window.localStorage.setItem(t, t),
            e = window.localStorage.getItem(t) === String(t),
            window.localStorage.removeItem(t),
            e
        } catch (e) {}
        return !1
    }())
        e = window.localStorage;
    else if (window.globalStorage)
        try {
            e = window.globalStorage[window.location.hostname]
        } catch (e) {}
    else {
        var ue = document.createElement("div")
          , pe = "localStorage";
        ue.style.display = "none",
        document.getElementsByTagName("head")[0].appendChild(ue),
        ue.addBehavior && (ue.addBehavior("#default#userdata"),
        e = {
            length: 0,
            setItem: function(e, t) {
                ue.load(pe),
                ue.getAttribute(e) || this.length++,
                ue.setAttribute(e, t),
                ue.save(pe)
            },
            getItem: function(e) {
                return ue.load(pe),
                ue.getAttribute(e)
            },
            removeItem: function(e) {
                ue.load(pe),
                ue.getAttribute(e) && this.length--,
                ue.removeAttribute(e),
                ue.save(pe)
            },
            clear: function() {
                ue.load(pe);
                for (var e, t = 0; e = ue.XMLDocument.documentElement.attributes[t++]; )
                    ue.removeAttribute(e.name);
                ue.save(pe),
                this.length = 0
            },
            key: function(e) {
                return ue.load(pe),
                ue.XMLDocument.documentElement.attributes[e]
            }
        },
        ue.load(pe),
        e.length = ue.XMLDocument.documentElement.attributes.length)
    }
    e || (e = {
        length: 0,
        setItem: function(e, t) {},
        getItem: function(e) {},
        removeItem: function(e) {},
        clear: function() {},
        key: function(e) {}
    });
    var ce = e
      , de = function() {
        this.storage = null
    };
    de.prototype._cookiesEnabled = function() {
        var e, t = String(new Date);
        try {
            return ae.set(i, t),
            e = ae.get(i) === t,
            ae.remove(i),
            e
        } catch (e) {}
        return !1
    }
    ,
    de.prototype.getStorage = function() {
        if (null !== this.storage)
            return this.storage;
        if (this._cookiesEnabled())
            this.storage = ae;
        else {
            var n = "amp_cookiestore_";
            this.storage = {
                _options: {
                    expirationDays: void 0,
                    domain: void 0,
                    secure: !1
                },
                reset: function() {
                    this._options = {
                        expirationDays: void 0,
                        domain: void 0,
                        secure: !1
                    }
                },
                options: function(e) {
                    return 0 === arguments.length ? this._options : (e = e || {},
                    this._options.expirationDays = e.expirationDays || this._options.expirationDays,
                    this._options.domain = e.domain || this._options.domain || window.location.hostname,
                    this._options.secure = e.secure || !1)
                },
                get: function(e) {
                    try {
                        return JSON.parse(ce.getItem(n + e))
                    } catch (e) {}
                    return null
                },
                set: function(e, t) {
                    try {
                        return ce.setItem(n + e, JSON.stringify(t)),
                        !0
                    } catch (e) {}
                    return !1
                },
                remove: function(e) {
                    try {
                        ce.removeItem(n + e)
                    } catch (e) {
                        return !1
                    }
                }
            }
        }
        return this.storage
    }
    ;
    var le = "$clearAll"
      , fe = function() {
        this.userPropertiesOperations = {},
        this.properties = []
    };
    fe.prototype.add = function(e, t) {
        return "number" === C(t) || "string" === C(t) ? this._addOperation("$add", e, t) : W.error("Unsupported type for value: " + C(t) + ", expecting number or string"),
        this
    }
    ,
    fe.prototype.append = function(e, t) {
        return this._addOperation("$append", e, t),
        this
    }
    ,
    fe.prototype.clearAll = function() {
        return 0 < Object.keys(this.userPropertiesOperations).length ? this.userPropertiesOperations.hasOwnProperty(le) || W.error("Need to send $clearAll on its own Identify object without any other operations, skipping $clearAll") : this.userPropertiesOperations[le] = "-",
        this
    }
    ,
    fe.prototype.prepend = function(e, t) {
        return this._addOperation("$prepend", e, t),
        this
    }
    ,
    fe.prototype.set = function(e, t) {
        return this._addOperation("$set", e, t),
        this
    }
    ,
    fe.prototype.setOnce = function(e, t) {
        return this._addOperation("$setOnce", e, t),
        this
    }
    ,
    fe.prototype.unset = function(e) {
        return this._addOperation("$unset", e, "-"),
        this
    }
    ,
    fe.prototype._addOperation = function(e, t, n) {
        this.userPropertiesOperations.hasOwnProperty(le) ? W.error("This identify already contains a $clearAll operation, skipping operation " + e) : -1 === this.properties.indexOf(t) ? (this.userPropertiesOperations.hasOwnProperty(e) || (this.userPropertiesOperations[e] = {}),
        this.userPropertiesOperations[e][t] = n,
        this.properties.push(t)) : W.error('User property "' + t + '" already used in this identify, skipping operation ' + e)
    }
    ;
    var he = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    function ge(e, t) {
        return e(t = {
            exports: {}
        }, t.exports),
        t.exports
    }
    var ve = ge(function(s) {
        !function(e) {
            function d(e, t) {
                var n = (65535 & e) + (65535 & t);
                return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
            }
            function a(e, t, n, i, r, o) {
                return d((s = d(d(t, e), d(i, o))) << (a = r) | s >>> 32 - a, n);
                var s, a
            }
            function l(e, t, n, i, r, o, s) {
                return a(t & n | ~t & i, e, t, r, o, s)
            }
            function f(e, t, n, i, r, o, s) {
                return a(t & i | n & ~i, e, t, r, o, s)
            }
            function h(e, t, n, i, r, o, s) {
                return a(t ^ n ^ i, e, t, r, o, s)
            }
            function g(e, t, n, i, r, o, s) {
                return a(n ^ (t | ~i), e, t, r, o, s)
            }
            function u(e, t) {
                var n, i, r, o, s;
                e[t >> 5] |= 128 << t % 32,
                e[14 + (t + 64 >>> 9 << 4)] = t;
                var a = 1732584193
                  , u = -271733879
                  , p = -1732584194
                  , c = 271733878;
                for (n = 0; n < e.length; n += 16)
                    u = g(u = g(u = g(u = g(u = h(u = h(u = h(u = h(u = f(u = f(u = f(u = f(u = l(u = l(u = l(u = l(r = u, p = l(o = p, c = l(s = c, a = l(i = a, u, p, c, e[n], 7, -680876936), u, p, e[n + 1], 12, -389564586), a, u, e[n + 2], 17, 606105819), c, a, e[n + 3], 22, -1044525330), p = l(p, c = l(c, a = l(a, u, p, c, e[n + 4], 7, -176418897), u, p, e[n + 5], 12, 1200080426), a, u, e[n + 6], 17, -1473231341), c, a, e[n + 7], 22, -45705983), p = l(p, c = l(c, a = l(a, u, p, c, e[n + 8], 7, 1770035416), u, p, e[n + 9], 12, -1958414417), a, u, e[n + 10], 17, -42063), c, a, e[n + 11], 22, -1990404162), p = l(p, c = l(c, a = l(a, u, p, c, e[n + 12], 7, 1804603682), u, p, e[n + 13], 12, -40341101), a, u, e[n + 14], 17, -1502002290), c, a, e[n + 15], 22, 1236535329), p = f(p, c = f(c, a = f(a, u, p, c, e[n + 1], 5, -165796510), u, p, e[n + 6], 9, -1069501632), a, u, e[n + 11], 14, 643717713), c, a, e[n], 20, -373897302), p = f(p, c = f(c, a = f(a, u, p, c, e[n + 5], 5, -701558691), u, p, e[n + 10], 9, 38016083), a, u, e[n + 15], 14, -660478335), c, a, e[n + 4], 20, -405537848), p = f(p, c = f(c, a = f(a, u, p, c, e[n + 9], 5, 568446438), u, p, e[n + 14], 9, -1019803690), a, u, e[n + 3], 14, -187363961), c, a, e[n + 8], 20, 1163531501), p = f(p, c = f(c, a = f(a, u, p, c, e[n + 13], 5, -1444681467), u, p, e[n + 2], 9, -51403784), a, u, e[n + 7], 14, 1735328473), c, a, e[n + 12], 20, -1926607734), p = h(p, c = h(c, a = h(a, u, p, c, e[n + 5], 4, -378558), u, p, e[n + 8], 11, -2022574463), a, u, e[n + 11], 16, 1839030562), c, a, e[n + 14], 23, -35309556), p = h(p, c = h(c, a = h(a, u, p, c, e[n + 1], 4, -1530992060), u, p, e[n + 4], 11, 1272893353), a, u, e[n + 7], 16, -155497632), c, a, e[n + 10], 23, -1094730640), p = h(p, c = h(c, a = h(a, u, p, c, e[n + 13], 4, 681279174), u, p, e[n], 11, -358537222), a, u, e[n + 3], 16, -722521979), c, a, e[n + 6], 23, 76029189), p = h(p, c = h(c, a = h(a, u, p, c, e[n + 9], 4, -640364487), u, p, e[n + 12], 11, -421815835), a, u, e[n + 15], 16, 530742520), c, a, e[n + 2], 23, -995338651), p = g(p, c = g(c, a = g(a, u, p, c, e[n], 6, -198630844), u, p, e[n + 7], 10, 1126891415), a, u, e[n + 14], 15, -1416354905), c, a, e[n + 5], 21, -57434055), p = g(p, c = g(c, a = g(a, u, p, c, e[n + 12], 6, 1700485571), u, p, e[n + 3], 10, -1894986606), a, u, e[n + 10], 15, -1051523), c, a, e[n + 1], 21, -2054922799), p = g(p, c = g(c, a = g(a, u, p, c, e[n + 8], 6, 1873313359), u, p, e[n + 15], 10, -30611744), a, u, e[n + 6], 15, -1560198380), c, a, e[n + 13], 21, 1309151649), p = g(p, c = g(c, a = g(a, u, p, c, e[n + 4], 6, -145523070), u, p, e[n + 11], 10, -1120210379), a, u, e[n + 2], 15, 718787259), c, a, e[n + 9], 21, -343485551),
                    a = d(a, i),
                    u = d(u, r),
                    p = d(p, o),
                    c = d(c, s);
                return [a, u, p, c]
            }
            function p(e) {
                var t, n = "", i = 32 * e.length;
                for (t = 0; t < i; t += 8)
                    n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
                return n
            }
            function c(e) {
                var t, n = [];
                for (n[(e.length >> 2) - 1] = void 0,
                t = 0; t < n.length; t += 1)
                    n[t] = 0;
                var i = 8 * e.length;
                for (t = 0; t < i; t += 8)
                    n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
                return n
            }
            function i(e) {
                var t, n, i = "0123456789abcdef", r = "";
                for (n = 0; n < e.length; n += 1)
                    t = e.charCodeAt(n),
                    r += i.charAt(t >>> 4 & 15) + i.charAt(15 & t);
                return r
            }
            function n(e) {
                return unescape(encodeURIComponent(e))
            }
            function r(e) {
                return p(u(c(t = n(e)), 8 * t.length));
                var t
            }
            function o(e, t) {
                return function(e, t) {
                    var n, i, r = c(e), o = [], s = [];
                    for (o[15] = s[15] = void 0,
                    16 < r.length && (r = u(r, 8 * e.length)),
                    n = 0; n < 16; n += 1)
                        o[n] = 909522486 ^ r[n],
                        s[n] = 1549556828 ^ r[n];
                    return i = u(o.concat(c(t)), 512 + 8 * t.length),
                    p(u(s.concat(i), 640))
                }(n(e), n(t))
            }
            function t(e, t, n) {
                return t ? n ? o(t, e) : i(o(t, e)) : n ? r(e) : i(r(e))
            }
            s.exports ? s.exports = t : e.md5 = t
        }(he)
    })
      , me = function(e) {
        return encodeURIComponent(e).replace(/[!'()*]/g, function(e) {
            return "%" + e.charCodeAt(0).toString(16).toUpperCase()
        })
    }
      , ye = Object.getOwnPropertySymbols
      , _e = Object.prototype.hasOwnProperty
      , we = Object.prototype.propertyIsEnumerable;
    var be = function() {
        try {
            if (!Object.assign)
                return !1;
            var e = new String("abc");
            if (e[5] = "de",
            "5" === Object.getOwnPropertyNames(e)[0])
                return !1;
            for (var t = {}, n = 0; n < 10; n++)
                t["_" + String.fromCharCode(n)] = n;
            if ("0123456789" !== Object.getOwnPropertyNames(t).map(function(e) {
                return t[e]
            }).join(""))
                return !1;
            var i = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(e) {
                i[e] = e
            }),
            "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("")
        } catch (e) {
            return !1
        }
    }() ? Object.assign : function(e, t) {
        for (var n, i, r = function(e) {
            if (null == e)
                throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(e)
        }(e), o = 1; o < arguments.length; o++) {
            for (var s in n = Object(arguments[o]))
                _e.call(n, s) && (r[s] = n[s]);
            if (ye) {
                i = ye(n);
                for (var a = 0; a < i.length; a++)
                    we.call(n, i[a]) && (r[i[a]] = n[i[a]])
            }
        }
        return r
    }
      , Ie = "%[a-f0-9]{2}";
    new RegExp(Ie,"gi"),
    new RegExp("(" + Ie + ")+","gi");
    function Se(e, t) {
        return t.encode ? t.strict ? me(e) : encodeURIComponent(e) : e
    }
    var Ee = function(i, r) {
        !1 === (r = be({
            encode: !0,
            strict: !0,
            arrayFormat: "none"
        }, r)).sort && (r.sort = function() {}
        );
        var o = function(i) {
            switch (i.arrayFormat) {
            case "index":
                return function(e, t, n) {
                    return null === t ? [Se(e, i), "[", n, "]"].join("") : [Se(e, i), "[", Se(n, i), "]=", Se(t, i)].join("")
                }
                ;
            case "bracket":
                return function(e, t) {
                    return null === t ? Se(e, i) : [Se(e, i), "[]=", Se(t, i)].join("")
                }
                ;
            default:
                return function(e, t) {
                    return null === t ? Se(e, i) : [Se(e, i), "=", Se(t, i)].join("")
                }
            }
        }(r);
        return i ? Object.keys(i).sort(r.sort).map(function(t) {
            var e = i[t];
            if (void 0 === e)
                return "";
            if (null === e)
                return Se(t, r);
            if (Array.isArray(e)) {
                var n = [];
                return e.slice().forEach(function(e) {
                    void 0 !== e && n.push(o(t, e, n.length))
                }),
                n.join("&")
            }
            return Se(t, r) + "=" + Se(e, r)
        }).filter(function(e) {
            return 0 < e.length
        }).join("&") : ""
    }
      , Oe = function(e, t) {
        this.url = e,
        this.data = t || {}
    };
    Oe.prototype.send = function(e) {
        if (!!window.XDomainRequest) {
            var t = new window.XDomainRequest;
            t.open("POST", this.url, !0),
            t.onload = function() {
                e(200, t.responseText)
            }
            ,
            t.onerror = function() {
                "Request Entity Too Large" === t.responseText ? e(413, t.responseText) : e(500, t.responseText)
            }
            ,
            t.ontimeout = function() {}
            ,
            t.onprogress = function() {}
            ,
            t.send(Ee(this.data))
        } else {
            var n = new XMLHttpRequest;
            n.open("POST", this.url, !0),
            n.onreadystatechange = function() {
                4 === n.readyState && e(n.status, n.responseText)
            }
            ,
            n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
            n.send(Ee(this.data))
        }
    }
    ;
    var xe = function() {
        this._price = null,
        this._productId = null,
        this._quantity = 1,
        this._revenueType = null,
        this._properties = null
    };
    xe.prototype.setProductId = function(e) {
        return "string" !== C(e) ? W.error("Unsupported type for productId: " + C(e) + ", expecting string") : $(e) ? W.error("Invalid empty productId") : this._productId = e,
        this
    }
    ,
    xe.prototype.setQuantity = function(e) {
        return "number" !== C(e) ? W.error("Unsupported type for quantity: " + C(e) + ", expecting number") : this._quantity = parseInt(e),
        this
    }
    ,
    xe.prototype.setPrice = function(e) {
        return "number" !== C(e) ? W.error("Unsupported type for price: " + C(e) + ", expecting number") : this._price = e,
        this
    }
    ,
    xe.prototype.setRevenueType = function(e) {
        return "string" !== C(e) ? W.error("Unsupported type for revenueType: " + C(e) + ", expecting string") : this._revenueType = e,
        this
    }
    ,
    xe.prototype.setEventProperties = function(e) {
        return "object" !== C(e) ? W.error("Unsupported type for eventProperties: " + C(e) + ", expecting object") : this._properties = Z(e),
        this
    }
    ,
    xe.prototype._isValidRevenue = function() {
        return "number" === C(this._price) || (W.error("Invalid revenue, need to set price field"),
        !1)
    }
    ,
    xe.prototype._toJSONObject = function() {
        var e = "object" === C(this._properties) ? this._properties : {};
        return null !== this._productId && (e[s] = this._productId),
        null !== this._quantity && (e[u] = this._quantity),
        null !== this._price && (e[p] = this._price),
        null !== this._revenueType && (e[d] = this._revenueType),
        e
    }
    ;
    var Ne = ge(function(b, I) {
        !function(r, d) {
            var l = "function"
              , e = "model"
              , t = "name"
              , n = "type"
              , i = "vendor"
              , o = "version"
              , s = "architecture"
              , a = "console"
              , u = "mobile"
              , p = "tablet"
              , c = "smarttv"
              , f = "wearable"
              , h = {
                extend: function(e, t) {
                    var n = {};
                    for (var i in e)
                        t[i] && t[i].length % 2 == 0 ? n[i] = t[i].concat(e[i]) : n[i] = e[i];
                    return n
                },
                has: function(e, t) {
                    return "string" == typeof e && -1 !== t.toLowerCase().indexOf(e.toLowerCase())
                },
                lowerize: function(e) {
                    return e.toLowerCase()
                },
                major: function(e) {
                    return "string" == typeof e ? e.replace(/[^\d\.]/g, "").split(".")[0] : d
                },
                trim: function(e) {
                    return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                }
            }
              , g = {
                rgx: function(e, t) {
                    for (var n, i, r, o, s, a, u = 0; u < t.length && !s; ) {
                        var p = t[u]
                          , c = t[u + 1];
                        for (n = i = 0; n < p.length && !s; )
                            if (s = p[n++].exec(e))
                                for (r = 0; r < c.length; r++)
                                    a = s[++i],
                                    "object" == typeof (o = c[r]) && 0 < o.length ? 2 == o.length ? typeof o[1] == l ? this[o[0]] = o[1].call(this, a) : this[o[0]] = o[1] : 3 == o.length ? typeof o[1] !== l || o[1].exec && o[1].test ? this[o[0]] = a ? a.replace(o[1], o[2]) : d : this[o[0]] = a ? o[1].call(this, a, o[2]) : d : 4 == o.length && (this[o[0]] = a ? o[3].call(this, a.replace(o[1], o[2])) : d) : this[o] = a || d;
                        u += 2
                    }
                },
                str: function(e, t) {
                    for (var n in t)
                        if ("object" == typeof t[n] && 0 < t[n].length) {
                            for (var i = 0; i < t[n].length; i++)
                                if (h.has(t[n][i], e))
                                    return "?" === n ? d : n
                        } else if (h.has(t[n], e))
                            return "?" === n ? d : n;
                    return e
                }
            }
              , v = {
                browser: {
                    oldsafari: {
                        version: {
                            "1.0": "/8",
                            1.2: "/1",
                            1.3: "/3",
                            "2.0": "/412",
                            "2.0.2": "/416",
                            "2.0.3": "/417",
                            "2.0.4": "/419",
                            "?": "/"
                        }
                    },
                    name: {
                        "Opera Mobile": "Opera Mobi",
                        "IE Mobile": "IEMobile"
                    }
                },
                device: {
                    amazon: {
                        model: {
                            "Fire Phone": ["SD", "KF"]
                        }
                    },
                    sprint: {
                        model: {
                            "Evo Shift 4G": "7373KT"
                        },
                        vendor: {
                            HTC: "APA",
                            Sprint: "Sprint"
                        }
                    }
                },
                os: {
                    windows: {
                        version: {
                            ME: "4.90",
                            "NT 3.11": "NT3.51",
                            "NT 4.0": "NT4.0",
                            2e3: "NT 5.0",
                            XP: ["NT 5.1", "NT 5.2"],
                            Vista: "NT 6.0",
                            7: "NT 6.1",
                            8: "NT 6.2",
                            8.1: "NT 6.3",
                            10: ["NT 6.4", "NT 10.0"],
                            RT: "ARM"
                        },
                        name: {
                            "Windows Phone": "Windows Phone OS"
                        }
                    }
                }
            }
              , m = {
                browser: [[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i], [t, o], [/(opios)[\/\s]+([\w\.]+)/i], [[t, "Opera Mini"], o], [/\s(opr)\/([\w\.]+)/i], [[t, "Opera"], o], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]*)/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i], [t, o], [/(konqueror)\/([\w\.]+)/i], [[t, "Konqueror"], o], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i], [[t, "IE"], o], [/(edge|edgios|edga)\/((\d+)?[\w\.]+)/i], [[t, "Edge"], o], [/(yabrowser)\/([\w\.]+)/i], [[t, "Yandex"], o], [/(puffin)\/([\w\.]+)/i], [[t, "Puffin"], o], [/(focus)\/([\w\.]+)/i], [[t, "Firefox Focus"], o], [/(opt)\/([\w\.]+)/i], [[t, "Opera Touch"], o], [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i], [[t, "UCBrowser"], o], [/(comodo_dragon)\/([\w\.]+)/i], [[t, /_/g, " "], o], [/((?:android.+)crmo|crios)\/([\w\.]+)/i, /android.+(chrome)\/([\w\.]+)\s+(?:mobile\s?safari)/i], [[t, "Chrome Mobile"], o], [/(micromessenger)\/([\w\.]+)/i], [[t, "WeChat"], o], [/(brave)\/([\w\.]+)/i], [[t, "Brave"], o], [/(qqbrowserlite)\/([\w\.]+)/i], [t, o], [/(QQ)\/([\d\.]+)/i], [t, o], [/m?(qqbrowser)[\/\s]?([\w\.]+)/i], [t, o], [/(BIDUBrowser)[\/\s]?([\w\.]+)/i], [t, o], [/(2345Explorer)[\/\s]?([\w\.]+)/i], [t, o], [/(MetaSr)[\/\s]?([\w\.]+)/i], [t], [/(LBBROWSER)/i], [t], [/xiaomi\/miuibrowser\/([\w\.]+)/i], [o, [t, "MIUI Browser"]], [/;fbav\/([\w\.]+);/i], [o, [t, "Facebook"]], [/safari\s(line)\/([\w\.]+)/i, /android.+(line)\/([\w\.]+)\/iab/i], [t, o], [/headlesschrome(?:\/([\w\.]+)|\s)/i], [o, [t, "Chrome Headless"]], [/\swv\).+(chrome)\/([\w\.]+)/i], [[t, /(.+)/, "$1 WebView"], o], [/((?:oculus|samsung)browser)\/([\w\.]+)/i], [[t, /(.+(?:g|us))(.+)/, "$1 $2"], o], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i], [o, [t, "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i], [t, o], [/(dolfin)\/([\w\.]+)/i], [[t, "Dolphin"], o], [/(coast)\/([\w\.]+)/i], [[t, "Opera Coast"], o], [/fxios\/([\w\.-]+)/i], [o, [t, "Firefox"]], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i], [o, [t, "Mobile Safari"]], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i], [o, t], [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [[t, "GSA"], o], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [t, [o, g.str, v.browser.oldsafari.version]], [/(webkit|khtml)\/([\w\.]+)/i], [t, o], [/(navigator|netscape)\/([\w\.-]+)/i], [[t, "Netscape"], o], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], [t, o]],
                cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[s, "amd64"]], [/(ia32(?=;))/i], [[s, h.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[s, "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [[s, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[s, /ower/, "", h.lowerize]], [/(sun4\w)[;\)]/i], [[s, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [[s, h.lowerize]]],
                device: [[/\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i], [e, i, [n, p]], [/applecoremedia\/[\w\.]+ \((ipad)/], [e, [i, "Apple"], [n, p]], [/(apple\s{0,1}tv)/i], [[e, "Apple TV"], [i, "Apple"]], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [i, e, [n, p]], [/(kf[A-z]+)\sbuild\/.+silk\//i], [e, [i, "Amazon"], [n, p]], [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i], [[e, g.str, v.device.amazon.model], [i, "Amazon"], [n, u]], [/android.+aft([bms])\sbuild/i], [e, [i, "Amazon"], [n, c]], [/\((ip[honed|\s\w*]+);.+(apple)/i], [e, i, [n, u]], [/\((ip[honed|\s\w*]+);/i], [e, [i, "Apple"], [n, u]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [i, e, [n, u]], [/\(bb10;\s(\w+)/i], [e, [i, "BlackBerry"], [n, u]], [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i], [e, [i, "Asus"], [n, p]], [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i], [[i, "Sony"], [e, "Xperia Tablet"], [n, p]], [/android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [e, [i, "Sony"], [n, u]], [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i], [i, e, [n, a]], [/android.+;\s(shield)\sbuild/i], [e, [i, "Nvidia"], [n, a]], [/(playstation\s[34portablevi]+)/i], [e, [i, "Sony"], [n, a]], [/(sprint\s(\w+))/i], [[i, g.str, v.device.sprint.vendor], [e, g.str, v.device.sprint.model], [n, u]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i], [i, e, [n, p]], [/(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i], [i, [e, /_/g, " "], [n, u]], [/(nexus\s9)/i], [e, [i, "HTC"], [n, p]], [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i], [e, [i, "Huawei"], [n, u]], [/(microsoft);\s(lumia[\s\w]+)/i], [i, e, [n, u]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i], [e, [i, "Microsoft"], [n, a]], [/(kin\.[onetw]{3})/i], [[e, /\./g, " "], [i, "Microsoft"], [n, u]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i], [e, [i, "Motorola"], [n, u]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [e, [i, "Motorola"], [n, p]], [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i], [[i, h.trim], [e, h.trim], [n, c]], [/hbbtv.+maple;(\d+)/i], [[e, /^/, "SmartTV"], [i, "Samsung"], [n, c]], [/\(dtv[\);].+(aquos)/i], [e, [i, "Sharp"], [n, c]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[i, "Samsung"], e, [n, p]], [/smart-tv.+(samsung)/i], [i, [n, c], e], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i], [[i, "Samsung"], e, [n, u]], [/sie-(\w*)/i], [e, [i, "Siemens"], [n, u]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i], [[i, "Nokia"], e, [n, u]], [/android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i], [e, [i, "Acer"], [n, p]], [/android.+([vl]k\-?\d{3})\s+build/i], [e, [i, "LG"], [n, p]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i], [[i, "LG"], e, [n, p]], [/(lg) netcast\.tv/i], [i, e, [n, c]], [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i], [e, [i, "LG"], [n, u]], [/android.+(ideatab[a-z0-9\-\s]+)/i], [e, [i, "Lenovo"], [n, p]], [/linux;.+((jolla));/i], [i, e, [n, u]], [/((pebble))app\/[\d\.]+\s/i], [i, e, [n, f]], [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i], [i, e, [n, u]], [/crkey/i], [[e, "Chromecast"], [i, "Google"]], [/android.+;\s(glass)\s\d/i], [e, [i, "Google"], [n, f]], [/android.+;\s(pixel c)[\s)]/i], [e, [i, "Google"], [n, p]], [/android.+;\s(pixel( [23])?( xl)?)\s/i], [e, [i, "Google"], [n, u]], [/android.+;\s(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i], [[e, /_/g, " "], [i, "Xiaomi"], [n, u]], [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i], [[e, /_/g, " "], [i, "Xiaomi"], [n, p]], [/android.+;\s(m[1-5]\snote)\sbuild/i], [e, [i, "Meizu"], [n, p]], [/(mz)-([\w-]{2,})/i], [[i, "Meizu"], e, [n, u]], [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})\s+build/i], [e, [i, "OnePlus"], [n, u]], [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i], [e, [i, "RCA"], [n, p]], [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i], [e, [i, "Dell"], [n, p]], [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i], [e, [i, "Verizon"], [n, p]], [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i], [[i, "Barnes & Noble"], e, [n, p]], [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i], [e, [i, "NuVision"], [n, p]], [/android.+;\s(k88)\sbuild/i], [e, [i, "ZTE"], [n, p]], [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i], [e, [i, "Swiss"], [n, u]], [/android.+[;\/]\s*(zur\d{3})\s+build/i], [e, [i, "Swiss"], [n, p]], [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i], [e, [i, "Zeki"], [n, p]], [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i], [[i, "Dragon Touch"], e, [n, p]], [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i], [e, [i, "Insignia"], [n, p]], [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i], [e, [i, "NextBook"], [n, p]], [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i], [[i, "Voice"], e, [n, u]], [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i], [[i, "LvTel"], e, [n, u]], [/android.+;\s(PH-1)\s/i], [e, [i, "Essential"], [n, u]], [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i], [e, [i, "Envizen"], [n, p]], [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i], [i, e, [n, p]], [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i], [e, [i, "MachSpeed"], [n, p]], [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i], [i, e, [n, p]], [/android.+[;\/]\s*TU_(1491)\s+build/i], [e, [i, "Rotor"], [n, p]], [/android.+(KS(.+))\s+build/i], [e, [i, "Amazon"], [n, p]], [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i], [i, e, [n, p]], [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i], [[n, h.lowerize], i, e], [/[\s\/\(](smart-?tv)[;\)]/i], [[n, c]], [/(android[\w\.\s\-]{0,9});.+build/i], [e, [i, "Generic"]]],
                engine: [[/windows.+\sedge\/([\w\.]+)/i], [o, [t, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)/i], [[t, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [t, o], [/rv\:([\w\.]{1,9}).+(gecko)/i], [o, t]],
                os: [[/microsoft\s(windows)\s(vista|xp)/i], [t, o], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [[t, g.str, v.os.windows.name], [o, g.str, v.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[t, "Windows"], [o, g.str, v.os.windows.version]], [/\((bb)(10);/i], [[t, "BlackBerry"], o], [/(blackberry)\w*\/?([\w\.]*)/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i, /linux;.+(sailfish);/i], [t, o], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i], [[t, "Symbian"], o], [/\((series40);/i], [t], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[t, "Firefox OS"], o], [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i], [[t, "Linux"], o], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[t, "Chromium OS"], o], [/(sunos)\s?([\w\.\d]*)/i], [[t, "Solaris"], o], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i], [[t, "Linux"], o], [/(iphone)(?:.*os\s*([\w]*)\slike\smac|;\sopera)/i], [[t, "iPhone"], [o, /_/g, "."]], [/(ipad)(?:.*os\s*([\w]*)\slike\smac|;\sopera)/i], [[t, "iPad"], [o, /_/g, "."]], [/(haiku)\s(\w+)/i], [t, o], [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i], [[o, /_/g, "."], [t, "iOS"]], [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i], [[t, "Mac"], [o, /_/g, "."]], [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i, /(unix)\s?([\w\.]*)/i], [t, o]]
            }
              , y = function(e, t) {
                if ("object" == typeof e && (t = e,
                e = d),
                !(this instanceof y))
                    return new y(e,t).getResult();
                var n = e || (r && r.navigator && r.navigator.userAgent ? r.navigator.userAgent : "")
                  , i = t ? h.extend(m, t) : m;
                return this.getBrowser = function() {
                    var e = {
                        name: d,
                        version: d
                    };
                    return g.rgx.call(e, n, i.browser),
                    e.major = h.major(e.version),
                    e
                }
                ,
                this.getCPU = function() {
                    var e = {
                        architecture: d
                    };
                    return g.rgx.call(e, n, i.cpu),
                    e
                }
                ,
                this.getDevice = function() {
                    var e = {
                        vendor: d,
                        model: d,
                        type: d
                    };
                    return g.rgx.call(e, n, i.device),
                    e
                }
                ,
                this.getEngine = function() {
                    var e = {
                        name: d,
                        version: d
                    };
                    return g.rgx.call(e, n, i.engine),
                    e
                }
                ,
                this.getOS = function() {
                    var e = {
                        name: d,
                        version: d
                    };
                    return g.rgx.call(e, n, i.os),
                    e
                }
                ,
                this.getResult = function() {
                    return {
                        ua: this.getUA(),
                        browser: this.getBrowser(),
                        engine: this.getEngine(),
                        os: this.getOS(),
                        device: this.getDevice(),
                        cpu: this.getCPU()
                    }
                }
                ,
                this.getUA = function() {
                    return n
                }
                ,
                this.setUA = function(e) {
                    return n = e,
                    this
                }
                ,
                this
            };
            y.VERSION = "0.7.19",
            y.BROWSER = {
                NAME: t,
                MAJOR: "major",
                VERSION: o
            },
            y.CPU = {
                ARCHITECTURE: s
            },
            y.DEVICE = {
                MODEL: e,
                VENDOR: i,
                TYPE: n,
                CONSOLE: a,
                MOBILE: u,
                SMARTTV: c,
                TABLET: p,
                WEARABLE: f,
                EMBEDDED: "embedded"
            },
            y.ENGINE = {
                NAME: t,
                VERSION: o
            },
            y.OS = {
                NAME: t,
                VERSION: o
            },
            b.exports && (I = b.exports = y),
            I.UAParser = y;
            var _ = r && (r.jQuery || r.Zepto);
            if (void 0 !== _ && !_.ua) {
                var w = new y;
                _.ua = w.getResult(),
                _.ua.get = function() {
                    return w.getUA()
                }
                ,
                _.ua.set = function(e) {
                    w.setUA(e);
                    var t = w.getResult();
                    for (var n in t)
                        _.ua[n] = t[n]
                }
            }
        }("object" == typeof window ? window : he)
    })
      , ke = (Ne.UAParser,
    function e(t) {
        return t ? (t ^ 16 * Math.random() >> t / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, e)
    }
    )
      , Te = "5.2.2"
      , Pe = {
        apiEndpoint: "api.amplitude.com",
        batchEvents: !1,
        cookieExpiration: 3650,
        cookieName: "amplitude_id",
        deviceIdFromUrlParam: !1,
        domain: "",
        eventUploadPeriodMillis: 3e4,
        eventUploadThreshold: 30,
        forceHttps: !0,
        includeGclid: !1,
        includeReferrer: !1,
        includeUtm: !1,
        language: {
            language: navigator && (navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage) || void 0
        }.language,
        logLevel: "WARN",
        optOut: !1,
        platform: "Web",
        savedMaxCount: 1e3,
        saveEvents: !0,
        saveParamsReferrerOncePerSession: !0,
        secureCookie: !1,
        sessionTimeout: 18e5,
        trackingOptions: {
            city: !0,
            country: !0,
            device_model: !0,
            dma: !0,
            ip_address: !0,
            language: !0,
            os_name: !0,
            os_version: !0,
            platform: !0,
            region: !0,
            version_name: !0
        },
        unsetParamsReferrerOnNewSession: !1,
        unsentKey: "amplitude_unsent",
        unsentIdentifyKey: "amplitude_unsent_identify",
        uploadBatchSize: 100
    }
      , Ae = function(e) {
        this._instanceName = $(e) ? f : e.toLowerCase(),
        this._legacyStorageSuffix = this._instanceName === f ? "" : "_" + this._instanceName,
        this._unsentEvents = [],
        this._unsentIdentifys = [],
        this._ua = new Ne(navigator.userAgent).getResult(),
        this.options = l({}, Pe, {
            trackingOptions: l({}, Pe.trackingOptions)
        }),
        this.cookieStorage = (new de).getStorage(),
        this._q = [],
        this._sending = !1,
        this._updateScheduled = !1,
        this._onInit = [],
        this._eventId = 0,
        this._identifyId = 0,
        this._lastEventTime = null,
        this._newSession = !1,
        this._sequenceNumber = 0,
        this._sessionId = null,
        this._isInitialized = !1,
        this._userAgent = navigator && navigator.userAgent || null
    };
    Ae.prototype.Identify = fe,
    Ae.prototype.Revenue = xe,
    Ae.prototype.init = function(e, t, n, i) {
        if ("string" !== C(e) || $(e))
            W.error("Invalid apiKey. Please re-initialize with a valid apiKey");
        else {
            try {
                this.options.apiKey = e,
                this._storageSuffix = "_" + e + this._legacyStorageSuffix,
                Re(this.options, n),
                "string" === C(this.options.logLevel) && V(this.options.logLevel);
                var r = Be(this);
                if (this._apiPropertiesTrackingOptions = 0 < Object.keys(r).length ? {
                    tracking_options: r
                } : {},
                this.cookieStorage.options({
                    expirationDays: this.options.cookieExpiration,
                    domain: this.options.domain,
                    secure: this.options.secureCookie
                }),
                this.options.domain = this.cookieStorage.options().domain,
                this._instanceName === f && qe(this),
                je(this),
                this.options.deviceId = "object" === C(n) && "string" === C(n.deviceId) && !$(n.deviceId) && n.deviceId || this.options.deviceIdFromUrlParam && this._getDeviceIdFromUrlParam(this._getUrlParams()) || this.options.deviceId || ke() + "R",
                this.options.userId = "string" === C(t) && !$(t) && t || "number" === C(t) && t.toString() || this.options.userId || null,
                this.options.saveEvents) {
                    this._unsentEvents = this._loadSavedUnsentEvents(this.options.unsentKey),
                    this._unsentIdentifys = this._loadSavedUnsentEvents(this.options.unsentIdentifyKey);
                    for (var o = 0; o < this._unsentEvents.length; o++) {
                        var s = this._unsentEvents[o].event_properties
                          , a = this._unsentEvents[o].groups;
                        this._unsentEvents[o].event_properties = Z(s),
                        this._unsentEvents[o].groups = X(a)
                    }
                    for (var u = 0; u < this._unsentIdentifys.length; u++) {
                        var p = this._unsentIdentifys[u].user_properties
                          , c = this._unsentIdentifys[u].groups;
                        this._unsentIdentifys[u].user_properties = Z(p),
                        this._unsentIdentifys[u].groups = X(c)
                    }
                }
                var d = (new Date).getTime();
                (!this._sessionId || !this._lastEventTime || d - this._lastEventTime > this.options.sessionTimeout) && (this.options.unsetParamsReferrerOnNewSession && this._unsetUTMParams(),
                this._newSession = !0,
                this._sessionId = d,
                this.options.saveParamsReferrerOncePerSession && this._trackParamsAndReferrer()),
                this.options.saveParamsReferrerOncePerSession || this._trackParamsAndReferrer(),
                this._lastEventTime = d,
                Ue(this),
                this._sendEventsIfReady()
            } catch (e) {
                W.error(e)
            } finally {
                "function" === C(i) && i(this)
            }
            for (var l = 0; l < this._onInit.length; l++)
                this._onInit[l]();
            this._onInit = [],
            this._isInitialized = !0
        }
    }
    ,
    Ae.prototype._trackParamsAndReferrer = function() {
        this.options.includeUtm && this._initUtmData(),
        this.options.includeReferrer && this._saveReferrer(this._getReferrer()),
        this.options.includeGclid && this._saveGclid(this._getUrlParams())
    }
    ;
    var Re = function i(r, o) {
        if ("object" === C(o)) {
            var e = function(e) {
                if (r.hasOwnProperty(e)) {
                    var t = o[e]
                      , n = C(r[e]);
                    H(t, e + " option", n) && ("boolean" === n ? r[e] = !!t : "string" === n && !$(t) || "number" === n && 0 < t ? r[e] = t : "object" === n && i(r[e], t))
                }
            };
            for (var t in o)
                o.hasOwnProperty(t) && e(t)
        }
    };
    Ae.prototype.runQueuedFunctions = function() {
        for (var e = 0; e < this._q.length; e++) {
            var t = this[this._q[e][0]];
            "function" === C(t) && t.apply(this, this._q[e].slice(1))
        }
        this._q = []
    }
    ,
    Ae.prototype._apiKeySet = function(e) {
        return !$(this.options.apiKey) || (W.error("Invalid apiKey. Please set a valid apiKey with init() before calling " + e),
        !1)
    }
    ,
    Ae.prototype._loadSavedUnsentEvents = function(e) {
        var t = this._getFromStorage(ce, e)
          , n = this._parseSavedUnsentEventsString(t, e)
          , i = this._getFromStorageLegacy(ce, e)
          , r = this._parseSavedUnsentEventsString(i, e).concat(n);
        return this._removeFromLegacyStorage(ce, e),
        this._setInStorage(ce, e, JSON.stringify(r)),
        r
    }
    ,
    Ae.prototype._removeFromLegacyStorage = function(e, t) {
        e.removeItem(t + this._legacyStorageSuffix)
    }
    ,
    Ae.prototype._parseSavedUnsentEventsString = function(e, t) {
        if ($(e))
            return [];
        if ("string" === C(e))
            try {
                var n = JSON.parse(e);
                if ("array" === C(n))
                    return n
            } catch (e) {}
        return W.error("Unable to load " + t + " events. Restart with a new empty queue."),
        []
    }
    ,
    Ae.prototype.isNewSession = function() {
        return this._newSession
    }
    ,
    Ae.prototype.onInit = function(e) {
        this._isInitialized ? e() : this._onInit.push(e)
    }
    ,
    Ae.prototype.getSessionId = function() {
        return this._sessionId
    }
    ,
    Ae.prototype.nextEventId = function() {
        return this._eventId++,
        this._eventId
    }
    ,
    Ae.prototype.nextIdentifyId = function() {
        return this._identifyId++,
        this._identifyId
    }
    ,
    Ae.prototype.nextSequenceNumber = function() {
        return this._sequenceNumber++,
        this._sequenceNumber
    }
    ,
    Ae.prototype._unsentCount = function() {
        return this._unsentEvents.length + this._unsentIdentifys.length
    }
    ,
    Ae.prototype._sendEventsIfReady = function(e) {
        return 0 !== this._unsentCount() && (this.options.batchEvents ? this._unsentCount() >= this.options.eventUploadThreshold ? (this.sendEvents(e),
        !0) : (this._updateScheduled || (this._updateScheduled = !0,
        setTimeout(function() {
            this._updateScheduled = !1,
            this.sendEvents()
        }
        .bind(this), this.options.eventUploadPeriodMillis)),
        !1) : (this.sendEvents(e),
        !0))
    }
    ,
    Ae.prototype._getFromStorage = function(e, t) {
        return e.getItem(t + this._storageSuffix)
    }
    ,
    Ae.prototype._getFromStorageLegacy = function(e, t) {
        return e.getItem(t + this._legacyStorageSuffix)
    }
    ,
    Ae.prototype._setInStorage = function(e, t, n) {
        e.setItem(t + this._storageSuffix, n)
    }
    ;
    var qe = function(e) {
        var t = e.cookieStorage.get(e.options.cookieName + e._storageSuffix);
        if ("object" !== C(t) && !("object" === C(t = e.cookieStorage.get(e.options.cookieName + e._legacyStorageSuffix)) && t.deviceId && t.sessionId && t.lastEventTime)) {
            var n = function(e) {
                var t = ce.getItem(e);
                return ce.removeItem(e),
                t
            }
              , i = "string" === C(e.options.apiKey) && "_" + e.options.apiKey.slice(0, 6) || ""
              , r = n(b + i)
              , o = n(S + i)
              , s = n(I + i);
            null != s && (s = "true" === String(s));
            var a = parseInt(n(w))
              , u = parseInt(n(m))
              , p = parseInt(n(v))
              , c = parseInt(n(y))
              , d = parseInt(n(_))
              , l = function(e) {
                return "object" === C(t) && t[e]
            };
            e.options.deviceId = l("deviceId") || r,
            e.options.userId = l("userId") || o,
            e._sessionId = l("sessionId") || a || e._sessionId,
            e._lastEventTime = l("lastEventTime") || u || e._lastEventTime,
            e._eventId = l("eventId") || p || e._eventId,
            e._identifyId = l("identifyId") || c || e._identifyId,
            e._sequenceNumber = l("sequenceNumber") || d || e._sequenceNumber,
            e.options.optOut = s || !1,
            t && void 0 !== t.optOut && null !== t.optOut && (e.options.optOut = "true" === String(t.optOut)),
            Ue(e)
        }
    }
      , je = function(e) {
        var t = e.cookieStorage.get(e.options.cookieName + e._storageSuffix);
        if ("object" === C(t))
            Ce(e, t);
        else {
            var n = e.cookieStorage.get(e.options.cookieName + e._legacyStorageSuffix);
            "object" === C(n) && (e.cookieStorage.remove(e.options.cookieName + e._legacyStorageSuffix),
            Ce(e, n))
        }
    }
      , Ce = function(e, t) {
        t.deviceId && (e.options.deviceId = t.deviceId),
        t.userId && (e.options.userId = t.userId),
        null !== t.optOut && void 0 !== t.optOut && (e.options.optOut = t.optOut),
        t.sessionId && (e._sessionId = parseInt(t.sessionId)),
        t.lastEventTime && (e._lastEventTime = parseInt(t.lastEventTime)),
        t.eventId && (e._eventId = parseInt(t.eventId)),
        t.identifyId && (e._identifyId = parseInt(t.identifyId)),
        t.sequenceNumber && (e._sequenceNumber = parseInt(t.sequenceNumber))
    }
      , Ue = function(e) {
        e.cookieStorage.set(e.options.cookieName + e._storageSuffix, {
            deviceId: e.options.deviceId,
            userId: e.options.userId,
            optOut: e.options.optOut,
            sessionId: e._sessionId,
            lastEventTime: e._lastEventTime,
            eventId: e._eventId,
            identifyId: e._identifyId,
            sequenceNumber: e._sequenceNumber
        })
    };
    Ae.prototype._initUtmData = function(e, t) {
        e = e || this._getUrlParams(),
        t = t || this.cookieStorage.get("__utmz");
        var n, i, r, o, s, a, u, p, c, d, l, f = (i = e,
        r = (n = t) ? "?" + n.split(".").slice(-1)[0].replace(/\|/g, "&") : "",
        s = (o = function(e, t, n, i) {
            return J(e, t) || J(n, i)
        }
        )(x, i, "utmcsr", r),
        a = o(N, i, "utmcmd", r),
        u = o(k, i, "utmccn", r),
        p = o(T, i, "utmctr", r),
        c = o(P, i, "utmcct", r),
        d = {},
        (l = function(e, t) {
            $(t) || (d[e] = t)
        }
        )(x, s),
        l(N, a),
        l(k, u),
        l(T, p),
        l(P, c),
        d);
        De(this, f)
    }
    ,
    Ae.prototype._unsetUTMParams = function() {
        var e = new fe;
        e.unset(O),
        e.unset(x),
        e.unset(N),
        e.unset(k),
        e.unset(T),
        e.unset(P),
        this.identify(e)
    }
    ;
    var De = function(e, t) {
        if ("object" === C(t) && 0 !== Object.keys(t).length) {
            var n = new fe;
            for (var i in t)
                t.hasOwnProperty(i) && (n.setOnce("initial_" + i, t[i]),
                n.set(i, t[i]));
            e.identify(n)
        }
    };
    Ae.prototype._getReferrer = function() {
        return document.referrer
    }
    ,
    Ae.prototype._getUrlParams = function() {
        return location.search
    }
    ,
    Ae.prototype._saveGclid = function(e) {
        var t = J("gclid", e);
        $(t) || De(this, {
            gclid: t
        })
    }
    ,
    Ae.prototype._getDeviceIdFromUrlParam = function(e) {
        return J(E, e)
    }
    ,
    Ae.prototype._getReferringDomain = function(e) {
        if ($(e))
            return null;
        var t = e.split("/");
        return 3 <= t.length ? t[2] : null
    }
    ,
    Ae.prototype._saveReferrer = function(e) {
        if (!$(e)) {
            var t = {
                referrer: e,
                referring_domain: this._getReferringDomain(e)
            };
            De(this, t)
        }
    }
    ,
    Ae.prototype.saveEvents = function() {
        try {
            this._setInStorage(ce, this.options.unsentKey, JSON.stringify(this._unsentEvents))
        } catch (e) {}
        try {
            this._setInStorage(ce, this.options.unsentIdentifyKey, JSON.stringify(this._unsentIdentifys))
        } catch (e) {}
    }
    ,
    Ae.prototype.setDomain = function(e) {
        if (H(e, "domain", "string"))
            try {
                this.cookieStorage.options({
                    domain: e
                }),
                this.options.domain = this.cookieStorage.options().domain,
                je(this),
                Ue(this)
            } catch (e) {
                W.error(e)
            }
    }
    ,
    Ae.prototype.setUserId = function(e) {
        try {
            this.options.userId = null != e && "" + e || null,
            Ue(this)
        } catch (e) {
            W.error(e)
        }
    }
    ,
    Ae.prototype.setGroup = function(e, t) {
        if (this._apiKeySet("setGroup()") && H(e, "groupType", "string") && !$(e)) {
            var n = {};
            n[e] = t;
            var i = (new fe).set(e, t);
            this._logEvent(h, null, null, i.userPropertiesOperations, n, null, null, null)
        }
    }
    ,
    Ae.prototype.setOptOut = function(e) {
        if (H(e, "enable", "boolean"))
            try {
                this.options.optOut = e,
                Ue(this)
            } catch (e) {
                W.error(e)
            }
    }
    ,
    Ae.prototype.setSessionId = function(e) {
        if (H(e, "sessionId", "number"))
            try {
                this._sessionId = e,
                Ue(this)
            } catch (e) {
                W.error(e)
            }
    }
    ,
    Ae.prototype.resetSessionId = function() {
        this.setSessionId((new Date).getTime())
    }
    ,
    Ae.prototype.regenerateDeviceId = function() {
        this.setDeviceId(ke() + "R")
    }
    ,
    Ae.prototype.setDeviceId = function(e) {
        if (H(e, "deviceId", "string"))
            try {
                $(e) || (this.options.deviceId = "" + e,
                Ue(this))
            } catch (e) {
                W.error(e)
            }
    }
    ,
    Ae.prototype.setUserProperties = function(e) {
        if (this._apiKeySet("setUserProperties()") && H(e, "userProperties", "object")) {
            var t = Q(Z(e));
            if (0 !== Object.keys(t).length) {
                var n = new fe;
                for (var i in t)
                    t.hasOwnProperty(i) && n.set(i, t[i]);
                this.identify(n)
            }
        }
    }
    ,
    Ae.prototype.clearUserProperties = function() {
        if (this._apiKeySet("clearUserProperties()")) {
            var e = new fe;
            e.clearAll(),
            this.identify(e)
        }
    }
    ;
    var Me = function(e, t) {
        for (var n = 0; n < t._q.length; n++) {
            var i = e[t._q[n][0]];
            "function" === C(i) && i.apply(e, t._q[n].slice(1))
        }
        return e
    };
    Ae.prototype.identify = function(e, t) {
        if (this._apiKeySet("identify()"))
            if ("object" === C(e) && e.hasOwnProperty("_q") && (e = Me(new fe, e)),
            e instanceof fe) {
                if (0 < Object.keys(e.userPropertiesOperations).length)
                    return this._logEvent(h, null, null, e.userPropertiesOperations, null, null, null, t);
                "function" === C(t) && t(0, "No request sent", {
                    reason: "No user property operations"
                })
            } else
                W.error("Invalid identify input type. Expected Identify object but saw " + C(e)),
                "function" === C(t) && t(0, "No request sent", {
                    reason: "Invalid identify input type"
                });
        else
            "function" === C(t) && t(0, "No request sent", {
                reason: "API key is not set"
            })
    }
    ,
    Ae.prototype.groupIdentify = function(e, t, n, i) {
        if (this._apiKeySet("groupIdentify()"))
            if (H(e, "group_type", "string") && !$(e))
                if (null != t)
                    if ("object" === C(n) && n.hasOwnProperty("_q") && (n = Me(new fe, n)),
                    n instanceof fe) {
                        if (0 < Object.keys(n.userPropertiesOperations).length)
                            return this._logEvent(g, null, null, null, r({}, e, t), n.userPropertiesOperations, null, i);
                        "function" === C(i) && i(0, "No request sent", {
                            reason: "No group property operations"
                        })
                    } else
                        W.error("Invalid identify input type. Expected Identify object but saw " + C(n)),
                        "function" === C(i) && i(0, "No request sent", {
                            reason: "Invalid identify input type"
                        });
                else
                    "function" === C(i) && i(0, "No request sent", {
                        reason: "Invalid group name"
                    });
            else
                "function" === C(i) && i(0, "No request sent", {
                    reason: "Invalid group type"
                });
        else
            "function" === C(i) && i(0, "No request sent", {
                reason: "API key is not set"
            })
    }
    ,
    Ae.prototype.setVersionName = function(e) {
        H(e, "versionName", "string") && (this.options.versionName = e)
    }
    ,
    Ae.prototype._logEvent = function(e, t, n, i, r, o, s, a) {
        if (je(this),
        e)
            if (this.options.optOut)
                "function" === C(a) && a(0, "No request sent", {
                    reason: "optOut is set to true"
                });
            else
                try {
                    var u;
                    u = e === h || e === g ? this.nextIdentifyId() : this.nextEventId();
                    var p = this.nextSequenceNumber()
                      , c = "number" === C(s) ? s : (new Date).getTime();
                    (!this._sessionId || !this._lastEventTime || c - this._lastEventTime > this.options.sessionTimeout) && (this._sessionId = c),
                    this._lastEventTime = c,
                    Ue(this),
                    i = i || {},
                    n = l({}, n || {}, l({}, this._apiPropertiesTrackingOptions)),
                    t = t || {},
                    r = r || {},
                    o = o || {};
                    var d = {
                        device_id: this.options.deviceId,
                        user_id: this.options.userId,
                        timestamp: c,
                        event_id: u,
                        session_id: this._sessionId || -1,
                        event_type: e,
                        version_name: ze(this, "version_name") && this.options.versionName || null,
                        platform: ze(this, "platform") ? this.options.platform : null,
                        os_name: ze(this, "os_name") && this._ua.browser.name || null,
                        os_version: ze(this, "os_version") && this._ua.browser.major || null,
                        device_model: ze(this, "device_model") && this._ua.os.name || null,
                        language: ze(this, "language") ? this.options.language : null,
                        api_properties: n,
                        event_properties: Q(Z(t)),
                        user_properties: Q(Z(i)),
                        uuid: ke(),
                        library: {
                            name: "amplitude-js",
                            version: Te
                        },
                        sequence_number: p,
                        groups: Q(X(r)),
                        group_properties: Q(Z(o)),
                        user_agent: this._userAgent
                    };
                    return e === h || e === g ? (this._unsentIdentifys.push(d),
                    this._limitEventsQueued(this._unsentIdentifys)) : (this._unsentEvents.push(d),
                    this._limitEventsQueued(this._unsentEvents)),
                    this.options.saveEvents && this.saveEvents(),
                    this._sendEventsIfReady(a) || "function" !== C(a) || a(0, "No request sent", {
                        reason: "No events to send or upload queued"
                    }),
                    u
                } catch (e) {
                    W.error(e)
                }
        else
            "function" === C(a) && a(0, "No request sent", {
                reason: "Missing eventType"
            })
    }
    ;
    var ze = function(e, t) {
        return !!e.options.trackingOptions[t]
    }
      , Be = function(e) {
        for (var t = ["city", "country", "dma", "ip_address", "region"], n = {}, i = 0; i < t.length; i++) {
            var r = t[i];
            ze(e, r) || (n[r] = !1)
        }
        return n
    };
    Ae.prototype._limitEventsQueued = function(e) {
        e.length > this.options.savedMaxCount && e.splice(0, e.length - this.options.savedMaxCount)
    }
    ,
    Ae.prototype.logEvent = function(e, t, n) {
        return this.logEventWithTimestamp(e, t, null, n)
    }
    ,
    Ae.prototype.logEventWithTimestamp = function(e, t, n, i) {
        return this._apiKeySet("logEvent()") ? H(e, "eventType", "string") ? $(e) ? ("function" === C(i) && i(0, "No request sent", {
            reason: "Missing eventType"
        }),
        -1) : this._logEvent(e, t, null, null, null, null, n, i) : ("function" === C(i) && i(0, "No request sent", {
            reason: "Invalid type for eventType"
        }),
        -1) : ("function" === C(i) && i(0, "No request sent", {
            reason: "API key not set"
        }),
        -1)
    }
    ,
    Ae.prototype.logEventWithGroups = function(e, t, n, i) {
        return this._apiKeySet("logEventWithGroups()") ? H(e, "eventType", "string") ? this._logEvent(e, t, null, null, n, null, null, i) : ("function" === C(i) && i(0, "No request sent", {
            reason: "Invalid type for eventType"
        }),
        -1) : ("function" === C(i) && i(0, "No request sent", {
            reason: "API key not set"
        }),
        -1)
    }
    ;
    var Ge = function(e) {
        return !isNaN(parseFloat(e)) && isFinite(e)
    };
    Ae.prototype.logRevenueV2 = function(e) {
        if (this._apiKeySet("logRevenueV2()"))
            if ("object" === C(e) && e.hasOwnProperty("_q") && (e = Me(new xe, e)),
            e instanceof xe) {
                if (e && e._isValidRevenue())
                    return this.logEvent(o, e._toJSONObject())
            } else
                W.error("Invalid revenue input type. Expected Revenue object but saw " + C(e))
    }
    ,
    Ae.prototype.logRevenue = function(e, t, n) {
        return this._apiKeySet("logRevenue()") && Ge(e) && (void 0 === t || Ge(t)) ? this._logEvent(o, {}, {
            productId: n,
            special: "revenue_amount",
            quantity: t || 1,
            price: e
        }, null, null, null, null, null) : -1
    }
    ,
    Ae.prototype.removeEvents = function(e, t) {
        Le(this, "_unsentEvents", e),
        Le(this, "_unsentIdentifys", t)
    }
    ;
    var Le = function(e, t, n) {
        if (!(n < 0)) {
            for (var i = [], r = 0; r < e[t].length; r++)
                e[t][r].event_id > n && i.push(e[t][r]);
            e[t] = i
        }
    };
    Ae.prototype.sendEvents = function(n) {
        if (this._apiKeySet("sendEvents()"))
            if (this.options.optOut)
                "function" === C(n) && n(0, "No request sent", {
                    reason: "optOut is set to true"
                });
            else if (0 !== this._unsentCount())
                if (this._sending)
                    "function" === C(n) && n(0, "No request sent", {
                        reason: "Request already in progress"
                    });
                else {
                    this._sending = !0;
                    var e = (this.options.forceHttps ? "https" : "https:" === window.location.protocol ? "https" : "http") + "://" + this.options.apiEndpoint
                      , i = Math.min(this._unsentCount(), this.options.uploadBatchSize)
                      , t = this._mergeEventsAndIdentifys(i)
                      , r = t.maxEventId
                      , o = t.maxIdentifyId
                      , s = JSON.stringify(t.eventsToSend)
                      , a = (new Date).getTime()
                      , u = {
                        client: this.options.apiKey,
                        e: s,
                        v: c,
                        upload_time: a,
                        checksum: ve(c + this.options.apiKey + s + a)
                    }
                      , p = this;
                    new Oe(e,u).send(function(e, t) {
                        p._sending = !1;
                        try {
                            200 === e && "success" === t ? (p.removeEvents(r, o),
                            p.options.saveEvents && p.saveEvents(),
                            p._sendEventsIfReady(n) || "function" !== C(n) || n(e, t)) : 413 === e ? (1 === p.options.uploadBatchSize && p.removeEvents(r, o),
                            p.options.uploadBatchSize = Math.ceil(i / 2),
                            p.sendEvents(n)) : "function" === C(n) && n(e, t)
                        } catch (e) {}
                    })
                }
            else
                "function" === C(n) && n(0, "No request sent", {
                    reason: "No events to send"
                });
        else
            "function" === C(n) && n(0, "No request sent", {
                reason: "API key not set"
            })
    }
    ,
    Ae.prototype._mergeEventsAndIdentifys = function(e) {
        for (var t = [], n = 0, i = -1, r = 0, o = -1; t.length < e; ) {
            var s, a = r >= this._unsentIdentifys.length, u = n >= this._unsentEvents.length;
            if (u && a) {
                W.error("Merging Events and Identifys, less events and identifys than expected");
                break
            }
            a ? i = (s = this._unsentEvents[n++]).event_id : u ? o = (s = this._unsentIdentifys[r++]).event_id : !("sequence_number"in this._unsentEvents[n]) || this._unsentEvents[n].sequence_number < this._unsentIdentifys[r].sequence_number ? i = (s = this._unsentEvents[n++]).event_id : o = (s = this._unsentIdentifys[r++]).event_id,
            t.push(s)
        }
        return {
            eventsToSend: t,
            maxEventId: i,
            maxIdentifyId: o
        }
    }
    ,
    Ae.prototype.setGlobalUserProperties = function(e) {
        this.setUserProperties(e)
    }
    ,
    Ae.prototype.__VERSION__ = Te;
    var Fe = function() {
        this.options = l({}, Pe),
        this._q = [],
        this._instances = {}
    };
    Fe.prototype.Identify = fe,
    Fe.prototype.Revenue = xe,
    Fe.prototype.getInstance = function(e) {
        e = $(e) ? f : e.toLowerCase();
        var t = this._instances[e];
        return void 0 === t && (t = new Ae(e),
        this._instances[e] = t),
        t
    }
    ,
    Fe.prototype.runQueuedFunctions = function() {
        for (var e = 0; e < this._q.length; e++) {
            var t = this[this._q[e][0]];
            "function" === C(t) && t.apply(this, this._q[e].slice(1))
        }
        for (var n in this._q = [],
        this._instances)
            this._instances.hasOwnProperty(n) && this._instances[n].runQueuedFunctions()
    }
    ,
    Fe.prototype.init = function(e, t, n, i) {
        this.getInstance().init(e, t, n, function(e) {
            this.options = e.options,
            "function" === C(i) && i(e)
        }
        .bind(this))
    }
    ,
    Fe.prototype.isNewSession = function() {
        return this.getInstance().isNewSession()
    }
    ,
    Fe.prototype.getSessionId = function() {
        return this.getInstance().getSessionId()
    }
    ,
    Fe.prototype.nextEventId = function() {
        return this.getInstance().nextEventId()
    }
    ,
    Fe.prototype.nextIdentifyId = function() {
        return this.getInstance().nextIdentifyId()
    }
    ,
    Fe.prototype.nextSequenceNumber = function() {
        return this.getInstance().nextSequenceNumber()
    }
    ,
    Fe.prototype.saveEvents = function() {
        this.getInstance().saveEvents()
    }
    ,
    Fe.prototype.setDomain = function(e) {
        this.getInstance().setDomain(e)
    }
    ,
    Fe.prototype.setUserId = function(e) {
        this.getInstance().setUserId(e)
    }
    ,
    Fe.prototype.setGroup = function(e, t) {
        this.getInstance().setGroup(e, t)
    }
    ,
    Fe.prototype.setOptOut = function(e) {
        this.getInstance().setOptOut(e)
    }
    ,
    Fe.prototype.regenerateDeviceId = function() {
        this.getInstance().regenerateDeviceId()
    }
    ,
    Fe.prototype.setDeviceId = function(e) {
        this.getInstance().setDeviceId(e)
    }
    ,
    Fe.prototype.setUserProperties = function(e) {
        this.getInstance().setUserProperties(e)
    }
    ,
    Fe.prototype.clearUserProperties = function() {
        this.getInstance().clearUserProperties()
    }
    ,
    Fe.prototype.identify = function(e, t) {
        this.getInstance().identify(e, t)
    }
    ,
    Fe.prototype.setVersionName = function(e) {
        this.getInstance().setVersionName(e)
    }
    ,
    Fe.prototype.logEvent = function(e, t, n) {
        return this.getInstance().logEvent(e, t, n)
    }
    ,
    Fe.prototype.logEventWithGroups = function(e, t, n, i) {
        return this.getInstance().logEventWithGroups(e, t, n, i)
    }
    ,
    Fe.prototype.logRevenueV2 = function(e) {
        return this.getInstance().logRevenueV2(e)
    }
    ,
    Fe.prototype.logRevenue = function(e, t, n) {
        return this.getInstance().logRevenue(e, t, n)
    }
    ,
    Fe.prototype.removeEvents = function(e, t) {
        this.getInstance().removeEvents(e, t)
    }
    ,
    Fe.prototype.sendEvents = function(e) {
        this.getInstance().sendEvents(e)
    }
    ,
    Fe.prototype.setGlobalUserProperties = function(e) {
        this.getInstance().setUserProperties(e)
    }
    ,
    Fe.prototype.__VERSION__ = Te;
    var Ke = window.amplitude || {}
      , Ve = new Fe;
    for (var We in Ve._q = Ke._q || [],
    Ke._iq)
        Ke._iq.hasOwnProperty(We) && (Ve.getInstance(We)._q = Ke._iq[We]._q || []);
    return Ve.runQueuedFunctions(),
    Ve
});

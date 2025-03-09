function BrowserDetect() {
  var e = navigator.userAgent.toLowerCase(), t = navigator.appName, n = null;
  return t === "Microsoft Internet Explorer" || e.indexOf("trident") > -1 || e.indexOf("edge/") > -1 ? (n = "ie", t === "Microsoft Internet Explorer" ? (e = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(e), n += parseInt(e[1])) : e.indexOf("trident") > -1 ? n += 11 : e.indexOf("edge/") > -1 && (n = "edge")) : e.indexOf("safari") > -1 ? n = e.indexOf("chrome") > -1 ? "chrome" : "safari" : e.indexOf("firefox") > -1 && (n = "firefox"), n;
}
function VideoMediaSource(e) {
  function t() {
  }
  function n() {
    c();
  }
  function r(m) {
    a = [], a.push({
      type: "error",
      function: J
    }), a.push({
      type: "updateend",
      function: C
    }), a.push({
      type: "update",
      function: x
    });
    for (var F = 0; F < a.length; F++)
      m.addEventListener(a[F].type, a[F].function);
  }
  function i(m) {
    A = [], A.push({
      type: "durationchange",
      function: Se
    }), A.push({
      type: "playing",
      function: Q
    }), A.push({
      type: "error",
      function: K
    }), A.push({
      type: "pause",
      function: ne
    }), A.push({
      type: "timeupdate",
      function: ce
    }), A.push({
      type: "resize",
      function: se
    }), A.push({
      type: "seeked",
      function: me
    }), A.push({
      type: "waiting",
      function: Re
    }), A.push({
      type: "canplaythrough",
      function: _
    }), A.push({
      type: "canplay",
      function: he
    }), A.push({
      type: "loadedmetadata",
      function: d
    });
    for (var F = 0; F < A.length; F++)
      m.addEventListener(A[F].type, A[F].function);
  }
  function s(m) {
    f = [], f.push({
      type: "sourceopen",
      function: n
    }), f.push({
      type: "error",
      function: D
    });
    for (var F = 0; F < f.length; F++)
      m.addEventListener(f[F].type, f[F].function);
  }
  function o() {
    var m = 0;
    if (a !== null)
      for (m = 0; m < a.length; m++)
        L.removeEventListener(a[m].type, a[m].function);
    if (f !== null)
      for (m = 0; m < f.length; m++)
        V.removeEventListener(f[m].type, f[m].function);
    if (A !== null)
      for (m = 0; m < A.length; m++)
        H.removeEventListener(A[m].type, A[m].function);
  }
  function c() {
    if (V === null || V.readyState === "ended")
      return V = new MediaSource(), s(V), H.src = window.URL.createObjectURL(V);
    if (V.sourceBuffers.length === 0) {
      V.duration = 0;
      var m = 'video/mp4;codecs="avc1.' + T + '"';
      L = V.addSourceBuffer(m), r(L);
    }
    var F = p();
    return F === null ? void V.endOfStream("network") : L.appendBuffer(F);
  }
  function v(m) {
    if (L !== null && V.readyState !== "closed" && V.readyState !== "ended")
      try {
        if (ee.length > 0) return ee.push(m);
        L.updating ? ee.push(m) : L.appendBuffer(m);
      } catch {
        ee.length = 0, oe.initVideo(!1);
      }
  }
  function R() {
    try {
      H.paused && (P(), g || H.play());
    } catch {
    }
  }
  function E() {
    H.paused || I || (console.log("pause"), H.pause());
  }
  function h() {
    var m = 60, F = 10, W = 1 * L.buffered.start(L.buffered.length - 1), Y = 1 * L.buffered.end(L.buffered.length - 1);
    Y - W > m && L.remove(W, Y - F);
  }
  function S() {
    if (V !== null)
      try {
        if (L && L.buffered.length > 0 && (h(), g || H.duration - H.currentTime > 1.5 && (H.currentTime = (H.duration - 1).toFixed(3)), q)) {
          var m = 1 * L.buffered.start(L.buffered.length - 1), F = 1 * L.buffered.end(L.buffered.length - 1), W = 0;
          if (W = H.currentTime === 0 ? F - m : F - H.currentTime, W >= ge + 0.1) {
            if (L.updating) return;
            var Y = F - ge;
            H.currentTime = Y.toFixed(3);
          }
        }
      } catch {
        console.log("sourceBuffer has been removed");
      }
  }
  function C() {
  }
  function x() {
    ee.length > 0 && (L.updating || (L.appendBuffer(ee[0]), ee.shift()));
  }
  function D() {
    console.log("videoMediaSource::onSourceError");
  }
  function J() {
    console.log("videoMediaSource::onSourceBufferErrormsg");
  }
  function K() {
    console.log("videoMediaSource::onError"), E();
  }
  function Q() {
    g = !0, I = !1, B || (B = !0, xe("PlayStart"));
  }
  function ne() {
    g = !1, I = !0, console.log("暂停播放----------------------------------------------");
  }
  function ce() {
    var m = 4, F = 4, W = parseInt(V.duration, 10), Y = parseInt(H.currentTime, 10), ae = Ee.timestamp - te * (W - Y + (te !== 1 ? 1 : 0)), le = {
      timestamp: ae,
      timestamp_usec: 0,
      timezone: Ee.timezone
    };
    Y === 0 || isNaN(W) || Math.abs(W - Y) > F && te === 1 || H.paused || (b === null ? b = le : (b.timestamp <= le.timestamp && te >= 1 || b.timestamp > le.timestamp && 1 > te) && (y && oe.timeStamp(le), b = le, Z++, Z > m && de(le.timestamp, "currentTime")));
  }
  function Se() {
    S();
  }
  function se() {
    P();
  }
  function me() {
    R();
  }
  function Re() {
    if (q = !1, ue == 0) ie = Date.now(), ue++;
    else {
      ue++;
      var m = Date.now() - ie;
      ue >= 5 && 6e4 > m && 1.8 >= ge && (ge += 0.1, ue = 0, ie = 0);
    }
  }
  function he() {
  }
  function _() {
    q = !0;
  }
  function d() {
  }
  function w(m, F) {
    for (var W = atob(m.substring(22)), Y = new Uint8Array(W.length), ae = 0, le = W.length; le > ae; ++ae)
      Y[ae] = W.charCodeAt(ae);
    var Ae = new Blob([Y.buffer], {
      type: "image/png"
    });
    O(Ae, F + ".png");
  }
  var p = null, T = "", M = null, P = null, de = null, xe = null, re = null, te = 1, Ee = {
    timestamp: 0,
    timestamp_usec: 0,
    timezone: 0
  }, we = !1, N = {
    timestamp: 0,
    timestamp_usec: 0,
    timezone: 0
  }, b = null, y = !1, a = null, A = null, f = null, g = !1, I = !0, Z = 0, oe = e, q = !1, ee = [], ge = 0.5, H = null, V = null, L = null, ie = 0, ue = 0, B = !1, U = null, G = BrowserDetect();
  t.prototype = {
    init: function(m) {
      re = BrowserDetect(), H = m, H.autoplay = re !== "safari", H.controls = !1, H.preload = "auto", i(H), c();
    },
    setInitSegmentFunc: function(m) {
      p = m;
    },
    getVideoElement: function() {
      return H;
    },
    setCodecInfo: function(m) {
      T = m;
    },
    setMediaSegment: function(m) {
      v(m);
    },
    capture: function(m) {
      U && clearInterval(U);
      var F = document.createElement("canvas");
      F.width = H.videoWidth, F.height = H.videoHeight, q || G === "edge" ? (F.getContext("2d").drawImage(H, 0, 0, F.width, F.height), w(F.toDataURL(), m)) : U = setInterval(function() {
        q && (F.getContext("2d").drawImage(H, 0, 0, F.width, F.height), w(F.toDataURL(), m), clearInterval(U));
      }, 200);
    },
    setInitSegment: function() {
      c();
    },
    setTimeStamp: function(m) {
      M = m;
    },
    setVideoSizeCallback: function(m) {
      P = m;
    },
    setAudioStartCallback: function(m) {
      de = m;
    },
    getPlaybackTimeStamp: function() {
      return M;
    },
    setSpeedPlay: function(m) {
      te = m;
    },
    setvideoTimeStamp: function(m) {
      var F = 3, W = Math.abs(Ee.timestamp - m.timestamp) > F;
      if (W === !0 && we === !1) {
        we = !0, Z = 0, N = m, de(N.timestamp, "init");
        var Y = parseInt(V.duration, 10), ae = parseInt(H.currentTime, 10), le = Y - ae;
        setTimeout(function() {
          Ee = m, we = !1;
        }, 1e3 * le);
      } else W === !1 && we === !1 && (Ee = m);
    },
    pause: function() {
      E();
    },
    play: function() {
      R();
    },
    setPlaybackFlag: function(m) {
      y = m;
    },
    setTimeStampInit: function() {
      b = null, N = {
        timestamp: 0,
        timestamp_usec: 0,
        timezone: 0
      };
    },
    close: function() {
      o(), E();
    },
    setBeginDrawCallback: function(m) {
      xe = m;
    },
    terminate: function() {
      o(), V.readyState === "open" && L && V.removeSourceBuffer(L), L = null, V.endOfStream(), L = null, V = null, H = null, U && (clearInterval(U), U = null);
    },
    getDuration: function() {
      return H.duration - H.currentTime;
    },
    getNoWaitFlag: function() {
      return G !== "edge" ? q : !0;
    }
  };
  var O = function(m) {
    var F = m.document, W = function() {
      return m.URL || m.webkitURL || m;
    }, Y = F.createElementNS("http://www.w3.org/1999/xhtml", "a"), ae = "download" in Y, le = function(z) {
      var fe = new MouseEvent("click");
      z.dispatchEvent(fe);
    }, Ae = /constructor/i.test(m.HTMLElement), Ie = /CriOS\/[\d]+/.test(navigator.userAgent), Ue = function(z) {
      (m.setImmediate || m.setTimeout)(function() {
        throw z;
      }, 0);
    }, k = "application/octet-stream", l = 4e4, Me = function(z) {
      var fe = function() {
        typeof z == "string" ? W().revokeObjectURL(z) : z.remove();
      };
      setTimeout(fe, l);
    }, Fe = function(z, fe, Ce) {
      fe = [].concat(fe);
      for (var Te = fe.length; Te--; ) {
        var pe = z["on" + fe[Te]];
        if (typeof pe == "function")
          try {
            pe.call(z, Ce || z);
          } catch (Le) {
            Ue(Le);
          }
      }
    }, Pe = function(z) {
      return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
        z.type
      ) ? new Blob(["\uFEFF", z], {
        type: z.type
      }) : z;
    }, ye = function(z, fe, Ce) {
      Ce || (z = Pe(z));
      var Te, pe = this, Le = z.type, Ve = Le === k, Be = function() {
        Fe(pe, "writestart progress write writeend".split(" "));
      }, He = function() {
        if ((Ie || Ve && Ae) && m.FileReader) {
          var _e = new FileReader();
          return _e.onloadend = function() {
            var Oe = Ie ? _e.result : _e.result.replace(
              /^data:[^;]*;/,
              "data:attachment/file;"
            ), Ge = m.open(Oe, "_blank");
            Ge || (m.location.href = Oe), Oe = void 0, pe.readyState = pe.DONE, Be();
          }, _e.readAsDataURL(z), void (pe.readyState = pe.INIT);
        }
        if (Te || (Te = W().createObjectURL(z)), Ve) m.location.href = Te;
        else {
          var ze = m.open(Te, "_blank");
          ze || (m.location.href = Te);
        }
        pe.readyState = pe.DONE, Be(), Me(Te);
      };
      return pe.readyState = pe.INIT, ae ? (Te = W().createObjectURL(z), void setTimeout(function() {
        Y.href = Te, Y.download = fe, le(Y), Be(), Me(Te), pe.readyState = pe.DONE;
      })) : void He();
    }, ve = ye.prototype, ke = function(z, fe, Ce) {
      return new ye(z, fe || z.name || "download", Ce);
    };
    return typeof navigator < "u" && navigator.msSaveOrOpenBlob ? function(z, fe, Ce) {
      return fe = fe || z.name || "download", Ce || (z = Pe(z)), navigator.msSaveOrOpenBlob(z, fe);
    } : (ve.readyState = ve.INIT = 0, ve.WRITING = 1, ve.DONE = 2, ve.error = ve.onwritestart = ve.onprogress = ve.onwrite = ve.onabort = ve.onerror = ve.onwriteend = null, ke);
  }(window);
  return new t();
}
var MP4Remux = function() {
  function e() {
    for (var d in t) t[d] = [d.charCodeAt(0), d.charCodeAt(1), d.charCodeAt(2), d.charCodeAt(3)];
    n.FTYP = new Uint8Array([105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49]), n.STSD_PREFIX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]), n.STTS = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), n.STSC = n.STCO = n.STTS, n.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), n.HDLR_VIDEO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]), n.HDLR_AUDIO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]), n.DREF = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]), n.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), n.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  var t = [], n = {};
  t = {
    avc1: [],
    avcC: [],
    btrt: [],
    dinf: [],
    dref: [],
    esds: [],
    ftyp: [],
    hdlr: [],
    mdat: [],
    mdhd: [],
    mdia: [],
    mfhd: [],
    minf: [],
    moof: [],
    moov: [],
    mp4a: [],
    mvex: [],
    mvhd: [],
    sdtp: [],
    stbl: [],
    stco: [],
    stsc: [],
    stsd: [],
    stsz: [],
    stts: [],
    tfdt: [],
    tfhd: [],
    traf: [],
    trak: [],
    trun: [],
    trex: [],
    tkhd: [],
    vmhd: [],
    smhd: []
  };
  var r = function(d) {
    for (var w = 8, p = Array.prototype.slice.call(arguments, 1), T = 0; T < p.length; T++) w += p[T].byteLength;
    var M = new Uint8Array(w), P = 0;
    M[P++] = w >>> 24 & 255, M[P++] = w >>> 16 & 255, M[P++] = w >>> 8 & 255, M[P++] = 255 & w, M.set(d, P), P += 4;
    for (var T = 0; T < p.length; T++) M.set(p[T], P), P += p[T].byteLength;
    return M;
  }, i = function(d) {
    var w = d.config, p = w.length, T = new Uint8Array([0, 0, 0, 0, 3, 23 + p, 0, 1, 0, 4, 15 + p, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([p]).concat(w).concat([6, 1, 2]));
    return r(t.esds, T);
  }, s = function(d) {
    return r(t.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, (65280 & d.channelcount) >> 8, 255 & d.channelcount, (65280 & d.samplesize) >> 8, 255 & d.samplesize, 0, 0, 0, 0, (65280 & d.samplerate) >> 8, 255 & d.samplerate, 0, 0]), i(d));
  }, o = function(d) {
    var w = d.sps || [], p = d.pps || [], T = [], M = [], P = 0;
    for (P = 0; P < w.length; P++) T.push((65280 & w[P].byteLength) >>> 8), T.push(255 & w[P].byteLength), T = T.concat(Array.prototype.slice.call(w[P]));
    for (P = 0; P < p.length; P++) M.push((65280 & p[P].byteLength) >>> 8), M.push(255 & p[P].byteLength), M = M.concat(Array.prototype.slice.call(p[P]));
    return r(t.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, (65280 & d.width) >> 8, 255 & d.width, (65280 & d.height) >> 8, 255 & d.height, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), r(t.avcC, new Uint8Array([1, d.profileIdc, d.profileCompatibility, d.levelIdc, 255].concat([w.length]).concat(T).concat([p.length]).concat(M))));
  }, c = function(d) {
    return d.type === "audio" ? r(t.stsd, n.STSD_PREFIX, s(d)) : r(t.stsd, n.STSD_PREFIX, o(d));
  }, v = function() {
    return r(t.dinf, r(t.dref, n.DREF));
  }, R = function(d) {
    var w = r(t.stbl, c(d), r(t.stts, n.STTS), r(t.stsc, n.STSC), r(t.stsz, n.STSZ), r(t.stco, n.STCO));
    return w;
  }, E = function(d) {
    var w = d.timescale, p = d.duration;
    return r(t.mdhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, w >>> 24 & 255, w >>> 16 & 255, w >>> 8 & 255, 255 & w, p >>> 24 & 255, p >>> 16 & 255, p >>> 8 & 255, 255 & p, 85, 196, 0, 0]));
  }, h = function(d) {
    var w = null;
    return w = d.type === "audio" ? n.HDLR_AUDIO : n.HDLR_VIDEO, r(t.hdlr, w);
  }, S = function(d) {
    var w = null;
    return w = d.type === "audio" ? r(t.smhd, n.SMHD) : r(t.vmhd, n.VMHD), r(t.minf, w, v(), R(d));
  }, C = function(d) {
    var w = d.id, p = d.duration, T = d.width, M = d.height;
    return r(t.tkhd, new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, w >>> 24 & 255, w >>> 16 & 255, w >>> 8 & 255, 255 & w, 0, 0, 0, 0, p >>> 24 & 255, p >>> 16 & 255, p >>> 8 & 255, 255 & p, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, T >>> 8 & 255, 255 & T, 0, 0, M >>> 8 & 255, 255 & M, 0, 0]));
  }, x = function(d) {
    return r(t.mdia, E(d), h(d), S(d));
  }, D = function(d) {
    var w = d.id, p = new Uint8Array([0, 0, 0, 0, w >>> 24 & 255, w >>> 16 & 255, w >>> 8 & 255, 255 & w, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);
    return r(t.trex, p);
  }, J = function(d, w) {
    return console.log("mvhd:  timescale: " + d + "  duration: " + w), r(t.mvhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, 255 & d, w >>> 24 & 255, w >>> 16 & 255, w >>> 8 & 255, 255 & w, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]));
  }, K = function(d) {
    return r(t.trak, C(d), x(d));
  }, Q = function(d) {
    return r(t.mvex, D(d));
  }, ne = function(d) {
    var w = J(d.timescale, d.duration), p = K(d), T = Q(d);
    return r(t.moov, w, p, T);
  }, ce = function(d, w) {
    return [0, 0, 3, 5, (4278190080 & d.length) >>> 24, (16711680 & d.length) >>> 16, (65280 & d.length) >>> 8, 255 & d.length, (4278190080 & w) >>> 24, (16711680 & w) >>> 16, (65280 & w) >>> 8, 255 & w, 0, 0, 0, 0];
  }, Se = function(d, w) {
    var p = null, T = null, M = null, P = 0, de = w;
    if (T = d.samples || [], T[0].frameDuration === null)
      for (de += 24 + 4 * T.length, p = trunHeader(T, de), P = 0; P < T.length; P++) M = T[P], p = p.concat([(4278190080 & M.size) >>> 24, (16711680 & M.size) >>> 16, (65280 & M.size) >>> 8, 255 & M.size]);
    else
      for (de += 24 + 4 * T.length + 4 * T.length, p = ce(T, de), P = 0; P < T.length; P++) M = T[P], p = p.concat([(4278190080 & M.frameDuration) >>> 24, (16711680 & M.frameDuration) >>> 16, (65280 & M.frameDuration) >>> 8, 255 & M.frameDuration, (4278190080 & M.size) >>> 24, (16711680 & M.size) >>> 16, (65280 & M.size) >>> 8, 255 & M.size]);
    return r(t.trun, new Uint8Array(p));
  }, se = function(d, w) {
    return d.type === "audio" ? audioTrun(d, w) : Se(d, w);
  }, me = function(d) {
    var w = new Uint8Array([0, 0, 0, 0, d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, 255 & d]);
    return r(t.mfhd, w);
  }, Re = function(d) {
    var w = null, p = null, T = null, M = null;
    return w = r(t.tfhd, new Uint8Array([0, 2, 0, 0, 0, 0, 0, 1])), p = r(t.tfdt, new Uint8Array([0, 0, 0, 0, d.baseMediaDecodeTime >>> 24 & 255, d.baseMediaDecodeTime >>> 16 & 255, d.baseMediaDecodeTime >>> 8 & 255, 255 & d.baseMediaDecodeTime])), M = 72, T = se(d, M), r(t.traf, w, p, T);
  }, he = function(d, w) {
    return r(t.moof, me(d), Re(w));
  }, _ = function(d) {
    return r(t.mdat, d);
  };
  return e.prototype = {
    initSegment: function(d) {
      var w = r(t.ftyp, n.FTYP), p = ne(d), T = new Uint8Array(w.byteLength + p.byteLength);
      return T.set(w, 0), T.set(p, w.byteLength), T;
    },
    mediaSegment: function(d, w, p) {
      var T = he(d, w), M = _(p), P = null;
      return P = new Uint8Array(T.byteLength + M.byteLength), P.set(T), P.set(M, T.byteLength), P;
    }
  }, new e();
};
let mp4Remux = new MP4Remux();
var Script = function() {
  function e() {
  }
  return e.createFromElementId = function(t) {
    for (var n = document.getElementById(t), r = "", i = n.firstChild; i; )
      i.nodeType === 3 && (r += i.textContent), i = i.nextSibling;
    var s = new e();
    return s.type = n.type, s.source = r, s;
  }, e.createFromSource = function(t, n) {
    var r = new e();
    return r.type = t, r.source = n, r;
  }, e;
}(), Shader = /* @__PURE__ */ function() {
  function e(t, n) {
    if (n.type === "x-shader/x-fragment")
      this.shader = t.createShader(t.FRAGMENT_SHADER);
    else {
      if (n.type !== "x-shader/x-vertex")
        return void error("Unknown shader type: " + n.type);
      this.shader = t.createShader(t.VERTEX_SHADER);
    }
    return t.shaderSource(this.shader, n.source), t.compileShader(this.shader), t.getShaderParameter(this.shader, t.COMPILE_STATUS) ? void 0 : void error(
      "An error occurred compiling the shaders: " + t.getShaderInfoLog(this.shader)
    );
  }
  return e;
}(), Program = function() {
  function e(t) {
    this.gl = t, this.program = this.gl.createProgram();
  }
  return e.prototype = {
    attach: function(t) {
      this.gl.attachShader(this.program, t.shader);
    },
    link: function() {
      this.gl.linkProgram(this.program);
    },
    use: function() {
      this.gl.useProgram(this.program);
    },
    getAttributeLocation: function(t) {
      return this.gl.getAttribLocation(this.program, t);
    },
    setMatrixUniform: function(t, n) {
      var r = this.gl.getUniformLocation(this.program, t);
      this.gl.uniformMatrix4fv(r, !1, n);
    }
  }, e;
}(), Texture = function() {
  function e(n, r, i) {
    this.gl = n, this.size = r, this.texture = n.createTexture(), n.bindTexture(n.TEXTURE_2D, this.texture), this.format = i || n.LUMINANCE, n.texImage2D(
      n.TEXTURE_2D,
      0,
      this.format,
      r.w,
      r.h,
      0,
      this.format,
      n.UNSIGNED_BYTE,
      null
    ), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE);
  }
  var t = null;
  return e.prototype = {
    fill: function(n, r) {
      var i = this.gl;
      i.bindTexture(i.TEXTURE_2D, this.texture), r ? i.texSubImage2D(
        i.TEXTURE_2D,
        0,
        0,
        0,
        this.size.w,
        this.size.h,
        this.format,
        i.UNSIGNED_BYTE,
        n
      ) : i.texImage2D(
        i.TEXTURE_2D,
        0,
        this.format,
        this.size.w,
        this.size.h,
        0,
        this.format,
        i.UNSIGNED_BYTE,
        n
      );
    },
    bind: function(n, r, i) {
      var s = this.gl;
      t || (t = [s.TEXTURE0, s.TEXTURE1, s.TEXTURE2]), s.activeTexture(t[n]), s.bindTexture(s.TEXTURE_2D, this.texture), s.uniform1i(s.getUniformLocation(r.program, i), n);
    }
  }, e;
}();
function Vector() {
}
function Matrix() {
}
function Line() {
}
function Plane() {
}
var Sylvester = {
  version: "0.1.3",
  precision: 1e-6
};
Vector.prototype = {
  e: function(e) {
    return 1 > e || e > this.elements.length ? null : this.elements[e - 1];
  },
  dimensions: function() {
    return this.elements.length;
  },
  modulus: function() {
    return Math.sqrt(this.dot(this));
  },
  eql: function(e) {
    var t = this.elements.length, n = e.elements || e;
    if (t != n.length) return !1;
    do
      if (Math.abs(this.elements[t - 1] - n[t - 1]) > Sylvester.precision)
        return !1;
    while (--t);
    return !0;
  },
  dup: function() {
    return Vector.create(this.elements);
  },
  map: function(e) {
    var t = [];
    return this.each(function(n, r) {
      t.push(e(n, r));
    }), Vector.create(t);
  },
  each: function(e) {
    var t, n = this.elements.length, r = n;
    do
      t = r - n, e(this.elements[t], t + 1);
    while (--n);
  },
  toUnitVector: function() {
    var e = this.modulus();
    return e === 0 ? this.dup() : this.map(function(t) {
      return t / e;
    });
  },
  angleFrom: function(e) {
    var t = e.elements || e, n = this.elements.length;
    if (n != t.length) return null;
    var r = 0, i = 0, s = 0;
    if (this.each(function(c, v) {
      r += c * t[v - 1], i += c * c, s += t[v - 1] * t[v - 1];
    }), i = Math.sqrt(i), s = Math.sqrt(s), i * s === 0)
      return null;
    var o = r / (i * s);
    return -1 > o && (o = -1), o > 1 && (o = 1), Math.acos(o);
  },
  isParallelTo: function(e) {
    var t = this.angleFrom(e);
    return t === null ? null : t <= Sylvester.precision;
  },
  isAntiparallelTo: function(e) {
    var t = this.angleFrom(e);
    return t === null ? null : Math.abs(t - Math.PI) <= Sylvester.precision;
  },
  isPerpendicularTo: function(e) {
    var t = this.dot(e);
    return t === null ? null : Math.abs(t) <= Sylvester.precision;
  },
  add: function(e) {
    var t = e.elements || e;
    return this.elements.length != t.length ? null : this.map(function(n, r) {
      return n + t[r - 1];
    });
  },
  subtract: function(e) {
    var t = e.elements || e;
    return this.elements.length != t.length ? null : this.map(function(n, r) {
      return n - t[r - 1];
    });
  },
  multiply: function(e) {
    return this.map(function(t) {
      return t * e;
    });
  },
  x: function(e) {
    return this.multiply(e);
  },
  dot: function(e) {
    var t = e.elements || e, n = 0, r = this.elements.length;
    if (r != t.length) return null;
    do
      n += this.elements[r - 1] * t[r - 1];
    while (--r);
    return n;
  },
  cross: function(e) {
    var t = e.elements || e;
    if (this.elements.length != 3 || t.length != 3) return null;
    var n = this.elements;
    return Vector.create([
      n[1] * t[2] - n[2] * t[1],
      n[2] * t[0] - n[0] * t[2],
      n[0] * t[1] - n[1] * t[0]
    ]);
  },
  max: function() {
    var e, t = 0, n = this.elements.length, r = n;
    do
      e = r - n, Math.abs(this.elements[e]) > Math.abs(t) && (t = this.elements[e]);
    while (--n);
    return t;
  },
  indexOf: function(e) {
    var t, n = null, r = this.elements.length, i = r;
    do
      t = i - r, n === null && this.elements[t] == e && (n = t + 1);
    while (--r);
    return n;
  },
  toDiagonalMatrix: function() {
    return Matrix.Diagonal(this.elements);
  },
  round: function() {
    return this.map(function(e) {
      return Math.round(e);
    });
  },
  snapTo: function(e) {
    return this.map(function(t) {
      return Math.abs(t - e) <= Sylvester.precision ? e : t;
    });
  },
  distanceFrom: function(e) {
    if (e.anchor) return e.distanceFrom(this);
    var t = e.elements || e;
    if (t.length != this.elements.length) return null;
    var n, r = 0;
    return this.each(function(i, s) {
      n = i - t[s - 1], r += n * n;
    }), Math.sqrt(r);
  },
  liesOn: function(e) {
    return e.contains(this);
  },
  liesIn: function(e) {
    return e.contains(this);
  },
  rotate: function(e, t) {
    var n, r, i, s, o;
    switch (this.elements.length) {
      case 2:
        return n = t.elements || t, n.length != 2 ? null : (r = Matrix.Rotation(e).elements, i = this.elements[0] - n[0], s = this.elements[1] - n[1], Vector.create([
          n[0] + r[0][0] * i + r[0][1] * s,
          n[1] + r[1][0] * i + r[1][1] * s
        ]));
      case 3:
        if (!t.direction) return null;
        var c = t.pointClosestTo(this).elements;
        return r = Matrix.Rotation(e, t.direction).elements, i = this.elements[0] - c[0], s = this.elements[1] - c[1], o = this.elements[2] - c[2], Vector.create([
          c[0] + r[0][0] * i + r[0][1] * s + r[0][2] * o,
          c[1] + r[1][0] * i + r[1][1] * s + r[1][2] * o,
          c[2] + r[2][0] * i + r[2][1] * s + r[2][2] * o
        ]);
      default:
        return null;
    }
  },
  reflectionIn: function(e) {
    if (e.anchor) {
      var t = this.elements.slice(), n = e.pointClosestTo(t).elements;
      return Vector.create([
        n[0] + (n[0] - t[0]),
        n[1] + (n[1] - t[1]),
        n[2] + (n[2] - (t[2] || 0))
      ]);
    }
    var r = e.elements || e;
    return this.elements.length != r.length ? null : this.map(function(i, s) {
      return r[s - 1] + (r[s - 1] - i);
    });
  },
  to3D: function() {
    var e = this.dup();
    switch (e.elements.length) {
      case 3:
        break;
      case 2:
        e.elements.push(0);
        break;
      default:
        return null;
    }
    return e;
  },
  inspect: function() {
    return "[" + this.elements.join(", ") + "]";
  },
  setElements: function(e) {
    return this.elements = (e.elements || e).slice(), this;
  }
}, Vector.create = function(e) {
  var t = new Vector();
  return t.setElements(e);
}, Vector.i = Vector.create([1, 0, 0]), Vector.j = Vector.create([0, 1, 0]), Vector.k = Vector.create([0, 0, 1]), Vector.Random = function(e) {
  var t = [];
  do
    t.push(Math.random());
  while (--e);
  return Vector.create(t);
}, Vector.Zero = function(e) {
  var t = [];
  do
    t.push(0);
  while (--e);
  return Vector.create(t);
}, Matrix.prototype = {
  e: function(e, t) {
    return 1 > e || e > this.elements.length || 1 > t || t > this.elements[0].length ? null : this.elements[e - 1][t - 1];
  },
  row: function(e) {
    return e > this.elements.length ? null : Vector.create(this.elements[e - 1]);
  },
  col: function(e) {
    if (e > this.elements[0].length) return null;
    var t, n = [], r = this.elements.length, i = r;
    do
      t = i - r, n.push(this.elements[t][e - 1]);
    while (--r);
    return Vector.create(n);
  },
  dimensions: function() {
    return {
      rows: this.elements.length,
      cols: this.elements[0].length
    };
  },
  rows: function() {
    return this.elements.length;
  },
  cols: function() {
    return this.elements[0].length;
  },
  eql: function(e) {
    var t = e.elements || e;
    if (typeof t[0][0] > "u" && (t = Matrix.create(t).elements), this.elements.length != t.length || this.elements[0].length != t[0].length)
      return !1;
    var n, r, i, s = this.elements.length, o = s, c = this.elements[0].length;
    do {
      n = o - s, r = c;
      do
        if (i = c - r, Math.abs(this.elements[n][i] - t[n][i]) > Sylvester.precision)
          return !1;
      while (--r);
    } while (--s);
    return !0;
  },
  dup: function() {
    return Matrix.create(this.elements);
  },
  map: function(e) {
    var t, n, r, i = [], s = this.elements.length, o = s, c = this.elements[0].length;
    do {
      t = o - s, n = c, i[t] = [];
      do
        r = c - n, i[t][r] = e(this.elements[t][r], t + 1, r + 1);
      while (--n);
    } while (--s);
    return Matrix.create(i);
  },
  isSameSizeAs: function(e) {
    var t = e.elements || e;
    return typeof t[0][0] > "u" && (t = Matrix.create(t).elements), this.elements.length == t.length && this.elements[0].length == t[0].length;
  },
  add: function(e) {
    var t = e.elements || e;
    return typeof t[0][0] > "u" && (t = Matrix.create(t).elements), this.isSameSizeAs(t) ? this.map(function(n, r, i) {
      return n + t[r - 1][i - 1];
    }) : null;
  },
  subtract: function(e) {
    var t = e.elements || e;
    return typeof t[0][0] > "u" && (t = Matrix.create(t).elements), this.isSameSizeAs(t) ? this.map(function(n, r, i) {
      return n - t[r - 1][i - 1];
    }) : null;
  },
  canMultiplyFromLeft: function(e) {
    var t = e.elements || e;
    return typeof t[0][0] > "u" && (t = Matrix.create(t).elements), this.elements[0].length == t.length;
  },
  multiply: function(e) {
    if (!e.elements)
      return this.map(function(x) {
        return x * e;
      });
    var t = !!e.modulus, C = e.elements || e;
    if (typeof C[0][0] > "u" && (C = Matrix.create(C).elements), !this.canMultiplyFromLeft(C))
      return null;
    var n, r, i, s, o, c, v = this.elements.length, R = v, E = C[0].length, h = this.elements[0].length, S = [];
    do {
      n = R - v, S[n] = [], r = E;
      do {
        i = E - r, s = 0, o = h;
        do
          c = h - o, s += this.elements[n][c] * C[c][i];
        while (--o);
        S[n][i] = s;
      } while (--r);
    } while (--v);
    var C = Matrix.create(S);
    return t ? C.col(1) : C;
  },
  x: function(e) {
    return this.multiply(e);
  },
  minor: function(e, t, n, r) {
    var i, s, o, c = [], v = n, R = this.elements.length, E = this.elements[0].length;
    do {
      i = n - v, c[i] = [], s = r;
      do
        o = r - s, c[i][o] = this.elements[(e + i - 1) % R][(t + o - 1) % E];
      while (--s);
    } while (--v);
    return Matrix.create(c);
  },
  transpose: function() {
    var e, t, n, r = this.elements.length, i = this.elements[0].length, s = [], o = i;
    do {
      e = i - o, s[e] = [], t = r;
      do
        n = r - t, s[e][n] = this.elements[n][e];
      while (--t);
    } while (--o);
    return Matrix.create(s);
  },
  isSquare: function() {
    return this.elements.length == this.elements[0].length;
  },
  max: function() {
    var e, t, n, r = 0, i = this.elements.length, s = i, o = this.elements[0].length;
    do {
      e = s - i, t = o;
      do
        n = o - t, Math.abs(this.elements[e][n]) > Math.abs(r) && (r = this.elements[e][n]);
      while (--t);
    } while (--i);
    return r;
  },
  indexOf: function(e) {
    var t, n, r, i = this.elements.length, s = i, o = this.elements[0].length;
    do {
      t = s - i, n = o;
      do
        if (r = o - n, this.elements[t][r] == e)
          return {
            i: t + 1,
            j: r + 1
          };
      while (--n);
    } while (--i);
    return null;
  },
  diagonal: function() {
    if (!this.isSquare) return null;
    var e, t = [], n = this.elements.length, r = n;
    do
      e = r - n, t.push(this.elements[e][e]);
    while (--n);
    return Vector.create(t);
  },
  toRightTriangular: function() {
    var e, t, n, r, i = this.dup(), s = this.elements.length, o = s, c = this.elements[0].length;
    do {
      if (t = o - s, i.elements[t][t] == 0) {
        for (j = t + 1; j < o; j++)
          if (i.elements[j][t] != 0) {
            e = [], n = c;
            do
              r = c - n, e.push(i.elements[t][r] + i.elements[j][r]);
            while (--n);
            i.elements[t] = e;
            break;
          }
      }
      if (i.elements[t][t] != 0)
        for (j = t + 1; j < o; j++) {
          var v = i.elements[j][t] / i.elements[t][t];
          e = [], n = c;
          do
            r = c - n, e.push(t >= r ? 0 : i.elements[j][r] - i.elements[t][r] * v);
          while (--n);
          i.elements[j] = e;
        }
    } while (--s);
    return i;
  },
  toUpperTriangular: function() {
    return this.toRightTriangular();
  },
  determinant: function() {
    if (!this.isSquare()) return null;
    var e, t = this.toRightTriangular(), n = t.elements[0][0], r = t.elements.length - 1, i = r;
    do
      e = i - r + 1, n *= t.elements[e][e];
    while (--r);
    return n;
  },
  det: function() {
    return this.determinant();
  },
  isSingular: function() {
    return this.isSquare() && this.determinant() === 0;
  },
  trace: function() {
    if (!this.isSquare()) return null;
    var e, t = this.elements[0][0], n = this.elements.length - 1, r = n;
    do
      e = r - n + 1, t += this.elements[e][e];
    while (--n);
    return t;
  },
  tr: function() {
    return this.trace();
  },
  rank: function() {
    var e, t, n, r = this.toRightTriangular(), i = 0, s = this.elements.length, o = s, c = this.elements[0].length;
    do {
      e = o - s, t = c;
      do
        if (n = c - t, Math.abs(r.elements[e][n]) > Sylvester.precision) {
          i++;
          break;
        }
      while (--t);
    } while (--s);
    return i;
  },
  rk: function() {
    return this.rank();
  },
  augment: function(e) {
    var t = e.elements || e;
    typeof t[0][0] > "u" && (t = Matrix.create(t).elements);
    var n, r, i, s = this.dup(), o = s.elements[0].length, c = s.elements.length, v = c, R = t[0].length;
    if (c != t.length) return null;
    do {
      n = v - c, r = R;
      do
        i = R - r, s.elements[n][o + i] = t[n][i];
      while (--r);
    } while (--c);
    return s;
  },
  inverse: function() {
    if (!this.isSquare() || this.isSingular()) return null;
    var e, t, n, r, i, s, o, c = this.elements.length, v = c, R = this.augment(Matrix.I(c)).toRightTriangular(), E = R.elements[0].length, h = [];
    do {
      e = c - 1, i = [], n = E, h[e] = [], s = R.elements[e][e];
      do
        r = E - n, o = R.elements[e][r] / s, i.push(o), r >= v && h[e].push(o);
      while (--n);
      for (R.elements[e] = i, t = 0; e > t; t++) {
        i = [], n = E;
        do
          r = E - n, i.push(R.elements[t][r] - R.elements[e][r] * R.elements[t][e]);
        while (--n);
        R.elements[t] = i;
      }
    } while (--c);
    return Matrix.create(h);
  },
  inv: function() {
    return this.inverse();
  },
  round: function() {
    return this.map(function(e) {
      return Math.round(e);
    });
  },
  snapTo: function(e) {
    return this.map(function(t) {
      return Math.abs(t - e) <= Sylvester.precision ? e : t;
    });
  },
  inspect: function() {
    var e, t = [], n = this.elements.length, r = n;
    do
      e = r - n, t.push(Vector.create(this.elements[e]).inspect());
    while (--n);
    return t.join(`
`);
  },
  setElements: function(e) {
    var t, n = e.elements || e;
    if (typeof n[0][0] < "u") {
      var r, i, s, o = n.length, c = o;
      this.elements = [];
      do {
        t = c - o, r = n[t].length, i = r, this.elements[t] = [];
        do
          s = i - r, this.elements[t][s] = n[t][s];
        while (--r);
      } while (--o);
      return this;
    }
    var v = n.length, R = v;
    this.elements = [];
    do
      t = R - v, this.elements.push([n[t]]);
    while (--v);
    return this;
  }
}, Matrix.create = function(e) {
  var t = new Matrix();
  return t.setElements(e);
}, Matrix.I = function(e) {
  var t, n, r, i = [], s = e;
  do {
    t = s - e, i[t] = [], n = s;
    do
      r = s - n, i[t][r] = t == r ? 1 : 0;
    while (--n);
  } while (--e);
  return Matrix.create(i);
}, Matrix.Diagonal = function(e) {
  var t, n = e.length, r = n, i = Matrix.I(n);
  do
    t = r - n, i.elements[t][t] = e[t];
  while (--n);
  return i;
}, Matrix.Rotation = function(e, t) {
  if (!t)
    return Matrix.create([
      [Math.cos(e), -Math.sin(e)],
      [Math.sin(e), Math.cos(e)]
    ]);
  var n = t.dup();
  if (n.elements.length != 3) return null;
  var r = n.modulus(), i = n.elements[0] / r, s = n.elements[1] / r, o = n.elements[2] / r, c = Math.sin(e), v = Math.cos(e), R = 1 - v;
  return Matrix.create([
    [R * i * i + v, R * i * s - c * o, R * i * o + c * s],
    [R * i * s + c * o, R * s * s + v, R * s * o - c * i],
    [R * i * o - c * s, R * s * o + c * i, R * o * o + v]
  ]);
}, Matrix.RotationX = function(e) {
  var t = Math.cos(e), n = Math.sin(e);
  return Matrix.create([
    [1, 0, 0],
    [0, t, -n],
    [0, n, t]
  ]);
}, Matrix.RotationY = function(e) {
  var t = Math.cos(e), n = Math.sin(e);
  return Matrix.create([
    [t, 0, n],
    [0, 1, 0],
    [-n, 0, t]
  ]);
}, Matrix.RotationZ = function(e) {
  var t = Math.cos(e), n = Math.sin(e);
  return Matrix.create([
    [t, -n, 0],
    [n, t, 0],
    [0, 0, 1]
  ]);
}, Matrix.Random = function(e, t) {
  return Matrix.Zero(e, t).map(function() {
    return Math.random();
  });
}, Matrix.Zero = function(e, t) {
  var n, r, i, s = [], o = e;
  do {
    n = e - o, s[n] = [], r = t;
    do
      i = t - r, s[n][i] = 0;
    while (--r);
  } while (--o);
  return Matrix.create(s);
}, Line.prototype = {
  eql: function(e) {
    return this.isParallelTo(e) && this.contains(e.anchor);
  },
  dup: function() {
    return Line.create(this.anchor, this.direction);
  },
  translate: function(e) {
    var t = e.elements || e;
    return Line.create(
      [
        this.anchor.elements[0] + t[0],
        this.anchor.elements[1] + t[1],
        this.anchor.elements[2] + (t[2] || 0)
      ],
      this.direction
    );
  },
  isParallelTo: function(e) {
    if (e.normal) return e.isParallelTo(this);
    var t = this.direction.angleFrom(e.direction);
    return Math.abs(t) <= Sylvester.precision || Math.abs(t - Math.PI) <= Sylvester.precision;
  },
  distanceFrom: function(e) {
    if (e.normal) return e.distanceFrom(this);
    if (e.direction) {
      if (this.isParallelTo(e)) return this.distanceFrom(e.anchor);
      var t = this.direction.cross(e.direction).toUnitVector().elements, i = this.anchor.elements, n = e.anchor.elements;
      return Math.abs(
        (i[0] - n[0]) * t[0] + (i[1] - n[1]) * t[1] + (i[2] - n[2]) * t[2]
      );
    }
    var r = e.elements || e, i = this.anchor.elements, s = this.direction.elements, o = r[0] - i[0], c = r[1] - i[1], v = (r[2] || 0) - i[2], R = Math.sqrt(o * o + c * c + v * v);
    if (R === 0) return 0;
    var E = (o * s[0] + c * s[1] + v * s[2]) / R, h = 1 - E * E;
    return Math.abs(R * Math.sqrt(0 > h ? 0 : h));
  },
  contains: function(e) {
    var t = this.distanceFrom(e);
    return t !== null && t <= Sylvester.precision;
  },
  liesIn: function(e) {
    return e.contains(this);
  },
  intersects: function(e) {
    return e.normal ? e.intersects(this) : !this.isParallelTo(e) && this.distanceFrom(e) <= Sylvester.precision;
  },
  intersectionWith: function(e) {
    if (e.normal) return e.intersectionWith(this);
    if (!this.intersects(e)) return null;
    var t = this.anchor.elements, n = this.direction.elements, r = e.anchor.elements, i = e.direction.elements, s = n[0], o = n[1], c = n[2], v = i[0], R = i[1], E = i[2], h = t[0] - r[0], S = t[1] - r[1], C = t[2] - r[2], x = -s * h - o * S - c * C, D = v * h + R * S + E * C, J = s * s + o * o + c * c, K = v * v + R * R + E * E, Q = s * v + o * R + c * E, ne = (x * K / J + Q * D) / (K - Q * Q);
    return Vector.create([t[0] + ne * s, t[1] + ne * o, t[2] + ne * c]);
  },
  pointClosestTo: function(e) {
    if (e.direction) {
      if (this.intersects(e)) return this.intersectionWith(e);
      if (this.isParallelTo(e)) return null;
      var v = this.direction.elements, t = e.direction.elements, R = v[0], E = v[1], h = v[2], n = t[0], r = t[1], i = t[2], D = h * n - R * i, J = R * r - E * n, K = E * i - h * r, s = Vector.create([D * i - J * r, J * n - K * i, K * r - D * n]), o = Plane.create(e.anchor, s);
      return o.intersectionWith(this);
    }
    var o = e.elements || e;
    if (this.contains(o)) return Vector.create(o);
    var c = this.anchor.elements, v = this.direction.elements, R = v[0], E = v[1], h = v[2], S = c[0], C = c[1], x = c[2], D = R * (o[1] - C) - E * (o[0] - S), J = E * ((o[2] || 0) - x) - h * (o[1] - C), K = h * (o[0] - S) - R * ((o[2] || 0) - x), Q = Vector.create([E * D - h * K, h * J - R * D, R * K - E * J]), ne = this.distanceFrom(o) / Q.modulus();
    return Vector.create([
      o[0] + Q.elements[0] * ne,
      o[1] + Q.elements[1] * ne,
      (o[2] || 0) + Q.elements[2] * ne
    ]);
  },
  rotate: function(e, t) {
    typeof t.direction > "u" && (t = Line.create(t.to3D(), Vector.k));
    var n = Matrix.Rotation(e, t.direction).elements, r = t.pointClosestTo(this.anchor).elements, i = this.anchor.elements, s = this.direction.elements, o = r[0], c = r[1], v = r[2], R = i[0], E = i[1], h = i[2], S = R - o, C = E - c, x = h - v;
    return Line.create(
      [
        o + n[0][0] * S + n[0][1] * C + n[0][2] * x,
        c + n[1][0] * S + n[1][1] * C + n[1][2] * x,
        v + n[2][0] * S + n[2][1] * C + n[2][2] * x
      ],
      [
        n[0][0] * s[0] + n[0][1] * s[1] + n[0][2] * s[2],
        n[1][0] * s[0] + n[1][1] * s[1] + n[1][2] * s[2],
        n[2][0] * s[0] + n[2][1] * s[1] + n[2][2] * s[2]
      ]
    );
  },
  reflectionIn: function(e) {
    if (e.normal) {
      var t = this.anchor.elements, n = this.direction.elements, r = t[0], i = t[1], s = t[2], o = n[0], c = n[1], v = n[2], R = this.anchor.reflectionIn(e).elements, E = r + o, h = i + c, S = s + v, C = e.pointClosestTo([E, h, S]).elements, x = [
        C[0] + (C[0] - E) - R[0],
        C[1] + (C[1] - h) - R[1],
        C[2] + (C[2] - S) - R[2]
      ];
      return Line.create(R, x);
    }
    if (e.direction) return this.rotate(Math.PI, e);
    var D = e.elements || e;
    return Line.create(
      this.anchor.reflectionIn([D[0], D[1], D[2] || 0]),
      this.direction
    );
  },
  setVectors: function(e, t) {
    if (e = Vector.create(e), t = Vector.create(t), e.elements.length == 2 && e.elements.push(0), t.elements.length == 2 && t.elements.push(0), e.elements.length > 3 || t.elements.length > 3)
      return null;
    var n = t.modulus();
    return n === 0 ? null : (this.anchor = e, this.direction = Vector.create([
      t.elements[0] / n,
      t.elements[1] / n,
      t.elements[2] / n
    ]), this);
  }
}, Line.create = function(e, t) {
  var n = new Line();
  return n.setVectors(e, t);
}, Line.X = Line.create(Vector.Zero(3), Vector.i), Line.Y = Line.create(Vector.Zero(3), Vector.j), Line.Z = Line.create(Vector.Zero(3), Vector.k), Plane.prototype = {
  eql: function(e) {
    return this.contains(e.anchor) && this.isParallelTo(e);
  },
  dup: function() {
    return Plane.create(this.anchor, this.normal);
  },
  translate: function(e) {
    var t = e.elements || e;
    return Plane.create(
      [
        this.anchor.elements[0] + t[0],
        this.anchor.elements[1] + t[1],
        this.anchor.elements[2] + (t[2] || 0)
      ],
      this.normal
    );
  },
  isParallelTo: function(e) {
    var t;
    return e.normal ? (t = this.normal.angleFrom(e.normal), Math.abs(t) <= Sylvester.precision || Math.abs(Math.PI - t) <= Sylvester.precision) : e.direction ? this.normal.isPerpendicularTo(e.direction) : null;
  },
  isPerpendicularTo: function(e) {
    var t = this.normal.angleFrom(e.normal);
    return Math.abs(Math.PI / 2 - t) <= Sylvester.precision;
  },
  distanceFrom: function(e) {
    if (this.intersects(e) || this.contains(e)) return 0;
    if (e.anchor) {
      var r = this.anchor.elements, t = e.anchor.elements, i = this.normal.elements;
      return Math.abs(
        (r[0] - t[0]) * i[0] + (r[1] - t[1]) * i[1] + (r[2] - t[2]) * i[2]
      );
    }
    var n = e.elements || e, r = this.anchor.elements, i = this.normal.elements;
    return Math.abs(
      (r[0] - n[0]) * i[0] + (r[1] - n[1]) * i[1] + (r[2] - (n[2] || 0)) * i[2]
    );
  },
  contains: function(e) {
    if (e.normal) return null;
    if (e.direction)
      return this.contains(e.anchor) && this.contains(e.anchor.add(e.direction));
    var t = e.elements || e, n = this.anchor.elements, r = this.normal.elements, i = Math.abs(
      r[0] * (n[0] - t[0]) + r[1] * (n[1] - t[1]) + r[2] * (n[2] - (t[2] || 0))
    );
    return i <= Sylvester.precision;
  },
  intersects: function(e) {
    return typeof e.direction > "u" && typeof e.normal > "u" ? null : !this.isParallelTo(e);
  },
  intersectionWith: function(e) {
    if (!this.intersects(e)) return null;
    if (e.direction) {
      var t = e.anchor.elements, n = e.direction.elements, r = this.anchor.elements, i = this.normal.elements, s = (i[0] * (r[0] - t[0]) + i[1] * (r[1] - t[1]) + i[2] * (r[2] - t[2])) / (i[0] * n[0] + i[1] * n[1] + i[2] * n[2]);
      return Vector.create([
        t[0] + n[0] * s,
        t[1] + n[1] * s,
        t[2] + n[2] * s
      ]);
    }
    if (e.normal) {
      for (var o = this.normal.cross(e.normal).toUnitVector(), i = this.normal.elements, t = this.anchor.elements, c = e.normal.elements, v = e.anchor.elements, R = Matrix.Zero(2, 2), E = 0; R.isSingular(); )
        E++, R = Matrix.create([
          [i[E % 3], i[(E + 1) % 3]],
          [c[E % 3], c[(E + 1) % 3]]
        ]);
      for (var h = R.inverse().elements, S = i[0] * t[0] + i[1] * t[1] + i[2] * t[2], C = c[0] * v[0] + c[1] * v[1] + c[2] * v[2], x = [h[0][0] * S + h[0][1] * C, h[1][0] * S + h[1][1] * C], D = [], J = 1; 3 >= J; J++)
        D.push(E == J ? 0 : x[(J + (5 - E) % 3) % 3]);
      return Line.create(D, o);
    }
  },
  pointClosestTo: function(e) {
    var t = e.elements || e, n = this.anchor.elements, r = this.normal.elements, i = (n[0] - t[0]) * r[0] + (n[1] - t[1]) * r[1] + (n[2] - (t[2] || 0)) * r[2];
    return Vector.create([
      t[0] + r[0] * i,
      t[1] + r[1] * i,
      (t[2] || 0) + r[2] * i
    ]);
  },
  rotate: function(e, t) {
    var n = Matrix.Rotation(e, t.direction).elements, r = t.pointClosestTo(this.anchor).elements, i = this.anchor.elements, s = this.normal.elements, o = r[0], c = r[1], v = r[2], R = i[0], E = i[1], h = i[2], S = R - o, C = E - c, x = h - v;
    return Plane.create(
      [
        o + n[0][0] * S + n[0][1] * C + n[0][2] * x,
        c + n[1][0] * S + n[1][1] * C + n[1][2] * x,
        v + n[2][0] * S + n[2][1] * C + n[2][2] * x
      ],
      [
        n[0][0] * s[0] + n[0][1] * s[1] + n[0][2] * s[2],
        n[1][0] * s[0] + n[1][1] * s[1] + n[1][2] * s[2],
        n[2][0] * s[0] + n[2][1] * s[1] + n[2][2] * s[2]
      ]
    );
  },
  reflectionIn: function(e) {
    if (e.normal) {
      var t = this.anchor.elements, n = this.normal.elements, r = t[0], i = t[1], s = t[2], o = n[0], c = n[1], v = n[2], R = this.anchor.reflectionIn(e).elements, E = r + o, h = i + c, S = s + v, C = e.pointClosestTo([E, h, S]).elements, x = [
        C[0] + (C[0] - E) - R[0],
        C[1] + (C[1] - h) - R[1],
        C[2] + (C[2] - S) - R[2]
      ];
      return Plane.create(R, x);
    }
    if (e.direction) return this.rotate(Math.PI, e);
    var D = e.elements || e;
    return Plane.create(
      this.anchor.reflectionIn([D[0], D[1], D[2] || 0]),
      this.normal
    );
  },
  setVectors: function(e, t, n) {
    if (e = Vector.create(e), e = e.to3D(), e === null || (t = Vector.create(t), t = t.to3D(), t === null)) return null;
    if (typeof n > "u") n = null;
    else if (n = Vector.create(n), n = n.to3D(), n === null)
      return null;
    var r, i, s = e.elements[0], o = e.elements[1], c = e.elements[2], v = t.elements[0], R = t.elements[1], E = t.elements[2];
    if (n !== null) {
      var h = n.elements[0], S = n.elements[1], C = n.elements[2];
      if (r = Vector.create([
        (R - o) * (C - c) - (E - c) * (S - o),
        (E - c) * (h - s) - (v - s) * (C - c),
        (v - s) * (S - o) - (R - o) * (h - s)
      ]), i = r.modulus(), i === 0)
        return null;
      r = Vector.create([
        r.elements[0] / i,
        r.elements[1] / i,
        r.elements[2] / i
      ]);
    } else {
      if (i = Math.sqrt(v * v + R * R + E * E), i === 0) return null;
      r = Vector.create([
        t.elements[0] / i,
        t.elements[1] / i,
        t.elements[2] / i
      ]);
    }
    return this.anchor = e, this.normal = r, this;
  }
}, Matrix.Translation = function(e) {
  var t;
  if (e.elements.length === 2)
    return t = Matrix.I(3), t.elements[2][0] = e.elements[0], t.elements[2][1] = e.elements[1], t;
  if (e.elements.length === 3)
    return t = Matrix.I(4), t.elements[0][3] = e.elements[0], t.elements[1][3] = e.elements[1], t.elements[2][3] = e.elements[2], t;
  throw "Invalid length for Translation";
}, Matrix.prototype.flatten = function() {
  var e = [];
  if (this.elements.length === 0) return [];
  for (var t = 0; t < this.elements[0].length; t++)
    for (var n = 0; n < this.elements.length; n++)
      e.push(this.elements[n][t]);
  return e;
}, Matrix.prototype.ensure4x4 = function() {
  var e;
  if (this.elements.length === 4 && this.elements[0].length === 4)
    return this;
  if (this.elements.length > 4 || this.elements[0].length > 4) return null;
  for (e = 0; e < this.elements.length; e++)
    for (var t = this.elements[e].length; 4 > t; t++)
      this.elements[e].push(e === t ? 1 : 0);
  for (e = this.elements.length; 4 > e; e++)
    e === 0 ? this.elements.push([1, 0, 0, 0]) : e === 1 ? this.elements.push([0, 1, 0, 0]) : e === 2 ? this.elements.push([0, 0, 1, 0]) : e === 3 && this.elements.push([0, 0, 0, 1]);
  return this;
}, Matrix.prototype.make3x3 = function() {
  return this.elements.length !== 4 || this.elements[0].length !== 4 ? null : Matrix.create([
    [this.elements[0][0], this.elements[0][1], this.elements[0][2]],
    [this.elements[1][0], this.elements[1][1], this.elements[1][2]],
    [this.elements[2][0], this.elements[2][1], this.elements[2][2]]
  ]);
}, Plane.create = function(e, t, n) {
  var r = new Plane();
  return r.setVectors(e, t, n);
}, Plane.XY = Plane.create(Vector.Zero(3), Vector.k), Plane.YZ = Plane.create(Vector.Zero(3), Vector.i), Plane.ZX = Plane.create(Vector.Zero(3), Vector.j), Plane.YX = Plane.XY, Plane.ZY = Plane.YZ, Plane.XZ = Plane.ZX;
var $V = Vector.create, $M = Matrix.create;
function inherit(e, t) {
  for (var n = Object.create(e.prototype), r = Object.keys(t), i = 0; i < r.length; i++)
    n[r[i]] = t[r[i]];
  return n;
}
function text(e) {
  return e.join(`
`);
}
function makePerspective(e, t, n, r) {
  var i = n * Math.tan(e * Math.PI / 360), s = -i, o = s * t, c = i * t;
  return makeFrustum(o, c, s, i, n, r);
}
function makeFrustum(e, t, n, r, i, s) {
  var o = 2 * i / (t - e), c = 2 * i / (r - n), v = (t + e) / (t - e), R = (r + n) / (r - n), E = -(s + i) / (s - i), h = -2 * s * i / (s - i);
  return $M([
    [o, 0, v, 0],
    [0, c, R, 0],
    [0, 0, E, h],
    [0, 0, -1, 0]
  ]);
}
var ImageTexture = function() {
  function e(t, n, r) {
    Texture.call(this, t, n, r);
  }
  return e.prototype = inherit(Texture, {
    fill: function(t, n) {
      var r = this.gl;
      r.bindTexture(r.TEXTURE_2D, this.texture), n ? r.texSubImage2D(
        r.TEXTURE_2D,
        0,
        0,
        0,
        this.size.w,
        this.size.h,
        this.format,
        r.UNSIGNED_BYTE,
        t
      ) : r.texImage2D(
        r.TEXTURE_2D,
        0,
        this.format,
        this.format,
        r.UNSIGNED_BYTE,
        t
      );
    }
  }), e;
}(), WebGLCanvas = function() {
  function e(h, S, C) {
    this.canvas = h, this.size = S;
    var x = !0;
    for (var D in E) S.w === E[D] && (x = !1);
    this.canvas.width = x ? S.w : S.w === 192 ? S.w - 12 : S.w - 8, this.canvas.height = S.h, this.onInitWebGL(), this.onInitShaders(), n.call(this), C && t.call(this), this.onInitTextures(), c.call(this);
  }
  function t() {
    var h = this.gl;
    this.framebuffer = h.createFramebuffer(), h.bindFramebuffer(h.FRAMEBUFFER, this.framebuffer), this.framebufferTexture = new Texture(this.gl, this.size, h.RGBA);
    var S = h.createRenderbuffer();
    h.bindRenderbuffer(h.RENDERBUFFER, S), h.renderbufferStorage(
      h.RENDERBUFFER,
      h.DEPTH_COMPONENT16,
      this.size.w,
      this.size.h
    ), h.framebufferTexture2D(
      h.FRAMEBUFFER,
      h.COLOR_ATTACHMENT0,
      h.TEXTURE_2D,
      this.framebufferTexture.texture,
      0
    ), h.framebufferRenderbuffer(
      h.FRAMEBUFFER,
      h.DEPTH_ATTACHMENT,
      h.RENDERBUFFER,
      S
    );
  }
  function n() {
    var h = [1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0], S = this.gl;
    this.quadVPBuffer = S.createBuffer(), S.bindBuffer(S.ARRAY_BUFFER, this.quadVPBuffer), S.bufferData(S.ARRAY_BUFFER, new Float32Array(h), S.STATIC_DRAW), this.quadVPBuffer.itemSize = 3, this.quadVPBuffer.numItems = 4;
    var C = 1, x = 1;
    this.quadVTCBuffer = S.createBuffer(), S.bindBuffer(S.ARRAY_BUFFER, this.quadVTCBuffer), h = [C, 0, 0, 0, C, x, 0, x], S.bufferData(S.ARRAY_BUFFER, new Float32Array(h), S.STATIC_DRAW);
  }
  function r() {
    this.mvMatrix = Matrix.I(4);
  }
  function i(h) {
    this.mvMatrix = this.mvMatrix.x(h);
  }
  function s(h) {
    i.call(this, Matrix.Translation($V([h[0], h[1], h[2]])).ensure4x4());
  }
  function o() {
    this.program.setMatrixUniform(
      "uPMatrix",
      new Float32Array(this.perspectiveMatrix.flatten())
    ), this.program.setMatrixUniform(
      "uMVMatrix",
      new Float32Array(this.mvMatrix.flatten())
    );
  }
  function c() {
    var h = this.gl;
    this.perspectiveMatrix = makePerspective(45, 1, 0.1, 100), r.call(this), s.call(this, [0, 0, -2.415]), h.bindBuffer(h.ARRAY_BUFFER, this.quadVPBuffer), h.vertexAttribPointer(
      this.vertexPositionAttribute,
      3,
      h.FLOAT,
      !1,
      0,
      0
    ), h.bindBuffer(h.ARRAY_BUFFER, this.quadVTCBuffer), h.vertexAttribPointer(this.textureCoordAttribute, 2, h.FLOAT, !1, 0, 0), this.onInitSceneTextures(), o.call(this), this.framebuffer && h.bindFramebuffer(h.FRAMEBUFFER, this.framebuffer);
  }
  var v = Script.createFromSource(
    "x-shader/x-vertex",
    text([
      "attribute vec3 aVertexPosition;",
      "attribute vec2 aTextureCoord;",
      "uniform mat4 uMVMatrix;",
      "uniform mat4 uPMatrix;",
      "varying highp vec2 vTextureCoord;",
      "void main(void) {",
      "  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
      "  vTextureCoord = aTextureCoord;",
      "}"
    ])
  ), R = Script.createFromSource(
    "x-shader/x-fragment",
    text([
      "precision highp float;",
      "varying highp vec2 vTextureCoord;",
      "uniform sampler2D texture;",
      "void main(void) {",
      "  gl_FragColor = texture2D(texture, vTextureCoord);",
      "}"
    ])
  ), E = [192, 368, 608, 1088, 1472, 1952, 3008];
  return e.prototype = {
    toString: function() {
      return "WebGLCanvas Size: " + this.size;
    },
    checkLastError: function(h) {
      var S = this.gl.getError();
      if (S !== this.gl.NO_ERROR) {
        var C = this.glNames[S];
        C = typeof C < "u" ? C + "(" + S + ")" : "Unknown WebGL ENUM (0x" + value.toString(16) + ")", h ? console.log("WebGL Error: %s, %s", h, C) : console.log("WebGL Error: %s", C), debug.trace();
      }
    },
    onInitWebGL: function() {
      try {
        this.gl = this.canvas.getContext("experimental-webgl");
      } catch (S) {
        console.log("inInitWebGL error = " + S);
      }
      if (this.gl || debug.error(
        "Unable to initialize WebGL. Your browser may not support it."
      ), !this.glNames) {
        this.glNames = {};
        for (var h in this.gl)
          typeof this.gl[h] == "number" && (this.glNames[this.gl[h]] = h);
      }
    },
    onInitShaders: function() {
      this.program = new Program(this.gl), this.program.attach(new Shader(this.gl, v)), this.program.attach(new Shader(this.gl, R)), this.program.link(), this.program.use(), this.vertexPositionAttribute = this.program.getAttributeLocation("aVertexPosition"), this.gl.enableVertexAttribArray(this.vertexPositionAttribute), this.textureCoordAttribute = this.program.getAttributeLocation("aTextureCoord"), this.gl.enableVertexAttribArray(this.textureCoordAttribute);
    },
    onInitTextures: function() {
      var h = this.gl;
      h.viewport(0, 0, this.canvas.width, this.canvas.height), this.texture = new Texture(h, this.size, h.RGBA);
    },
    onInitSceneTextures: function() {
      this.texture.bind(0, this.program, "texture");
    },
    drawScene: function() {
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    },
    updateVertexArray: function(h) {
      this.zoomScene(h);
    },
    readPixels: function(h) {
      var S = this.gl;
      S.readPixels(
        0,
        0,
        this.size.w,
        this.size.h,
        S.RGBA,
        S.UNSIGNED_BYTE,
        h
      );
    },
    zoomScene: function(h) {
      r.call(this), s.call(this, [h[0], h[1], h[2]]), o.call(this), this.drawScene();
    },
    setViewport: function(h, S) {
      console.log("toWidth=" + h + ",toHeight=" + S);
      var C, x;
      this.gl.drawingBufferWidth < h || this.gl.drawingBufferHeight < S ? (C = this.gl.drawingBufferWidth, x = this.gl.drawingBufferHeight, this.canvas.width = C, this.canvas.height = x) : (C = h, x = S), this.gl.viewport(0, 0, C, x);
    },
    clearCanvas: function() {
      this.gl.clearColor(0, 0, 0, 1), this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT);
    }
  }, e;
}(), ImageWebGLCanvas = function() {
  function e(t, n) {
    WebGLCanvas.call(this, t, n);
  }
  return e.prototype = inherit(WebGLCanvas, {
    drawCanvas: function(t) {
      this.texture.fill(t), this.drawScene();
    },
    onInitTextures: function() {
      var t = this.gl;
      this.setViewport(this.canvas.width, this.canvas.height), this.texture = new ImageTexture(t, this.size, t.RGBA);
    },
    initCanvas: function() {
      this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT);
    }
  }), e;
}(), YUVWebGLCanvas = function() {
  function e(r, i) {
    WebGLCanvas.call(this, r, i);
  }
  var t = Script.createFromSource(
    "x-shader/x-vertex",
    text([
      "attribute vec3 aVertexPosition;",
      "attribute vec2 aTextureCoord;",
      "uniform mat4 uMVMatrix;",
      "uniform mat4 uPMatrix;",
      "varying highp vec2 vTextureCoord;",
      "void main(void) {",
      "  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
      "  vTextureCoord = aTextureCoord;",
      "}"
    ])
  ), n = Script.createFromSource(
    "x-shader/x-fragment",
    text([
      "precision highp float;",
      "varying highp vec2 vTextureCoord;",
      "uniform sampler2D YTexture;",
      "uniform sampler2D UTexture;",
      "uniform sampler2D VTexture;",
      "const mat4 YUV2RGB = mat4",
      "(",
      " 1.16438, 0.00000, 1.59603, -.87079,",
      " 1.16438, -.39176, -.81297, .52959,",
      " 1.16438, 2.01723, 0, -1.08139,",
      " 0, 0, 0, 1",
      ");",
      "void main(void) {",
      " gl_FragColor = vec4( texture2D(YTexture,  vTextureCoord).x, texture2D(UTexture, vTextureCoord).x, texture2D(VTexture, vTextureCoord).x, 1) * YUV2RGB;",
      "}"
    ])
  );
  return e.prototype = inherit(WebGLCanvas, {
    onInitShaders: function() {
      this.program = new Program(this.gl), this.program.attach(new Shader(this.gl, t)), this.program.attach(new Shader(this.gl, n)), this.program.link(), this.program.use(), this.vertexPositionAttribute = this.program.getAttributeLocation("aVertexPosition"), this.gl.enableVertexAttribArray(this.vertexPositionAttribute), this.textureCoordAttribute = this.program.getAttributeLocation("aTextureCoord"), this.gl.enableVertexAttribArray(this.textureCoordAttribute);
    },
    onInitTextures: function() {
      this.setViewport(this.size.w, this.size.h), this.YTexture = new Texture(this.gl, this.size), this.UTexture = new Texture(this.gl, this.size.getHalfSize()), this.VTexture = new Texture(this.gl, this.size.getHalfSize());
    },
    onInitSceneTextures: function() {
      this.YTexture.bind(0, this.program, "YTexture"), this.UTexture.bind(1, this.program, "UTexture"), this.VTexture.bind(2, this.program, "VTexture");
    },
    fillYUVTextures: function(r, i, s) {
      this.YTexture.fill(r), this.UTexture.fill(i), this.VTexture.fill(s);
    },
    drawCanvas: function(r) {
      var i = this.size.w * this.size.h, s = i >> 2;
      this.YTexture.fill(r.subarray(0, i)), this.UTexture.fill(r.subarray(i, i + s)), this.VTexture.fill(r.subarray(i + s, i + 2 * s)), this.drawScene();
    },
    updateVertexArray: function(r) {
      this.zoomScene(r);
    },
    toString: function() {
      return "YUVCanvas Size: " + this.size;
    },
    initCanvas: function() {
      this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT);
    }
  }), e;
}();
function BufferNode(e) {
  this.buffer = e, this.previous = null, this.next = null;
}
function StreamDrawer(e, t, n) {
  function r() {
    function b() {
      this.first = null, this.size = 0;
    }
    var y = 15;
    return b.prototype = {
      enqueue: function(a, A, f, g, I, Z) {
        this.size >= y && this.clear();
        var oe = new xe(a, A, f, g, I, Z);
        if (this.first === null) this.first = oe;
        else {
          for (var q = this.first; q.next !== null; ) q = q.next;
          q.next = oe;
        }
        return this.size += 1, oe;
      },
      dequeue: function() {
        var a = null;
        return this.first !== null && (a = this.first, this.first = this.first.next, this.size -= 1), a;
      },
      clear: function() {
        console.log("BufferQueue clear!");
        for (var a = null; this.first !== null; )
          a = this.first, this.first = this.first.next, this.size -= 1, a.buffer = null, a = null;
        this.size = 0, this.first = null;
      }
    }, new b();
  }
  function i() {
    x = "rgb2d", J = null, re = new r(), D = T, p = !1;
  }
  function s(b, y) {
    for (var a = atob(b.substring(22)), A = new Uint8Array(a.length), f = 0, g = a.length; g > f; ++f)
      A[f] = a.charCodeAt(f);
    var I = new Blob([A.buffer], {
      type: "image/png"
    });
    Ee(I, y + ".png");
  }
  function o() {
    window.requestAnimationFrame(N);
  }
  var c = t, v = !0, R = e, E = n, h = null, S = null, C = null, x = null, D = null, J = null, K = null, Q = null, ne = null, ce = 0, Se = null, se = 0, me = 0, Re = 0, he = new ImagePool(), _ = null, d = "", w = !1, p = !1, T = 16.7, M = 20, P = 1e3, de = 0, xe = /* @__PURE__ */ function() {
    function b(y, a, A, f, g, I) {
      BufferNode.call(this, y), this.width = a, this.height = A, this.codecType = f, this.frameType = g, this.timeStamp = I;
    }
    return b;
  }(), re = null, te = function(b, y) {
    var a = new Size(b, y);
    switch (x) {
      case "RGB2d":
        h = new RGB2dCanvas(E, a);
        break;
      case "YUVWebGL":
        h = new YUVWebGLCanvas(E, a);
        break;
      case "ImageWebGL":
        h = new ImageWebGLCanvas(E, a);
        break;
      case "WebGL":
        h = new WebGLCanvas(E, a);
    }
  }, Ee = function(b) {
    var y = b.document, a = function() {
      return b.URL || b.webkitURL || b;
    }, A = y.createElementNS("http://www.w3.org/1999/xhtml", "a"), f = "download" in A, g = function(B) {
      var U = new MouseEvent("click");
      B.dispatchEvent(U);
    }, I = /constructor/i.test(b.HTMLElement), Z = /CriOS\/[\d]+/.test(navigator.userAgent), oe = function(B) {
      (b.setImmediate || b.setTimeout)(function() {
        throw B;
      }, 0);
    }, q = "application/octet-stream", ee = 4e4, ge = function(B) {
      var U = function() {
        typeof B == "string" ? a().revokeObjectURL(B) : B.remove();
      };
      setTimeout(U, ee);
    }, H = function(B, U, G) {
      U = [].concat(U);
      for (var O = U.length; O--; ) {
        var m = B["on" + U[O]];
        if (typeof m == "function")
          try {
            m.call(B, G || B);
          } catch (F) {
            oe(F);
          }
      }
    }, V = function(B) {
      return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
        B.type
      ) ? new Blob(["\uFEFF", B], {
        type: B.type
      }) : B;
    }, L = function(B, U, G) {
      G || (B = V(B));
      var O, m = this, F = B.type, W = F === q, Y = function() {
        H(m, "writestart progress write writeend".split(" "));
      }, ae = function() {
        if ((Z || W && I) && b.FileReader) {
          var le = new FileReader();
          return le.onloadend = function() {
            var Ie = Z ? le.result : le.result.replace(
              /^data:[^;]*;/,
              "data:attachment/file;"
            ), Ue = b.open(Ie, "_blank");
            Ue || (b.location.href = Ie), Ie = void 0, m.readyState = m.DONE, Y();
          }, le.readAsDataURL(B), void (m.readyState = m.INIT);
        }
        if (O || (O = a().createObjectURL(B)), W) b.location.href = O;
        else {
          var Ae = b.open(O, "_blank");
          Ae || (b.location.href = O);
        }
        m.readyState = m.DONE, Y(), ge(O);
      };
      return m.readyState = m.INIT, f ? (O = a().createObjectURL(B), void setTimeout(function() {
        A.href = O, A.download = U, g(A), Y(), ge(O), m.readyState = m.DONE;
      })) : void ae();
    }, ie = L.prototype, ue = function(B, U, G) {
      return new L(B, U || B.name || "download", G);
    };
    return typeof navigator < "u" && navigator.msSaveOrOpenBlob ? function(B, U, G) {
      return U = U || B.name || "download", G || (B = V(B)), navigator.msSaveOrOpenBlob(B, U);
    } : (ie.readyState = ie.INIT = 0, ie.WRITING = 1, ie.DONE = 2, ie.error = ie.onwritestart = ie.onprogress = ie.onwrite = ie.onabort = ie.onerror = ie.onwriteend = null, ue);
  }(window), we = function() {
    if (_ = re.dequeue(), _ !== null && _.buffer !== null && (_.codecType === "mjpeg" || _.buffer.length > 0)) {
      if ((typeof S > "u" || typeof C > "u" || S !== _.width || C !== _.height || J !== _.codecType) && (x = _.codecType === "h264" || _.codecType === "h265" ? "YUVWebGL" : "ImageWebGL", te(_.width, _.height), S == "undefined" || S == null || S == 0 ? Q("PlayStart") : typeof K < "u" && K !== null && K({
        width: _.width,
        height: _.height
      }), S = _.width, C = _.height, J = _.codecType), Se = _.timeStamp, c.timeStamp(Se), typeof h < "u")
        return h.drawCanvas(_.buffer), E.updatedCanvas = !0, ne(Se), w && (w = !1, s(E.toDataURL(), d)), _.codecType === "mjpeg" ? he.free(_.buffer) : (delete _.buffer, _.buffer = null), _.previous = null, _.next = null, _ = null, !0;
      console.log("drawer is undefined in StreamDrawer!");
    }
    return !1;
  }, N = function(b) {
    var y = 200;
    if (p === !0) {
      if (ce === 0 || y > b - ce)
        return ce === 0 && (ce = b), void (re !== null && window.requestAnimationFrame(N));
      Re += b - se, Re > me && (we() && (me += D)), Re > P && (me = 0, Re = 0), se = b, window.requestAnimationFrame(N);
    }
  };
  return i.prototype = {
    getDrawingStrategy: function() {
      return x;
    },
    reassignCanvas: function() {
      var b = $('canvas[kind-channel-id="' + R + '"]')[0];
      E !== b && (S = 0, C = 0);
    },
    drawMJPEG: function(b, y, a, A, f, g) {
      var I = he.alloc();
      I.width = y, I.height = a, I.codecType = A, I.frameType = f, I.time = g, I.onload = function() {
        re !== null && re.enqueue(
          this,
          this.width,
          this.height,
          this.codecType,
          this.frameType,
          this.time
        );
      }, I.setAttribute(
        "src",
        "data:image/jpeg;base64," + base64ArrayBuffer(b)
      );
    },
    draw: function(b, y, a, A, f, g) {
      return void (re !== null && re.enqueue(b, y, a, A, f, g));
    },
    capture: function(b) {
      d = b, w = !0;
    },
    digitalZoom: function(b) {
      typeof h < "u" && h !== null && h.updateVertexArray(b);
    },
    setResizeCallback: function(b) {
      K = b;
    },
    getCodecType: function() {
      return J;
    },
    getFrameTimestamp: function() {
      return Se;
    },
    initStartTime: function() {
      ce === 0 && v !== !1 && o();
    },
    startRendering: function() {
      re !== null && re.clear(), ce === 0 && v !== !1 && (p = !0, window.requestAnimationFrame(N));
    },
    stopRendering: function() {
      p = !1, ce = 0;
    },
    setFPS: function(b) {
      typeof b > "u" || b === 0 ? D = T : (D = P / b, 1 * b), de = D;
    },
    setFrameInterval: function(b) {
      D = b * de;
    },
    getCanvas: function() {
      return E;
    },
    renewCanvas: function() {
      te(S, C), typeof h < "u" && h !== null && h.initCanvas();
    },
    setBeginDrawCallback: function(b) {
      Q = b;
    },
    setupdateCanvasCallback: function(b) {
      ne = b;
    },
    terminate: function() {
      ce = 0, Se = null, re !== null && (re.clear(), re = null), h && h.clearCanvas(), h = null;
    }
  }, new i();
}
function Size(e, t) {
  function n(r, i) {
    n.prototype.w = r, n.prototype.h = i;
  }
  return n.prototype = {
    toString: function() {
      return "(" + n.prototype.w + ", " + n.prototype.h + ")";
    },
    getHalfSize: function() {
      return new Size(n.prototype.w >>> 1, n.prototype.h >>> 1);
    },
    length: function() {
      return n.prototype.w * n.prototype.h;
    }
  }, new n(e, t);
}
var ImagePool = function() {
  this.metrics = {}, this._clearMetrics(), this._objpool = [];
};
ImagePool.prototype.alloc = function() {
  var e = null;
  return this._objpool.length === 0 ? (e = new Image(), this.metrics.totalalloc++) : (e = this._objpool.pop(), this.metrics.totalfree--), e;
}, ImagePool.prototype.free = function(e) {
  e.length > 0 && (console.log("It is not zero length = " + e.length), this._objpool.push(e), this.metrics.totalfree++);
}, ImagePool.prototype.collect = function() {
  this._objpool = [];
  var e = this.metrics.totalalloc - this.metrics.totalfree;
  this._clearMetrics(e);
}, ImagePool.prototype._clearMetrics = function(e) {
  this.metrics.totalalloc = e || 0, this.metrics.totalfree = 0;
};
var WorkerManager = function() {
  function e() {
    console.log("WorkerManager.constructor"), console.log(this), C = this;
  }
  function t() {
    return b;
  }
  function n() {
    Se !== null && Se(!1);
  }
  function r(k) {
    var l = k.data;
    switch (l.type) {
      case "WorkerReady":
        F && F();
        break;
      case "canvasRender":
        c(l.data), m === 0 && (m = performance.now());
        break;
      case "initSegment":
        b = l.data, v();
        break;
      case "mediaSample":
        a.samples === null && (a.samples = new Array(L)), l.data.frame_time_stamp === null && (l.data.frameDuration = Math.round(O / M)), V !== 1 && (l.data.frameDuration = O / Math.abs(V)), a.samples[A++] = l.data, U += l.data.frameDuration, G += l.data.frameDuration, L = a.samples[0].frameDuration > 500 && a.samples[0].frameDuration <= 3e3 ? 1 : V === 1 ? H : Math.abs(V), ie !== L && o(V !== 1), ie = L;
        break;
      case "videoRender":
        var Me = new Uint8Array(l.data.length + f);
        if (f !== 0 && Me.set(g), Me.set(l.data, f), g = Me, f = g.length, A % L === 0 && A !== 0) {
          if (a.samples[0].frameDuration !== null ? (a.baseMediaDecodeTime = I === 1 ? 0 : B, B = U) : a.baseMediaDecodeTime = Math.round(O / M) * L * (I - 1), p == "chrome" && V === 1)
            for (var Fe = a.samples.length, Pe = G / L, ye = 0; Fe > ye; ye++)
              a.samples[ye].frameDuration = Pe;
          G = 0, y = mp4Remux.mediaSegment(I, a, g, a.baseMediaDecodeTime), I++, A = 0, g = null, f = 0, N !== null ? N.setMediaSegment(y) : ue === !1 && (console.log("workerManager::videoMS error!! recreate videoMS"), v()), x !== null && x.stopRendering();
        }
        break;
      case "mediasegmentData":
        N.setMediaSegment(l.data), ue === !1 && (console.log("videoMS error!! recreate videoMS"), v());
        break;
      case "videoInfo":
        T = l.data;
        break;
      case "time":
        break;
      case "videoTimeStamp":
        q = l.data, N !== null && q !== null && N.setvideoTimeStamp(q);
        break;
      case "firstFrame":
        x.startRendering(), typeof x.setFPS < "u" && x.setFPS(M);
        break;
      case "drop":
        break;
      case "codecInfo":
        Z = l.data, N !== null && N.setCodecInfo(Z);
        break;
      case "stepPlay":
        switch (l.data) {
          case "needBuffering":
            ne("request", Ee);
            break;
          case "BufferFull":
            ne("complete");
        }
        break;
      case "setVideoTagMode":
        e.prototype.setLiveMode(l.data);
        break;
      case "playbackFlag":
        l.data, N !== null && N.setPlaybackFlag(l.data);
        break;
      case "error":
        se !== null && se(l.data);
        break;
      case "MSEResolutionChanged":
        _(l.data);
        break;
      case "DecodeStart":
        var ve = l.data.width - 0, ke = l.data.height - 0;
        te.setAttribute("width", ve), te.setAttribute("height", ke), me(l.data);
        break;
      case "ivsDraw":
        w(l.data);
        break;
      default:
        console.log("workerManager::videoWorker unknown data = " + l.data);
    }
  }
  function i(k) {
    var l = k.data;
    switch (l.type) {
      case "rtpData":
        Q(l.data);
    }
  }
  function s(k) {
    var l = {
      type: "getRtpData",
      data: k
    };
    S.postMessage(l);
  }
  function o(k) {
    N !== null && (N.close(), N = null), L = k === !1 ? H : Math.abs(V), a.samples = new Array(L), ue = !1, I = 1, y = null, A = 0, g = null, f = 0;
  }
  function c(k) {
    k !== null && x !== null && (T.codecType === "mjpeg" ? x.drawMJPEG(
      k,
      T.width,
      T.height,
      T.codecType,
      T.frameType,
      T.timeStamp
    ) : x.draw(k, T.width, T.height, T.codecType, T.frameType, T.timeStamp));
  }
  function v() {
    ue = !0, N === null ? (N = VideoMediaSource(C), N.setCodecInfo(Z), N.setInitSegmentFunc(t), N.setVideoSizeCallback(n), N.setBeginDrawCallback(K), N.init(oe), N.setSpeedPlay(V)) : (N.getVideoElement(), N.setInitSegment()), N.setAudioStartCallback(R);
  }
  function R(k, l) {
  }
  var E = null, h = null, S = null, C = null, x = null, D = null, J = null, K = null, Q = null, ne = null, ce = null, Se = null, se = null, me = null, Re = null, he = null, _ = null, d = null, w = null, p = BrowserDetect(), T = null, M = 0, P = null, de = !1, xe = "canvas", re = !0, te = null, Ee = null, we = null, N = null, b = null, y = null, a = {
    id: 1,
    samples: null,
    baseMediaDecodeTime: 0
  }, A = 0, f = 0, g = null, I = 1, Z = "", oe = null, q = null, ee = 2, ge = 4, H = p !== "chrome" ? ge : ee, V = 1, L = H, ie = L, ue = !1, B = 0, U = 0, G = 0, O = 1e3, m = 0, F = null, W = 0, Y = !1, ae = null, le = null, Ae = null, Ie = {
    5: "MJPEG",
    8: "H264",
    12: "H265"
  }, Ue = {
    1: 4e3,
    2: 8e3,
    3: 11025,
    4: 16e3,
    5: 2e4,
    6: 22050,
    7: 32e3,
    8: 44100,
    9: 48e3,
    10: 96e3,
    11: 128e3,
    12: 192e3,
    13: 64e3
  };
  return e.prototype = {
    init: function(k, l) {
      W = 0, te = k, oe = l, E = new Worker("/local/dahua/module/videoWorker.js"), E.onmessage = r, x = new StreamDrawer(W, this, te), x.setResizeCallback(J), document.getElementById("count-fps"), document.getElementById("span-fps");
    },
    sendSdpInfo: function(k, l, Me) {
      var Fe = {
        type: "sdpInfo",
        data: {
          sdpInfo: k,
          aacCodecInfo: l,
          decodeMode: xe,
          govLength: P,
          checkDelay: re
        }
      };
      if (de = Me, E.postMessage(Fe), de)
        try {
          window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext, S = new Worker("./media/ump/Workers/audioTalkWorker.js"), S.onmessage = i, D === null && (D = new Talk(), D.init(), D.setSendAudioTalkBufferCallback(s));
          var Pe = D.initAudioOut();
          S.postMessage(Fe), Fe = {
            type: "sampleRate",
            data: Pe
          }, S.postMessage(Fe);
        } catch (ye) {
          return de = !1, void debug.error(
            "Web Audio API is not supported in this web browser! : " + ye
          );
        }
      ue = !1;
    },
    parseRTPData: function(k, l) {
      function Me() {
        for (var be = l[22] + 24, u = 24; be > u; )
          if (ve == l[u]) {
            if (u + 4 > be) return console.log("i: " + u), -1;
            X.width = l[u + 2] << 3, X.height = l[u + 3] << 3, u += 4;
          } else if (ke == l[u]) {
            if (u + 4 > l.length) return console.log("i: " + u), -1;
            X.I_frame_interval = l[u + 1], X.encode_type = l[u + 2], X.frame_rate = l[u + 3], u += 4;
          } else if (z == l[u])
            X.width = (l[u + 5] << 8) + l[u + 4], X.height = (l[u + 7] << 8) + l[u + 6], u += 8;
          else if (fe == l[u]) u += 4;
          else if (pe == l[u]) u += 8;
          else if (Ce == l[u]) {
            if (u + 4 > be) return console.log("i: " + u), -1;
            var De = (l[u + 2] << 8) + l[u + 3];
            u += De;
          } else if (Ze == l[u])
            X.h264_svc_flag = !0, X.svc = l[u + 2], u += 4;
          else if (Ve == l[u]) u += 8;
          else if (ze == l[u]) u += 8;
          else if ($e == l[u]) {
            var Ye = l[u + 1], rt = l[u + 2];
            u += 8, u += Ye * rt * 16;
          } else if (Qe == l[u]) u += 8;
          else if (et == l[u]) u += 8;
          else if (Oe == l[u]) u += 8;
          else if (Ge == l[u]) u += 8;
          else if (Xe == l[u]) u += 8;
          else if (Ne <= l[u] && l[u] < qe)
            X.timeStampmsw = (l[u + 3] << 8) + l[u + 2], u += 4;
          else if (qe <= l[u] && l[u] < nt) u += l[u + 1];
          else if (Te == l[u]) u += 4;
          else if (Le == l[u]) u += 4;
          else if (Be == l[u]) u += 4;
          else if (_e == l[u]) u += 8;
          else if (Je == l[u]) {
            var Ye = l[u + 1];
            u += 8, u += 16 * Ye;
          } else if (Ke == l[u]) u += 4;
          else {
            if (tt != l[u])
              return console.log("parseVideoInfo error ext_type:0x" + l[u]), console.log("i: " + u), -1;
            var be = (l[u + 5] << 8) + l[u + 4];
            u += 8, u += be;
          }
      }
      function Fe() {
        X.ChannelCount = 0;
        for (var be = l[22] + 24, u = 24; be > u; )
          if (ve == l[u]) u += 4;
          else if (ke == l[u]) u += 4;
          else if (z == l[u]) u += 8;
          else if (fe == l[u]) u += 4;
          else if (He == l[u]) u += l[u + 1];
          else if (pe == l[u]) u += 8;
          else if (Ce == l[u]) {
            var De = l[u + 2] << 8 + l[u + 3];
            u += De;
          } else if (je == l[u])
            X.ChannelCount = l[u + 1], X.channel = l[u + 2], u += 4;
          else if (Xe == l[u]) u += 8;
          else {
            if (Ne != l[u])
              return console.log("parseAudioInfo error ext_type:0x" + l[u]), console.log("i: " + u), -1;
            X.timeStampmsw = (l[u + 3] << 8) + l[u + 2], u += 4;
          }
        X.ChannelCount == 0 && (X.ChannelCount = 1, X.channel = 0);
        for (var be = l[22] + 24, u = 24; be > u; )
          if (l[u] == ve) u += 4;
          else if (l[u] == ke) u += 4;
          else if (l[u] == z) u += 8;
          else if (l[u] == fe)
            X.audio_type = l[u + 2], X.samplingRate = Ue[l[u + 3]], u += 4;
          else if (l[u] == He) u += l[u + 1];
          else if (l[u] == pe) u += 8;
          else if (l[u] == Ce) {
            var De = l[u + 2] << 8 + l[u + 3];
            u += De;
          } else if (l[u] == je) u += 4;
          else if (l[u] == Xe) u += 8;
          else {
            if (Ne != l[u])
              return console.log("parseAudioInfo error ext_type:0x" + l[u]), console.log("i: " + u), -1;
            u += 4;
          }
      }
      function Pe() {
        for (var be = l[22] + 24, u = 24; be > u; )
          if (Ne <= l[u] && l[u] < qe)
            X.timeStampmsw = (l[u + 3] << 8) + l[u + 2], u += 4;
          else if (Ce == l[u]) {
            if (u + 4 > be) return console.log("i: " + u), -1;
            console.log("智能扩展");
            var De = (l[u + 2] << 8) + l[u + 3];
            u += De;
          } else u++;
      }
      var ye = l[4], ve = 128, ke = 129, z = 130, fe = 131, Ce = 132, Te = 133, pe = 136, Le = 137, Ve = 138, Be = 139, He = 140, _e = 144, ze = 145, Oe = 146, Ge = 147, Ze = 148, Xe = 149, je = 150, Je = 151, Ke = 152, $e = 153, Qe = 154, et = 155, tt = 156, Ne = 160, qe = 176, nt = 255, We = {
        type: "MediaData",
        data: {
          rtspInterleave: k,
          payload: l
        },
        info: null
      }, X = {};
      if (ye == 253 || ye == 254 || ye == 252 || ye == 251) {
        if (Me(), ae != null) {
          if (ae != X.encode_type)
            return ae = X.encode_type, void he(Ie[X.encode_type]);
        } else ae = X.encode_type;
        switch (X.encode_type + "") {
          case "5":
          case "8":
          case "12":
            E && (We.info = X, E.postMessage(We));
            break;
          default:
            console.log("encode_type: " + encode_type);
        }
      } else if (ye == 240) {
        if (Fe(), Ae != null) {
          if (Ae != X.audio_type)
            return Ae = X.audio_type, void d("audioType");
        } else Ae = X.audio_type;
        if (le != null) {
          if (le != X.samplingRate)
            return le = X.samplingRate, void d("samplingRate");
        } else le = X.samplingRate;
        switch (X.audio_type + "") {
        }
      } else
        ye == 241 ? (Pe(), E && (We.info = X, E.postMessage(We))) : console.log("mediaType:   " + ye);
    },
    setCallback: function(k, l) {
      switch (k) {
        case "timeStamp":
          break;
        case "ResolutionChanged":
          J = l, x !== null && x.setResizeCallback(J);
          break;
        case "audioTalk":
          Q = l;
          break;
        case "stepRequest":
          ne = l;
          break;
        case "metaEvent":
          break;
        case "videoMode":
          ce = l;
          break;
        case "loadingBar":
          Se = l;
          break;
        case "Error":
          se = l;
          break;
        case "PlayStart":
          K = l, x !== null && x.setBeginDrawCallback(K);
          break;
        case "DecodeStart":
          me = l;
          break;
        case "UpdateCanvas":
          Re = l, x !== null && x.setupdateCanvasCallback(Re);
          break;
        case "FrameTypeChange":
          he = l;
          break;
        case "MSEResolutionChanged":
          _ = l;
          break;
        case "audioChange":
          d = l;
          break;
        case "ivs":
          w = l;
          break;
        case "WorkerReady":
          F = l;
          break;
        default:
          console.log(k), console.log("workerManager::setCallback() : type is unknown");
      }
    },
    capture: function(k) {
      xe === "canvas" ? x.capture(k) : N.capture(k);
    },
    setDeviceInfo: function(k) {
      we = k.mode;
    },
    setFPS: function(k) {
      var l = 30;
      M = k === 0 ? l : k, o(V !== 1);
    },
    setGovLength: function(k) {
      P = k;
    },
    setLiveMode: function(k) {
      ce !== null && ce(k), xe = k === null ? "canvas" : k, xe === "video" ? x !== null && x.renewCanvas() : xe === "canvas" && o(!1);
    },
    controlAudio: function(k, l) {
      switch (console.log(k + " " + l), k) {
      }
    },
    controlAudioTalk: function(k, l) {
      if (D !== null)
        switch (k) {
          case "onOff":
            l === "on" || D.stopAudioOut();
            break;
          case "volumn":
            D.controlVolumnOut(l);
        }
    },
    reassignCanvas: function() {
      x !== null && x.reassignCanvas();
    },
    digitalZoom: function(k) {
      x !== null && x.digitalZoom(k);
    },
    playbackSpeed: function(k) {
      V = k, x.setFrameInterval(V);
    },
    timeStamp: function() {
    },
    initVideo: function(k) {
      o(k);
    },
    setFpsFrame: function(k) {
      m = 0;
    },
    setCheckDelay: function(k) {
      re = k;
    },
    initStartTime: function() {
      var k = {
        type: "initStartTime"
      };
      E.postMessage(k), x.stopRendering(), x.startRendering();
    },
    terminate: function() {
      we !== "backup" && (E && (E.terminate(), E = null)), S && S.terminate(), D && (D.terminate(), D = null), x && x.terminate(), N && N.terminate(), F && (F = null), x = null;
    }
  }, new e();
}, commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var md5$1 = { exports: {} };
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function(module) {
  (function() {
    var ERROR = "input is invalid type", WINDOW = typeof window == "object", root = WINDOW ? window : {};
    root.JS_MD5_NO_WINDOW && (WINDOW = !1);
    var WEB_WORKER = !WINDOW && typeof self == "object", NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
    NODE_JS ? root = commonjsGlobal : WEB_WORKER && (root = self);
    var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && !0 && module.exports, ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", HEX_CHARS = "0123456789abcdef".split(""), EXTRA = [128, 32768, 8388608, -2147483648], SHIFT = [0, 8, 16, 24], OUTPUT_TYPES = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"], BASE64_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), blocks = [], buffer8;
    if (ARRAY_BUFFER) {
      var buffer = new ArrayBuffer(68);
      buffer8 = new Uint8Array(buffer), blocks = new Uint32Array(buffer);
    }
    (root.JS_MD5_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(e) {
      return Object.prototype.toString.call(e) === "[object Array]";
    }), ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(e) {
      return typeof e == "object" && e.buffer && e.buffer.constructor === ArrayBuffer;
    });
    var createOutputMethod = function(e) {
      return function(t) {
        return new Md5(!0).update(t)[e]();
      };
    }, createMethod = function() {
      var e = createOutputMethod("hex");
      NODE_JS && (e = nodeWrap(e)), e.create = function() {
        return new Md5();
      }, e.update = function(r) {
        return e.create().update(r);
      };
      for (var t = 0; t < OUTPUT_TYPES.length; ++t) {
        var n = OUTPUT_TYPES[t];
        e[n] = createOutputMethod(n);
      }
      return e;
    }, nodeWrap = function(method) {
      var crypto = eval("require('crypto')"), Buffer = eval("require('buffer').Buffer"), nodeMethod = function(e) {
        if (typeof e == "string")
          return crypto.createHash("md5").update(e, "utf8").digest("hex");
        if (e == null)
          throw ERROR;
        return e.constructor === ArrayBuffer && (e = new Uint8Array(e)), Array.isArray(e) || ArrayBuffer.isView(e) || e.constructor === Buffer ? crypto.createHash("md5").update(new Buffer(e)).digest("hex") : method(e);
      };
      return nodeMethod;
    };
    function Md5(e) {
      if (e)
        blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0, this.blocks = blocks, this.buffer8 = buffer8;
      else if (ARRAY_BUFFER) {
        var t = new ArrayBuffer(68);
        this.buffer8 = new Uint8Array(t), this.blocks = new Uint32Array(t);
      } else
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0;
    }
    Md5.prototype.update = function(e) {
      if (!this.finalized) {
        var t, n = typeof e;
        if (n !== "string") {
          if (n === "object") {
            if (e === null)
              throw ERROR;
            if (ARRAY_BUFFER && e.constructor === ArrayBuffer)
              e = new Uint8Array(e);
            else if (!Array.isArray(e) && (!ARRAY_BUFFER || !ArrayBuffer.isView(e)))
              throw ERROR;
          } else
            throw ERROR;
          t = !0;
        }
        for (var r, i = 0, s, o = e.length, c = this.blocks, v = this.buffer8; i < o; ) {
          if (this.hashed && (this.hashed = !1, c[0] = c[16], c[16] = c[1] = c[2] = c[3] = c[4] = c[5] = c[6] = c[7] = c[8] = c[9] = c[10] = c[11] = c[12] = c[13] = c[14] = c[15] = 0), t)
            if (ARRAY_BUFFER)
              for (s = this.start; i < o && s < 64; ++i)
                v[s++] = e[i];
            else
              for (s = this.start; i < o && s < 64; ++i)
                c[s >> 2] |= e[i] << SHIFT[s++ & 3];
          else if (ARRAY_BUFFER)
            for (s = this.start; i < o && s < 64; ++i)
              r = e.charCodeAt(i), r < 128 ? v[s++] = r : r < 2048 ? (v[s++] = 192 | r >> 6, v[s++] = 128 | r & 63) : r < 55296 || r >= 57344 ? (v[s++] = 224 | r >> 12, v[s++] = 128 | r >> 6 & 63, v[s++] = 128 | r & 63) : (r = 65536 + ((r & 1023) << 10 | e.charCodeAt(++i) & 1023), v[s++] = 240 | r >> 18, v[s++] = 128 | r >> 12 & 63, v[s++] = 128 | r >> 6 & 63, v[s++] = 128 | r & 63);
          else
            for (s = this.start; i < o && s < 64; ++i)
              r = e.charCodeAt(i), r < 128 ? c[s >> 2] |= r << SHIFT[s++ & 3] : r < 2048 ? (c[s >> 2] |= (192 | r >> 6) << SHIFT[s++ & 3], c[s >> 2] |= (128 | r & 63) << SHIFT[s++ & 3]) : r < 55296 || r >= 57344 ? (c[s >> 2] |= (224 | r >> 12) << SHIFT[s++ & 3], c[s >> 2] |= (128 | r >> 6 & 63) << SHIFT[s++ & 3], c[s >> 2] |= (128 | r & 63) << SHIFT[s++ & 3]) : (r = 65536 + ((r & 1023) << 10 | e.charCodeAt(++i) & 1023), c[s >> 2] |= (240 | r >> 18) << SHIFT[s++ & 3], c[s >> 2] |= (128 | r >> 12 & 63) << SHIFT[s++ & 3], c[s >> 2] |= (128 | r >> 6 & 63) << SHIFT[s++ & 3], c[s >> 2] |= (128 | r & 63) << SHIFT[s++ & 3]);
          this.lastByteIndex = s, this.bytes += s - this.start, s >= 64 ? (this.start = s - 64, this.hash(), this.hashed = !0) : this.start = s;
        }
        return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this;
      }
    }, Md5.prototype.finalize = function() {
      if (!this.finalized) {
        this.finalized = !0;
        var e = this.blocks, t = this.lastByteIndex;
        e[t >> 2] |= EXTRA[t & 3], t >= 56 && (this.hashed || this.hash(), e[0] = e[16], e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0), e[14] = this.bytes << 3, e[15] = this.hBytes << 3 | this.bytes >>> 29, this.hash();
      }
    }, Md5.prototype.hash = function() {
      var e, t, n, r, i, s, o = this.blocks;
      this.first ? (e = o[0] - 680876937, e = (e << 7 | e >>> 25) - 271733879 << 0, r = (-1732584194 ^ e & 2004318071) + o[1] - 117830708, r = (r << 12 | r >>> 20) + e << 0, n = (-271733879 ^ r & (e ^ -271733879)) + o[2] - 1126478375, n = (n << 17 | n >>> 15) + r << 0, t = (e ^ n & (r ^ e)) + o[3] - 1316259209, t = (t << 22 | t >>> 10) + n << 0) : (e = this.h0, t = this.h1, n = this.h2, r = this.h3, e += (r ^ t & (n ^ r)) + o[0] - 680876936, e = (e << 7 | e >>> 25) + t << 0, r += (n ^ e & (t ^ n)) + o[1] - 389564586, r = (r << 12 | r >>> 20) + e << 0, n += (t ^ r & (e ^ t)) + o[2] + 606105819, n = (n << 17 | n >>> 15) + r << 0, t += (e ^ n & (r ^ e)) + o[3] - 1044525330, t = (t << 22 | t >>> 10) + n << 0), e += (r ^ t & (n ^ r)) + o[4] - 176418897, e = (e << 7 | e >>> 25) + t << 0, r += (n ^ e & (t ^ n)) + o[5] + 1200080426, r = (r << 12 | r >>> 20) + e << 0, n += (t ^ r & (e ^ t)) + o[6] - 1473231341, n = (n << 17 | n >>> 15) + r << 0, t += (e ^ n & (r ^ e)) + o[7] - 45705983, t = (t << 22 | t >>> 10) + n << 0, e += (r ^ t & (n ^ r)) + o[8] + 1770035416, e = (e << 7 | e >>> 25) + t << 0, r += (n ^ e & (t ^ n)) + o[9] - 1958414417, r = (r << 12 | r >>> 20) + e << 0, n += (t ^ r & (e ^ t)) + o[10] - 42063, n = (n << 17 | n >>> 15) + r << 0, t += (e ^ n & (r ^ e)) + o[11] - 1990404162, t = (t << 22 | t >>> 10) + n << 0, e += (r ^ t & (n ^ r)) + o[12] + 1804603682, e = (e << 7 | e >>> 25) + t << 0, r += (n ^ e & (t ^ n)) + o[13] - 40341101, r = (r << 12 | r >>> 20) + e << 0, n += (t ^ r & (e ^ t)) + o[14] - 1502002290, n = (n << 17 | n >>> 15) + r << 0, t += (e ^ n & (r ^ e)) + o[15] + 1236535329, t = (t << 22 | t >>> 10) + n << 0, e += (n ^ r & (t ^ n)) + o[1] - 165796510, e = (e << 5 | e >>> 27) + t << 0, r += (t ^ n & (e ^ t)) + o[6] - 1069501632, r = (r << 9 | r >>> 23) + e << 0, n += (e ^ t & (r ^ e)) + o[11] + 643717713, n = (n << 14 | n >>> 18) + r << 0, t += (r ^ e & (n ^ r)) + o[0] - 373897302, t = (t << 20 | t >>> 12) + n << 0, e += (n ^ r & (t ^ n)) + o[5] - 701558691, e = (e << 5 | e >>> 27) + t << 0, r += (t ^ n & (e ^ t)) + o[10] + 38016083, r = (r << 9 | r >>> 23) + e << 0, n += (e ^ t & (r ^ e)) + o[15] - 660478335, n = (n << 14 | n >>> 18) + r << 0, t += (r ^ e & (n ^ r)) + o[4] - 405537848, t = (t << 20 | t >>> 12) + n << 0, e += (n ^ r & (t ^ n)) + o[9] + 568446438, e = (e << 5 | e >>> 27) + t << 0, r += (t ^ n & (e ^ t)) + o[14] - 1019803690, r = (r << 9 | r >>> 23) + e << 0, n += (e ^ t & (r ^ e)) + o[3] - 187363961, n = (n << 14 | n >>> 18) + r << 0, t += (r ^ e & (n ^ r)) + o[8] + 1163531501, t = (t << 20 | t >>> 12) + n << 0, e += (n ^ r & (t ^ n)) + o[13] - 1444681467, e = (e << 5 | e >>> 27) + t << 0, r += (t ^ n & (e ^ t)) + o[2] - 51403784, r = (r << 9 | r >>> 23) + e << 0, n += (e ^ t & (r ^ e)) + o[7] + 1735328473, n = (n << 14 | n >>> 18) + r << 0, t += (r ^ e & (n ^ r)) + o[12] - 1926607734, t = (t << 20 | t >>> 12) + n << 0, i = t ^ n, e += (i ^ r) + o[5] - 378558, e = (e << 4 | e >>> 28) + t << 0, r += (i ^ e) + o[8] - 2022574463, r = (r << 11 | r >>> 21) + e << 0, s = r ^ e, n += (s ^ t) + o[11] + 1839030562, n = (n << 16 | n >>> 16) + r << 0, t += (s ^ n) + o[14] - 35309556, t = (t << 23 | t >>> 9) + n << 0, i = t ^ n, e += (i ^ r) + o[1] - 1530992060, e = (e << 4 | e >>> 28) + t << 0, r += (i ^ e) + o[4] + 1272893353, r = (r << 11 | r >>> 21) + e << 0, s = r ^ e, n += (s ^ t) + o[7] - 155497632, n = (n << 16 | n >>> 16) + r << 0, t += (s ^ n) + o[10] - 1094730640, t = (t << 23 | t >>> 9) + n << 0, i = t ^ n, e += (i ^ r) + o[13] + 681279174, e = (e << 4 | e >>> 28) + t << 0, r += (i ^ e) + o[0] - 358537222, r = (r << 11 | r >>> 21) + e << 0, s = r ^ e, n += (s ^ t) + o[3] - 722521979, n = (n << 16 | n >>> 16) + r << 0, t += (s ^ n) + o[6] + 76029189, t = (t << 23 | t >>> 9) + n << 0, i = t ^ n, e += (i ^ r) + o[9] - 640364487, e = (e << 4 | e >>> 28) + t << 0, r += (i ^ e) + o[12] - 421815835, r = (r << 11 | r >>> 21) + e << 0, s = r ^ e, n += (s ^ t) + o[15] + 530742520, n = (n << 16 | n >>> 16) + r << 0, t += (s ^ n) + o[2] - 995338651, t = (t << 23 | t >>> 9) + n << 0, e += (n ^ (t | ~r)) + o[0] - 198630844, e = (e << 6 | e >>> 26) + t << 0, r += (t ^ (e | ~n)) + o[7] + 1126891415, r = (r << 10 | r >>> 22) + e << 0, n += (e ^ (r | ~t)) + o[14] - 1416354905, n = (n << 15 | n >>> 17) + r << 0, t += (r ^ (n | ~e)) + o[5] - 57434055, t = (t << 21 | t >>> 11) + n << 0, e += (n ^ (t | ~r)) + o[12] + 1700485571, e = (e << 6 | e >>> 26) + t << 0, r += (t ^ (e | ~n)) + o[3] - 1894986606, r = (r << 10 | r >>> 22) + e << 0, n += (e ^ (r | ~t)) + o[10] - 1051523, n = (n << 15 | n >>> 17) + r << 0, t += (r ^ (n | ~e)) + o[1] - 2054922799, t = (t << 21 | t >>> 11) + n << 0, e += (n ^ (t | ~r)) + o[8] + 1873313359, e = (e << 6 | e >>> 26) + t << 0, r += (t ^ (e | ~n)) + o[15] - 30611744, r = (r << 10 | r >>> 22) + e << 0, n += (e ^ (r | ~t)) + o[6] - 1560198380, n = (n << 15 | n >>> 17) + r << 0, t += (r ^ (n | ~e)) + o[13] + 1309151649, t = (t << 21 | t >>> 11) + n << 0, e += (n ^ (t | ~r)) + o[4] - 145523070, e = (e << 6 | e >>> 26) + t << 0, r += (t ^ (e | ~n)) + o[11] - 1120210379, r = (r << 10 | r >>> 22) + e << 0, n += (e ^ (r | ~t)) + o[2] + 718787259, n = (n << 15 | n >>> 17) + r << 0, t += (r ^ (n | ~e)) + o[9] - 343485551, t = (t << 21 | t >>> 11) + n << 0, this.first ? (this.h0 = e + 1732584193 << 0, this.h1 = t - 271733879 << 0, this.h2 = n - 1732584194 << 0, this.h3 = r + 271733878 << 0, this.first = !1) : (this.h0 = this.h0 + e << 0, this.h1 = this.h1 + t << 0, this.h2 = this.h2 + n << 0, this.h3 = this.h3 + r << 0);
    }, Md5.prototype.hex = function() {
      this.finalize();
      var e = this.h0, t = this.h1, n = this.h2, r = this.h3;
      return HEX_CHARS[e >> 4 & 15] + HEX_CHARS[e & 15] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[t & 15] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[n & 15] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[r & 15] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15];
    }, Md5.prototype.toString = Md5.prototype.hex, Md5.prototype.digest = function() {
      this.finalize();
      var e = this.h0, t = this.h1, n = this.h2, r = this.h3;
      return [
        e & 255,
        e >> 8 & 255,
        e >> 16 & 255,
        e >> 24 & 255,
        t & 255,
        t >> 8 & 255,
        t >> 16 & 255,
        t >> 24 & 255,
        n & 255,
        n >> 8 & 255,
        n >> 16 & 255,
        n >> 24 & 255,
        r & 255,
        r >> 8 & 255,
        r >> 16 & 255,
        r >> 24 & 255
      ];
    }, Md5.prototype.array = Md5.prototype.digest, Md5.prototype.arrayBuffer = function() {
      this.finalize();
      var e = new ArrayBuffer(16), t = new Uint32Array(e);
      return t[0] = this.h0, t[1] = this.h1, t[2] = this.h2, t[3] = this.h3, e;
    }, Md5.prototype.buffer = Md5.prototype.arrayBuffer, Md5.prototype.base64 = function() {
      for (var e, t, n, r = "", i = this.array(), s = 0; s < 15; )
        e = i[s++], t = i[s++], n = i[s++], r += BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[(e << 4 | t >>> 4) & 63] + BASE64_ENCODE_CHAR[(t << 2 | n >>> 6) & 63] + BASE64_ENCODE_CHAR[n & 63];
      return e = i[s], r += BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[e << 4 & 63] + "==", r;
    };
    var exports = createMethod();
    COMMON_JS ? module.exports = exports : root.md5 = exports;
  })();
})(md5$1);
var md5Exports = md5$1.exports;
const md5 = /* @__PURE__ */ getDefaultExportFromCjs(md5Exports);
var WebsocketServer = function(C, t) {
  function n() {
  }
  function r(y, a, A, f) {
    var g = "";
    switch (y) {
      case "OPTIONS":
      case "TEARDOWN":
      case "GET_PARAMETER":
      case "SET_PARAMETERS":
        g = y + " " + te + ` RTSP/1.0\r
CSeq: ` + d + (b ? `\r
ExtraError: support\r
` : `\r
`) + he + `\r
`;
        break;
      case "DESCRIBE":
        g = y + " " + te + ` RTSP/1.0\r
CSeq: ` + d + (b ? `\r
ExtraError: support\r
` : `\r
`) + he + `\r
`;
        break;
      case "SETUP":
        console.log("trackID: " + a), g = y + " " + te + "/trackID=" + a + ` RTSP/1.0\r
CSeq: ` + d + (b ? `\r
ExtraError: support\r
` : `\r
`) + he + "Transport: DH/AVP/TCP;unicast;interleaved=" + 2 * a + "-" + (2 * a + 1) + `\r
`, g += P != 0 ? "Session: " + P + `\r
\r
` : `\r
`;
        break;
      case "PLAY":
        g = y + " " + te + ` RTSP/1.0\r
CSeq: ` + d + (b ? `\r
ExtraError: support\r
` : `\r
`) + "Session: " + P + `\r
`, f != null && f != 0 && (g += "Range: npt=" + f + `-\r
`), g += he + `\r
`;
        break;
      case "PAUSE":
        g = y + " " + te + ` RTSP/1.0\r
CSeq: ` + d + (b ? `\r
ExtraError: support\r
` : `\r
`) + "Session: " + P + `\r
\r
`;
        break;
      case "SCALE":
        g = "PLAY " + te + ` RTSP/1.0\r
CSeq: ` + d + (b ? `\r
ExtraError: support\r
` : `\r
`) + "Session: " + P + `\r
`, g += "Scale: " + f + `\r
`, g += he + `\r
`;
    }
    return g;
  }
  function i(y) {
    var a = {}, A = y.search("CSeq: ") + 5;
    if (d = parseInt(y.slice(A, A + 10)) + 1, a = h(y), a.ResponseCode === me.UNAUTHORIZED && he === "")
      s(a);
    else if (a.ResponseCode === me.OK) {
      if (T === "Options") return T = "Describe", r("DESCRIBE", null);
      if (T === "Describe") {
        de = !1, p = S(y), typeof a.ContentBase < "u" && (p.ContentBase = a.ContentBase);
        var f = 0;
        for (f = 0; f < p.Sessions.length; f += 1) {
          var g = {};
          p.Sessions[f].CodecMime === "JPEG" || p.Sessions[f].CodecMime === "H264" || p.Sessions[f].CodecMime === "H265" || p.Sessions[f].CodecMime == "H264-SVC" ? (g.codecName = p.Sessions[f].CodecMime, p.Sessions[f].CodecMime == "H264-SVC" && (g.codecName = "H264"), p.Sessions[f].CodecMime == "H265" && n.prototype.setLiveMode("canvas"), g.trackID = p.Sessions[f].ControlURL, g.ClockFreq = p.Sessions[f].ClockFreq, g.Port = parseInt(p.Sessions[f].Port), typeof p.Sessions[f].Framerate < "u" && (g.Framerate = parseInt(p.Sessions[f].Framerate), se.setFPS(g.Framerate), Ee(g.Framerate)), _.push(g)) : p.Sessions[f].CodecMime === "PCMU" || p.Sessions[f].CodecMime.search("G726-16") !== -1 || p.Sessions[f].CodecMime.search("G726-24") !== -1 || p.Sessions[f].CodecMime.search("G726-32") !== -1 || p.Sessions[f].CodecMime.search("G726-40") !== -1 || p.Sessions[f].CodecMime === "PCMA" ? (p.Sessions[f].CodecMime === "PCMU" ? g.codecName = "G.711Mu" : p.Sessions[f].CodecMime === "G726-16" ? g.codecName = "G.726-16" : p.Sessions[f].CodecMime === "G726-24" ? g.codecName = "G.726-24" : p.Sessions[f].CodecMime === "G726-32" ? g.codecName = "G.726-32" : p.Sessions[f].CodecMime === "G726-40" ? g.codecName = "G.726-40" : p.Sessions[f].CodecMime === "PCMA" && (g.codecName = "G.711A"), g.trackID = p.Sessions[f].ControlURL, g.ClockFreq = p.Sessions[f].ClockFreq, g.Port = parseInt(p.Sessions[f].Port), g.Bitrate = parseInt(p.Sessions[f].Bitrate), _.push(g)) : p.Sessions[f].CodecMime === "mpeg4-generic" || p.Sessions[f].CodecMime === "MPEG4-GENERIC" ? (g.codecName = "mpeg4-generic", g.trackID = p.Sessions[f].ControlURL, g.ClockFreq = p.Sessions[f].ClockFreq, g.Port = parseInt(p.Sessions[f].Port), g.Bitrate = parseInt(p.Sessions[f].Bitrate), _.push(g)) : p.Sessions[f].CodecMime === "vnd.onvif.metadata" ? (g.codecName = "MetaData", g.trackID = p.Sessions[f].ControlURL, g.ClockFreq = p.Sessions[f].ClockFreq, g.Port = parseInt(p.Sessions[f].Port), _.push(g)) : p.Sessions[f].CodecMime === "stream-assist-frame" ? (g.codecName = "stream-assist-frame", g.trackID = p.Sessions[f].ControlURL, g.ClockFreq = p.Sessions[f].ClockFreq, g.Port = parseInt(p.Sessions[f].Port), _.push(g)) : console.log(
            "Unknown codec type:",
            p.Sessions[f].CodecMime,
            p.Sessions[f].ControlURL
          );
        }
        return M = 0, T = "Setup", r("SETUP", M);
      }
      if (T === "Setup") {
        if (P = a.SessionID, M < _.length)
          return _[M].RtpInterlevedID = a.RtpInterlevedID, _[M].RtcpInterlevedID = a.RtcpInterlevedID, M += 1, M !== _.length ? r("SETUP", _[M].trackID.split("=")[1] - 0) : (se.sendSdpInfo(_, re, de), T = "Play", r("PLAY", null));
        console.log("Unknown setup SDP index");
      } else T === "Play" ? (P = a.SessionID, clearInterval(xe), xe = setInterval(function() {
        return c(r("GET_PARAMETER", null));
      }, Re), T = "Playing") : T === "Playing" || console.log("unknown rtsp state:" + T);
    } else if (a.ResponseCode === me.NOTSERVICE) {
      if (T === "Setup" && _[M].trackID.search("trackID=t") !== -1)
        return _[M].RtpInterlevedID = -1, _[M].RtcpInterlevedID = -1, M += 1, de = !1, w({
          errorCode: "504",
          description: "Talk Service Unavilable",
          place: "RtspClient.js"
        }), M < _.length ? r("SETUP", _[M].trackID) : (T = "Play", r("PLAY", null));
      w({
        errorCode: "503",
        description: "Service Unavilable"
      });
    } else if (a.ResponseCode === me.NOTFOUND) {
      if (T === "Describe" || T === "Options")
        return void w({
          errorCode: 404,
          description: "rtsp not found"
        });
    } else if (a.ResponseCode === me.INVALID_RANGE)
      return void console.log("RTP disconnection detect!!!");
  }
  function s(y) {
    var a = we.username, A = we.passWord, f = {
      Method: null,
      Realm: null,
      Nonce: null,
      Uri: null
    }, g = null;
    f = {
      Method: T.toUpperCase(),
      Realm: y.Realm,
      Nonce: y.Nonce,
      Uri: te
    }, g = o(a, A, f.Uri, f.Realm, f.Nonce, f.Method), he = 'Authorization: Digest username="' + a + '", realm="' + f.Realm + '",', he += ' nonce="' + f.Nonce + '", uri="' + f.Uri + '", response="' + g + '"', he += `\r
`, c(r("OPTIONS", null));
  }
  function o(y, a, A, f, g, I) {
    var Z = null, oe = null;
    return Z = md5(y + ":" + f + ":" + a).toLowerCase(), oe = md5(I + ":" + A).toLowerCase(), md5(Z + ":" + g + ":" + oe).toLowerCase();
  }
  function c(y) {
    if (y != null && y != null && y != "")
      if (x !== null && x.readyState === WebSocket.OPEN) {
        if (Se === !1) {
          var a = y.search("DESCRIBE");
          a !== -1 && (ce = !0, Se = !0);
        }
        y != null && x.send(v(y));
      } else console.log("ws未连接");
  }
  function v(y) {
    for (var a = y.length, A = new Uint8Array(new ArrayBuffer(a)), f = 0; a > f; f++)
      A[f] = y.charCodeAt(f);
    return A;
  }
  function R(y) {
    var a = new Uint8Array(), A = new Uint8Array(y.data);
    for (a = new Uint8Array(A.length), a.set(A, 0), Q = a.length; Q > 0; )
      if (a[0] !== 36) {
        var f = String.fromCharCode.apply(null, a), g = null;
        f.indexOf("OffLine:File Over"), f.indexOf("OffLine:KmsUnavailable") !== -1 && w({
          errorCode: 203
        }), ce === !0 ? (g = f.lastIndexOf(`\r
`), ce = !1) : g = f.search(`\r
\r
`);
        var I = f.search("RTSP");
        if (I === -1) return void (a = new Uint8Array());
        if (g === -1) return void (Q = a.length);
        J = a.subarray(I, g + D), a = a.subarray(g + D);
        var Z = String.fromCharCode.apply(null, J);
        c(i(Z)), Q = a.length;
      } else {
        if (K = a.subarray(0, D), ne = K[2] << 24 | K[3] << 16 | K[4] << 8 | K[5], !(ne + D <= a.length))
          return void (Q = a.length);
        var oe = a.subarray(D, ne + D);
        E(K, oe), a = a.subarray(ne + D), Q = a.length;
      }
  }
  function E(y, a) {
    se.parseRTPData(y, a);
  }
  function h(y) {
    var a = {}, A = 0, f = 0, g = null, I = null, Z = null;
    if (y.search("Content-Type: application/sdp") !== -1) {
      var oe = y.split(`\r
\r
`);
      Z = oe[0];
    } else Z = y;
    var q = Z.split(`\r
`), ee = q[0].split(" ");
    if (ee.length > 2 && (a.ResponseCode = parseInt(ee[1]), a.ResponseMessage = ee[2]), a.ResponseCode === me.OK) {
      for (A = 1; A < q.length; A++)
        if (I = q[A].split(":"), I[0] === "Public")
          a.MethodsSupported = I[1].split(",");
        else if (I[0] === "CSeq") a.CSeq = parseInt(I[1]);
        else if (I[0] === "Content-Type")
          a.ContentType = I[1], a.ContentType.search("application/sdp") !== -1 && (a.SDPData = S(y));
        else if (I[0] === "Content-Length") a.ContentLength = parseInt(I[1]);
        else if (I[0] === "Content-Base") {
          var ge = q[A].search("Content-Base:");
          ge !== -1 && (a.ContentBase = q[A].substr(ge + 13));
        } else if (I[0] === "Session") {
          var H = I[1].split(";");
          a.SessionID = parseInt(H[0]);
        } else if (I[0] === "Transport") {
          var V = I[1].split(";");
          for (f = 0; f < V.length; f++) {
            var L = V[f].search("interleaved=");
            if (L !== -1) {
              var ie = V[f].substr(L + 12), ue = ie.split("-");
              ue.length > 1 && (a.RtpInterlevedID = parseInt(ue[0]), a.RtcpInterlevedID = parseInt(ue[1]));
            }
          }
        } else if (I[0] === "RTP-Info") {
          I[1] = q[A].substr(9);
          var B = I[1].split(",");
          for (a.RTPInfoList = [], f = 0; f < B.length; f++) {
            var U = B[f].split(";"), G = {}, O = 0;
            for (O = 0; O < U.length; O++) {
              var m = U[O].search("url=");
              m !== -1 && (G.URL = U[O].substr(m + 4)), m = U[O].search("seq="), m !== -1 && (G.Seq = parseInt(U[O].substr(m + 4)));
            }
            a.RTPInfoList.push(G);
          }
        }
    } else if (a.ResponseCode === me.UNAUTHORIZED) {
      for (A = 1; A < q.length; A++)
        if (I = q[A].split(":"), I[0] === "CSeq") a.CSeq = parseInt(I[1]);
        else if (I[0] === "WWW-Authenticate") {
          var F = I[1].split(",");
          for (f = 0; f < F.length; f++) {
            var W = F[f].search("Digest realm=");
            if (W !== -1) {
              g = F[f].substr(W + 13);
              var Y = g.split('"');
              a.Realm = Y[1];
            }
            if (W = F[f].search("nonce="), W !== -1) {
              g = F[f].substr(W + 6);
              var ae = g.split('"');
              a.Nonce = ae[1];
            }
          }
        }
    }
    return a;
  }
  function S(y) {
    var a = {}, A = [];
    a.Sessions = A;
    var f = null;
    if (y.search("Content-Type: application/sdp") !== -1) {
      var g = y.split(`\r
\r
`);
      f = g[1];
    } else f = y;
    var I = f.split(`\r
`), Z = 0, oe = !1;
    for (Z = 0; Z < I.length; Z++) {
      var q = I[Z].split("=");
      if (q.length > 0)
        switch (q[0]) {
          case "a":
            var ee = q[1].split(":");
            if (ee.length > 1) {
              if (ee[0] === "control") {
                var ge = I[Z].search("control:");
                oe === !0 ? ge !== -1 && (a.Sessions[a.Sessions.length - 1].ControlURL = I[Z].substr(
                  ge + 8
                )) : ge !== -1 && (a.BaseURL = I[Z].substr(ge + 8));
              } else if (ee[0] === "rtpmap") {
                var H = ee[1].split(" ");
                a.Sessions[a.Sessions.length - 1].PayloadType = H[0];
                var V = H[1].split("/");
                a.Sessions[a.Sessions.length - 1].CodecMime = V[0], V.length > 1 && (a.Sessions[a.Sessions.length - 1].ClockFreq = V[1]);
              } else if (ee[0] === "framesize") {
                var L = ee[1].split(" ");
                if (L.length > 1) {
                  var ie = L[1].split("-");
                  a.Sessions[a.Sessions.length - 1].Width = ie[0], a.Sessions[a.Sessions.length - 1].Height = ie[1];
                }
              } else if (ee[0] === "framerate")
                a.Sessions[a.Sessions.length - 1].Framerate = ee[1];
              else if (ee[0] === "fmtp") {
                var ue = I[Z].split(" ");
                if (ue.length < 2) continue;
                for (var B = 1; B < ue.length; B++) {
                  var U = ue[B].split(";"), G = 0;
                  for (G = 0; G < U.length; G++) {
                    var O = U[G].search("mode=");
                    if (O !== -1 && (a.Sessions[a.Sessions.length - 1].mode = U[G].substr(
                      O + 5
                    )), O = U[G].search("config="), O !== -1 && (a.Sessions[a.Sessions.length - 1].config = U[G].substr(O + 7), re.config = a.Sessions[a.Sessions.length - 1].config, re.clockFreq = a.Sessions[a.Sessions.length - 1].ClockFreq, re.bitrate = a.Sessions[a.Sessions.length - 1].Bitrate), O = U[G].search("sprop-vps="), O !== -1 && (a.Sessions[a.Sessions.length - 1].VPS = U[G].substr(
                      O + 10
                    )), O = U[G].search("sprop-sps="), O !== -1 && (a.Sessions[a.Sessions.length - 1].SPS = U[G].substr(
                      O + 10
                    )), O = U[G].search("sprop-pps="), O !== -1 && (a.Sessions[a.Sessions.length - 1].PPS = U[G].substr(
                      O + 10
                    )), O = U[G].search("sprop-parameter-sets="), O !== -1) {
                      var m = U[G].substr(O + 21), F = m.split(",");
                      F.length > 1 && (a.Sessions[a.Sessions.length - 1].SPS = F[0], a.Sessions[a.Sessions.length - 1].PPS = F[1]);
                    }
                  }
                }
              }
            }
            break;
          case "m":
            var W = q[1].split(" "), Y = {};
            Y.Type = W[0], Y.Port = W[1], Y.Payload = W[3], a.Sessions.push(Y), oe = !0;
            break;
          case "b":
            if (oe === !0) {
              var ae = q[1].split(":");
              a.Sessions[a.Sessions.length - 1].Bitrate = ae[1];
            }
        }
    }
    return a;
  }
  var C = C, x = null, D = 6, J = null, K = null, Q = 0, ne = 0, ce = !1, Se = !1, se = new WorkerManager(), me = {
    OK: 200,
    UNAUTHORIZED: 401,
    NOTFOUND: 404,
    INVALID_RANGE: 457,
    NOTSERVICE: 503,
    DISCONNECT: 999
  }, Re = 4e4, he = "", _ = [], d = 1, w = null, p = {}, T = "Options", M = null, P = null, de = !1, xe = null, re = {}, te = t, Ee = null, we = {}, N = "", b = !1;
  return n.prototype = {
    init: function(y, a) {
      se.init(y, a);
    },
    setStoreEncrypt: function(y) {
      b = y;
    },
    connect: function() {
      x || (x = new WebSocket(C), x.binaryType = "arraybuffer", x.addEventListener("message", R, !1), x.onopen = function() {
        var y = "OPTIONS " + te + ` RTSP/1.0\r
CSeq: ` + d + (b ? `\r
ExtraError: support` : "") + `\r
\r
`, a = v(y);
        x.send(a);
      }, x.onerror = function() {
        w({
          errorCode: 202,
          description: "Open WebSocket Error"
        });
      });
    },
    disconnect: function() {
      c(r("TEARDOWN", null)), clearInterval(xe), xe = null, x !== null && x.readyState === WebSocket.OPEN && (x.close(), x = null, P = null), x !== null && (x.onerror = null), se.terminate();
    },
    controlPlayer: function(y) {
      var a = "";
      switch (N = y.command, y.command) {
        case "PLAY":
          if (T = "Play", y.range != null) {
            a = r("PLAY", null, null, y.range);
            break;
          }
          a = r("PLAY", null), N && se.initStartTime();
          break;
        case "PAUSE":
          if (T === "PAUSE") break;
          T = "PAUSE", a = r("PAUSE", null);
          break;
        case "SCALE":
          a = r("SCALE", null, null, y.data), se.playbackSpeed(y.data);
          break;
        case "TEARDOWN":
          a = r("TEARDOWN", null);
          break;
        case "audioPlay":
        case "volumn":
        case "audioSamplingRate":
          se.controlAudio(y.command, y.data);
          break;
        default:
          console.log("未知指令: " + y.command);
      }
      a != "" && c(a);
    },
    setLiveMode: function(y) {
      se.setLiveMode(y);
    },
    setRTSPURL: function(y) {
      te = y;
    },
    setCallback: function(y, a) {
      y === "GetFrameRate" ? Ee = a : se.setCallback(y, a), y == "Error" && (w = a);
    },
    setUserInfo: function(y, a) {
      we.username = y, we.passWord = a;
    },
    capture: function(y) {
      se.capture(y);
    }
  }, new n();
};
class PlayerControl {
  constructor(t) {
    this.wsURL = t.wsURL, this.rtspURL = t.rtspURL, this.decodeMode = "video", this.ws = null, this.supportStoreEncrypt = t.supportStoreEncrypt || !1, this.events = {
      ResolutionChanged() {
      },
      PlayStart() {
      },
      DecodeStart() {
      },
      UpdateCanvas() {
      },
      GetFrameRate() {
      },
      FrameTypeChange() {
      },
      Error() {
      },
      MSEResolutionChanged() {
      },
      audioChange() {
      },
      WorkerReady() {
      }
    }, this.username = t.username, this.password = t.password;
  }
  init(t, n) {
    this.ws = new WebsocketServer(this.wsURL, this.rtspURL), this.ws.setStoreEncrypt(this.supportStoreEncrypt), this.ws.init(t, n), this.ws.setLiveMode(this.decodeMode), this.ws.setUserInfo(this.username, this.password);
    for (var r in this.events) this.ws.setCallback(r, this.events[r]);
    this.events = null;
  }
  connect() {
    this.ws.connect();
  }
  play() {
    this.controlPlayer("PLAY");
  }
  pause() {
    this.controlPlayer("PAUSE");
  }
  stop() {
    this.controlPlayer("TEARDOWN");
  }
  close() {
    this.ws?.disconnect();
  }
  playByTime(t) {
    this.controlPlayer("PLAY", "video", t);
  }
  playFF(t) {
    this.controlPlayer("PAUSE"), this.controlPlayer("SCALE", t);
  }
  playRewind() {
  }
  audioPlay() {
    this.controlPlayer("audioPlay", "start");
  }
  audioStop() {
    this.controlPlayer("audioPlay", "stop");
  }
  setAudioSamplingRate(t) {
    this.controlPlayer("audioSamplingRate", t);
  }
  setAudioVolume(t) {
    this.controlPlayer("volumn", t);
  }
  controlPlayer(t, n, r) {
    var i;
    i = n === "video" ? {
      command: t,
      range: r || 0
    } : {
      command: t,
      data: n
    }, this.ws?.controlPlayer(i);
  }
  setPlayMode(t) {
    this.ws.setLiveMode(t);
  }
  setPlayPath(t) {
    this.ws.setRTSPURL(t);
  }
  capture(t) {
    this.ws.capture(t);
  }
  on(t, n) {
    this.events[t] = n;
  }
}
export {
  PlayerControl
};

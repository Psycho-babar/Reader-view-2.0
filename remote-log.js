(() => {
  // output/RemoteLog/foreign.js
  function sendMessageToBackground(message4) {
    return function(callback) {
      return function() {
        chrome.runtime.sendMessage(message4, function(response) {
          callback(response)();
        });
      };
    };
  }

  // output/Data.Function/index.js
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Apply/index.js
  var apply = function(dict) {
    return dict.apply;
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    var pure1 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply2(pure1(f))(a);
      };
    };
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Control.Bind/index.js
  var bind = function(dict) {
    return dict.bind;
  };

  // output/Data.Monoid/index.js
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr2 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append2 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldr2(function(x) {
          return function(acc) {
            return append2(f(x))(acc);
          };
        })(mempty3);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };

  // output/Foreign/foreign.js
  var isArray = Array.isArray || function(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind3 = bind(dictMonad.Bind1());
    var pure3 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind3(f)(function(f$prime) {
          return bind3(a)(function(a$prime) {
            return pure3(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name2, moduleName, init2) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2)
        return val;
      if (state2 === 1)
        throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init2();
      state2 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map2) {
        return function(pure3) {
          return function(f) {
            return function(array) {
              function go(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure3([]);
                  case 1:
                    return map2(array1)(f(array[bot]));
                  case 2:
                    return apply2(map2(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map2(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map2(concat2)(go(bot, pivot)))(go(pivot, top2));
                }
              }
              return go(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Foreign/index.js
  var unsafeToForeign = unsafeCoerce2;

  // output/Foreign.Object/foreign.js
  function runST(f) {
    return f();
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a) {
      return function() {
        return f(a());
      };
    };
  };
  var foreach = function(as) {
    return function(f) {
      return function() {
        for (var i = 0, l = as.length; i < l; i++) {
          f(as[i])();
        }
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var functorST = {
    map: map_
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count) {
    return function(value) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value) {
      var result = [];
      var n = 0;
      for (var i = 0; i < count; i++) {
        result[n++] = value;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons2(head, tail) {
      this.head = head;
      this.tail = tail;
    }
    var emptyList = {};
    function curryCons(head) {
      return function(tail) {
        return new Cons2(head, tail);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr2) {
      return function(xs) {
        return listToArray(foldr2(curryCons)(emptyList)(xs));
      };
    };
  }();
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from + (to - from >> 1);
      if (mid - from > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from;
      j = mid;
      k = from;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();

  // output/Data.Array.ST/foreign.js
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from + (to - from >> 1);
      if (mid - from > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from;
      j = mid;
      k = from;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Array/index.js
  var fromFoldable2 = function(dictFoldable) {
    return fromFoldableImpl(foldr(dictFoldable));
  };

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };
  function poke2(k) {
    return function(v) {
      return function(m) {
        return function() {
          m[k] = v;
          return m;
        };
      };
    };
  }

  // output/Foreign.Object/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorST);
  var fromFoldable3 = function(dictFoldable) {
    var fromFoldable1 = fromFoldable2(dictFoldable);
    return function(l) {
      return runST(function __do2() {
        var s = newImpl();
        foreach(fromFoldable1(l))(function(v) {
          return $$void2(poke2(v.value0)(v.value1)(s));
        })();
        return s;
      });
    };
  };

  // output/Data.Options/index.js
  var fromFoldable4 = /* @__PURE__ */ fromFoldable3(foldableArray);
  var options = function(v) {
    return unsafeToForeign(fromFoldable4(v));
  };
  var monoidOptions = monoidArray;

  // output/Domy.Class.ErrorEvent/foreign.js
  function messageDefault(event) {
    return event.message;
  }
  function filenameDefault(event) {
    return event.filename;
  }
  function linenoDefault(event) {
    return event.lineno;
  }
  function colnoDefault(event) {
    return event.colno;
  }
  function errorDefault(event) {
    return event.error;
  }

  // output/Domy.Class.ErrorEvent/index.js
  var message2 = function(dict) {
    return dict.message;
  };

  // output/Domy.Class.EventTarget/foreign.js
  function toEventListener(listener) {
    return function() {
      return function(event) {
        return listener(event)();
      };
    };
  }
  function addEventListenerImpl(eventType) {
    return function(listener) {
      return function(options2) {
        return function(target) {
          return function() {
            target.addEventListener(eventType, listener, options2);
          };
        };
      };
    };
  }
  function removeEventListenerImpl(eventType) {
    return function(listener) {
      return function(target) {
        return function() {
          target.removeEventListener(eventType, listener);
        };
      };
    };
  }
  function dispatchEventImpl(event) {
    return function(target) {
      return function() {
        return target.dispatchEvent(event);
      };
    };
  }

  // output/Domy.Class.EventTarget/index.js
  var mempty2 = /* @__PURE__ */ mempty(monoidOptions);
  var removeEventListenerDefault = function(dictEventTarget) {
    return function(dictEvent) {
      return removeEventListenerImpl;
    };
  };
  var dispatchEventDefault = function(dictEventTarget) {
    return function(dictEvent) {
      return dispatchEventImpl;
    };
  };
  var addEventListenerDefault = function(dictEventTarget) {
    return function(dictEvent) {
      return function(type$prime) {
        return function(listener) {
          return function(opts) {
            return function(target) {
              return addEventListenerImpl(type$prime)(listener)(options(opts))(target);
            };
          };
        };
      };
    };
  };
  var addEventListener = function(dict) {
    return dict.addEventListener;
  };
  var addEventListener_ = function(dictEventTarget) {
    var addEventListener1 = addEventListener(dictEventTarget);
    return function(dictEvent) {
      var addEventListener2 = addEventListener1(dictEvent);
      return function(type$prime) {
        return function(listener) {
          return function(target) {
            return addEventListener2(type$prime)(listener)(mempty2)(target);
          };
        };
      };
    };
  };
  var addEventListener_$prime = function(dictEventTarget) {
    var addEventListener_1 = addEventListener_(dictEventTarget);
    return function(dictEvent) {
      var addEventListener_2 = addEventListener_1(dictEvent);
      return function(type$prime) {
        return function(listener) {
          return function(target) {
            return function __do2() {
              var eventListener = toEventListener(listener)();
              return addEventListener_2(type$prime)(eventListener)(target)();
            };
          };
        };
      };
    };
  };

  // output/Domy.Class.Event/foreign.js
  function preventDefaultImpl(event) {
    return function() {
      event.preventDefault();
    };
  }
  function stopPropagationImpl(event) {
    return function() {
      event.stopPropagation();
    };
  }
  function stopImmediatePropagationImpl(event) {
    return function() {
      event.stopImmediatePropagation();
    };
  }

  // output/Domy.Class.Event/index.js
  var stopPropagationDefault = stopPropagationImpl;
  var stopImmediatePropagationDefault = stopImmediatePropagationImpl;
  var preventDefaultDefault = preventDefaultImpl;

  // output/Domy.Events.ErrorEvent/index.js
  var eventErrorEvent = {
    preventDefault: preventDefaultDefault,
    stopPropagation: stopPropagationDefault,
    stopImmediatePropagation: stopImmediatePropagationDefault
  };
  var mouseEventErrorEvent = {
    message: messageDefault,
    filename: filenameDefault,
    lineno: linenoDefault,
    colno: colnoDefault,
    error: errorDefault,
    Event0: function() {
      return eventErrorEvent;
    }
  };
  var error2 = "error";

  // output/Domy.Globals/foreign.js
  function windowImpl() {
    return window;
  }

  // output/Domy.Window/foreign.js
  function location(window3) {
    return function() {
      return window3.location;
    };
  }

  // output/Domy.Window/index.js
  var eventTargetWindow = {
    addEventListener: function(dictEvent) {
      return addEventListenerDefault(eventTargetWindow)(dictEvent);
    },
    removeEventListener: function(dictEvent) {
      return removeEventListenerDefault(eventTargetWindow)(dictEvent);
    },
    dispatchEvent: function(dictEvent) {
      return dispatchEventDefault(eventTargetWindow)(dictEvent);
    }
  };

  // output/Domy.Globals/index.js
  var window2 = windowImpl;

  // output/Domy.Location/foreign.js
  function href(location2) {
    return function() {
      return location2.href;
    };
  }

  // output/RemoteLog/index.js
  var bind2 = /* @__PURE__ */ bind(bindEffect);
  var addEventListener_$prime2 = /* @__PURE__ */ addEventListener_$prime(eventTargetWindow)(eventErrorEvent);
  var message3 = /* @__PURE__ */ message2(mouseEventErrorEvent);
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var remoteLogWindowUncaught = function __do() {
    var url = bind2(bind2(window2)(location))(href)();
    return bind2(window2)(addEventListener_$prime2(error2)(function(event) {
      return sendMessageToBackground({
        error: message3(event),
        url
      })(function(v) {
        return pure2(unit);
      });
    }))();
  };
  var main = remoteLogWindowUncaught;

  // <stdin>
  main();
})();

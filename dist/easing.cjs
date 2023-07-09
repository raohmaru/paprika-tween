/*! For license information please see https://github.com/raohmaru/paprika-tween/blob/master/LICENSE */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/easing/index.js
var easing_exports = {};
__export(easing_exports, {
  Back: () => Back,
  Bounce: () => Bounce,
  Circular: () => Circular,
  Cubic: () => Cubic,
  Elastic: () => Elastic,
  Exponential: () => Exponential,
  Linear: () => Linear,
  Quadratic: () => Quadratic,
  Quartic: () => Quartic,
  Quintic: () => Quintic,
  Sinusoidal: () => Sinusoidal
});
module.exports = __toCommonJS(easing_exports);

// src/easing/back.js
var s = 1.70158;
var sa = 1.70158 * 1.525;
var Back = {
  In(t) {
    return t * t * ((s + 1) * t - s);
  },
  Out(t) {
    return --t * t * ((s + 1) * t + s) + 1;
  },
  InOut(t) {
    if ((t *= 2) < 1) {
      return 0.5 * (t * t * ((sa + 1) * t - sa));
    }
    return 0.5 * ((t -= 2) * t * ((sa + 1) * t + sa) + 2);
  }
};

// src/easing/bounce.js
function In(t) {
  return 1 - Out(1 - t);
}
function Out(t) {
  if (t < 1 / 2.75) {
    return 7.5625 * t * t;
  } else if (t < 2 / 2.75) {
    return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
  } else if (t < 2.5 / 2.75) {
    return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
  } else {
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  }
}
var Bounce = {
  In,
  Out,
  InOut(t) {
    if (t < 0.5) {
      return In(t * 2) * 0.5;
    }
    return Out(t * 2 - 1) * 0.5 + 0.5;
  }
};

// src/easing/circular.js
var sqrt = Math.sqrt;
var Circular = {
  In(t) {
    return 1 - sqrt(1 - t * t);
  },
  Out(t) {
    return sqrt(1 - --t * t);
  },
  InOut(t) {
    if ((t *= 2) < 1) {
      return -0.5 * (sqrt(1 - t * t) - 1);
    }
    return 0.5 * (sqrt(1 - (t -= 2) * t) + 1);
  }
};

// src/easing/cubic.js
var Cubic = {
  In(t) {
    return t * t * t;
  },
  Out(t) {
    return --t * t * t + 1;
  },
  InOut(t) {
    if ((t *= 2) < 1) {
      return 0.5 * t * t * t;
    }
    return 0.5 * ((t -= 2) * t * t + 2);
  }
};

// src/easing/elastic.js
var Elastic = {
  In(t) {
    if (t === 0) {
      return 0;
    }
    if (t === 1) {
      return 1;
    }
    return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
  },
  Out(t) {
    if (t === 0) {
      return 0;
    }
    if (t === 1) {
      return 1;
    }
    return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
  },
  InOut(t) {
    if (t === 0) {
      return 0;
    }
    if (t === 1) {
      return 1;
    }
    t *= 2;
    if (t < 1) {
      return -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
    }
    return 0.5 * Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) + 1;
  }
};

// src/easing/exponential.js
var Exponential = {
  In(t) {
    return t === 0 ? 0 : Math.pow(1024, t - 1);
  },
  Out(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  },
  InOut(t) {
    if (t === 0) {
      return 0;
    }
    if (t === 1) {
      return 1;
    }
    if ((t *= 2) < 1) {
      return 0.5 * Math.pow(1024, t - 1);
    }
    return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
  }
};

// src/easing/linear.js
var Linear = {
  None: (t) => t
};

// src/easing/quadratic.js
var Quadratic = {
  In(t) {
    return t * t;
  },
  Out(t) {
    return t * (2 - t);
  },
  InOut(t) {
    if ((t *= 2) < 1) {
      return 0.5 * t * t;
    }
    return -0.5 * (--t * (t - 2) - 1);
  }
};

// src/easing/quartic.js
var Quartic = {
  In(t) {
    return t * t * t * t;
  },
  Out(t) {
    return 1 - --t * t * t * t;
  },
  InOut(t) {
    if ((t *= 2) < 1) {
      return 0.5 * t * t * t * t;
    }
    return -0.5 * ((t -= 2) * t * t * t - 2);
  }
};

// src/easing/quintic.js
var Quintic = {
  In(t) {
    return t * t * t * t * t;
  },
  Out(t) {
    return --t * t * t * t * t + 1;
  },
  InOut(t) {
    if ((t *= 2) < 1) {
      return 0.5 * t * t * t * t * t;
    }
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
  }
};

// src/easing/sinusoidal.js
var Sinusoidal = {
  In(t) {
    return 1 - Math.cos(t * Math.PI / 2);
  },
  Out(t) {
    return Math.sin(t * Math.PI / 2);
  },
  InOut(t) {
    return 0.5 * (1 - Math.cos(Math.PI * t));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Back,
  Bounce,
  Circular,
  Cubic,
  Elastic,
  Exponential,
  Linear,
  Quadratic,
  Quartic,
  Quintic,
  Sinusoidal
});

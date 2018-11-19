'use strict';

var Char = require("bs-platform/lib/js/char.js");
var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Bytes = require("bs-platform/lib/js/bytes.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Stack = require("bs-platform/lib/js/stack.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Printf = require("bs-platform/lib/js/printf.js");
var Stream = require("bs-platform/lib/js/stream.js");
var $$String = require("bs-platform/lib/js/string.js");
var Hashtbl = require("bs-platform/lib/js/hashtbl.js");
var Xml$Xml = require("./xml.bs.js");
var Printexc = require("bs-platform/lib/js/printexc.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Xmllexer_generic$Xml = require("./xmllexer_generic.bs.js");

function $$return(x) {
  return x;
}

function fail(prim) {
  throw prim;
}

function $great$great$eq(v, f) {
  return Curry._1(f, v);
}

var UnitMonad = /* module */[
  /* return */$$return,
  /* fail */fail,
  /* >>= */$great$great$eq
];

function Decoder(I) {
  var IllegalCharacter = Caml_exceptions.create("Xmllexer-Xml.Decoder(I).IllegalCharacter");
  var decode_utf8 = function (strm) {
    return Curry._2(I[/* >>= */0], Curry._1(I[/* get */3], strm), (function (param) {
                  if (param !== undefined) {
                    var ch1 = param;
                    if (ch1 >= 192) {
                      if (ch1 >= 240) {
                        if (ch1 >= 248) {
                          return Curry._1(I[/* fail */2], IllegalCharacter);
                        } else {
                          return Curry._2(I[/* >>= */0], Curry._1(I[/* get */3], strm), (function (param) {
                                        if (param !== undefined) {
                                          var ch2 = param;
                                          return Curry._2(I[/* >>= */0], Curry._1(I[/* get */3], strm), (function (param) {
                                                        if (param !== undefined) {
                                                          var ch3 = param;
                                                          return Curry._2(I[/* >>= */0], Curry._1(I[/* get */3], strm), (function (param) {
                                                                        if (param !== undefined) {
                                                                          var ch4 = param;
                                                                          if ((ch2 >>> 6) !== 2 || (ch3 >>> 6) !== 2 || (ch4 >>> 6) !== 2) {
                                                                            return Curry._1(I[/* fail */2], IllegalCharacter);
                                                                          } else {
                                                                            return Curry._1(I[/* return */1], ((ch1 & 7) << 18) | ((ch2 & 63) << 12) | ((ch3 & 63) << 6) | ch4 & 63);
                                                                          }
                                                                        } else {
                                                                          return Curry._1(I[/* fail */2], IllegalCharacter);
                                                                        }
                                                                      }));
                                                        } else {
                                                          return Curry._1(I[/* fail */2], IllegalCharacter);
                                                        }
                                                      }));
                                        } else {
                                          return Curry._1(I[/* fail */2], IllegalCharacter);
                                        }
                                      }));
                        }
                      } else if (ch1 >= 224) {
                        return Curry._2(I[/* >>= */0], Curry._1(I[/* get */3], strm), (function (param) {
                                      if (param !== undefined) {
                                        var ch2 = param;
                                        return Curry._2(I[/* >>= */0], Curry._1(I[/* get */3], strm), (function (param) {
                                                      if (param !== undefined) {
                                                        var ch3 = param;
                                                        if ((ch2 >>> 6) !== 2 || (ch3 >>> 6) !== 2) {
                                                          return Curry._1(I[/* fail */2], IllegalCharacter);
                                                        } else {
                                                          var code = ((ch1 & 15) << 12) | ((ch2 & 63) << 6) | ch3 & 63;
                                                          if (code >= 55296 && code <= 57088) {
                                                            return Curry._1(I[/* fail */2], IllegalCharacter);
                                                          } else {
                                                            return Curry._1(I[/* return */1], code);
                                                          }
                                                        }
                                                      } else {
                                                        return Curry._1(I[/* fail */2], IllegalCharacter);
                                                      }
                                                    }));
                                      } else {
                                        return Curry._1(I[/* fail */2], IllegalCharacter);
                                      }
                                    }));
                      } else {
                        return Curry._2(I[/* >>= */0], Curry._1(I[/* get */3], strm), (function (param) {
                                      if (param !== undefined) {
                                        var ch2 = param;
                                        if ((ch2 >>> 6) !== 2) {
                                          return Curry._1(I[/* fail */2], IllegalCharacter);
                                        } else {
                                          var code = ((ch1 & 31) << 6) | ch2 & 63;
                                          return Curry._1(I[/* return */1], code);
                                        }
                                      } else {
                                        return Curry._1(I[/* fail */2], IllegalCharacter);
                                      }
                                    }));
                      }
                    } else if (ch1 >= 128) {
                      return Curry._1(I[/* fail */2], IllegalCharacter);
                    } else {
                      return Curry._1(I[/* return */1], ch1);
                    }
                  } else {
                    return Curry._1(I[/* return */1], undefined);
                  }
                }));
  };
  return /* module */[
          /* IllegalCharacter */IllegalCharacter,
          /* decode_utf8 */decode_utf8
        ];
}

function Input(M) {
  var get = function (s) {
    var match = Stream.peek(s);
    if (match !== undefined) {
      Stream.junk(s);
      return Curry._1(M[/* return */0], Js_primitive.some(Js_primitive.valFromOption(match)));
    } else {
      return Curry._1(M[/* return */0], undefined);
    }
  };
  var $$return = M[0];
  var $great$great$eq = M[1];
  var fail = M[2];
  var IllegalCharacter = Caml_exceptions.create("Xmllexer-Xml.Decoder(I).IllegalCharacter");
  var decode_utf8 = function (strm) {
    return Curry._2($great$great$eq, get(strm), (function (param) {
                  if (param !== undefined) {
                    var ch1 = param;
                    var exit = 0;
                    if (ch1 >= 192) {
                      if (ch1 >= 240) {
                        if (ch1 >= 248) {
                          return Curry._1(fail, IllegalCharacter);
                        } else {
                          exit = 3;
                        }
                      } else {
                        exit = ch1 >= 224 ? 2 : 1;
                      }
                    } else if (ch1 >= 128) {
                      return Curry._1(fail, IllegalCharacter);
                    } else {
                      return Curry._1($$return, ch1);
                    }
                    switch (exit) {
                      case 1 : 
                          return Curry._2($great$great$eq, get(strm), (function (param) {
                                        if (param !== undefined) {
                                          var ch2 = param;
                                          if ((ch2 >>> 6) !== 2) {
                                            return Curry._1(fail, IllegalCharacter);
                                          } else {
                                            var code = ((ch1 & 31) << 6) | ch2 & 63;
                                            return Curry._1($$return, code);
                                          }
                                        } else {
                                          return Curry._1(fail, IllegalCharacter);
                                        }
                                      }));
                      case 2 : 
                          return Curry._2($great$great$eq, get(strm), (function (param) {
                                        if (param !== undefined) {
                                          var ch2 = param;
                                          return Curry._2($great$great$eq, get(strm), (function (param) {
                                                        if (param !== undefined) {
                                                          var ch3 = param;
                                                          if ((ch2 >>> 6) !== 2 || (ch3 >>> 6) !== 2) {
                                                            return Curry._1(fail, IllegalCharacter);
                                                          } else {
                                                            var code = ((ch1 & 15) << 12) | ((ch2 & 63) << 6) | ch3 & 63;
                                                            if (code >= 55296 && code <= 57088) {
                                                              return Curry._1(fail, IllegalCharacter);
                                                            } else {
                                                              return Curry._1($$return, code);
                                                            }
                                                          }
                                                        } else {
                                                          return Curry._1(fail, IllegalCharacter);
                                                        }
                                                      }));
                                        } else {
                                          return Curry._1(fail, IllegalCharacter);
                                        }
                                      }));
                      case 3 : 
                          return Curry._2($great$great$eq, get(strm), (function (param) {
                                        if (param !== undefined) {
                                          var ch2 = param;
                                          return Curry._2($great$great$eq, get(strm), (function (param) {
                                                        if (param !== undefined) {
                                                          var ch3 = param;
                                                          return Curry._2($great$great$eq, get(strm), (function (param) {
                                                                        if (param !== undefined) {
                                                                          var ch4 = param;
                                                                          if ((ch2 >>> 6) !== 2 || (ch3 >>> 6) !== 2 || (ch4 >>> 6) !== 2) {
                                                                            return Curry._1(fail, IllegalCharacter);
                                                                          } else {
                                                                            return Curry._1($$return, ((ch1 & 7) << 18) | ((ch2 & 63) << 12) | ((ch3 & 63) << 6) | ch4 & 63);
                                                                          }
                                                                        } else {
                                                                          return Curry._1(fail, IllegalCharacter);
                                                                        }
                                                                      }));
                                                        } else {
                                                          return Curry._1(fail, IllegalCharacter);
                                                        }
                                                      }));
                                        } else {
                                          return Curry._1(fail, IllegalCharacter);
                                        }
                                      }));
                      
                    }
                  } else {
                    return Curry._1($$return, undefined);
                  }
                }));
  };
  var D = /* module */[
    /* IllegalCharacter */IllegalCharacter,
    /* decode_utf8 */decode_utf8
  ];
  var UnknownEncoding = Caml_exceptions.create("Xmllexer-Xml.Input(M).UnknownEncoding");
  var make_decoder = function (encname) {
    if (encname === "UTF-8") {
      return decode_utf8;
    } else {
      throw UnknownEncoding;
    }
  };
  return /* module */[
          /* get */get,
          /* D */D,
          /* UnknownEncoding */UnknownEncoding,
          /* make_decoder */make_decoder
        ];
}

var IllegalCharacter = Caml_exceptions.create("Xmllexer-Xml.Encoding.IllegalCharacter");

function encode_unicode(ucs4) {
  var bytes;
  if (ucs4 < 128) {
    bytes = /* :: */[
      ucs4,
      /* [] */0
    ];
  } else if (ucs4 <= 2047) {
    bytes = /* :: */[
      192 | (ucs4 >>> 6),
      /* :: */[
        128 | ucs4 & 63,
        /* [] */0
      ]
    ];
  } else if (ucs4 <= 65535) {
    if (ucs4 >= 55296 && ucs4 < 57344) {
      throw IllegalCharacter;
    }
    bytes = /* :: */[
      224 | (ucs4 >>> 12),
      /* :: */[
        128 | (ucs4 >>> 6) & 63,
        /* :: */[
          128 | ucs4 & 63,
          /* [] */0
        ]
      ]
    ];
  } else if (ucs4 <= 1114111) {
    bytes = /* :: */[
      240 | (ucs4 >>> 18),
      /* :: */[
        128 | (ucs4 >>> 12) & 63,
        /* :: */[
          128 | (ucs4 >>> 6) & 63,
          /* :: */[
            128 | ucs4 & 63,
            /* [] */0
          ]
        ]
      ]
    ];
  } else {
    throw IllegalCharacter;
  }
  return List.map(Char.chr, bytes);
}

var Encoding = /* module */[
  /* IllegalCharacter */IllegalCharacter,
  /* encode_unicode */encode_unicode
];

function LocatedStream(M) {
  return (function (I) {
      var $great$great$eq = M[1];
      var fail = M[2];
      var Located_exn = Caml_exceptions.create("Xmllexer-Xml.LocatedStream(M)(I).Located_exn");
      var set_decoder = function (encname, strm) {
        var decoder = Curry._1(I[/* make_decoder */0], encname);
        strm[/* decoder */2] = decoder;
        return /* () */0;
      };
      var make_stream = function (source) {
        return /* record */[
                /* line */0,
                /* col */0,
                /* decoder */Curry._1(I[/* make_decoder */0], "UTF-8"),
                /* stream */source
              ];
      };
      var error = function (stream, exn) {
        if (stream !== undefined) {
          var strm = stream;
          return Curry._1(M[/* fail */2], [
                      Located_exn,
                      /* tuple */[
                        strm[/* line */0],
                        strm[/* col */1]
                      ],
                      exn
                    ]);
        } else {
          return Curry._1(fail, exn);
        }
      };
      var next_char = function (strm, eof, f) {
        return Curry._2($great$great$eq, Curry._1(strm[/* decoder */2], strm[/* stream */3]), (function (param) {
                      if (param !== undefined) {
                        var u = param;
                        if (u === 10) {
                          strm[/* line */0] = strm[/* line */0] + 1 | 0;
                          strm[/* col */1] = 0;
                        } else {
                          strm[/* col */1] = strm[/* col */1] + 1 | 0;
                        }
                        return Curry._1(f, u);
                      } else {
                        return Curry._1(eof, /* () */0);
                      }
                    }));
      };
      return /* module */[
              /* return */M[0],
              /* >>= */$great$great$eq,
              /* fail */fail,
              /* Located_exn */Located_exn,
              /* set_decoder */set_decoder,
              /* make_stream */make_stream,
              /* error */error,
              /* next_char */next_char
            ];
    });
}

function XmlStanza(M) {
  var emit_start_tag = function (name, attrs, selfclosing) {
    return Curry._1(M[/* return */0], /* StartTag */Block.__(0, [
                  name,
                  attrs,
                  selfclosing
                ]));
  };
  var emit_end_tag = function (name) {
    return Curry._1(M[/* return */0], /* EndTag */Block.__(1, [name]));
  };
  var emit_doctype = function (doctype) {
    return Curry._1(M[/* return */0], /* Doctype */Block.__(2, [doctype]));
  };
  var emit_pi = function (target, data) {
    return Curry._1(M[/* return */0], /* PI */Block.__(3, [
                  target,
                  data
                ]));
  };
  var emit_text = function (text) {
    return Curry._1(M[/* return */0], /* Text */Block.__(4, [text]));
  };
  var emit_eof = function (param) {
    return Curry._1(M[/* return */0], undefined);
  };
  return /* module */[
          /* emit_start_tag */emit_start_tag,
          /* emit_end_tag */emit_end_tag,
          /* emit_doctype */emit_doctype,
          /* emit_pi */emit_pi,
          /* emit_text */emit_text,
          /* emit_eof */emit_eof
        ];
}

function get(s) {
  var match = Stream.peek(s);
  if (match !== undefined) {
    Stream.junk(s);
    return Js_primitive.some(Js_primitive.valFromOption(match));
  }
  
}

var IllegalCharacter$1 = Caml_exceptions.create("Xmllexer-Xml.Decoder(I).IllegalCharacter");

function decode_utf8(strm) {
  var param = get(strm);
  if (param !== undefined) {
    var ch1 = param;
    var exit = 0;
    if (ch1 >= 192) {
      if (ch1 >= 240) {
        if (ch1 >= 248) {
          throw IllegalCharacter$1;
        } else {
          exit = 3;
        }
      } else {
        exit = ch1 >= 224 ? 2 : 1;
      }
    } else if (ch1 >= 128) {
      throw IllegalCharacter$1;
    } else {
      return ch1;
    }
    switch (exit) {
      case 1 : 
          var param$1 = get(strm);
          if (param$1 !== undefined) {
            var ch2 = param$1;
            if ((ch2 >>> 6) !== 2) {
              throw IllegalCharacter$1;
            } else {
              return ((ch1 & 31) << 6) | ch2 & 63;
            }
          } else {
            throw IllegalCharacter$1;
          }
      case 2 : 
          var param$2 = get(strm);
          if (param$2 !== undefined) {
            var ch2$1 = param$2;
            var param$3 = get(strm);
            if (param$3 !== undefined) {
              var ch3 = param$3;
              if ((ch2$1 >>> 6) !== 2 || (ch3 >>> 6) !== 2) {
                throw IllegalCharacter$1;
              } else {
                var code = ((ch1 & 15) << 12) | ((ch2$1 & 63) << 6) | ch3 & 63;
                if (code >= 55296 && code <= 57088) {
                  throw IllegalCharacter$1;
                } else {
                  return code;
                }
              }
            } else {
              throw IllegalCharacter$1;
            }
          } else {
            throw IllegalCharacter$1;
          }
      case 3 : 
          var param$4 = get(strm);
          if (param$4 !== undefined) {
            var ch2$2 = param$4;
            var param$5 = get(strm);
            if (param$5 !== undefined) {
              var ch3$1 = param$5;
              var param$6 = get(strm);
              if (param$6 !== undefined) {
                var ch4 = param$6;
                if ((ch2$2 >>> 6) !== 2 || (ch3$1 >>> 6) !== 2 || (ch4 >>> 6) !== 2) {
                  throw IllegalCharacter$1;
                } else {
                  return ((ch1 & 7) << 18) | ((ch2$2 & 63) << 12) | ((ch3$1 & 63) << 6) | ch4 & 63;
                }
              } else {
                throw IllegalCharacter$1;
              }
            } else {
              throw IllegalCharacter$1;
            }
          } else {
            throw IllegalCharacter$1;
          }
      
    }
  }
  
}

var UnknownEncoding = Caml_exceptions.create("Xmllexer-Xml.Input(M).UnknownEncoding");

function make_decoder(encname) {
  if (encname === "UTF-8") {
    return decode_utf8;
  } else {
    throw UnknownEncoding;
  }
}

var LS = (function (I) {
      var Located_exn = Caml_exceptions.create("Xmllexer-Xml.LocatedStream(M)(I).Located_exn");
      var set_decoder = function (encname, strm) {
        var decoder = Curry._1(I[/* make_decoder */0], encname);
        strm[/* decoder */2] = decoder;
        return /* () */0;
      };
      var make_stream = function (source) {
        return /* record */[
                /* line */0,
                /* col */0,
                /* decoder */Curry._1(I[/* make_decoder */0], "UTF-8"),
                /* stream */source
              ];
      };
      var error = function (stream, exn) {
        if (stream !== undefined) {
          var strm = stream;
          throw [
                Located_exn,
                /* tuple */[
                  strm[/* line */0],
                  strm[/* col */1]
                ],
                exn
              ];
        } else {
          throw exn;
        }
      };
      var next_char = function (strm, eof, f) {
        var param = Curry._1(strm[/* decoder */2], strm[/* stream */3]);
        if (param !== undefined) {
          var u = param;
          if (u === 10) {
            strm[/* line */0] = strm[/* line */0] + 1 | 0;
            strm[/* col */1] = 0;
          } else {
            strm[/* col */1] = strm[/* col */1] + 1 | 0;
          }
          return Curry._1(f, u);
        } else {
          return Curry._1(eof, /* () */0);
        }
      };
      return /* module */[
              /* return */$$return,
              /* >>= */$great$great$eq,
              /* fail */fail,
              /* Located_exn */Located_exn,
              /* set_decoder */set_decoder,
              /* make_stream */make_stream,
              /* error */error,
              /* next_char */next_char
            ];
    })([make_decoder]);

function emit_start_tag(name, attrs, selfclosing) {
  return /* StartTag */Block.__(0, [
            name,
            attrs,
            selfclosing
          ]);
}

function emit_end_tag(name) {
  return /* EndTag */Block.__(1, [name]);
}

function emit_doctype(doctype) {
  return /* Doctype */Block.__(2, [doctype]);
}

function emit_pi(target, data) {
  return /* PI */Block.__(3, [
            target,
            data
          ]);
}

function emit_text(text) {
  return /* Text */Block.__(4, [text]);
}

function emit_eof(param) {
  return undefined;
}

var M = Xmllexer_generic$Xml.Make([
          LS[0],
          LS[1],
          LS[2],
          LS[4],
          LS[7],
          LS[6]
        ])([encode_unicode])([
      emit_pi,
      emit_start_tag,
      emit_end_tag,
      emit_doctype,
      emit_text,
      emit_eof
    ]);

function emit_start_tag$1(name, attrs, selfclosing) {
  return /* StartTag */Block.__(0, [
            name,
            attrs,
            selfclosing
          ]);
}

function emit_end_tag$1(name) {
  return /* EndTag */Block.__(1, [name]);
}

function emit_doctype$1(doctype) {
  return /* Doctype */Block.__(2, [doctype]);
}

function emit_pi$1(target, data) {
  return /* PI */Block.__(3, [
            target,
            data
          ]);
}

function emit_text$1(text) {
  return /* Text */Block.__(4, [text]);
}

function emit_eof$1(param) {
  return undefined;
}

var X = /* module */[
  /* emit_start_tag */emit_start_tag$1,
  /* emit_end_tag */emit_end_tag$1,
  /* emit_doctype */emit_doctype$1,
  /* emit_pi */emit_pi$1,
  /* emit_text */emit_text$1,
  /* emit_eof */emit_eof$1
];

function parse_document(inc) {
  var strm = Curry._1(LS[/* make_stream */5], Stream.of_channel(inc));
  var next_token = Curry._1(M[/* make_lexer */48], strm);
  var namespaces = Hashtbl.create(undefined, 1);
  Hashtbl.add(namespaces, "xml", Xml$Xml.ns_xml);
  var stack = Stack.create(/* () */0);
  var add_element = function (el) {
    var match = Stack.pop(stack);
    return Stack.push(/* tuple */[
                match[0],
                match[1],
                /* :: */[
                  el,
                  match[2]
                ]
              ], stack);
  };
  var loop = function (_param) {
    while(true) {
      var match = Curry._1(next_token, /* () */0);
      if (match !== undefined) {
        var t = match;
        switch (t.tag | 0) {
          case 0 : 
              var match$1 = Xml$Xml.parse_element_head(namespaces, t[0], t[1]);
              var lnss = match$1[1];
              var el_000 = match$1[0];
              var el_001 = match$1[2];
              var el = /* tuple */[
                el_000,
                el_001,
                /* [] */0
              ];
              if (t[2]) {
                Xml$Xml.remove_namespaces(namespaces, lnss);
                if (Stack.is_empty(stack)) {
                  Stack.push(el, stack);
                  _param = /* () */0;
                  continue ;
                } else {
                  add_element(/* Xmlelement */Block.__(0, [el]));
                  _param = /* () */0;
                  continue ;
                }
              } else {
                Stack.push(el, stack);
                loop(/* () */0);
                Xml$Xml.remove_namespaces(namespaces, lnss);
                _param = /* () */0;
                continue ;
              }
          case 1 : 
              if (Stack.length(stack) > 1) {
                var match$2 = Stack.pop(stack);
                return add_element(/* Xmlelement */Block.__(0, [/* tuple */[
                                match$2[0],
                                match$2[1],
                                List.rev(match$2[2])
                              ]]));
              } else {
                return /* () */0;
              }
          case 2 : 
          case 3 : 
              _param = /* () */0;
              continue ;
          case 4 : 
              add_element(/* Xmlcdata */Block.__(1, [t[0]]));
              _param = /* () */0;
              continue ;
          
        }
      } else {
        return /* () */0;
      }
    };
  };
  try {
    loop(/* () */0);
    var match = Stack.pop(stack);
    return /* Xmlelement */Block.__(0, [/* tuple */[
                match[0],
                match[1],
                List.rev(match[2])
              ]]);
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === LS[/* Located_exn */3]) {
      var exn$1 = exn[2];
      var match$1 = exn[1];
      var col = match$1[1];
      var line = match$1[0];
      if (exn$1[0] === M[/* Exn_msg */3]) {
        Curry._3(Printf.eprintf(/* Format */[
                  /* Int */Block.__(4, [
                      /* Int_d */0,
                      /* No_padding */0,
                      /* No_precision */0,
                      /* Char_literal */Block.__(12, [
                          /* ":" */58,
                          /* Int */Block.__(4, [
                              /* Int_d */0,
                              /* No_padding */0,
                              /* No_precision */0,
                              /* Char_literal */Block.__(12, [
                                  /* " " */32,
                                  /* String */Block.__(2, [
                                      /* No_padding */0,
                                      /* Char_literal */Block.__(12, [
                                          /* "\n" */10,
                                          /* End_of_format */0
                                        ])
                                    ])
                                ])
                            ])
                        ])
                    ]),
                  "%d:%d %s\n"
                ]), line, col, exn$1[1]);
        return Pervasives.exit(127);
      } else if (exn$1[0] === M[/* Exn_ExpectedChar */5]) {
        Curry._3(Printf.eprintf(/* Format */[
                  /* Int */Block.__(4, [
                      /* Int_d */0,
                      /* No_padding */0,
                      /* No_precision */0,
                      /* Char_literal */Block.__(12, [
                          /* ":" */58,
                          /* Int */Block.__(4, [
                              /* Int_d */0,
                              /* No_padding */0,
                              /* No_precision */0,
                              /* String_literal */Block.__(11, [
                                  " Expected '",
                                  /* String */Block.__(2, [
                                      /* No_padding */0,
                                      /* String_literal */Block.__(11, [
                                          "'\n",
                                          /* End_of_format */0
                                        ])
                                    ])
                                ])
                            ])
                        ])
                    ]),
                  "%d:%d Expected '%s'\n"
                ]), line, col, $$String.make(1, List.hd(exn$1[1])));
        return Pervasives.exit(127);
      } else if (exn$1[0] === M[/* Exn_CharToken */7]) {
        var chs = Curry._1(M[/* E */0][/* encode_unicode */0], exn$1[1]);
        var str = Caml_string.caml_create_string(List.length(chs));
        var iteri = function (_i, _param) {
          while(true) {
            var param = _param;
            var i = _i;
            if (param) {
              str[i] = param[0];
              _param = param[1];
              _i = i + 1 | 0;
              continue ;
            } else {
              return /* () */0;
            }
          };
        };
        iteri(0, chs);
        Curry._3(Printf.eprintf(/* Format */[
                  /* Int */Block.__(4, [
                      /* Int_d */0,
                      /* No_padding */0,
                      /* No_precision */0,
                      /* Char_literal */Block.__(12, [
                          /* ":" */58,
                          /* Int */Block.__(4, [
                              /* Int_d */0,
                              /* No_padding */0,
                              /* No_precision */0,
                              /* String_literal */Block.__(11, [
                                  " Unexpected character token ",
                                  /* Caml_string */Block.__(3, [
                                      /* No_padding */0,
                                      /* Char_literal */Block.__(12, [
                                          /* "\n" */10,
                                          /* End_of_format */0
                                        ])
                                    ])
                                ])
                            ])
                        ])
                    ]),
                  "%d:%d Unexpected character token %S\n"
                ]), line, col, Bytes.to_string(str));
        return Pervasives.exit(127);
      } else {
        Curry._3(Printf.eprintf(/* Format */[
                  /* Int */Block.__(4, [
                      /* Int_d */0,
                      /* No_padding */0,
                      /* No_precision */0,
                      /* Char_literal */Block.__(12, [
                          /* ":" */58,
                          /* Int */Block.__(4, [
                              /* Int_d */0,
                              /* No_padding */0,
                              /* No_precision */0,
                              /* Char_literal */Block.__(12, [
                                  /* " " */32,
                                  /* String */Block.__(2, [
                                      /* No_padding */0,
                                      /* Char_literal */Block.__(12, [
                                          /* "\n" */10,
                                          /* End_of_format */0
                                        ])
                                    ])
                                ])
                            ])
                        ])
                    ]),
                  "%d:%d %s\n"
                ]), line, col, Printexc.to_string(exn$1));
        return Pervasives.exit(127);
      }
    } else {
      throw exn;
    }
  }
}

exports.UnitMonad = UnitMonad;
exports.Decoder = Decoder;
exports.Input = Input;
exports.Encoding = Encoding;
exports.LocatedStream = LocatedStream;
exports.XmlStanza = XmlStanza;
exports.LS = LS;
exports.M = M;
exports.X = X;
exports.parse_document = parse_document;
/* LS Not a pure module */

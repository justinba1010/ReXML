'use strict';

var Char = require("bs-platform/lib/js/char.js");
var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Bytes = require("bs-platform/lib/js/bytes.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Stack = require("bs-platform/lib/js/stack.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Printf = require("bs-platform/lib/js/printf.js");
var $$String = require("bs-platform/lib/js/string.js");
var Hashtbl = require("bs-platform/lib/js/hashtbl.js");
var Xml$Xml = require("./xml.bs.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Printexc = require("bs-platform/lib/js/printexc.js");
var Caml_bytes = require("bs-platform/lib/js/caml_bytes.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Xmllexer_generic$Xml = require("./xmllexer_generic.bs.js");

var empty_chunk_000 = /* buf */[];

var empty_chunk = /* record */[
  empty_chunk_000,
  /* i */0,
  /* len */0
];

var empty_stream = /* Chunk */[empty_chunk];

function is_empty(s) {
  return s[/* i */1] === s[/* len */2];
}

function $$return(x) {
  return /* Return */Block.__(0, [
            x,
            empty_stream
          ]);
}

function fail(prim) {
  throw prim;
}

function bind(v, f) {
  if (v.tag) {
    var k = v[0];
    return /* Continue */Block.__(1, [(function (stream) {
                  return bind(Curry._1(k, stream), f);
                })]);
  } else {
    var s = v[1];
    var match = Curry._1(f, v[0]);
    if (match.tag) {
      return Curry._1(match[0], s);
    } else {
      return /* Return */Block.__(0, [
                match[0],
                s
              ]);
    }
  }
}

var get = [];

Caml_obj.caml_update_dummy(get, /* Continue */Block.__(1, [(function (param) {
            if (param) {
              var s = param[0];
              if (s[/* i */1] < s[/* len */2]) {
                return /* Return */Block.__(0, [
                          Caml_bytes.get(s[/* buf */0], s[/* i */1]),
                          /* Chunk */[/* record */[
                              /* buf */s[/* buf */0],
                              /* i */s[/* i */1] + 1 | 0,
                              /* len */s[/* len */2]
                            ]]
                        ]);
              } else {
                return get;
              }
            } else {
              return /* Return */Block.__(0, [
                        undefined,
                        /* EOF */0
                      ]);
            }
          })]));

var IterMonad = /* module */[
  /* empty_chunk */empty_chunk,
  /* empty_stream */empty_stream,
  /* is_empty */is_empty,
  /* return */$$return,
  /* fail */fail,
  /* bind */bind,
  /* >>= */bind,
  /* get */get
];

function Decoder(I) {
  var IllegalCharacter = Caml_exceptions.create("XmllexerI-Xml.Decoder(I).IllegalCharacter");
  var decode_utf8 = Curry._2(I[/* >>= */0], I[/* get */3], (function (param) {
          if (param !== undefined) {
            var ch1 = param;
            if (ch1 >= 192) {
              if (ch1 >= 240) {
                if (ch1 >= 248) {
                  return Curry._1(I[/* fail */2], IllegalCharacter);
                } else {
                  return Curry._2(I[/* >>= */0], I[/* get */3], (function (param) {
                                if (param !== undefined) {
                                  var ch2 = param;
                                  return Curry._2(I[/* >>= */0], I[/* get */3], (function (param) {
                                                if (param !== undefined) {
                                                  var ch3 = param;
                                                  return Curry._2(I[/* >>= */0], I[/* get */3], (function (param) {
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
                return Curry._2(I[/* >>= */0], I[/* get */3], (function (param) {
                              if (param !== undefined) {
                                var ch2 = param;
                                return Curry._2(I[/* >>= */0], I[/* get */3], (function (param) {
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
                return Curry._2(I[/* >>= */0], I[/* get */3], (function (param) {
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
  return /* module */[
          /* IllegalCharacter */IllegalCharacter,
          /* decode_utf8 */decode_utf8
        ];
}

var IllegalCharacter = Caml_exceptions.create("XmllexerI-Xml.Decoder(I).IllegalCharacter");

var decode_utf8 = bind(get, (function (param) {
        if (param !== undefined) {
          var ch1 = param;
          if (ch1 >= 192) {
            if (ch1 >= 240) {
              if (ch1 >= 248) {
                throw IllegalCharacter;
              } else {
                return bind(get, (function (param) {
                              if (param !== undefined) {
                                var ch2 = param;
                                return bind(get, (function (param) {
                                              if (param !== undefined) {
                                                var ch3 = param;
                                                return bind(get, (function (param) {
                                                              if (param !== undefined) {
                                                                var ch4 = param;
                                                                if ((ch2 >>> 6) !== 2 || (ch3 >>> 6) !== 2 || (ch4 >>> 6) !== 2) {
                                                                  throw IllegalCharacter;
                                                                } else {
                                                                  return /* Return */Block.__(0, [
                                                                            ((ch1 & 7) << 18) | ((ch2 & 63) << 12) | ((ch3 & 63) << 6) | ch4 & 63,
                                                                            empty_stream
                                                                          ]);
                                                                }
                                                              } else {
                                                                throw IllegalCharacter;
                                                              }
                                                            }));
                                              } else {
                                                throw IllegalCharacter;
                                              }
                                            }));
                              } else {
                                throw IllegalCharacter;
                              }
                            }));
              }
            } else if (ch1 >= 224) {
              return bind(get, (function (param) {
                            if (param !== undefined) {
                              var ch2 = param;
                              return bind(get, (function (param) {
                                            if (param !== undefined) {
                                              var ch3 = param;
                                              if ((ch2 >>> 6) !== 2 || (ch3 >>> 6) !== 2) {
                                                throw IllegalCharacter;
                                              } else {
                                                var code = ((ch1 & 15) << 12) | ((ch2 & 63) << 6) | ch3 & 63;
                                                if (code >= 55296 && code <= 57088) {
                                                  throw IllegalCharacter;
                                                } else {
                                                  return /* Return */Block.__(0, [
                                                            code,
                                                            empty_stream
                                                          ]);
                                                }
                                              }
                                            } else {
                                              throw IllegalCharacter;
                                            }
                                          }));
                            } else {
                              throw IllegalCharacter;
                            }
                          }));
            } else {
              return bind(get, (function (param) {
                            if (param !== undefined) {
                              var ch2 = param;
                              if ((ch2 >>> 6) !== 2) {
                                throw IllegalCharacter;
                              } else {
                                var code = ((ch1 & 31) << 6) | ch2 & 63;
                                return /* Return */Block.__(0, [
                                          code,
                                          empty_stream
                                        ]);
                              }
                            } else {
                              throw IllegalCharacter;
                            }
                          }));
            }
          } else if (ch1 >= 128) {
            throw IllegalCharacter;
          } else {
            return /* Return */Block.__(0, [
                      ch1,
                      empty_stream
                    ]);
          }
        } else {
          return /* Return */Block.__(0, [
                    undefined,
                    empty_stream
                  ]);
        }
      }));

var D = /* module */[
  /* IllegalCharacter */IllegalCharacter,
  /* decode_utf8 */decode_utf8
];

var UnknownEncoding = Caml_exceptions.create("XmllexerI-Xml.Input.UnknownEncoding");

function make_decoder(encname) {
  if (encname === "UTF-8") {
    return decode_utf8;
  } else {
    throw UnknownEncoding;
  }
}

var Input = /* module */[
  /* D */D,
  /* UnknownEncoding */UnknownEncoding,
  /* make_decoder */make_decoder
];

var IllegalCharacter$1 = Caml_exceptions.create("XmllexerI-Xml.Encoding.IllegalCharacter");

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
      throw IllegalCharacter$1;
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
    throw IllegalCharacter$1;
  }
  return List.map(Char.chr, bytes);
}

var Encoding = /* module */[
  /* IllegalCharacter */IllegalCharacter$1,
  /* encode_unicode */encode_unicode
];

var Located_exn = Caml_exceptions.create("XmllexerI-Xml.LocatedStream.Located_exn");

function set_decoder(encname, strm) {
  var decoder = make_decoder(encname);
  strm[/* decoder */2] = decoder;
  return /* () */0;
}

function make_stream(param) {
  return /* record */[
          /* line */0,
          /* col */0,
          /* decoder */make_decoder("UTF-8")
        ];
}

function error(stream, exn) {
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
}

function next_char(strm, eof, f) {
  return bind(strm[/* decoder */2], (function (param) {
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
}

var LocatedStream = /* module */[
  /* empty_chunk */empty_chunk,
  /* empty_stream */empty_stream,
  /* is_empty */is_empty,
  /* return */$$return,
  /* fail */fail,
  /* bind */bind,
  /* >>= */bind,
  /* get */get,
  /* Located_exn */Located_exn,
  /* set_decoder */set_decoder,
  /* make_stream */make_stream,
  /* error */error,
  /* next_char */next_char
];

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

function emit_start_tag(name, attrs, selfclosing) {
  return /* Return */Block.__(0, [
            /* StartTag */Block.__(0, [
                name,
                attrs,
                selfclosing
              ]),
            empty_stream
          ]);
}

function emit_end_tag(name) {
  return /* Return */Block.__(0, [
            /* EndTag */Block.__(1, [name]),
            empty_stream
          ]);
}

function emit_doctype(doctype) {
  return /* Return */Block.__(0, [
            /* Doctype */Block.__(2, [doctype]),
            empty_stream
          ]);
}

function emit_pi(target, data) {
  return /* Return */Block.__(0, [
            /* PI */Block.__(3, [
                target,
                data
              ]),
            empty_stream
          ]);
}

function emit_text(text) {
  return /* Return */Block.__(0, [
            /* Text */Block.__(4, [text]),
            empty_stream
          ]);
}

function emit_eof(param) {
  return /* Return */Block.__(0, [
            undefined,
            empty_stream
          ]);
}

var X = /* module */[
  /* emit_start_tag */emit_start_tag,
  /* emit_end_tag */emit_end_tag,
  /* emit_doctype */emit_doctype,
  /* emit_pi */emit_pi,
  /* emit_text */emit_text,
  /* emit_eof */emit_eof
];

var M = Xmllexer_generic$Xml.Make([
          $$return,
          bind,
          fail,
          set_decoder,
          next_char,
          error
        ])([encode_unicode])([
      emit_pi,
      emit_start_tag,
      emit_end_tag,
      emit_doctype,
      emit_text,
      emit_eof
    ]);

function parse_document(inc) {
  var stream = make_stream(/* () */0);
  var buf = Caml_string.caml_create_string(8192);
  var next_token = Curry._1(M[/* make_lexer */48], stream);
  var namespaces = Hashtbl.create(undefined, 1);
  Hashtbl.add(namespaces, "xml", Xml$Xml.ns_xml);
  var stack = Stack.create(/* () */0);
  var stack_ns = Stack.create(/* () */0);
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
  var process_token = function (param) {
    switch (param.tag | 0) {
      case 0 : 
          var match = Xml$Xml.parse_element_head(namespaces, param[0], param[1]);
          var lnss = match[1];
          var el_000 = match[0];
          var el_001 = match[2];
          var el = /* tuple */[
            el_000,
            el_001,
            /* [] */0
          ];
          if (param[2]) {
            Xml$Xml.remove_namespaces(namespaces, lnss);
            if (Stack.is_empty(stack)) {
              Stack.push(el, stack);
              return Curry._1(next_token, /* () */0);
            } else {
              add_element(/* Xmlelement */Block.__(0, [el]));
              Xml$Xml.remove_namespaces(namespaces, lnss);
              return Curry._1(next_token, /* () */0);
            }
          } else {
            Stack.push(el, stack);
            Stack.push(lnss, stack_ns);
            return Curry._1(next_token, /* () */0);
          }
      case 1 : 
          var lnss$1 = Stack.pop(stack_ns);
          Xml$Xml.remove_namespaces(namespaces, lnss$1);
          if (Stack.length(stack) > 1) {
            var match$1 = Stack.pop(stack);
            add_element(/* Xmlelement */Block.__(0, [/* tuple */[
                      match$1[0],
                      match$1[1],
                      List.rev(match$1[2])
                    ]]));
            return Curry._1(next_token, /* () */0);
          } else {
            return Curry._1(next_token, /* () */0);
          }
      case 2 : 
      case 3 : 
          return Curry._1(next_token, /* () */0);
      case 4 : 
          add_element(/* Xmlcdata */Block.__(1, [param[0]]));
          return Curry._1(next_token, /* () */0);
      
    }
  };
  var loop = function (_v, _inp) {
    while(true) {
      var inp = _inp;
      var v = _v;
      if (v.tag) {
        var _f = v[0];
        var _rest = inp;
        while(true) {
          var rest = _rest;
          var f = _f;
          var stream;
          if (rest) {
            var s = rest[0];
            if (is_empty(s)) {
              var size = Pervasives.input(inc, buf, 0, 8192);
              if (size === 0) {
                stream = /* EOF */0;
              } else {
                var str = size < 8192 ? Bytes.sub(buf, 0, size) : buf;
                stream = /* Chunk */[/* record */[
                    /* buf */str,
                    /* i */0,
                    /* len */size
                  ]];
              }
            } else {
              stream = /* Chunk */[s];
            }
          } else {
            stream = /* EOF */0;
          }
          var match = Curry._1(f, stream);
          if (match.tag) {
            _rest = empty_stream;
            _f = match[0];
            continue ;
          } else {
            var match$1 = match[0];
            if (match$1 !== undefined) {
              return loop(process_token(match$1), match[1]);
            } else {
              return /* () */0;
            }
          }
        };
      } else {
        var match$2 = v[0];
        if (match$2 !== undefined) {
          _inp = v[1];
          _v = process_token(match$2);
          continue ;
        } else {
          return /* () */0;
        }
      }
    };
  };
  try {
    loop(Curry._1(next_token, /* () */0), empty_stream);
    var match = Stack.pop(stack);
    return /* Xmlelement */Block.__(0, [/* tuple */[
                match[0],
                match[1],
                List.rev(match[2])
              ]]);
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Located_exn) {
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

exports.IterMonad = IterMonad;
exports.Decoder = Decoder;
exports.Input = Input;
exports.Encoding = Encoding;
exports.LocatedStream = LocatedStream;
exports.XmlStanza = XmlStanza;
exports.X = X;
exports.M = M;
exports.parse_document = parse_document;
/* decode_utf8 Not a pure module */

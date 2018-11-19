'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Bytes = require("bs-platform/lib/js/bytes.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Stack = require("bs-platform/lib/js/stack.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Printf = require("bs-platform/lib/js/printf.js");
var Stream = require("bs-platform/lib/js/stream.js");
var $$String = require("bs-platform/lib/js/string.js");
var Printexc = require("bs-platform/lib/js/printexc.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Xmllexer$Xml = require("./xmllexer.bs.js");
var Xml_decode$Xml = require("./xml_decode.bs.js");
var Xml_encode$Xml = require("./xml_encode.bs.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var NonXmlelement = Caml_exceptions.create("Light_xml-Xml.NonXmlelement");

var Expected = Caml_exceptions.create("Light_xml-Xml.Expected");

function attrs_to_string(attrs) {
  var attr_to_string = function (attr) {
    return Curry._2(Printf.sprintf(/* Format */[
                    /* Char_literal */Block.__(12, [
                        /* " " */32,
                        /* String */Block.__(2, [
                            /* No_padding */0,
                            /* String_literal */Block.__(11, [
                                "='",
                                /* String */Block.__(2, [
                                    /* No_padding */0,
                                    /* Char_literal */Block.__(12, [
                                        /* "'" */39,
                                        /* End_of_format */0
                                      ])
                                  ])
                              ])
                          ])
                      ]),
                    " %s='%s'"
                  ]), attr[0], Xml_encode$Xml.encode(attr[1]));
  };
  return List.fold_left((function (prim, prim$1) {
                return prim + prim$1;
              }), "", List.map(attr_to_string, attrs));
}

function element_to_string(el) {
  if (el.tag) {
    return Xml_encode$Xml.encode(el[0]);
  } else {
    var match = el[0];
    var els = match[2];
    var attrs = match[1];
    var name = match[0];
    if (List.length(els) > 0) {
      return Curry._1(Printf.sprintf(/* Format */[
                      /* Char_literal */Block.__(12, [
                          /* "<" */60,
                          /* String */Block.__(2, [
                              /* No_padding */0,
                              /* End_of_format */0
                            ])
                        ]),
                      "<%s"
                    ]), name) + (attrs_to_string(attrs) + (">" + (List.fold_left((function (prim, prim$1) {
                          return prim + prim$1;
                        }), "", List.map(element_to_string, els)) + Curry._1(Printf.sprintf(/* Format */[
                            /* String_literal */Block.__(11, [
                                "</",
                                /* String */Block.__(2, [
                                    /* No_padding */0,
                                    /* Char_literal */Block.__(12, [
                                        /* ">" */62,
                                        /* End_of_format */0
                                      ])
                                  ])
                              ]),
                            "</%s>"
                          ]), name))));
    } else {
      return Curry._1(Printf.sprintf(/* Format */[
                      /* Char_literal */Block.__(12, [
                          /* "<" */60,
                          /* String */Block.__(2, [
                              /* No_padding */0,
                              /* End_of_format */0
                            ])
                        ]),
                      "<%s"
                    ]), name) + (attrs_to_string(attrs) + "/>");
    }
  }
}

function get_tag(_el, _path) {
  while(true) {
    var path = _path;
    var el = _el;
    if (el.tag) {
      throw NonXmlelement;
    } else if (path === /* [] */0) {
      return el;
    } else {
      var name = List.hd(path);
      var ctag = List.find((function(name){
          return function (param) {
            if (param.tag) {
              return false;
            } else {
              return name === param[0][0];
            }
          }
          }(name)), el[0][2]);
      _path = List.tl(path);
      _el = ctag;
      continue ;
    }
  };
}

function get_tag_full_path(el, path) {
  if (el.tag) {
    throw NonXmlelement;
  } else if (el[0][0] === List.hd(path)) {
    return get_tag(el, List.tl(path));
  } else {
    throw Caml_builtin_exceptions.not_found;
  }
}

function get_subel($staropt$star, el) {
  var path = $staropt$star !== undefined ? $staropt$star : /* [] */0;
  var match = get_tag(el, path);
  if (match.tag) {
    throw NonXmlelement;
  } else {
    return List.find((function (param) {
                  if (param.tag) {
                    return false;
                  } else {
                    return true;
                  }
                }), match[0][2]);
  }
}

function get_subels($staropt$star, $staropt$star$1, el) {
  var path = $staropt$star !== undefined ? $staropt$star : /* [] */0;
  var tag = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  var match = get_tag(el, path);
  if (match.tag) {
    throw NonXmlelement;
  } else {
    var els = match[0][2];
    if (tag === "") {
      return els;
    } else if (els === /* [] */0) {
      return /* [] */0;
    } else {
      return List.find_all((function (x) {
                      if (x.tag) {
                        return false;
                      } else {
                        return x[0][0] === tag;
                      }
                    }))(els);
    }
  }
}

function get_attr_s(el, $staropt$star, attrname) {
  var path = $staropt$star !== undefined ? $staropt$star : /* [] */0;
  var match = get_tag(el, path);
  if (match.tag) {
    throw NonXmlelement;
  } else {
    return List.assoc(attrname, match[0][1]);
  }
}

function filter_attrs(attrs) {
  var checker = function (param) {
    return param[1] !== "";
  };
  return List.filter(checker)(attrs);
}

function collect_cdata(_els, _acc) {
  while(true) {
    var acc = _acc;
    var els = _els;
    if (els) {
      var match = els[0];
      if (match.tag) {
        _acc = /* :: */[
          match[0],
          acc
        ];
        _els = els[1];
        continue ;
      } else {
        _els = els[1];
        continue ;
      }
    } else {
      return $$String.concat("", List.rev(acc));
    }
  };
}

function get_cdata($staropt$star, el) {
  var path = $staropt$star !== undefined ? $staropt$star : /* [] */0;
  var match = get_tag(el, path);
  if (match.tag) {
    throw NonXmlelement;
  } else {
    return collect_cdata(match[0][2], /* [] */0);
  }
}

function make_element(name, attrs, els) {
  return /* Xmlelement */Block.__(0, [/* tuple */[
              name,
              attrs,
              els
            ]]);
}

function make_simple_cdata(name, cdata) {
  return /* Xmlelement */Block.__(0, [/* tuple */[
              name,
              /* [] */0,
              /* :: */[
                /* Xmlcdata */Block.__(1, [cdata]),
                /* [] */0
              ]
            ]]);
}

function safe_get_attr_s(xml, $staropt$star, attrname) {
  var path = $staropt$star !== undefined ? $staropt$star : /* [] */0;
  try {
    return get_attr_s(xml, path, attrname);
  }
  catch (exn){
    return "";
  }
}

function match_tag(tag, element) {
  var b;
  b = element.tag ? false : element[0][0] === tag;
  if (b) {
    return 0;
  } else {
    throw [
          Expected,
          tag
        ];
  }
}

function exists_element(tag, els) {
  return List.exists((function (param) {
                if (param.tag) {
                  return false;
                } else {
                  return param[0][0] === tag;
                }
              }), els);
}

function find_subtag(subels, tag) {
  return List.find((function (param) {
                if (param.tag) {
                  return false;
                } else {
                  return param[0][0] === tag;
                }
              }), subels);
}

function get_tagname(el) {
  if (el.tag) {
    throw NonXmlelement;
  } else {
    return el[0][0];
  }
}

function match_xml(el, tag, attrs) {
  if (el.tag || el[0][0] !== tag) {
    return false;
  } else {
    try {
      List.iter((function (param) {
              if (get_attr_s(el, undefined, param[0]) !== param[1]) {
                throw Caml_builtin_exceptions.not_found;
              } else {
                return 0;
              }
            }), attrs);
      return true;
    }
    catch (exn){
      return false;
    }
  }
}

function mem_xml(xml, path, tag, attrs) {
  if (get_tagname(xml) !== List.hd(path)) {
    return false;
  } else {
    try {
      var els = get_subels(List.tl(path), tag, xml);
      return List.exists((function (el) {
                    try {
                      List.iter((function (param) {
                              if (get_attr_s(el, undefined, param[0]) !== param[1]) {
                                throw Caml_builtin_exceptions.not_found;
                              } else {
                                return 0;
                              }
                            }), attrs);
                      return true;
                    }
                    catch (exn){
                      return false;
                    }
                  }), els);
    }
    catch (exn){
      return false;
    }
  }
}

function get_by_xmlns(xml, path, tag, xmlns) {
  var els = get_subels(path, tag, xml);
  return List.find((function (x) {
                return safe_get_attr_s(x, undefined, "xmlns") === xmlns;
              }), els);
}

var X = Xmllexer$Xml.XmlStanza([
      Xmllexer$Xml.UnitMonad[0],
      Xmllexer$Xml.UnitMonad[2],
      Xmllexer$Xml.UnitMonad[1]
    ]);

var $$let = Xmllexer$Xml.Input([
      Xmllexer$Xml.UnitMonad[0],
      Xmllexer$Xml.UnitMonad[2],
      Xmllexer$Xml.UnitMonad[1]
    ]);

var S = Xmllexer$Xml.LocatedStream([
        Xmllexer$Xml.UnitMonad[0],
        Xmllexer$Xml.UnitMonad[2],
        Xmllexer$Xml.UnitMonad[1]
      ])([$$let[3]]);

function parse(next_token) {
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
              var el_000 = t[0];
              var el_001 = t[1];
              var el = /* tuple */[
                el_000,
                el_001,
                /* [] */0
              ];
              if (t[2]) {
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
                _param = /* () */0;
                continue ;
              }
          case 1 : 
              if (Stack.length(stack) > 1) {
                var match$1 = Stack.pop(stack);
                add_element(/* Xmlelement */Block.__(0, [/* tuple */[
                          match$1[0],
                          List.rev(match$1[1]),
                          List.rev(match$1[2])
                        ]]));
                _param = /* () */0;
                continue ;
              } else {
                _param = /* () */0;
                continue ;
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
  loop(/* () */0);
  var match = Stack.pop(stack);
  return /* Xmlelement */Block.__(0, [/* tuple */[
              match[0],
              List.rev(match[1]),
              List.rev(match[2])
            ]]);
}

function parse_stream(strm) {
  var strm$1 = Curry._1(Xmllexer$Xml.LS[/* make_stream */5], strm);
  var next_token = Curry._1(Xmllexer$Xml.M[/* make_lexer */48], strm$1);
  try {
    return parse(next_token);
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === S[/* Located_exn */3]) {
      var exn$1 = exn[2];
      var match = exn[1];
      var col = match[1];
      var line = match[0];
      if (exn$1[0] === Xmllexer$Xml.M[/* Exn_msg */3]) {
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
      } else if (exn$1[0] === Xmllexer$Xml.M[/* Exn_ExpectedChar */5]) {
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
      } else if (exn$1[0] === Xmllexer$Xml.M[/* Exn_CharToken */7]) {
        var chs = Curry._1(Xmllexer$Xml.M[/* E */0][/* encode_unicode */0], exn$1[1]);
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

function parse_string(str) {
  return parse_stream(Stream.of_string(str));
}

function parse_document(f) {
  return parse_stream(Stream.of_channel(f));
}

function string_of_attr(param) {
  return param[0] + ("='" + (Xml_encode$Xml.encode(param[1]) + "'"));
}

function string_of_list(f, sep, param) {
  if (param) {
    var xs = param[1];
    var x = param[0];
    if (xs) {
      return List.fold_left((function (res, x) {
                    return res + (sep + Curry._1(f, x));
                  }), Curry._1(f, x), xs);
    } else {
      return Curry._1(f, x);
    }
  } else {
    return "";
  }
}

function aux_serialize(out, param) {
  if (param.tag) {
    return Curry._1(out, Xml_encode$Xml.encode(param[0]));
  } else {
    var match = param[0];
    var children = match[2];
    var attrs = match[1];
    var name = match[0];
    Curry._1(out, "<");
    Curry._1(out, name);
    if (attrs !== /* [] */0) {
      Curry._1(out, " ");
      Curry._1(out, string_of_list(string_of_attr, " ", attrs));
    }
    if (children === /* [] */0) {
      return Curry._1(out, "/>");
    } else {
      Curry._1(out, ">");
      List.iter((function (param) {
              return aux_serialize(out, param);
            }), children);
      Curry._1(out, "</");
      Curry._1(out, name);
      return Curry._1(out, ">");
    }
  }
}

var serialize_document = aux_serialize;

var Serialization = /* module */[
  /* string_of_attr */string_of_attr,
  /* string_of_list */string_of_list,
  /* aux_serialize */aux_serialize,
  /* serialize_document */serialize_document
];

var decode = Xml_decode$Xml.decode;

var encode = Xml_encode$Xml.encode;

var XmlParser = 0;

exports.NonXmlelement = NonXmlelement;
exports.Expected = Expected;
exports.decode = decode;
exports.encode = encode;
exports.attrs_to_string = attrs_to_string;
exports.element_to_string = element_to_string;
exports.get_tag = get_tag;
exports.get_tag_full_path = get_tag_full_path;
exports.get_subel = get_subel;
exports.get_subels = get_subels;
exports.get_attr_s = get_attr_s;
exports.filter_attrs = filter_attrs;
exports.collect_cdata = collect_cdata;
exports.get_cdata = get_cdata;
exports.make_element = make_element;
exports.make_simple_cdata = make_simple_cdata;
exports.safe_get_attr_s = safe_get_attr_s;
exports.match_tag = match_tag;
exports.exists_element = exists_element;
exports.find_subtag = find_subtag;
exports.get_tagname = get_tagname;
exports.match_xml = match_xml;
exports.mem_xml = mem_xml;
exports.get_by_xmlns = get_by_xmlns;
exports.XmlParser = XmlParser;
exports.X = X;
exports.S = S;
exports.parse = parse;
exports.parse_stream = parse_stream;
exports.parse_string = parse_string;
exports.parse_document = parse_document;
exports.Serialization = Serialization;
/* X Not a pure module */

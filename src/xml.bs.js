'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Printf = require("bs-platform/lib/js/printf.js");
var $$String = require("bs-platform/lib/js/string.js");
var Hashtbl = require("bs-platform/lib/js/hashtbl.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Xml_decode$Xml = require("./xml_decode.bs.js");
var Xml_encode$Xml = require("./xml_encode.bs.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var NonXmlelement = Caml_exceptions.create("Xml-Xml.NonXmlelement");

var InvalidNS = Caml_exceptions.create("Xml-Xml.InvalidNS");

var ns_xml = "http://www.w3.org/XML/1998/namespace";

function get_default_nss(t) {
  return t[/* default_nss */1];
}

function bind_prefix(t, prefix, namespace) {
  if (namespace !== undefined) {
    return Hashtbl.add(t[/* bindings */2], namespace, prefix);
  } else {
    throw InvalidNS;
  }
}

function create(default_nss) {
  var bindings = Hashtbl.create(undefined, 5);
  var t = /* record */[
    /* tmp_prefix */0,
    /* default_nss */default_nss,
    /* bindings */bindings
  ];
  bind_prefix(t, "xml", ns_xml);
  return t;
}

function string_of_qname(t, param) {
  var name = param[1];
  var ns = param[0];
  var prefix;
  if (ns !== undefined) {
    try {
      prefix = Hashtbl.find(t[/* bindings */2], ns);
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        prefix = "";
      } else {
        throw exn;
      }
    }
  } else {
    prefix = "";
  }
  if (prefix === "") {
    return name;
  } else {
    return prefix + (":" + name);
  }
}

function string_of_attr(t, param) {
  return string_of_qname(t, param[0]) + ("='" + (Xml_encode$Xml.encode(param[1]) + "'"));
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

function local_namespaces(lnss, t, param, attrs) {
  var ns = param[0];
  var lnss$1 = List.mem(ns, lnss) || List.mem(ns, t[/* default_nss */1]) ? lnss : /* :: */[
      ns,
      lnss
    ];
  return List.fold_left((function (acc, param) {
                var ns = param[0][0];
                if (ns === undefined || Caml_obj.caml_equal(ns, ns_xml) || List.mem(ns, t[/* default_nss */1]) || List.mem(ns, lnss$1) || ns === undefined) {
                  return acc;
                } else {
                  if (!Hashtbl.mem(t[/* bindings */2], ns)) {
                    t[/* tmp_prefix */0] = t[/* tmp_prefix */0] + 1 | 0;
                    var p = "ns" + String(t[/* tmp_prefix */0]);
                    bind_prefix(t, p, ns);
                  }
                  return /* :: */[
                          ns,
                          acc
                        ];
                }
              }), lnss$1, attrs);
}

function string_of_ns(t, param) {
  if (param !== undefined) {
    var str = param;
    var prefix;
    try {
      prefix = Hashtbl.find(t[/* bindings */2], str);
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        prefix = "";
      } else {
        throw exn;
      }
    }
    if (prefix === "") {
      return "xmlns='" + (Xml_encode$Xml.encode(str) + "'");
    } else {
      return "xmlns:" + (prefix + ("='" + (Xml_encode$Xml.encode(str) + "'")));
    }
  } else {
    return "xmlns=''";
  }
}

function aux_serialize(lnss, t, out, param) {
  if (param.tag) {
    return Curry._1(out, Xml_encode$Xml.encode(param[0]));
  } else {
    var match = param[0];
    var children = match[2];
    var attrs = match[1];
    var qname = match[0];
    var lnss$1 = local_namespaces(lnss, t, qname, attrs);
    Curry._1(out, "<");
    Curry._1(out, string_of_qname(t, qname));
    if (attrs !== /* [] */0) {
      Curry._1(out, " ");
      Curry._1(out, string_of_list((function (param) {
                  return string_of_attr(t, param);
                }), " ", attrs));
    }
    if (lnss$1 !== /* [] */0) {
      Curry._1(out, " ");
      Curry._1(out, string_of_list((function (param) {
                  return string_of_ns(t, param);
                }), " ", lnss$1));
    }
    if (children === /* [] */0) {
      return Curry._1(out, "/>");
    } else {
      Curry._1(out, ">");
      var partial_arg = /* record */[
        /* tmp_prefix */t[/* tmp_prefix */0],
        /* default_nss */Pervasives.$at(lnss$1, t[/* default_nss */1]),
        /* bindings */t[/* bindings */2]
      ];
      List.iter((function (param) {
              return aux_serialize(/* [] */0, partial_arg, out, param);
            }), children);
      Curry._1(out, "</");
      Curry._1(out, string_of_qname(t, qname));
      return Curry._1(out, ">");
    }
  }
}

function serialize_document(t, out, xml) {
  return aux_serialize(t[/* default_nss */1], t, out, xml);
}

var Serialization = /* module */[
  /* get_default_nss */get_default_nss,
  /* bind_prefix */bind_prefix,
  /* create */create,
  /* string_of_qname */string_of_qname,
  /* string_of_attr */string_of_attr,
  /* string_of_list */string_of_list,
  /* local_namespaces */local_namespaces,
  /* string_of_ns */string_of_ns,
  /* aux_serialize */aux_serialize,
  /* serialize_document */serialize_document
];

function get_qname(param) {
  if (param.tag) {
    throw NonXmlelement;
  } else {
    return param[0][0];
  }
}

function get_namespace(param) {
  return param[0];
}

function get_name(param) {
  return param[1];
}

function get_attrs(ns, param) {
  if (param.tag) {
    throw NonXmlelement;
  } else {
    var attrs = param[0][1];
    if (ns !== undefined) {
      var v = Js_primitive.valFromOption(ns);
      return List.find_all((function (param) {
                      return Caml_obj.caml_equal(param[0][0], v);
                    }))(attrs);
    } else {
      return attrs;
    }
  }
}

function get_attr_value(ns, name, attrs) {
  return List.find((function (param) {
                  var qname = param[0];
                  if (ns !== undefined) {
                    return Caml_obj.caml_equal(/* tuple */[
                                Js_primitive.valFromOption(ns),
                                name
                              ], qname);
                  } else {
                    return Caml_obj.caml_equal(/* tuple */[
                                undefined,
                                name
                              ], qname);
                  }
                }), attrs)[1];
}

function safe_get_attr_value(ns, name, attrs) {
  try {
    return get_attr_value(ns, name, attrs);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return "";
    } else {
      throw exn;
    }
  }
}

function get_element(qname, childs) {
  return List.find((function (param) {
                if (param.tag) {
                  return false;
                } else {
                  return Caml_obj.caml_equal(qname, param[0][0]);
                }
              }), childs);
}

function get_elements(qname, childs) {
  return List.filter((function (param) {
                  if (param.tag) {
                    return false;
                  } else {
                    return Caml_obj.caml_equal(qname, param[0][0]);
                  }
                }))(childs);
}

function get_children(param) {
  if (param.tag) {
    throw NonXmlelement;
  } else {
    return param[0][2];
  }
}

function get_subelement(qname, el) {
  return get_element(qname, get_children(el));
}

function get_subelements(qname, el) {
  return get_elements(qname, get_children(el));
}

function get_first_element(els) {
  return List.find((function (param) {
                if (param.tag) {
                  return false;
                } else {
                  return true;
                }
              }), els);
}

function collect_cdata(els) {
  var res = List.fold_left((function (acc, param) {
          if (param.tag) {
            return /* :: */[
                    param[0],
                    acc
                  ];
          } else {
            return acc;
          }
        }), /* [] */0, els);
  return $$String.concat("", List.rev(res));
}

function get_cdata(el) {
  return collect_cdata(get_children(el));
}

function remove_cdata(els) {
  return List.filter((function (param) {
                  if (param.tag) {
                    return false;
                  } else {
                    return true;
                  }
                }))(els);
}

function make_element(qname, attrs, children) {
  return /* Xmlelement */Block.__(0, [/* tuple */[
              qname,
              attrs,
              children
            ]]);
}

function make_attr(ns, name, value) {
  var ns$1 = ns !== undefined ? Js_primitive.valFromOption(ns) : undefined;
  return /* tuple */[
          /* tuple */[
            ns$1,
            name
          ],
          value
        ];
}

function make_simple_cdata(qname, cdata) {
  return /* Xmlelement */Block.__(0, [/* tuple */[
              qname,
              /* [] */0,
              /* :: */[
                /* Xmlcdata */Block.__(1, [cdata]),
                /* [] */0
              ]
            ]]);
}

function mem_qname(qname, els) {
  return List.exists((function (param) {
                if (param.tag) {
                  return false;
                } else {
                  return Caml_obj.caml_equal(qname, param[0][0]);
                }
              }), els);
}

function mem_child(qname, el) {
  return mem_qname(qname, get_children(el));
}

function iter(f, el) {
  return List.iter(f, get_children(el));
}

function split_name(name) {
  if ($$String.contains(name, /* ":" */58)) {
    var idx = $$String.index(name, /* ":" */58);
    var prefix = $$String.sub(name, 0, idx);
    var lname = (idx + 1 | 0) > name.length ? "" : $$String.sub(name, idx + 1 | 0, name.length - (idx + 1 | 0) | 0);
    return /* tuple */[
            prefix,
            lname
          ];
  } else {
    return /* tuple */[
            "",
            name
          ];
  }
}

function split_attrs(attrs) {
  return List.fold_left((function (param, param$1) {
                var value = param$1[1];
                var attrs = param[1];
                var nss = param[0];
                var match = split_name(param$1[0]);
                var lname = match[1];
                var prefix = match[0];
                if (prefix === "" && lname === "xmlns") {
                  var ns = value === "" ? undefined : value;
                  return /* tuple */[
                          /* :: */[
                            /* tuple */[
                              ns,
                              ""
                            ],
                            nss
                          ],
                          attrs
                        ];
                } else if (prefix === "xmlns" && lname !== "") {
                  var ns$1 = value === "" ? undefined : value;
                  return /* tuple */[
                          /* :: */[
                            /* tuple */[
                              ns$1,
                              lname
                            ],
                            nss
                          ],
                          attrs
                        ];
                } else {
                  return /* tuple */[
                          nss,
                          /* :: */[
                            /* tuple */[
                              /* tuple */[
                                prefix,
                                lname
                              ],
                              value
                            ],
                            attrs
                          ]
                        ];
                }
              }), /* tuple */[
              /* [] */0,
              /* [] */0
            ], attrs);
}

function add_namespaces(namespaces, nss) {
  return List.iter((function (param) {
                return Hashtbl.add(namespaces, param[1], param[0]);
              }), nss);
}

function remove_namespaces(namespaces, nss) {
  return List.iter((function (param) {
                return Hashtbl.remove(namespaces, param[1]);
              }), nss);
}

function parse_qname(nss, param) {
  var lname = param[1];
  try {
    var namespace = Hashtbl.find(nss, param[0]);
    return /* tuple */[
            namespace,
            lname
          ];
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return /* tuple */[
              undefined,
              lname
            ];
    } else {
      throw exn;
    }
  }
}

function parse_qname_attribute(nss, param) {
  var lname = param[1];
  var prefix = param[0];
  if (prefix === "") {
    return /* tuple */[
            undefined,
            lname
          ];
  } else {
    try {
      var ns = Hashtbl.find(nss, prefix);
      return /* tuple */[
              ns,
              lname
            ];
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        return /* tuple */[
                undefined,
                lname
              ];
      } else {
        throw exn;
      }
    }
  }
}

function parse_attrs(nss, attrs) {
  return List.map((function (param) {
                return /* tuple */[
                        parse_qname_attribute(nss, param[0]),
                        param[1]
                      ];
              }), attrs);
}

function parse_element_head(namespaces, name, attrs) {
  var match = split_attrs(attrs);
  var lnss = match[0];
  add_namespaces(namespaces, lnss);
  var qname = parse_qname(namespaces, split_name(name));
  var attrs$1 = parse_attrs(namespaces, match[1]);
  return /* tuple */[
          qname,
          lnss,
          attrs$1
        ];
}

function string_of_tag(param) {
  var ns = param[0];
  var prefix = ns !== undefined ? "URI " + ns : "";
  return Curry._2(Printf.sprintf(/* Format */[
                  /* Char_literal */Block.__(12, [
                      /* "(" */40,
                      /* Caml_string */Block.__(3, [
                          /* No_padding */0,
                          /* String_literal */Block.__(11, [
                              ") ",
                              /* String */Block.__(2, [
                                  /* No_padding */0,
                                  /* End_of_format */0
                                ])
                            ])
                        ])
                    ]),
                  "(%S) %s"
                ]), prefix, param[1]);
}

var no_ns = undefined;

var encode = Xml_encode$Xml.encode;

var decode = Xml_decode$Xml.decode;

exports.NonXmlelement = NonXmlelement;
exports.InvalidNS = InvalidNS;
exports.ns_xml = ns_xml;
exports.no_ns = no_ns;
exports.encode = encode;
exports.decode = decode;
exports.Serialization = Serialization;
exports.get_qname = get_qname;
exports.get_namespace = get_namespace;
exports.get_name = get_name;
exports.get_attrs = get_attrs;
exports.get_attr_value = get_attr_value;
exports.safe_get_attr_value = safe_get_attr_value;
exports.get_element = get_element;
exports.get_elements = get_elements;
exports.get_children = get_children;
exports.get_subelement = get_subelement;
exports.get_subelements = get_subelements;
exports.get_first_element = get_first_element;
exports.collect_cdata = collect_cdata;
exports.get_cdata = get_cdata;
exports.remove_cdata = remove_cdata;
exports.make_element = make_element;
exports.make_attr = make_attr;
exports.make_simple_cdata = make_simple_cdata;
exports.mem_qname = mem_qname;
exports.mem_child = mem_child;
exports.iter = iter;
exports.split_name = split_name;
exports.split_attrs = split_attrs;
exports.add_namespaces = add_namespaces;
exports.remove_namespaces = remove_namespaces;
exports.parse_qname = parse_qname;
exports.parse_qname_attribute = parse_qname_attribute;
exports.parse_attrs = parse_attrs;
exports.parse_element_head = parse_element_head;
exports.string_of_tag = string_of_tag;
/* No side effect */

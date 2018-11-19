'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Stack = require("bs-platform/lib/js/stack.js");
var $$Buffer = require("bs-platform/lib/js/buffer.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

function char_range(c, r1, r2) {
  if (Caml_obj.caml_greaterequal(c, r1)) {
    return Caml_obj.caml_lessequal(c, r2);
  } else {
    return false;
  }
}

var one_of = List.mem;

function is_space(u) {
  if (u === 32 || u === 10 || u === 9) {
    return true;
  } else {
    return u === 13;
  }
}

function is_name_start_char(u) {
  if (char_range(u, 97, 122) || u === 58 || u === 95 || char_range(u, 65, 90) || char_range(u, 192, 214) || char_range(u, 216, 246) || char_range(u, 248, 767) || char_range(u, 880, 893) || char_range(u, 895, 8191) || char_range(u, 8204, 8205) || char_range(u, 8304, 8591) || char_range(u, 11264, 12271) || char_range(u, 12289, 55295) || char_range(u, 63744, 64975) || char_range(u, 65008, 65533)) {
    return true;
  } else {
    return char_range(u, 65536, 983039);
  }
}

function is_name_char(u) {
  if (is_name_start_char(u) || u === 45 || u === 46 || char_range(u, 48, 57) || char_range(u, 768, 879)) {
    return true;
  } else {
    return char_range(u, 8255, 8256);
  }
}

var XName = /* module */[
  /* is_name_start_char */is_name_start_char,
  /* is_name_char */is_name_char
];

function Make(S) {
  return (function (E) {
      return (function (X) {
          var Exn_msg = Caml_exceptions.create("Xmllexer_generic-Xml.Make(S)(E)(X).Exn_msg");
          var Exn_EOF = Caml_exceptions.create("Xmllexer_generic-Xml.Make(S)(E)(X).Exn_EOF");
          var Exn_ExpectedChar = Caml_exceptions.create("Xmllexer_generic-Xml.Make(S)(E)(X).Exn_ExpectedChar");
          var Exn_ExpectedSpace = Caml_exceptions.create("Xmllexer_generic-Xml.Make(S)(E)(X).Exn_ExpectedSpace");
          var Exn_CharToken = Caml_exceptions.create("Xmllexer_generic-Xml.Make(S)(E)(X).Exn_CharToken");
          var Error_XMLDecl = Caml_exceptions.create("Xmllexer_generic-Xml.Make(S)(E)(X).Error_XMLDecl");
          var not_eof = function (param) {
            return Curry._2(S[/* error */5], undefined, Exn_EOF);
          };
          var add_chars = function (state, _param) {
            while(true) {
              var param = _param;
              if (param) {
                $$Buffer.add_char(state[/* tmp_buffer */0], param[0]);
                _param = param[1];
                continue ;
              } else {
                return /* () */0;
              }
            };
          };
          var extract_buffer = function (state) {
            var value = $$Buffer.contents(state[/* tmp_buffer */0]);
            $$Buffer.reset(state[/* tmp_buffer */0]);
            return value;
          };
          var consume_sequence = function (strm, param) {
            if (param) {
              var xs = param[1];
              var x = param[0];
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (u === x) {
                              return consume_sequence(strm, xs);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            } else {
              return Curry._1(S[/* return */0], /* () */0);
            }
          };
          var consume_space = function (strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (is_space(u)) {
                            return Curry._1(S[/* return */0], /* () */0);
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), Exn_ExpectedSpace);
                          }
                        }));
          };
          var parse_xmldecl = function (data) {
            var len = data.length;
            var i = /* record */[/* contents */0];
            var skip_space = function (_param) {
              while(true) {
                if (i[0] < len && (Caml_string.get(data, i[0]) === /* " " */32 || Caml_string.get(data, i[0]) === /* "\n" */10 || Caml_string.get(data, i[0]) === /* "\t" */9 || Caml_string.get(data, i[0]) === /* "\r" */13)) {
                  i[0] = i[0] + 1 | 0;
                  _param = /* () */0;
                  continue ;
                } else {
                  return /* () */0;
                }
              };
            };
            var get_lim = function (param) {
              if (i[0] < len && Caml_string.get(data, i[0]) === /* "\"" */34 || Caml_string.get(data, i[0]) === /* "'" */39) {
                var lim = Caml_string.get(data, i[0]);
                i[0] = i[0] + 1 | 0;
                return lim;
              } else {
                throw Error_XMLDecl;
              }
            };
            var seq = function (_param) {
              while(true) {
                var param = _param;
                if (param) {
                  if (i[0] < len && Caml_string.get(data, i[0]) === param[0]) {
                    i[0] = i[0] + 1 | 0;
                    _param = param[1];
                    continue ;
                  } else {
                    throw Error_XMLDecl;
                  }
                } else {
                  return /* () */0;
                }
              };
            };
            var get_digits = function (param) {
              var s = i[0];
              seq(/* :: */[
                    /* "1" */49,
                    /* :: */[
                      /* "." */46,
                      /* [] */0
                    ]
                  ]);
              var _param = /* () */0;
              while(true) {
                if (i[0] < len && Caml_string.get(data, i[0]) >= /* "0" */48 && Caml_string.get(data, i[0]) <= /* "9" */57) {
                  i[0] = i[0] + 1 | 0;
                  _param = /* () */0;
                  continue ;
                } else if (i[0] > s) {
                  return $$String.sub(data, s, i[0] - s | 0);
                } else {
                  throw Error_XMLDecl;
                }
              };
            };
            var get_encoding = function (param) {
              var s = i[0];
              if (i[0] < len) {
                var match = Caml_string.get(data, i[0]);
                if (match >= 91) {
                  if (match > 122 || match < 97) {
                    throw Error_XMLDecl;
                  } else {
                    i[0] = i[0] + 1 | 0;
                  }
                } else if (match >= 65) {
                  i[0] = i[0] + 1 | 0;
                } else {
                  throw Error_XMLDecl;
                }
              } else {
                throw Error_XMLDecl;
              }
              var _param = /* () */0;
              while(true) {
                if (i[0] < len) {
                  var match$1 = Caml_string.get(data, i[0]);
                  var exit = 0;
                  if (match$1 >= 65) {
                    var switcher = match$1 - 91 | 0;
                    if (switcher > 5 || switcher < 0) {
                      if (switcher >= 32) {
                        exit = 1;
                      } else {
                        i[0] = i[0] + 1 | 0;
                        _param = /* () */0;
                        continue ;
                      }
                    } else if (switcher !== 4) {
                      exit = 1;
                    } else {
                      i[0] = i[0] + 1 | 0;
                      _param = /* () */0;
                      continue ;
                    }
                  } else if (match$1 >= 48) {
                    if (match$1 >= 58) {
                      exit = 1;
                    } else {
                      i[0] = i[0] + 1 | 0;
                      _param = /* () */0;
                      continue ;
                    }
                  } else if (match$1 !== 45) {
                    exit = 1;
                  } else {
                    i[0] = i[0] + 1 | 0;
                    _param = /* () */0;
                    continue ;
                  }
                  if (exit === 1) {
                    if (s < i[0]) {
                      return $$String.sub(data, s, i[0] - s | 0);
                    } else {
                      throw Error_XMLDecl;
                    }
                  }
                  
                } else {
                  throw Error_XMLDecl;
                }
              };
            };
            var get_standalone = function (param) {
              if (i[0] < len) {
                if (Caml_string.get(data, i[0]) === /* "y" */121) {
                  i[0] = i[0] + 1 | 0;
                  seq(/* :: */[
                        /* "e" */101,
                        /* :: */[
                          /* "s" */115,
                          /* [] */0
                        ]
                      ]);
                  return "yes";
                } else if (Caml_string.get(data, i[0]) === /* "n" */110) {
                  i[0] = i[0] + 1 | 0;
                  seq(/* :: */[
                        /* "o" */111,
                        /* [] */0
                      ]);
                  return "no";
                } else {
                  throw Error_XMLDecl;
                }
              } else {
                throw Error_XMLDecl;
              }
            };
            skip_space(/* () */0);
            seq(/* :: */[
                  /* "v" */118,
                  /* :: */[
                    /* "e" */101,
                    /* :: */[
                      /* "r" */114,
                      /* :: */[
                        /* "s" */115,
                        /* :: */[
                          /* "i" */105,
                          /* :: */[
                            /* "o" */111,
                            /* :: */[
                              /* "n" */110,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]);
            skip_space(/* () */0);
            seq(/* :: */[
                  /* "=" */61,
                  /* [] */0
                ]);
            skip_space(/* () */0);
            var lim = get_lim(/* () */0);
            var version = get_digits(/* () */0);
            seq(/* :: */[
                  lim,
                  /* [] */0
                ]);
            skip_space(/* () */0);
            if (i[0] === len) {
              return /* tuple */[
                      version,
                      undefined,
                      undefined
                    ];
            } else if (i[0] < len && Caml_string.get(data, i[0]) === /* "e" */101) {
              i[0] = i[0] + 1 | 0;
              seq(/* :: */[
                    /* "n" */110,
                    /* :: */[
                      /* "c" */99,
                      /* :: */[
                        /* "o" */111,
                        /* :: */[
                          /* "d" */100,
                          /* :: */[
                            /* "i" */105,
                            /* :: */[
                              /* "n" */110,
                              /* :: */[
                                /* "g" */103,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
              skip_space(/* () */0);
              seq(/* :: */[
                    /* "=" */61,
                    /* [] */0
                  ]);
              skip_space(/* () */0);
              var lim$1 = get_lim(/* () */0);
              var encoding = get_encoding(/* () */0);
              seq(/* :: */[
                    lim$1,
                    /* [] */0
                  ]);
              skip_space(/* () */0);
              if (i[0] === len) {
                return /* tuple */[
                        version,
                        encoding,
                        undefined
                      ];
              } else if (i[0] < len && Caml_string.get(data, i[0]) === /* "s" */115) {
                seq(/* :: */[
                      /* "t" */116,
                      /* :: */[
                        /* "a" */97,
                        /* :: */[
                          /* "n" */110,
                          /* :: */[
                            /* "d" */100,
                            /* :: */[
                              /* "a" */97,
                              /* :: */[
                                /* "l" */108,
                                /* :: */[
                                  /* "o" */111,
                                  /* :: */[
                                    /* "n" */110,
                                    /* :: */[
                                      /* "e" */101,
                                      /* [] */0
                                    ]
                                  ]
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]);
                skip_space(/* () */0);
                var lim$2 = get_lim(/* () */0);
                var standalone = get_standalone(/* () */0);
                seq(/* :: */[
                      lim$2,
                      /* [] */0
                    ]);
                skip_space(/* () */0);
                if (i[0] === len) {
                  return /* tuple */[
                          version,
                          encoding,
                          standalone
                        ];
                } else {
                  throw Error_XMLDecl;
                }
              } else {
                throw Error_XMLDecl;
              }
            } else if (i[0] < len && Caml_string.get(data, i[0]) === /* "s" */115) {
              seq(/* :: */[
                    /* "t" */116,
                    /* :: */[
                      /* "a" */97,
                      /* :: */[
                        /* "n" */110,
                        /* :: */[
                          /* "d" */100,
                          /* :: */[
                            /* "a" */97,
                            /* :: */[
                              /* "l" */108,
                              /* :: */[
                                /* "o" */111,
                                /* :: */[
                                  /* "n" */110,
                                  /* :: */[
                                    /* "e" */101,
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
              skip_space(/* () */0);
              var lim$3 = get_lim(/* () */0);
              var standalone$1 = get_standalone(/* () */0);
              seq(/* :: */[
                    lim$3,
                    /* [] */0
                  ]);
              skip_space(/* () */0);
              if (i[0] === len) {
                return /* tuple */[
                        version,
                        undefined,
                        standalone$1
                      ];
              } else {
                throw Error_XMLDecl;
              }
            } else {
              throw Error_XMLDecl;
            }
          };
          var entities = /* N */Block.__(0, [/* :: */[
                /* tuple */[
                  97,
                  /* N */Block.__(0, [/* :: */[
                        /* tuple */[
                          109,
                          /* N */Block.__(0, [/* :: */[
                                /* tuple */[
                                  112,
                                  /* N */Block.__(0, [/* :: */[
                                        /* tuple */[
                                          59,
                                          /* L */Block.__(1, [38])
                                        ],
                                        /* [] */0
                                      ]])
                                ],
                                /* [] */0
                              ]])
                        ],
                        /* :: */[
                          /* tuple */[
                            112,
                            /* N */Block.__(0, [/* :: */[
                                  /* tuple */[
                                    111,
                                    /* N */Block.__(0, [/* :: */[
                                          /* tuple */[
                                            115,
                                            /* N */Block.__(0, [/* :: */[
                                                  /* tuple */[
                                                    59,
                                                    /* L */Block.__(1, [39])
                                                  ],
                                                  /* [] */0
                                                ]])
                                          ],
                                          /* [] */0
                                        ]])
                                  ],
                                  /* [] */0
                                ]])
                          ],
                          /* [] */0
                        ]
                      ]])
                ],
                /* :: */[
                  /* tuple */[
                    103,
                    /* N */Block.__(0, [/* :: */[
                          /* tuple */[
                            116,
                            /* N */Block.__(0, [/* :: */[
                                  /* tuple */[
                                    59,
                                    /* L */Block.__(1, [62])
                                  ],
                                  /* [] */0
                                ]])
                          ],
                          /* [] */0
                        ]])
                  ],
                  /* :: */[
                    /* tuple */[
                      108,
                      /* N */Block.__(0, [/* :: */[
                            /* tuple */[
                              116,
                              /* N */Block.__(0, [/* :: */[
                                    /* tuple */[
                                      59,
                                      /* L */Block.__(1, [60])
                                    ],
                                    /* [] */0
                                  ]])
                            ],
                            /* [] */0
                          ]])
                    ],
                    /* :: */[
                      /* tuple */[
                        113,
                        /* N */Block.__(0, [/* :: */[
                              /* tuple */[
                                117,
                                /* N */Block.__(0, [/* :: */[
                                      /* tuple */[
                                        111,
                                        /* N */Block.__(0, [/* :: */[
                                              /* tuple */[
                                                116,
                                                /* N */Block.__(0, [/* :: */[
                                                      /* tuple */[
                                                        59,
                                                        /* L */Block.__(1, [34])
                                                      ],
                                                      /* [] */0
                                                    ]])
                                              ],
                                              /* [] */0
                                            ]])
                                      ],
                                      /* [] */0
                                    ]])
                              ],
                              /* [] */0
                            ]])
                      ],
                      /* [] */0
                    ]
                  ]
                ]
              ]]);
          var character_reference = function (strm) {
            var aux_entity = function (u, _param) {
              while(true) {
                var param = _param;
                if (param.tag) {
                  return Curry._1(S[/* return */0], param[0]);
                } else {
                  var match = param[0];
                  if (match) {
                    var match$1 = match[0];
                    var t = match$1[1];
                    if (u === match$1[0]) {
                      if (t.tag) {
                        _param = t;
                        continue ;
                      } else {
                        return Curry._3(S[/* next_char */4], strm, not_eof, (function(t){
                                  return function (u) {
                                    return aux_entity(u, t);
                                  }
                                  }(t)));
                      }
                    } else {
                      _param = /* N */Block.__(0, [match[1]]);
                      continue ;
                    }
                  } else {
                    return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                Exn_CharToken,
                                u
                              ]);
                  }
                }
              };
            };
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (u === 35) {
                            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                                          if (u === 120) {
                                            var get_hex_code = function (consumed, acc) {
                                              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                                                            if (char_range(u, 48, 57)) {
                                                              return get_hex_code(true, (acc << 4) + (u - 48 | 0) | 0);
                                                            } else if (char_range(u, 65, 70)) {
                                                              return get_hex_code(true, (acc << 4) + (u - 55 | 0) | 0);
                                                            } else if (char_range(u, 97, 102)) {
                                                              return get_hex_code(true, (acc << 4) + (u - 87 | 0) | 0);
                                                            } else if (u === 59) {
                                                              if (consumed) {
                                                                return Curry._1(S[/* return */0], acc);
                                                              } else {
                                                                return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                                                            Exn_msg,
                                                                            "Expected hex"
                                                                          ]);
                                                              }
                                                            } else {
                                                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                                                          Exn_CharToken,
                                                                          u
                                                                        ]);
                                                            }
                                                          }));
                                            };
                                            return get_hex_code(false, 0);
                                          } else if (char_range(u, 48, 57)) {
                                            var get_code = function (consumed, acc) {
                                              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                                                            if (char_range(u, 48, 57)) {
                                                              return get_code(true, Caml_int32.imul(acc, 10) + (u - 48 | 0) | 0);
                                                            } else if (u === 59 && consumed) {
                                                              return Curry._1(S[/* return */0], acc);
                                                            } else {
                                                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                                                          Exn_CharToken,
                                                                          u
                                                                        ]);
                                                            }
                                                          }));
                                            };
                                            return get_code(false, u - 48 | 0);
                                          } else {
                                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                                        Exn_CharToken,
                                                        u
                                                      ]);
                                          }
                                        }));
                          } else {
                            return aux_entity(u, entities);
                          }
                        }));
          };
          var text_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (u === 60) {
                            var txt = extract_buffer(state);
                            state[/* next_state */2] = /* LessThanSignState */3;
                            return Curry._1(X[/* emit_text */4], txt);
                          } else if (u === 38) {
                            return Curry._2(S[/* >>= */1], character_reference(strm), (function (u) {
                                          add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                                          return text_state(state, strm);
                                        }));
                          } else {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return text_state(state, strm);
                          }
                        }));
          };
          var comment_state = function (state, strm) {
            var start = function (state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (u === 45) {
                              var state$1 = state;
                              var strm$1 = strm;
                              return Curry._3(S[/* next_char */4], strm$1, not_eof, (function (u) {
                                            if (u === 45) {
                                              var strm$2 = strm$1;
                                              return Curry._3(S[/* next_char */4], strm$2, not_eof, (function (u) {
                                                            if (u === 62) {
                                                              return Curry._1(S[/* return */0], /* () */0);
                                                            } else {
                                                              return Curry._2(S[/* error */5], Js_primitive.some(strm$2), [
                                                                          Exn_msg,
                                                                          "Unexpected '--'"
                                                                        ]);
                                                            }
                                                          }));
                                            } else {
                                              return start(state$1, strm$1);
                                            }
                                          }));
                            } else {
                              return start(state, strm);
                            }
                          }));
            };
            return start(state, strm);
          };
          var start_tag_name_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (is_space(u)) {
                            var tagname = extract_buffer(state);
                            return before_attribute_state(tagname, /* [] */0, state, strm);
                          } else if (u === 47) {
                            var tagname$1 = extract_buffer(state);
                            return self_closing_start_tag_state(tagname$1, state, strm);
                          } else if (u === 62) {
                            var tagname$2 = extract_buffer(state);
                            Stack.push(tagname$2, state[/* stack */1]);
                            state[/* next_state */2] = /* TextState */2;
                            return Curry._3(X[/* emit_start_tag */1], tagname$2, /* [] */0, false);
                          } else if (is_name_char(u)) {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return start_tag_name_state(state, strm);
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var after_end_tag_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (is_space(u)) {
                            return after_end_tag_state(state, strm);
                          } else if (u === 62) {
                            var tagname = extract_buffer(state);
                            var name = Stack.pop(state[/* stack */1]);
                            if (tagname === name) {
                              if (Stack.is_empty(state[/* stack */1])) {
                                state[/* next_state */2] = /* AfterElement */4;
                              } else {
                                state[/* next_state */2] = /* TextState */2;
                              }
                              return Curry._1(X[/* emit_end_tag */2], tagname);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_msg,
                                          "Invalid end tag name"
                                        ]);
                            }
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var end_tag_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (is_space(u)) {
                            return after_end_tag_state(state, strm);
                          } else if (u === 62) {
                            var tagname = extract_buffer(state);
                            var name = Stack.pop(state[/* stack */1]);
                            if (name === tagname) {
                              if (Stack.is_empty(state[/* stack */1])) {
                                state[/* next_state */2] = /* AfterElement */4;
                              } else {
                                state[/* next_state */2] = /* TextState */2;
                              }
                              return Curry._1(X[/* emit_end_tag */2], tagname);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_msg,
                                          "Invalid end tag name"
                                        ]);
                            }
                          } else if (is_name_char(u)) {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return end_tag_state(state, strm);
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var before_attribute_value_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (is_space(u)) {
                            return before_attribute_value_state(state, strm);
                          } else if (u === 34) {
                            return attribute_value_double_quoted_state(state, strm);
                          } else if (u === 39) {
                            return attribute_value_single_quoted_state(state, strm);
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var attribute_value_double_quoted_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (u === 34) {
                            return Curry._1(S[/* return */0], extract_buffer(state));
                          } else if (u === 38) {
                            return Curry._2(S[/* >>= */1], character_reference(strm), (function (u) {
                                          add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                                          return attribute_value_double_quoted_state(state, strm);
                                        }));
                          } else if (u === 60) {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          } else {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return attribute_value_double_quoted_state(state, strm);
                          }
                        }));
          };
          var attribute_value_single_quoted_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (u === 39) {
                            return Curry._1(S[/* return */0], extract_buffer(state));
                          } else if (u === 38) {
                            return Curry._2(S[/* >>= */1], character_reference(strm), (function (u) {
                                          add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                                          return attribute_value_single_quoted_state(state, strm);
                                        }));
                          } else if (u === 60) {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          } else {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return attribute_value_single_quoted_state(state, strm);
                          }
                        }));
          };
          var before_attribute_state = function (tagname, attrs, state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (is_space(u)) {
                            return before_attribute_state(tagname, attrs, state, strm);
                          } else if (u === 47) {
                            return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                            62,
                                            /* [] */0
                                          ]), (function (param) {
                                          state[/* next_state */2] = /* TextState */2;
                                          return Curry._3(X[/* emit_start_tag */1], tagname, attrs, true);
                                        }));
                          } else if (u === 62) {
                            Stack.push(tagname, state[/* stack */1]);
                            state[/* next_state */2] = /* TextState */2;
                            return Curry._3(X[/* emit_start_tag */1], tagname, attrs, false);
                          } else if (is_name_start_char(u)) {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return attribute_name_state(tagname, attrs, state, strm);
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var after_attribute_name_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (is_space(u)) {
                            return after_attribute_name_state(state, strm);
                          } else if (u === 61) {
                            return before_attribute_value_state(state, strm);
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var after_attribute_value_state = function (tagname, attrs, state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (is_space(u)) {
                            return before_attribute_state(tagname, attrs, state, strm);
                          } else if (u === 47) {
                            return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                            62,
                                            /* [] */0
                                          ]), (function (param) {
                                          if (Stack.is_empty(state[/* stack */1])) {
                                            state[/* next_state */2] = /* AfterElement */4;
                                          } else {
                                            state[/* next_state */2] = /* TextState */2;
                                          }
                                          return Curry._3(X[/* emit_start_tag */1], tagname, attrs, true);
                                        }));
                          } else if (u === 62) {
                            Stack.push(tagname, state[/* stack */1]);
                            state[/* next_state */2] = /* TextState */2;
                            return Curry._3(X[/* emit_start_tag */1], tagname, attrs, false);
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var attribute_name_state = function (tagname, attrs, state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (u === 61) {
                            var name = extract_buffer(state);
                            return Curry._2(S[/* >>= */1], before_attribute_value_state(state, strm), (function (value) {
                                          return after_attribute_value_state(tagname, /* :: */[
                                                      /* tuple */[
                                                        name,
                                                        value
                                                      ],
                                                      attrs
                                                    ], state, strm);
                                        }));
                          } else if (is_space(u)) {
                            var name$1 = extract_buffer(state);
                            return Curry._2(S[/* >>= */1], after_attribute_name_state(state, strm), (function (value) {
                                          return after_attribute_value_state(tagname, /* :: */[
                                                      /* tuple */[
                                                        name$1,
                                                        value
                                                      ],
                                                      attrs
                                                    ], state, strm);
                                        }));
                          } else if (is_name_char(u)) {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return attribute_name_state(tagname, attrs, state, strm);
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var self_closing_start_tag_state = function (tagname, state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (u === 62) {
                            if (Stack.is_empty(state[/* stack */1])) {
                              state[/* next_state */2] = /* AfterElement */4;
                            } else {
                              state[/* next_state */2] = /* TextState */2;
                            }
                            return Curry._3(X[/* emit_start_tag */1], tagname, /* [] */0, true);
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var end_tag_start_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (is_name_start_char(u)) {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return end_tag_state(state, strm);
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var pi_data_state = function (target, state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (u === 63) {
                            return pi_data_qmark_state(target, state, strm);
                          } else {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return pi_data_state(target, state, strm);
                          }
                        }));
          };
          var pi_data_qmark_state = function (target, state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (u === 62) {
                            var data = extract_buffer(state);
                            return Curry._1(S[/* return */0], /* tuple */[
                                        target,
                                        data
                                      ]);
                          } else {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], 63));
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return pi_data_state(target, state, strm);
                          }
                        }));
          };
          var pi_target_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (is_space(u)) {
                            var target = extract_buffer(state);
                            return before_pi_data_state(target, state, strm);
                          } else if (u === 63) {
                            var target$1 = extract_buffer(state);
                            return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                            62,
                                            /* [] */0
                                          ]), (function (param) {
                                          return Curry._1(S[/* return */0], /* tuple */[
                                                      target$1,
                                                      ""
                                                    ]);
                                        }));
                          } else if (is_name_char(u)) {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return pi_target_state(state, strm);
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var before_pi_data_state = function (target, state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (is_space(u)) {
                            return before_pi_data_state(target, state, strm);
                          } else if (u === 63) {
                            return pi_data_qmark_state(target, state, strm);
                          } else {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return pi_data_state(target, state, strm);
                          }
                        }));
          };
          var pi_start_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (is_name_start_char(u)) {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return pi_target_state(state, strm);
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var doctype_state = function (state, strm) {
            var start = function (state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return start(state, strm);
                            } else if (is_name_start_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_name_state(state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_name_state = function (state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_name_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_name_state(state, strm);
                            } else if (is_space(u)) {
                              var name = extract_buffer(state);
                              var doctype = /* record */[
                                /* dtd_name */name,
                                /* dtd_external_id */undefined,
                                /* dtd : [] */0
                              ];
                              return doctype_external_id_state(doctype, state, strm);
                            } else if (u === 62) {
                              var name$1 = extract_buffer(state);
                              return Curry._1(X[/* emit_doctype */3], /* record */[
                                          /* dtd_name */name$1,
                                          /* dtd_external_id */undefined,
                                          /* dtd : [] */0
                                        ]);
                            } else if (u === 91) {
                              var name$2 = extract_buffer(state);
                              var doctype$1 = /* record */[
                                /* dtd_name */name$2,
                                /* dtd_external_id */undefined,
                                /* dtd : [] */0
                              ];
                              return doctype_intsubsect_state(doctype$1, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_external_id_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_external_id_state(doctype, state, strm);
                            } else if (u === 62) {
                              return Curry._1(X[/* emit_doctype */3], doctype);
                            } else if (u === 83) {
                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                              89,
                                              /* :: */[
                                                83,
                                                /* :: */[
                                                  84,
                                                  /* :: */[
                                                    69,
                                                    /* :: */[
                                                      77,
                                                      /* [] */0
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]), (function (param) {
                                            return Curry._2(S[/* >>= */1], consume_space(strm), (function (param) {
                                                          return Curry._2(S[/* >>= */1], doctype_before_systemliteral_state(state, strm), (function (systemid) {
                                                                        return doctype_before_intsubsect_state(/* record */[
                                                                                    /* dtd_name */doctype[/* dtd_name */0],
                                                                                    /* dtd_external_id *//* SystemID */Block.__(0, [systemid]),
                                                                                    /* dtd */doctype[/* dtd */2]
                                                                                  ], state, strm);
                                                                      }));
                                                        }));
                                          }));
                            } else if (u === 80) {
                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                              85,
                                              /* :: */[
                                                66,
                                                /* :: */[
                                                  76,
                                                  /* :: */[
                                                    73,
                                                    /* :: */[
                                                      67,
                                                      /* [] */0
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]), (function (param) {
                                            return Curry._2(S[/* >>= */1], consume_space(strm), (function (param) {
                                                          return Curry._2(S[/* >>= */1], doctype_before_publicliteral_state(state, strm), (function (param) {
                                                                        return doctype_before_intsubsect_state(/* record */[
                                                                                    /* dtd_name */doctype[/* dtd_name */0],
                                                                                    /* dtd_external_id *//* PublicID */Block.__(1, [
                                                                                        param[0],
                                                                                        param[1]
                                                                                      ]),
                                                                                    /* dtd */doctype[/* dtd */2]
                                                                                  ], state, strm);
                                                                      }));
                                                        }));
                                          }));
                            } else if (u === 91) {
                              return doctype_intsubsect_state(doctype, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_before_systemliteral_state = function (state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_before_systemliteral_state(state, strm);
                            } else if (u === 34 || u === 39) {
                              return doctype_systemliteral_state(u, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_systemliteral_state = function (lim, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (u === lim) {
                              return Curry._1(S[/* return */0], extract_buffer(state));
                            } else {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_systemliteral_state(lim, state, strm);
                            }
                          }));
            };
            var doctype_before_publicliteral_state = function (state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_before_publicliteral_state(state, strm);
                            } else if (u === 34 || u === 39) {
                              return doctype_publicliteral_state(u, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_publicliteral_state = function (lim, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (u === lim) {
                              var value = extract_buffer(state);
                              return Curry._2(S[/* >>= */1], consume_space(strm), (function (param) {
                                            return Curry._2(S[/* >>= */1], doctype_before_systemliteral_state(state, strm), (function (systemid) {
                                                          return Curry._1(S[/* return */0], /* tuple */[
                                                                      value,
                                                                      systemid
                                                                    ]);
                                                        }));
                                          }));
                            } else if (u === 32 || u === 13 || u === 10 || char_range(u, 97, 122) || char_range(u, 65, 90) || char_range(u, 48, 57) || List.mem(u, /* :: */[
                                    45,
                                    /* :: */[
                                      39,
                                      /* :: */[
                                        40,
                                        /* :: */[
                                          41,
                                          /* :: */[
                                            43,
                                            /* :: */[
                                              44,
                                              /* :: */[
                                                46,
                                                /* :: */[
                                                  47,
                                                  /* :: */[
                                                    58,
                                                    /* :: */[
                                                      61,
                                                      /* :: */[
                                                        63,
                                                        /* :: */[
                                                          59,
                                                          /* :: */[
                                                            33,
                                                            /* :: */[
                                                              42,
                                                              /* :: */[
                                                                35,
                                                                /* :: */[
                                                                  64,
                                                                  /* :: */[
                                                                    36,
                                                                    /* :: */[
                                                                      95,
                                                                      /* :: */[
                                                                        37,
                                                                        /* [] */0
                                                                      ]
                                                                    ]
                                                                  ]
                                                                ]
                                                              ]
                                                            ]
                                                          ]
                                                        ]
                                                      ]
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]
                                          ]
                                        ]
                                      ]
                                    ]
                                  ])) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_publicliteral_state(lim, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_before_intsubsect_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_before_intsubsect_state(doctype, state, strm);
                            } else if (u === 62) {
                              return Curry._1(X[/* emit_doctype */3], doctype);
                            } else if (u === 91) {
                              return doctype_intsubsect_state(doctype, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_intsubsect_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_intsubsect_state(doctype, state, strm);
                            } else if (u === 93) {
                              return doctype_intsubsect_end_state(doctype, state, strm);
                            } else if (u === 37) {
                              var doctype$1 = doctype;
                              var state$1 = state;
                              var strm$1 = strm;
                              return Curry._3(S[/* next_char */4], strm$1, not_eof, (function (u) {
                                            if (is_name_start_char(u)) {
                                              add_chars(state$1, Curry._1(E[/* encode_unicode */0], u));
                                              return doctype_pereference_state(doctype$1, state$1, strm$1);
                                            } else {
                                              return Curry._2(S[/* error */5], Js_primitive.some(strm$1), [
                                                          Exn_CharToken,
                                                          u
                                                        ]);
                                            }
                                          }));
                            } else if (u === 60) {
                              var doctype$2 = doctype;
                              var state$2 = state;
                              var strm$2 = strm;
                              return Curry._3(S[/* next_char */4], strm$2, not_eof, (function (u) {
                                            if (u === 33) {
                                              var doctype$3 = doctype$2;
                                              var state$3 = state$2;
                                              var strm$3 = strm$2;
                                              return Curry._3(S[/* next_char */4], strm$3, not_eof, (function (u) {
                                                            if (u === 45) {
                                                              return Curry._2(S[/* >>= */1], consume_sequence(strm$3, /* :: */[
                                                                              45,
                                                                              /* [] */0
                                                                            ]), (function (param) {
                                                                            return Curry._2(S[/* >>= */1], comment_state(state$3, strm$3), (function (param) {
                                                                                          return doctype_intsubsect_state(doctype$3, state$3, strm$3);
                                                                                        }));
                                                                          }));
                                                            } else if (u === 65) {
                                                              return Curry._2(S[/* >>= */1], consume_sequence(strm$3, /* :: */[
                                                                              84,
                                                                              /* :: */[
                                                                                84,
                                                                                /* :: */[
                                                                                  76,
                                                                                  /* :: */[
                                                                                    73,
                                                                                    /* :: */[
                                                                                      83,
                                                                                      /* :: */[
                                                                                        84,
                                                                                        /* [] */0
                                                                                      ]
                                                                                    ]
                                                                                  ]
                                                                                ]
                                                                              ]
                                                                            ]), (function (param) {
                                                                            return Curry._2(S[/* >>= */1], consume_space(strm$3), (function (param) {
                                                                                          return doctype_attlist_state(doctype$3, state$3, strm$3);
                                                                                        }));
                                                                          }));
                                                            } else if (u === 69) {
                                                              return Curry._3(S[/* next_char */4], strm$3, not_eof, (function (u) {
                                                                            if (u === 78) {
                                                                              return Curry._2(S[/* >>= */1], consume_sequence(strm$3, /* :: */[
                                                                                              84,
                                                                                              /* :: */[
                                                                                                73,
                                                                                                /* :: */[
                                                                                                  84,
                                                                                                  /* :: */[
                                                                                                    89,
                                                                                                    /* [] */0
                                                                                                  ]
                                                                                                ]
                                                                                              ]
                                                                                            ]), (function (param) {
                                                                                            return Curry._2(S[/* >>= */1], consume_space(strm$3), (function (param) {
                                                                                                          return doctype_entity_state(doctype$3, state$3, strm$3);
                                                                                                        }));
                                                                                          }));
                                                                            } else if (u === 76) {
                                                                              return Curry._2(S[/* >>= */1], consume_sequence(strm$3, /* :: */[
                                                                                              69,
                                                                                              /* :: */[
                                                                                                77,
                                                                                                /* :: */[
                                                                                                  69,
                                                                                                  /* :: */[
                                                                                                    78,
                                                                                                    /* :: */[
                                                                                                      84,
                                                                                                      /* [] */0
                                                                                                    ]
                                                                                                  ]
                                                                                                ]
                                                                                              ]
                                                                                            ]), (function (param) {
                                                                                            return Curry._2(S[/* >>= */1], consume_space(strm$3), (function (param) {
                                                                                                          return doctype_element_state(doctype$3, state$3, strm$3);
                                                                                                        }));
                                                                                          }));
                                                                            } else {
                                                                              return Curry._2(S[/* error */5], Js_primitive.some(strm$3), [
                                                                                          Exn_CharToken,
                                                                                          u
                                                                                        ]);
                                                                            }
                                                                          }));
                                                            } else {
                                                              return Curry._2(S[/* error */5], Js_primitive.some(strm$3), [
                                                                          Exn_CharToken,
                                                                          u
                                                                        ]);
                                                            }
                                                          }));
                                            } else if (u === 63) {
                                              return Curry._2(S[/* >>= */1], pi_start_state(state$2, strm$2), (function (param) {
                                                            return doctype_intsubsect_state(/* record */[
                                                                        /* dtd_name */doctype$2[/* dtd_name */0],
                                                                        /* dtd_external_id */doctype$2[/* dtd_external_id */1],
                                                                        /* dtd : :: */[
                                                                          /* DTD_PI */Block.__(0, [
                                                                              param[0],
                                                                              param[1]
                                                                            ]),
                                                                          doctype$2[/* dtd */2]
                                                                        ]
                                                                      ], state$2, strm$2);
                                                          }));
                                            } else {
                                              return Curry._2(S[/* error */5], Js_primitive.some(strm$2), [
                                                          Exn_CharToken,
                                                          u
                                                        ]);
                                            }
                                          }));
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_intsubsect_end_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_intsubsect_end_state(doctype, state, strm);
                            } else if (u === 62) {
                              return Curry._1(X[/* emit_doctype */3], doctype);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_pereference_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (u === 59) {
                              var name = extract_buffer(state);
                              return doctype_intsubsect_state(/* record */[
                                          /* dtd_name */doctype[/* dtd_name */0],
                                          /* dtd_external_id */doctype[/* dtd_external_id */1],
                                          /* dtd : :: */[
                                            /* DTD_PEReference */Block.__(1, [name]),
                                            doctype[/* dtd */2]
                                          ]
                                        ], state, strm);
                            } else if (is_name_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_pereference_state(doctype, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_attlist_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_attlist_state(doctype, state, strm);
                            } else if (is_name_start_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_attlist_name_state(doctype, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_attlist_name_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              var name = extract_buffer(state);
                              return Curry._2(S[/* >>= */1], doctype_attlist_attdef_state(/* [] */0, state, strm), (function (defs) {
                                            return doctype_intsubsect_state(/* record */[
                                                        /* dtd_name */doctype[/* dtd_name */0],
                                                        /* dtd_external_id */doctype[/* dtd_external_id */1],
                                                        /* dtd : :: */[
                                                          /* DTD_ATTLIST */Block.__(2, [
                                                              name,
                                                              defs
                                                            ]),
                                                          doctype[/* dtd */2]
                                                        ]
                                                      ], state, strm);
                                          }));
                            } else if (is_name_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_attlist_name_state(doctype, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_attlist_attdef_state = function (defs, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_attlist_attdef_state(defs, state, strm);
                            } else if (is_name_start_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return Curry._2(S[/* >>= */1], doctype_attlist_attdef_name_state(state, strm), (function (attdef) {
                                            var defs$1 = /* :: */[
                                              attdef,
                                              defs
                                            ];
                                            var state$1 = state;
                                            var strm$1 = strm;
                                            return Curry._3(S[/* next_char */4], strm$1, not_eof, (function (u) {
                                                          if (is_space(u)) {
                                                            return doctype_attlist_attdef_state(defs$1, state$1, strm$1);
                                                          } else if (u === 62) {
                                                            return Curry._1(S[/* return */0], defs$1);
                                                          } else {
                                                            return Curry._2(S[/* error */5], Js_primitive.some(strm$1), [
                                                                        Exn_CharToken,
                                                                        u
                                                                      ]);
                                                          }
                                                        }));
                                          }));
                            } else if (u === 62) {
                              return Curry._1(S[/* return */0], defs);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_attlist_attdef_name_state = function (state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              var attrname = extract_buffer(state);
                              return Curry._2(S[/* >>= */1], doctype_attlist_atttype_state(state, strm), (function (atttype) {
                                            return Curry._2(S[/* >>= */1], doctype_attlist_defaultdecl(state, strm), (function (defaultdecl) {
                                                          return Curry._1(S[/* return */0], /* tuple */[
                                                                      attrname,
                                                                      atttype,
                                                                      defaultdecl
                                                                    ]);
                                                        }));
                                          }));
                            } else if (is_name_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_attlist_attdef_name_state(state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_attlist_atttype_state = function (state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_attlist_atttype_state(state, strm);
                            } else if (u === 67) {
                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                              68,
                                              /* :: */[
                                                65,
                                                /* :: */[
                                                  84,
                                                  /* :: */[
                                                    65,
                                                    /* [] */0
                                                  ]
                                                ]
                                              ]
                                            ]), (function (param) {
                                            return Curry._2(S[/* >>= */1], consume_space(strm), (function (param) {
                                                          return Curry._1(S[/* return */0], /* CDATA */-1057162259);
                                                        }));
                                          }));
                            } else if (u === 73) {
                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                              68,
                                              /* [] */0
                                            ]), (function (param) {
                                            return Curry._2(S[/* >>= */1], consume_space(strm), (function (param) {
                                                          return Curry._1(S[/* return */0], /* ID */16347);
                                                        }));
                                          }));
                            } else if (u === 78) {
                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                              77,
                                              /* :: */[
                                                84,
                                                /* :: */[
                                                  79,
                                                  /* :: */[
                                                    75,
                                                    /* :: */[
                                                      69,
                                                      /* :: */[
                                                        78,
                                                        /* [] */0
                                                      ]
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]), (function (param) {
                                            return Curry._2(S[/* >>= */1], consume_space(strm), (function (param) {
                                                          return Curry._1(S[/* return */0], /* NMTOKEN */119452218);
                                                        }));
                                          }));
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_attlist_defaultdecl = function (state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_attlist_defaultdecl(state, strm);
                            } else if (u === 35) {
                              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                                            if (u === 82) {
                                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                                              69,
                                                              /* :: */[
                                                                81,
                                                                /* :: */[
                                                                  85,
                                                                  /* :: */[
                                                                    73,
                                                                    /* :: */[
                                                                      82,
                                                                      /* :: */[
                                                                        69,
                                                                        /* :: */[
                                                                          68,
                                                                          /* [] */0
                                                                        ]
                                                                      ]
                                                                    ]
                                                                  ]
                                                                ]
                                                              ]
                                                            ]), (function (param) {
                                                            return Curry._1(S[/* return */0], /* Required */202657151);
                                                          }));
                                            } else if (u === 73) {
                                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                                              77,
                                                              /* :: */[
                                                                80,
                                                                /* :: */[
                                                                  76,
                                                                  /* :: */[
                                                                    73,
                                                                    /* :: */[
                                                                      69,
                                                                      /* :: */[
                                                                        68,
                                                                        /* [] */0
                                                                      ]
                                                                    ]
                                                                  ]
                                                                ]
                                                              ]
                                                            ]), (function (param) {
                                                            return Curry._1(S[/* return */0], /* Implied */890845704);
                                                          }));
                                            } else {
                                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                                          Exn_CharToken,
                                                          u
                                                        ]);
                                            }
                                          }));
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_entity_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_entity_state(doctype, state, strm);
                            } else if (u === 37) {
                              return Curry._2(S[/* >>= */1], consume_space(strm), (function (param) {
                                            return doctype_entity_pedecl_state(doctype, state, strm);
                                          }));
                            } else if (is_name_start_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_entity_gedecl_state(doctype, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_entity_pedecl_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_entity_pedecl_state(doctype, state, strm);
                            } else if (is_name_start_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_entity_pedecl_name_state(doctype, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_entity_pedecl_name_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              var name = extract_buffer(state);
                              return before_doctype_pedef_state(doctype, name, state, strm);
                            } else if (is_name_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_entity_pedecl_name_state(doctype, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var before_doctype_pedef_state = function (doctype, name, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return before_doctype_pedef_state(doctype, name, state, strm);
                            } else if (u === 34 || u === 39) {
                              return Curry._2(S[/* >>= */1], doctype_entityvalue_state(u, state, strm), (function (value) {
                                            return doctype_markupdecl_end_state(/* record */[
                                                        /* dtd_name */doctype[/* dtd_name */0],
                                                        /* dtd_external_id */doctype[/* dtd_external_id */1],
                                                        /* dtd : :: */[
                                                          /* DTD_Entity */Block.__(3, [/* PEDecl */Block.__(1, [
                                                                  name,
                                                                  /* `EntityValue */[
                                                                    -455789266,
                                                                    value
                                                                  ]
                                                                ])]),
                                                          doctype[/* dtd */2]
                                                        ]
                                                      ], state, strm);
                                          }));
                            } else if (u === 83) {
                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                              89,
                                              /* :: */[
                                                83,
                                                /* :: */[
                                                  84,
                                                  /* :: */[
                                                    69,
                                                    /* :: */[
                                                      77,
                                                      /* [] */0
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]), (function (param) {
                                            return Curry._2(S[/* >>= */1], consume_space(strm), (function (param) {
                                                          return Curry._2(S[/* >>= */1], doctype_before_systemliteral_state(state, strm), (function (system) {
                                                                        return doctype_markupdecl_end_state(/* record */[
                                                                                    /* dtd_name */doctype[/* dtd_name */0],
                                                                                    /* dtd_external_id */doctype[/* dtd_external_id */1],
                                                                                    /* dtd : :: */[
                                                                                      /* DTD_Entity */Block.__(3, [/* PEDecl */Block.__(1, [
                                                                                              name,
                                                                                              /* `ExternalID */[
                                                                                                859959046,
                                                                                                /* SystemID */Block.__(0, [system])
                                                                                              ]
                                                                                            ])]),
                                                                                      doctype[/* dtd */2]
                                                                                    ]
                                                                                  ], state, strm);
                                                                      }));
                                                        }));
                                          }));
                            } else if (u === 80) {
                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                              85,
                                              /* :: */[
                                                66,
                                                /* :: */[
                                                  76,
                                                  /* :: */[
                                                    73,
                                                    /* :: */[
                                                      67,
                                                      /* [] */0
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]), (function (param) {
                                            return Curry._2(S[/* >>= */1], consume_space(strm), (function (param) {
                                                          return Curry._2(S[/* >>= */1], doctype_before_publicliteral_state(state, strm), (function (param) {
                                                                        return doctype_markupdecl_end_state(/* record */[
                                                                                    /* dtd_name */doctype[/* dtd_name */0],
                                                                                    /* dtd_external_id */doctype[/* dtd_external_id */1],
                                                                                    /* dtd : :: */[
                                                                                      /* DTD_Entity */Block.__(3, [/* PEDecl */Block.__(1, [
                                                                                              name,
                                                                                              /* `ExternalID */[
                                                                                                859959046,
                                                                                                /* PublicID */Block.__(1, [
                                                                                                    param[0],
                                                                                                    param[1]
                                                                                                  ])
                                                                                              ]
                                                                                            ])]),
                                                                                      doctype[/* dtd */2]
                                                                                    ]
                                                                                  ], state, strm);
                                                                      }));
                                                        }));
                                          }));
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_entityvalue_state = function (lim, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (u === lim) {
                              return Curry._1(S[/* return */0], extract_buffer(state));
                            } else {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_entityvalue_state(lim, state, strm);
                            }
                          }));
            };
            var doctype_entity_gedecl_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              var name = extract_buffer(state);
                              return doctype_gedecl_entitydef_state(doctype, name, state, strm);
                            } else if (is_name_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_entity_gedecl_state(doctype, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_gedecl_entitydef_state = function (doctype, name, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_gedecl_entitydef_state(doctype, name, state, strm);
                            } else if (u === 34 || u === 39) {
                              return Curry._2(S[/* >>= */1], doctype_entityvalue_state(u, state, strm), (function (value) {
                                            return doctype_markupdecl_end_state(/* record */[
                                                        /* dtd_name */doctype[/* dtd_name */0],
                                                        /* dtd_external_id */doctype[/* dtd_external_id */1],
                                                        /* dtd : :: */[
                                                          /* DTD_Entity */Block.__(3, [/* GEDecl */Block.__(0, [
                                                                  name,
                                                                  /* `EntityValue */[
                                                                    -455789266,
                                                                    value
                                                                  ]
                                                                ])]),
                                                          doctype[/* dtd */2]
                                                        ]
                                                      ], state, strm);
                                          }));
                            } else if (u === 83) {
                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                              89,
                                              /* :: */[
                                                83,
                                                /* :: */[
                                                  84,
                                                  /* :: */[
                                                    69,
                                                    /* :: */[
                                                      77,
                                                      /* [] */0
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]), (function (param) {
                                            return Curry._2(S[/* >>= */1], consume_space(strm), (function (param) {
                                                          return Curry._2(S[/* >>= */1], doctype_before_systemliteral_state(state, strm), (function (system) {
                                                                        return Curry._2(S[/* >>= */1], doctype_gedecl_notion_state(state, strm), (function (notion) {
                                                                                      return doctype_markupdecl_end_state(/* record */[
                                                                                                  /* dtd_name */doctype[/* dtd_name */0],
                                                                                                  /* dtd_external_id */doctype[/* dtd_external_id */1],
                                                                                                  /* dtd : :: */[
                                                                                                    /* DTD_Entity */Block.__(3, [/* GEDecl */Block.__(0, [
                                                                                                            name,
                                                                                                            /* `ExternalID */[
                                                                                                              859959046,
                                                                                                              /* tuple */[
                                                                                                                /* SystemID */Block.__(0, [system]),
                                                                                                                notion
                                                                                                              ]
                                                                                                            ]
                                                                                                          ])]),
                                                                                                    doctype[/* dtd */2]
                                                                                                  ]
                                                                                                ], state, strm);
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            } else if (u === 80) {
                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                              85,
                                              /* :: */[
                                                66,
                                                /* :: */[
                                                  76,
                                                  /* :: */[
                                                    73,
                                                    /* :: */[
                                                      67,
                                                      /* [] */0
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]), (function (param) {
                                            return Curry._2(S[/* >>= */1], consume_space(strm), (function (param) {
                                                          return Curry._2(S[/* >>= */1], doctype_before_publicliteral_state(state, strm), (function (param) {
                                                                        var system = param[1];
                                                                        var $$public = param[0];
                                                                        return Curry._2(S[/* >>= */1], doctype_gedecl_notion_state(state, strm), (function (notion) {
                                                                                      return doctype_markupdecl_end_state(/* record */[
                                                                                                  /* dtd_name */doctype[/* dtd_name */0],
                                                                                                  /* dtd_external_id */doctype[/* dtd_external_id */1],
                                                                                                  /* dtd : :: */[
                                                                                                    /* DTD_Entity */Block.__(3, [/* GEDecl */Block.__(0, [
                                                                                                            name,
                                                                                                            /* `ExternalID */[
                                                                                                              859959046,
                                                                                                              /* tuple */[
                                                                                                                /* PublicID */Block.__(1, [
                                                                                                                    $$public,
                                                                                                                    system
                                                                                                                  ]),
                                                                                                                notion
                                                                                                              ]
                                                                                                            ]
                                                                                                          ])]),
                                                                                                    doctype[/* dtd */2]
                                                                                                  ]
                                                                                                ], state, strm);
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_gedecl_notion_state = function (state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_gedecl_notion_space_state(state, strm);
                            } else if (u === 62) {
                              return Curry._1(S[/* return */0], undefined);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_gedecl_notion_space_state = function (state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_gedecl_notion_space_state(state, strm);
                            } else if (u === 62) {
                              return Curry._1(S[/* return */0], undefined);
                            } else if (u === 78) {
                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                              68,
                                              /* :: */[
                                                65,
                                                /* :: */[
                                                  84,
                                                  /* :: */[
                                                    65,
                                                    /* [] */0
                                                  ]
                                                ]
                                              ]
                                            ]), (function (param) {
                                            return Curry._2(S[/* >>= */1], consume_space(strm), (function (param) {
                                                          return doctype_gedecl_notion_before_name_state(state, strm);
                                                        }));
                                          }));
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_gedecl_notion_before_name_state = function (state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_gedecl_notion_before_name_state(state, strm);
                            } else if (is_name_start_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_gedecl_notion_name(state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_gedecl_notion_name = function (state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              var name = extract_buffer(state);
                              return Curry._1(S[/* return */0], name);
                            } else if (is_name_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_gedecl_notion_name(state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_element_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_element_state(doctype, state, strm);
                            } else if (is_name_start_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_element_name_state(doctype, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_element_name_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              var name = extract_buffer(state);
                              return doctype_element_contentspec_state(doctype, name, state, strm);
                            } else if (is_name_char(u)) {
                              add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                              return doctype_element_name_state(doctype, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_element_contentspec_state = function (doctype, name, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_element_contentspec_state(doctype, name, state, strm);
                            } else if (u === 69) {
                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                              77,
                                              /* :: */[
                                                80,
                                                /* :: */[
                                                  84,
                                                  /* :: */[
                                                    89,
                                                    /* [] */0
                                                  ]
                                                ]
                                              ]
                                            ]), (function (param) {
                                            return doctype_markupdecl_end_state(/* record */[
                                                        /* dtd_name */doctype[/* dtd_name */0],
                                                        /* dtd_external_id */doctype[/* dtd_external_id */1],
                                                        /* dtd : :: */[
                                                          /* DTD_Element */Block.__(4, [
                                                              name,
                                                              /* Empty */50834029
                                                            ]),
                                                          doctype[/* dtd */2]
                                                        ]
                                                      ], state, strm);
                                          }));
                            } else if (u === 65) {
                              return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                              78,
                                              /* :: */[
                                                89,
                                                /* [] */0
                                              ]
                                            ]), (function (param) {
                                            return doctype_markupdecl_end_state(/* record */[
                                                        /* dtd_name */doctype[/* dtd_name */0],
                                                        /* dtd_external_id */doctype[/* dtd_external_id */1],
                                                        /* dtd : :: */[
                                                          /* DTD_Element */Block.__(4, [
                                                              name,
                                                              /* Any */3257036
                                                            ]),
                                                          doctype[/* dtd */2]
                                                        ]
                                                      ], state, strm);
                                          }));
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            var doctype_markupdecl_end_state = function (doctype, state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (is_space(u)) {
                              return doctype_markupdecl_end_state(doctype, state, strm);
                            } else if (u === 62) {
                              return doctype_intsubsect_state(doctype, state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            return start(state, strm);
          };
          var prolog_state = function (state, strm) {
            var start = function (state, strm) {
              return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                            if (u === 60) {
                              var state$1 = state;
                              var strm$1 = strm;
                              return Curry._3(S[/* next_char */4], strm$1, not_eof, (function (u) {
                                            if (u === 63) {
                                              return Curry._2(S[/* >>= */1], pi_start_state(state$1, strm$1), (function (param) {
                                                            var data = param[1];
                                                            var target = param[0];
                                                            if (target === "xml") {
                                                              if (state$1[/* next_state */2] === /* PrologXmlDeclState */0) {
                                                                var match = parse_xmldecl(data);
                                                                var encoding = match[1];
                                                                if (encoding !== undefined) {
                                                                  Curry._2(S[/* set_decoder */3], encoding, strm$1);
                                                                }
                                                                state$1[/* next_state */2] = /* PrologMiscState */1;
                                                                return start(state$1, strm$1);
                                                              } else {
                                                                return Curry._2(S[/* error */5], Js_primitive.some(strm$1), [
                                                                            Exn_msg,
                                                                            "Illegal PI target"
                                                                          ]);
                                                              }
                                                            } else {
                                                              return Curry._2(X[/* emit_pi */0], target, data);
                                                            }
                                                          }));
                                            } else if (u === 33) {
                                              var state$2 = state$1;
                                              var strm$2 = strm$1;
                                              return Curry._3(S[/* next_char */4], strm$2, not_eof, (function (u) {
                                                            if (u === 45) {
                                                              return Curry._2(S[/* >>= */1], consume_sequence(strm$2, /* :: */[
                                                                              45,
                                                                              /* [] */0
                                                                            ]), (function (param) {
                                                                            return Curry._2(S[/* >>= */1], comment_state(state$2, strm$2), (function (param) {
                                                                                          return start(state$2, strm$2);
                                                                                        }));
                                                                          }));
                                                            } else if (u === 68) {
                                                              return Curry._2(S[/* >>= */1], consume_sequence(strm$2, /* :: */[
                                                                              79,
                                                                              /* :: */[
                                                                                67,
                                                                                /* :: */[
                                                                                  84,
                                                                                  /* :: */[
                                                                                    89,
                                                                                    /* :: */[
                                                                                      80,
                                                                                      /* :: */[
                                                                                        69,
                                                                                        /* [] */0
                                                                                      ]
                                                                                    ]
                                                                                  ]
                                                                                ]
                                                                              ]
                                                                            ]), (function (param) {
                                                                            return Curry._2(S[/* >>= */1], consume_space(strm$2), (function (param) {
                                                                                          return doctype_state(state$2, strm$2);
                                                                                        }));
                                                                          }));
                                                            } else {
                                                              return Curry._2(S[/* error */5], Js_primitive.some(strm$2), [
                                                                          Exn_CharToken,
                                                                          u
                                                                        ]);
                                                            }
                                                          }));
                                            } else if (is_name_start_char(u)) {
                                              state$1[/* next_state */2] = /* LessThanSignState */3;
                                              add_chars(state$1, Curry._1(E[/* encode_unicode */0], u));
                                              return start_tag_name_state(state$1, strm$1);
                                            } else {
                                              return Curry._2(S[/* error */5], Js_primitive.some(strm$1), [
                                                          Exn_CharToken,
                                                          u
                                                        ]);
                                            }
                                          }));
                            } else if (is_space(u)) {
                              state[/* next_state */2] = /* PrologMiscState */1;
                              return start(state, strm);
                            } else {
                              return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                          Exn_CharToken,
                                          u
                                        ]);
                            }
                          }));
            };
            return start(state, strm);
          };
          var cdata_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (u === 93) {
                            return cdata_rbracket_state(state, strm);
                          } else {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return cdata_state(state, strm);
                          }
                        }));
          };
          var cdata_rbracket_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (u === 93) {
                            return cdata_rbracket_rbracket_state(state, strm);
                          } else {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], 93));
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return cdata_state(state, strm);
                          }
                        }));
          };
          var cdata_rbracket_rbracket_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (u === 62) {
                            var txt = extract_buffer(state);
                            state[/* next_state */2] = /* TextState */2;
                            return Curry._1(X[/* emit_text */4], txt);
                          } else {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], 93));
                            add_chars(state, Curry._1(E[/* encode_unicode */0], 93));
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return cdata_state(state, strm);
                          }
                        }));
          };
          var markup_start_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (u === 91) {
                            return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                            67,
                                            /* :: */[
                                              68,
                                              /* :: */[
                                                65,
                                                /* :: */[
                                                  84,
                                                  /* :: */[
                                                    65,
                                                    /* :: */[
                                                      91,
                                                      /* [] */0
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]
                                          ]), (function (param) {
                                          return cdata_state(state, strm);
                                        }));
                          } else if (u === 45) {
                            return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                            45,
                                            /* [] */0
                                          ]), (function (param) {
                                          return Curry._2(S[/* >>= */1], comment_state(state, strm), (function (param) {
                                                        return text_state(state, strm);
                                                      }));
                                        }));
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var less_than_sign_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                          if (u === 47) {
                            return end_tag_start_state(state, strm);
                          } else if (u === 33) {
                            return markup_start_state(state, strm);
                          } else if (u === 63) {
                            return Curry._2(S[/* >>= */1], pi_start_state(state, strm), (function (param) {
                                          return Curry._2(X[/* emit_pi */0], param[0], param[1]);
                                        }));
                          } else if (is_name_start_char(u)) {
                            add_chars(state, Curry._1(E[/* encode_unicode */0], u));
                            return start_tag_name_state(state, strm);
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var after_element_state = function (state, strm) {
            return Curry._3(S[/* next_char */4], strm, X[/* emit_eof */5], (function (u) {
                          if (is_space(u)) {
                            return after_element_state(state, strm);
                          } else if (u === 60) {
                            return Curry._3(S[/* next_char */4], strm, not_eof, (function (u) {
                                          if (u === 63) {
                                            return Curry._2(S[/* >>= */1], pi_start_state(state, strm), (function (param) {
                                                          return Curry._2(X[/* emit_pi */0], param[0], param[1]);
                                                        }));
                                          } else if (u === 33) {
                                            return Curry._2(S[/* >>= */1], consume_sequence(strm, /* :: */[
                                                            45,
                                                            /* :: */[
                                                              45,
                                                              /* [] */0
                                                            ]
                                                          ]), (function (param) {
                                                          return Curry._2(S[/* >>= */1], comment_state(state, strm), (function (param) {
                                                                        return after_element_state(state, strm);
                                                                      }));
                                                        }));
                                          } else {
                                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                                        Exn_CharToken,
                                                        u
                                                      ]);
                                          }
                                        }));
                          } else {
                            return Curry._2(S[/* error */5], Js_primitive.some(strm), [
                                        Exn_CharToken,
                                        u
                                      ]);
                          }
                        }));
          };
          var tokenizer = function (state, strm) {
            var match = state[/* next_state */2];
            switch (match) {
              case 0 : 
              case 1 : 
                  return prolog_state(state, strm);
              case 2 : 
                  return text_state(state, strm);
              case 3 : 
                  return less_than_sign_state(state, strm);
              case 4 : 
                  return after_element_state(state, strm);
              
            }
          };
          var create_state = function (param) {
            return /* record */[
                    /* tmp_buffer */$$Buffer.create(30),
                    /* stack */Stack.create(/* () */0),
                    /* next_state : PrologXmlDeclState */0
                  ];
          };
          var lexer = tokenizer;
          var reset = function (state) {
            $$Buffer.reset(state[/* tmp_buffer */0]);
            Stack.clear(state[/* stack */1]);
            state[/* next_state */2] = /* PrologXmlDeclState */0;
            return /* () */0;
          };
          var make_lexer = function (strm) {
            var state = create_state(/* () */0);
            return (function (param) {
                return tokenizer(state, strm);
              });
          };
          return /* module */[
                  /* E */E,
                  /* S */S,
                  /* X */X,
                  /* Exn_msg */Exn_msg,
                  /* Exn_EOF */Exn_EOF,
                  /* Exn_ExpectedChar */Exn_ExpectedChar,
                  /* Exn_ExpectedSpace */Exn_ExpectedSpace,
                  /* Exn_CharToken */Exn_CharToken,
                  /* Error_XMLDecl */Error_XMLDecl,
                  /* not_eof */not_eof,
                  /* add_chars */add_chars,
                  /* extract_buffer */extract_buffer,
                  /* consume_sequence */consume_sequence,
                  /* consume_space */consume_space,
                  /* parse_xmldecl */parse_xmldecl,
                  /* entities */entities,
                  /* character_reference */character_reference,
                  /* text_state */text_state,
                  /* comment_state */comment_state,
                  /* start_tag_name_state */start_tag_name_state,
                  /* self_closing_start_tag_state */self_closing_start_tag_state,
                  /* end_tag_start_state */end_tag_start_state,
                  /* end_tag_state */end_tag_state,
                  /* after_end_tag_state */after_end_tag_state,
                  /* before_attribute_state */before_attribute_state,
                  /* attribute_name_state */attribute_name_state,
                  /* after_attribute_name_state */after_attribute_name_state,
                  /* before_attribute_value_state */before_attribute_value_state,
                  /* attribute_value_double_quoted_state */attribute_value_double_quoted_state,
                  /* attribute_value_single_quoted_state */attribute_value_single_quoted_state,
                  /* after_attribute_value_state */after_attribute_value_state,
                  /* pi_start_state */pi_start_state,
                  /* pi_target_state */pi_target_state,
                  /* before_pi_data_state */before_pi_data_state,
                  /* pi_data_state */pi_data_state,
                  /* pi_data_qmark_state */pi_data_qmark_state,
                  /* doctype_state */doctype_state,
                  /* prolog_state */prolog_state,
                  /* cdata_state */cdata_state,
                  /* cdata_rbracket_state */cdata_rbracket_state,
                  /* cdata_rbracket_rbracket_state */cdata_rbracket_rbracket_state,
                  /* markup_start_state */markup_start_state,
                  /* less_than_sign_state */less_than_sign_state,
                  /* after_element_state */after_element_state,
                  /* tokenizer */tokenizer,
                  /* create_state */create_state,
                  /* lexer */lexer,
                  /* reset */reset,
                  /* make_lexer */make_lexer
                ];
        });
    });
}

var u_nl = 10;

var u_cr = 13;

var u_space = 32;

var u_excl = 33;

var u_quot = 34;

var u_sharp = 35;

var u_dollar = 36;

var u_percent = 37;

var u_amp = 38;

var u_apos = 39;

var u_lparen = 40;

var u_rparen = 41;

var u_star = 42;

var u_plus = 43;

var u_comma = 44;

var u_dash = 45;

var u_dot = 46;

var u_slash = 47;

var u_1 = 49;

var u_9 = 57;

var u_colon = 58;

var u_semicolon = 59;

var u_lt = 60;

var u_eq = 61;

var u_gt = 62;

var u_qmark = 63;

var u_lbracket = 91;

var u_rbracket = 93;

var u_underline = 95;

var u_x = 120;

var u_bom = 65279;

var u_at = 64;

var u_A = 65;

var u_B = 66;

var u_C = 67;

var u_D = 68;

var u_E = 69;

var u_F = 70;

var u_I = 73;

var u_K = 75;

var u_L = 76;

var u_M = 77;

var u_N = 78;

var u_O = 79;

var u_P = 80;

var u_Q = 81;

var u_R = 82;

var u_S = 83;

var u_T = 84;

var u_U = 85;

var u_Y = 89;

var u_a = 97;

var u_e = 101;

var u_g = 103;

var u_i = 105;

var u_l = 108;

var u_m = 109;

var u_n = 110;

var u_o = 111;

var u_p = 112;

var u_q = 113;

var u_r = 114;

var u_s = 115;

var u_t = 116;

var u_u = 117;

var u_v = 118;

exports.u_nl = u_nl;
exports.u_cr = u_cr;
exports.u_space = u_space;
exports.u_excl = u_excl;
exports.u_quot = u_quot;
exports.u_sharp = u_sharp;
exports.u_dollar = u_dollar;
exports.u_percent = u_percent;
exports.u_amp = u_amp;
exports.u_apos = u_apos;
exports.u_lparen = u_lparen;
exports.u_rparen = u_rparen;
exports.u_star = u_star;
exports.u_plus = u_plus;
exports.u_comma = u_comma;
exports.u_dash = u_dash;
exports.u_dot = u_dot;
exports.u_slash = u_slash;
exports.u_1 = u_1;
exports.u_9 = u_9;
exports.u_colon = u_colon;
exports.u_semicolon = u_semicolon;
exports.u_lt = u_lt;
exports.u_eq = u_eq;
exports.u_gt = u_gt;
exports.u_qmark = u_qmark;
exports.u_lbracket = u_lbracket;
exports.u_rbracket = u_rbracket;
exports.u_underline = u_underline;
exports.u_x = u_x;
exports.u_bom = u_bom;
exports.u_at = u_at;
exports.u_A = u_A;
exports.u_B = u_B;
exports.u_C = u_C;
exports.u_D = u_D;
exports.u_E = u_E;
exports.u_F = u_F;
exports.u_I = u_I;
exports.u_K = u_K;
exports.u_L = u_L;
exports.u_M = u_M;
exports.u_N = u_N;
exports.u_O = u_O;
exports.u_P = u_P;
exports.u_Q = u_Q;
exports.u_R = u_R;
exports.u_S = u_S;
exports.u_T = u_T;
exports.u_U = u_U;
exports.u_Y = u_Y;
exports.u_a = u_a;
exports.u_e = u_e;
exports.u_g = u_g;
exports.u_i = u_i;
exports.u_l = u_l;
exports.u_m = u_m;
exports.u_n = u_n;
exports.u_o = u_o;
exports.u_p = u_p;
exports.u_q = u_q;
exports.u_r = u_r;
exports.u_s = u_s;
exports.u_t = u_t;
exports.u_u = u_u;
exports.u_v = u_v;
exports.char_range = char_range;
exports.one_of = one_of;
exports.is_space = is_space;
exports.XName = XName;
exports.Make = Make;
/* No side effect */

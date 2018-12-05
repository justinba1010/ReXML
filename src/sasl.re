/*  sasl.re
*   For built in use with hannesm/xmpp in ReasonML
*   Justin Baum
*   24 November 2018
*/

/* Reason Translation from hannes/xmpp */

exception Error(string);
exception Failure(string);

type t =
  | Token(string)
  | Separator(char);

let separators = [
  '(',
  ')',
  '<',
  '>',
  '@',
  ',',
  ';',
  ':',
  '\\',
  '"',
  '/',
  '[',
  ']',
  '?',
  '=',
  '{',
  '}',
  ' ',
  '\t',
];

let is_ctl = ch =>
  switch (ch) {
  | '\000'..'\031' => true
  | '\127' => true
  | _ => false
  };

let make_lexer = {
  let buf = Buffer.create(100);
  let rec tokenizer = strm =>
    switch (Stream.peek(strm)) {
    | Some(ch) =>
      if (ch == '"') {
        Stream.junk(strm);
        get_string(strm);
      } else if (ch == ' ' || ch == '\t' || is_ctl(ch)) {
        Stream.junk(strm);
        tokenizer(strm);
      } else if (List.mem(ch, separators)) {
        Stream.junk(strm);
        Some(Separator(ch));
      } else {
        get_token(strm);
      }
    | None => None
    }
  and get_string = strm =>
    switch (Stream.peek(strm)) {
    | Some(ch) =>
      if (ch == '"') {
        Stream.junk(strm);
        let str = Buffer.contents(buf);
        Buffer.reset(buf);
        Some(Token(str));
      } else if (ch == '\\') {
        Stream.junk(strm);
        switch (Stream.peek(strm)) {
        | Some(ch1) =>
          Stream.junk(strm);
          Buffer.add_char(buf, ch1);
          get_string(strm);
        | None => failwith("Unterminated string")
        };
      } else {
        Stream.junk(strm);
        Buffer.add_char(buf, ch);
        get_string(strm);
      }
    | None => failwith("Unterminated string")
    }
  and get_token = strm =>
    switch (Stream.peek(strm)) {
    | Some(ch) =>
      if (List.mem(ch, separators) || is_ctl(ch)) {
        let str = Buffer.contents(buf);
        Buffer.reset(buf);
        Some(Token(str));
      } else {
        Stream.junk(strm);
        Buffer.add_char(buf, ch);
        get_token(strm);
      }
    | None =>
      let str = Buffer.contents(buf);
      Buffer.reset(buf);
      Some(Token(str));
    };

  strm => Stream.from(_ => tokenizer(strm));
};
let h = s => {
    let cs = Cstruct.of_string(s);
    let res = Nocrypto.Hash.digest(`MD5, cs);
    Cstruct.to_string(res);
  };
  
  let hex = s => {
    let cs = Cstruct.of_string(s);
    let rec fill = acc =>
      fun
      | x when x == Cstruct.len(cs) => acc
      | x => {
          let datum = acc ++ Printf.sprintf("%02x", Cstruct.get_uint8(cs, x));
          fill(datum, x + 1);
        };
  
    fill("", 0);
  };
  
  let response_value =
      (~username, ~realm, ~nonce, ~cnonce, ~qop, ~nc, ~digest_uri, ~passwd) => {
    let a1 =
      h(username ++ ":" ++ realm ++ ":" ++ passwd)
      ++ ":"
      ++ nonce
      ++ ":"
      ++ cnonce
    and a2 = "AUTHENTICATE:" ++ digest_uri;
    let t =
      hex(h(a1))
      ++ ":"
      ++ nonce
      ++ ":"
      ++ nc
      ++ ":"
      ++ cnonce
      ++ ":"
      ++ qop
      ++ ":"
      ++ hex(h(a2));
    hex(h(t));
  };
  
  let make_cnonce = () => {
    let random = Nocrypto.Rng.generate(8);
    hex(Cstruct.to_string(random));
  };
  
  let b64enc = data =>
    Cstruct.to_string(Nocrypto.Base64.encode(Cstruct.of_string(data)));
  
  let b64dec = data =>
    switch (Nocrypto.Base64.decode(Cstruct.of_string(data))) {
    | None => assert(false)
    | Some(x) => Cstruct.to_string(x)
    };
  
  let parse_digest_md5_challenge = str => {
    let pairs = get_pairs(str);
    try (
      {
        let qop = parse_qop(List.assoc("qop", pairs))
        and nonce = List.assoc("nonce", pairs)
        and realm =
          if (List.mem_assoc("realm", pairs)) {
            List.assoc("realm", pairs);
          } else {
            "";
          };
  
        (realm, qop, nonce);
      }
    ) {
    | Not_found => raise(Error("Malformed SASL challenge"))
    };
  };
  
  let sasl_digest_response = (chl, username, domain, digest_uri, passwd) => {
    let str = b64dec(chl);
    let (realm, qop, nonce) = parse_digest_md5_challenge(str)
    and cnonce = make_cnonce()
    and nc = "00000001";
  
    if (List.mem("auth", qop)) {
      let qop_method = "auth";
      let digest_uri =
        if (realm == "") {
          digest_uri ++ domain;
        } else {
          digest_uri ++ realm;
        };
  
      let response =
        response_value(
          ~username,
          ~realm,
          ~nonce,
          ~cnonce,
          ~nc,
          ~qop=qop_method,
          ~digest_uri,
          ~passwd,
        );
      let resp =
        Printf.sprintf(
          "charset=utf-8,username=\"%s\",realm=\"%s\",nonce=\"%s\",cnonce=\"%s\",nc=%s,qop=\"%s\",digest-uri=\"%s\",response=%s",
          username,
          realm,
          nonce,
          cnonce,
          nc,
          qop_method,
          digest_uri,
          response,
        );
  
      b64enc(resp);
    } else {
      raise(Error("No known qop methods"));
    };
  };
  
  let sasl_digest_rspauth = chl => {
    let str = b64dec(chl);
    let pairs = get_pairs(str);
    let _rspauth = List.assoc("rspauth", pairs);
    ();
  };
  
  let sasl_plain = (authorization_id, authentication_id, passwd) => {
    let str =
      String.concat("\000", [authorization_id, authentication_id, passwd]);
  
    b64enc(str);
  };

/* Hand transcribed */
let rec check_comma = (acc, strm) => {
    switch(Stream.next(strm)) {
    | None => List.rev(acc)
    | Some(x) => {
        if(List.mem(x, separators)) {
            scan(acc, strm);
        } else {
            raise(Error("Malformed SASL challenge"))
        }/* else */
        }
    };
} and scan = (acc, strm) => {
   switch(Stream.npeek(3, strm)) {
   /*| [Some(token1), Some(separator), Some(token2)] => {
       (_, _, _) = (Stream.next(), Stream.next(), Stream.next()) /* Move the stream thrice */
       check_comma([(token1, token2), ...acc], strm)
    };*/
   | _ => raise(Error("Malformed SASL challenge"))
   }
};

let get_pairs = (str) => {
    let strm = make_lexer(Stream.of_string(str));
    try (scan([], strm)) {
        | Error(_) => []
        };
};




/*
let get_pairs str =
  let rec scan acc = parser
  | [< 'Token t1; 'Separator '='; 'Token t2; rest >] ->
      check_comma ((t1, t2) :: acc) rest
and check_comma acc = parser
  | [< 'Separator ','; rest >] ->
      scan acc rest
  | [< >] ->
      List.rev acc
  in
  let strm = make_lexer (Stream.of_string str) in
    try
      scan [] strm
    with _ -> raise (Error "Malformed SASL challenge")

let parse_qop str =
  let rec qop acc = parser
    | [< 'Token t; rest >] ->
        check_comma (t :: acc) rest
    | [< >] ->
        List.rev acc
  and check_comma acc = parser
    | [< 'Separator ','; rest >] ->
        qop acc rest
    | [< >] ->
        List.rev acc
  in
  let strm = make_lexer (Stream.of_string str) in
    try
      qop [] strm
    with _ ->
      raise (Error "Malformed qop in SASL challenge")
*/
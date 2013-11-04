define([
    "jquery", "underscore"
], function($, _) {

    // on strict mode
    "use strict";

    // expression
    1
    "e"
    true
    null
    undefined
    {}
    []


    // statement
    if(true);
    while(false);

    // # create Object ways
    {};
    new Object();
    Object.create(null); // EC5 ++


    // # apply and call

    function first() {
        return (this.length) ? this[0] : this;
    }

    function forEach(iter) {
        for(var i = 0, len = this.length; i < len; i++) {
            iter.call(this, this[i], i);
        }
    }

    function print() {
        console.log(this.join());
    }

    first.apply(true);
    first.apply("hello");
    first.apply([1,2]);

    forEach.call([1,2,3,4,5], function(v){ console.log(v); });

    print.call(["안녕", "친구들"]);

    // # prototype
    // # function is special object!!!
    function My(v) {
        this.name = v;
    }

    var javarouka = new My("javarouka");

    // # only function
    My.prototype;
    javarouka.prototype;

    My.toString(); // static way? but...
    javarouka.toString(); // instance call
    My.prototype.toString(); // prototype call

    javarouka.toString = function() { return this.v; };
    javarouka.toString();
    My.toString();
    My.prototype.toString();
    console.log(new My("hello").toString());

    // 함수가 생성되면 다음을 순차 실행
    function born(){} // 생성!
    born.prototype = {}; // 프로토타입 객체 생성
    born.prototype.constructor = born; // 자신을 할당.

    new born().constructor; // ?

    My.prototype === javarouka.__proto__;
    My.prototype.constructor === javarouka.__proto__.constructor === My;

    // 그렇다면!!!!

    My.staticsMethod = function(){};
    My.prototype.method = function(){};

    // no...
    var pool = {
        prototype: {
            toString: function() {
                return "pool";
            }
        }
    };

    //new pool(); //???

    // new 의 단계
    function SomeFunc(){}

    var t = new SomeFunc("A");
    t = {};
    t.__proto__ = SomeFunc.prototype;
    var ret = SomeFunc.apply(t, arguments);
    t = typeof ret === 'object' ? ret : t;


    function A(val) {
        this.a = val;
    }

    function B(val) {
        this.b = val;
    }

    function C(val) {
        this.c = val;
    }

    B.prototype = new A("A");
    C.prototype = new B("b");
    var c = new C("c");

    c.a // ?


    // What?
    A.prototype = new String("hello");
    console.log(new A("aa").substring);

    Object
    Function
    Array
    RegExp
    Boolean
    String
    Number
    Date

    return {};

});

"use strict";

({ define: typeof define === "function" ? define : function(A,F) { module.exports = F.apply(null, A.map(require)) } }).
define([ "expect.js", "../strmap" ],
    function (expect, strmap) {
        describe('StrMap', function(){
            it('should handle __proto__', function () {
                var map = new strmap.StrMap();
                map.set("__proto__", 123);
                expect(map.get("__proto__")).to.equal(123);
                
                // Escaping must avoid key clashes
                var escapedProto = strmap._escapeKey("__proto__");
                map.set(escapedProto, "abc");
                expect(map.get(escapedProto)).to.equal("abc");

            });
            it('should not inherit keys', function () {
                expect(new strmap.StrMap().hasKey("toString")).to.be.false;
            });
            it("imports and exports own properties of objects", function () {
                var map = new strmap.StrMap({ foo: 1, bar: 2});
                expect(map.toObject()).to.eql({ foo: 1, bar: 2 });
            });
            it("overrides", function () {
                var map1 = new strmap.StrMap({ foo: 1, bar: 1});
                var map2 = new strmap.StrMap({ bar: 2, baz: 2});
                expect(map1.overrideWith(map2).toObject()).to.eql({ foo: 1, bar: 2, baz: 2 });
            });
            it("supplements", function () {
                var map1 = new strmap.StrMap({ foo: 1, bar: 1});
                var map2 = new strmap.StrMap({ bar: 2, baz: 2});
                expect(map1.supplementWith(map2).toObject()).to.eql({ foo: 1, bar: 1, baz: 2 });
            });
        });
    }
);

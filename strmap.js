"use strict";

({ define: typeof define === "function" ? define : function(A,F) { module.exports = F.apply(null, A.map(require)) } }).
define([],
    function () {
        var e = {};
        var hasOwnProperty = Object.prototype.hasOwnProperty;

        function getOwnPropertyValue(obj, propName) {
            return hasOwnProperty.call(obj, propName) ? obj[propName] : undefined;
        }

        /*
         * Escape "bad" keys.
         * Exported for unit test.
         */
        e._escapeKey = function (key) {
            // We need to escape "__proto__", but also the (n times) escaped version of it, to avoid clashes
            if (key.indexOf("__proto__") === 0) {
                return key+"%";
            } else {
                return key;
            }
        }

        e.StrMap = function (obj) {
            var that = this;
            this._data = {};
            if (obj instanceof Object) {
                copyOne(this._data, obj, true);
            }
        };

        /**
         * Add an entry to the map.
         *
         * @param key The key of the entry
         * @param value The value of the entry
         */
        e.StrMap.prototype.set = function (key, value) {
            key = e._escapeKey(key);
            this._data[key] = value;
        };

        /**
         * Retrieve the value of an entry from the map.
         *
         * @param key The key of the entry
         */
        e.StrMap.prototype.get = function (key) {
            key = e._escapeKey(key);
            return getOwnPropertyValue(this._data, key);
        };
        e.StrMap.prototype.delete = function (key) {
            key = e._escapeKey(key);
            var value = getOwnPropertyValue(this._data, key);
            delete this._data[key];
            return value;
        };

        /**
         * Is there an entry with the given key in the map?
         */
        e.StrMap.prototype.hasKey = function (key) {
            key = e._escapeKey(key);
            return hasOwnProperty.call(key);
        };

        /**
         * Starting with the first argument, then the second, override
         * the entries in this map. Each argument can be either
         * a map or an object. Overriding means: copy each entry
         * to this map. If there already is an entry that has the same
         * key, remove it.
         */
        e.StrMap.prototype.overrideWith = function () {
            return this._copyProperties(arguments, true);
        };

        /**
         * Similar to overrideWith(), but doesn’t override properties that
         * already exist in this map.
         */
        e.StrMap.prototype.supplementWith = function () {
            return this._copyProperties(arguments, false);
        };

        /**
         * Convert this map to an object.
         */
        e.StrMap.prototype.toObject = function() {
            return copyOne({}, this._data, true);
        };
        
        e.StrMap.prototype.toJSON = e.StrMap.prototype.toObject;

        e.StrMap.prototype._copyProperties = function (args, override) {
            var target = this._data;
            for (var i=0; i<args.length; i++) {
                var source = args[i];
                if (source instanceof e.StrMap) {
                    source = source._data;
                }
                copyOne(target, source, override);
            }
            return this;
        }

        function copyOne(target, source, override) {
            Object.keys(source).forEach(function(propName) {
                if (override || !hasOwnProperty.call(target, propName)) {
                    target[propName] = source[propName];
                }
            });
            return target;
        }

        return e;
    }



);

"use strict";

function parse(data) {
    if (typeof data === 'string') {
        return JSON.parse(data);
    }
    return data;
}

function isList(data) {
    return data instanceof Array;
}

function isSet(data) {
    return data !== undefined && data !== null;
}

function getAllWithAttribute(context, attribute) {
    var results = [];
    context = context instanceof Array ? context : [context];

    context.forEach(function(item) {
        if (!isSet(item)) {
            return;
        }
        if (!isSet(item[attribute])) {
            return;
        }

        if (isList(item[attribute])) {
            results = results.concat(item[attribute]);
        } else {
            results.push(item[attribute]);
        }
    });

    return results;
}

function getAllFromPath(context, path) {
    var pathParts = path.split('.');

    pathParts.every(function(attribute) {
        context = getAllWithAttribute(context, attribute);
        return context !== undefined;
    });

    return context.length === 0 ? undefined : context;
}


var PickrBase = {
    one: function(context, path, defaultValue) {
        var results = PickrBase.all(context, path);

        return results[0] !== undefined ? results[0] : defaultValue;
    },

    all: function(context, path, defaultValue) {
        var orToken = '|',
            possiblePaths = path.split(orToken),
            result;

        context = parse(context);

        defaultValue = defaultValue !== undefined ? defaultValue : [];

        possiblePaths.some(function(possiblePath) {
            result = getAllFromPath(context, possiblePath);
            return result !== undefined;
        });

        if (result !== undefined) {
            return result;
        }

        return defaultValue;
    },

    exists: function (context, path) {
        var match = getAllFromPath(context, path);

        return isList(match) && match.length > 0;
    },

    hash: function(context, keysPath, valuesPath) {
        var keys = PickrBase.all(context, keysPath),
            values = PickrBase.all(context, valuesPath),
            result = {};

        if (!keys.length) {
            return result;
        }

        keys.forEach(function(key, position) {
            result[key] = values[position] === undefined ? null : values[position];
        });

        return result;
    },

    transform: function(context, path, fn) {
        var pathParts = path.split('.'),
            lastPathIndex = pathParts.length - 1,
            pointer = context;

        pathParts.every(function(attribute, pathIndex) {
            if (isList(pointer)) {
                pointer.forEach(function(value, pointerIndex) {
                    pointer[pointerIndex] = PickrBase.transform(value, pathParts.slice(pathIndex).join('.'), fn);
                });
                return false;
            }

            if (!pointer[attribute]) {
                return false;
            }

            if (lastPathIndex === pathIndex) {
                pointer[attribute] = fn(pointer[attribute]);
            }

            pointer = pointer[attribute];
            return true;
        });

        return context;
    },
};

function pickr(context) {
    var instance = {};
    Object.keys(PickrBase).forEach(function(method) {
        instance[method] = PickrBase[method].bind(PickrBase, context);
    });
    return instance;
}

Object.keys(PickrBase).forEach(function(method) {
    pickr[method] = PickrBase[method];
});

module.exports = pickr;

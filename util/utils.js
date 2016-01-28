(function(){
    'use strict';
    var _ = require('underscore');
    /**
     * This is a generic helper function for MongoDB errors
     * that occur during searching/creating/updating a document.
     * @param err
     * @param res
     * TODO - Respond with developer friendly error messages
     */
    exports.handleDBError = function(err, res){
        switch(err.name){
            case "ValidationError":
            case "CastError": res.status(400).send(error.name);
                break;
            case "Not Found": res.status(404).send(error.name);
                break;
            case "Unknown Server Error": res.status(500).send(error.name);
                break;
            default: res.status(500).send(error.name);
        }
    };
    /**
     * Builds a query object from a query string parameter list.
     * @param queryStringParams
     * @returns {{}}
     */
    exports.buildQuery = function(queryStringParams){
        var validatedParams = ['state', 'homePage', 'carousel'],
            keys = getKeys(queryStringParams),
            values = getValues(queryStringParams),
            i = keys.length,
            query = {};
        while(i--){
            if(_.contains(validatedParams, keys[i])) {
                query[keys[i]] = values[i]
            }
        }
        return query;
    };
    /**
     * Creates an array of keys from an object.
     * @param obj
     */
    function getKeys(obj){
        return _.keys(obj)
    }
    /**
     * Creates an array of values from an object.
     * @param obj
     */
    function getValues(obj){
        return _.values(obj);
    }
})();
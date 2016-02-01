(function(){
    'use strict';
    var _ = require('underscore');
    /**
     * Handles error thrown if the resource is not found.
     * @param resource
     * @param res
     */
    exports.handleResourceError = function(resource, res){
        if(!resource){
            res.status(404).send("Not Found");
        }
    };
    /**
     * This is a generic helper function for MongoDB errors
     * that occur during searching/creating/updating a document.
     * @param err
     * @param res
     * TODO - Respond with developer friendly error messages
     */
    exports.handleDBError = function(err, res){
        if(err) {
            if (err.name == "ValidationError") {
                res.status(400);
                res.send(err);
            } else if (err.name == "CastError") {
                res.status(400);
                res.send(err);
            } else if(err.name == "Not Found") {
                res.status(404);
                res.send(err);
            } else {
                res.status(500);
                res.send(err);
            }
        } else {
            res.status(500);
            res.send({error: 'Unknown Server Error'});
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
    /**
     * Helper function used to merge resources
     * retrieved from the database.
     * @param dest
     * @param src
     */
    exports.mergeObjects = function(dest, src){
        return _.extend(dest, src);
    };
    /**
     * Sorts a list by a given criteria
     * @param obj
     * @param criteria
     * @returns {{value, index, criteria}}
     */
    exports.sortObject = function(list,criteria){
        return _.sortBy(list, criteria);
    };
})();
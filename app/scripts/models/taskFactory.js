/**
 * Define pure models can be serialized / deserialized by Data Access Layer
 */

'use strict';

var taskFactory = {};

taskFactory.New = function (id, title, description) {

    return {
        id:              id,
        title:           title,
        description:     description
    };
};


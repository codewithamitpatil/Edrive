// intialize jaeger client 

const initJaegerTracer = require('jaeger-client').initTracer

// importing config
const { service,jaegerHost,jaegerPort } =
 require('../../config/config');

// jaeger connection
function initTracer () {
 
const config = {
    serviceName:  service,
    reporter: {
        agentHost: jaegerHost,
        agentPort: jaegerPort,
        logSpan: true,
    },
    sampler: {
        type: "const",
        param: 1,
    },
};
const options = {
    tags: {
       service: "v.0.1",
    }

};

  return initJaegerTracer(config,options);

}


module.exports ={ initTracer } ;

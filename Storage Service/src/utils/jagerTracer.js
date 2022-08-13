//const logger = require("./logger");
const jager = require("jaeger-client");
const initTracer = jager.initTracer;

const config = {
    serviceName: "Social-Auth55",
    reporter: {
        agentHost: '52.66.26.84',
        agentPort: 6832,
        logSpan: true,
    },
    sampler: {
        type: "const",
        param: 1,
    },
};

const options = {
    tags: {
        "Social Auth": "1.0.0",
    },
    //  logger: logger,
};

const tracer = initTracer(config, options);

module.exports = tracer;

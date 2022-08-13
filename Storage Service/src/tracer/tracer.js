
// tracing middleware

const { initTracer } = require("./reqTracer");

// importing config
const { service } = require('../../config/config');


const tracer1 = initTracer();
const opentracing = require('opentracing')
opentracing.initGlobalTracer(tracer1);


function tracingMiddleWare (req, res, next) {

  const tracer = opentracing.globalTracer();
  const wireCtx = tracer.extract(opentracing.FORMAT_HTTP_HEADERS, req.headers)

  const span = tracer.startSpan(service, { childOf: wireCtx })
  span.log({ event: 'request_received' })

  span.setTag(opentracing.Tags.HTTP_METHOD, req.method)
  span.setTag(opentracing.Tags.SPAN_KIND, opentracing.Tags.SPAN_KIND_RPC_SERVER)
  span.setTag(opentracing.Tags.HTTP_URL, req.path)

  const responseHeaders = {}
  tracer.inject(span, opentracing.FORMAT_HTTP_HEADERS, responseHeaders)
  res.set(responseHeaders)

   Object.assign(req, { span })

   const finishSpan = () => {
    if (res.statusCode >= 500) {
      span.setTag(opentracing.Tags.SAMPLING_PRIORITY, 1)
      span.setTag(opentracing.Tags.ERROR, true)
      span.log({ event: 'error', message: res.statusMessage })
    }
    span.setTag(opentracing.Tags.HTTP_STATUS_CODE, res.statusCode)
    span.log({ event: 'request_end' })
    span.finish()
  }
  res.on('finish', finishSpan)
  next()
}

// export 
module.exports = tracingMiddleWare ;

//https://www.aspecto.io/blog/how-to-deploy-jaeger-on-aws-a-comprehensive-step-by-step-guide/

'use strict'

const {
  BasicTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  BatchSpanProcessor,
} = require('@opentelemetry/tracing')

const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector')
const {} = require('@opentelemetry/exporter-trace-otlp-http');



const { Resource } = require('@opentelemetry/resources')

const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express')

const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http')
const { registerInstrumentations } = require('@opentelemetry/instrumentation')
const opentelemetry = require('@opentelemetry/sdk-node')
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node')
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger')

const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node')
const { OTTracePropagator } = require('@opentelemetry/propagator-ot-trace')

const hostName = '52.66.26.84'|| 'localhost'



const init = (serviceName, environment) => {

  // User Collector Or Jaeger Exporter
  //const exporter = new CollectorTraceExporter(options)
  const options = {
  tags: [], // optional
  // You can use the default UDPSender
  host: '52.66.26.84', // optional
  port: 6832, // optional
  // OR you can use the HTTPSender as follows
  //endpoint: 'http://52.66.26.84:14268/api/traces',
 // maxPacketSize: 65000 // optional
}

  const exporter = new JaegerExporter(options)



  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName, // Service name that showuld be listed in jaeger ui
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: environment,
    }),
  })

  provider.addSpanProcessor(new SimpleSpanProcessor(exporter))

  // Use the BatchSpanProcessor to export spans in batches in order to more efficiently use resources.
  provider.addSpanProcessor(new BatchSpanProcessor(exporter))

  // Enable to see the spans printed in the console by the ConsoleSpanExporter
 //provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter())) 

  provider.register({ propagator: new OTTracePropagator() })

  console.log('tracing initialized')

  registerInstrumentations({
    instrumentations: [new ExpressInstrumentation(), new HttpInstrumentation()],
  })
  
  const tracer = provider.getTracer(serviceName)
  return { tracer }
}

module.exports = {
  init: init,
}

// to transport logs to aws cloud watch

const CloudWatchTransport = require('winston-aws-cloudwatch');


module.exports = new CloudWatchTransport({
      logGroupName: 'StorageService', 
      logStreamName: 'storage',
      createLogGroup: true,
      createLogStream: true,
      submissionInterval: 10000,
      submissionRetryCount: 1,
      batchSize: 20,
      awsConfig: {
        accessKeyId: '',
        secretAccessKey: '',
        region: 'ap-south-1'
      },
      formatLog: item =>
        `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
 });

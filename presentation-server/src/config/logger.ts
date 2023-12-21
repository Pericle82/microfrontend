const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, prettyPrint } = format;

const myFormat = printf(({ level, message, timestamp }: any) => {
    return `${timestamp} ${level}: ${message}`;
});

console.log(__dirname)
// define the custom settings for each transport (file, console)
const options = {
  fileInfo: {
    level: "info",
    filename: `logs/combined.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: format.combine(
      format.timestamp(),
      format.json(),
      myFormat
    ),

  },
  fileError: {
    level: "error",
    filename: `logs/error.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: format.combine(
      format.timestamp(),
      format.json(),
      myFormat
    ),
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: format.combine(
      format.colorize(),
      format.simple()
    ),
  },
};

export default createLogger({
    level: 'info',
    json: true,
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    defaultMeta: { service: 'presentation-service' },

    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File(options.fileInfo),
        new transports.File(options.fileError),
        new transports.Console({
            colorize: true,
            json: false,
            format: combine(
                timestamp({
                    format: "MMM-DD-YYYY HH:mm:ss",
                }),
                prettyPrint(),
                myFormat
            )
        })
    ],
});

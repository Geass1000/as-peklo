import { Interfaces, Constants, Enums } from './shared';

export const DefaultOptions: Interfaces.Options = {
  level: Enums.LogLevel.Log,
  formats: {
    metamessage: `TIMESTAMP - [LOG_LEVEL] CLASS_NAME - METHOD_NAME:`,
    timestamp: `YYYY.MM.DD-HH:mm:ss`
  },
  styles: {
    [`${Enums.LogLevel.Info}`]: {
      colors: {
        logLevel: Enums.TextColor.Green,
      },
    },
    [`${Enums.LogLevel.Error}`]: {
      colors: {
        logLevel: Enums.TextColor.Red,
      },
    },
  }
};

import { Interfaces, Constants, Enums } from './shared';

export const DefaultOptions: Interfaces.Options = {
  level: Enums.LogLevel.Log,
  formats: {
    metamessage: `TIMESTAMP - [LOG_LEVEL] CLASS_NAME - METHOD_NAME:`,
    timestamp: `YYYY.MM.DD-HH:mm:ss`
  },
  styles: {
    disabled: false,
    [`${Enums.LogLevel.Info}`]: {
      colors: {
        logLevel: Enums.TextColor.Green,
        message: Enums.TextColor.White,
      },
    },
    [`${Enums.LogLevel.Error}`]: {
      colors: {
        logLevel: Enums.TextColor.Red,
      },
    },
  }
};

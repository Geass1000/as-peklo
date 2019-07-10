import * as Enums from './logger.enums';

export interface Metamessage {
  logLevel: string;
  timestamp: string;
  className: string;
  methodName: string;
  fileName: string;
  filePath: string;
}

export namespace Options {
  export interface Format {
    /**
     * Moment format:
     * https://momentjs.com/docs/#/displaying/format/
     */
    timestamp?: string;
    /**
     * Available patterns:
     * TIMESTAMP
     * LOG_LEVEL
     * CLASS_NAME
     * METHOD_NAME
     * FILE_NAME
     */
    metamessage?: string;
  }

  export interface Elements {
    metamessage?: string;
    message?: string;
    logLevel?: string;
    timestamp?: string;
    className?: string;
    methodName?: string;
    fileName?: string;
    filePath?: string;
  }

  export interface Style {
    colors?: Elements;
    backgrounds?: Elements;
    effects?: Elements;
  }

  export interface Styles {
    // Default: false
    disabled?: boolean;
    [level: string]: Style|boolean;
  }
}

export interface Options {
  level: Enums.LogLevel;
  formats?: Options.Format;
  styles?: Options.Styles;
}

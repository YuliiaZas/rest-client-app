type LogLevel = 'info' | 'warn' | 'error';

export class Logger {
  private static formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
  }

  private static printMessage(level: LogLevel, message: string): void {
    console[level](this.formatMessage(level, message));
  }

  static info(message: string): void {
    this.printMessage('info', message);
  }

  static warn(message: string): void {
    this.printMessage('warn', message);
  }

  static error(message: string): void {
    this.printMessage('error', message);
  }
}

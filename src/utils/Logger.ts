import chalk from "chalk"

enum Severity {
  info = "info",
  warning = "warning",
  error = "error",
}

function getTimestamp(): string {
  const options: Intl.DateTimeFormatOptions & { fractionalSecondDigits: number } = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "Australia/Sydney",
    fractionalSecondDigits: 3,
  }
  return new Intl.DateTimeFormat("en-AU", options).format(new Date())
}

function logToDatabase(log: string): void {
  if (process.env.NODE_ENV !== "production") { return }
  // TODO: Send to database
  console.log("Senidng to database", log)
}

function formatLog (message: string[], severity: Severity): string {
  return `${getTimestamp()} [${severity}]: ${message.join(" ")}`
}

const shouldLogToConsole = !["production"].includes(process.env.NODE_ENV || "")

const Logger: Record<Severity, (...message: string[]) => void> = {
  info: (...message: string[]): void => {
    const log = formatLog(message, Severity.info)
    logToDatabase(log)
    if (shouldLogToConsole) { console.log(chalk.cyan(log)) }
  },
  warning: (...message: string[]): void => {
    const log = formatLog(message, Severity.warning)
    logToDatabase(log)
    if (shouldLogToConsole) { console.log(chalk.yellow(log)) }
  },
  error: (...message: string[]): void => {
    const log = formatLog(message, Severity.error)
    logToDatabase(log)
    if (shouldLogToConsole) { console.log(chalk.red(log)) }
  },
}

export default Logger

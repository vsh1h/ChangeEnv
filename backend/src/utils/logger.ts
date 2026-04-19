const format = (level: string, message: string, meta?: unknown) => {
  const timestamp = new Date().toISOString();

  if (typeof meta === "undefined") {
    return `[${timestamp}] [${level}] ${message}`;
  }

  return `[${timestamp}] [${level}] ${message} ${JSON.stringify(meta)}`;
};

export const logger = {
  info: (message: string, meta?: unknown) => {
    console.log(format("INFO", message, meta));
  },
  warn: (message: string, meta?: unknown) => {
    console.warn(format("WARN", message, meta));
  },
  error: (message: string, meta?: unknown) => {
    console.error(format("ERROR", message, meta));
  },
};

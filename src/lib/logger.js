const isDev = import.meta.env.DEV;
const level = isDev ? 'debug' : 'warn';
const levels = { debug: 0, info: 1, warn: 2, error: 3 };

function log(lvl, ...args) {
  if (levels[lvl] < levels[level]) return;
  const ts = new Date().toISOString();
  console[lvl === 'debug' ? 'log' : lvl](`[${ts}] [${lvl}]`, ...args);
}

export const logger = {
  debug: (...a) => log('debug', ...a),
  info: (...a) => log('info', ...a),
  warn: (...a) => log('warn', ...a),
  error: (...a) => log('error', ...a),
};

if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => logger.error('window.error', e.message, e.error));
  window.addEventListener('unhandledrejection', (e) =>
    logger.error('unhandledrejection', e.reason),
  );
}

export function getSecretKey() {
  return 'secret123';
}

export function getErrorResponse(type, config) {
  return Object.assign({ type, success: false }, config);
}

export function getResponse(type, config = {}) {
  return Object.assign({ type, success: true }, config);
}
// calls to console.log should be replaced with calls to a logging service such as loggly or sentry

export function debug(message) {
    console.log("DEBUG: " + message);
}

export function info(message) {
    console.log("INFO: " + message);
}

export function error(message) {
    console.log("ERROR: " + message);
}

export function warning(message) {
    console.log("warn: " + message);
}
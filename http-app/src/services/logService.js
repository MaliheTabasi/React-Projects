import Raven from 'raven-js';

function init() {
    Raven.config(
        'https://051aaf9bbbe14d2287e89e9a515c2ba7@o476760.ingest.sentry.io/5516853',
        {
            release: '1-0-0',
            environment: 'development-test',
        }
    ).install();
}

function log(error) {
    Raven.captureException(error);
}

export default {
    init,
    log,
};

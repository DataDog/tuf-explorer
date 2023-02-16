// Thanks https://github.com/sveltejs/kit/issues/6841#issuecomment-1330555730

import {server as app} from "./build/index.js"

const shutdownGracefully = (signal) => () => {
    console.log(`Got signal ${signal}, shutting down...`);
    app.server.close();
}

process.on("SIGINT", shutdownGracefully("SIGINT"));
process.on("SIGTERM", shutdownGracefully("SIGTERM"));

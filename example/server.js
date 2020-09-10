const httpProxy = require("http-proxy");
const host = "localhost";
const port = 4001;

/**
 * 
 * @param {*} WSEndPoint 
 * @param {*} host 
 * @param {*} port 
 * 
 * Function to create a new server to run a headless browser
 */
async function createServer(WSEndPoint, host, port) {
  await httpProxy
    .createServer({
      target: WSEndPoint, // where we are connecting
      ws: true,
      localAddress: host // where to bind the proxy
    })
    .listen(port); // which port the proxy should listen to
  return `ws://${host}:${port}`; // returns websocket address
}

// section actually creates chrome instance and runs uppeteer commands - would like to add my code from other repo here?
const puppeteer = require("puppeteer");

puppeteer.launch().then(async browser=>{
  const pagesCount = (await browser.pages()).length; // just to make sure we have the same stuff on both place
  const browserWSEndpoint = await browser.wsEndpoint();
  const customWSEndpoint = await createServer(browserWSEndpoint, host, port); // create the server here
  console.log({ browserWSEndpoint, customWSEndpoint, pagesCount });
})
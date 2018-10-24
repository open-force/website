import * as express from 'express';
import * as path from 'path';
import sfdcAuth from './lib/sfdcAuthService'
import { ResourceService } from './lib/resourceService';

require('dotenv').config({ encoding: 'utf8' });
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

sfdcAuth().then(()=>{
    start();
});

async function start() {

  const app = express();
  const PORT = process.env.PORT || 5000;

  let resourceService = new ResourceService();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-app/dist')));

  app.get('/api/repos', async function (request, response) {
    response.send(await resourceService.getRepoData());
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../react-app/dist', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });

}
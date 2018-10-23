import * as crypto from 'crypto';
import { setDefaultConfig } from 'ts-force';
import * as fs from 'fs';
import * as path from 'path';
import { getJWTToken } from 'salesforce-jwt-promise';

export default async function () {
  let authInfo: { accessToken: string, instanceUrl?: string }
  if (process.env.NODE_ENV !== 'development') {
    //use website-org env default dx user
    let orgInfo = JSON.parse(require('child_process').execSync("sfdx force:org:display --json", { cwd: 'website-org' }).toString('utf8'));
    let { accessToken, instanceUrl } = orgInfo.result;
    authInfo = { accessToken, instanceUrl };
  } else {
    let { access_token: accessToken, instance_url: instanceUrl } = await getAuthJWT();
    authInfo = { accessToken, instanceUrl };
  }
  setDefaultConfig(authInfo);
}

function getAuthJWT() {
  var clientId = process.env.CONSUMER_KEY;
  var aesKey = process.env.AES_KEY;
  let ivKey = new Buffer(process.env.IV_KEY, 'hex');
  let userName = process.env.SFDC_USER;

  // retrieve encrypted key
  var encryptedKey = fs.readFileSync(path.resolve(__dirname, '../../build/server.key.enc'), 'utf8'); //needs to be encrypted using `openssl enc -aes-256-cbc`

  //decrypt
  let decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, ivKey);
  decipher.setAutoPadding(false);
  let privateKey = decipher.update(encryptedKey, 'hex', 'utf8')
  privateKey += decipher.final('utf8');

  return getJWTToken(
    {
      clientId,
      // audience: 'https://test.salesforce.com',
      privateKey,
      userName
    }
  );
}
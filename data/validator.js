var Validator = require('jsonschema').Validator;
var fs = require('fs');
var v = new Validator();
let instance = JSON.parse(fs.readFileSync('./data/repositories.json').toString());
var schema = JSON.parse(fs.readFileSync('./data/app.schema.json').toString());

let errors = v.validate(instance, schema).errors;
if(errors.length){
  process.stderr.write(errors.join(require('os').EOL));
  process.exit(1);
}else{
  return 0;
}
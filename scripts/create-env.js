const fs = require('fs');

fs.writeFileSync('./.inv', `API=${process.env.API}`)
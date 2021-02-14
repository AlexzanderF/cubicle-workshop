const { port } = require('./config/config');
const app = require('express')();

require('./config/database');
require('./config/express')(app);
require('./config/routes')(app);

app.listen(port, console.log(`Listening on port ${port}! Now its up to you...`));
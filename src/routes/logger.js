const express = require('express');
const router = express.Router();
const developmentLogger = require('./loggers/developmentLogger');
const productionLogger = require('./loggers/productionLogger');

router.get('/loggerTest', (req, res) => {
    developmentLogger.debug('Mensaje de debug desde /loggerTest');
    productionLogger.info('Mensaje de información desde /loggerTest');
    productionLogger.error('Mensaje de error desde /loggerTest');
    res.send('Logs generados en /loggerTest');
});

module.exports = router;
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  console.log('testing this shit again');
  res.send('testing this shit');
});

module.exports = router;

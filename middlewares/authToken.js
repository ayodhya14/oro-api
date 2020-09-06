// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'Invalid user ID';
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error('Invalid request!')
//     });
//   }
// };

// // const express = require('express');
// // const router = express.Router();

// // const auth = require('../middleware/auth');

// // const stuffCtrl = require('../controllers/stuff');

// // router.get('/', auth, stuffCtrl.getAllStuff);
// // router.post('/', auth, stuffCtrl.createThing);
// // router.get('/:id', auth, stuffCtrl.getOneThing);
// // router.put('/:id', auth, stuffCtrl.modifyThing);
// // router.delete('/:id', auth, stuffCtrl.deleteThing);

// // module.exports = router;
const jwt = require('jsonwebtoken');
require('dotenv').config();
 
// AUTHENTIFICATION WITH TOKEN
module.exports = (request, response, next) => {
   try {
       const token = request.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
       const userId = decodedToken.userId;
       request.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       response.status(401).json({ error });
   }
};
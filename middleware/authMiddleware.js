const jwt = require('jsonwebtoken');

// const middlewareAuth = (req, res, next) => {
//   const authHeader = req.get('Authorization');
//   console.log(req.roles);
//   if (!authHeader) {
//     const error = new Error('Not authenticated.');
//     error.statusCode = 401;
//     throw error;
//   }
//   const token = authHeader.split(' ')[1];
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     err.statusCode = 500;
//     res.json({err})
//   }
//   if (!decodedToken) {
//     const error = new Error('Not authenticated.');
//     error.statusCode = 401;
//     throw error;
//   }
//   req.userId = decodedToken.userId;
//   next();
// };

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        const authHeader = req.get('Authorization');
        console.log(req.roles);
        if (!authHeader) {
          const error = new Error('Not authenticated.');
          error.statusCode = 401;
          throw error;
        }
        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
          decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
          err.statusCode = 500;
          res.json({err})
        }
        if (!decodedToken) {
          const error = new Error('Not authenticated.');
          error.statusCode = 401;
          throw error;
        }
        console.log(decodedToken.role)
        if (roles.length && !roles.includes(decodedToken.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
        req.userId = decodedToken.userId;
        next();
      };

    // return [
    //     // authenticate JWT token and attach user to request object (req.user)
    //     jwt.verify(token, process.env.JWT_SECRET),

    //     // authorize based on user role
    //     (req, res, next) => {
    //         if (roles.length && !roles.includes(req.user.role)) {
    //             // user's role is not authorized
    //             return res.status(401).json({ message: 'Unauthorized' });
    //         }

    //         // authentication and authorization successful
    //         next();
    //     }]
    
}

module.exports = {
    authorize
}
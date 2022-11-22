const { readToken } = require('../helpers/jwt');
const {User} = require('../models/index');

let authenticate = async (req, res, next) => {
  try {
    if(!req.headers.access_token) throw{name: 'Not Login'}
    const token = readToken(req.headers.access_token);
    const user = await User.findOne({ where: { email: token.email } });
    if (!user) throw{name: "Unauthorized"}
    req.user = {
      id: user.id,
      role: user.role,
      email: user.email
    };
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
const errorHandler = (err, req, res, next) => {
  console.log(err)
  switch (err.name) {
    case "SequelizeValidationError":
      const msg = err.errors.map((el) => el.message);
      res.status(400).json({ msg: msg });
      break;
    case "Email/password is required":
      res.status(400).json({ msg: err.name });
      break;
    case "invalid email/password":
      res.status(401).json({ msg: err.name });
      break;
    case "Unauthorized":
      res.status(401).json({ msg: err.name });
      break;
    case "Not Login":
      res.status(401).json({ msg: err.name });
      break;
    case "Item not found":
      res.status(404).json({ msg: err.name });
      break;
    case "Category not found":
      res.status(404).json({ msg: err.name });
      break;
    case "Forbidden":
      res.status(403).json({ msg: err.name });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ msg: "Invalid Token" });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ msg: "Email must be unique" });
      break;
    default:
      res.status(500).json({ msg: `Internal server error` });
  }
}

module.exports = errorHandler
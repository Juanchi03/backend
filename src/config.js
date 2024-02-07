require('dotenv').config();

module.exports = {
  dbConnectionString: process.env.DB_CONNECTION_STRING,
  secretKey: process.env.SECRET_KEY,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
};

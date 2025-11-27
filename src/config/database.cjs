// Casa
// module.exports = {
//   dialect: "postgres",
//   host: "localhost",
//   username: "postgres",
//   password: "Henry@2009",
//   database: "projeto-ifms",
//   define: {
//     timestamp: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };

// Escola

module.exports = {
  dialect: "sqlite",
  storage: "./database.sqlite",
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};

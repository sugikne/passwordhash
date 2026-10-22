const bcrypt = require("bcryptjs");

async function generateHash() {
  const password = "staffblue123";
  const hash = await bcrypt.hash(password, 10);

  console.log("=================================");
  console.log("PASSWORD :", password);
  console.log("HASH     :", hash);
  console.log("=================================");
}

generateHash();
const crypto = require('crypto');

// Function to generate a random 32-bit secret key
const generateSecretKey =() => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let secretKey = '';
  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    secretKey += characters[randomIndex];
  }
  return secretKey;
};

// Generate a random 32-bit secret key
const secretKey = generateSecretKey();
// console.log(secretKey)
module.exports=secretKey;
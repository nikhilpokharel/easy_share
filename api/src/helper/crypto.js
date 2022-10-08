const config = require("@src/config");
const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const secretKey = config.meroshare.secret;

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return iv.toString("hex") + "_%_" + encrypted.toString("hex");
};

const decrypt = (hashedPassword) => {
  const seperatePassword = hashedPassword.split("_%_");
  const hash = {
    iv: seperatePassword[0],
    content: seperatePassword[1],
  };
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

module.exports = {
  encryptText: encrypt,
  decryptText: decrypt,
};

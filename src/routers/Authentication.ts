import express from "express";
import kc from "keycloak-backend";
import fs from "fs";

const router: express.Router = express.Router();

router.use("/", async (req, res) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
    console.log("no authorization header");
    res.status(403).send();
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  if (!accessToken) {
    console.log("no bearer");
    res.status(403).send();
    return;
  }

  const cert = fs.readFileSync("cert.pem");
  const keycloak = kc({
    realm: "dotbase",
    "auth-server-url": "http://127.0.0.1:8080",
    client_id: "traefik-jwt-auth",
  });
  try {
    const token = await keycloak.jwt.verifyOffline(accessToken, cert);
    console.log("token expiration:");
    console.log(token.isExpired());
  } catch (e) {
    res.status(403).send();
    return;
  }

  res.status(200).send();
});

export default router;

import express from "express";
import AuthenticationError from "../utils/AuthenticationError";

import keycloak from "keycloak-backend";
import fs from "fs";

export default class AuthenticationService {
  private static get certificate(): Buffer {
    return fs.readFileSync("cert.pem");
  }

  private static get keycloakInstance() {
    return keycloak({
      realm: "dotbase",
      "auth-server-url": "http://127.0.0.1:8080",
      client_id: "traefik-jwt-auth",
    });
  }

  public static async authenticate(req: express.Request) {
    if (!req.headers.authorization)
      throw new AuthenticationError("Authorization header is missing.");

    if (!req.headers.authorization.startsWith("Bearer "))
      throw new AuthenticationError("Authorization header is required to have bearer format.");

    const accessToken = req.headers.authorization.replace("Bearer ", "");

    if (!accessToken)
      throw new AuthenticationError("Authorization header is missing an access token.");

    await this.keycloakInstance.jwt.verifyOffline(accessToken, this.certificate);
  }
}

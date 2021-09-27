import express from "express";
import AuthenticationError from "../utils/AuthenticationError";

import keycloak from "keycloak-backend";
import CertficateModel from "@/models/Certificate";

export default class AuthenticationService {
  private static get keycloakInstance() {
    return keycloak({});
  }

  public static async verify(req: express.Request): Promise<void> {
    if (!req.headers.authorization)
      throw new AuthenticationError("Authorization header is missing.");

    if (!req.headers.authorization.startsWith("Bearer "))
      throw new AuthenticationError("Authorization header is required to have bearer format.");

    const accessToken = req.headers.authorization.replace("Bearer ", "");

    if (!accessToken) throw new AuthenticationError("Access token is missing.");

    for (const certificate of CertficateModel.certificates) {
      const tokenIsValid = await this.isValid(accessToken, certificate);
      if (tokenIsValid) return;
    }

    throw new AuthenticationError("Access token is invalid.");
  }

  private static async isValid(accessToken: string, certificate: string): Promise<boolean> {
    try {
      await this.keycloakInstance.jwt.verifyOffline(accessToken, certificate);
      return true;
    } catch (e) {
      return false;
    }
  }
}

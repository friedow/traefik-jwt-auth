import express from "express";
import AuthenticationError from "../utils/AuthenticationError";

export default class AuthenticationService {
  public static check(req: express.Request) {
    if (!req.headers.authorization) {
      throw new AuthenticationError("Authorization header is missing.");
    }
  }
}

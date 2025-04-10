import { Router } from "express";
import {
  createSubscription,
  getUserSubscription,
} from "../controller/subscription.controller.js";
import authorize from "../middleware/auth.middleware.js";

const subscriptionRoutes = Router();

subscriptionRoutes.post("/", authorize, createSubscription);
subscriptionRoutes.get("/user/:id", authorize, getUserSubscription);
subscriptionRoutes.put("/:id/cancel", (req, res) => {
  res.send({ title: "cancel subscription of user" });
});
subscriptionRoutes.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "get upcoming renewals" });
});
subscriptionRoutes.get("/:id", (req, res) => {
  res.send({ tile: "one subscriptions details" });
});
subscriptionRoutes.put("/:id", (req, res) => {
  res.send({ title: "update subscription details" });
});
subscriptionRoutes.delete("/:id", (req, res) => {
  res.send({ title: "delete subscription" });
});

export default subscriptionRoutes;

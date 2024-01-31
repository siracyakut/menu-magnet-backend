import Ticket from "../models/ticket.js";
import { validationResult } from "express-validator";

export const createTicket = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, data: errors.array()[0].msg });
  }

  try {
    const ticket = new Ticket(req.body);
    const doc = await ticket.save();

    if (doc) {
      res.status(201).json({ success: true, data: doc._doc });
    } else {
      res.status(500).json({
        success: true,
        data: "An error occured while creating your ticket.",
      });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

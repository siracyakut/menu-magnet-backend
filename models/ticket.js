import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  inoviceId: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
});

const Ticket = mongoose.model("tickets", ticketSchema);

export default Ticket;

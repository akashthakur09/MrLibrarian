const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  returnDate: { 
    type: Date 
  },
  rent: { 
    type: Number 
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);

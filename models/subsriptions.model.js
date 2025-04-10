import mongoose from "mongoose";

const subscriptionsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "subscription name is required"],
      minLength: 2,
      maxLength: 100,
      trim: true,
    },
    price: {
      type: String,
      require: [true, "subscription price is required"],
      min: [0, "subscription minimum value is 0"],
    },
    currency: {
      type: String,
      enum: ["inr", "usd"],
      default: "inr",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "quartly", "halfyearly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "anime",
        "others",
      ],
      require: true,
    },
    paymentMethod: {
      type: String,
      require: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (val) => val <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (val) {
          return val > this.startDate;
        },
        message: "Start date must be after the start Date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionsSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      quartly: 90,
      halfyearly: 180,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // auto update the status of subscription if date is passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionsSchema);

export default Subscription;

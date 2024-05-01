// ./models/subscriber.js
"use strict";

/**
 * @TODO: Listing 14.3 (p. 206)
 * 스키마 정의
 */
const Mongoose = require("mongoose"),
    subscriberSchema = Mongoose.Schema({
        name :String,
        email :String,
        phone: Number,
        newsletter: Boolean
    });
module.exports = Mongoose.model(
    "Subscriber",
    subscriberSchema
);
// Subscriber 모델 생성

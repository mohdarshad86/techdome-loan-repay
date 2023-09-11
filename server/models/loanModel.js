const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amountRequired: {
        type: Number,
        required: true,
    },
    loanTerm: {
        type: Number,
        required: true,
    },
    scheduledRepayments: [
        {
            date: Date,
            amount: Number,
            status: {
                type: String,
                enum: ['PENDING', 'PAID'],
                default: 'PENDING',
            },
        },
    ],
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'PAID'],
        default: 'PENDING',
    },
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
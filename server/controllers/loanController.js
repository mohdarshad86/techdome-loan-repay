const loanModel = require('../models/loanModel'); // Import the Loan model

const createLoan = async (req, res) => {
    try {
        const userId = req.user._id;
        const { amountRequired, loanTerm } = req.body;

        const weeklyRepayment = amountRequired / loanTerm;
        const scheduledRepayments = [];
        const currentDate = new Date();

        for (let i = 0; i < loanTerm; i++) {
            const repaymentDate = new Date(currentDate);
            repaymentDate.setDate(repaymentDate.getDate() + 7 * (i + 1));

            scheduledRepayments.push({
                date: repaymentDate,
                amount: weeklyRepayment.toFixed(2),
                status: 'PENDING',
            });
        }

        const loan = new loanModel({
            userId,
            amountRequired,
            loanTerm,
            scheduledRepayments,
        });

        await loan.save();

        return res.status(201).json({ message: 'Loan created successfully', loan });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating loan' });
    }
};

const getLoansByUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const loans = await loanModel.find({ userId: userId });

        return res.status(200).json(loans);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching loans' });
    }
};

const approveLoan = async (req, res) => {
    try {

        if (req.user.role != "Admin") {
            return res.status(403).json({ message: 'Permission denied' });
        }

        const loanId = req.params.loanId;

        const loan = await loanModel.findById(loanId);

        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        loan.status = 'APPROVED';

        await loan.save();

        return res.status(200).json({ message: 'Loan approved successfully', loan });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error approving loan' });
    }
};

const addRepayment = async (req, res) => {
    try {
        const loanId = req.params.loanId;
        const { amount } = req.body;

        const loan = await loanModel.findById(loanId);

        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        if (loan.status === 'PAID') {
            return res.status(400).json({ message: 'Loan Already Paid' });
        }

        const pendingRepayment = loan.scheduledRepayments.find(
            (repayment) => repayment.status === 'PENDING'
        );

        if (!pendingRepayment) {
            return res.status(400).json({ message: 'No pending repayments for this loan' });
        }

        if (parseFloat(amount) < parseFloat(pendingRepayment.amount)) {
            return res.status(400).json({ message: 'Invalid repayment amount' });
        }

        pendingRepayment.status = 'PAID';

        const remainingPendingRepayments = loan.scheduledRepayments.filter(
            (repayment) => repayment.status === 'PENDING'
        );

        if (remainingPendingRepayments.length === 0) {
            loan.status = 'PAID';
        }

        await loan.save();

        return res.status(200).json({ message: 'Repayment added successfully', loan });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding repayment' });
    }
};

const getAllLoans = async (req, res) => {
    try {
        const loans = await loanModel.find().populate('userId');
        return res.json(loans);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createLoan, getLoansByUser, approveLoan, addRepayment, getAllLoans }
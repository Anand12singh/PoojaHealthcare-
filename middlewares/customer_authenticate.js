import pkg from 'jsonwebtoken';
const { verify } = pkg;
import Customer from '../db/models/customer.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

const customer_authenticate = catchAsync(async (req, res, next) => {
    // Get the token from headers
    let token = '';

    // Check for bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Check if token is valid
    const tokenDetail = verify(token, process.env.JWT_SECRET_KEY);

    const freshCustomer = await Customer.findByPk(tokenDetail.id); // Customer or carwasher login

    if (!freshCustomer) {
        throw new AppError('Customer does not exist', 201);
    }

    // Attach customer details to request
    req.user = freshCustomer;
    return next();
});

export default customer_authenticate;
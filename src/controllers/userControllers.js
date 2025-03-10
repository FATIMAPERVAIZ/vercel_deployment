const Customer = require("../models/customer");
const mongoose = require("mongoose")


const getAllUsers = (req, res) => {
    res.send('My all users');
}

const getUserByUserId = (req, res) => {
    res.send('Get user with given user ID')
}

const createCustomer = async (req, res) => {
    console.log("Received Data:", req.body); // ✅ Check if all fields are received

    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(200).json({ message: "Customer created", customer });
    } catch (error) {
        console.error("Error adding customer:", error);
        res.status(500).json({ message: "Error adding customer", error: error.message });
    }
};


const getAllCustomers = async(req,res) => {
    try {
        const customer = await Customer.find();
        res.status(200).json({customer})
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({message: 'Error getting users', error: error})
    }
}

const getCustomerById = async(req,res) => {
    const customerId = req.query.customerId
    try {
        const customer = await Customer.findOne({customerId});
        if (customer) {
            res.status(200).json({customer})
        } else {
            res.status(404).json({message: 'Customer not found.'})
        }
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({message: 'Error getting users', error: error})
    }
}


const updateCustomerById = async(req, res) => {
  
    const { customerId } = req.params;
    console.log("Customer ID:", customerId, "| Type:", typeof customerId);

    const updateScript = {
        $set: {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            contact: req.body.contact
        }
    };
    try {
        const customer = await Customer.updateOne({customerId}, updateScript);
        if (customer) {
            res.status(200).json({customer})
        } else {
            res.status(404).json({message: 'Customer not found.'})
        }
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({message: 'Error updating customer', error: error})
    }
}

const deleteCustomerById = async (req, res) => {
    const { customerId } = req.params; // Change from query to params

    try {
        const customer = await Customer.deleteOne({ customerId });

        if (customer.deletedCount > 0) {
            res.status(200).json({ message: 'Customer deleted successfully' });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Error deleting customer', error: error.message });
    }
};


module.exports = { 
    getAllUsers, 
    getUserByUserId, 
    createCustomer, 
    getAllCustomers, 
    getCustomerById, 
    updateCustomerById, 
    deleteCustomerById 
}
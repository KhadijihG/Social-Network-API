// import { ObjectId } from 'mongodb';
import { User } from '../models/index.js';
/**
 * GET All Students /students
 * @returns an array of Students
*/
export const getAllUsers = async (_req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('thoughts');
        if (user) {
            res.json({
                user
            });
        }
        else {
            res.status(404).json({
                message: 'Student not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const updateUser = async (req, res) => {
    try {
        const course = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!course) {
            res.status(404).json({ message: 'No course with this id!' });
        }
        res.json(course);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
export const createUser = async (req, res) => {
    try {
        const data = await User.create(req.body);
        res.json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const deleteUser = async (req, res) => {
    try {
        const student = await User.findOneAndDelete({ _id: req.params.userId });
        if (!student) {
            return res.status(404).json({ message: 'No such student exists' });
        }
        return res.json({ message: 'Student successfully deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

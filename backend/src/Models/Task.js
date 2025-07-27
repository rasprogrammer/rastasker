const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        taskId: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        taskType: {
            type: String,
            enum: ['issue', 'complain', 'development', 'requirement', 'feature', 'bugfix', 'enhancement'],
            default: 'requirement'
        },
        files: [{
            type: String,
        }],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Task', taskSchema);
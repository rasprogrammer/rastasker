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
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        taskType: {
            type: String,
            enum: ['design', 'development', 'bugfix', 'documentation', 'maintenance', 'requirement'],
            default: 'requirement'
        },
        files: [{
            type: String,
        }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Task', taskSchema);
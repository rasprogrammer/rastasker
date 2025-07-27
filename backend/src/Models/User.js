const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        parentuserid: {
            type: String,
        },
        removed: {
            type: Boolean,
            default: false,
        },
        enabled: {
            type: Boolean,
            default: false,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
        },
        phone: {
            type: String,
        },
        photo: {
            type: String,
            trim: true,
        },
        country: String,
        created: {
            type: Date,
            default: Date.now(),
        },
        role: {
            type: String,
            default: 'admin',
            enum: ['admin', 'member'],
        },
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        },
        googleId: {
            type: String,
        },
        assignedTasks: [
            {
                task: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Task',
                    required: true,
                },
                assignedAt: {
                    type: Date,
                    default: Date.now,
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);
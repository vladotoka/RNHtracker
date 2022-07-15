const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//pre-save hook
userSchema.pre('save', function (next) {
    const user = this;

    //if the user has not modified their password in any way
    if (!user.isModified('password')) {
        return next();
    }

    //generating SALT
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        //hashing the password
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            
            //replace clean text password with hashed
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }

            if (!isMatch) {
                return reject(false)
            }

            resolve(true);
        });
    });
}

mongoose.model('User', userSchema);
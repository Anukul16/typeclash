const db = require('../config/dbconfig');
const bcrypt = require('bcrypt');

let counter = 0;

const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    counter++;
    const uniqueId = `${timestamp}${randomNum}${counter}`;
    return uniqueId;
}

const getUserByEmail = (email, callback) => {
    const query = 'select * from user where email = ? limit 1';
    db.query(query, [email], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

const signup = (username, email, password, callback) => {
    try {
        const userId = generateUniqueId();
        const createdAt = new Date().toISOString();
    
        getUserByEmail(email, (err, existingUser) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (existingUser.length > 0) {
                const error = new Error("Email is already signed in");
                callback(error, null);
                return;
            }
            const query = 'INSERT INTO user (id, username, email, password, created_at) VALUES (?, ?, ?, ?, ?)';
    
            db.query(query, [userId, username, email, password, createdAt], (err, res) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, res);
            });
        });
    } catch (err) {
        callback(err, null);
    }
}

const login = (email, password, callback) => {
    try {
        const query = 'select password from user where email = ?';
    
        db.query(query, [email], (err, user) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (user.length === 0) {
                const error = new Error("User not found");
                callback(error, null);
                return;
            }
            const hashed_password = user[0].password;
    
            bcrypt.compare(password, hashed_password, (err, passwordMatch) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                if (!passwordMatch) {
                    const error = new Error("Wrong Password");
                    callback(error, null);
                    return;
                }
                const response = { message: "Login Successful" };
                callback(null, response);
            });
        });
    } catch (err) {
        callback(err, null);
    }
}

module.exports = { signup, login };

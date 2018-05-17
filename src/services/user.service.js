const { User } = require('../models/user.model');
const { hash, compare } = require('bcrypt');
const { sign, verify } = require('../helpers/jwt');

class UserService {
    static async getUserObject(user) {
        const userInfo = user.toObject();
        const token = await sign({ _id: user._id });
        userInfo.token = token;
        delete userInfo.password;
        return userInfo;
    }

    static async signIn(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('INVALID_USER_INFO');
        const same = await compare(password, user.password);
        if (!same) throw new Error('INVALID_USER_INFO');
        return UserService.getUserObject(user);
    }

    static async signUp(email, password, name) {
        const encrypted = await hash(password, 8);
        const user = new User({ email, password: encrypted, name });
        await user.save();
        return UserService.getUserObject(user);
    }

    static async check(token) {
        const { _id } = await verify(token);
        const user = await User.findById(_id);
        if (!user) throw new Error('CANNOT_FIND_USER');
        return getUserObject(user);
    }
}

module.exports = { UserService };

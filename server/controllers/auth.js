let User = require('../schemas/user');
let { BadRequest } = require('../errors');
let { generatePayload } = require('../utils/generate_payload_and_verify_token');
let sendCookies = require('../utils/send_cookie');

let register = async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequest(`Please provide username and password`);
    }

    let user = await User.findOne({ username });

    if (user) {
        throw new BadRequest(`You are already registered`);
    }

    await User.create(req.body);

    res.status(201).json({ msg : `You are registered` });
}

let login = async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequest(`Please provide username and password`);
    }

    let user = await User.findOne({ username });

    if (!user) {
        throw new BadRequest(`You are not registered`);
    }

    let isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new BadRequest(`Password does not match`);
    }

    let payload = generatePayload(user);
    sendCookies(payload, res);

    res.status(200).json({ msg : `You are now logged in` });
}

let logout = async (req, res) => {
    res.cookie('supToken', 'token', {
        httpOnly : true,
        maxAge : new Date(Date.now() - 60 * 60 * 24)
    })

    res.status(200).json({ msg : `User logged out` });
}


module.exports = { register, login, logout };
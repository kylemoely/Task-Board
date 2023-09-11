const User = require('../../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401); 
    const refreshToken = cookies.jwt;

    const checkUser = await User.findOne({ refreshToken });
    if(!checkUser) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err || checkUser.email !== decoded.email) return res.sendStatus(403);
        const user = { 
            id: checkUser.id,
            email: checkUser.email,
            firstName: checkUser.firstName,
            lastName: checkUser.lastName
        }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.json({ accessToken, user })
    })
}

module.exports = handleRefreshToken;
const { User, Project } = require('../../models/');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401); 
    const refreshToken = cookies.jwt;

    const checkUser = await User.findOne({
        where: { refreshToken },
        include: [Project]
    });
    if(!checkUser) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err || checkUser.email !== decoded.email) return res.sendStatus(401);
        const user = { 
            id: checkUser.id,
            email: checkUser.email,
            firstName: checkUser.firstName,
            lastName: checkUser.lastName,
            color: checkUser.color,
            projects: checkUser.projects
        }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.json({ accessToken, user })
    })
}

module.exports = handleRefreshToken;
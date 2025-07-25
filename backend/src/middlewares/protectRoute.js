const protectRoute = (userRoles = []) =>
    (req, res, next) => {
        if (!req?.user?.role) {
            return res.status(409).json({
                message: 'Access Denied. No role provided.'
            })
        }

        const role = req.user.role;
        if (!userRoles.includes(role)) {
            return res.status(403).json({
                message: `Access Denied. you cann't access this route.`
            })
        }
        next();
    }

module.exports = protectRoute;
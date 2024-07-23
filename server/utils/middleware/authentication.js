import jwt from "jsonwebtoken";

const authentication = {
    adminRole(req, res, next) {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Missing token' })
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const { role } = decoded;
            if (!role) {
                return res.status(403).json({ message: "Role not found in token" });
            }

            if (role !== 'Admin') {
                return res.status(403).json({ message: "Not admin role" });
            }

            Object.assign(req, { user: decoded });

            next();

        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    },

    userRole(req, res, next) {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Missing token' })
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const { role } = decoded;
            if (!role) {
                return res.status(403).json({ message: "Role not found in token" });
            }

            if (role !== 'User') {
                return res.status(403).json({ message: "Not User role" });
            }

            Object.assign(req, { user: decoded });

            next();

        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    },

    common(req, res, next) {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Missing token' })
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            Object.assign(req, { user: decoded });
            next();

        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }

}

export { authentication };
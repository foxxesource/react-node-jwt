import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/users-model.js';
import passport from '../config/passport.js'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const router = Router();

// Add this to your user.js backend routes
router.get('/check-auth', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ isAuthenticated: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded._id).select('-password');

        if (!user) {
            return res.json({ isAuthenticated: false });
        }

        res.json({
            isAuthenticated: true,
            user
        });
    } catch (err) {
        res.json({ isAuthenticated: false });
    }
});

router.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;

    const user = await User.create({
        username,
        email,
        password
    })
    res.status(201).json(user)
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Authentication error' });
        }
        if (!user) {
            return res.status(401).json({ message: info?.message || 'Login failed' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        // Return user data to update frontend state immediately
        res.json({
            message: 'Login success!',
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    })(req, res, next);
}); router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Authentication error' });
        }
        if (!user) {
            return res.status(401).json({ message: info?.message || 'Login failed' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        // Return user data to update frontend state immediately
        res.json({
            message: 'Login success!',
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    })(req, res, next);
});

router.post("/logout", (req, res) => {
    try {
        // Clear the JWT token cookie
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });

        // Optional: Add token to blacklist if you want to implement token invalidation
        // (This would require a token blacklist system)

        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during logout'
        });
    }
});

const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bintang.duinata31@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD
    }
})

router.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;
    try {
        await transpoter.sendMail({
            from: "bintang.duinata31@gmail.com",
            to,
            subject,
            text
        })
        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
})

router.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }))

router.get("/login/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        let token = null;
        if (req.user) {
            const _id = req.user._id;
            const payload = { _id };
            token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

            // Set cookie and redirect to frontend
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            // Redirect to your frontend with success message
            return res.redirect('http://localhost:5173/?login=success');
        }
        res.redirect('http://localhost:5173/login?error=google-auth-failed');
    }
);

export default router
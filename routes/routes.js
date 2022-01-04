const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserAuthModel = require('../model/auth_log');
const router = express.Router();

    router.post(
        '/signup',
        passport.authenticate('signup', { session: false }),
        async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
        }
    );
    

    router.post(
        '/login',
        async (req, res, next) => {
            passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    console.log('errr',info);

                if (err || !user) {
                    const error = new Error('An error occurred.');

                    return next({err:info});
                }

                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return next(error);
                        try{
                            UserAuthModel.create({user_id: user._id});
                            const body = { _id: user._id, email: user.email };
                            const token = jwt.sign({ user: body }, 'TOP_SECRET');
                            return res.json({ token });
                        }catch (err){

                        }
                    }
                );
                } catch (error) {
                     return next(error);
                }
            }
            )(req, res, next);
        }
    );

module.exports = router;



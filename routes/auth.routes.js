const {Router} = require("express")
const User = require("../modals/user")
const {check, validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = Router()
const config = require("config")


// api/auth/register
router.post("/register",
    [
        check('email', 'Incorrect email ').isEmail(),
        check('password', 'min length password 6 symbol ').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            console.log("body", req.body)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data registration "
                })
            }

            const {email, password} = req.body
            const condidate = await User.findOne({email})
            if (condidate) {
                return res.status(400).json({message: "This user busy"})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            await user.save()

            res.status(201).json({message: "User create"})

        } catch (e) {
            res.status(500).json({message: "Error try again"})
        }
    })
// api/auth/login
router.post("/login",
    [
        check('email', 'input correct email').normalizeEmail().isEmail(),
        check('password', 'input correct password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data login in system "
                })
            }
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: "user not find"})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: "Incorrect password,try again"})
            }
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {
                    expiresIn: "1h"
                }
            )
            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: "Error try again"})
        }

    })
module.exports = router

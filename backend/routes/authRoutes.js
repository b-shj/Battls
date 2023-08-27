const express = require( "express" );
const router = express.Router();
const userController = require('../controllers/userController');


// Sign Up (Create user)
// **Modify
// * Make sure credentials dont exist already (username(not case sensitive), and email) *
// * Return userId for state *
// Potentially create session/cookie
router.post('/signup', async (req, res) => {
    const success = await userController.createUser(req.body);
    res.json(success);
})

// Login (Authenticate)
    // Authenticate (Username || Email) && Password
    // Potentially create session/cookie
router.post('/login', async (req, res) => {
    const returned = await userController.authenticate(req.body);
    res.session.userId = returned.usr_id;
    res.json(returned);
})

// Is Active (Check for active session) (Later)
    // Check if req cookie matches session cookie
    // Return boolean w/ userIf if true
router.get('/isactive', async (req, res) => {
    if (req.session && req.session.userId) {
        // Session is active, return user ID
        res.json({ isActive: true, userId: req.session.userId });
    } else {
        // No active session
        res.json({ isActive: false });
    }
});
    

// Signout (Delete session)
    // Destroy session
router.post('/signout', async (req, res) => {
    if (req.session) {
        // Destroy session
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                res.json({ message: 'Successfully signed out' });
            }
        });
    } else {
        res.status(400).json({ message: 'No session to sign out from' });
    }
});
    

module.exports = router;

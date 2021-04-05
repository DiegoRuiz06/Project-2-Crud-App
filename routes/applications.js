const router = require("express").Router();
const applicationsCtrl = require('../controllers/applications');



/* GET Requests */
router.get('/', isLoggedIn, applicationsCtrl.index);
router.get('/new', isLoggedIn, applicationsCtrl.new);
router.get('/:id', isLoggedIn, applicationsCtrl.show);
router.get('/:id/update', isLoggedIn, applicationsCtrl.updateForm);
router.get('/:id/new-follow-up', isLoggedIn, applicationsCtrl.newFollow);

/* POST Requests */
router.post('/', isLoggedIn, applicationsCtrl.create);

/* PUT Requests */
router.put('/:id', isLoggedIn, applicationsCtrl.update);

/* DELETE Requests */
router.delete('/:id', isLoggedIn, applicationsCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;
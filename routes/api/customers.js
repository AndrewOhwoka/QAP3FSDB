var router = require('express').Router();
const customersDal = require('../../services/pg.customers.dal')
// const customersDal = require('../../services/m.customers.dal')

// api/customers
router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/customers/ GET ' + req.url);
    try {
        let theCustomers = await customersDal.getCustomers(); 
        res.json(theCustomers);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
// api/customers/:id
router.get('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/customers/:id GET ' + req.url);
    try {
        let anCustomer = await customersDal.getCustomerByCustomerId(req.params.id); 
        if (anCustomer.length === 0) {
            // log this error to an error log file.
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        }
        else
            res.json(anCustomer);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
router.post('/', async (req, res) => {
    if(DEBUG) { 
        console.log('ROUTE: /api/customers/ POST');
        // console.log(req);
    }
    try {
        await customersDal.addCustomer(req.body.firstName, req.body.lastName );
        res.statusCode = 201;
        res.json({message: "Created", status: 201});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    } 
});
router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/customers PUT ' + req.params.id);
    try {
        await customersDal.putCustomer(req.params.id, req.body.firstName, req.body.lastName);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/customers PATCH ' + req.params.id);
    try {
        await customersDal.patchCustomer(req.params.id, req.body.firstName, req.body.lastName);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/customers DELETE ' + req.params.id);
    try {
        await customersDal.deleteCustomer(req.params.id);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
// // list the active api routes
// if(DEBUG) {
//     router.stack.forEach(function(r){
//         if (r.route && r.route.path){
//         console.log(r.route.path)
//         }
//     });
// }
module.exports = router;
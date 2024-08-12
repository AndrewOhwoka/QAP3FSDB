const express = require("express");
const router = express.Router();
const customersDal = require("../services/pg.customers.dal");
// const customersDal = require('../services/m.customers.dal')

// https://localhost:3000/customers/
router.get("/", async (req, res) => {
  // const theCustomers = [
  //     {first_name: 'Youn', last_name: 'Yuh-jung'},
  //     {first_name: 'Laura', last_name: 'Dern'},
  //     {first_name: 'Regina', last_name: 'King'}
  // ];
  try {
    let theCustomers = await customersDal.getCustomers();
    if (DEBUG) console.table(theCustomers);
    res.render("customers", { theCustomers });
  } catch {
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  // const anCustomer = [
  //     {first_name: 'Regina', last_name: 'King'}
  // ];
  try {
    const anCustomer = await customersDal.getCustomerByCustomerId(
      req.params.id
    ); // from postgresql
    if (DEBUG) console.log(`customers.router.get/:id ${anCustomer}`);
    if (anCustomer) res.render("customer", { anCustomer });
    else res.render("norecord");
  } catch {
    res.render("503");
  }
});

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("customer.Replace : " + req.params.id);
  res.render("customerPut.ejs", {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    theId: req.params.id,
  });
});

// https://localhost:3000/customers/205/edit
router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("customer.Edit : " + req.params.id);
  res.render("customerPatch.ejs", {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    theId: req.params.id,
  });
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("customer.Delete : " + req.params.id);
  res.render("customerDelete.ejs", {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    theId: req.params.id,
  });
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("customers.POST");
  try {
    await customersDal.addCustomer(
      req.body.firstName,
      req.body.lastName,
      req.body.email
    );
    res.redirect("/customers/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML
// Therefore, <form method="PUT" ...> doesn't work, but it does work for RESTful API

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("customers.PUT: " + req.params.id);
  try {
    await customersDal.putCustomer(
      req.params.id,
      req.body.firstName,
      req.body.lastName
    );
    res.redirect("/customers/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});
router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("customers.PATCH: " + req.params.id);
  try {
    await customersDal.patchCustomer(
      req.params.id,
      req.body.firstName,
      req.body.lastName
    );
    res.redirect("/customers/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("customers.DELETE: " + req.params.id);
  try {
    await customersDal.deleteCustomer(req.params.id);
    res.redirect("/customers/");
  } catch (err) {
    if (DEBUG) console.error(err);
    // log this error to an error log file.
    res.render("503");
  }
});

module.exports = router;

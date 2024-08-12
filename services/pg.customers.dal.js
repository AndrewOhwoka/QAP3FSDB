const dal = require("./customers_db");

// Get all customers.
var getCustomers = function () {
  if (DEBUG) console.log("customers.pg.dal.getCustomers()");
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT id, first_name, last_name, email FROM public.customers \
      ORDER BY id DESC LIMIT 13;";
    dal.query(sql, [], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// Get customer by customer_id.
var getCustomerById = function (id) {
  if (DEBUG) console.log("customers.pg.dal.getCustomerById()");
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT id, first_name, last_name, email FROM public.customers WHERE id = $1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// Add a new customer.
var addCustomer = function (fname, lname, email) {
  if (DEBUG) console.log("customers.pg.dal.addCustomer()");
  return new Promise(function (resolve, reject) {
    const sql =
      "INSERT INTO public.customers(first_name, last_name, email) \
      VALUES ($1, $2, $3);";
    dal.query(sql, [fname, lname, email], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// Update an existing customer.
var putCustomer = function (id, fname, lname, email) {
  if (DEBUG) console.log("customers.pg.dal.putCustomer()");
  return new Promise(function (resolve, reject) {
    const sql =
      "UPDATE public.customers SET first_name=$2, last_name=$3, email=$4 WHERE id=$1;";
    dal.query(sql, [id, fname, lname, email], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// Partially update a customer.
var patchCustomer = function (id, fname, lname, email) {
  if (DEBUG) console.log("customers.pg.dal.patchCustomer()");
  return new Promise(function (resolve, reject) {
    const sql =
      "UPDATE public.customers SET first_name=$2, last_name=$3, email=$4 WHERE id=$1;";
    dal.query(sql, [id, fname, lname, email], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// Delete a customer.
var deleteCustomer = function (id) {
  if (DEBUG) console.log("customers.pg.dal.deleteCustomer()");
  return new Promise(function (resolve, reject) {
    const sql = "DELETE FROM public.customers WHERE id = $1;";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getCustomers,
  getCustomerById,
  addCustomer,
  putCustomer,
  patchCustomer,
  deleteCustomer,
};

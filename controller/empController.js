const db = require('../db');
var ObjectId = require('mongodb').ObjectID;

/**
 * this method is to create the employee
 */

exports.create = (req, res) => {

  db.get().collection("employee").find({ email: req.body.email, mobile_no: req.body.mobile_no }).toArray(function (err, obj) {
    if (err) res.status(200).send({ message: err.message || "Some error occurred while fetching the employee data." });
    if (obj && obj.length > 0) {
      return res.status(200).send({ message: "An employee with that email & phone_no already exist" });
    }
    if (obj.length == 0) {
      var body = {
        name: req.body.name.toLowerCase(),
        age: req.body.age,
        email: req.body.email.toLowerCase(),
        mobile_no: req.body.mobile_no,
        address: req.body.address
      }

      db.get().collection("employee").insertOne(body, function (err, data) {
        if (err) {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the employee.",
          });
        }
        else {
          res.status(200).json({ message: "Employee added successfully!!!", data: body })
        }
      })
    }
  })
}

/** 
 * Find all Employees
 */

exports.findAll = (req, res) => {
  db.get().collection("employee").find().sort({ name: 1 }).toArray(function (err, obj) {
    if (err) res.status(500).send({ message: err.message || "Error Occured", });
    if (obj.length == 0) {
      return res.status(200).send({ message: "No employees" });
    }
    else {
      res.status(200).json(obj)
    }
  })
};

/** 
 * Find one Employee with id
 */

exports.findOne = (req, res) => {
  id = req.params.id
  db.get().collection("employee").find({ _id: ObjectId(id) }).toArray(function (err, emp) {
    if (err) return res.status(500).send({
      message: "Error retrieving employee"
    });
    if (emp.length == 0) {
      return res.status(200).send({
        message: "Employee not found with id " + req.params.id,
      });
    }
    res.status(200).json(emp);
  })
};

/** 
 * Delete one Employee with id
 */


exports.delete = (req, res) => {
  id = req.params.id
  db.get().collection("employee").findOne({ _id: ObjectId(id) }, function (err, emp) {
    if (err) return res.status(500).send({
      message: "Could not fetch Employee ",
    })
    if (emp == null) {
      return res.status(200).send({
        message: "Employee not found with id " + req.params.id,
      });
    }
    else {
      db.get().collection("employee").deleteOne({ _id: ObjectId(id) }, function (err, obj) {
        if (err) return res.status(500).send({
          message: "Could not delete Employee ",
        })
        res.send({ message: "Employee deleted successfully!" });
      });
    }
  })
};


/** 
 * Update one Employee with id
 */


exports.UpdateUser = (req, res) => {
  id = req.params.id
  var body = req.body
  
  db.get().collection("employee").find({ _id: ObjectId(id) }).toArray(function (err, obj) {

    if (err) return res.status(404).send({
      message: "error while fetching the data",
    });
    if (obj.length == 0) {
      return res.status(200).send({ message: "Employee not found" });
    }
    else {
      db.get().collection("employee").updateOne({ _id: ObjectId(id) }, { $set: body }, function (err1, resp) {
        if (err1) throw err1;
        return res.status(200).json({ message: 'Successfully updated' });
      })
    }
  })

};
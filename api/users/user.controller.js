const {
  create,
  getUserByUserEmail,
  loginUser,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getAssociatedCompany,
  getCompanies,
  sendRequest,
  addCompany,
  getCompanyById,
  getRequest,
  updateAssociatedIds,
  fetchAssociatedIds,
  updatRequest,
  deleteRequest,
} = require('./user.service');
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: 'Database connection errror' + err,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  addCompany: (req, res) => {
    const body = req.body;
    addCompany(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: 'Database connection errror' + err,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  sendRequest: (req, res) => {
    const body = req.body;
    sendRequest(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: 'Database connection errror' + err,
        });
      }
      return res.status(200).json({
        success: 1,
        request: results,
      });
    });
  },
  acceptRequest: (req, res) => {
    const body = req.body;
    const associated_ids = body.associated_id;
    fetchAssociatedIds(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: 'Database connection errror' + err,
        });
      }
      let associatedIds = results.associated_ids || '';
      let separator = associatedIds ? ',' : '';
      body.associated_ids = `${associatedIds}${separator}${associated_ids}`;
      updateAssociatedIds(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: 'Database connection errror' + err,
          });
        }

        return res.status(200).json({
          success: 1,
          request: results,
        });
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    loginUser(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.status(401).json({
          success: 0,
          data: 'Invalid email or password',
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, 'qwe1234', {
          expiresIn: '1h',
        });
        res.cookie('token', jsontoken, { httpOnly: true });
        return res.json({
          success: 1,
          message: 'login successfully',
          token: jsontoken,
          results,
        });
      } else {
        return res.status(401).json({
          success: 0,
          data: 'Invalid email or password',
        });
      }
    });
  },

  getAssociatedCompany: (req, res) => {
    const id = req.params.id;
    getAssociatedCompany(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        associatedCompanies: results,
      });
    });
  },
  getUserByUserEmail: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.user_email_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: 'Record not Found',
        });
      }
      if (results) {
        return res.json({
          success: 1,
          message: 'user retrieve successfully',
          results: results,
        });
      }
    });
  },
  getRequest: (req, res) => {
    const id = req.params.id;
    getRequest(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: 'Record not Found',
        });
      }
      if (results) {
        return res.json({
          success: 1,
          message: 'user retrieve successfully',
          results: results,
        });
      }
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: 'Record not Found',
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getCompanyById: (req, res) => {
    const id = req.params._id;
    getCompanyById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: 'Record not Found',
        });
      }
      return res.json({
        success: 1,
        company: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        users: results,
      });
    });
  },
  getCompanies: (req, res) => {
    getCompanies((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        companies: results,
      });
    });
  },
  updateUser: (req, res) => {
    const body = req.body;
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: 'updated successfully',
        results,
      });
    });
  },
  updatRequest: (req, res) => {
    const id = req.params.id;
    updatRequest(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: 'request updated successfully',
        results,
      });
    });
  },
  deleteRequest: (req, res) => {
    const id = req.params.id;
    deleteRequest(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: 'request updated successfully',
        results,
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: 'Record Not Found',
        });
      }
      return res.json({
        success: 1,
        message: 'user deleted successfully',
      });
    });
  },
};

const pool = require('../../config/database');

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into user(fullname, user_email_id, password) 
                values(?,?,?)`,
      [data.fullname, data.user_email_id, data.password],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  addCompany: (data, callBack) => {
    const {
      company_name,
      company_type,
      company_address,
      user_id,
      size,
      industry,
    } = data;
    pool.query(
      `insert into company(company_name, company_type, company_address, user_id, size, industry) 
                values(?,?,?,?,?,?)`,
      [company_name, company_type, company_address, user_id, size, industry],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  sendRequest: (data, callBack) => {
    pool.query(
      `insert into request(requested_company_id, associated_company_id, request_status) 
                values(?,?,?)`,
      [
        data.requested_company_id,
        data.associated_company_id,
        data.request_status,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  fetchAssociatedIds: (data, callBack) => {
    pool.query(
      `SELECT associated_ids FROM company where company_id = ?`,
      [data.company_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateAssociatedIds: (data, callBack) => {
    pool.query(
      `update company set associated_ids=? where company_id = ?`,
      [data.associated_ids, data.company_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateUser: (data, callBack) => {
    pool.query(
      `update user set company_id=? where user_id = ?`,
      [data.company_id, data.user_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  loginUser: (email, callBack) => {
    pool.query(
      `select * from user where user_email_id = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    console.log();
    pool.query(
      `select * from user where user_email_id = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getRequest: (id, callBack) => {
    pool.query(
      `select * from request where associated_company_id = ? AND request_status = 'awaited'`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updatRequest: (id, callBack) => {
    pool.query(
      `update request set request_status='success' where request_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteRequest: (id, callBack) => {
    pool.query(
      `delete from request where request_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(`SELECT * from user`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },
  getCompanies: (callBack) => {
    pool.query(`SELECT * from company`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },
  getAssociatedCompany: (id, callBack) => {
    pool.query(
      `SELECT e.company_id AS 'Associated_id', e.user_id, e.company_name,e.company_address,e.size, e.industry, m.company_id  AS 'actual_company_id'
    FROM
        company m
    INNER JOIN company e ON 
        m.company_id = e.associated_company_id
    ORDER BY 
        e.company_id asc;`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        const associatedCompanies =
          results &&
          results.filter((result) => result.actual_company_id === Number(id));
        return callBack(null, associatedCompanies);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select * from user where user_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getCompanyById: (id, callBack) => {
    pool.query(
      `select * from company where user_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  deleteUser: (data, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};

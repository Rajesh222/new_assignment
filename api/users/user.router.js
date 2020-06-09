const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
const {
  createUser,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  login,
  getAssociatedCompany,
  getCompanies,
  sendRequest,
  addCompany,
  getCompanyById,
  getRequest,
  acceptRequest,
  updatRequest,
  deleteRequest,
} = require('./user.controller');
router.get('/', checkToken, getUsers);
router.post('/', checkToken, createUser);
router.post('/connect', checkToken, sendRequest);
router.post('/accept', checkToken, acceptRequest);
router.get('/connect/:id', checkToken, getRequest);
router.put('/connect/:id', checkToken, updatRequest);
router.delete('/connect/:id', checkToken, deleteRequest);
router.post('/login', login);
router.get('/company', checkToken, getCompanies);
router.post('/company', checkToken, addCompany);
router.get('/company/:_id', checkToken, getCompanyById);
router.get('/:id', checkToken, getUserByUserId);
router.get('/associated/:id', checkToken, getAssociatedCompany);
router.post('/search', checkToken, getUserByUserEmail);
router.put('/', checkToken, updateUser);
router.delete('/', checkToken, deleteUser);

module.exports = router;

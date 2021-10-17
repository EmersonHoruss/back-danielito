// if exist send you the collection else you get error
const _fExist = (_exist, _model) => {
  const _error = "Error!: No existe el elemento";
  return _exist.length ? _exist : _error;
};

// if exist send you an error else you get collection(s)
const _fNotExist = (_exist, _model) => {
  const _error = "Error!: Existe el elemento";
  return _exist.length ? _error : _exist;
};

const _fManageExist = async (_obj = {}, _model, _notExist = true) => {
  const _exist = await _model.find(_obj);

  return _notExist ? _fExist(_exist, _model) : _fNotExist(_exist, _model);
};

// An error is an String, so, if we have a string we have
// an error otherwise we have a succesful validation
const _fHasError = (_validation) => {
  return typeof _validation === "string";
};

export default {
  _fManageExist,
  _fHasError,
};

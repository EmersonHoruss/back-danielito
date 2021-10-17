import Client from "../../models/saleOrder/model.client.js";

const _fStringNull = (_string) => {
  return _string === "null" ? true : false;
};

const _fClientByName = (_clients, _name) => {
  const _lowerName = _name.toLowerCase();
  return _clients.filter((_client) => {
    const _clientLowerName = _client._name.toLowerCase();
    const _includes = _clientLowerName.includes(_lowerName);
    return _includes;
  });
};
const _fClientByDNI = (_clients, _DNI) => {
  return _clients.filter((_client) => _client._DNI.includes(_DNI));
};
const _fClientByNameDNI = (_clients, _name, _DNI) => {
  const _clientsByName = _fClientByName(_clients, _name);
  const _clientsByDNI = _fClientByDNI(_clients, _DNI);
  // console.log(_name,_DNI)
  // console.log(_clientsByName)
  // console.log(_clientsByDNI)
  // console.log()

  return _clientsByName.filter(
    (_clientName) =>
      _clientsByDNI.filter(
        (_clientDNI) => _clientDNI._name.includes(_clientName._name))
        .length 
  );
};

const _fGetReadedByNameDNI = (_clients, _name, _DNI) => {
  const _isNameNull = _fStringNull(_name),
    _isDNINull = _fStringNull(_DNI);

  return !_isNameNull && !_isDNINull
    ? _fClientByNameDNI(_clients, _name, _DNI)
    : !_isNameNull
    ? _fClientByName(_clients, _name)
    : !_isDNINull
    ? _fClientByDNI(_clients, _DNI)
    : [];
};

export default {
  create: async (req, res) => {
    try {
      const { _DNI, _name, _address, _cel, _shipping, _RUC } = req.body;
      const newClient = new Client({
        _DNI,
        _name,
        _address,
        _cel,
        _shipping,
        _RUC,
      });

      const savedClient = await newClient.save();

      res.status(200).json(savedClient);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedClient);
  },
  
  redByNameDNI: async (req, res) => {
    const _name = req.params._name,
      _DNI = req.params._DNI;
    console.log(_fStringNull(_DNI));

    const _clients = await Client.find();
    const _clientsByNameDNI = _fGetReadedByNameDNI(_clients, _name, _DNI);
    // console.log(_clientsByNameDNI);

    res.status(200).json(_clientsByNameDNI);
  },
  red: async (req, res) => {
    const clients = await Client.find();
    return res.json(clients);
  },
};

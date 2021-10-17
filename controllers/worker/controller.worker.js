import Worker from "../../models/worker/model.worker.js";
import Validation from "../../library/validations.js";

export default {
  create: async (req, res) => {
    try {
      try {
        const { _DNI, _name, _age, _address, _cel, _debtCollector } = req.body;
        const newWorker = new Worker({
          _DNI,
          _name,
          _age,
          _address,
          _cel,
          _debtCollector,
        });

        const savedWorker = await newWorker.save();

        res.status(200).json(savedWorker);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  red: async (req, res) => {
    const workers = await Worker.find();
    return res.json(workers);
  },

  _fIsSeller: async (_idWorker) => {
    const worker = await Worker.findById(_idWorker);
    const isSeller = worker._debtCollector ? false : true;
    return isSeller;
  },

  _fIsDebtCollector: async (_idWorker) => {
    const worker = await Worker.findById(_idWorker);
    return worker._debtCollector;
  },
};

// const mal = "MAAAAL REHACER XD"
//       const { _id } = req.body;
//       const result = await Validation._fManageExist(_id, Worker);
//       console.log(result)
//       res.status(200).json(result);

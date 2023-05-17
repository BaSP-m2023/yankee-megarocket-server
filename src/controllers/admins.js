import Admins from '../models/Admin';

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admins.find();
    return res.status(200).json({
      message: 'Complete admins list',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admins.findById(id);
    if (!admin) {
      return res.status(404).json({
        message: 'The requested administrator was not found.',
        data: {},
        error: true,
      });
    }

    return res.status(200).send(admin).json({
      message: 'The administrator was found',
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};
export const createAdmin = async (req, res) => {
  try {
    const { body } = req;

    const admin = new Admins(
      body,
    );

    if (!admin) {
      return res.status(400).json({
        message: 'All fields must be completed.',
        data: {},
        error: true,
      });
    }
    const createdAdmin = await admin.save();
    return res.status(201).json({
      message: 'The administrator was created.',
      data: createdAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName, lastName, dni, email, phone, password,
    } = req.body;
    const foundAdmin = await Admins.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        dni,
        email,
        phone,
        password,
      },
      {
        new: true,
      },
    );
    if (!foundAdmin) {
      return res.status(404).json({
        message: `${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin was updated succesfully',
      data: foundAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error,',
      data: undefined,
      error: true,
    });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const foundAdmin = await Admins.findByIdAndDelete(id);
    if (!foundAdmin) {
      return res.status(404).json({
        message: `${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin was deleted succesfully',
      data: foundAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error,',
      data: undefined,
      error: true,
    });
  }
};

import Admin from '../models/Admin';

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    return res.status(200).json({
      message: 'Complete admins list',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error! getting administrators.',
      error,
    });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(200).json({
        message: 'The requested administrator was not found.',
        data: admin,
        error: false,
      });
    }

    return res.status(200).send(admin);
  } catch (error) {
    return res.status(500).json({
      message: 'Error! getting the administrator.',
      error,
    });
  }
};
export const createAdmin = async (req, res) => {
  try {
    const {
      firstName, lastName, dni, phone, email, password,
    } = req.body;

    const admin = new Admin({
      firstName,
      lastName,
      dni,
      phone,
      email,
      password,
    });

    const createdAdmin = await admin.save();
    return res.status(201).json({
      message: 'The administrator was created.',
      data: createdAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error! Failed to create the administrator.',
      error,
    });
  }
};

import SuperAdmins from '../models/SuperAdmin';

export const getSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmins.find();
    if (superAdmins.length === 0) {
      return res.status(404).json({
        message: 'No superadmins found',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Superadmin found',
      data: superAdmins,
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

export const getSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const foundSuperAdmin = await SuperAdmins.findById(id);
    if (!foundSuperAdmin) {
      return res.status(404).json({
        message: 'Superadmin not found',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Superadmin found',
      data: foundSuperAdmin,
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

export const createSuperAdmin = async (req, res) => {
  try {
    const { body } = req;
    const superAdmin = await SuperAdmins.create({
      email: body.email,
      password: body.password,
    });
    res.status(201).json({
      message: 'Superadmin was created successfully!',
      data: superAdmin,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

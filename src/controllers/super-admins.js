import SuperAdmins from '../models/SuperAdmin';

export const getSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmins.find();
    if (!superAdmins.length) {
      return res.status(404).json({
        message: 'No superadmins found!',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Superadmin found successfully!',
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

export const getSuperAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdmin = await SuperAdmins.findById(id);
    if (!superAdmin) {
      return res.status(404).json({
        message: `SuperAdmin with: ${id} not found!`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Superadmin found successfully!',
      data: superAdmin,
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

export const postSuperAdmin = async (req, res) => {
  try {
    const { body } = req;
    const createdSuperAdmin = await SuperAdmins.create(body);
    if (!createdSuperAdmin) {
      return res.status(400).json({
        message: 'SuperAdmin could not be found and created!',
        data: {},
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Superadmin was created successfully!',
      data: createdSuperAdmin,
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
export const putSuperAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const superAdminUpdated = await SuperAdmins.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );
    if (!superAdminUpdated) {
      return res.status(404).json({
        message: 'Superadmin Not Found',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Superadmin Updated',
      data: {
        body,
      },
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
export const deleteSuperAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSuperAdmin = await SuperAdmins.findByIdAndDelete(id);
    if (!deletedSuperAdmin) {
      return res.status(400).json({
        message: 'superAdmin could not be found and deleted!',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'superAdmin Deleted Successfully!',
      data: deletedSuperAdmin,
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

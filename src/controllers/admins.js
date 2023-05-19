import Admins from '../models/Admin';

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admins.find();
    if (!admins.length) {
      return res.status(404).json({
        message: 'There are no admins!',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admins found successfully!',
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
        message: `Admin with: ${id} not found!`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin found successfully!',
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

export const postAdmin = async (req, res) => {
  try {
    const { body } = req;
    const createdAdmin = await Admins.create(body);
    if (!createdAdmin) {
      return res.status(400).json({
        message: 'Admin could not be created!',
        data: {},
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Admin created successfully!',
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

export const putAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedAdmin = await Admins.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      },
    );
    if (!updatedAdmin) {
      return res.status(400).json({
        message: 'Admin could not be found and updated!',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin was updated succesfully!',
      data: updatedAdmin,
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

export const deleteAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admins.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(400).json({
        message: 'Admin could not be found and deleted!',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin was deleted succesfully',
      data: deletedAdmin,
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

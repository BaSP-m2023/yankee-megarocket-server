import SuperAdmins from '../models/SuperAdmin';

export const getSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmins.find();
    return res.send(superAdmins);
  } catch (error) {
    return res.send(error);
  }
};

export const getSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const foundSuperAdmin = await SuperAdmins.find((superAdmin) => superAdmin.id === id);
    return res.send(foundSuperAdmin);
  } catch (error) {
    return res.send(error);
  }
};

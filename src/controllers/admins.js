import Admins from '../models/Admin';

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
      message: 'Server error.',
      data: undefined,
      error: true,
    });
  }
};

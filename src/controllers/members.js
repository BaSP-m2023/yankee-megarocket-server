import Member from '../models/Member';

export const editMember = async (req, res) => {
  try {
    const {
      _id, firstName, lastName, dni, email, phone, password,
    } = req.body;
    const memberFound = await Member.findById(_id);
    if (!memberFound) {
      return res.status(404).json({
        message: 'Member Updated',
        data: _id,
        error: true,
      });
    }
    await Member.findOneAndUpdate(
      { _id },
      {
        firstName,
        lastName,
        dni,
        email,
        phone,
        password,
      },
      { new: true },
    );
    return res.status(201).json({
      message: 'Member Updated',
      data: {
        firstName,
        lastName,
        dni,
        email,
        phone,
        password,
      },
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server Erorr',
      data: undefined,
      error: true,
    });
  }
};
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const foundMember = await Member.findById(id);
    if (!foundMember) {
      return res.status(404).json({
        message: `${id} This id was not found`,
        data: {},
        error: true,
      });
    }
    await Member.findByIdAndDelete(id);
    return res.status(201).json({
      message: 'Member Deleted',
      data: foundMember,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      data: undefined,
      error: true,
    });
  }
};

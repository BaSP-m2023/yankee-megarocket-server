import Member from '../models/Member';

export const getMember = async (req, res) => {
  try {
    const member = await Member.find();
    return res.status(201).json({
      message: 'This is a list of our members:',
      data: member,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error, // error.toString()
      data: undefined,
      error: true,
    });
  }
};
export const getMemberId = async (req, res) => {
  try {
    const { id } = req.params;
    const foundMember = await Member.find((member) => member.id === id);
    return res.send(foundMember);
  } catch (error) {
    return res.send(error);
  }
};
export const createMember = async (req, res) => {
  try {
    const {
      firstName, lastName, dni, email, phone, password,
    } = req.body;
    await Member.create({
      firstName,
      lastName,
      dni,
      email,
      phone,
      password,
    });
    return res.status(201).json({
      message: 'Member created',
      data: Member,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error, // error.toString()
      data: undefined,
      error: true,
    });
  }
};
export const editMember = async (req, res) => {
  try {
    const {
      _id, firstName, lastName, dni, email, phone, password,
    } = req.body;
    await Member.findOneAndUpdate({ _id }, {
      firstName,
      lastName,
      dni,
      email,
      phone,
      password,
    });
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
    return res.status(500).send(error);
  }
};
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const foundMember = await Member.findById(id);
    await Member.findByIdAndDelete(id);

    if (!foundMember) {
      return res.status(404).json({
        message: 'Id not found',
        data: undefined,
        error: true,
      });
    }
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

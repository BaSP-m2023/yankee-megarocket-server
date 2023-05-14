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
      id, firstName, lastName, dni, email, phone, password,
    } = req.body;
    await Member.create({
      id,
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
      _id, id, firstName, lastName, dni, email, phone, password,
    } = req.body;
    await Member.findOneAndUpdate({ _id }, {
      id,
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
        id,
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

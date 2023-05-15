import { isValidObjectId } from 'mongoose';
import Member from '../models/Member';

export const editMember = async (req, res) => {
  try {
    const {
      _id, firstName, lastName, dni, email, phone, password,
    } = req.body;
    if (!isValidObjectId(_id)) {
      return res.status(404).json({
        message: 'This is not a valid ID',
        data: {},
        error: true,
      });
    }
    const memberFound = await Member.findById(_id);
    if (!memberFound) {
      return res.status(404).json({
        message: 'Member Not Found',
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
      message: error,
      data: undefined,
      error: true,
    });
  }
};
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(404).json({
        message: 'This is not a valid ID',
        data: {},
        error: true,
      });
    }
    const foundMember = await Member.findById({ id });
    if (!foundMember) {
      return res.status(404).json({
        message: `This id was not found ${id}`,
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
      message: error,
      data: undefined,
      error: true,
    });
  }
};

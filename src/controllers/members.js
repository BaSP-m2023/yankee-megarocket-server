import { isValidObjectId } from 'mongoose';
import { Member } from '../models/Member';

export const getMember = async (req, res) => {
  try {
    const member = await Member.find();
    if (!member) {
      return res.status(404).json({
        message: 'There are no members created',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'This is a list of our members:',
      data: member,
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

export const getMemberId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(404).json({
        message: 'This is not a valid ID',
        data: {},
        error: true,
      });
    }
    const foundMember = await Member.findById(id);
    if (!foundMember) {
      return res.status(404).json({
        message: 'Member not found',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Here is the member required',
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

export const createMember = async (req, res) => {
  try {
    const {
      firstName, lastName, dni, email, phone, password,
    } = req.body;
    if (!firstName || !lastName || !dni || !email || !phone || !password) {
      return res.status(400).json({
        message: 'Theres a missing field',
        data: {},
        error: true,
      });
    }
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
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};
export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: 'This is not a valid ID',
        data: {},
        error: true,
      });
    }
    const memberUpdated = await Member.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );
    if (!memberUpdated) {
      return res.status(404).json({
        message: 'Member Not Found',
        data: {},
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Member Updated',
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
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: 'This is not a valid ID',
        data: {},
        error: true,
      });
    }
    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(404).json({
        message: `This id was not found ${id}`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Member Deleted',
      data: deletedMember,
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

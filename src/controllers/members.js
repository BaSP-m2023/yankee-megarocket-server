import Members from '../models/Member';

export const getMembers = async (req, res) => {
  try {
    const members = await Members.find();
    if (!members.length) {
      return res.status(404).json({
        message: 'There are no members!',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Members found successfully!:',
      data: members,
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

export const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Members.findById(id);
    if (!member) {
      return res.status(404).json({
        message: `Member with id: ${id} not found!`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Member found successfully!',
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

export const postMember = async (req, res) => {
  try {
    const { body } = req;
    const createdMember = await Members.create(body);
    if (!createdMember) {
      return res.status(400).json({
        message: 'Member could not be created!',
        data: {},
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Member created successfully!',
      data: createdMember,
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

export const putMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedMember = await Members.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );
    if (!updatedMember) {
      return res.status(400).json({
        message: 'Member could not be found and updated!',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Member Updated successfully!',
      data: updatedMember,
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

export const deleteMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await Members.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(400).json({
        message: 'Member could not be found and deleted!',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Member Deleted successfully!',
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

import Learn from "../models/Learn.js";

export const createLearn = async (req, res) => {
  try {
    const { learn, descriptions, link } = req.body;
    if (!learn || !descriptions || !link) {
      return res.status(401).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const learnUpload = await Learn.create({
      learn,
      descriptions,
      link,
    });

    return res.status(200).json({
      success: true,
      message: "Learn created successfully",
      learnUpload: learnUpload,
    });
  } catch (error) {
    console.log("Error occured in a learnControllers", error);
  }
};

export const displayLearn = async (req, res) => {
  let learn = await Learn.find();

  if (!learn) {
    return res.status(401).json({
      success: false,
      message: "There is no learn exist",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Learn display successfully",
    learn: learn,
  });
};

export const updateLearn = async (req, res) => {
  const id = req.params.id;
  const { learn, descriptions, link } = req.body;
  if (!learn || !descriptions || !link) {
    return res.status(401).json({
      success: false,
      message: "All fields are mandatory",
    });
  }
  if (!id) {
    return res.status(401).json({
      success: false,
      message: "Id Not Found",
    });
  }

 const learnId = await Learn.findById({ _id: id });

  if (!learnId) {
    return res.status(401).json({
      success: false,
      message: "Learn couldnot found",
    });
  }

  const updateLearn = await Learn.findByIdAndUpdate(
    id,
    {
      learn,
      descriptions,
      link,
    },
    {
      new: true,
    },
  );

  return res.status(200).json({
    success: true,
    message: "Learn Updated Successfully",
    updateLearn: updateLearn,
  });
};

export const deleteLearn = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(401).json({
      success: false,
      message: "Id Not Found",
    });
  }

  const learnId = await Learn.findById({ _id: id });

  if (!learnId) {
    return res.status(401).json({
      success: false,
      message: "Learn couldnot found",
    });
  }

  const deleteId = await Learn.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Learn deleted Successfully",
  });
};

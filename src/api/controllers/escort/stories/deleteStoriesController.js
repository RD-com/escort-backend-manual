const { EscortStories } = require("../../../models");
const Joi = require("joi");

const storySchema = Joi.object({
  imageUrl: Joi.string().required(),
});

const deleteStory = async (req, res) => {
  try {
    const { error } = storySchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }

    const { imageUrl } = req.body;
    const userId = req.user.id;

    const story = await EscortStories.update(
      { is_deleted: "1" },
      {
        where: { user_id: userId, url: imageUrl },
      }
    );

    if (!story) {
      return res.status(404).json({ success: false, msg: "Story not found" });
    }

    res.status(200).json({ success: true, msg: "Story deleted successfully" });
  } catch (error) {
    console.error("Error processing the data:", error);
    const status = error instanceof SyntaxError ? 400 : 500;
    return res.status(status).json({ success: false, msg: "Story data error" });
  }
};

module.exports = { deleteStory };

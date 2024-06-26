const { getStories } = require("./getStoriesController");
const { getAvailableStories } = require("./getAvailableStoriesController");
const { addStories } = require("./createStoriesController");
const { deleteStory } = require("./deleteStoriesController");

module.exports = {
  getStories,
  getAvailableStories,
  addStories,
  deleteStory,
};

const {
  Member,
  MemberFavorite,
  Escort,
  EscortGallery,
  EscortGalleryMedia,
} = require("../../../models");

const getFavorite = async (req, res) => {
  try {
    const memberId = req.user.id;

    const member = await Member.findOne({
      where: {
        user_id: memberId,
      },
    });

    if (!member) {
      return res
        .status(403)
        .json({ success: false, msg: "Only members have favorite" });
    }

    const favorites = await MemberFavorite.findAll({
      where: {
        member_id: memberId,
      },
      attributes: ["escort_id"],
    });

    if (favorites.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "No favorite escorts found" });
    }

    const favoritesData = await Promise.all(
      favorites.map(async (favorite) => {
        const image = await EscortGallery.findOne({
          where: {
            user_id: favorite.escort_id,
            type: "3",
            is_deleted: "0",
          },
          attributes: ["id"],
          include: [
            {
              model: EscortGalleryMedia,
              attributes: ["url"],
              where: {
                media_type: "1",
                is_deleted: "0",
              },
              required: true,
              limit: 1,
            },
          ],
        });
        const escort = await Escort.findOne({
          where: { user_id: favorite.escort_id },
        });
        const favoriteObj = {
          name: escort ? escort.name : null,
          age: escort ? escort.age : null,
          city: escort ? escort.city : null,
          image: image ? image.EscortGalleryMedia[0].url : null,
        };

        return favoriteObj;
      })
    );
    res.status(200).json({ success: true, data: favoritesData });
  } catch (error) {
    console.error("Error processing the data:", error);
    res.status(500).json({ success: false, msg: "Member favorite error" });
  }
};

module.exports = { getFavorite };

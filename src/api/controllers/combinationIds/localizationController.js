async function getUniqueCombinationIds(model) {
  try {
    const uniqueCombinationIds = await model.findAll({
      attributes: ["combination_id"],
      group: ["combination_id"],
    });

    const combinationIdArray = uniqueCombinationIds.map(
      (record) => record.combination_id
    );

    return combinationIdArray;
  } catch (error) {
    console.error("Internal Server Error:", error);
    throw new Error("Processing the data Failed");
  }
}

module.exports = { getUniqueCombinationIds };

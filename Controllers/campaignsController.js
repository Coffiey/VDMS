const knex = require("../db/knex");

const verifyUser = async (userinput) => {
  const user = await knex
    .select("*")
    .from("user")
    .where({
      id: userinput,
    })
    .first();

  return user;
};

const createCampaigns = async (req, res) => {
  try {
    const { campaignName, notes } = req.body;
    const verify = await verifyUser(req.params["user"]);
    if (verify) {
      await knex("campaigns").insert({
        user_id: req.params["user"],
        campaign_name: campaignName,
        notes,
      });
      res.status(201).json("created campaign");
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const getCampaigns = async (req, res) => {
  try {
    const verify = await verifyUser(req.params["user"]);
    if (verify) {
      const campaigns = await knex.select("*").from("campaigns").where({
        user_id: req.params["user"],
      });
      const campaignObj = await campaigns.map((item) => {
        return {
          id: item.id,
          userId: item.user_id,
          campaignName: item.campaign_name,
          notes: item.notes,
        };
      });
      res.status(201).json(campaignObj);
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const getCampaignById = async (req, res) => {
  try {
    const verify = await verifyUser(req.params["user"]);
    if (verify) {
      const campaigns = await knex
        .select("*")
        .from("campaigns")
        .where({
          user_id: req.params["user"],
          id: req.query["id"],
        })
        .first();
      const campaignObj = {
        id: campaigns.id,
        userId: campaigns.user_id,
        campaignName: campaigns.campaign_name,
        notes: campaigns.notes,
      };
      res.status(201).json(campaignObj);
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const editCampaigns = async (req, res) => {
  try {
    const { campaignName, notes } = req.body;
    const verify = await verifyUser(req.params["user"]);
    if (verify) {
      await knex("campaigns")
        .where({
          user_id: req.params["user"],
          id: req.query["id"],
        })
        .update({
          campaign_name: campaignName,
          notes,
        });
      res.status(201).json("campaigns Updated");
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

const deleteCampaigns = async (req, res) => {
  try {
    const verify = await verifyUser(req.params["user"]);
    if (verify) {
      await knex("campaigns").where({ id: req.query["id"] }).del();
      res.status(201).json("Deleted campaigns");
    } else {
      res.status(409).json("User Error");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

module.exports = {
  createCampaigns,
  getCampaigns,
  editCampaigns,
  deleteCampaigns,
  getCampaignById,
};

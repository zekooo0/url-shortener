const URL = require("../models/urlModel");

const router = require("express").Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const urls = await URL.find();
    res.render("index", { title: "Express", urls: urls });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { error: error });
  }
});

/* POST url */
router.post("/", async function (req, res, next) {
  try {
    const { urlInput, aliasInput } = req.body;
    const isExist = await URL.findOne({ alias: aliasInput });
    if (isExist) {
      throw new Error("Alias is already exist, please choose another one");
    }
    await URL.create({ longUrl: urlInput, alias: aliasInput });
    res.status(201).redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:alias", async function (req, res, next) {
  try {
    const { alias } = req.params;
    const isExist = await URL.findOne({ alias });
    if (!isExist) {
      throw new Error("URL is invalid");
    }
    res.redirect(isExist.longUrl);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;

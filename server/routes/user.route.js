const router = require("express").Router();

router.get("/get-users", (req, res) => {
  res.send("Get Users"); // Bu rotaya yapılan isteklere "Get Users" metnini yanıt olarak döndürür.
});

module.exports = router;

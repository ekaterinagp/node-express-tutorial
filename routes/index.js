const express = require("express");

const speakersRoute = require("./speakers");
const feedbackRoute = require("./feedback");

const router = express.Router();

module.exports = params => {
  const { speakersService } = params;
  router.get("/", async (request, response) => {
    const topSpeakers = await speakersService.getList();
    console.log(topSpeakers);
    //checking for visits for specific user
    // if (!request.session.visitcount) {
    //   request.session.visitcount = 0;
    // }
    // request.session.visitcount += 1;
    // console.log(`Number of visits: ${request.session.visitcount}`);
    response.render("layout", {
      pageTitle: "Welcome",
      template: "index",
      topSpeakers
    });
  });

  router.use("/speakers", speakersRoute(params));
  router.use("/feedback", feedbackRoute(params));

  return router;
};

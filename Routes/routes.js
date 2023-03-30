let express = require("express");
let router = express.Router();
let Job = require("../models/productDb");
router.get("/", (req, res) => {
  res.send("Lending Page");
});

router.get("/jobs", async function (req, res) {
  try {
    // extract all the jobs from db
    let foundJobs = await Job.find({});
    res.render("index", { foundJobs });
  } catch (error) {
    console.log("error while extracting all jobs", error);
  }
  // res.send(req.body);
});
router.post("/jobs", async function (req, res) {
  // res.send(req.body);
  console.log(req.body);
  try {
    // make a database object
    let newJob = new Job({
      name: req.body.name,
      address: req.body.address,
      image: req.body.image,
    });
    await newJob.save();
    res.redirect("/jobs");
  } catch (error) {
    console.log("error while adding a new job", error);
  }
});
router.get("/jobs/new", function (req, res) {
  res.render("new");
});
router.get("/jobs/:id", async function (req, res) {
  try {
    // fetch the required job by using id
    let id = req.params.id;
    let job = await Job.findById(id);
    // eval(require('locus'));
    // findOne
    // res.send('test');
    res.render("show", { job });
  } catch (error) {
    console.log("error while fetching a job", error);
  }
});
router.get("/jobs/:id/edit", async function (req, res) {
  try {
    // fetch the required job by using id
    let id = req.params.id;
    let job = await Job.findById(id);
    res.render("edit", { job });
  } catch (error) {
    console.log("error while fetching a job for edit form", error);
  }
});
router.patch("/jobs/:id", async function (req, res) {
  try {
    let id = req.params.id;
    console.log('id')
    // simple js object
    let updatedJob = {
      name: req.body.name,
      address: req.body.address,
      image: req.body.image,
      // package: req.body.package,
      // cgpa: req.body.cgpa,
      // deadline: req.body.deadline,
      // type: req.body.type,
    };
    await Job.findByIdAndUpdate(id, updatedJob);
    //! push a new notificatoin
    // let newNotif = new Notification({
    //   body: "A job has been updated",
    //   author: updatedJob.name,
    // });
    // await newNotif.save();
    // // findOneAndUpdate
    res.redirect(`/jobs/${id}`);
  } catch (error) {
    console.log("error while updating the job", error);
  }
});

// delete
router.delete("/jobs/:id", async function (req, res) {
  try {
    let id = req.params.id;
    await Job.findByIdAndDelete(id);
    // findOneAndDestroy
    res.redirect("/jobs");
  } catch (error) {
    console.log("error while deleting the job", error);
  }
});


module.exports = router;

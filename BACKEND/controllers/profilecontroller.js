const Profile = require('../model/profilesmodel');

exports.createprofile = async (req, res, next) => {
    const { profile_URL, fname, lname } = req.body;

    if (!fname || !lname) {
        return res.status(500).send({ message: "Fname and Lname missing" });
    }

    const found_profile = await Profile.findOne({ profile_URL: profile_URL });
    if (found_profile) {
        return res.status(500).send({ message: "Already existing, enter another" });
    }

    try {
        const new_profile = new Profile({
            ...req.body,
            createdby: req.user.id
        });
        await new_profile.save();
        return res.status(200).send({ message: new_profile });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
};

exports.getallprofile = async (req, res, next) => {
    try {
        const all_profile = await Profile.find({ createdby: req.user.id });
        return res.status(200).send({ message: all_profile });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "error" });
    }
};

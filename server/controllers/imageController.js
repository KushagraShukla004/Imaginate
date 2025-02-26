import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    //find user first because if someone is not loggedin so he cannot write the prompt
    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details." });
    }

    if (user.creditBalance <= 0 || userModel.creditBalance < 0) {
      return res.json({
        success: false,
        message: "Credits are too low!.",
        creditBalance: user.creditBalance,
      });
    }

    // append prompt to formData for using the prompt in api
    const formData = new FormData();
    formData.append("prompt", prompt);

    //call API and add formData to the API for generating image according to the prompt
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    //convert arraybuffer response to base64 binary literal
    const base64Image = Buffer.from(data, "binary").toString("base64");

    //convert base64 to png Image
    const resultImage = `data:image/png;base64,${base64Image}`;

    //after generating an image reduce creditBalance from user by 1
    await userModel.findById(user._id, { creditBalance: user.creditBalance - 1 });

    res.json({
      success: true,
      message: "Image Generated!",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

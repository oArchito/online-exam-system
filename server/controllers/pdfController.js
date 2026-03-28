const uploadPDF = (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    // Response
    res.status(200).json({
      message: "PDF uploaded successfully",
      file: req.file,
      fileUrl: `http://localhost:5000/uploads/${req.file.filename}`
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = { uploadPDF };
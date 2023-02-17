module.exports = mongoose => {
    const User = mongoose.model(
      "users",
      mongoose.Schema(
        {
          email: String,
          password: String
        },
        { timestamps: true }
      )
    );
  
    return User;
  };
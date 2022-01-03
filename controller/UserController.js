const db = require('../db');
const User = db.collection("users");

const follow = async (req, res) => {
  const { userId } = req.body;
  const model =  User.doc(req.authId);
  const user = await model.get();
  const follow = [...user.data().follow, {user_id: userId, follow_at: new Date()}];

  await model.update({
      follow: follow,
    })
    .then((response) => {
      res.json({ message: true, info: "Follow Success" });
    })
    .catch((error) => {
      res.json({ message: false, info: error });
    });
};

const unFollow = async (req, res) => {
     const { userId } = req.body;
     const model = User.doc(req.authId);
     const user = await model.get();
     const follow = user.data().follow.filter((value)=>{
         return value.user_id !== userId;
     });
     await model
       .update({
         follow: follow,
       })
       .then((response) => {
         res.json({ message: true, info: "Unfollow Success" });
       })
       .catch((error) => {
         res.json({ message: false, info: error });
       });
}

module.exports = {
    follow,
    unFollow
}

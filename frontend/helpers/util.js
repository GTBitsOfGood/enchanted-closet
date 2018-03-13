export default function isProfileComplete( user ) {
  const profileFields = {    
    "Participant": [
      "birthday", "leader", "race", "phone", "school",
      "emergencyContactName", "emergencyContactPhone",
      "emergencyContactRelation", "grade", "age"
    ],
    "Volunteer": [
      "birthday",
      "phone",
      "emergencyContactName",
      "emergencyContactPhone",
      "emergencyContactRelation",
    ],
    "Admin": []
  };
  return profileFields[user.role].reduce( (flag, s) => flag && Object.keys(user).includes(s),  true ); // todo: robustify, can probably trick this
}

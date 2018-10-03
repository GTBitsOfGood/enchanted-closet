export default function isProfileComplete (user) {
  const profileFields = {
    'Participant': [
      'leader', 'race', 'phone', 'school',
      'emergencyContactName', 'emergencyContactPhone',
      'emergencyContactRelation', 'grade'
    ],
    'Volunteer': [
      'phone',
      'emergencyContactName',
      'emergencyContactPhone',
      'emergencyContactRelation'
    ],
    'Admin': []
  }
  return profileFields[user.role].reduce((flag, s) => flag && Object.keys(user).includes(s), true) // todo: robustify, can probably trick this
}

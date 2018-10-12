export function isProfileComplete (user) {
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

export function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}
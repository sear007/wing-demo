export const hanldeValidate = ({ name, age, schoolName, joined_at }) => {
    const newErrors = [];
    if (name.trim() === '') {
      newErrors.push('Name is required');
    }
    if (isNaN(Number(age)) || age.trim() === '') {
      newErrors.push('Age must be a number');
    }
    if (schoolName.trim() === '') {
      newErrors.push('School name is required');
    }
    if (joined_at.trim() === '') {
      newErrors.push('Joined date is required');
    }
    return newErrors;
}
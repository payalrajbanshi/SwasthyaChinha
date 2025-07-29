export default function Roles({ value, onChange }) {
  return (
    <select name="role" value={value} onChange={onChange} className="w-full p-2 border mb-3 rounded">
      <option value="Doctor">Doctor</option>
      <option value="Patient">Patient</option>
      <option value="Pharmacist">Pharmacist</option>
      <option value="HospitalAdmin">Hospital Admin</option>
    </select>
  );
}

import { useState } from "react";

export default function ProfileTab() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "أحمد اللمعي",
    email: "ahmed@ellam3y.com",
    phone: "01012345678",
    address: "شارع 10، مدينة نصر، القاهرة",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    // هنا ترسل البيانات للـ backend (Strapi مثلاً)
    console.log("تم الحفظ:", formData);
    setEditMode(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h4 className="mb-4">الملف الشخصي</h4>

      <div className="mb-3">
        <label>الاسم:</label>
        {editMode ? (
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        ) : (
          <p>{formData.name}</p>
        )}
      </div>

      <div className="mb-3">
        <label>البريد الإلكتروني:</label>
        {editMode ? (
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        ) : (
          <p>{formData.email}</p>
        )}
      </div>

      <div className="mb-3">
        <label>رقم الهاتف:</label>
        {editMode ? (
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
          />
        ) : (
          <p>{formData.phone}</p>
        )}
      </div>

      <div className="mb-3">
        <label>العنوان:</label>
        {editMode ? (
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
          />
        ) : (
          <p>{formData.address}</p>
        )}
      </div>

      {editMode ? (
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={handleSave}>
            💾 حفظ
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setEditMode(false)}
          >
            إلغاء
          </button>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={() => setEditMode(true)}>
          ✏️ تعديل المعلومات
        </button>
      )}
    </div>
  );
}

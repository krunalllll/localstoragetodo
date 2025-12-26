import React, { useEffect, useState } from "react";
import "./localstorage.css";

export default function LocalStorageCRUD() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [data, setData] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("data"));
    return saved || [];
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email) return;

    if (editIndex !== null) {
      const updated = [...data];
      updated[editIndex] = form;
      setData(updated);
      setEditIndex(null);
    } else {
      setData([...data, form]);
    }

    setForm({ name: "", email: "" });
  }

  function editItem(index) {
    setForm(data[index]);
    setEditIndex(index);
  }

  function deleteItem(index) {
    setData(data.filter((_, i) => i !== index));
  }

  return (
    <div className="page">
      <div className="card">
        <h1>LocalStorage todo</h1>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <button className={editIndex !== null ? "update" : ""}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>

        <div className="list">
          {data.map((item, index) => (
            <div className="item-card" key={index}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.email}</p>
              </div>

              <div className="actions">
                <button
                  className="edit"
                  onClick={() => editItem(index)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => deleteItem(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {data.length === 0 && (
            <p className="empty">No data found</p>
          )}
        </div>
      </div>
    </div>
  );
}

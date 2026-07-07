
"use client";

export default function JobForm({
  form,
  setForm,
  handleSubmit,
  isEditing = false,
}) {
  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Company"
        value={form.company}
        onChange={(e) =>
          setForm({ ...form, company: e.target.value })
        }
        required
      />

      <br /><br />

      <input
        type="text"
        placeholder="Position"
        value={form.position}
        onChange={(e) =>
          setForm({ ...form, position: e.target.value })
        }
        required
      />

      <br /><br />

      <select
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Accepted</option>
      </select>

      <br /><br />

      <button type="submit">
        {isEditing ? "Update Job" : "Add Job"}
      </button>

    </form>
  );
}


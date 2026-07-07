"use client";

export default function JobCard({
  job,
  onEdit,
  onDelete,
}) {
  return (
    <div className="job-card">

      <h3>{job.company}</h3>

      <p>
        <strong>Position:</strong> {job.position}
      </p>

      <p>
        <strong>Status:</strong> {job.status}
      </p>

      <div className="job-buttons">

        <button
        className="edit-btn"
        onClick={()=>onEdit(job)}
        >
          ✏ Edit
        </button>

        <button
        className="delete-btn"
        onClick={()=>onDelete(job._id)}
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}
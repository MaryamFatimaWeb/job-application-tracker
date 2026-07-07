"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import API from "@/services/api";
import toast from "react-hot-toast";

import "@/styles/dashboard.css";

import Navbar from "@/components/Navbar";
import JobForm from "@/components/JobForm";
import JobCard from "@/components/JobCard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
  });

  useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [user]);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/jobs/${editingId}`, form);
        toast.success("Job Updated");
      } else {
        await API.post("/jobs", form);
        toast.success("Job Added");
      }

      setForm({
        company: "",
        position: "",
        status: "Applied",
      });

      setEditingId(null);

      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const handleEdit = (job) => {
    setEditingId(job._id);

    setForm({
      company: job.company,
      position: job.position,
      status: job.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this job?")) return;

    try {
      await API.delete(`/jobs/${id}`);

      toast.success("Job Deleted");

      fetchJobs();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchSearch = job.company
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || job.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <ProtectedRoute>
      <Navbar />

      <div className="container">

        <h1 className="page-title">
          Job Application Tracker
        </h1>

        <div className="stats">

          <div className="card total">
            <h2>{jobs.length}</h2>
            <p>Total Jobs</p>
          </div>

          <div className="card applied">
            <h2>
              {jobs.filter(
                (j) => j.status === "Applied"
              ).length}
            </h2>

            <p>Applied</p>
          </div>

          <div className="card interview">
            <h2>
              {jobs.filter(
                (j) => j.status === "Interview"
              ).length}
            </h2>

            <p>Interview</p>
          </div>

          <div className="card accepted">
            <h2>
              {jobs.filter(
                (j) => j.status === "Accepted"
              ).length}
            </h2>

            <p>Accepted</p>
          </div>

        </div>

        <JobForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          isEditing={editingId}
        />

        <div className="search-filter">

          <input
            type="text"
            placeholder="Search Company..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>

        </div>

        <h2>My Jobs</h2>
                {filteredJobs.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              padding: "30px",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3>No Jobs Found 😔</h3>
            <p>Add a new job or change your search/filter.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </ProtectedRoute>
  );
}
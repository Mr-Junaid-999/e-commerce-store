//app/admin/components/UpdateStatusForm
"use client";
import { useState, useTransition } from "react";

export default function UpdateStatusForm({ order, updateOrderStatus }) {
  const [status, setStatus] = useState(order.status);
  const [showTracking, setShowTracking] = useState(false);
  const [trackingId, setTrackingId] = useState(order.TrackingID || "");

  function handleChange(e) {
    const value = e.target.value;
    setStatus(value);
    setShowTracking(value === "shipped" && trackingId === "");
  }

  function handleSubmit(formData) {
    if (trackingId == "") {
      formData.set("tracking_id", order.TrackingID);
    } else {
      formData.set("tracking_id", trackingId);
    }

    setShowTracking(false);
    (async () => {
      await updateOrderStatus(formData);
      setShowTracking(false);
    })();
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" value={order.id} />
      <input type="hidden" name="payment_status" value={order.payment_status} />
      {status == "delivered" || status == "cancelled" ? (
        <p className="p-3">{order.status}</p>
      ) : (
        <select
          name="status"
          value={status}
          onChange={handleChange}
          className={`px-3 py-1 rounded-md border bg-[#0F172A] text-gray-200 border-gray-700
        `}
        >
          {["pending", "shipped", "delivered", "cancelled"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}

      {/* Always render the input but conditionally show/hide it */}
      {showTracking && (
        <input
          name="tracking_id"
          value={trackingId}
          type="text"
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Tracking ID"
          required={showTracking}
          className={`bg-[#0F172A] text-gray-200 px-3 py-1 rounded-md border border-gray-700 ${
            showTracking ? "" : "hidden"
          }`}
        />
      )}
      {status == "delivered" || status == "cancelled" ? null : (
        <button
          type="submit"
          disabled={status == "delivered" || status == "cancelled"}
          className="px-4 py-2 ml-2 rounded-lg bg-yellow-400 text-[#1E293B]"
        >
          Update
        </button>
      )}
    </form>
  );
}

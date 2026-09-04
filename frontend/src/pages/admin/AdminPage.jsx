import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Calendar, ClipboardList, LogOut, RefreshCw, ShieldCheck, CheckCircle2, XCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAdminOverview, updateReservationStatus, updateOrderStatus } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

function StatusBadge({ status }) {
  let badgeStyle = 'bg-[#FAF6EE] text-[#9A6A45] border-[#D6A85F]/50';
  let label = status;

  if (status === 'pending') {
    badgeStyle = 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse';
    label = 'Pending Approval';
  } else if (status === 'confirmed') {
    badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    label = 'Confirmed';
  } else if (status === 'rejected') {
    badgeStyle = 'bg-rose-50 text-rose-800 border-rose-300';
    label = 'Rejected';
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold ${badgeStyle}`}>
      {status === 'pending' && <Clock size={10} />}
      {status === 'confirmed' && <CheckCircle2 size={10} />}
      {status === 'rejected' && <XCircle size={10} />}
      {label}
    </span>
  );
}

export default function AdminPage() {
  const { user, token, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'admin') return;
    getAdminOverview(token)
      .then(setOverview)
      .catch((error) => toast.error(error.message || 'Could not load admin data'))
      .finally(() => setLoading(false));
  }, [isLoggedIn, token, user]);

  if (!isLoggedIn || user?.role !== 'admin') {
    return <Navigate to="/login" replace state={{ message: 'Admin login is required.' }} />;
  }

  const refresh = () => {
    setLoading(true);
    getAdminOverview(token)
      .then(setOverview)
      .catch((error) => toast.error(error.message || 'Could not load admin data'))
      .finally(() => setLoading(false));
  };

  const handleUpdateReservation = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await updateReservationStatus(id, newStatus, token);
      toast.success(`Reservation ${newStatus === 'confirmed' ? 'Accepted & Confirmed' : 'Rejected'}!`);
      setOverview(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          reservations: prev.reservations.map(r => r._id === id ? { ...r, status: newStatus } : r),
        };
      });
    } catch (err) {
      toast.error(err.message || 'Could not update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateOrder = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await updateOrderStatus(id, newStatus, token);
      toast.success(`Order ${newStatus === 'confirmed' ? 'Accepted & Confirmed' : 'Rejected'}!`);
      setOverview(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          orders: prev.orders.map(o => o._id === id ? { ...o, status: newStatus } : o),
        };
      });
    } catch (err) {
      toast.error(err.message || 'Could not update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const reservations = overview?.reservations || [];
  const orders = overview?.orders || [];

  return (
    <div className="min-h-screen bg-[#F8F1E5] px-4 pb-20 pt-28 text-[#3D281D]">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9A6A45]">
              <ShieldCheck size={15} /> Admin Command Center
            </div>
            <h1 className="font-pirate text-4xl text-[#3D281D]">WELCOME, {user.name.toUpperCase()}</h1>
            <p className="mt-1 font-accent italic text-[#7A4F30]">Review and confirm reservations and customer orders for Grand Line Café.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={refresh} className="inline-flex items-center gap-2 rounded-xl border border-[#D6A85F]/60 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#5A4030] cursor-pointer hover:bg-[#FAF6EE]">
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={() => { logout(); navigate('/login'); }} className="inline-flex items-center gap-2 rounded-xl bg-[#3D281D] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white cursor-pointer hover:bg-[#24160E]">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#EFE2CC] bg-white p-5 shadow-warm">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A6A45]">
              <Calendar size={15} /> Total Reservations
            </div>
            <div className="font-pirate text-3xl">{overview?.counts.reservations ?? '-'}</div>
          </div>
          <div className="rounded-2xl border border-[#EFE2CC] bg-white p-5 shadow-warm">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A6A45]">
              <ClipboardList size={15} /> Total Orders
            </div>
            <div className="font-pirate text-3xl">{overview?.counts.orders ?? '-'}</div>
          </div>
        </div>

        {loading && <div className="rounded-2xl border border-[#EFE2CC] bg-white p-8 text-center font-accent italic text-[#7A4F30]">Loading café records...</div>}

        {!loading && overview && (
          <div className="space-y-8">
            {/* Table Reservations Section */}
            <section className="overflow-x-auto rounded-2xl border border-[#EFE2CC] bg-white shadow-warm">
              <div className="border-b border-[#EFE2CC] p-5 flex items-center justify-between">
                <h2 className="font-pirate text-2xl">TABLE RESERVATIONS</h2>
                <span className="text-xs font-display text-[#9A6A45] uppercase tracking-wider font-semibold">Admin Approval Required</span>
              </div>
              <table className="w-full min-w-[900px] text-left text-xs">
                <thead className="bg-[#FAF6EE] font-display uppercase tracking-wider text-[#9A6A45]">
                  <tr>
                    <th className="p-4">Guest</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Guests</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Admin Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-6 text-center text-[#7A4F30]">No reservations found.</td>
                    </tr>
                  ) : (
                    reservations.map((res) => (
                      <tr key={res._id} className="border-t border-[#EFE2CC]">
                        <td className="p-4 font-bold text-[#3D281D]">{res.name}</td>
                        <td className="p-4">
                          <div>{res.email}</div>
                          <div className="text-[#7A4F30]">{res.phone}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold">{res.date}</div>
                          <div className="text-[#7A4F30]">{res.time}</div>
                        </td>
                        <td className="p-4">{res.guests}</td>
                        <td className="p-4">
                          <StatusBadge status={res.status} />
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {res.status !== 'confirmed' && (
                              <button
                                disabled={updatingId === res._id}
                                onClick={() => handleUpdateReservation(res._id, 'confirmed')}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                              >
                                <CheckCircle2 size={13} />
                                <span>Accept & Confirm</span>
                              </button>
                            )}
                            {res.status !== 'rejected' && (
                              <button
                                disabled={updatingId === res._id}
                                onClick={() => handleUpdateReservation(res._id, 'rejected')}
                                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-display text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                              >
                                <XCircle size={13} />
                                <span>Reject</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </section>

            {/* Customer Orders Section */}
            <section className="overflow-x-auto rounded-2xl border border-[#EFE2CC] bg-white shadow-warm">
              <div className="border-b border-[#EFE2CC] p-5 flex items-center justify-between">
                <h2 className="font-pirate text-2xl">CUSTOMER ORDERS</h2>
                <span className="text-xs font-display text-[#9A6A45] uppercase tracking-wider font-semibold">Admin Approval Required</span>
              </div>
              <table className="w-full min-w-[1000px] text-left text-xs">
                <thead className="bg-[#FAF6EE] font-display uppercase tracking-wider text-[#9A6A45]">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Admin Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-6 text-center text-[#7A4F30]">No orders found.</td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id} className="border-t border-[#EFE2CC] align-top">
                        <td className="p-4 font-bold text-[#3D281D]">{order.orderId}</td>
                        <td className="p-4">
                          <div className="font-bold">{order.customer?.name}</div>
                          <div>{order.customer?.email}</div>
                          <div className="text-[#7A4F30]">{order.customer?.phone}</div>
                        </td>
                        <td className="p-4">
                          {order.items?.map((item) => (
                            <div key={`${order._id}-${item.name}`}>
                              • {item.name} x {item.quantity}
                            </div>
                          ))}
                        </td>
                        <td className="p-4 capitalize">
                          {order.deliveryType}
                          <div className="text-[#7A4F30]">{order.paymentMethod}</div>
                        </td>
                        <td className="p-4 font-bold text-[#3D281D]">₹{Number(order.total || 0).toLocaleString('en-IN')}</td>
                        <td className="p-4">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {order.status !== 'confirmed' && (
                              <button
                                disabled={updatingId === order._id}
                                onClick={() => handleUpdateOrder(order._id, 'confirmed')}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                              >
                                <CheckCircle2 size={13} />
                                <span>Accept & Confirm</span>
                              </button>
                            )}
                            {order.status !== 'rejected' && (
                              <button
                                disabled={updatingId === order._id}
                                onClick={() => handleUpdateOrder(order._id, 'rejected')}
                                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-display text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                              >
                                <XCircle size={13} />
                                <span>Reject</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

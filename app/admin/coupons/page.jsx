// 2️⃣ Frontend: Next.js Admin Coupon Manager Page (pages/admin/coupons.js)
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axiosInstance from "@/utils/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    code: "",
    discountType: "flat",
    discountValue: 0,
    minPurchase: 0,
    maxDiscount: 0,
    expiresAt: "",
    isActive: true,
  });

  const fetchCoupons = async () => {
    const res = await axiosInstance.get("/coupons/all");
    setCoupons(res.data.coupons);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleSave = async () => {
    if (editId) {
     const res= await axiosInstance.put(`/coupons/${editId}`, form);
     if(res.status===200||res.status==201){
        toast.success("Coupon updated successfully");
     }else{
        toast.error(res.data.message||"something went wrong");
     }

    } else {
     const res= await axiosInstance.post("/coupons/create", form);
     if(res.status===200||res.status===201){
        toast.success("Coupon created successfully");
     }else{
        toast.error(res.data.message||"something went wrong");
     }

    }
    fetchCoupons();
    setOpen(false);
    resetForm();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/coupons/${id}`);
    fetchCoupons();
  };

  const resetForm = () => {
    setForm({
      code: "",
      discountType: "flat",
      discountValue: 0,
      minPurchase: 0,
      maxDiscount: 0,
      expiresAt: "",
      isActive: true,
    });
    setEditId(null);
  };

  const openForm = (coupon = null) => {
    if (coupon) {
      setForm({ ...coupon, expiresAt: coupon.expiresAt?.split("T")[0] });
      setEditId(coupon._id);
    } else {
      resetForm();
    }
    setOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Toaster/>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" color="navy">Manage Coupons</Typography>
        <Button variant="contained" onClick={() => openForm()} sx={{ backgroundColor: "navy" }}>
          + Add Coupon
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Min Purchase</TableCell>
            <TableCell>Max Discount</TableCell>
            <TableCell>Expiry</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coupons.map((c) => (
            <TableRow key={c._id}>
              <TableCell>{c.code}</TableCell>
              <TableCell>{c.discountType}</TableCell>
              <TableCell>{c.discountValue}</TableCell>
              <TableCell>{c.minPurchase}</TableCell>
              <TableCell>{c.maxDiscount}</TableCell>
              <TableCell>{c.expiresAt?.split("T")[0]}</TableCell>
              <TableCell>{c.isActive ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                <IconButton onClick={() => openForm(c)}><Edit /></IconButton>
                <IconButton onClick={() => handleDelete(c._id)}><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: "#001f3f", color: "white" }}>{editId ? "Edit Coupon" : "Add Coupon"}</DialogTitle>
        <DialogContent sx={{ p: 3,mt:"40px" }}>
          <Stack spacing={3}>
            <TextField fullWidth label="Coupon Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />

            <FormControl fullWidth>
              <InputLabel>Discount Type</InputLabel>
              <Select
                value={form.discountType}
                label="Discount Type"
                onChange={(e) => setForm({ ...form, discountType: e.target.value })}
              >
                <MenuItem value="flat">Flat</MenuItem>
                <MenuItem value="percent">Percent</MenuItem>
              </Select>
            </FormControl>

            <TextField fullWidth type="number" label="Discount Value" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })} />
            <TextField fullWidth type="number" label="Minimum Purchase" value={form.minPurchase} onChange={(e) => setForm({ ...form, minPurchase: Number(e.target.value) })} />
            <TextField fullWidth type="number" label="Maximum Discount applied only for percentages" value={form.maxDiscount} onChange={(e) => setForm({ ...form, maxDiscount: Number(e.target.value) })} />
            <TextField fullWidth type="date" label="Expiry Date" InputLabelProps={{ shrink: true }} value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ backgroundColor: "navy" }} onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

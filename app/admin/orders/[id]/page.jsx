import OrderDetails from '@/components/Admin/orders/[id]/OrderDetails';
import AdminLayout from '@/components/Admin/Layout';

export default function OrderDetailsPage({params}) {
  return (

      <OrderDetails params={params} />

  );
}
import { getServerSession } from "next-auth";
import { db } from "../lib/prisma";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import Header from "../components/Header";
import OrderItem from "../components/order-item";
import { fetch } from "../page";


const MyOrdersPage = async () => {
  const { allCategories } = await fetch();
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return redirect('/')
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true
        }
      },
    }
  })
  return (

    <div >
      <Header categories={allCategories} />
      <div className="py-6 px-5">
        <h2 className="font-semibold text-lg ">Meus pedidos</h2>
        <div className="space-y-3 pt-5">
          {orders.map((order) => (
            <OrderItem order={order} key={order.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrdersPage;
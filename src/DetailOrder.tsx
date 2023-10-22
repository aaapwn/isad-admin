import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { useParams } from "react-router-dom";
  
  interface Order {
    name: string;
    amount: number;
  }
  
  const DetailOrder = () => {
    const orders: Order[] = [
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      {
        name: "เนื้อสไลด์",
        amount: 10,
      },
      
    ];
    const { queue } = useParams<{ queue: string }>();
    return (
        <div className="py-5 px-3 rounded-t-3xl relative overflow-auto mt-20">
          <div className="max-w-lg mx-auto">
            <h1 className="w-full text-center text-3xl font-semibold mb-5 ">คิวที่ { queue } โต๊ะที่ { `xx` }</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index} className="font-semibold text-center">
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
    );
  };
  
  export default DetailOrder;
  
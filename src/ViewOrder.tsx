import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react";
  
  interface Order {
    queue: number;
    table: number;
    status: string;
  }
  
  const orders: Order[] = [
    {
      queue: 3,
      table: 1,
      status: "waiting",
    },
    {
      queue: 4,
      table: 9,
      status: "waiting",
    },
    {
      queue: 2,
      table: 12,
      status: "cancel",
    },
    {
      queue: 1,
      table: 7,
      status: "success",
    },
  ];
  const ViewOrder = () => {
    const [allOrder, setAllOrder] = useState<Order[]>(orders)
    const [disOrder, setDisOrder] = useState<Order[]>(orders.filter((order) => order.status === "waiting"))
    const [selectStatus, setSelectStatus] = useState<string>("waiting")
    const onChageRadio = (value: string) => {
      setDisOrder(allOrder.filter((order) => order.status === value).sort((a:Order, b:Order) => {return a.queue - b.queue}))
      setSelectStatus(value)
    }
    const onStatusChange = (value: string, queue:number) => {
      const newOrder = allOrder.map((order) => {
        if (order.queue === queue) {
          return {
            ...order,
            status: value
          }
        }
        return order
      })
      setDisOrder(newOrder.filter((order) => order.status === selectStatus).sort((a:Order, b:Order) => {return a.queue - b.queue}))
      setAllOrder(newOrder)
    }
    return (
        <div className="py-5 px-3 rounded-t-3xl relative overflow-auto mt-20">
            <RadioGroup defaultValue="waiting" className="flex justify-end w-full gap-x-5 px-5 mb-5" onValueChange={(value:string) => onChageRadio(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="waiting" id="r1" />
                <Label htmlFor="r1">ยังไม่จัดเสิร์ฟ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="success" id="r2" />
                <Label htmlFor="r2">เสิร์ฟแล้ว</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cancel" id="r3" />
                <Label htmlFor="r3">ยกเลิก</Label>
              </div>
            </RadioGroup>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Queue</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {disOrder.map((order) => (
                  <TableRow key={order.queue} className="font-semibold text-center">
                    <TableCell>{order.queue}</TableCell>
                    <TableCell>{order.table}</TableCell>
                    <TableCell className="font-semibold flex justify-center">
                      <Select defaultValue={order.status} onValueChange={(value:string) => {onStatusChange(value, order.queue)}}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Theme" className=""/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="waiting" className="">ยังไม่จัดเสิร์ฟ</SelectItem>
                          <SelectItem value="success">เสิร์ฟแล้ว</SelectItem>
                          <SelectItem value="cancel">ยกเลิก</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Link to={`/view-order/${order.queue}`} className="underline">view</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
    );
  };
  
  export default ViewOrder;
  
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
import { useState, useEffect } from "react";
import { getOrder } from "./api/order/function";

  const ViewOrder = () => {
    const [selectStatus, setSelectStatus] = useState<string>("WAITING")
    const [allOrder, setAllOrder] = useState<any>([])
    const [disOrder, setDisOrder] = useState<any>(allOrder.filter((order:any) => order.status === selectStatus))
    const onChageRadio = (value: string) => {
      setDisOrder(allOrder.filter((order:any) => order.status === value).sort((a:any, b:any) => {return a.id - b.id}))
      setSelectStatus(value)
    }
    const onStatusChange = (value: string, queue:number) => {
      const newOrder = allOrder.map((order:any) => {
        if (order.queue === queue) {
          return {
            ...order,
            status: value
          }
        }
        return order
      })
      setDisOrder(newOrder.filter((order:any) => order.status === selectStatus).sort((a:any, b:any) => {return a.id - b.id}))
      setAllOrder(newOrder)
    }

    useEffect(() => {
      getOrder().then((res) => {
        setAllOrder(res)
        onChageRadio("WAITING")
      })
    })
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
                {disOrder.map((order:any) => (
                  <TableRow key={order.id} className="font-semibold text-center">
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{1}</TableCell>
                    <TableCell className="font-semibold flex justify-center">
                      <Select defaultValue={order.status} onValueChange={(value:string) => {onStatusChange(value, order.queue)}}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Theme" className=""/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WAITING" className="">ยังไม่จัดเสิร์ฟ</SelectItem>
                          <SelectItem value="SUCCESS">เสิร์ฟแล้ว</SelectItem>
                          <SelectItem value="CANCEL">ยกเลิก</SelectItem>
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
  
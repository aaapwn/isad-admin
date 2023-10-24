import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getTable } from "./api/table/function";
import { updateStatusTable, setTableCustomer } from "./api/table/function";
import { updateStatusCustomer } from "./api/customer/function";

const ViewTable = () => {
  const navigate = useNavigate();
  const [tableStatus, setTableStatus] = useState<any>([]);
  const inputCusID = useRef<HTMLInputElement>(null);

  const onCheckOutHandler = (table_id: number, customer_id: number) => {
    
    const newTableStatus = tableStatus.map((item:any) => {
      if (item.id === table_id) {
        return { ...item, ready: "AVAILABLE" };
      } else {
        return item;
      }
    });
    setTableStatus(newTableStatus);
    setTableStatus(newTableStatus);
    updateStatusTable(table_id, "AVAILABLE");
    setTableCustomer(table_id, null);
    updateStatusCustomer(customer_id, "CHECKED_OUT");
    navigate(`/billing/${table_id}`)
  }

  const onAddCustomerHandler = (table_id:number, customer_id:number) => {
    const newTableStatus = tableStatus.map((item:any) => {
      if (item.id === table_id) {
        return { ...item, ready: "UNAVAILABLE" };
      } else {
        return item;
      }
    });
    console.log(newTableStatus)
    setTableStatus(newTableStatus);
    updateStatusTable(table_id, "UNAVAILABLE");
    setTableCustomer(table_id, customer_id);
    updateStatusCustomer(customer_id, "CHECKED_IN");
  }

  useEffect(() => {
    getTable().then((data) => {
      setTableStatus(data);
    });
  }, []);
  
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-10/12 mx-auto flex flex-col items-center gap-y-4 mt-4">
        <h1 className="text-3xl font-semibold">เลขโต๊ะ</h1>
        <div className="grid grid-cols-4 gap-y-8 w-full ">
          {tableStatus.map((item:any) => {
            if (item.ready === "AVAILABLE") {
              return (
                <Dialog key={item.id}>
                  <DialogTrigger asChild className="cursor-pointer">
                    <div
                      className="flex flex-col justify-center items-center gap-y-2"
                      key={item.id}
                    >
                      <div className="w-2/6 aspect-square border border-black rounded-lg flex justify-center items-center">
                        <p className="font-medium text-lg">{item.id}</p>
                      </div>
                      <p className={`text-green-600 font-medium`}>
                        {item.ready}
                      </p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <>
                      <div className="">
                        {`กรุณากรอกรหัสของลูกค้า (โต๊ะที่ ${item.id})`}
                      </div>
                      <Input type="number" ref={inputCusID}/>
                    </>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <div className="flex gap-x-3 w-full">
                          <Button
                            type="button"
                            variant="secondary"
                            className="w-full"
                          >
                            ยกเลิก
                          </Button>
                          <Button
                            type="button"
                            variant="default"
                            className="bg-primary text-white w-full"
                            onClick={() => onAddCustomerHandler(item.id, inputCusID.current?.valueAsNumber as number)}
                          >
                            เพิ่ม
                          </Button>
                        </div>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              );
            } else if (item.ready === "UNAVAILABLE") {
              return (
                <Dialog key={item.id}>
                  <DialogTrigger asChild className="cursor-pointer">
                    <div
                      className="flex flex-col justify-center items-center gap-y-2"
                      key={item.id}
                    >
                      <div className="w-2/6 aspect-square border border-black rounded-lg flex justify-center items-center">
                        <p className="font-medium text-lg">{item.id}</p>
                      </div>
                      <p className={`text-red-600 font-medium`}>
                        {item.ready}
                      </p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <>
                      <div className="text-center">
                        <h1 className="text-lg font-semibold">
                          คุณต้องการจะพิมพ์ใบชำระเงินสำหรับลูกค้าหรือไม่
                        </h1>
                        <p className="text-red-600">
                          เมื่อกด<b>"ยืนยัน"</b>จะถือว่าลูกค้าได้ลุกออกจากโต๊ะเรียบร้อย
                          และสถานะของ <b>โต๊ะที่ {item.id}</b> ถูกเปลี่ยนเป็น <b>"avaliable"</b>
                        </p>
                      </div>
                    </>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <div className="flex gap-x-3 w-full">
                          <Button
                            type="button"
                            variant="secondary"
                            className="w-full"
                          >
                            ยกเลิก
                          </Button>
                          <Button
                            type="button"
                            variant="default"
                            className="bg-primary text-white w-full"
                            onClick={() => onCheckOutHandler(item.id, item.customerId)}
                          >
                            ยืนยัน
                          </Button>
                        </div>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewTable;

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
import { useState } from "react";

interface Table {
  id: number;
  status: string;
}

const table: Table[] = [
  { id: 1, status: "available" },
  { id: 2, status: "available" },
  { id: 3, status: "non-available" },
  { id: 4, status: "available" },
  { id: 5, status: "available" },
  { id: 6, status: "non-available" },
  { id: 7, status: "non-available" },
  { id: 8, status: "non-available" },
  { id: 9, status: "non-available" },
  { id: 10, status: "available" },
  { id: 11, status: "non-available" },
  { id: 12, status: "non-available" },
];

const ViewTable = () => {
  const navigate = useNavigate();
  const [tableStatus, setTableStatus] = useState<Table[]>(table);

  const onCheckOutHandler = (id: number) => {
    const newTableStatus = tableStatus.map((item) => {
      if (item.id === id) {
        return { ...item, status: "available" };
      } else {
        return item;
      }
    });
    setTableStatus(newTableStatus);
    navigate(`/billing/${id}`)
  }

  const onAddCustomerHandler = (id:number) => {
    const newTableStatus = tableStatus.map((item) => {
      if (item.id === id) {
        return { ...item, status: "non-available" };
      } else {
        return item;
      }
    });
    setTableStatus(newTableStatus);
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-10/12 mx-auto flex flex-col items-center gap-y-4 mt-4">
        <h1 className="text-3xl font-semibold">เลขโต๊ะ</h1>
        <div className="grid grid-cols-4 gap-y-8 w-full ">
          {tableStatus.map((item) => {
            if (item.status === "available") {
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
                        {item.status}
                      </p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <>
                      <div className="">
                        {`กรุณากรอกรหัสของลูกค้า (โต๊ะที่ ${item.id})`}
                      </div>
                      <Input type="number" />
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
                            onClick={() => onAddCustomerHandler(item.id)}
                          >
                            เพิ่ม
                          </Button>
                        </div>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              );
            } else if (item.status === "non-available") {
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
                        {item.status}
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
                            onClick={() => onCheckOutHandler(item.id)}
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

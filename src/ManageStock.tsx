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
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "./components/ui/label";
import { Fragment, useState, useEffect } from "react";
import { createMenuItem, getMenuItem, updateMenuItem } from "./api/menu/item/function";
import { createMenuCategory } from "./api/menu/category/function";
import { useRef } from "react";

const ManageStock = () => {
  const [stock, setStock] = useState<any>([]);
    const inputName = useRef<HTMLInputElement>(null);
    const inputPrice = useRef<HTMLInputElement>(null);
    const fetchData = async () => {
      const data = await getMenuItem();
      setStock(data);
    };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <Table className="mt-20 max-w-4xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>รหัสวัตถุดิบ</TableHead>
            <TableHead>ชื่อวัตถุดิบ</TableHead>
            <TableHead>ราคา</TableHead>
            <TableHead>สถานะ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stock.map((person: any, index: number) => (
            <Fragment key={index}>
              <div className="w-full flex gap-x-3 items-center">
                <h1 className="text-2xl font-bold">{person.name}</h1>
                <Dialog>
                  <DialogTrigger asChild className="cursor-pointer">
                    <Button>เพิ่มเมนู</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <>
                      <div className="">
                        <Label>ชื่อ :</Label>
                        <Input type="text" ref={inputName} />
                      </div>
                      <div className="">
                        <Label>ราคา :</Label>
                        <Input type="number" ref={inputPrice} />
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
                            onClick={() => {createMenuItem({
                                name: inputName.current?.value as string,
                                price: inputPrice.current?.valueAsNumber as number,
                                menuCategoryId: person.id
                            }); fetchData()}}
                          >
                            เพิ่ม
                          </Button>
                        </div>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild className="cursor-pointer">
                    <Button>เพิ่มหมวดหมู่</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <>
                      <div className="">
                        <Label>ชื่อ :</Label>
                        <Input type="text" ref={inputName} />
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
                            onClick={() => {createMenuCategory(
                                inputName.current?.value as string,
                            ); fetchData()}}
                          >
                            เพิ่มเมนู
                          </Button>
                        </div>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              {person.Menu.map((menu: any, index: number) => {
                return (
                  <TableRow key={index} className="font-semibold text-center">
                    <TableCell>{menu.id}</TableCell>
                    <TableCell>{menu.name}</TableCell>
                    <TableCell>{menu.price}</TableCell>
                    <TableCell className="w-full flex justify-center">
                      <Select
                        defaultValue={menu.status}
                        onValueChange={(value) => {updateMenuItem(menu.id,{
                            name: menu.name,
                            price: menu.price,
                            status: value,
                            menuCategoryId: menu.menuCategoryId
                        }); }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Theme" className="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AVAILABLE" className="">
                            พร้อมเสิร์ฟ
                          </SelectItem>
                          <SelectItem value="UNAVAILABLE">หมด</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageStock;

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

interface Stock {
    id: number;
    name: string;
    status: string;
    }

const stock: Stock[] = [
    {
        id: 1,
        name: "เนื้อสไลด์",
        status: "ready",
    },
    {
        id: 2,
        name: "เนื้อสไลด์",
        status: "ready",
    },
    {
        id: 3,
        name: "เนื้อสไลด์",
        status: "ready",
    },
    {
        id: 4,
        name: "เนื้อสไลด์",
        status: "non-ready",
    },
    {
        id: 5,
        name: "เนื้อสไลด์",
        status: "ready",
    },
    {
        id: 6,
        name: "เนื้อสไลด์",
        status: "ready",
    },
]

const ManageStock = () => {
  return (
    <div>
        <Table className="mt-20 max-w-4xl mx-auto">
            <TableHeader>
            <TableRow>
                <TableHead>รหัสวัตถุดิบ</TableHead>
                <TableHead>ชื่อวัตถุดิบ</TableHead>
                <TableHead>สถานะ</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {stock.map((person, index) => (
                <TableRow key={index} className="font-semibold text-center">
                <TableCell>{person.id}</TableCell>
                <TableCell>{person.name}</TableCell>
                <TableCell className="w-full flex justify-center">
                    <Select defaultValue={person.status} onValueChange={() => {}}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" className=""/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ready" className="">พร้อมเสิร์ฟ</SelectItem>
                            <SelectItem value="non-ready">หมด</SelectItem>
                        </SelectContent>
                    </Select>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default ManageStock

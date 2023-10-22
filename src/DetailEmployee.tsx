import { useState } from "react"
// import { useParams } from "react-router-dom"
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Employee {
    id: number;
    firstname: string;
    lastname: string;
    age: number;
    tel: string;
}

const DetailEmployee = () => {
  const navigate = useNavigate()
//   const { id } = useParams<{id:string}>()
  const [onEdit, setOnEdit] = useState<boolean>(false)

  
  const [employee, setEmployee] = useState<Employee>({
      id: 1,
      firstname: "Siwakorn",
      lastname: "Somjit",
      age: 20,
      tel: "0123456789"
    })
    
    const [newFirstname, setNewFirstname] = useState<string>(employee.firstname)
    const [newLastname, setNewLastname] = useState<string>(employee.lastname)
    const [newAge, setNewAge] = useState<number>(employee.age)
    const [newTel, setNewTel] = useState<string>(employee.tel)

    const onSave = () => {
        setEmployee({
            ...employee,
            firstname: newFirstname,
            lastname: newLastname,
            age: newAge,
            tel: newTel
        })
        setOnEdit(false)
        toast.success("บันทึกข้อมูลสำเร็จ")
    }

    const onCancel = () => {
        setNewFirstname(employee.firstname)
        setNewLastname(employee.lastname)
        setNewAge(employee.age)
        setNewTel(employee.tel)
        setOnEdit(false)
    }

    const onDelete = () => {
        navigate("/manage-employee")
        toast.success("ลบข้อมูลสำเร็จ")
    }
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <div className="w-4/12">
            <div className="flex justify-between w-full">
                <div>
                    <Label>ชื่อจริง</Label>
                    <Input type="text" value={newFirstname} disabled={!onEdit} onChange={(e) => setNewFirstname(e.target.value)}/>
                </div>
                <div>
                    <Label>นามสกุล</Label>
                    <Input type="text" value={newLastname} disabled={!onEdit} onChange={(e) => setNewLastname(e.target.value)}/>
                </div>
            </div>
            <div className="flex justify-between w-full">
                <div>
                    <Label>อายุ</Label>
                    <Input type="number" value={newAge} disabled={!onEdit} onChange={(e) => setNewAge(e.target.value as unknown as number)}/>
                </div>
                <div>
                    <Label>เบอร์โทรศัพท์</Label>
                    <Input type="text" value={newTel} disabled={!onEdit} onChange={(e) => setNewTel(e.target.value)}/>
                </div>
            </div>
            {
                onEdit ? (
                    <div className="flex justify-end gap-x-5 mt-5">
                        <Button onClick={onCancel}>ยกเลิก</Button>
                        <Button onClick={onSave}>บันทึก</Button>
                    </div>
                ) : (
                    <div className="flex justify-end gap-x-5 mt-5">
                        <Button onClick={() => setOnEdit(true)}>แก้ไข</Button>
                        <Button onClick={onDelete} className="bg-red-500 hover:bg-red-600">ลบ</Button>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default DetailEmployee

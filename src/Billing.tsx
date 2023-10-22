import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import { Button } from './components/ui/button'

interface Bill {
  name: string
  price: number
  amount: number
}

const bill: Bill[] = [
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
  {
    name: 'เนื้อสไลด์',
    price: 100,
    amount: 10,
  },
]
const Billing = () => {
  let total = 0
  const { table_id } = useParams<{ table_id: string }>()
  const billRef = useRef<HTMLDivElement>(null)
  return (
    <div>
        <div className='w-96 border border-black mx-auto my-10 flex flex-col justify-center items-center py-5 px-3' ref={billRef}>
            <img src="/logo.webp" className='w-1/6' alt="" />
            <p>สัตว์บกจุ่มน้ำ</p>
            <p>โต๊ะที่ {table_id}</p>
            {/* <div className='w-full border border-black my-4'></div> */}
            <table className='w-full'>
              <tr className='border-b border-black'>
                <th className='text-left'>รายการ</th>
                <th className='text-right'>ราคา</th>
              </tr>
              {bill.map((item, index) => {
                total += item.price * item.amount
                return (
                  <tr className='' key={index}>
                    <td className='text-left'>{item.name}*{item.amount}</td>
                    <td className='text-right'>{item.price*item.amount}</td>
                  </tr>
                )
              })}
              <tr className='border-t border-black '>
                <td className='text-left'>รวมทั้งหมด</td>
                <td className='text-right'>{total}</td>
              </tr>
            </table>
            <div className='border w-full border-dashed border-black my-5'></div>
            <div className='flex flex-col justify-center items-center mt-3 gap-y-3'>
              <p>ตรวจสอบรายการและชำระเงินมาที่</p>
              <img src="/QR-payment.webp" alt="" className='w-1/2'/>
            </div>
        </div>
        <div className='flex justify-center items-center'>
          <Button onClick={() => {
            html2canvas(billRef.current!).then((canvas) => {
              const imgData = canvas.toDataURL('image/png')
              const pdf = new jsPDF('p', 'px', 'dl')
              const width = pdf.internal.pageSize.getWidth()
              const height = pdf.internal.pageSize.getHeight()
              pdf.addImage(imgData, 'JPEG', 0, 0, width, height)
              pdf.save('billing.pdf')
            })
          }}>Download</Button>
      </div>
    </div>
  )
}

export default Billing

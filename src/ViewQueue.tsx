
interface Queue {
    queue: number;
    customer_id: number;
}

const queues: Queue[] = [
    {
        queue: 1,
        customer_id: 3306,
    },
    {
        queue: 2,
        customer_id: 3307,
    },
    {
        queue: 3,
        customer_id: 3308,
    },
    {
        queue: 4,
        customer_id: 3309,
    },
    {
        queue: 5,
        customer_id: 3310,
    }
]

const ViewQueue = () => {
  return (
    <div>
        {
            queues.map((queue) => {
                return (
                    <div className="flex justify-between items-center px-5 py-3 border-b border-gray-300" key={queue.queue}>
                        <div className="text-2xl font-semibold">คิวที่ {queue.queue}</div>
                        <div className="text-2xl font-semibold">รหัสลูกค้า {queue.customer_id}</div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ViewQueue

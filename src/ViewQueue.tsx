import { useEffect, useState } from "react"
import { getQueue } from "./api/queue/functions"

const ViewQueue = () => {
  const [queues, setQueues] = useState<any>([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getQueue()
      setQueues(data)
    }
    let interval = setInterval(() => {
		fetchData();
	}, 5000);
	return () => {
		clearInterval(interval);
	};
  }, [])
  return (
    <div>
        {
            queues.map((queue:any) => {
                return (
                    <div className="flex justify-between items-center px-5 py-3 border-b border-gray-300" key={queue.id}>
                        <div className="text-2xl font-semibold">รหัสลูกค้า {queue.id}</div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ViewQueue

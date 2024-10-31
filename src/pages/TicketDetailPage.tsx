import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import ticketAPI from "src/apis/ticket.api"
import TicketDetail from "src/Components/ticket/TicketDetail"

const TicketDetailPage = () => {
    const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['ticket', id],
    queryFn: () => ticketAPI.getTicketById(id as string)
  })
  console.log(data);
    return (
        <div className="mt-[100px]">
            {data?.data.data && <TicketDetail ticket={data.data.data}/>}
        </div>
    )
}

export default TicketDetailPage
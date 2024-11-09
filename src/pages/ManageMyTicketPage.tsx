import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import ticketAPI from "src/apis/ticket.api"
import { ManageMyTicket } from "src/Components"


const ManageMyTicketPage = () => {
    const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['ticket', id],
    queryFn: () => ticketAPI.getTicketById(id as string)
  })
  console.log(data);
    return (
        <div className="mt-[100px]">
            {data?.data.data && <ManageMyTicket ticket={data.data.data}/>}
        </div>
    )
}

export default ManageMyTicketPage
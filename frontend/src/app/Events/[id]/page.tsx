// app/event/[id]/page.tsx

import { useRouter } from 'next/navigation'

const EventPage = ({ params }: { params: { id: string } }) => {
  // Fetch and display event details based on the `id` parameter
  const { id } = params

  // Example: Fetch event details
  // const [event, setEvent] = useState<Event | null>(null);
  // useEffect(() => {
  //   fetch(`/api/events/${id}`)
  //     .then(response => response.json())
  //     .then(data => setEvent(data));
  // }, [id]);

  return (
    <div>
      <h1>Event ID: {id}</h1>
      {/* Render event details here */}
    </div>
  )
}

export default EventPage

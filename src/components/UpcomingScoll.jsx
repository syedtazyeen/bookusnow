import React, { useState, useEffect, useRef } from "react";
import { MdLocationOn } from "react-icons/md";
import { getDate, getDistance, getImageIdFromUrl } from "../utils";
import CircularLoading from "./CircularLoading";


const UpcomingScroll = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const lastEventRef = useRef(null);

  useEffect(() => {
    fetchEvents();

    const handleScroll = () => {
      if (
        lastEventRef.current &&
        window.innerHeight + window.scrollY >=
          lastEventRef.current.offsetTop + lastEventRef.current.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [page]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${page}&type=upcoming`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setEvents((prevEvents) => [...prevEvents, ...data.events]);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (events.length === 0 && isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <EventList events={events} lastEventRef={lastEventRef} />
      {isLoading && <LoadingMoreIndicator />}
    </>
  );
};

export default UpcomingScroll;




///
const LoadingIndicator = () => (
    <div className="h-56">
      <CircularLoading />
    </div>
  );
  
  const EventImage = ({ event }) => (
    <div className="relative bg-slate-100 rounded-md aspect-[4/3] overflow-hidden">
      <img
        className="w-full h-full scale-150"
        src={`https://drive.google.com/thumbnail?id=${getImageIdFromUrl(event.imgUrl)}&sz=w1000`}
        alt={event.eventName}
      />
      <p className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-xs text-white">
        {getDate(event.date)}
      </p>
    </div>
  );
  
  const EventDetails = ({ event }) => (
    <div className="text-sm flex flex-col gap-2 p-2">
      <p className="font-semibold opacity-90 line-clamp-1 overflow-hidden">{event.eventName}</p>
      <div className="flex justify-between">
        <p className="flex items-center opacity-70">
          <MdLocationOn /> {event.cityName}
        </p>
        <p className="text-end opacity-70">{getDistance(event.distanceKm)} km</p>
      </div>
    </div>
  );
  
  const EventItem = ({ event, index, lastEventRef }) => (
    <div
      ref={lastEventRef}
      id={`event-${index}`}
      className="border-[1px] rounded-md p-2 mr-4 cursor-pointer"
    >
      <EventImage event={event} />
      <EventDetails event={event} />
    </div>
  );
  
  const EventList = ({ events, lastEventRef }) => (
    <div className="overflow-y-auto mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <EventItem key={index} event={event} index={index} lastEventRef={index === events.length - 1 ? lastEventRef : null} />
      ))}
    </div>
  );
  
  const LoadingMoreIndicator = () => (
    <div className="fixed bottom-0 z-50 w-full flex justify-center">
      <div className="bg-white shadow-md py-2 px-6 m-2 rounded-md flex items-center gap-2 text-sm">
        <CircularLoading />
        Loading more
      </div>
    </div>
  );
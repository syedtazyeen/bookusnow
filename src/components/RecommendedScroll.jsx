import React, { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { getDate, getDistance, getImageIdFromUrl } from "../utils";
import CircularLoading from "./CircularLoading";

const RecommendedScroll = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="overflow-x-scroll no-scrollbar">
      <div className="flex w-fit p-8">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedScroll;





////

const LoadingIndicator = () => (
  <div className="h-56">
    <CircularLoading />
  </div>
);

const EventCard = ({ event }) => (
  <div
    className="bg-gray-400 relative overflow-hidden rounded-xl h-72 xl:h-80 aspect-[3/4] mr-4
    cursor-pointer hover:scale-[1.05] transition-[.5s]"
  >
    <img
      className="w-full h-full scale-150 object-cover"
      src={`https://drive.google.com/thumbnail?id=${getImageIdFromUrl(event.imgUrl)}&sz=w1000`}
      alt={event.eventName}
    />
    <EventDetails event={event} />
  </div>
);

const EventDetails = ({ event }) => (
  <div className="absolute bottom-0 p-2 flex flex-col gap-1 w-full text-[.6rem] ">
    <p className="text-xs md:text-sm font-semibold text-white opacity-90 line-clamp-1 overflow-hidden">
      {event.eventName}
    </p>
    <p className="text-white opacity-70">{getDate(event.date)}</p>
    <div className="flex justify-between">
      <p className="text-white flex items-center gap-1 opacity-70">
        <MdLocationOn /> {event.cityName}
      </p>
      <p className="text-white text-end opacity-70">{getDistance(event.distanceKm)} km</p>
    </div>
  </div>
);
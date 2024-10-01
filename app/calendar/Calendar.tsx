import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import Modal from "react-modal";
import "./calendar.css";

// Modal styles
const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000, // Ensure the modal overlay is on top of other elements
  },
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    maxHeight: "100vh", // Set maximum height for the modal content
    border: "none",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
  },
};

const inputStyles = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
};

const buttonStyles = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
};

interface CalendarContainerProps {}

const CalendarContainer: React.FC<CalendarContainerProps> = () => {
  const [events, setEvents] = useState<Array<{ title: string; date: string }>>([
    { title: "CCL Oral/Practical", date: "2024-04-25" },
    { title: "End Sem Exams Start", date: "2024-05-13" },
    { title: "Project Presentation", date: "2024-04-24" },
  ]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");

  const handleDateClick = (arg: DateClickArg) => {
    setEventDate(arg.dateStr);
    setModalVisible(true);
  };

  const handleCreateEventClick = () => {
    setModalVisible(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (eventTitle && eventDate) {
      const newEvent = { title: eventTitle, date: eventDate };
      setEvents([...events, newEvent]);
      setModalVisible(false);
      setEventTitle("");
      setEventDate("");
    }
  };

  return (
    <div className="mt-10 p-20 scrollbar-hidden">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        dateClick={handleDateClick}
      />
      {/* <div
        className="create-event-button cursor-pointer"
        onClick={handleCreateEventClick}
        style={{
          position: "sticky",
          top: "500px", // Adjust top position as needed
          right: "10px", // Adjust right position as needed
          zIndex: 1001, // Ensure the button is on top of the calendar
        }}
      >
        <span style={{ fontSize: "20px" }}>+</span>
      </div> */}
      <Modal
        isOpen={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={modalStyles}
        className=""
      >
        <h2
          style={{
            marginBottom: "20px",
            textAlign: "center",
            color: "black",
            fontSize: "25px",
          }}
        >
          Create Event
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="eventTitle"
              style={{ marginBottom: "5px", color: "black", fontSize: "20px" }}
            >
              Event Title:
            </label>
            <input
              type="text"
              id="eventTitle"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              style={inputStyles}
            />
          </div>
          <div>
            <label
              htmlFor="eventDate"
              style={{ marginBottom: "5px", color: "black", fontSize: "20px" }}
            >
              Event Date:
            </label>
            <input
              type="date"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              style={inputStyles}
            />
          </div>
          <button className="mb-5" type="submit" style={buttonStyles}>
            Add Event
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CalendarContainer;

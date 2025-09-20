"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function HomePage() {
  const rooms = [
    // Learning Center
    { id: 1, name: "Lesesaal 1", people: 5, capacity: 50, type: "Learning Center" },
    { id: 2, name: "Lesesaal 2", people: 20, capacity: 40, type: "Learning Center" },
    { id: 3, name: "Lesesaal 3", people: 12, capacity: 40, type: "Learning Center" },
    { id: 4, name: "Lesesaal 4", people: 30, capacity: 50, type: "Learning Center" },
    { id: 5, name: "Lesesaal 5", people: 10, capacity: 50, type: "Learning Center" },

    // Gruppenräume
    { id: 6, name: "Gruppenraum A", people: 8, capacity: 10, type: "Gruppenräume" },
    { id: 7, name: "Gruppenraum B", people: 10, capacity: 10, type: "Gruppenräume" },
    { id: 8, name: "Gruppenraum C", people: 4, capacity: 10, type: "Gruppenräume" },
    { id: 9, name: "Gruppenraum D", people: 9, capacity: 12, type: "Gruppenräume" },
    { id: 10, name: "Gruppenraum E", people: 7, capacity: 10, type: "Gruppenräume" },

    // Seitenbänke
    { id: 11, name: "Seitenbank 1", people: 2, capacity: 4, type: "Seitenbänke" },
    { id: 12, name: "Seitenbank 2", people: 3, capacity: 4, type: "Seitenbänke" },
    { id: 13, name: "Seitenbank 3", people: 1, capacity: 4, type: "Seitenbänke" },
    { id: 14, name: "Seitenbank 4", people: 4, capacity: 4, type: "Seitenbänke" },
    { id: 15, name: "Seitenbank 5", people: 2, capacity: 4, type: "Seitenbänke" },
  ];

  const getStatus = (people, capacity) => {
    const ratio = people / capacity;
    if (ratio === 0) return { label: "Leer", color: "bg-gray-300 text-gray-800" };
    if (ratio <= 1 / 3) return { label: "Gering", color: "bg-green-500 text-white" };
    if (ratio <= 2 / 3) return { label: "Mittel", color: "bg-yellow-400 text-black" };
    if (ratio < 1) return { label: "Hoch", color: "bg-orange-500 text-white" };
    return { label: "Voll", color: "bg-red-600 text-white" };
  };

  const groupedRooms = rooms.reduce((acc, room) => {
    if (!acc[room.type]) acc[room.type] = [];
    acc[room.type].push(room);
    return acc;
  }, {});

  // Dynamisches Datum
  const today = new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Dummy-Daten für Chart (z. B. jede Stunde ein Wert)
  const data = [
    { time: "8:00", people: 20 },
    { time: "9:00", people: 35 },
    { time: "10:00", people: 50 },
    { time: "11:00", people: 65 },
    { time: "12:00", people: 80 },
    { time: "13:00", people: 70 },
    { time: "14:00", people: 60 },
    { time: "15:00", people: 75 },
    { time: "16:00", people: 90 },
    { time: "17:00", people: 85 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Bibliotheks-Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Linke Seite - Räume */}
        <div>
          {Object.keys(groupedRooms).map((type) => (
            <div key={type} className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">{type}</h2>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {groupedRooms[type].map((room) => {
                  const status = getStatus(room.people, room.capacity);
                  return (
                    <div
                      key={room.id}
                      className="min-w-[200px] p-4 rounded-xl bg-white shadow-sm border border-gray-200 flex-shrink-0"
                    >
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">{room.name}</h3>
                      <p className="text-gray-700">
                        Personen: <strong>{room.people}</strong> / {room.capacity}
                      </p>
                      <span
                        className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Rechte Seite - Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Geschätzte Belegung am {today}
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="people" fill="#0284c7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

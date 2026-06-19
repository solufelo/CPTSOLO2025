import { useState, useEffect } from "react";

/**
 * AvailabilityBadge Component
 * Shows real-time availability status based on your schedule
 * Updates automatically to show "Available Now" or "Next Available: [date]"
 */

const AvailabilityBadge = ({ compact = false }) => {
  const [availability, setAvailability] = useState({
    isAvailable: false,
    message: "Checking availability...",
    nextSlot: null,
  });

  // Your actual availability schedule (update this weekly!)
  // Based on your memory: Mon/Wed/Fri all day, Tue/Thu afternoons, weekends open
  const availabilitySchedule = {
    monday: { available: true, hours: "9am-9pm" },
    tuesday: { available: true, hours: "1pm-9pm" },
    wednesday: { available: true, hours: "9am-9pm" },
    thursday: { available: true, hours: "1pm-9pm" },
    friday: { available: true, hours: "9am-9pm" },
    saturday: { available: true, hours: "10am-8pm" },
    sunday: { available: true, hours: "10am-6pm" },
  };

  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "lowercase" });
      const currentHour = now.getHours();
      
      // Check if currently available based on day and time
      const todaySchedule = availabilitySchedule[dayOfWeek];
      
      if (!todaySchedule.available) {
        // Find next available day
        setAvailability({
          isAvailable: false,
          message: "Next available: Check calendar",
          nextSlot: null,
        });
        return;
      }

      // Parse hours (simplified - you can make this more complex)
      const [startTime, endTime] = todaySchedule.hours.split("-");
      const startHour = parseInt(startTime);
      const endHour = parseInt(endTime.includes("pm") ? parseInt(endTime) + 12 : endTime);

      const isCurrentlyAvailable = currentHour >= startHour && currentHour < endHour;

      setAvailability({
        isAvailable: isCurrentlyAvailable,
        message: isCurrentlyAvailable
          ? `Available now • Responding within 2 hours`
          : `Next available: ${getNextAvailableTime()}`,
        nextSlot: todaySchedule.hours,
      });
    };

    // Helper to get next available time
    const getNextAvailableTime = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayName = tomorrow.toLocaleDateString("en-US", { weekday: "long" });
      return `Tomorrow (${dayName})`;
    };

    checkAvailability();
    
    // Update every 5 minutes
    const interval = setInterval(checkAvailability, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full animate-pulse ${
            availability.isAvailable ? "bg-green-500" : "bg-yellow-500"
          }`}
        />
        <span className="text-sm text-white/70">
          {availability.isAvailable ? "Available Now" : "Book a Call"}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
        ${
          availability.isAvailable
            ? "bg-green-500/20 text-green-300 border border-green-500/30"
            : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
        }
      `}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          availability.isAvailable ? "bg-green-500 animate-pulse" : "bg-yellow-500"
        }`}
      />
      <span>{availability.message}</span>
    </div>
  );
};

export default AvailabilityBadge;


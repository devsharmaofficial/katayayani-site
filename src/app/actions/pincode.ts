"use server";

export async function checkDelivery(pincode: string) {
  if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
    return { error: "Please enter a valid 6-digit PIN code." };
  }

  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
      // Small cache to prevent too many hits
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) {
      return { error: "Error checking pincode. Please try again." };
    }

    const data = await response.json();
    
    if (!data || !data[0] || data[0].Status !== "Success" || !data[0].PostOffice || data[0].PostOffice.length === 0) {
      return { error: "Pincode not found. Please check and try again." };
    }

    const info = data[0].PostOffice[0];
    const state = (info.State || "").toUpperCase();
    
    // Estimate delivery time based on distance from Meerut, UP
    let daysToAdd = 12;
    if (state === "UTTAR PRADESH" || state === "DELHI" || state === "HARYANA") {
      daysToAdd = 8;
    } else if (state === "RAJASTHAN" || state === "PUNJAB" || state === "UTTARAKHAND" || state === "MADHYA PRADESH" || state === "UTTARANCHAL" || state === "CHANDIGARH" || state === "HIMACHAL PRADESH") {
      daysToAdd = 10;
    }

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
    
    // Format: "Wednesday, 18 Aug"
    const formattedDate = deliveryDate.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });

    const days = `by ${formattedDate}`;

    return {
      success: true,
      area: info.Name,
      district: info.District,
      state: info.State,
      deliveryTime: days,
      message: `Delivery available to ${info.Name}, ${info.District}`
    };
  } catch (err) {
    return { error: "Error checking pincode. Please try again." };
  }
}

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
    let days = "5-7 days";
    if (state === "UTTAR PRADESH" || state === "DELHI" || state === "HARYANA") {
      days = "2-4 days";
    } else if (state === "RAJASTHAN" || state === "PUNJAB" || state === "UTTARAKHAND" || state === "MADHYA PRADESH" || state === "UTTARANCHAL" || state === "CHANDIGARH" || state === "HIMACHAL PRADESH") {
      days = "3-5 days";
    } else {
      days = "5-7 days";
    }

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

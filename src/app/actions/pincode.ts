"use server";

import { getIndiaPincode, isValidPincode } from "india-pincode";

export async function checkDelivery(pincode: string) {
  if (!pincode || pincode.length !== 6 || !isValidPincode(pincode)) {
    return { error: "Please enter a valid 6-digit PIN code." };
  }

  try {
    const result = getIndiaPincode().getByPincode(pincode);
    if (!result.success || !result.data || !result.data.data || result.data.data.length === 0) {
      return { error: "Pincode not found. Please check and try again." };
    }

    const info = result.data.data[0];
    const state = (info.state || "").toUpperCase();
    
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
      area: info.area,
      district: info.district,
      state: info.state,
      deliveryTime: days,
      message: `Delivery available to ${info.area}, ${info.district}`
    };
  } catch (err) {
    return { error: "Error: " + String(err) };
  }
}

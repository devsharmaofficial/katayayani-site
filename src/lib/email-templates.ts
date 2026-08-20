export function getLeadEmailHtml(
  type: 'NEW' | 'RETURNING',
  data: {
    name: string;
    phone: string;
    productName: string;
    page: string;
  }
) {
  const phoneDigits = data.phone.replace(/\D/g, '');
  const waMessage = encodeURIComponent(
    `Namaste ${data.name} Ji,\nMain Katayayani Enterprises se baat kar raha hoon.\nAapne hamari website par ${data.productName} ke liye inquiry ki thi.\nKya main aapki iss baare mein kuch madad kar sakta hoon? 😊`
  );
  const whatsappUrl = `https://wa.me/91${phoneDigits}?text=${waMessage}`;
  const telUrl = `tel:+91${phoneDigits}`;

  const title = type === 'NEW' ? 'New Lead Captured' : 'Returning Customer Active';
  const color = type === 'NEW' ? '#012d1d' : '#2563eb'; // Greenish for new, Blue for returning

  return `
    <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px; border-radius: 12px;">
      <div style="background-color: ${color}; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 24px;">${title}</h2>
      </div>
      
      <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
        <h3 style="margin-top: 0; color: #111827; font-size: 20px; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
          Customer Details
        </h3>
        
        <table style="width: 100%; margin-bottom: 25px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 10px 0; color: #111827; font-weight: bold; font-size: 16px;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Phone:</td>
            <td style="padding: 10px 0; color: #111827; font-weight: bold; font-size: 16px;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Product:</td>
            <td style="padding: 10px 0; color: #111827; font-weight: bold; font-size: 16px;">${data.productName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Page:</td>
            <td style="padding: 10px 0; color: #374151;">${data.page}</td>
          </tr>
        </table>

        <div style="margin-top: 30px;">
          <a href="${whatsappUrl}" style="display: block; width: 100%; background-color: #25D366; color: #ffffff; text-align: center; padding: 15px 0; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; margin-bottom: 15px;">
            💬 Chat on WhatsApp
          </a>
          
          <a href="${telUrl}" style="display: block; width: 100%; background-color: #3b82f6; color: #ffffff; text-align: center; padding: 15px 0; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px;">
            📞 Call Customer
          </a>
        </div>
      </div>
      
      <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
        Sent automatically from Katayayani Enterprises Lead System
      </p>
    </div>
  `;
}

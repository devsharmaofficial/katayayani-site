export function getLeadEmailHtml(
  type: 'NEW' | 'RETURNING',
  data: {
    name: string;
    phone: string;
    productName: string;
    page: string;
  }
) {
  let phoneDigits = data.phone.replace(/\D/g, '');
  if (phoneDigits.length > 10) {
    phoneDigits = phoneDigits.slice(-10);
  }
  const waMessage = encodeURIComponent(
    `Hi ${data.name},\nThis is Katayayani Enterprises.\nWe noticed your inquiry for the ${data.productName}.\nHow can we help you today? 😊`
  );
  const whatsappUrl = `https://wa.me/91${phoneDigits}?text=${waMessage}`;
  const telUrl = `tel:+91${phoneDigits}`;

  const title = type === 'NEW' ? 'New Lead Captured' : 'Customer Seen Again';
  const color = type === 'NEW' ? '#012d1d' : '#2563eb'; // Greenish for new, Blue for returning

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 40px auto; background-color: #ffffff; padding: 40px 30px; border-radius: 16px; border: 1px solid #eaeaea; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
      
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; background-color: ${type === 'NEW' ? '#ecfdf5' : '#eff6ff'}; color: ${color}; padding: 8px 16px; border-radius: 20px; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase;">
          ${title}
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="color: #111827; font-size: 20px; font-weight: 700; margin: 0 0 24px 0;">Customer Details</h3>
        
        <div style="margin-bottom: 20px;">
          <p style="color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 6px 0;">Name</p>
          <p style="color: #111827; font-size: 16px; font-weight: 600; margin: 0;">${data.name}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 6px 0;">Phone</p>
          <p style="color: #111827; font-size: 16px; font-weight: 600; margin: 0;">${data.phone}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 6px 0;">Product Interest</p>
          <p style="color: #111827; font-size: 16px; font-weight: 500; margin: 0; line-height: 1.5;">${data.productName}</p>
        </div>
      </div>

      <div style="margin-top: 40px;">
        <a href="${whatsappUrl}" style="display: block; width: 100%; background-color: #25D366; color: #ffffff; text-align: center; padding: 16px 0; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; margin-bottom: 12px; box-sizing: border-box;">
          💬 Chat on WhatsApp
        </a>
        
        <a href="${telUrl}" style="display: block; width: 100%; background-color: #111827; color: #ffffff; text-align: center; padding: 16px 0; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; box-sizing: border-box;">
          📞 Call Customer
        </a>
      </div>
      
      <div style="text-align: center; margin-top: 36px; padding-top: 24px; border-top: 1px solid #eaeaea;">
        <p style="color: #9ca3af; font-size: 13px; font-weight: 500; margin: 0;">
          Katayayani Enterprises CRM
        </p>
      </div>
    </div>
  `;
}

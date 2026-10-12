function exportAttendancePDF() {
  const area = document.getElementById('pdfExportArea');
  const curMonthYear = new Date().toLocaleDateString('mr-IN', { month: 'long', year: 'numeric' });
  
  area.innerHTML = `
    <div style="padding: 24px; font-family: Arial, sans-serif; color: #111; line-height: 1.4; background: #fff;">
      <div style="text-align: center; border-bottom: 2px solid #1E3A8A; padding-bottom: 8px; margin-bottom: 12px;">
        <h2 style="margin: 0; font-size: 18px; color: #1E3A8A; font-weight: bold;">शासकीय औद्योगिक प्रशिक्षण संस्था, शेवगाव</h2>
        <h3 style="margin: 3px 0; font-size: 14px;">मासिक प्रशिक्षणार्थी उपस्थिती अहवाल (NCVT Format)</h3>
        <p style="margin: 0; font-size: 11px; color: #555;">सत्र: २०२६ - २०२७ | महिना: ${curMonthYear}</p>
      </div>

      <table style="width: 100%; font-size: 11px; margin-bottom: 12px;">
        <tr>
          <td><b>ट्रेड:</b> Electronics Mechanic (First Year)</td>
          <td style="text-align: right;"><b>शिल्प निदेशक:</b> पगारे बी. डब्ल्यू.</td>
        </tr>
      </table>

      <table style="width: 100%; border-collapse: collapse; font-size: 10px; text-align: center;">
        <thead>
          <tr style="background: #f1f5f9;">
            <th style="border: 1px solid #999; padding: 6px;">अ.क्र.</th>
            <th style="border: 1px solid #999; padding: 6px;">रोल नं.</th>
            <th style="border: 1px solid #999; padding: 6px; text-align: left;">प्रशिक्षणार्थ्याचे नाव</th>
            <th style="border: 1px solid #999; padding: 6px;">प्रवर्ग</th>
            <th style="border: 1px solid #999; padding: 6px;">विद्यावेतन</th>
            <th style="border: 1px solid #999; padding: 6px;">हजेरी</th>
            <th style="border: 1px solid #999; padding: 6px;">%</th>
          </tr>
        </thead>
        <tbody>
          ${trainees.map((t, idx) => `
            <tr>
              <td style="border: 1px solid #999; padding: 6px;">\${idx + 1}</td>
              <td style="border: 1px solid #999; padding: 6px;">\${t.roll}</td>
              <td style="border: 1px solid #999; padding: 6px; text-align: left;">\${t.name}</td>
              <td style="border: 1px solid #999; padding: 6px;">\${t.cat}</td>
              <td style="border: 1px solid #999; padding: 6px;">${t.stipend} (₹${t.amt})</td>
              <td style="border: 1px solid #999; padding: 6px; color: ${t.present ? 'green' : 'red'};">${t.present ? 'P' : 'A'}</td>
              <td style="border: 1px solid #999; padding: 6px;">\${t.attPercent}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  // HTML लोड होण्यासाठी ५०० मिलीसेकंदांचा अवधी देऊन PDF तयार करा
  setTimeout(() => {
    html2pdf().set({
      margin: 10,
      filename: `ITI_Shevgaon_Attendance_${curMonthYear}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(area).save();
  }, 500);
}
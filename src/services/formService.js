// DİKKAT: Kendi Google Apps Script Web App URL'ini buraya yapıştırmalısın
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyQL_ctoxyywci6Nwb9TDkg1V1qsnzPhkbxFIuWxeJ2dEfgJVljj3G5ruK5lxFA5A4m6g/exec";

export const submitForm = async (formData) => {
  try {
    // Veriyi Google'a gönderiyoruz
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(formData),
      // no-cors modu çok kritik. Olmazsa Google güvenlik duvarına takılır.
      mode: "no-cors", 
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });
    
    // no-cors modunda Google'dan gelen "başarılı" yanıtını okuyamayız.
    // İstek hata fırlatmadan buraya ulaştıysa işlem başarılı kabul edilir.
    return { success: true };
    
  } catch (error) {
    console.error("Gönderim hatası:", error);
    throw new Error("Bağlantı hatası");
  }
};

export const testConnection = async () => {
  try {
    // Sadece ufak bir ping atarak URL'in erişilebilir olup olmadığını test ediyoruz
    await fetch(SCRIPT_URL, { method: "GET", mode: "no-cors" });
    return { success: true };
  } catch (error) {
    console.error("Test hatası:", error);
    return { success: false };
  }
};
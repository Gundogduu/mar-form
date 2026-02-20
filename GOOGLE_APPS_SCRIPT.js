/**
 * TEST ETMEK İÇİN: 
 * Bu scripti yayınladıktan sonra size verilen URL'yi tarayıcıya yapıştırın.
 * Eğer "Sistem Hazır!" mesajını görüyorsanız URL'niz doğru çalışıyor demektir.
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({status: "ready", message: "✅ Sistem Hazır!"}))
                       .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Form verilerini kaydeden ve e-posta gönderen ana fonksiyon.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000); // 15 saniye bekle (çakışmaları önlemek için)
  
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Veri alınamadı: e.postData.contents boş.");
    }

    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // "Başvurular" sayfasını bul veya ilk sayfayı kullan
    var sheet = ss.getSheetByName("Başvurular") || ss.getSheets()[0];
    
    // Satırı ekle
    sheet.appendRow([
      new Date(),
      data.fullName || "Bilinmiyor",
      data.position || "Belirtilmedi",
      "'" + (data.tcNo || ""), 
      data.email || "",
      data.mobilePhone || "",
      data.birthDate || "",
      data.birthPlace || "",
      data.maritalStatus || "",
      data.militaryStatus || "",
      data.healthProblem || "",
      data.criminalRecord || "",
      data.address || ""
    ]);
    
    // E-posta Bildirimi
    var recipient = "karhanli0034@gmail.com";
    if (recipient && recipient.indexOf("@") !== -1) {
      var subject = "Yeni İş Başvurusu: " + data.fullName;
      var body = "Yeni bir iş başvurusu alındı. Detaylar Google Sheets'e kaydedildi.\n\n" +
                 "Ad Soyad: " + data.fullName + "\n" +
                 "Pozisyon: " + data.position;
      MailApp.sendEmail(recipient, subject, body);
    }
    
    return ContentService.createTextOutput(JSON.stringify({result: "success"}))
                         .setMimeType(ContentService.MimeType.JSON);
    
  } catch(err) {
    // Hataları bir sayfaya kaydet (Görebilmemiz için)
    logError(err.toString());
    return ContentService.createTextOutput(JSON.stringify({result: "error", error: err.toString()}))
                         .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function logError(msg) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var logSheet = ss.getSheetByName("LOGS") || ss.insertSheet("LOGS");
  logSheet.appendRow([new Date(), msg]);
}

/**
 * Tabloyu hazırlamak için bu fonksiyonu bir kez çalıştırın.
 */
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    Logger.log("Hata: Script bir Google Sheet'e bağlı değil!");
    return;
  }
  var sheet = ss.getActiveSheet();
  var headers = [
    "Tarih", "Ad Soyad", "Pozisyon", "TC No", "E-posta", 
    "Telefon", "Doğum Tarihi", "Doğum Yeri", "Medeni Durum", 
    "Askerlik", "Sağlık Sorunu", "Sabıka Kaydı", "Adres"
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f3f3");
}

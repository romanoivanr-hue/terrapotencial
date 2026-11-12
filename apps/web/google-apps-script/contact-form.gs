const CONFIG = {
  RECIPIENT: 'romano.ivanr@gmail.com',
  SPREADSHEET_NAME: 'Leads Terra Potencial 360',
  SHEET_NAME: 'Leads',
  RETURN_URL: 'https://terrapotencial360.eusouivanromano.com.br/#contato',
  DUPLICATE_WINDOW_MS: 10 * 60 * 1000,
};

const FIELDS = [
  ['nome', 'Nome', true, 150],
  ['empresa', 'Empresa', false, 200],
  ['whatsapp', 'WhatsApp', true, 30],
  ['email', 'E-mail', true, 254],
  ['perfil', 'Perfil', true, 50],
  ['plano_interesse', 'Plano de interesse', true, 100],
  ['localizacao', 'Localização da área', true, 200],
  ['area_aproximada', 'Área aproximada', true, 100],
  ['mensagem', 'Descrição da necessidade', true, 5000],
  ['consentimento', 'Consentimento', true, 20],
];

const HEADERS = [
  'Data', 'Nome', 'Empresa', 'WhatsApp', 'E-mail', 'Perfil',
  'Plano de interesse', 'Localização', 'Área aproximada', 'Mensagem',
  'Consentimento', 'Identificador', 'Status do e-mail', 'Última atualização',
];

function doGet() {
  return page_('Formulário disponível', 'O serviço de contato está funcionando.', true);
}

function doPost(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    if (clean_(params._honey)) {
      return page_('Tudo certo!', 'Solicitação recebida.', true);
    }

    const result = validate_(params);
    if (result.errors.length) {
      return page_('Confira os dados', result.errors.join(' '), false);
    }

    const lead = result.lead;
    const identifier = identifier_(lead);
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(20000)) {
      return page_('Tente novamente', 'O sistema está ocupado no momento.', false);
    }

    try {
      const sheet = getSheet_();
      const existing = findRecentLead_(sheet, identifier);

      if (existing && existing.status === 'sent') {
        return page_(
          'Tudo certo!',
          'Esta solicitação já foi recebida. Você será direcionado para conferir o estudo.',
          true,
          studyPage_(lead.plano_interesse)
        );
      }

      const row = existing ? existing.row : appendPendingLead_(sheet, lead, identifier);

      try {
        sendEmail_(lead, identifier);
        updateStatus_(sheet, row, 'sent');
      } catch (mailError) {
        updateStatus_(sheet, row, 'email_error');
        console.error(mailError && mailError.stack ? mailError.stack : mailError);
        return page_(
          'Solicitação salva',
          'Seus dados foram preservados, mas a notificação por e-mail falhou. Tente novamente em alguns instantes.',
          false
        );
      }

      return page_(
        'Tudo certo!',
        'Solicitação enviada. Você será direcionado para conferir o estudo antes da compra.',
        true,
        studyPage_(lead.plano_interesse)
      );
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return page_(
      'Não foi possível enviar',
      'Ocorreu uma falha inesperada. Tente novamente ou fale conosco pelo WhatsApp.',
      false
    );
  }
}

function validate_(params) {
  const lead = {};
  const errors = [];

  FIELDS.forEach(function (field) {
    const name = field[0];
    const label = field[1];
    const required = field[2];
    const limit = field[3];
    const value = clean_(params[name]);

    if (required && !value) errors.push('Preencha ' + label + '.');
    if (value.length > limit) errors.push(label + ' ultrapassou o limite permitido.');
    lead[name] = value;
  });

  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    errors.push('Informe um e-mail válido.');
  }
  if (/[\r\n]/.test(lead.email)) errors.push('O e-mail contém caracteres inválidos.');
  if (!/^(on|sim|true|1|aceito)$/i.test(lead.consentimento)) {
    errors.push('Confirme o consentimento para envio.');
  }

  return { lead: lead, errors: errors };
}

function getSheet_() {
  const properties = PropertiesService.getScriptProperties();
  const storedId = properties.getProperty('LEADS_SPREADSHEET_ID');
  let spreadsheet = null;

  if (storedId) {
    try {
      spreadsheet = SpreadsheetApp.openById(storedId);
    } catch (ignored) {
      properties.deleteProperty('LEADS_SPREADSHEET_ID');
    }
  }

  if (!spreadsheet) {
    const files = DriveApp.getFilesByName(CONFIG.SPREADSHEET_NAME);
    spreadsheet = files.hasNext()
      ? SpreadsheetApp.openById(files.next().getId())
      : SpreadsheetApp.create(CONFIG.SPREADSHEET_NAME);
    properties.setProperty('LEADS_SPREADSHEET_ID', spreadsheet.getId());
  }

  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function appendPendingLead_(sheet, lead, identifier) {
  sheet.appendRow([
    new Date(), safeCell_(lead.nome), safeCell_(lead.empresa), safeCell_(lead.whatsapp),
    safeCell_(lead.email), safeCell_(lead.perfil), safeCell_(lead.plano_interesse),
    safeCell_(lead.localizacao), safeCell_(lead.area_aproximada), safeCell_(lead.mensagem),
    safeCell_(lead.consentimento), identifier, 'pending', new Date(),
  ]);
  return sheet.getLastRow();
}

function findRecentLead_(sheet, identifier) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  const firstRow = Math.max(2, lastRow - 99);
  const rows = sheet.getRange(firstRow, 1, lastRow - firstRow + 1, HEADERS.length).getValues();
  const cutoff = Date.now() - CONFIG.DUPLICATE_WINDOW_MS;

  for (let index = rows.length - 1; index >= 0; index -= 1) {
    const row = rows[index];
    const timestamp = row[0] instanceof Date ? row[0].getTime() : new Date(row[0]).getTime();
    if (row[11] === identifier && timestamp >= cutoff) {
      return { row: firstRow + index, status: String(row[12] || '') };
    }
  }
  return null;
}

function updateStatus_(sheet, row, status) {
  sheet.getRange(row, 13, 1, 2).setValues([[status, new Date()]]);
}

function sendEmail_(lead, identifier) {
  const subjectName = lead.nome.replace(/[\r\n]+/g, ' ').slice(0, 100);
  const lines = ['Nova solicitação pelo site Terra Potencial 360°', 'Identificador: ' + identifier, ''];
  FIELDS.forEach(function (field) {
    lines.push(field[1] + ': ' + (lead[field[0]] || 'Não informado'));
  });

  MailApp.sendEmail({
    to: CONFIG.RECIPIENT,
    subject: 'Nova solicitação - ' + subjectName,
    body: lines.join('\n'),
    replyTo: lead.email,
    name: 'Terra Potencial 360',
  });
}

function identifier_(lead) {
  const source = FIELDS.map(function (field) {
    return lead[field[0]].toLowerCase().replace(/\s+/g, ' ');
  }).join('|');
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, source, Utilities.Charset.UTF_8);
  return digest.map(function (byte) {
    const value = byte < 0 ? byte + 256 : byte;
    return ('0' + value.toString(16)).slice(-2);
  }).join('').slice(0, 24);
}

function clean_(value) {
  return String(value == null ? '' : value).replace(/\u0000/g, '').trim();
}

function safeCell_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function studyPage_(plan) {
  if (plan === 'estudo_inicial') return 'https://terrapotencial360.eusouivanromano.com.br/estudo-inicial';
  if (plan === 'estudo_completo') return 'https://terrapotencial360.eusouivanromano.com.br/estudo-completo';
  return CONFIG.RETURN_URL;
}

function page_(heading, message, success, returnUrl) {
  const color = success ? '#174c36' : '#9f2d2d';
  const destination = returnUrl || CONFIG.RETURN_URL;
  const redirect = success && returnUrl
    ? '<meta http-equiv="refresh" content="2;url=' + escapeHtml_(destination) + '">' : '';
  const html = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1"><title>Terra Potencial 360</title>' +
    redirect +
    '<style>body{font-family:Arial,sans-serif;background:#f4f1e9;margin:0;display:grid;place-items:center;min-height:100vh;color:#173b2d}' +
    '.box{max-width:560px;margin:24px;background:#fff;padding:44px;border-radius:16px;box-shadow:0 12px 40px #0002;text-align:center}' +
    'h1{font-size:28px;color:' + color + '}a{display:inline-block;margin-top:20px;background:#174c36;color:#fff;text-decoration:none;padding:14px 22px;border-radius:8px}</style>' +
    '</head><body><main class="box"><h1>' + escapeHtml_(heading) + '</h1><p>' + escapeHtml_(message) + '</p>' +
    '<a href="' + escapeHtml_(destination) + '">' + (returnUrl ? 'Continuar' : 'Voltar ao site') + '</a></main></body></html>';
  return HtmlService.createHtmlOutput(html).setTitle('Terra Potencial 360');
}

function escapeHtml_(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function authorizeServices() {
  getSheet_();
  return MailApp.getRemainingDailyQuota();
}

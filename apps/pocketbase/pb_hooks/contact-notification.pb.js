/// <reference path="../pb_data/types.d.ts" />

const CONTACT_RECIPIENT = "ivan@eusouivanromano.com.br"

const escapeHtml = (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

const field = (record, name) => escapeHtml(record.get(name))

onRecordCreateRequest((e) => {
    // Persiste primeiro o lead. Se a entrega do e-mail falhar, o registro continua
    // salvo no PocketBase e a requisição retorna erro em vez de um falso sucesso.
    e.next()

    const settings = e.app.settings()
    const senderAddress = settings.meta.senderAddress
    const senderName = settings.meta.senderName || "Terra Potencial 360°"
    const replyTo = String(e.record.get("email") || "")

    const message = new MailerMessage({
        from: { address: senderAddress, name: senderName },
        to: [{ address: CONTACT_RECIPIENT }],
        ...(replyTo ? { replyTo: { address: replyTo, name: String(e.record.get("nome") || "") } } : {}),
        subject: `Novo lead Terra Potencial 360° — ${String(e.record.get("nome") || "Contato")}`,
        html: `
            <h2>Nova solicitação de análise</h2>
            <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px">
                <tr><td><strong>Nome</strong></td><td>${field(e.record, "nome")}</td></tr>
                <tr><td><strong>Empresa</strong></td><td>${field(e.record, "empresa") || "—"}</td></tr>
                <tr><td><strong>WhatsApp</strong></td><td>${field(e.record, "whatsapp")}</td></tr>
                <tr><td><strong>E-mail</strong></td><td>${field(e.record, "email")}</td></tr>
                <tr><td><strong>Perfil</strong></td><td>${field(e.record, "perfil")}</td></tr>
                <tr><td><strong>Localização</strong></td><td>${field(e.record, "localizacao")}</td></tr>
                <tr><td><strong>Área aproximada</strong></td><td>${field(e.record, "area_aproximada")}</td></tr>
                <tr><td><strong>Plano de interesse</strong></td><td>${field(e.record, "plano_interesse")}</td></tr>
                <tr><td><strong>Necessidade</strong></td><td>${field(e.record, "mensagem").replace(/\n/g, "<br>")}</td></tr>
                <tr><td><strong>Consentimento LGPD</strong></td><td>Sim</td></tr>
            </table>
            <p><small>ID do lead: ${escapeHtml(e.record.id)}</small></p>
        `,
        text: [
            "Nova solicitação de análise",
            `Nome: ${String(e.record.get("nome") || "")}`,
            `Empresa: ${String(e.record.get("empresa") || "—")}`,
            `WhatsApp: ${String(e.record.get("whatsapp") || "")}`,
            `E-mail: ${replyTo}`,
            `Perfil: ${String(e.record.get("perfil") || "")}`,
            `Localização: ${String(e.record.get("localizacao") || "")}`,
            `Área aproximada: ${String(e.record.get("area_aproximada") || "")}`,
            `Plano de interesse: ${String(e.record.get("plano_interesse") || "")}`,
            `Necessidade: ${String(e.record.get("mensagem") || "")}`,
            `ID do lead: ${e.record.id}`,
        ].join("\n"),
    })

    e.app.newMailClient().send(message)
}, "contatos")

<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Método não permitido.']);
    exit;
}

// Campo invisível: robôs costumam preenchê-lo.
if (trim((string) ($_POST['company_website'] ?? '')) !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$fields = [
    'nome' => ['label' => 'Nome', 'required' => true, 'max' => 150],
    'empresa' => ['label' => 'Empresa', 'required' => false, 'max' => 200],
    'whatsapp' => ['label' => 'WhatsApp', 'required' => true, 'max' => 30],
    'email' => ['label' => 'E-mail', 'required' => true, 'max' => 254],
    'perfil' => ['label' => 'Perfil', 'required' => true, 'max' => 50],
    'localizacao' => ['label' => 'Localização da área', 'required' => true, 'max' => 200],
    'area_aproximada' => ['label' => 'Área aproximada', 'required' => true, 'max' => 100],
    'plano_interesse' => ['label' => 'Plano de interesse', 'required' => true, 'max' => 100],
    'mensagem' => ['label' => 'Descrição da necessidade', 'required' => true, 'max' => 5000],
];

$data = [];
foreach ($fields as $name => $rules) {
    $value = trim((string) ($_POST[$name] ?? ''));
    if ($rules['required'] && $value === '') {
        http_response_code(422);
        echo json_encode(['ok' => false, 'message' => 'Preencha todos os campos obrigatórios.']);
        exit;
    }
    if (mb_strlen($value) > $rules['max']) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'message' => 'Um dos campos ultrapassou o limite permitido.']);
        exit;
    }
    $data[$name] = str_replace(["\r", "\0"], '', $value);
}

if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL) || !isset($_POST['consentimento'])) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Confira o e-mail e o consentimento.']);
    exit;
}

$lines = [
    'Nova solicitação pelo site Terra Potencial 360°',
    'Data: ' . date('d/m/Y H:i:s'),
    '',
];
foreach ($fields as $name => $rules) {
    $lines[] = $rules['label'] . ': ' . ($data[$name] !== '' ? $data[$name] : 'Não informado');
}
$body = implode("\n", $lines);

// Cópia de segurança fora da pasta pública do site.
$storage = dirname(__DIR__) . '/terrapotencial-leads';
if (!is_dir($storage)) {
    @mkdir($storage, 0700, true);
}
$saved = is_dir($storage) && @file_put_contents(
    $storage . '/leads-' . date('Y-m') . '.log',
    "---\n" . $body . "\n",
    FILE_APPEND | LOCK_EX
) !== false;

$recipient = 'ivan@eusouivanromano.com.br';
$subject = 'Nova solicitação - Terra Potencial 360';
$headers = [
    'From: Terra Potencial 360 <ivan@eusouivanromano.com.br>',
    'Reply-To: ' . $data['email'],
    'Content-Type: text/plain; charset=UTF-8',
];
$sent = @mail($recipient, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(503);
    echo json_encode([
        'ok' => false,
        'message' => $saved
            ? 'Solicitação salva, mas o e-mail não pôde ser enviado.'
            : 'Não foi possível enviar a solicitação.',
    ]);
    exit;
}

echo json_encode(['ok' => true]);

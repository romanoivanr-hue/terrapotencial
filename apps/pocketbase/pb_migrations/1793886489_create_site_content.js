migrate((app) => {
  const dates = [{ name: 'created', type: 'autodate', onCreate: true, onUpdate: false }, { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true }];
  const definitions = [
    { name: 'contatos', listRule: null, viewRule: null, createRule: '', updateRule: null, deleteRule: null, fields: [{ name: 'nome', type: 'text', required: true, max: 150 }, { name: 'email', type: 'email', required: true }, { name: 'mensagem', type: 'text', required: true, max: 5000 }, ...dates] },
    { name: 'inscricoes', listRule: null, viewRule: null, createRule: '@request.body.consentimento = true', updateRule: null, deleteRule: null, fields: [{ name: 'email', type: 'email', required: true }, { name: 'consentimento', type: 'bool' }, ...dates] },
    { name: 'noticias', listRule: 'publicado = true', viewRule: 'publicado = true', createRule: null, updateRule: null, deleteRule: null, fields: [{ name: 'titulo', type: 'text', required: true, max: 200 }, { name: 'resumo', type: 'text', max: 500 }, { name: 'conteudo', type: 'text', max: 50000 }, { name: 'publicado', type: 'bool' }, ...dates] },
    { name: 'galeria', listRule: 'publicado = true', viewRule: 'publicado = true', createRule: null, updateRule: null, deleteRule: null, fields: [{ name: 'titulo', type: 'text', required: true, max: 200 }, { name: 'foto', type: 'file', required: true, maxSelect: 1, maxSize: 10000000, mimeTypes: ['image/jpeg', 'image/png', 'image/webp'] }, { name: 'publicado', type: 'bool' }, ...dates] },
  ];
  definitions.forEach(definition => { let existing; try { existing = app.findCollectionByNameOrId(definition.name); } catch (_) { existing = null; } if (!existing) app.save(new Collection({ type: 'base', ...definition })); });
}, (app) => { ['galeria', 'noticias', 'inscricoes', 'contatos'].forEach(name => app.delete(app.findCollectionByNameOrId(name))); });

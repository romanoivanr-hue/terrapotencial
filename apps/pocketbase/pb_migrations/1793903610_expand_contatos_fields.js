/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('contatos');

    collection.fields.add(new TextField({ name: 'empresa', max: 200 }));
    collection.fields.add(new TextField({ name: 'whatsapp', max: 30 }));
    collection.fields.add(
      new SelectField({
        name: 'perfil',
        values: ['loteadora', 'corretor', 'proprietario', 'outro'],
      }),
    );
    collection.fields.add(new TextField({ name: 'localizacao', max: 200 }));
    collection.fields.add(new TextField({ name: 'area_aproximada', max: 100 }));
    collection.fields.add(
      new SelectField({
        name: 'plano_interesse',
        values: ['estudo_inicial', 'estudo_completo', 'assinatura_mensal', 'nao_definido'],
      }),
    );
    collection.fields.add(new BoolField({ name: 'consentimento' }));

    // Exige consentimento LGPD explícito para criar um registro.
    collection.createRule = '@request.body.consentimento = true';

    app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('contatos');
    [
      'empresa',
      'whatsapp',
      'perfil',
      'localizacao',
      'area_aproximada',
      'plano_interesse',
      'consentimento',
    ].forEach((name) => collection.fields.removeByName(name));
    collection.createRule = '';
    app.save(collection);
  },
);

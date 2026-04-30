export const structure = (S) =>
  S.list()
    .title('Контент')
    .items([
      S.listItem()
        .title('Головна сторінка')
        .child(
          S.list()
            .title('Головна — по мовах')
            .items([
              S.listItem()
                .title('Українська')
                .child(
                  S.editor().id('homePage-uk').schemaType('homePage').documentId('homePage-uk'),
                ),
              S.listItem()
                .title('English')
                .child(
                  S.editor().id('homePage-en').schemaType('homePage').documentId('homePage-en'),
                ),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('post').title('Пости блогу'),
      S.documentTypeListItem('service').title('Послуги'),
      S.documentTypeListItem('faq').title('FAQ'),
    ]);

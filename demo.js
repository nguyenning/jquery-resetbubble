$('#content').on('reset', 'form', function () {
  $('#output')
    .hide()
    .html('Form reset works! What is this sorcery?')
    .fadeIn('slow');
});

$('#content').on('submit', 'form', function (evt) {
  evt.preventDefault();
});

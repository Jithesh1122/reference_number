document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('circularForm');
  const referenceNumberDiv = document.getElementById('referenceNumber');
  let circulars = JSON.parse(localStorage.getItem('circulars')) || [];
  let referenceCounter = circulars.length + 1; // Initialize reference counter based on existing circulars

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const subject = document.getElementById('subject').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const referenceNumber = `SCEM/principal/${referenceCounter.toString().padStart(3, '0')}/${year}-${month}-${day}`;

    // Store circular information
    circulars.push({
      referenceNumber: referenceNumber,
      date: `${year}-${month}-${day}`,
      subject: subject,
      from: from,
      to: to
    });

    // Increment reference counter and save circulars to localStorage
    referenceCounter++;
    localStorage.setItem('circulars', JSON.stringify(circulars));

    referenceNumberDiv.innerText = `Reference Number: ${referenceNumber}\nSubject: ${subject}\nFrom: ${from}\nTo: ${to}`;
  });

  const referenceInput = document.getElementById('referenceInput');
  const lookupResultDiv = document.getElementById('lookupResult');

  referenceInput.addEventListener('input', function() {
    const inputReference = referenceInput.value.trim();

    const circular = circulars.find(circular => circular.referenceNumber === inputReference);
    if (circular) {
      lookupResultDiv.innerText = `Date: ${circular.date}\nSubject: ${circular.subject}\nFrom: ${circular.from}\nTo: ${circular.to}`;
    } else {
      lookupResultDiv.innerText = 'No circular found for the specified reference number.';
    }
  });
});

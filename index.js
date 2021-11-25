const paragraphs = document.getElementsByTagName("p");

if (paragraphs.length > 0) {
    const paragraph = paragraphs[0];
    paragraph.innerHTML = "Bienvenidos al Bootcamp!";
}

if (paragraphs.length > 1) {
    const paragraph = paragraphs[1];
    const fecha = new Date();
    paragraph.innerHTML = "Parrafos en el documento: " + paragraphs.length + " (" + fecha + ")";
}
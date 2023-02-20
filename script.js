async function getID() {
  let response = await fetch(
    "https://fwd.innopolis.app/api/hw2?email=n.dragicevic@innopolis.university"
  );
  let comic_id = await response.text();
  getComic(comic_id);
}

async function getComic(comic_id) {
  let response = await fetch(
    "https://getxkcd.vercel.app/api/comic?num=" + comic_id
  );
  let data = await response.json();
  console.log(data);
  let img = data.img;
  let img_title = data.title;
  let img_alt = data.alt;
  let img_year = data.year;
  let img_month = data.month;
  let img_day = data.day;
  let img_date = new Date(img_year, img_month - 1, img_day);
  const date = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let comic_date = img_date.toLocaleDateString("en-US", date);

  let image = document.getElementById("image");
  image.src = img;
  image.alt = img_alt;
  let title = document.getElementById("title");
  title.textContent = img_title;
  title.textContent = img_date;
}

getID();

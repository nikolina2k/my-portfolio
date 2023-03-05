interface HW2Response {
    comic_id: number;
  }
  
  interface XKCDResponse {
    month: string;
    num: number;
    link: string;
    year: string;
    news: string;
    safe_title: string;
    transcript: string;
    alt: string;
    img: string;
    title: string;
    day: string;
  }
  
  async function getID(): Promise<void> {
    let response = await fetch(
      "https://fwd.innopolis.app/api/hw2?email=n.dragicevic@innopolis.university"
    );
    let hw2Response: HW2Response = await response.json();
    getComic(hw2Response.comic_id as number);
  }
  
  async function getComic(comic_id: number): Promise<void> {
    let response = await fetch(
      `https://getxkcd.vercel.app/api/comic?num=${comic_id}`
    );
    let xkcdResponse: XKCDResponse = await response.json();
    console.log(xkcdResponse);
    let img = xkcdResponse.img;
    let img_title = xkcdResponse.title;
    let img_alt = xkcdResponse.alt;
    let img_year = xkcdResponse.year;
    let img_month = xkcdResponse.month;
    let img_day = xkcdResponse.day;
    let img_date = new Date(parseInt(img_year), parseInt(img_month) - 1, parseInt(img_day));
    const date = {
      weekday: "long" as const,
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const,
    };
    let comic_date = img_date.toLocaleDateString("en-US", date);
  
    let image = document.getElementById("image") as HTMLImageElement;
    image.src = img;
    image.alt = img_alt;
    let title = document.getElementById("title") as HTMLHeadingElement;
    title.textContent = img_title;
    // Set the comic date in a separate paragraph element
    let dateEl = document.getElementById("date") as HTMLParagraphElement;
    dateEl.textContent = comic_date;
  }
  
  getID();
  
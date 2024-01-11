//fetch countries to choose from where the product is located that someones selling
export async function fetchCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
    if (res.ok) {
      const data = await res.json();
      const countries = data.map((country) => {
        return country.name.common;
      });
      return countries.sort();
    } else {
      console.log("couldnt fetch countries");
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
}

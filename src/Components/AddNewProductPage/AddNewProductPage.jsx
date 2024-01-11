import { useContext, useEffect, useState } from "react";
import "./AddNewProductPage.css";
import { CurrencyContext } from "../../Contexts/CurrencyContext/CurrencyContext";
import { useNavigate } from "react-router-dom";
import { fetchCountries } from "../../Utils/externalApi";
import { uploadNewProduct } from "../../Utils/api";

function AddNewProductPage() {
  const navigate = useNavigate();

  const { currencies } = useContext(CurrencyContext);
  const [chosenCurrency, setChosenCurrency] = useState("$");

  //inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  //get country data for ships from field
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Afghanistan");

  function handleCountryChoice(e) {
    setCountry(e.target.value);
  }

  useEffect(() => {
    fetchCountries()
      .then((fetchedCountries) => {
        setCountries(fetchedCountries);
      })
      .catch((err) => console.log(err));
  }, []);

  //category field
  const [category, setCategory] = useState("Beauty");

  function handleCategoryChoice(e) {
    setCategory(e.target.value);
  }

  //manage uploaded images
  const [images, setImages] = useState([]);
  const [imagesToStore, setImagesToStore] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true); //disale or enable the submission based on the amount of images uploaded

  function handleUpload(e) {
    const files = e.target.files;
    const filesArray = Array.from(files);
    const imagesArray = Array.from(files, (file) => {
      return URL.createObjectURL(file);
    });
    setImages((previous) => [...previous, ...imagesArray]);
    setImagesToStore((previous) => [...previous, ...filesArray]);
  }

  //send form data
  function onSubmit(e) {
    e.preventDefault();
    if (images.length < 1) {
      alert("please add at least one image");
      return;
    }
    if (images.length > 5) {
      alert("please add maximum of 5 images");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("country", country);
    formData.append("category", category);
    formData.append("currency", chosenCurrency);

    imagesToStore.forEach((image) => {
      formData.append("images[]", image);
    });

    uploadNewProduct(formData)
      .then(() => navigate("/uploads"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="new-prod-form-div">
      <h1>Add a product to sell</h1>
      <div>
        <form
          className="new-prod-form"
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="price">Price</label>
          <div className="price-div">
            <input
              type="number"
              name="price"
              placeholder="price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <select
              name="currnecy"
              id="currency"
              value={chosenCurrency}
              onChange={(e) => setChosenCurrency(e.target.value)}
            >
              {currencies.map((cur) => {
                return (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                );
              })}
            </select>
          </div>

          <label htmlFor="country">Ships from</label>
          <select
            name="country"
            id="country"
            value={country}
            onChange={handleCountryChoice}
          >
            {countries.map((singleCountry, index) => {
              return (
                <option key={index} value={singleCountry}>
                  {singleCountry}
                </option>
              );
            })}
          </select>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={handleCategoryChoice}
          >
            <option value="Beauty">Beauty</option>
            <option value="Technology">Technology</option>
            <option value="Furniture">Furniture</option>
            <option value="Guns">Guns</option>
            <option value="Other">Other</option>
          </select>
          <label htmlFor="images[]">Images</label>
          <span className="suggest-image-amount">
            please add at least 1 and maximum of 5
          </span>
          <input
            type="file"
            name="images[]"
            multiple
            onChange={handleUpload}
            accept="image/png image/jpg image/webp"
          />
          <div id="uploaded-images">
            {images.map((image) => {
              return (
                <div key={image} className="new-prod-img">
                  <img src={image} alt="" />

                  <button
                    className="delete-img-btn"
                    onClick={() => {
                      setImages(images.filter((file) => file !== image));

                      setImagesToStore(
                        imagesToStore.filter(
                          (file) =>
                            images.indexOf(image) !==
                            imagesToStore.indexOf(file)
                        )
                      );
                    }}
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </div>
          <button className="submit-prod-btn">submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddNewProductPage;

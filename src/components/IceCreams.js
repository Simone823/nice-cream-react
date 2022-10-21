// react use state use effect
import React, {useState, useEffect} from 'react'

// import axios
import axios from 'axios';

function IceCreams() {
    // url api
    const url = "https://react--course-api.herokuapp.com/api/v1/data/gelateria";

    // is loading set is loading
    const [isLoading, setIsLoading] = useState(true);

    // is error set is error
    const [isError, setIsError] = useState(false);

    // categories set categories
    const [categories, setCategories] = useState([]);

    // products set products
    const [products, setProducts] = useState([]);

    // prodotti filtrati
    const [filteredProducts, setFilteredProducts] = useState([]);

    // active category set active category
    const [activeCategory, setActiveCategory] = useState(0);

    // get products
    function getProducts () {
        // set error false
        setIsError(false);

        // set is loading true
        setIsLoading(true);

        // axios
        axios.get(url)
        .then((res) => {
            // ottengo l'array di categorie non duplicato
            const newCategories = Array.from(
                new Set(res.data.data.map((el) => el.categoria))
            );

            // aggiungo alla prima posizione all
            newCategories.unshift('all');

            // set categories
            setCategories(newCategories);

            // set products
            setProducts(res.data.data);

            // set filterProducts
            setFilteredProducts(res.data.data);

            // set is loading false
            setIsLoading(false);
        })
        .catch((err) => {
            // set is error true
            setIsError(true);

            console.warn(err.message);

            // set is loading false
            setIsLoading(false);
        })
    }

    // function filter products by categoy
    const filterProducts = (category, index) => (e) => {
        // set activeCategory
        setActiveCategory(index);

        if(category === 'all') {
            // reset filtered products
            setFilteredProducts(products);
        } else {
            // products filter
            const productsFilter = products.filter((product) => product.categoria.includes(category));
            
            // set filteredProducts
            setFilteredProducts(productsFilter);
        }
    }

    // use effect get products
    useEffect(() => {
        getProducts();
    }, []);


    return (
        // section ice creams
        <section className='ice-creams'>
            <div className='container py-4'>

                {/* row 1 */}
                <div className='row mb-5'>
                    <div className='col-12 text-center'>
                        {/* title */}
                        <h3 className='fw-bold mb-0'>Le nostre scelte</h3>
                    </div>
                </div>

                {   // Se is loading e is error sono false mostro i dati
                    isLoading === false && isError === false ? (
                        // row
                        <div className='row'>
                            <div className='col-12'>
                                {/* list categories */}
                                <ul className='list-categories d-flex align-items-center justify-content-evenly flex-wrap gap-3 mb-4'>
                                    {/* map categories */}
                                    {categories.map((category, index) => {
                                        return (
                                            <li key={index}>
                                                <button onClick={filterProducts(category, index)} type='button' className={`px-3 py-2 text-uppercase fw-bolder ${activeCategory === index ? 'active' : ''}`}>{category}</button>
                                            </li>
                                        )
                                    })}
                                </ul>

                                {/* list filtered products */}
                                <ul className='filtered-products d-flex flex-wrap align-items-center'>
                                    {/* map filtered products */}
                                    {filteredProducts.map((product) => {
                                        return(
                                            <li key={product.id} className="col-12 col-md-6">
                                                {product.nome}
                                            </li>
                                        )
                                    })}

                                </ul>
                            </div>
                        </div>
                    ) : // Se is loading è false ma is error è true mostro titolo errore
                    isLoading === false && isError === true ? (
                        // row
                        <div className='row h-100 align-items-center'>
                            <div className='col-12 text-center'>
                                <h4>Errore!!</h4>
                            </div>
                        </div>
                    ) : // Altrimenti is loading è true quindi mostro titolo loading
                    (
                        // row
                        <div className='row h-100 align-items-center'>
                            <div className='col-12 text-center'>
                                <h4>Loading...</h4>
                            </div>
                        </div>
                    )
                }

            </div>
        </section>
    )
}

export default IceCreams
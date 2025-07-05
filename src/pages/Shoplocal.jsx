import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Star,
  Filter,
  Plus,
  X,
  ShoppingCart,
  User,
  MapPin,
  Eye,
} from "lucide-react";

const ShopLocal = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showVendorStory, setShowVendorStory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videoRef = useRef(null);
  const videos = ["/videos/trad.mp4", "/videos/trad2.mp4"];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle video switching
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    };

    video.addEventListener("ended", handleVideoEnd);
    return () => video.removeEventListener("ended", handleVideoEnd);
  }, [videos.length]);

  // Update video source when currentVideoIndex changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = videos[currentVideoIndex];
      video.load();
      video.play().catch(console.error);
    }
  }, [currentVideoIndex, videos]);

  const regions = [
    "All",
    "Rajasthani",
    "Assamese",
    "Bengali",
    "Gujarati",
    "Punjabi",
    "Tamil",
    "Kerala",
  ];
  const categories = [
    "All",
    "Ethnic Clothes",
    "Handicrafts",
    "Fort Souvenirs",
    "Jewelry",
    "Home Decor",
  ];

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Rajasthani Bandhani Saree",
      price: "₹3,500",
      image:
        "https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=300&h=300&fit=crop",
      region: "Rajasthani",
      category: "Ethnic Clothes",
      rating: 4.8,
      vendor: "Meera Crafts",
      vendorStory:
        "Meera has been weaving traditional Bandhani patterns for over 20 years in Jodhpur, keeping alive the ancient tie-dye techniques passed down through generations.",
      description:
        "Authentic hand-tied Bandhani saree with traditional mirror work",
    },
    {
      id: 2,
      name: "Assamese Gamosa",
      price: "₹450",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop",
      region: "Assamese",
      category: "Ethnic Clothes",
      rating: 4.6,
      vendor: "Brahmaputra Weavers",
      vendorStory:
        "A cooperative of 50+ women weavers from rural Assam, preserving the traditional art of Gamosa weaving while supporting their families.",
      description:
        "Traditional white cotton towel with red border, sacred in Assamese culture",
    },
    {
      id: 3,
      name: "Jaipur Blue Pottery Vase",
      price: "₹1,200",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      region: "Rajasthani",
      category: "Handicrafts",
      rating: 4.9,
      vendor: "Jaipur Art House",
      vendorStory:
        "Master potter Ravi Kumar continues the 400-year-old tradition of Blue Pottery, using only natural dyes and traditional firing techniques.",
      description:
        "Hand-painted decorative vase with traditional floral motifs",
    },
    {
      id: 4,
      name: "Mehrangarh Fort Miniature",
      price: "₹800",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=300&fit=crop",
      region: "Rajasthani",
      category: "Fort Souvenirs",
      rating: 4.7,
      vendor: "Heritage Crafts",
      vendorStory:
        "Established in 1985, Heritage Crafts specializes in detailed architectural replicas, employing local artisans who learned the craft from their ancestors.",
      description: "Detailed miniature replica of the famous Mehrangarh Fort",
    },
    {
      id: 5,
      name: "Bengali Kantha Quilt",
      price: "₹2,800",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      region: "Bengali",
      category: "Handicrafts",
      rating: 4.8,
      vendor: "Kantha Collective",
      vendorStory:
        "Rural women from Bengal villages create these beautiful quilts using recycled fabrics, telling stories through their intricate embroidery patterns.",
      description:
        "Hand-embroidered vintage kantha quilt with traditional motifs",
    },
    {
      id: 6,
      name: "Gujarati Bandhani Dupatta",
      price: "₹950",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop",
      region: "Gujarati",
      category: "Ethnic Clothes",
      rating: 4.5,
      vendor: "Kutch Crafters",
      vendorStory:
        "From the heart of Kutch, this family business has been creating vibrant Bandhani textiles for three generations, using natural dyes and traditional techniques.",
      description: "Colorful tie-dye dupatta with mirror work and tassels",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    region: "Rajasthani",
    category: "Ethnic Clothes",
    vendor: "",
    vendorStory: "",
    description: "",
  });

  const filteredProducts = products.filter((product) => {
    const regionMatch =
      selectedRegion === "All" || product.region === selectedRegion;
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;
    return regionMatch && categoryMatch;
  });

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId) => {
    setCart((prev) => [...prev, productId]);
  };

  const handleAddProduct = () => {
    const product = {
      ...newProduct,
      id: products.length + 1,
      rating: 4.0 + Math.random() * 0.9,
    };
    setProducts([...products, product]);
    setNewProduct({
      name: "",
      price: "",
      image: "",
      region: "Rajasthani",
      category: "Ethnic Clothes",
      vendor: "",
      vendorStory: "",
      description: "",
    });
    setShowAddProduct(false);
  };

  return (
    <div className="min-h-screen relative">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-98"
          autoPlay
          muted
          playsInline
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 to-red-50/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled
              ? "bg-white/20 backdrop-blur-lg shadow-lg border-b border-white/30"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm">
                    Shop Local
                  </h1>
                  <p className="text-sm text-gray-700 drop-shadow-sm">
                    Discover India's Heritage
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-green-600 hover:to-green-700 transition-colors shadow-md"
                >
                  <Plus size={20} />
                  <span>Add Product</span>
                </button>
                <div className="relative">
                  <ShoppingCart
                    className="text-gray-700 drop-shadow-sm"
                    size={24}
                  />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8 pt-32">
          {/* Filters */}
          <div
            className="rounded-xl shadow-lg p-6 mb-8 relative overflow-hidden backdrop-blur-sm"
            style={{
              backgroundImage: `url('/images/trad5.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-4">
                <Filter className="text-white" size={20} />
                <h2 className="text-xl font-semibold text-white">Filters</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Region
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full ${
                      wishlist.includes(product.id)
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-600"
                    } hover:scale-110 transition-transform`}
                  >
                    <Heart
                      size={20}
                      fill={wishlist.includes(product.id) ? "white" : "none"}
                    />
                  </button>
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.region}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star
                        className="text-yellow-400"
                        size={16}
                        fill="currentColor"
                      />
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-orange-600">
                      {product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <User className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-600">
                      by {product.vendor}
                    </span>
                    <button
                      onClick={() => setShowVendorStory(product)}
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1"
                    >
                      <Eye size={14} />
                      <span>Story</span>
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(product.id)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-800 text-lg font-medium bg-white/80 backdrop-blur-sm rounded-lg p-4 inline-block">
                No products found for the selected filters.
              </p>
            </div>
          )}
        </div>

        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Add New Product
                  </h2>
                  <button
                    onClick={() => setShowAddProduct(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="₹1,000"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      required
                      value={newProduct.image}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, image: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Region
                      </label>
                      <select
                        value={newProduct.region}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            region: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {regions.slice(1).map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {categories.slice(1).map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vendor Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.vendor}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, vendor: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vendor Story
                    </label>
                    <textarea
                      required
                      rows="3"
                      value={newProduct.vendorStory}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          vendorStory: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Tell the story behind this artisan or vendor..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Description
                    </label>
                    <textarea
                      required
                      rows="2"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Brief description of the product..."
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleAddProduct}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-colors"
                    >
                      Add Product
                    </button>
                    <button
                      onClick={() => setShowAddProduct(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vendor Story Modal */}
        {showVendorStory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Meet the Artisan
                  </h2>
                  <button
                    onClick={() => setShowVendorStory(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {showVendorStory.vendor}
                      </h3>
                      <p className="text-gray-600">
                        {showVendorStory.region} Region
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">
                      {showVendorStory.vendorStory}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Featured Product:
                    </h4>
                    <div className="flex items-center space-x-4">
                      <img
                        src={showVendorStory.image}
                        alt={showVendorStory.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {showVendorStory.name}
                        </p>
                        <p className="text-orange-600 font-bold">
                          {showVendorStory.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopLocal;

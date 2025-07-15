"use client";

import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const InputForm = ({
  onSubmit,
  onClose,
}: {
  onSubmit: (options: {
    type: string;
    radius: number;
    price_level?: number;
    keyword?: string;
    fetch_all?: boolean;
  }) => void;
  onClose?: () => void;
  setIsLoading: (val: boolean) => void;
}) => {
  const STORAGE_KEY = "nhamey-form-values";
  const [type, setType] = useState("restaurant");
  const [radius, setRadius] = useState(1000);
  const [price, setPrice] = useState("");
  const [keyword, setKeyword] = useState("");
  const [fetchAll, setFetchAll] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const priceDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(e.target as Node)
      ) {
        setIsTypeOpen(false);
      }
      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(e.target as Node)
      ) {
        setIsPriceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.type) setType(parsed.type);
        if (parsed.radius) setRadius(parsed.radius);
        if (parsed.price) setPrice(parsed.price);
        if (parsed.keyword) setKeyword(parsed.keyword);
        if (typeof parsed.fetchAll === "boolean") setFetchAll(parsed.fetchAll);
      } catch (err) {
        console.error("Failed to parse saved form values:", err);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const priceMap: Record<string, number> = {
      '$ (Cheap)': 1,
      "$$ (Moderate)": 2,
      "$$$ (Expensive)": 3,
      "$$$$ (Very Expensive)": 4,
    };

    const newErrors: { [key: string]: string } = {};

    if (!type.trim()) newErrors.type = "Type is required.";
    if (!radius || radius < 50)
      newErrors.radius = "Radius must be at least 50 meters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        type,
        radius,
        price,
        keyword,
        fetchAll,
      })
    );
    onSubmit({
      type,
      radius,
      keyword: keyword.trim() || "",
      price_level: priceMap[price] || 0,
      fetch_all: fetchAll,
    });
  };

  const typeOptions = ["restaurant", "cafe", "bar", "bakery"];
  const priceOptions = [
    "$ (Cheap)",
    "$$ (Moderate)",
    "$$$ (Expensive)",
    "$$$$ (Very Expensive)",
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white px-8 py-6 rounded-3xl shadow-xl lg:w-[30%] md:w-1/2 w-[90%] space-y-4"
      >
        <h2 className="text-3xl font-semibold text-center text-card-title">
          Nham Ey?
        </h2>

        {/* Type Dropdown */}
        <div>
          <label className="input-form-label">Type of place</label>
          <div
            ref={typeDropdownRef}
            className={`input-form-dropdown-div ${
              isTypeOpen ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setIsTypeOpen((prev) => !prev)}
          >
            <div className="flex justify-between items-center">
              <span className="capitalize text-sm">{type}</span>
              <RiArrowDropDownLine className="text-2xl text-card-metadata" />
            </div>
            {isTypeOpen && (
              <ul className="input-form-dropdown-ul">
                {typeOptions.map((option) => (
                  <li
                    key={option}
                    className="input-form-dropdown-li"
                    onClick={(e) => {
                      e.stopPropagation();
                      setType(option);
                      setIsTypeOpen(false);
                      console.log("Selected type:", option);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
          )}
        </div>

        {/* Radius Input */}
        <div>
          <label className="input-form-label">Radius (meters)</label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            placeholder="1000"
            className="input-form-input"
          />
          {errors.radius && (
            <p className="text-red-500 text-sm mt-1">{errors.radius}</p>
          )}
        </div>

        {/* Price Dropdown */}
        <div>
          <label className="input-form-label">Price Level</label>
          <div
            ref={priceDropdownRef}
            className={`input-form-dropdown-div ${
              isPriceOpen ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setIsPriceOpen((prev) => !prev)}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm">{price || "Any"}</span>
              <RiArrowDropDownLine className="text-2xl text-card-metadata" />
            </div>
            {isPriceOpen && (
              <ul className="input-form-dropdown-ul">
                <li
                  className="input-form-dropdown-li"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrice("");
                    setIsPriceOpen(false);
                  }}
                >
                  Any
                </li>
                {priceOptions.map((option) => (
                  <li
                    key={option}
                    className="input-form-dropdown-li"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPrice(option);
                      setIsPriceOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Keyword Input */}
        <div>
          <label className="input-form-label">Keyword (optional)</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. ramen, khmer, vegan"
            className="input-form-input"
          />
        </div>

        {/* Fetch All Toggle */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="fetch-all"
            type="checkbox"
            checked={fetchAll}
            onChange={(e) => setFetchAll(e.target.checked)}
            className="accent-tabs-active h-4 w-4"
          />
          <label
            htmlFor="fetch-all"
            className="text-sm cursor-pointer text-card-title"
          >
            Fetch all places
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-500 text-sm text-card-title hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-tabs-active text-white text-sm font-medium hover:bg-tabs-active-hover transition cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;

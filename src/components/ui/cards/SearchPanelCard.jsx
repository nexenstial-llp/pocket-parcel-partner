import PropTypes from "prop-types";
import { Input, Radio } from "antd";
import ResponsiveCard from "./ResponsiveCard";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const SearchPanelCard = ({ searchTypeOptions = [], extraButtons = [] }) => {
  const [searchState, setSearchState] = useState({
    search_type: "AWB",
    search_value: "",
  });
  const navigate = useNavigate();
  const search = useSearch({ strict: false });

  const handleSearch = () => {
    if (!searchState.search_value) {
      return navigate({
        search: {
          ...search,
          search_type: undefined,
          search_value: undefined,
        },
      });
    }

    navigate({
      search: {
        search_type: searchState.search_type,
        search_value: searchState.search_value,
      },
    });
  };
  const handleChange = (field, value) => {
    setSearchState({ ...searchState, [field]: value });
  };

  useEffect(() => {
    setSearchState({
      search_type: search.search_type || "AWB",
      search_value: search.search_value || "",
    });
  }, [search.search_type, search.search_value]);

  return (
    <ResponsiveCard size="small" title="Search">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2">
          <Radio.Group
            value={searchState.search_type}
            onChange={(e) => handleChange("search_type", e.target.value)}
          >
            {searchTypeOptions.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
          <Input.Search
            value={searchState.search_value}
            onChange={(e) => handleChange("search_value", e.target.value)}
            onSearch={handleSearch}
            placeholder="Search"
          />
        </div>
        <div className="flex gap-2">{extraButtons.map((button) => button)}</div>
      </div>
    </ResponsiveCard>
  );
};

SearchPanelCard.propTypes = {
  searchTypeOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  extraButtons: PropTypes.arrayOf(PropTypes.node),
};

export default SearchPanelCard;

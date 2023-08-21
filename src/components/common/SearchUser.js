import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FetchData } from '../../config/functions';

const SearchUser = () => {

    const [searchUser, setSearchUser] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // New state for selected user

    const token = localStorage.getItem("userToken");

    console.log("searchUser", searchUser)

    const getUsers = async (e) => {
        setSearchUser(e.target.value);
        const url = `http://localhost:5000/searchusers/${e.target.value}`;
        const response = await FetchData(url, token, 'GET', null);
        if (response && response.data) {
            setFoundUsers(response.data);
        }
    }

    // New handler for selecting a user
    const handleUserSelect = (value) => {
        setSelectedUser(value);
        console.log("Selected user:", value);
    }

    return (
        <>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={foundUsers?.map((option) => option.username)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search a User"
                        InputProps={{
                            ...params?.InputProps,
                            type: 'search',
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        value={searchUser}
                        onChange={(e) => getUsers(e)}
                    />
                )}
                className="btn-style input-tag"
                onChange={(event, value) => handleUserSelect(value)}
            />
        </>
    )
}

export default SearchUser
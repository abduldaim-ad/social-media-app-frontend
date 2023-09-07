import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Context
import { AuthContext } from "../../context";

// Config
import { FetchData } from '../../config/functions';

// MUI
import { InputAdornment, Autocomplete, TextField } from '@mui/material';

// MUI Icons
import SearchIcon from '@mui/icons-material/Search';

const SearchUser = () => {

    const { token, user } = useContext(AuthContext);

    const [searchUser, setSearchUser] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);

    const navigate = useNavigate();

    const authUsername = user?.username;

    const getUsers = async (e) => {
        setSearchUser(e.target.value);
        const url = `https://facebook-fbclone.vercel.app/searchusers/${e.target.value}`;
        const response = await FetchData(url, token, 'GET', null);
        if (response && response.data) {
            setFoundUsers(response.data);
        }
    }

    const handleUserSelect = (value) => {
        const found = foundUsers?.find(item => item.username === value);
        if (found) {
            const createdBy = found._id;
            if (value !== authUsername) {
                navigate(`/profile/${value}`, { state: { _id: createdBy } });
            }
            else {
                navigate('/profile');
            }
        }
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

export default SearchUser;